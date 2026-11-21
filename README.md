# 兔山商店街与京都剧情地图 · Tamako Story Map

在线地址：**[https://map.tamako.chius.dev](https://map.tamako.chius.dev)**

《玉子市场》（TV 全 12 话，2013）与剧场版《玉子爱情故事》（2014）及短片《南国之岛的德拉酱》的交互式剧情地图。在一个页面中串联 **兔山商店街手绘风平面图** 与 **京都实景圣地巡礼地图**，支持按集数、人物关系圈与台词关键词探索每一幕名场面。

## 核心功能

- **双视角地图自由联动**：
  - **兔山商店街手绘平面图**：还原官网 `tamakomarket.com/map/`（`bg.png`）东西店铺、中央「サバさん」十字路口、「たまや」与「RICE CAKE Oh!ZEE」二楼纸杯电话连线及北横街「うさ湯」的 13 处交互热点，支持缩放拖拽与键盘点选。
  - **京都实景圣地巡礼图**：基于 Leaflet 与日本国土地理院（淡色地図）瓦片，标注出町桝形商店街、出町双叶、鸭川三角洲跳乌龟石、下鸭神社、京阪藤森站、琵琶湖疏水通学路、兔山高校原型与 JR 京都站新干线月台等 15 处真实坐标与 3 条剧情巡礼动线。
- **多维精准筛选与剧情巡游**：
  - 支持「全部 / TV 动画 / 剧场版 / 南国短片」切换、多集数胶囊点选、5 大人物关系圈多选（支持 OR / AND 匹配模式）、中日文台词与地名搜索。
  - 内置「上一幕 / 下一幕」编年剧情巡游、URL 查询参数状态同步（可直接分享带筛选与事件的深链接）及全话制作名单手风琴档案。
- **Tamako Web 设计系统**：
  - 遵循 `tamako-web` 规范：糯米暖纸 `#FBF8F1` / `#FDFFF2` 与豆沙褐红 `#993338` 正文对比度、三色淡彩遮阳篷顶带、看板鸟德拉 `aria-live="polite"` 搭话气泡、`Zen Maru Gothic` + `Noto Sans SC / JP` 丸体字阶、无障碍 `:focus-visible` 与 `prefers-reduced-motion` 支持。

## 技术栈与 Cloudflare 部署

- **前端**：React 19 + TypeScript + Vite 8 + Leaflet
- **托管平台**：Cloudflare Workers + Workers Static Assets（纯静态 SPA，零服务端运维）
- **配置与 CLI**：`cf` CLI + `@cloudflare/vite-plugin` + [`cloudflare.config.ts`](cloudflare.config.ts)
- **自定义域名与证书**：`map.tamako.chius.dev` 通过 Workers Custom Domain 自动完成 DNS 与 Edge TLS 证书签发，详见 [Cloudflare 资源调研文档](docs/cloudflare-resources.md)。

## 本地开发与验证

```bash
# 安装依赖
pnpm install

# 启动本地 Workers 运行时开发预览
pnpm dev

# 类型检查与单元测试
pnpm typecheck
pnpm test

# 构建 Cloudflare Build Output 并预演部署
pnpm build
pnpm deploy:dry-run
```

## 致谢与声明

- 资料与灵感参考：[tamakomarket.com](https://tamakomarket.com/)、[tamakolovestory.com](https://tamakolovestory.com/)、[出町桝形商店街专页](https://masugata.demachi.jp/tamakomarket/)、[awesome-tamako-market](https://github.com/chius-me/awesome-tamako-market) 与 [usagiyama](https://github.com/chius-me/usagiyama)。
- 本站为爱好者制作的**非官方同人交互地图与圣地巡礼指南**，动画原作、角色与设定著作权归 **©京都アニメーション／うさぎ山商店街** 所有。
