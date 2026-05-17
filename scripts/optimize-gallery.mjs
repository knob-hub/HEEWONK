// 갤러리 사진 자동 최적화 스크립트
// ----------------------------------------------------------------------
// src/assets/gallery-XX.jpg 원본만 넣으면 → 자동으로:
//   1) 큰 사진은 적정 크기로 압축 (배포용)
//      - 1600px 폭, JPEG quality 82 → 보통 200~500KB
//      - 원본은 src/assets/originals/ 에 자동 백업 (git에는 안 올라감)
//   2) 썸네일 자동 생성 → src/assets/thumbs/
//      - 400px 폭, JPEG quality 78 → 보통 15~50KB
//   3) 짝 없는 썸네일 자동 정리
//
// 자동 실행 시점: `npm run dev` 또는 `npm run build` 직전 (Vercel 포함)
// 수동 실행: `npm run gallery`
// ----------------------------------------------------------------------

import sharp from "sharp";
import { readdir, stat, mkdir, unlink, copyFile, rename } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, "..", "src", "assets");
const THUMBS_DIR = join(SRC_DIR, "thumbs");
const ORIGINALS_DIR = join(SRC_DIR, "originals");
const PREFIX = "gallery-";

// 풀이미지 (썸네일 클릭 시 보이는 큰 사진)
const FULL_WIDTH = 1600;
const FULL_QUALITY = 82;
const COMPRESS_THRESHOLD = 800 * 1024; // 800KB 초과 시 압축 대상

// 썸네일 (3×3 격자에 보이는 작은 사진)
const THUMB_WIDTH = 400;
const THUMB_QUALITY = 78;

function isGalleryJpg(filename) {
  return filename.startsWith(PREFIX) && /\.jpe?g$/i.test(filename);
}

async function ensureDir(dir) {
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

function fmt(bytes) {
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)}MB`
    : `${Math.round(bytes / 1024)}KB`;
}

// ────────────────────────────────────────────────────────────
// 1단계: 큰 원본 → 압축본으로 교체, 원본은 originals/ 에 백업
// ────────────────────────────────────────────────────────────
async function compressOriginals(sourceFiles) {
  let compressed = 0;
  let alreadyOptimized = 0;
  let totalSavedBytes = 0;

  for (const file of sourceFiles) {
    const srcPath = join(SRC_DIR, file);
    const origPath = join(ORIGINALS_DIR, file);
    const srcStat = await stat(srcPath);

    // 이미 작은 사진은 건너뜀 (이미 압축됐거나 처음부터 작음)
    if (srcStat.size <= COMPRESS_THRESHOLD) {
      alreadyOptimized++;
      continue;
    }

    // 1) 원본을 originals/ 에 백업 (있으면 덮어쓰기)
    await copyFile(srcPath, origPath);

    // 2) 압축본을 임시 파일로 생성
    const tmpPath = join(SRC_DIR, `.${file}.tmp`);
    await sharp(srcPath)
      .rotate() // EXIF 회전 자동 적용
      .resize({ width: FULL_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: FULL_QUALITY, mozjpeg: true })
      .toFile(tmpPath);

    // 3) 임시 파일을 원본 위치로 atomic-ish 교체
    await rename(tmpPath, srcPath);

    const newStat = await stat(srcPath);
    totalSavedBytes += srcStat.size - newStat.size;
    console.log(`[compress] ${file}: ${fmt(srcStat.size)} → ${fmt(newStat.size)}`);
    compressed++;
  }

  return { compressed, alreadyOptimized, totalSavedBytes };
}

// ────────────────────────────────────────────────────────────
// 2단계: 썸네일 생성 (mtime이 새것일 때만 재생성)
// ────────────────────────────────────────────────────────────
async function generateThumbs(sourceFiles) {
  const existingThumbs = (await readdir(THUMBS_DIR)).filter(isGalleryJpg);
  let generated = 0;
  let skipped = 0;
  let removed = 0;

  for (const file of sourceFiles) {
    const srcPath = join(SRC_DIR, file);
    const thumbPath = join(THUMBS_DIR, file);

    if (existsSync(thumbPath)) {
      const [srcStat, thumbStat] = await Promise.all([stat(srcPath), stat(thumbPath)]);
      if (thumbStat.mtimeMs >= srcStat.mtimeMs) {
        skipped++;
        continue;
      }
    }

    await sharp(srcPath)
      .rotate()
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: THUMB_QUALITY, mozjpeg: true })
      .toFile(thumbPath);

    console.log(`[thumb] 생성: ${file}`);
    generated++;
  }

  // 짝 없는 썸네일 자동 정리
  const sourceSet = new Set(sourceFiles);
  for (const file of existingThumbs) {
    if (!sourceSet.has(file)) {
      await unlink(join(THUMBS_DIR, file));
      console.log(`[thumb] 정리: ${file}`);
      removed++;
    }
  }

  return { generated, skipped, removed };
}

// 갤러리 외에 추가로 압축할 사진 (메인 사진 등 — 썸네일은 생성하지 않음)
const EXTRA_PHOTOS = ["main.jpg"];

async function main() {
  await ensureDir(THUMBS_DIR);
  await ensureDir(ORIGINALS_DIR);

  const galleryFiles = (await readdir(SRC_DIR)).filter(isGalleryJpg);
  const extraFiles = EXTRA_PHOTOS.filter((f) => existsSync(join(SRC_DIR, f)));

  if (galleryFiles.length === 0 && extraFiles.length === 0) {
    console.log("[gallery] 처리할 사진 없음");
    return;
  }

  console.log(
    `[gallery] 갤러리 ${galleryFiles.length}장 + 메인 ${extraFiles.length}장 검사 중...`
  );

  const cGallery = await compressOriginals(galleryFiles);
  const cExtra = await compressOriginals(extraFiles);
  const t = await generateThumbs(galleryFiles);

  const totalSaved = cGallery.totalSavedBytes + cExtra.totalSavedBytes;
  console.log(
    `[gallery] 완료 — ` +
      `압축 ${cGallery.compressed + cExtra.compressed} (${fmt(totalSaved)} 절약) · ` +
      `이미 최적 ${cGallery.alreadyOptimized + cExtra.alreadyOptimized} | ` +
      `썸네일 생성 ${t.generated} · 최신 ${t.skipped} · 정리 ${t.removed}`
  );
}

main().catch((err) => {
  console.error("[gallery] 실패:", err);
  process.exit(1);
});
