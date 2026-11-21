import { useState } from "react";

export function DeraTourDock({
  mascotHint,
  activeIndex,
  totalFiltered,
  onPrev,
  onNext,
  onOpenCurrentModal,
}: {
  mascotHint: string;
  activeIndex: number;
  totalFiltered: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenCurrentModal: () => void;
}) {
  const [bubbleOpen, setBubbleOpen] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth >= 900 : true
  );

  return (
    <div className="tamako-dera-dock" aria-label="德拉导览与剧情巡游控制">
      {bubbleOpen && (
        <div className="tamako-dera-bubble" aria-live="polite">
          <div className="tamako-dera-bubble-head">
            <strong>德拉·莫奇马兹导览</strong>
            <button
              type="button"
              className="tamako-dera-collapse"
              aria-label="收起德拉提示气泡"
              onClick={() => setBubbleOpen(false)}
            >
              收起
            </button>
          </div>
          <p>{mascotHint}</p>
        </div>
      )}

      <div className="tamako-dera-bar">
        <button
          type="button"
          className="tamako-dera-avatar-btn"
          aria-expanded={bubbleOpen}
          aria-label={bubbleOpen ? "收起德拉搭话框" : "展开德拉搭话框"}
          onClick={() => setBubbleOpen((v) => !v)}
        >
          <img
            src="/images/avatars/dera.webp"
            alt="德拉"
            width={40}
            height={40}
          />
        </button>

        <button
          type="button"
          className="tamako-pill-btn"
          disabled={totalFiltered === 0}
          onClick={onPrev}
          aria-label="上一幕剧情"
        >
          ← 上一幕
        </button>

        <button
          type="button"
          className="tamako-pill-btn is-custard"
          disabled={totalFiltered === 0}
          onClick={onOpenCurrentModal}
        >
          🎬 巡游
          {totalFiltered > 0
            ? ` ${activeIndex >= 0 ? activeIndex + 1 : 1}/${totalFiltered}`
            : " 0"}
        </button>

        <button
          type="button"
          className="tamako-pill-btn is-primary"
          disabled={totalFiltered === 0}
          onClick={onNext}
          aria-label="下一幕剧情"
        >
          下一幕 →
        </button>
      </div>
    </div>
  );
}
