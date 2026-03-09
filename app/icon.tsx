import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#230f1c",
          borderRadius: "8px",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 14 Q3 19 3 24 Q3 29 7 34" stroke="#f91fb1" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5"/>
          <path d="M11 17 Q8 20.5 8 24 Q8 27.5 11 31" stroke="#f91fb1" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8"/>
          <path d="M41 14 Q45 19 45 24 Q45 29 41 34" stroke="#f91fb1" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5"/>
          <path d="M37 17 Q40 20.5 40 24 Q40 27.5 37 31" stroke="#f91fb1" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8"/>
          <rect x="14" y="6" width="20" height="28" rx="10" fill="#f91fb1" />
          <rect x="17" y="10" width="14" height="20" rx="4" fill="#A3006E" />
          <line x1="17" y1="15" x2="31" y2="15" stroke="#f91fb1" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="17" y1="20" x2="31" y2="20" stroke="#f91fb1" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="17" y1="25" x2="31" y2="25" stroke="#f91fb1" strokeWidth="1.4" strokeLinecap="round" />
          <rect x="21" y="34" width="6" height="4" fill="#f91fb1" />
          <rect x="16" y="38" width="16" height="4" rx="2" fill="#f91fb1" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
