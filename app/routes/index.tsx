import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUserByClerkId } from "~/models/user.server";

export async function loader({ request }: LoaderArgs) {
  const auth = await getAuth(request);
  let isUserOnboarding = false;
  let isUserOnboarded = false;
  let user;
  if (auth.userId) {
    user = await getUserByClerkId(auth.userId);
    if (user) isUserOnboarded = true;
    else isUserOnboarding = true;
  }
  return json({ isUserOnboarded, isUserOnboarding, user });
}

export default function Index() {
  const { user, isUserOnboarded, isUserOnboarding } =
    useLoaderData<typeof loader>();

  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://res.cloudinary.com/dbupuyopo/image/upload/v1660018573/alliwannado_otlt80.jpg"
                alt="Jay park and crew dancing in the music video for the song 'All I Wanna Do'"
              />
              <div className="btn-primary-content absolute inset-0 mix-blend-multiply" />
            </div>
            <div className="lg:pb-18 relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-primary drop-shadow-md">
                  K-Hip Hop Stack
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                Check the README.md file for instructions on how to get this
                project deployed.
              </p>
              <div className="mx-auto mt-10 flex max-w-sm items-center justify-center">
                {(isUserOnboarded || isUserOnboarding) && user?.alias && (
                  <div className="mx-auto max-w-sm">
                    <Link to="/app/notes" className="btn btn-primary btn-lg">
                      {isUserOnboarding && `Go back to Onboarding`}
                      {isUserOnboarded && `View Notes for ${user.alias}`}
                    </Link>
                  </div>
                )}
                {!isUserOnboarded && !isUserOnboarding && (
                  <div className="mt-4">
                    <Link to="/sign-up" className="btn bg-base-100">
                      Sign up
                    </Link>
                    <Link to="/sign-in" className="btn btn-primary ml-3">
                      Log In
                    </Link>
                  </div>
                )}
              </div>
              <a href="https://remix.run">
                <img
                  src="https://user-images.githubusercontent.com/1500684/158298926-e45dafff-3544-4b69-96d6-d3bcc33fc76a.svg"
                  alt="Remix"
                  className="mx-auto mt-16 w-full max-w-[12rem] md:max-w-[16rem]"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8">
          <div className="mt-6 flex flex-wrap justify-center gap-8">
            {[
              {
                src: "https://user-images.githubusercontent.com/8431042/161311102-fad29f2b-ffd4-4a24-aa4e-92f3fda526a7.svg",
                alt: "Netlify",
                href: "https://netlify.com",
              },
              {
                src: "https://dbdb.io/media/logos/edgedb.svg",
                alt: "Edgedb",
                href: "https://edgedb.com",
              },
              {
                src: "https://clerk.dev/images/clerk-logo.svg",
                alt: "Clerk",
                href: "https://clerk.dve",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764276-a516a239-e377-4a20-b44a-0ac7b65c8c14.svg",
                alt: "Tailwind",
                href: "https://tailwindcss.com",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764454-48ac8c71-a2a9-4b5e-b19c-edef8b8953d6.svg",
                alt: "Cypress",
                href: "https://www.cypress.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png",
                alt: "Testing Library",
                href: "https://testing-library.com",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772934-ce0a943d-e9d0-40f8-97f3-f464c0811643.svg",
                alt: "Prettier",
                href: "https://prettier.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772990-3968ff7c-b551-4c55-a25c-046a32709a8e.svg",
                alt: "ESLint",
                href: "https://eslint.org",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg",
                alt: "TypeScript",
                href: "https://typescriptlang.org",
              },
            ].map((img) => (
              <a
                key={img.href}
                href={img.href}
                className="flex h-16 w-32 justify-center p-1 grayscale transition hover:grayscale-0 focus:grayscale-0"
              >
                <img alt={img.alt} src={img.src} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
