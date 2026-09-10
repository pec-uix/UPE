import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }
    args[key] = next;
    i += 1;
  }
  return args;
}

function getSizes(raw) {
  const defaults = [16, 32, 48, 64, 96, 180, 192, 512];
  if (!raw) return defaults;
  return raw
    .split(",")
    .map((v) => Number(v.trim()))
    .filter((v) => Number.isFinite(v) && v > 0)
    .sort((a, b) => a - b);
}

async function ensureDirectory(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function main() {
  const args = parseArgs(process.argv);
  const input = args.input || "public/images/logo.webp";
  const outputDir = args.outDir || "public/favicon";
  const name = args.name || "favicon";
  const quality = Number(args.quality || 85);
  const allowUpscale = Boolean(args.allowUpscale);
  const sizes = getSizes(args.sizes);

  const inputPath = path.resolve(process.cwd(), input);
  const outPath = path.resolve(process.cwd(), outputDir);

  await fs.access(inputPath);
  await ensureDirectory(outPath);

  const source = sharp(inputPath).ensureAlpha();
  const meta = await source.metadata();
  const width = meta.width || 0;
  const height = meta.height || 0;

  if (!width || !height) {
    throw new Error("Cannot read image size from input file.");
  }

  // Build a square transparent canvas so wide logos get top/bottom spacing.
  const side = Math.max(width, height);
  const left = Math.floor((side - width) / 2);
  const right = side - width - left;
  const top = Math.floor((side - height) / 2);
  const bottom = side - height - top;

  const squarePadded = source.extend({
    top,
    bottom,
    left,
    right,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });

  const squareBuffer = await squarePadded.png().toBuffer();

  const paddedPreviewPath = path.join(outPath, `${name}-padded.png`);
  await sharp(squareBuffer).png().toFile(paddedPreviewPath);

  const generated = [];
  const skipped = [];
  for (const size of sizes) {
    if (!allowUpscale && size > side) {
      skipped.push(size);
      continue;
    }

    const pngPath = path.join(outPath, `${name}-${size}.png`);
    const webpPath = path.join(outPath, `${name}-${size}.webp`);

    const resized = sharp(squareBuffer).resize({
      width: size,
      height: size,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      withoutEnlargement: !allowUpscale,
    });

    await resized.clone().png({ compressionLevel: 9 }).toFile(pngPath);
    await resized.webp({ quality }).toFile(webpPath);

    generated.push(size);
  }

  // Provide common favicon aliases if available.
  const alias32 = path.join(outPath, `${name}-32.png`);
  try {
    await fs.access(alias32);
    await fs.copyFile(alias32, path.join(outPath, "favicon.png"));
  } catch {
    // 32px icon not generated.
  }

  console.log(`Input: ${input}`);
  console.log(`Original: ${width}x${height}`);
  console.log(`Padded square: ${side}x${side}`);
  console.log(`Generated sizes: ${generated.join(", ") || "(none)"}`);

  if (skipped.length) {
    console.log(`Skipped (would upscale): ${skipped.join(", ")}`);
  }

  console.log(`Output dir: ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
