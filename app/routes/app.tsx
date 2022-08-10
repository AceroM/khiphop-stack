import { UserButton } from "@clerk/remix";
import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { requireAuth } from "~/auth.server";
import { getUserByClerkId } from "~/models/user.server";

export async function loader({ request }: LoaderArgs) {
  const { userId } = await requireAuth(request);
  const user = await getUserByClerkId(userId);
  if (!user) return redirect("/onboarding");

  return json({ user });
}

export default function AppLayout() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <>
      <AppHeader alias={user.alias} />
      <main className="container relative mx-auto px-4 pt-12 pb-16 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </>
  );
}

const AppHeader = ({ alias }: { alias?: string }) => (
  <header className="relative z-10 border-b border-base-300 bg-base-300 px-4 text-base-content sm:px-6 lg:px-8">
    <div className="container navbar mx-auto">
      <div className="navbar-start">
        <Link to=".">
          <h1 className="text-lg font-bold text-primary">
            Remix K-Hip Hop Stack
          </h1>
        </Link>
      </div>
      <div className="navbar-end space-x-3">
        <p>{alias}</p>
        <UserButton />
      </div>
    </div>
  </header>
);

export function ErrorBoundary() {
  return (
    <>
      <AppHeader />
      <p>An error has occurred</p>
    </>
  );
}
