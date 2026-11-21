import { useEffect, useState } from "react";
import { FloretIcon } from "./Icons";

export function PilgrimageFooter() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 360);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className="tamako-footer" aria-label="巡礼礼仪与资料索引">
        <div className="tamako-island-inner">
          <h2 className="tamako-section-title" style={{ fontSize: "1.25rem" }}>
            <FloretIcon size={18} />
            <span>京都圣地巡礼礼仪与参考索引</span>
          </h2>

          <div className="tamako-staff-reply" style={{ marginTop: 14 }}>
            街坊提示：出町桝形商店街是京都居民日常买菜逛街的生活空间，藤森站旁的学校也是现役女校设施。实地巡礼时请勿进入校园或阻塞商店门口通行，拍照注意礼让街坊与行人，用心守护这份美好的日常もち！
          </div>

          <div className="tamako-footer-links">
            <a
              href="https://tamakomarket.com/map/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TV 动画官方商店街地图 (tamakomarket.com)
            </a>
            <a
              href="https://tamakolovestory.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              剧场版官网《たまこラブストーリー》
            </a>
            <a
              href="https://masugata.demachi.jp/tamakomarket/"
              target="_blank"
              rel="noopener noreferrer"
            >
              出町桝形商店街《玉子市场》专页
            </a>
            <a
              href="https://github.com/chius-me/awesome-tamako-market"
              target="_blank"
              rel="noopener noreferrer"
            >
              awesome-tamako-market 精选资料索引
            </a>
            <a
              href="https://github.com/chius-me/tamako-market-map"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub 仓库（map.tamako.chius.dev）
            </a>
          </div>

          <hr className="tamako-stitch-hr" style={{ margin: "16px 0" }} />

          <p
            style={{
              margin: 0,
              fontSize: "0.82rem",
              color: "var(--tamako-ink-muted)",
            }}
          >
            本站为爱好者制作的非官方交互式作品地图与巡礼笔记，所有动画设定、角色及作品权利归{" "}
            <strong>©京都アニメーション／うさぎ山商店街</strong>{" "}
            所有；京都实景地图瓦片由日本国土地理院（地理院タイル·淡色地図）提供，地理坐标参考 OpenStreetMap。托管于 Cloudflare
            Workers Static Assets。
          </p>
        </div>
      </footer>

      {showTop && (
        <button
          type="button"
          className="tamako-pagetop"
          aria-label="返回页面顶部"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span>↑</span>
          <span>回到顶部</span>
        </button>
      )}
    </>
  );
}
