import logo from "@/assets/bulldog-logo.png";

export function BulldogLogo({
  className = "size-10",
  spin = false,
  priority = false,
}: {
  className?: string;
  spin?: boolean;
  priority?: boolean;
}) {
  return (
    <span className={`relative inline-grid place-items-center ${className}`}>
      <span
        aria-hidden
        className="absolute inset-0 rounded-full blur-xl"
        style={{ background: "radial-gradient(circle, oklch(0.53 0.204 27.5 / 45%), transparent 70%)" }}
      />
      <img
        src={logo}
        alt="Bull Dog Junk Cars logo"
        width={1024}
        height={1024}
        loading={priority ? "eager" : "lazy"}
        className={`relative size-full object-contain drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)] ${
          spin ? "animate-[floaty_6s_ease-in-out_infinite]" : ""
        }`}
      />
    </span>
  );
}

export function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <BulldogLogo className={compact ? "size-9" : "size-11"} priority />
      <span className="font-display text-sm font-extrabold uppercase leading-tight tracking-wide">
        Bull Dog
        <span className="block text-[10px] font-semibold tracking-[0.24em] text-muted-foreground">Junk Cars</span>
      </span>
    </span>
  );
}
