import Link from "next/link";
import Image from "next/image";

export default function SiteHeader({ dark = false }: { dark?: boolean }) {
  return (
    <header
      className={`border-b ${dark ? "border-white/10 bg-slate-900" : "border-slate-200 bg-white"}`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <Link href="/" className="inline-flex items-center">
          <Image
            src={dark ? "/brand/dialsense-wordmark-on-dark.png" : "/brand/dialsense-wordmark-transparent.png"}
            alt="DialSense"
            width={1087}
            height={217}
            priority
            className="h-7 w-auto"
          />
        </Link>
      </div>
    </header>
  );
}
