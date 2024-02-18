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
      whileHover={{ scale: 1.2, rotateY: 90 }}
      whileTap={{ scale: 0.8, rotateY: -90 }}
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
