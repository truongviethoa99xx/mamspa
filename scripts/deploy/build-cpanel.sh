#!/usr/bin/env bash
# ════════════════════════════════════════════════════════════════════════
#  build-cpanel.sh — Đóng gói artifact deploy lên hosting cPanel (no Docker).
#
#  Vì cPanel shared hosting KHÔNG build được Vite/Node và thường thiếu
#  Composer, script này build sẵn mọi thứ ở máy local rồi nén thành 1 file
#  zip để upload qua File Manager / FTP và giải nén trên server.
#
#  Dùng:  bash scripts/deploy/build-cpanel.sh
#  Kết quả: dist/mahaspa-cpanel-<timestamp>.zip
# ════════════════════════════════════════════════════════════════════════
set -euo pipefail

cd "$(dirname "$0")/../.."
ROOT="$(pwd)"
STAMP="$(date +%Y%m%d-%H%M%S)"
OUT_DIR="$ROOT/dist"
ARTIFACT="$OUT_DIR/mahaspa-cpanel-$STAMP.zip"

echo "▶ 1/4  Build frontend assets (Vite, client-only)…"
npm ci
npm run build

echo "▶ 2/4  Cài vendor production (no-dev, optimized autoloader)…"
composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

echo "▶ 3/4  Dọn artifact dev còn sót…"
# 'hot' file = trỏ tới Vite dev server. Nếu lên prod sẽ khiến site nạp asset
# từ localhost → trắng trang. PHẢI xoá trước khi đóng gói.
rm -f public/hot

echo "▶ 4/4  Nén artifact → $ARTIFACT"
mkdir -p "$OUT_DIR"
rm -f "$ARTIFACT"

# Đóng gói TẤT CẢ thứ server cần, loại bỏ secret + file dev.
# public/build và vendor ĐƯỢC đưa vào (server không build/cài được).
zip -r -q "$ARTIFACT" . \
  -x "node_modules/*" \
  -x ".git/*" \
  -x ".github/*" \
  -x "dist/*" \
  -x "tests/*" \
  -x ".env" \
  -x ".env.backup" \
  -x ".env.production" \
  -x "storage/logs/*" \
  -x "storage/framework/cache/data/*" \
  -x "storage/framework/sessions/*" \
  -x "storage/framework/views/*" \
  -x "public/hot" \
  -x "public/storage/*" \
  -x "*.DS_Store"

echo ""
echo "✅ Xong: $ARTIFACT"
echo "   Upload file này lên cPanel, giải nén, rồi làm theo DEPLOY-CPANEL.md (mục 4)."
