import { db } from "~/db";
import e from "~/db/edgeql";

export const getUserByClerkId = (clerkId: string) =>
  e
    .select(e.User, (user) => ({
      alias: true,
      filter: e.op(user.clerk_id, "=", clerkId),
    }))
    .assert_single()
    .run(db);

export const createUser = (clerkId: string, alias: string) =>
  e.insert(e.User, { clerk_id: clerkId, alias }).run(db);
