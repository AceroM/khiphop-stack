import { rootAuthLoader } from "@clerk/remix/ssr.server";
import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import { ClerkApp, ClerkCatchBoundary } from "@clerk/remix";
import { Toaster } from "react-hot-toast";
import tailwindStylesheetUrl from "./styles/tailwind.css";

export const meta: MetaFunction = () => {
  return {
    title: "Remix K-Hip Hop Stack",
    charSet: "utf-8",
    viewport: "width=device-width,initial-scale=1",
  };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export async function loader(args: LoaderArgs) {
  return rootAuthLoader(args);
}

function App() {
  return (
    <html lang="en" data-theme="dracula">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <Toaster />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default ClerkApp(App);

export const CatchBoundary = ClerkCatchBoundary(() => {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <div>
      <h1>
        {caught.status}: {caught.statusText}
      </h1>
      {message}
    </div>
  );
});

export const ErrorBoundary = ({ error }: { error: Error }) => (
  <div>
    <h1>There was an error</h1>
    <p>{error.message}</p>
    <hr />
    <p>
      Hey, developer, you should replace this with what you want your users to
      see.
    </p>
  </div>
);
