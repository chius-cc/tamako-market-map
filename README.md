# 兔山商店街与京都剧情地图 · Tamako Story Map

在线地址：**[https://map.tamako.chius.dev](https://map.tamako.chius.dev)**

《玉子市场》（TV 全 12 话，2013）与剧场版《玉子爱情故事》（2014）及短片《南国之岛的德拉酱》的**全视口三语（简体中文 / English / 日本語）交互式剧情与圣地巡礼地图**。以地图为核心舞台，通过顶部导航栏抽屉与弹窗按集数、真实人物头像与台词关键词探索每一幕剧照与名场面。

## 核心功能

- **以交互式地图为核心的全屏体验（`100dvh`）**：
  - **兔山商店街手绘风平面图**：忠实还原官网 `tamakomarket.com/map/` 街巷格局，绘入三色彩篷、各店铺雨棚暖帘、中央「サバさん」蓝鲭鱼、东支路二楼纸杯电话红线、**12 位街坊店主圆形肖像**与 **13 枚真实剧照热点圆章**，支持滚轮/触控缩放拖拽与键盘点选。
  - **玉子和纸主题京都圣地矢量地图**：基于 MapLibre GL JS 与 OpenFreeMap 矢量瓦片定制 `tamako-web` 主题地图样式（和纸暖白底色、艾草绿森林公园、弹珠汽水蓝鸭川与琵琶湖疏水、卡仕达町家建筑、樱珊瑚铁道与豆沙红日文标注），覆盖出町桝形、鸭川三角洲跳石、藤森通学路、兔山高校原型与 JR 京都站等 **15 处真实坐标**与 **3 条巡礼动线**。
- **真实动画剧照与人物肖像筛选**：
  - **43 幕剧情真实剧照 + 28 处地标剧照**：地标卡片、事件手账与详情弹卡均镶嵌 `.tamako-photo-mount` 金框真实动画剧照。
  - **22 位登场人物真实头像筛选**：涵盖北白川家、兔山高校同级生、大路家、南国来客与全部商店街店主（支持 OR / AND 多选匹配）。
  - **导航抽屉与剧情巡游**：集数剧照筛选、人物头像筛选、关键词搜索、剧照事件手账、全话主创档案与德拉「上一幕 / 下一幕」巡游均通过顶部导航与悬浮坞即点即开，并实时同步 URL 查询参数。

## 技术栈与 Cloudflare 部署

- **前端**：React 19 + TypeScript + Vite 8 + MapLibre GL JS
- **托管平台**：Cloudflare Workers + Workers Static Assets（纯静态 SPA，零服务端运维）
- **配置与 CLI**：`cf` CLI + `@cloudflare/vite-plugin` + [`cloudflare.config.ts`](cloudflare.config.ts)
- **自定义域名与证书**：`map.tamako.chius.dev` 通过 Workers Custom Domain 自动完成 DNS 与 Edge TLS 证书签发，详见 [Cloudflare 资源调研文档](docs/cloudflare-resources.md)。

## 本地开发与验证

```bash
# 安装依赖
pnpm install

# 启动本地 Workers 运行时开发预览
pnpm dev

# 类型检查与单元测试（含全量剧照与头像静态资源校验）
pnpm typecheck
pnpm test

# 构建 Cloudflare Build Output 并预演部署
pnpm build
pnpm deploy:dry-run
```

## 致谢与声明

- 资料与灵感参考：[tamakomarket.com](https://tamakomarket.com/)、[tamakolovestory.com](https://tamakolovestory.com/)、[出町桝形商店街专页](https://masugata.demachi.jp/tamakomarket/)、[awesome-tamako-market](https://github.com/chius-cc/awesome-tamako-market) 与 [usagiyama](https://github.com/chius-cc/usagiyama)。
- 本站为爱好者制作的**非官方同人交互地图与圣地巡礼指南**，动画剧照、角色与设定著作权归 **©京都アニメーション／うさぎ山商店街** 所有；京都矢量地图数据来自 © OpenFreeMap 与 © OpenStreetMap contributors。
