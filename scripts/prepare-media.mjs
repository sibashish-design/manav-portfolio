import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

const projectRoot = process.cwd();
const publicRoot = path.join(projectRoot, "public");
const sourceRoot = path.join(publicRoot, "Videos");
const optimizedRoot = path.join(publicRoot, "videos-optimized");
const featuredRoot = path.join(publicRoot, "videos-featured");
const thumbnailRoot = path.join(publicRoot, "video-thumbnails");
const videoExtensions = new Set([".mp4", ".mov", ".m4v"]);

const featuredVideos = new Set([
  "ASIAN Recap.mp4",
  "Day 1 Event Highlight.mp4",
  "Day 2 Event Highlight.mp4",
  "Day 3  Event Highlight.mp4",
  "Drone and Bytes Video.mp4",
  "International Line up Reel.mp4",
  "ISAI JOURNEY.mp4",
  "Team Meeting Reel.mp4",
  "Welcome to India.mp4",
]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return videoExtensions.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
  });
}

function outputFor(root, source, extension = ".mp4") {
  const relative = path.relative(sourceRoot, source);
  const parsed = path.parse(relative);
  return path.join(root, parsed.dir, `${parsed.name}${extension}`);
}

function isFresh(source, output) {
  if (!fs.existsSync(output)) return false;
  const sourceStat = fs.statSync(source);
  const outputStat = fs.statSync(output);
  return outputStat.mtimeMs >= sourceStat.mtimeMs && outputStat.size > 0;
}

function runFfmpeg(args) {
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

async function encodeVideo(source, output, { scale, crf, audio }) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  await runFfmpeg([
    "-y",
    "-i",
    source,
    "-vf",
    `scale='min(${scale},iw)':-2`,
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    String(crf),
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    audio,
    "-movflags",
    "+faststart",
    output,
  ]);
}

async function extractThumbnail(source, output) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  await runFfmpeg([
    "-y",
    "-ss",
    "00:00:01.250",
    "-i",
    source,
    "-frames:v",
    "1",
    "-vf",
    "scale='min(1280,iw)':-2",
    "-q:v",
    "3",
    output,
  ]);
}

const videos = walk(sourceRoot);
console.log(`Preparing ${videos.length} videos...`);

for (const [index, source] of videos.entries()) {
  const label = path.relative(sourceRoot, source);
  const optimized = outputFor(optimizedRoot, source);
  const thumbnail = outputFor(thumbnailRoot, source, ".jpg");
  const featured = outputFor(featuredRoot, source);

  if (!isFresh(source, optimized)) {
    console.log(`[${index + 1}/${videos.length}] optimize ${label}`);
    await encodeVideo(source, optimized, { scale: 720, crf: 38, audio: "48k" });
  }

  if (!isFresh(source, thumbnail)) {
    console.log(`[${index + 1}/${videos.length}] thumbnail ${label}`);
    await extractThumbnail(source, thumbnail);
  }

  if (featuredVideos.has(path.basename(source)) && !isFresh(source, featured)) {
    console.log(`[${index + 1}/${videos.length}] featured ${label}`);
    await encodeVideo(source, featured, { scale: 1280, crf: 30, audio: "96k" });
  }
}

console.log("Media ready.");
