#!/bin/bash

# エラーハンドリング
set -e

echo "📦 Laravel APIバックエンド環境のセットアップを開始します..."

# Laravelプロジェクトのディレクトリを指定 (カレントディレクトリを想定)
PROJECT_DIR=$(pwd)

echo "📂 プロジェクトディレクトリ: $PROJECT_DIR"

# 1. フロントエンド関連の不要なファイルを削除
echo "🗑️ フロントエンド関連のファイルを削除..."
rm -rf resources/views \
       resources/css \
       resources/js \
       public/css \
       public/js \
       webpack.mix.js \
       vite.config.js \
       package.json \
       postcss.config.js \
       tailwind.config.js \
       node_modules

# 2. routes/web.php の内容を変更 (API専用にする)
echo "📝 routes/web.php をAPI専用に変更..."
if [ -f "routes/web.php" ]; then
	cat <<EOL > routes/web.php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Welcome to API'], 200);
});
EOL

else
    echo "⚠️ RouteServiceProvider.php が見つかりません。スキップします。"
fi

# 3. app/Providers/RouteServiceProvider.php を変更し、webルートを無効化
echo "🛠️ RouteServiceProvider の設定を変更..."

if [ -f "app/Providers/RouteServiceProvider.php" ]; then
    sed -i "s|Route::middleware('web')|// Route::middleware('web')|" app/Providers/RouteServiceProvider.php
else
    echo "⚠️ RouteServiceProvider.php が見つかりません。スキップします。"
fi

# 4. セッションを無効化 (config/session.php)
echo "🔧 セッションを無効化..."
sed -i "s/'driver' => env('SESSION_DRIVER', 'file')/'driver' => env('SESSION_DRIVER', 'array')/" config/session.php

# 5. .env のセッション設定を変更
echo "🔄 .env ファイルのセッション設定を変更..."
sed -i "s/SESSION_DRIVER=file/SESSION_DRIVER=array/" .env

# 6. composer dump-autoload を実行
echo "🚀 autoload のリフレッシュ..."
composer dump-autoload

# 7. キャッシュクリア
echo "🧹 キャッシュクリア..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

echo "✅ Laravel APIバックエンド環境のセットアップが完了しました！"