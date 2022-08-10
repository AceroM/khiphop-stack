# Remix K-Hip Hop Stack

Remix + EdgeDB + Netlify 🕺

![k-hip-pop stack site image](https://res.cloudinary.com/dbupuyopo/image/upload/v1660147140/localhost_3000__1_unqbsl.png)

Deployed Site: [khiphop-stack.netlify.app](https://khiphop-stack.netlify.app/)

Heavily Inspired By:

- [K-Pop Stack](https://github.dev/netlify-templates/kpop-stack)
  - This stack also uses Netlify :), hence a korean music genre
- [Remix Chop Suey Stack](https://github.dev/jkcorrea/remix-chop-suey-stack)
  - Used a lot of the edge db / clerk setup

Learn more about [Remix Stacks](https://remix.run/stacks).

```
npx create-remix --template acerom/khiphop-stack
```

Click this button to create a new Github repo, new Netlify project and deploy this stack to a [CDN](https://jamstack.org/glossary/cdn/).

[![Deploy to Netlify Button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/acerom/khiphop-stack)

### What's in the stack

- [Netlify](https://netlify.com/) deployment to the [Edge](https://www.netlify.com/products/edge) + deploy previews and CI/CD
- [Clerk] For simple user authentication
- [EdgeDB](https://supabase.com/) Next generation graph-relational database with [access policies]() for user security!
- [Tailwind](https://tailwindcss.com/) for styling
- [Cypress](https://cypress.io) end-to-end testing
- [Prettier](https://prettier.io) code formatting
- [ESLint](https://eslint.org) linting
- [TypeScript](https://typescriptlang.org)

### Other Stuff

- [Classnames] Uses `classnames` package for conditional styling
- [Headless UI](https://headlessui.com/) Essential component primitives used for modals, popovers etc.
- [Zod](https://github.com/colinhacks/zod) + [Remix Params Helper](https://github.com/kiliman/remix-params-helper) Server-sided form validation
- [Conform](https://github.com/edmundhung/conform) Client sided form validation edmun for form validation using the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation)
- [Tiny Invariant](https://www.npmjs.com/package/tiny-invariant) Handy tool for validating the existence of variables
- [Remix Flat Route](https://github.com/kiliman/remix-flat-routes) Flat file directory structure

### Why?

- I like using the JAM stack
- Using netlify to host, we can leverage a lot of built in CICD.
- Supabase/Prisma is great, but I think edge db does a slightly better job with [migrations](https://www.edgedb.com/showcase/migrations), and has overall been a smooth experience to visualize the db layer

### Project Setup

- Install all dependencies & the [Netlify CLI](https://docs.netlify.com/cli/get-started/):

  ```sh
  npm install
  npm install netlify-cli -g
  ```

- Create or connect to your Netlify project by running through the Netlify `init` script:

  ```sh
  netlify init
  ```

#### Local Development

For local development, first make sure you have edgedb installed (follow the [quickstart](https://www.edgedb.com/docs/guides/quickstart#initialize-a-project))

- Initialize your project

```
edgedb project init
```

- Now we need to create and apply the migrations to our new database

```
edgedb migration create
edgedb migration apply
```

- Generate the edgedb types required for your project. All your types will now be located in `./app/db/edgeql`

```
npm run generate:eql
```

#### Setting Netlify Environment variables

For some reason, setting environment variables in the netlify UI

<details>
  <summary>Environment Variable list in project dashboard.</summary>

![screenshot of env vars in Netlify UI](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1649265873/CleanShot_2022-04-06_at_13.23.38_2x_sh3hoy.jpg)

</details>

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

### Database Setup

[EdgeDB UI DB Setup](https://res.cloudinary.com/dbupuyopo/image/upload/v1660096223/khiphop_stack_db_tepuji.png)

```esdl
module default {
  global current_user -> str;

  type User {
    required property clerk_id -> str { constraint exclusive };
    required property alias -> str { constraint exclusive };
  }

  type Note {
    required link author -> User;
    required property name -> str;
    property description -> str;

    access policy insert_notes allow insert;
    access policy own_notes allow select, delete, update using (
      .author ?= (select User filter .clerk_id = global current_user)
    );
  }
}
```

- When creating a new User, we only store their `clerk_id` and username
- We define _object-level security_ using [access policies](https://www.edgedb.com/docs/datamodel/access_policies) such that users can only query, delete, and update _their own_ notes based on their `clerk_id`

### Running Locally

The Remix dev server starts your app in development mode, rebuilding assets on file changes. To start the Remix dev server:

```sh
npm run dev
```

The Netlify CLI builds a production version of your Remix App Server and splits it into Netlify Functions that run locally. This includes any custom Netlify functions you've developed. The Netlify CLI runs all of this in its development mode.

It will pull in all the [environment variables](https://docs.netlify.com/configure-builds/environment-variables/#declare-variables) of your Netlify project. You can learn more about this project's EdgeDB environment variables in [the Database section](#database).

To start the Netlify development environment:

```sh
netlify dev
```

With Netlify Dev you can also:

- test functions
- test redirects
- share a live session via url with `netlify dev --live`
- [and more](https://cli.netlify.com/netlify-dev/) :)

Note: When running the Netlify CLI, file changes will rebuild assets, but you will not see the changes to the page you are on unless you do a browser refresh of the page. Due to how the Netlify CLI builds the Remix App Server, it does not support hot module reloading.

### Relevant code:

This is a pretty simple CRUD note-taking app, but it's a good example of how you can build a full stack app with Remix, EdgeDB, and Netlify

- creating users, and logging in and out [./app/models/user.server.ts](./app/models/user.server.ts)
- user sessions, and verifying them [./app/session.server.ts](./app/session.server.ts)
- creating, and deleting notes [./app/models/note.server.ts](./app/models/note.server.ts)
- updating notes []()

---

### Environment Variables

You will need these 2 environment variables to connect to your Supabase instance:

- `SUPABASE_ANON_KEY`:

  Found in Settings/API/Project API keys
  <details><summary> See screenshot</summary>

  ![supabase anon key location](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1649193447/Screen_Shot_2022-04-05_at_5.15.45_PM_ipdgcc.jpg)

  </details>

- `SUPABASE_URL`:

  Found in Settings/API/Configuration/URL
  <details><summary> See screenshot</summary>

  ![supabase url location](https://res.cloudinary.com/dzkoxrsdj/image/upload/v1649193610/Screen_Shot_2022-04-05_at_5.18.12_PM_sj7mj8.jpg)

  </details>

You can add your environment variables to an `.env` file (like shown in the sample [`.env.sample`](./.env.sample)) which will not be committed publicly because it is added to the `.gitignore` file. Or you can add it to your Netlify project environment variables (Site settings/Build & deploy/Environment) as shown in the [Development section](#development) so that they can be [easily shared with teammates](https://www.netlify.com/blog/2021/12/09/use-access-and-share-environment-variables-on-netlify).

---

### Netlify Deployment

This stack has the Netlify [configuration file (netlify.toml)](./netlify.toml) that contains all the information needed to deploy your project to Netlify's [edge nodes](https://www.netlify.com/products/edge).

Want to deploy immediately? Click this button

[![Deploy to Netlify Button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/nextjs-toolbox)

Clicking this button will start the setup for a new project and deployment.

### Deploy from the Command Line

Clone this repo with the `git clone` command. Then install the [Netlify CLI](https://docs.netlify.com/cli/get-started/) tool and run `netlify init`.

```sh
git clone https://github.com/netlify-templates/kpop-stack

npm install netlify-cli -g # to install the Netlify CLI tool globally

netlify init # initialize a new Netlify project & deploy
```

### Creating Fly.io EdgeDB instance

### Connecting Netlify Deployment to Fly.io instance

- Deploy an EdgeDB instance to [fly.io](https://fly.io/) by following the setup instructions here: [Deploying EdgeDB to Fly.io](https://www.edgedb.com/docs/guides/deployment/fly_io)

- Add your EdgeDB and session environment variables to a `.env` file like [`.env.sample`](./.env.sample) file or through the Netlify project dashboard at [https://app.netlify.com/](https://app.netlify.com/) Site settings/Build & deploy/Environment:

  ```
  SUPABASE_URL=""
  SUPABASE_ANON_KEY=""
  SESSION_SECRET=""
  ```

- Save your current fly config

```
flyctl config save -a $EDB_APP
```

- Connec

### CI/CD

Using the 'Deploy to Netlify' button or the `init` process will also set up continuous deployment for your project so that a new build will be triggered & deployed when you push code to the repo (you can change this from your project dashboard: Site Settings/Build & deploy/Continuous Deployment).

You can also use `netlify deploy` or `netlify deploy --prod` to manually deploy then `netlify open` to open your project dashboard.

> 💡 If you don't use `--prod` on the deploy command you will deploy a preview of your application with a link to share with teammates to see the site deployed without deploying to production

---

## Testing

This project uses [Vite](https://vitest.dev/) for unit tests

### Cypress

We have set up the basic configuration files for [Cypress](https://go.cypress.io/) End-to-End tests in this project. You'll find those in the `cypress` directory. As you make changes, add to an existing file or create a new file in the `cypress/integrations` directory to test your changes.

We use [`@testing-library/cypress`](https://testing-library.com/cypress) for selecting elements on the page semantically.

To run these tests in development, run `npm run e2e-test` which will start the dev server for the app as well as the Cypress client.

To other example of Cypress tests specifically on Remix stacks, check out the `cypress` directory in the [Remix Grunge Stack example](https://github.com/remix-run/grunge-stack/tree/main/cypress).

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.
