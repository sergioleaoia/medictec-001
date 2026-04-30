import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

export function LogoMark({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path
        d="M6 26V10c0-2.2 1.8-4 4-4h12.5c2.5 0 4.7 1.6 5.4 4l2.1 7.4c.7 2.6-1.2 5.1-3.9 5.1H22"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="13" cy="22" r="4.2" fill="currentColor" />
      <path
        d="M22 18l4-4M22 18h-4M22 18v-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoWord({
  className = "",
  height = 44,
}: {
  className?: string;
  height?: number;
}) {
  const width = Math.round((height * 768) / 458);
  return (
    <span
      className={`inline-flex items-center ${className}`}
      style={{ height }}
      aria-label="Medictec Ambiental"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/LOGO-MEDIC-TEC-768x458.png.webp"
        alt="Medictec"
        width={width}
        height={height}
        style={{ height, width: "auto", display: "block" }}
      />
    </span>
  );
}

export function WhatsAppIcon({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className={className}
      {...rest}
    >
      <path d="M19.05 4.91A10.06 10.06 0 0 0 12 2a10 10 0 0 0-8.66 14.99L2 22l5.18-1.36A10 10 0 0 0 22 12a9.94 9.94 0 0 0-2.95-7.09Zm-7.05 15.4h-.01a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-3.07.8.82-3-.2-.31a8.3 8.3 0 0 1 12.86-10.32 8.24 8.24 0 0 1 2.42 5.85 8.31 8.31 0 0 1-8.29 8.32Zm4.55-6.22c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.56.13s-.65.81-.79.97c-.15.17-.29.18-.54.06a6.79 6.79 0 0 1-2-1.24 7.48 7.48 0 0 1-1.39-1.72c-.14-.25 0-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.36-.77-1.86-.2-.49-.41-.42-.56-.43h-.48a.92.92 0 0 0-.67.31 2.83 2.83 0 0 0-.88 2.1 4.92 4.92 0 0 0 1.03 2.62 11.27 11.27 0 0 0 4.32 3.81c.6.26 1.07.42 1.43.54a3.46 3.46 0 0 0 1.58.1 2.59 2.59 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .15-1.2c-.06-.11-.23-.17-.48-.3Z" />
    </svg>
  );
}

export function PhoneIcon({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path
        d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowOut({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path
        d="m4 12 5 5L20 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Biohazard symbol — used as decorative emblem (not a literal warning) */
export function Biohazard({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      fill="none"
      className={className}
      {...rest}
    >
      <circle cx="32" cy="32" r="6" fill="currentColor" />
      <path
        d="M32 14a10 10 0 0 0-7 17M32 14a10 10 0 0 1 7 17M16 50a10 10 0 0 1 4-18M48 50a10 10 0 0 0-4-18M22 50a10 10 0 0 0 20 0"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PillIcon({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <rect
        x="3"
        y="11"
        width="26"
        height="10"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M16 11v10" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="16" r="1.2" fill="currentColor" />
      <circle cx="13" cy="16" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function NeedleIcon({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path
        d="M22 4l6 6M19 7l6 6M5 27l9-9M14 18l4 4-2 5-7-7 5-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TruckIcon({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path
        d="M2 9h17v12H2zM19 13h7l4 4v4h-11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="23" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function ShieldIcon({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path
        d="M16 4 5 8v8c0 7 5 11 11 12 6-1 11-5 11-12V8L16 4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m11 16 4 4 6-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LeafIcon({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path
        d="M5 27c0-12 9-21 22-21 0 13-9 22-22 22V27Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M5 27 18 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function DocIcon({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path
        d="M7 4h12l6 6v18H7z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M19 4v6h6M11 16h10M11 21h7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RouteIcon({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="25" cy="25" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M7 10v4a4 4 0 0 0 4 4h10a4 4 0 0 1 4 4v0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FireIcon({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path
        d="M16 3c2 5-2 6-2 10a4 4 0 0 0 8 0c0 6-3 9-3 12a3 3 0 1 1-6 0c0-2-3-3-3-7 0-5 4-6 6-15Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalendarIcon({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <rect
        x="4"
        y="7"
        width="24"
        height="22"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4 13h24M10 4v6M22 4v6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="11" cy="19" r="1.4" fill="currentColor" />
      <circle cx="16" cy="19" r="1.4" fill="currentColor" />
      <circle cx="21" cy="19" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function SlidersIcon({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path
        d="M5 10h16M5 22h6M21 22h6M5 16h22"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="22" cy="10" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="14" cy="22" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function ChatIcon({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path
        d="M5 7h22v15H14l-7 5v-5H5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="14" r="1.4" fill="currentColor" />
      <circle cx="16" cy="14" r="1.4" fill="currentColor" />
      <circle cx="21" cy="14" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function AutoclaveIcon({ className = "", ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <rect x="5" y="6" width="22" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 11v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
