import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  Link,
  useFetcher,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { notFound } from "remix-utils";
import { requireAuth } from "~/auth.server";
import { deleteNote, searchNotes } from "~/models/note.server";
import { requireHttpPost } from "~/utils";

export const meta: MetaFunction = () => {
  return {
    title: "Notes Home",
  };
};

export async function loader({ request }: LoaderArgs) {
  const { userId } = await requireAuth(request);
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  const notes = await searchNotes(userId, query);
  if (!notes || notes.length === 0)
    return json({ notes: [], query, status: "noResults" });

  return json({ notes, query, status: "resultsFound" });
}

export async function action({ request }: ActionArgs) {
  requireHttpPost(request);
  const { userId } = await requireAuth(request);
  const noteId = (await request.formData()).get("noteId");
  if (!noteId) throw notFound({ noteId });

  try {
    await deleteNote(noteId.toString(), userId);
    return json({ ok: true });
  } catch (error) {
    return json({ error: (error as Error).message });
  }
}

export default function NotesHome() {
  const { notes, query, status } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const transition = useTransition();

  useEffect(() => {
    if (fetcher.state !== "idle" || fetcher.type !== "done") return;
    if (fetcher.data.ok) {
      toast.success("Note successfully deleted");
    } else {
      toast.error(`Error deleting note: ${fetcher.data.error}`);
    }
  }, [fetcher.state, fetcher.type, fetcher.data]);

  return (
    <main className="container mx-auto space-y-4">
      <h1 className="text-lg font-medium">My Notes</h1>
      <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row">
        <Form method="get" className="w-full">
          <div className="form-control w-full sm:max-w-sm">
            <label className="label">
              <span className="label-text">Search Note</span>
            </label>
            <div className="flex">
              <input
                defaultValue={query}
                type="search"
                name="q"
                autoComplete="off"
                className="input input-bordered flex-1"
                placeholder="Search for a note..."
              />
              <button className="btn ml-3">Search</button>
            </div>
          </div>
        </Form>

        <Link to="/app/notes/new" className="btn btn-primary w-full sm:w-fit">
          New Note
        </Link>
      </div>
      {transition.state === "submitting" && (
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-4">
          <div className="h-96 w-96 animate-pulse" />
        </div>
      )}
      {transition.state !== "submitting" && status === "noResults" && (
        <div className="flex items-center justify-center">
          <p>No results found</p>
        </div>
      )}
      {transition.state !== "submitting" && status === "resultsFound" && (
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="sm:w-92 card card-compact w-full border border-base-300 bg-base-300 shadow-md"
            >
              <figure>
                <img
                  src="https://placeimg.com/400/225/arch"
                  alt="midday in soho"
                  className="w-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{note.name}</h2>
                {note.description && (
                  <p className="card-body truncate">{note.description}</p>
                )}
                <div className="card-actions flex-row-reverse">
                  <Link to={`/app/note/${note.id}`} className="btn btn-sm">
                    View
                  </Link>
                  <button
                    onClick={() => {
                      fetcher.submit({ noteId: note.id }, { method: "post" });
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
