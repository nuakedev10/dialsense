import Image from "next/image";

export default function BahoCareFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-900 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} DialSense. A field research initiative
          in Kigali, Rwanda.
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Powered by</span>
          <Image
            src="/brand/bahocare-wordmark-transparent.png"
            alt="BahoCare"
            width={1668}
            height={499}
            className="h-4 w-auto opacity-80"
          />
        </div>
      </div>
    </footer>
  );
}
