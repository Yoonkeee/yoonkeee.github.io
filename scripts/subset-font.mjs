import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_FONT = join(root, "node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2");
const OUTPUT = join(root, "public/fonts/pretendard-subset.woff2");
const TEXT_ROOT = join(root, "src");
const TEXT_EXTENSIONS = new Set([".ts", ".tsx"]);
const PRINTABLE_ASCII = Array.from({ length: 0x7f - 0x20 }, (_, offset) => String.fromCodePoint(0x20 + offset));

const files = (await readdir(TEXT_ROOT, { recursive: true })).filter((file) => TEXT_EXTENSIONS.has(extname(file)));
const sources = await Promise.all(files.map((file) => readFile(join(TEXT_ROOT, file), "utf8")));
const characters = [...new Set([...PRINTABLE_ASCII, ...sources.join("")])].filter((character) => character >= " ");

const font = await subsetFont(await readFile(SOURCE_FONT), characters.join(""), { targetFormat: "woff2" });
await mkdir(dirname(OUTPUT), { recursive: true });
await writeFile(OUTPUT, font);

console.log(`pretendard-subset.woff2: ${characters.length} characters, ${(font.length / 1024).toFixed(1)} KB`);
