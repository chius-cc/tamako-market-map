# Cloudflare 托管与 CI/CD 资源调研清单（`map.tamako.chius.dev`）

本文档记录在 `chius.dev` 账号下将《玉子市场 / 玉子爱情故事》交互式剧情地图部署至 `https://map.tamako.chius.dev` 所需的最小充分 Cloudflare 资源、证书机制与自动化流水线设计。

## 一、已核实的账号与 Zone 前提

通过 `cf zones list` 与 `cf workers list`（Account: `Chius` / `09586f114a1403169164570ec0efac06`）实测结果：

| 项目 | 当前状态 | 说明 |
| --- | --- | --- |
| 目标 Zone | `chius.dev`（`a56d063f48d5ddfd14ed72b7391fbcd3`） | Status: `active` · Type: `full` · Plan: `Free Website` |
| 目标子域名 | `map.tamako.chius.dev` | 初始无冲突 DNS 记录或同名 Worker |
| 同类现网参照 | `social.city.chius.dev` (`city-social-map`)、`avatar.city.chius.dev` (`city-avatar`) | 均采用 Workers Custom Domain 模式绑定四级域名并签发 Google Trust Services 专属证书 |

## 二、所需 Cloudflare 资源清单（最小充分集）

| 资源 | 配置与作用 | 为什么需要 / 为什么不需要其他资源 |
| --- | --- | --- |
| **Workers + Workers Static Assets** | Worker 名称 `tamako-market-map`，无服务端 `entrypoint`，`assets.notFoundHandling: "single-page-application"`，`assets.htmlHandling: "auto-trailing-slash"`，`workersDev: false` | Cloudflare 对新站点与 SPA 推荐 Workers Static Assets 而非旧版 Pages；纯静态资源请求免费、不消耗 Worker 调用次数，且内置 SPA 回退与边缘缓存。 |
| **Workers Custom Domain** | 在 `cloudflare.config.ts` 声明 `domains: ["map.tamako.chius.dev"]` | `map.tamako.chius.dev` 为二级子域名（`*.*.chius.dev`），Free Plan 默认 Universal SSL 仅覆盖 `chius.dev` 与 `*.chius.dev`。使用 Workers Custom Domain 后，Cloudflare 会**自动创建代理 `AAAA 100::` DNS 记录并自动签发该精确主机名专属 Edge TLS 证书**，无需人工配 DNS 或额外购买 Advanced Certificate Manager。 |
| **Workers Observability** | `observability: { enabled: true, logs: { enabled: true }, traces: { enabled: true } }` | 随项目默认开启部署可观测性，无额外基础设施配置负担。 |
| **D1 / KV / R2 / Durable Objects** | **均不需要** | 全作 12 话 + 剧场版 + 短片策展事件、角色、地点与矢量地图均为只读静态数据，直接随 Vite 构建产物打包至 Workers Static Assets，零运维且边缘响应延迟最低。 |

## 三、GitHub Actions 凭证与权限要求

仓库 `chius-me/tamako-market-map` 已配置以下 Secrets：

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

使用 `cf deploy --prebuilt --mode production` 自动创建 Worker、上传静态资产并首次绑定 `map.tamako.chius.dev` Custom Domain 时，`CLOUDFLARE_API_TOKEN` 需具备：

1. **Account → Workers Scripts → Edit**（或 Workers 产品级 Admin，用于首次创建 `tamako-market-map` Worker 并推送静态资源）。
2. **Zone → Workers Routes → Write**（作用域包含 `chius.dev`，用于自动绑定 Custom Domain 与创建对应的代理 DNS 记录及边缘证书）。

工作流文件见 [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)：

- 所有 Pull Request 与 Push 均会运行：类型检查（`pnpm typecheck`）→ 单元测试（`pnpm test`）→ 构建（`pnpm cf build`）→ 预演部署（`pnpm cf deploy --prebuilt --mode production --dry-run`）。
- 仅在推送至 `main` 分支或手动 `workflow_dispatch` 时注入 Secrets 执行真实发布 `pnpm cf deploy --prebuilt --mode production`。
