// 갤러리 썸네일 자동 생성 스크립트
// ----------------------------------------------------------------------
// src/assets/gallery-XX.jpg 원본만 있으면 → src/assets/thumbs/gallery-XX.jpg
// 작은 버전이 자동 생성됩니다.
//
// 원본 사진을 추가/교체/삭제하기만 하면 됩니다.
// - 추가/교체: 새 썸네일 생성
// - 원본 삭제: 짝 없는 썸네일 자동 정리
// - 이미 최신: 건너뜀 (mtime 비교)
//
// 자동 실행 시점: `npm run dev` 또는 `npm run build` 직전 (Vercel 포함)
// 수동 실행: `npm run thumbs`
// ----------------------------------------------------------------------

import sharp from "sharp";
import { readdir, stat, mkdir, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, "..", "src", "assets");
const THUMBS_DIR = join(SRC_DIR, "thumbs");
const PREFIX = "gallery-";
const THUMB_WIDTH = 400;       // 3열 격자 셀 ~140px → 레티나 대응 2~3배
const THUMB_QUALITY = 78;      // 시각적으로 거의 차이 안나면서 용량 절감

function isGalleryJpg(filename) {
  return filename.startsWith(PREFIX) && /\.jpe?g$/i.test(filename);
}

async function main() {
  if (!existsSync(THUMBS_DIR)) {
    await mkdir(THUMBS_DIR, { recursive: true });
  }

  const sourceFiles = (await readdir(SRC_DIR)).filter(isGalleryJpg);
  const existingThumbs = (await readdir(THUMBS_DIR)).filter(isGalleryJpg);

  if (sourceFiles.length === 0) {
    console.log("[thumbs] 원본 사진 없음 (src/assets/gallery-*.jpg)");
    return;
  }

  let generated = 0;
  let skipped = 0;
  let removed = 0;

  // 1) 원본 → 썸네일 생성/갱신
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
      .rotate() // EXIF 회전 자동 적용
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: THUMB_QUALITY, mozjpeg: true })
      .toFile(thumbPath);

    console.log(`[thumbs] 생성: ${file}`);
    generated++;
  }

  // 2) 원본 없는 짝없는 썸네일 자동 정리
  const sourceSet = new Set(sourceFiles);
  for (const file of existingThumbs) {
    if (!sourceSet.has(file)) {
      await unlink(join(THUMBS_DIR, file));
      console.log(`[thumbs] 정리(원본 없음): ${file}`);
      removed++;
    }
  }

  console.log(
    `[thumbs] 완료 — 생성 ${generated} · 최신 유지 ${skipped} · 정리 ${removed}`
  );
}

main().catch((err) => {
  console.error("[thumbs] 실패:", err);
  process.exit(1);
});
