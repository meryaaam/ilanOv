"use client" ;
import React, { useRef, useEffect, useState } from 'react'
import { useSpring, animated, to } from '@react-spring/web'
import { useGesture } from 'react-use-gesture'
import ImageFallback from '@/helpers/ImageFallback';
import { useTheme } from 'next-themes';
import config from "@/config/config.json";

const calcX = (y: number, ly: number) => -(y - ly - window.innerHeight / 2) / 20
const calcY = (x: number, lx: number) => (x - lx - window.innerWidth / 2) / 20

const wheel = (y: number) => {
  const imgHeight = window.innerWidth * 0.3 - 20
  return `translateY(${-imgHeight * (y < 0 ? 6 : 1) - (y % (imgHeight * 5))}px`
}
interface AnimatedImageProps {
  src: string;
}


export default function AnimatedImage({ src }: { src?: string }){

  const {
    banner,
    banner_darkmode, 
  }: {
    banner: string;
    banner_darkmode: string;
 
  } = config.site;

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  

  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault()
    document.addEventListener('gesturestart', preventDefault)
    document.addEventListener('gesturechange', preventDefault)
    setMounted(true)
    return () => {
      document.removeEventListener('gesturestart', preventDefault)
      document.removeEventListener('gesturechange', preventDefault)
      
    }
  }, [])


  const resolvedLogo =
      mounted && (theme === "dark" || resolvedTheme === "dark")
        ? banner_darkmode
        : banner ;
  const logoPath = src ? src : resolvedLogo;

  const domTarget = useRef(null)
  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
    () => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      zoom: 0,
      x: 0,
      y: 0,
      config: { mass: 5, tension: 350, friction: 40 },
    })
  )

  const [{ wheelY }, wheelApi] = useSpring(() => ({ wheelY: 0 }))

  useGesture(
    {
      onDrag: ({ active, offset: [x, y] }) =>
        api({ x, y, rotateX: 0, rotateY: 0, scale: active ? 1 : 1.1 }),
      onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        api({
          rotateX: calcX(py, y.get()),
          rotateY: calcY(px, x.get()),
          scale: 1.1,
        }),
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
      onWheel: ({ event, offset: [, y] }) => {
        event.preventDefault()
        wheelApi.set({ wheelY: y })
      },
    },
    { domTarget, eventOptions: { passive: false } }
  )
  return (

      <animated.div
        ref={domTarget}

        style={{
          transform: 'perspective(600px)',
          x,
          y,
          scale: to([scale, rotateX], (s, z) => s + z),
          rotateX,
          rotateY,
          rotateZ,
        }}>
         <ImageFallback
                        src={logoPath}
                        className="mx-auto"
                        width="800"
                        height="420"
                        alt="banner image"
                        style={{ transform: wheelY.to(calcX) }}
                        priority
                      />
       </animated.div>

  )
}
