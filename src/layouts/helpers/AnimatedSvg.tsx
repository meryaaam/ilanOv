"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"

const AnimatedSvg = (props: any) => {
  const { src, fallback, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);
  const [isDrawing, setIsDrawing] = useState(false);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    
<AnimatePresence  >
    {src && (
       <motion.div  
       style={{   
        zIndex: "auto",  
        position: 'absolute', 
          }} 
       initial={{ opacity: 0, scale: 0.5 }}
       animate={{ opacity: 1, scale: 1 }}
       transition={{
         duration: 2,
         ease: [0, 0.71, 0.2, 1.01],
         scale: {
           type: "spring", 
         },
         loop: Infinity
       }}
       whileHover={{ scale: 1.1 }}
       onHoverStart={() => setIsDrawing(true)} // Start drawing on hover
       onHoverEnd={() => setIsDrawing(false)} 
       >

    <Image
      {...rest}
      width="120"
      height="45"
      src={imgSrc}
      onError={() => {
        setImgSrc(fallback);
      }}
    />
      </motion.div>
    )}
  
   
    
    </AnimatePresence>
  );
};

export default AnimatedSvg;
