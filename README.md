# Full-Stack Development Environment

このプロジェクトは、フロントエンド（Next.js）とバックエンド（FastAPI）の開発環境をDockerコンテナで提供します。また、PostgreSQLデータベースも別コンテナで提供され、開発の独立性を確保しています。

## プロジェクト構成

```
.
├── backend/          # FastAPIバックエンド
├── frontend/         # Next.jsフロントエンド
└── .devcontainer/    # 開発環境設定
    ├── Dockerfile    # アプリケーションコンテナの定義
    ├── docker-compose.yml  # コンテナ構成
    └── devcontainer.json   # VS Code設定
```

## 開発環境の特徴

### アプリケーションコンテナ（app）
- Python 3.11 + Node.js LTSの統合環境
- フロントエンドとバックエンドの開発環境を1つのコンテナに統合
- ホットリロード対応
- 必要な開発ツール（curl, wget, vim等）をプリインストール

### データベースコンテナ（db）
- PostgreSQL最新版
- データの永続化（ボリュームマウント）
- 独立したコンテナで運用
- 外部からのアクセスが容易（ポート5432開放）

## セットアップ

1. リポジトリをクローン
```bash
git clone [repository-url]
cd [repository-name]
```

2. VS Codeで開く
```bash
code .
```

3. 開発コンテナで開く
- VS Codeの「Reopen in Container」を選択
- または、コマンドパレットから「Dev Containers: Reopen in Container」を実行

## 開発サーバーの起動

### バックエンド（FastAPI）
```bash
cd backend
uvicorn main:app --reload
```
- http://localhost:8000 でアクセス可能
- APIドキュメント: http://localhost:8000/docs

### フロントエンド（Next.js）
```bash
cd frontend
npm run dev
```
- http://localhost:3000 でアクセス可能

## データベース接続情報

- ホスト: localhost
- ポート: 5432
- データベース: postgres
- ユーザー: postgres
- パスワード: postgres

### データベースクライアントからの接続
- DBeaver、pgAdmin、TablePlus等のクライアントから上記情報で接続可能
- コンテナが起動していれば、ホストマシンから直接アクセス可能

## デバッグ設定

VS Codeのデバッグ設定が事前に構成されています：
- フロントエンド（Next.js）のデバッグ
- バックエンド（FastAPI）のデバッグ
- 両方同時にデバッグ可能な複合設定

## 注意事項

- 初回起動時は`postCreateCommand`により必要なパッケージが自動インストールされます
- データベースのデータは`postgres-data`ボリュームに永続化されます
- CORS設定は開発環境用に`http://localhost:3000`からのアクセスのみを許可しています

## ライセンス

MIT 