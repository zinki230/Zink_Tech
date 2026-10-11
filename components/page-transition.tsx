"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const beginNavigation = () => {
      setIsNavigating(true);
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
      fallbackTimer.current = setTimeout(() => setIsNavigating(false), 8000);
    };

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank" || link.hasAttribute("download")) return;

      const nextUrl = new URL(link.href, window.location.href);
      if (nextUrl.origin !== window.location.origin || nextUrl.pathname === window.location.pathname && nextUrl.search === window.location.search || nextUrl.hash && nextUrl.pathname === window.location.pathname) return;
      beginNavigation();
    };

    const handlePopState = () => beginNavigation();
    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    };
  }, []);

  useEffect(() => {
    const pathChanged = previousPathname.current !== pathname;
    previousPathname.current = pathname;
    if (!pathChanged) return;
    if (!isNavigating) return;
    const timer = setTimeout(() => setIsNavigating(false), 380);
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    return () => clearTimeout(timer);
  }, [pathname, isNavigating]);

  return (
    <>
      {children}
      <div className={`page-transition-curtain${isNavigating ? " is-active" : ""}`} aria-hidden={!isNavigating}>
        <div className="page-transition-loader" role="status" aria-live="polite">
          <span className="page-transition-mark">Z</span>
          <span className="page-transition-wordmark">ZINK TECH</span>
          <span className="page-transition-track"><span /></span>
          <span className="page-transition-caption">Préparation de votre expérience</span>
        </div>
      </div>
    </>
  );
}
