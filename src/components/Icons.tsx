import type { SceneIconKind } from "../types/tamako";

export function FloretIcon({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={`tamako-floret ${className}`}
      viewBox="0 0 20 22"
      width={size}
      height={Math.round((size * 22) / 20)}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M11.55 17.39c.14.54.5 2.05.5 2.45 0 .97-.86 2.2-2.23 2.2s-2.23-1.22-2.23-2.2c0-.4.07-.68.79-3.49.43-1.69.61-2.52 1.22-4.93-2.34 2.23-3.13 3.02-4.43 4.28-1.76 1.76-1.98 1.94-2.92 1.94-1.26 0-2.27-1.01-2.27-2.23 0-1.69 1.3-2.05 2.34-2.38 1.94-.58 5.08-1.44 7.06-2.02-1.26-.36-6.77-1.91-7.88-2.27-1.26-.43-1.51-1.62-1.51-2.12 0-1.22.97-2.23 2.27-2.23.94 0 1.12.22 2.92 1.94 1.44 1.44 2.92 2.88 4.43 4.28-.65-2.59-.9-3.64-1.51-5.98-.14-.54-.5-2.05-.5-2.45 0-.97.86-2.2 2.23-2.2s2.23 1.22 2.23 2.2c0 .4-.07.68-.79 3.49-.43 1.69-.61 2.52-1.22 4.93 1.48-1.4 2.99-2.84 4.43-4.28 1.8-1.73 1.98-1.94 2.92-1.94 1.3 0 2.27 1.01 2.27 2.23 0 1.69-1.3 2.05-2.34 2.38-1.94.58-5.08 1.44-7.06 2.02 1.26.36 6.77 1.91 7.88 2.27 1.26.43 1.51 1.62 1.51 2.12 0 1.22-.97 2.23-2.27 2.23-.94 0-1.12-.22-2.92-1.94-1.44-1.4-2.95-2.88-4.43-4.28.65 2.59.9 3.67 1.51 5.98z"
      />
    </svg>
  );
}

export function DeraBirdIcon({ size = 40 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
    >
      {/* 尾羽与头顶小冠羽 */}
      <path
        d="M27 13c-1.5-5 1.8-8.5 5-7 2 1 2 4.5 1 7"
        fill="#FF979D"
        stroke="#993338"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* 圆滚身体 */}
      <ellipse
        cx="32"
        cy="37"
        rx="20"
        ry="19"
        fill="#FFFFFF"
        stroke="#993338"
        strokeWidth="2.2"
      />
      {/* 软萌腮红 */}
      <circle cx="21" cy="36" r="3.4" fill="#FFB1B5" />
      <circle cx="43" cy="36" r="3.4" fill="#FFB1B5" />
      {/* 豆豆眼 */}
      <circle cx="24" cy="31" r="2.5" fill="#993338" />
      <circle cx="40" cy="31" r="2.5" fill="#993338" />
      <circle cx="24.8" cy="30.2" r="0.8" fill="#FFFFFF" />
      <circle cx="40.8" cy="30.2" r="0.8" fill="#FFFFFF" />
      {/* 橙黄小喙 */}
      <polygon
        points="29,34 35,34 32,39"
        fill="#F69E6E"
        stroke="#8E4C28"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* 皇室小红领结 */}
      <path
        d="M26 45l6 3 6-3-2 5-4-2-4 2z"
        fill="#F66E75"
        stroke="#993338"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* 脚爪 */}
      <path
        d="M26 56v3m-2 0h4M38 56v3m-2 0h4"
        stroke="#8E4C28"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SceneIcon({
  kind,
  size = 20,
}: {
  kind: SceneIconKind;
  size?: number;
}) {
  switch (kind) {
    case "bird":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <circle
            cx="12"
            cy="13"
            r="7.5"
            fill="currentColor"
            fillOpacity="0.16"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="9.5" cy="11.5" r="1.2" fill="currentColor" />
          <circle cx="14.5" cy="11.5" r="1.2" fill="currentColor" />
          <path d="M10.5 14h3l-1.5 2z" fill="currentColor" />
          <path
            d="M11 5.5c0-1.5 1-2.5 2-2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case "flower":
      return <FloretIcon size={size - 2} />;
    case "cup":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path
            d="M4 7h6l-1 8H5L4 7zm10 2h6l-1 8h-4l-1-8z"
            fill="currentColor"
            fillOpacity="0.18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M7 15c2 4 8 4 10 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeDasharray="2 2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "camera":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <rect
            x="3.5"
            y="7"
            width="17"
            height="12"
            rx="3"
            fill="currentColor"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M8.5 7l1.2-2.2h4.6L15.5 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="13"
            r="3.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
    case "music":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path
            d="M10 17V6l9-2v11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="7.5" cy="17.5" r="2.5" fill="currentColor" />
          <circle cx="16.5" cy="15.5" r="2.5" fill="currentColor" />
        </svg>
      );
    case "train":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <rect
            x="5"
            y="4"
            width="14"
            height="13"
            rx="3.5"
            fill="currentColor"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M5 11h14M8 17l-2 3m10-3l2 3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="9" cy="14" r="1" fill="currentColor" />
          <circle cx="15" cy="14" r="1" fill="currentColor" />
        </svg>
      );
    case "baton":
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path
            d="M5 19L19 5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="5" cy="19" r="2.5" fill="currentColor" />
          <circle cx="19" cy="5" r="2.5" fill="currentColor" />
          <path
            d="M9 5.5l1.2 1.2M15.5 16l1.2 1.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "mochi":
    default:
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <ellipse
            cx="12"
            cy="14.5"
            rx="8.5"
            ry="5.5"
            fill="currentColor"
            fillOpacity="0.18"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <ellipse
            cx="12"
            cy="9.2"
            rx="5.4"
            ry="3.6"
            fill="currentColor"
            fillOpacity="0.18"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="10.2" cy="8.8" r="0.9" fill="currentColor" />
          <circle cx="13.8" cy="8.8" r="0.9" fill="currentColor" />
        </svg>
      );
  }
}

export function getSceneIconSvgHtml(kind: SceneIconKind): string {
  switch (kind) {
    case "bird":
      return `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="13" r="7.5" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="1.8"/><circle cx="9.5" cy="11.5" r="1.2" fill="currentColor"/><circle cx="14.5" cy="11.5" r="1.2" fill="currentColor"/><path d="M10.5 14h3l-1.5 2z" fill="currentColor"/><path d="M11 5.5c0-1.5 1-2.5 2-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>`;
    case "flower":
      return `<svg viewBox="0 0 20 22" width="18" height="20" aria-hidden="true"><path fill="currentColor" d="M11.55 17.39c.14.54.5 2.05.5 2.45 0 .97-.86 2.2-2.23 2.2s-2.23-1.22-2.23-2.2c0-.4.07-.68.79-3.49.43-1.69.61-2.52 1.22-4.93-2.34 2.23-3.13 3.02-4.43 4.28-1.76 1.76-1.98 1.94-2.92 1.94-1.26 0-2.27-1.01-2.27-2.23 0-1.69 1.3-2.05 2.34-2.38 1.94-.58 5.08-1.44 7.06-2.02-1.26-.36-6.77-1.91-7.88-2.27-1.26-.43-1.51-1.62-1.51-2.12 0-1.22.97-2.23 2.27-2.23.94 0 1.12.22 2.92 1.94 1.44 1.44 2.92 2.88 4.43 4.28-.65-2.59-.9-3.64-1.51-5.98-.14-.54-.5-2.05-.5-2.45 0-.97.86-2.2 2.23-2.2s2.23 1.22 2.23 2.2c0 .4-.07.68-.79 3.49-.43 1.69-.61 2.52-1.22 4.93 1.48-1.4 2.99-2.84 4.43-4.28 1.8-1.73 1.98-1.94 2.92-1.94 1.3 0 2.27 1.01 2.27 2.23 0 1.69-1.3 2.05-2.34 2.38-1.94.58-5.08 1.44-7.06 2.02 1.26.36 6.77 1.91 7.88 2.27 1.26.43 1.51 1.62 1.51 2.12 0 1.22-.97 2.23-2.27 2.23-.94 0-1.12-.22-2.92-1.94-1.44-1.4-2.95-2.88-4.43-4.28.65 2.59.9 3.67 1.51 5.98z"/></svg>`;
    case "cup":
      return `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 7h6l-1 8H5L4 7zm10 2h6l-1 8h-4l-1-8z" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M7 15c2 4 8 4 10 2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-dasharray="2 2" stroke-linecap="round"/></svg>`;
    case "camera":
      return `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="3.5" y="7" width="17" height="12" rx="3" fill="currentColor" fill-opacity="0.14" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 7l1.2-2.2h4.6L15.5 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`;
    case "music":
      return `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M10 17V6l9-2v11" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7.5" cy="17.5" r="2.5" fill="currentColor"/><circle cx="16.5" cy="15.5" r="2.5" fill="currentColor"/></svg>`;
    case "train":
      return `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="5" y="4" width="14" height="13" rx="3.5" fill="currentColor" fill-opacity="0.14" stroke="currentColor" stroke-width="1.8"/><path d="M5 11h14M8 17l-2 3m10-3l2 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/></svg>`;
    case "baton":
      return `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 19L19 5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="5" cy="19" r="2.5" fill="currentColor"/><circle cx="19" cy="5" r="2.5" fill="currentColor"/></svg>`;
    case "mochi":
    default:
      return `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><ellipse cx="12" cy="14.5" rx="8.5" ry="5.5" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.8"/><ellipse cx="12" cy="9.2" rx="5.4" ry="3.6" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="1.8"/></svg>`;
  }
}
