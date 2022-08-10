import { conform, useFieldset } from "@conform-to/react";
import { resolve } from "@conform-to/zod";
import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import cx from "classnames";
import { useEffect } from "react";
import { getFormData } from "remix-params-helper";
import { notFound } from "remix-utils";
import invariant from "tiny-invariant";
import { z } from "zod";
import { requireAuth } from "~/auth.server";
import { getNote, updateNote } from "~/models/note.server";
import { notifyErrorsInActionData, requireHttpPost } from "~/utils";

export async function loader({ request, params }: LoaderArgs) {
  const { userId } = await requireAuth(request);
  invariant(params.noteId, "noteId not found");
  const note = await getNote(params.noteId, userId);
  if (!note) throw notFound({ note });
  return json({ note });
}

export const meta: MetaFunction = ({ data, params }) => {
  if (!data) {
    return {
      title: "Missing Note",
      description: `There is no note with the id: ${params.noteId}`,
    };
  }
  return {
    title: `Edit Note: ${data.note.name}`,
    description: data.note.description,
  };
};

const EditNoteSchema = z.object({
  name: z.string().min(3).max(20),
  description: z.string().min(3),
});

export async function action({ request, params }: ActionArgs) {
  requireHttpPost(request);
  invariant(params.noteId, "noteId not found");
  const { userId } = await requireAuth(request);
  const result = await getFormData(request, EditNoteSchema);
  if (!result.success) return json({ errors: result.errors });
  const { name, description } = result.data;

  try {
    await updateNote(params.noteId, name, description, userId);
    return redirect(`/app/note/${params.noteId}`);
  } catch {
    return json({ errors: { action: "Error editing note" } });
  }
}

export default function EditNote() {
  const { note } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const params = useParams();

  useEffect(() => {
    notifyErrorsInActionData(actionData);
  }, [actionData]);

  const [fieldsetProps, { name, description }] = useFieldset(
    resolve(EditNoteSchema)
  );

  return (
    <main className="mx-auto max-w-md space-y-4">
      <h1 className="text-lg font-medium">Edit Note</h1>
      <Form method="post">
        <fieldset {...fieldsetProps} className="space-y-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              defaultValue={note.name}
              className={cx(
                "input input-bordered",
                name.error && "input-error"
              )}
              {...conform.input(name)}
            />
            {name?.error && (
              <p className="mt-1 text-sm text-error">{name.error}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              defaultValue={note.description || ""}
              className={cx(
                "input input-bordered",
                description.error && "input-error"
              )}
              {...conform.input(description)}
            />
            {description?.error && (
              <p className="mt-1 text-sm text-error">{description.error}</p>
            )}
          </div>

          <div className="flex flex-row-reverse gap-3">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <Link to={`/app/note/${params.noteId}`} className="btn">
              Go Back
            </Link>
          </div>
        </fieldset>
      </Form>
    </main>
  );
}
