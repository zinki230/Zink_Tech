export default function Loading() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <div className="route-loading-orbit route-loading-orbit-outer" />
      <div className="route-loading-orbit route-loading-orbit-inner" />
      <span className="route-loading-mark">Z</span>
      <p className="mt-7 text-xs font-semibold tracking-[.24em] text-[#173f36]">ZINK TECH</p>
      <p className="mt-2 text-xs text-[#748078]">Préparation de votre expérience</p>
      <div className="route-loading-track"><span /></div>
    </div>
  );
}
