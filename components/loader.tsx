"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const Loader = () => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const hide = () => setShow(false)
    if (document.readyState === "complete") {
      hide()
    } else {
      window.addEventListener("load", hide)
      return () => window.removeEventListener("load", hide)
    }
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm transition-opacity duration-700 animate-fadeOut">
      <div className="flex flex-col items-center">
        <div className="animate-bounce-slow rounded-full shadow-lg p-4 bg-white/80 dark:bg-black/80">
          <Image
            src="/myLogo.png"
            alt="Enya Elvis Logo"
            width={80}
            height={80}
            priority
            className="drop-shadow-lg"
          />
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-widest text-primary text-center animate-text-glow">
          Enya Elvis
        </h1>
      </div>
      <div className="mt-8 w-32 h-2 bg-gradient-to-r from-primary to-accent rounded-full overflow-hidden relative">
        <div className="absolute left-0 top-0 h-2 w-1/3 bg-white/60 animate-loaderBar rounded-full" />
      </div>
    </div>
  )
}

export default Loader
