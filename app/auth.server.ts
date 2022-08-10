import { getAuth } from "@clerk/remix/ssr.server";
import type { ServerGetToken } from "@clerk/types/src/ssr";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

type ServerSidedAuth = {
  sessionId: string;
  userId: string;
  getToken: ServerGetToken;
};

export const requireAuth = async (
  request: Request
): Promise<ServerSidedAuth> => {
  const auth = await getAuth(request);
  try {
    invariant(auth.userId);
    invariant(auth.sessionId);
    return auth as ServerSidedAuth;
  } catch {
    throw redirect("/sign-in", 302);
  }
};
