import { users } from "@clerk/remix/api.server";
import { conform, useFieldset } from "@conform-to/react";
import { resolve } from "@conform-to/zod";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import cx from "classnames";
import { ConstraintViolationError } from "edgedb";
import { useEffect } from "react";
import { getFormData } from "remix-params-helper";
import { z } from "zod";
import { requireAuth } from "~/auth.server";
import { createUser, getUserByClerkId } from "~/models/user.server";
import { notifyErrorsInActionData, requireHttpPost } from "~/utils";

const OnboardingSchema = z.object({
  username: z.string().min(3).max(20),
});

export async function loader({ request }: LoaderArgs) {
  const { userId } = await requireAuth(request);
  const user = await getUserByClerkId(userId);
  if (user) return redirect("/app");
  const loggedInUser = await users.getUser(userId);

  return json({ name: loggedInUser.firstName });
}

export async function action({ request }: ActionArgs) {
  requireHttpPost(request);
  const { userId } = await requireAuth(request);
  const result = await getFormData(request, OnboardingSchema);
  if (!result.success) return json({ errors: result.errors });

  const { username } = result.data;
  try {
    await createUser(userId, username);
  } catch (err) {
    if (err instanceof ConstraintViolationError) {
      return json({
        errors: {
          user: "Username already taken",
        },
      });
    } else {
      return json({ errors: { action: "Error creating user" } });
    }
  }

  return redirect("/app");
}

export default function Onboarding() {
  const actionData = useActionData<typeof action>();
  const [fieldsetProps, { username }] = useFieldset(resolve(OnboardingSchema));

  useEffect(() => {
    notifyErrorsInActionData(actionData);
  }, [actionData]);

  return (
    <div className="mx-auto max-w-md px-4 pt-8 pb-36 sm:px-6 sm:pt-20 lg:px-8">
      <h1>Onboarding</h1>
      <Form method="post">
        <fieldset {...fieldsetProps} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="billy bob"
              className={cx(
                "input input-bordered",
                username.error && "input-error"
              )}
              {...conform.input(username)}
            />
            {username?.error && (
              <p className="mt-1 text-sm text-error">{username.error}</p>
            )}
          </div>

          <div className="flex flex-row-reverse">
            <button type="submit" className="btn">
              Create
            </button>
          </div>
        </fieldset>
      </Form>
    </div>
  );
}
