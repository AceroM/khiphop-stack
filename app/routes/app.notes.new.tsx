import { conform, useFieldset } from "@conform-to/react";
import { resolve } from "@conform-to/zod";
import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { getFormData } from "remix-params-helper";
import { z } from "zod";
import { requireAuth } from "~/auth.server";
import { createNote } from "~/models/note.server";
import { notifyErrorsInActionData, requireHttpPost } from "~/utils";
import cx from "classnames";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
  return {
    title: "New Note",
  };
};

const NewNoteSchema = z.object({
  name: z.string().min(3).max(20),
  description: z.string().min(3),
});

export async function action({ request }: ActionArgs) {
  requireHttpPost(request);
  const { userId } = await requireAuth(request);
  const result = await getFormData(request, NewNoteSchema);
  if (!result.success) return json({ errors: result.errors });

  const { name, description } = result.data;
  const { id } = await createNote(name, description, userId);
  return redirect(`/app/note/${id}`);
}

export default function CreateNewNote() {
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    notifyErrorsInActionData(actionData);
  }, [actionData]);

  const [fieldsetProps, { name, description }] = useFieldset(
    resolve(NewNoteSchema)
  );

  return (
    <main className="mx-auto max-w-md space-y-4">
      <h1 className="text-lg font-medium">Create New Note</h1>
      <Form method="post">
        <fieldset {...fieldsetProps} className="space-y-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Note Name"
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
              placeholder="Note description..."
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
              Create
            </button>
            <Link to="/app/notes" className="btn">
              Go Back
            </Link>
          </div>
        </fieldset>
      </Form>
    </main>
  );
}
