if (typeof window !== "undefined") {
  const pathname = window.location.pathname;
  if (!pathname.startsWith(process.env.NEXT_PUBLIC_FRONTEND_BASE)) {
    window.location.pathname = process.env.NEXT_PUBLIC_FRONTEND_BASE;
  }
}
