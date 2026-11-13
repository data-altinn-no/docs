// Copies front-end libraries from node_modules into the Hugo static folders.
//
// The site is built by Hugo alone, so the copied files are committed. The versions live in
// package.json; after changing one, run `npm install` and `npm run vendor`, then commit the result.
// `npm run vendor:check` exits with an error when the committed files do not match package.json.

import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { minify } from "terser";
import { promisify } from "node:util";

const run = promisify(execFile);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const modules = path.join(root, "node_modules");
const theme = "themes/hugo-theme-altinn/static";
const require = createRequire(import.meta.url);

const read = (file) => readFile(path.join(modules, file));
const version = (pkg) => require(path.join(modules, pkg, "package.json")).version;

// Plain copies: [file in node_modules, destination in the repo].
const copies = [
  ["swagger-ui-dist/swagger-ui-bundle.js", `${theme}/js/swagger-ui-bundle.js`],
  ["swagger-ui-dist/swagger-ui-standalone-preset.js", `${theme}/js/swagger-ui-standalone-preset.js`],
  ["swagger-ui-dist/swagger-ui.css", `${theme}/css/swagger-ui.css`],
  ["@highlightjs/cdn-assets/highlight.min.js", `${theme}/js/highlight.min.js`],
  ["clipboard/dist/clipboard.min.js", `${theme}/js/clipboard.min.js`],
  ["jquery/dist/jquery.min.js", `${theme}/js/jquery.min.js`],
  ["font-awesome/css/font-awesome.min.css", `${theme}/css/font-awesome.min.css`],
  ...["eot", "svg", "ttf", "woff", "woff2"].map((ext) => [
    `font-awesome/fonts/fontawesome-webfont.${ext}`,
    `${theme}/fonts/fontawesome-webfont.${ext}`,
  ]),
];

// Builds the theme CSS from designsystemet.config.json with the Designsystemet CLI.
const themeName = "digdir";
const themeDir = path.join(modules, ".cache", "designsystemet"); // the css output dir in the config

async function buildTheme() {
  const cliPkg = "@digdir/designsystemet";
  const cli = path.join(modules, cliPkg, require(path.join(modules, cliPkg, "package.json")).bin.designsystemet);
  await run(process.execPath, [cli, "--config", path.join(root, "designsystemet.config.json"), "--yes"], { cwd: root });
  return readFile(path.join(themeDir, `${themeName}.css`));
}

// Designsystemet for the landing page: the Digdir theme plus only the components the page uses.
const designsystemetComponents = [
  "base",
  "heading",
  "paragraph",
  "link",
  "list",
  "button",
  "card",
  "divider",
  "skip-link",
];

async function designsystemet() {
  const cliPkg = "@digdir/designsystemet";
  const cssPkg = "@digdir/designsystemet-css";
  const header =
    `/* Designsystemet (designsystemet.no), vendored for the landing page.\n` +
    `   Theme: "${themeName}" in designsystemet.config.json, built with ${cliPkg}@${version(cliPkg)}\n` +
    `   Components: ${cssPkg}@${version(cssPkg)} dist/src/{${designsystemetComponents.join(",")}}.css\n` +
    `   Do not edit by hand; change the config or the versions in package.json and run \`npm run vendor\`. */\n`;
  const themeCss = await buildTheme();
  const components = await Promise.all(
    designsystemetComponents.map(
      async (name) => `/* --- ${name}.css --- */\n${await read(`${cssPkg}/dist/src/${name}.css`)}`,
    ),
  );
  return Buffer.from(`${header}${themeCss}\n${components.join("\n")}`);
}

// json-schema-faker only ships an unminified browser bundle.
async function jsonSchemaFaker() {
  const pkg = "json-schema-faker";
  const source = (await read(`${pkg}/dist/bundle.js`)).toString();
  const result = await minify(source, { format: { comments: /^!|@license|@preserve/ } });
  return Buffer.from(`/* ${pkg}@${version(pkg)} dist/bundle.js, minified with terser by scripts/vendor.mjs. */\n${result.code}\n`);
}

const outputs = [
  ...copies.map(([from, to]) => [to, () => read(from)]),
  ["static/css/designsystemet.css", designsystemet],
  [`${theme}/js/jsonschemafaker.js`, jsonSchemaFaker],
];

// Git may check text files out with CRLF on Windows; ignore that when comparing.
const normalise = (buffer) => buffer.toString("latin1").replaceAll("\r\n", "\n");

const check = process.argv.includes("--check");
let stale = 0;

for (const [to, build] of outputs) {
  const target = path.join(root, to);
  const wanted = await build();
  const current = await readFile(target).catch(() => null);
  const same = current !== null && normalise(current) === normalise(wanted);
  if (same) continue;
  stale++;
  if (check) {
    console.error(`out of date: ${to}`);
  } else {
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, wanted);
    console.log(`updated: ${to}`);
  }
}

if (check && stale > 0) {
  console.error(`\n${stale} file(s) do not match package.json. Run \`npm install\` and \`npm run vendor\`, then commit the result.`);
  process.exit(1);
}
console.log(check ? "Vendored files match package.json." : `Done, ${stale} file(s) updated.`);
