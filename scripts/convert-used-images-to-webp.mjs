import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const APP_DIR = path.join(ROOT, "app");

const CODE_EXTENSIONS = new Set([
  ".vue",
  ".js",
  ".ts",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
]);

const renameMap = {
  "logo_v2.png": "logo.webp",
  "官方網站大圖修0421.png": "hero-aerial.webp",
  "關於我們.png": "about-us.webp",
  "核心能力.png": "core-capabilities.webp",
  "未來發展.jpg": "future-development.webp",
  "太陽能板.jpg": "facility-solar-panels.webp",
  "國際會議廳.png": "facility-conference-hall.webp",
  "閱覽室.png": "facility-reading-room.webp",
  "教育訓練室.png": "facility-training-room.webp",
  "員工生活區.png": "facility-staff-lounge.webp",
  "哺集乳室.png": "facility-nursing-room.webp",
  "桃園航空城物流園區.png": "park-taoyuan-aerotropolis.webp",
  "桃園 U-PARK 智匯產業園區.png": "park-taoyuan-u-park.webp",
  "桃園楊梅民豐物流園區.png": "park-taoyuan-yangmei-minfeng.webp",
  "台中港物流園區.png": "park-taichung-port.webp",
};

const widthMap = {
  "logo_v2.png": 360,
  "官方網站大圖修0421.png": 1920,
  "關於我們.png": 1280,
  "核心能力.png": 1280,
  "未來發展.jpg": 1280,
  "太陽能板.jpg": 1200,
  "國際會議廳.png": 1200,
  "閱覽室.png": 1200,
  "教育訓練室.png": 1200,
  "員工生活區.png": 1200,
  "哺集乳室.png": 1200,
  "桃園航空城物流園區.png": 1400,
  "桃園 U-PARK 智匯產業園區.png": 1400,
  "桃園楊梅民豐物流園區.png": 1400,
  "台中港物流園區.png": 1400,
};

function normalizeImagePath(imgPath) {
  return imgPath.startsWith("/") ? imgPath : `/${imgPath}`;
}

async function walkFiles(startPath, collector) {
  const items = await fs.readdir(startPath, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(startPath, item.name);
    if (item.isDirectory()) {
      await walkFiles(fullPath, collector);
      continue;
    }

    const ext = path.extname(item.name).toLowerCase();
    if (CODE_EXTENSIONS.has(ext)) {
      collector.push(fullPath);
    }
  }
}

function fallbackName(originalBaseName, usedNames) {
  const stem = path.parse(originalBaseName).name.toLowerCase();
  const slug = stem
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  let candidate = `${slug || "image"}.webp`;
  let index = 2;
  while (usedNames.has(candidate)) {
    candidate = `${slug || "image"}-${index}.webp`;
    index += 1;
  }
  return candidate;
}

async function getCodeFiles() {
  const files = [];
  await walkFiles(APP_DIR, files);

  const rootCandidates = ["nuxt.config.ts", "README.md"];
  for (const name of rootCandidates) {
    const abs = path.join(ROOT, name);
    try {
      await fs.access(abs);
      files.push(abs);
    } catch {
      // Optional root-level file does not exist.
    }
  }

  return files;
}

function collectReferencedImages(content) {
  const matches = new Set();
  const regex = /\/images\/([^"'`]+?\.(?:png|jpe?g))/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    matches.add(normalizeImagePath(`/images/${match[1]}`));
  }
  return matches;
}

async function main() {
  const codeFiles = await getCodeFiles();
  const imageRefs = new Set();

  for (const file of codeFiles) {
    const content = await fs.readFile(file, "utf8");
    for (const img of collectReferencedImages(content)) {
      imageRefs.add(img);
    }
  }

  const usedOutputNames = new Set();
  const replacements = new Map();
  const converted = [];
  const skippedMissing = [];

  for (const imageRef of Array.from(imageRefs).sort()) {
    const relPath = imageRef.replace(/^\//, "");
    const absSource = path.join(PUBLIC_DIR, relPath.replace(/^images\//, "images/"));
    const sourceBaseName = path.basename(absSource);

    try {
      await fs.access(absSource);
    } catch {
      skippedMissing.push(imageRef);
      continue;
    }

    const mappedName = renameMap[sourceBaseName] || fallbackName(sourceBaseName, usedOutputNames);
    usedOutputNames.add(mappedName);

    const outputRel = `/images/${mappedName}`;
    const absOutput = path.join(PUBLIC_DIR, "images", mappedName);
    const maxWidth = widthMap[sourceBaseName] || 1400;

    const srcMeta = await sharp(absSource).metadata();
    const beforeWidth = srcMeta.width || null;

    await sharp(absSource)
      .rotate()
      .resize({
        width: maxWidth,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 82, effort: 5 })
      .toFile(absOutput);

    const outMeta = await sharp(absOutput).metadata();
    const afterWidth = outMeta.width || null;

    replacements.set(imageRef, outputRel);
    converted.push({
      from: imageRef,
      to: outputRel,
      beforeWidth,
      afterWidth,
      enlarged: beforeWidth !== null && afterWidth !== null ? afterWidth > beforeWidth : false,
    });
  }

  for (const file of codeFiles) {
    const content = await fs.readFile(file, "utf8");
    let updated = content;
    for (const [from, to] of replacements) {
      if (updated.includes(from)) {
        updated = updated.split(from).join(to);
      }
    }
    if (updated !== content) {
      await fs.writeFile(file, updated, "utf8");
    }
  }

  console.log(`Scanned code files: ${codeFiles.length}`);
  console.log(`Referenced raster images: ${imageRefs.size}`);
  console.log(`Converted images: ${converted.length}`);

  for (const row of converted) {
    const status = row.enlarged ? "ENLARGED (unexpected)" : "ok";
    console.log(
      `${row.from} -> ${row.to} | ${row.beforeWidth ?? "?"}px => ${row.afterWidth ?? "?"}px | ${status}`,
    );
  }

  if (skippedMissing.length > 0) {
    console.log("Skipped missing source files:");
    for (const missing of skippedMissing) {
      console.log(`- ${missing}`);
    }
  }

  const enlargedRows = converted.filter((row) => row.enlarged);
  if (enlargedRows.length > 0) {
    process.exitCode = 2;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
