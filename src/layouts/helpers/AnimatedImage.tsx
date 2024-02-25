"use client" ;
import React, { useRef, useEffect, useState, forwardRef } from 'react' 
import ImageFallback from '@/helpers/ImageFallback';
import { useTheme } from 'next-themes';
import config from "@/config/config.json";
import { motion } from "framer-motion";
  
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
      setMounted(true)
    return () => {
      
    }
  }, [])


  const resolvedLogo =
      mounted && (theme === "dark" || resolvedTheme === "dark")
        ? banner_darkmode
        : banner ;
  const logoPath = src ? src : resolvedLogo;

 
  
 
  return (

    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 2,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 5,
          stiffness: 100,
          restDelta: 0.001
        }
      }}
      >
    <ImageFallback
      src={logoPath}
      className="mx-auto"
      width="800"
      height="420"
      alt="banner image" 
      priority
    />
  </motion.div>
      
   

  )
}
