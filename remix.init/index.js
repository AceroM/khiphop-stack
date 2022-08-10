const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const sort = require("sort-package-json");

function escapeRegExp(string) {
  // $& means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}

// The initialization script for your project after
// you've installed.
//
// This will:
// - Replace our template name for your given app name in the README
// - Replace our template name for your given app name in the package.json
// - Add a new .env file for you to use based upon the example file
async function main({ rootDirectory }) {
  const EXAMPLE_ENV_PATH = path.join(rootDirectory, ".env.example");
  const ENV_PATH = path.join(rootDirectory, ".env");
  const README_PATH = path.join(rootDirectory, "README.md");
  const PACKAGE_JSON_PATH = path.join(rootDirectory, "package.json");

  const REPLACER = "khiphop-stack";

  const DIR_NAME = path.basename(rootDirectory);
  const SUFFIX = getRandomString(2);
  const APP_NAME = (DIR_NAME + "-" + SUFFIX)
    // get rid of anything that's not allowed in an app name
    .replace(/[^a-zA-Z0-9-_]/g, "-");

  const [env, readme, packageJson] = await Promise.all([
    fs.readFile(EXAMPLE_ENV_PATH, "utf-8"),
    fs.readFile(README_PATH, "utf-8"),
    fs.readFile(PACKAGE_JSON_PATH, "utf-8"),
  ]);

  // Create a new env file with all the necessary keys.
  // This will create a new key to give you a new session key
  // You will want to be sure to add your own credentials
  // as well.
  const newEnv = env.replace(
    /^SESSION_SECRET=.*$/m,
    `SESSION_SECRET="${getRandomString(16)}"`
  );

  // Parse the README and replace the name with our app name
  const newReadme = readme.replace(
    new RegExp(escapeRegExp(REPLACER), "g"),
    APP_NAME
  );

  // Parse the package file and rename the application name
  const newPackageJson =
    JSON.stringify(
      sort({ ...JSON.parse(packageJson), name: APP_NAME }),
      null,
      2
    ) + "\n";

  await Promise.all([
    fs.writeFile(ENV_PATH, newEnv),
    fs.writeFile(README_PATH, newReadme),
    fs.writeFile(PACKAGE_JSON_PATH, newPackageJson),
  ]);

  console.log(
    `Setup is almost complete! Follow these steps to complete initialization:
- Register for https://clerk.dev/, visit your app -> API KEYS and copy over these values:
  - CLERK_API_KEY: Backend API keys
  - CLERK_FRONTEND_API: Frontend API Key
  - CLERK_JWT_KEY: JWT verification key
- Set your SESSION_SECRET enviornment variable
- Run the first build
  - npm run build
- Follow the EdgeDB Quickstart to setup EdgeDB Locally: https://www.edgedb.com/docs/guides/quickstart
- Once EdgeDB is setup, run
  - edgedb project init
- You're good to go! 🫡
  - npm run dev
  
For deployment instructions, please read the README.md!`.trim()
  );
}

module.exports = main;
