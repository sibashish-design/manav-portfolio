import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, "public", "Videos");
const outputRoot = path.join(projectRoot, "public", "videos-optimized");
const videoExtensions = new Set([".mp4", ".mov", ".m4v"]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return videoExtensions.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
  });
}

function outputFor(source) {
  const relative = path.relative(sourceRoot, source);
  const parsed = path.parse(relative);
  return path.join(outputRoot, parsed.dir, `${parsed.name}.mp4`);
}

function shouldSkip(source, output) {
  if (!fs.existsSync(output)) return false;
  const sourceStat = fs.statSync(source);
  const outputStat = fs.statSync(output);
  return outputStat.mtimeMs >= sourceStat.mtimeMs && outputStat.size > 0;
}

function runFfmpeg(source, output) {
  fs.mkdirSync(path.dirname(output), { recursive: true });

  const args = [
    "-y",
    "-i",
    source,
    "-vf",
    "scale='min(720,iw)':-2",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "38",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    "48k",
    "-movflags",
    "+faststart",
    output,
  ];

  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr || `ffmpeg exited with ${code}`));
    });
  });
}

const videos = walk(sourceRoot);

if (videos.length === 0) {
  console.log("No videos found in public/Videos.");
  process.exit(0);
}

console.log(`Optimizing ${videos.length} videos into public/videos-optimized...`);

for (const [index, source] of videos.entries()) {
  const output = outputFor(source);
  const label = path.relative(sourceRoot, source);

  if (shouldSkip(source, output)) {
    console.log(`[${index + 1}/${videos.length}] skip ${label}`);
    continue;
  }

  console.log(`[${index + 1}/${videos.length}] optimize ${label}`);
  await runFfmpeg(source, output);

  const before = fs.statSync(source).size / 1024 / 1024;
  const after = fs.statSync(output).size / 1024 / 1024;
  console.log(`  ${before.toFixed(1)} MB -> ${after.toFixed(1)} MB`);
}

console.log("Done.");
