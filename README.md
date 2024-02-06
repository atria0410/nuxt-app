# Nuxt 3

<p>
  <img src="https://img.shields.io/badge/-Docker-1488C6.svg?logo=docker&style=plastic">
  <img src="https://img.shields.io/badge/-Nuxt.js-00C58E.svg?logo=nuxt.js&style=plastic">
  <img src="https://img.shields.io/badge/-Typescript-007ACC.svg?logo=typescript&style=plastic">
</p>

## セットアップ

.env.example をコピーして.env を作成してください。  
.env の内容は必要に応じて修正してください。

## 開発モード

```bash
docker compose -f "docker-compose.dev.yml" up -d --build
```

`http://localhost:3000`

## 本番モード

```bash
docker compose -f "docker-compose.prod.yml" up -d --build
```

`http://localhost:3000`

## 参考

[Nuxt 3 公式ドキュメント](https://nuxt.com/docs/getting-started/introduction)
