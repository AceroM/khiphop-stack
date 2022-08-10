import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { notFound } from "remix-utils";
import invariant from "tiny-invariant";
import { requireAuth } from "~/auth.server";
import { getNote } from "~/models/note.server";

export async function loader({ request, params }: LoaderArgs) {
  const { userId } = await requireAuth(request);
  invariant(params.noteId, "noteId not found");
  const note = await getNote(params.noteId, userId);
  if (!note) throw notFound({ note });
  return json({ note });
}

export default function Note() {
  const { note } = useLoaderData<typeof loader>();

  return (
    <main className="container prose mx-auto space-y-4">
      <h1>{note.name}</h1>
      <p>{note.description}</p>
      <div className="flex flex-row-reverse gap-3">
        <Link to="/app/notes" className="btn">
          Go Back
        </Link>
      </div>
    </main>
  );
}
