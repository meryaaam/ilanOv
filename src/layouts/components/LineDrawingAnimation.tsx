"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import gsap, { Power3 } from 'gsap';

const LineDrawingAnimation = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [topPosition, setTopPosition] = useState('7%');
  const [leftPosition, setLeftPosition] = useState('3%');

  useEffect(() => {
    const breakpoints = {
      sm: 540,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    };

    // Get the current screen width
    const screenWidth = window.innerWidth;

    // Calculate the top and left positions based on the screen width
    let calculatedTop = '7%';
    let calculatedLeft = '3%';

    if (screenWidth >= breakpoints.md && screenWidth < breakpoints.lg) {
      calculatedTop = '12%';
      calculatedLeft = '6%';
    } else if (screenWidth >= breakpoints.lg) {
      calculatedTop = '15%';
      calculatedLeft = '9%';
    }

    // Update the state with the calculated positions
    setTopPosition(calculatedTop);
    setLeftPosition(calculatedLeft);
    if (isDrawing) {
      const path = document.querySelector('.svg-container-b') as SVGGraphicsElement;
      const length = path.getTotalLength();
      
      // Set initial styles for the path
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.fill = "none";

      // Animate drawing of the path
      gsap.to(path, {
        strokeDashoffset: 0,
        fill:'none',
        duration: 2,
        ease: Power3.easeOut
      }) ; 
    }
   
  }, [isDrawing]);

  

  return (
   <>
   
    <div className='row justify-center' style={{   
                   zIndex: "auto",  
                   position: 'absolute',  
                     }}  >
      
       <motion.svg   
      
      aria-hidden="true" 
      xmlns="http://www.w3.org/2000/svg" viewBox="-60 10 650.5 1900"
      preserveAspectRatio="55"
     
      whileHover={{ scale: 1.1 }} // Increase scale on hover
      onHoverStart={() => setIsDrawing(true)} // Start drawing on hover
      onHoverEnd={() => setIsDrawing(false)} 
      >
         <motion.path
          className="lg:col-6 md:col-6 mb-6 svg-container-b"
          d={isDrawing ?"M49.21,193.1c-7.62-14.96-10.07-32.02-7.67-48.44,2.63-16.56,10.13-31.33,19.71-44.14,9.63-12.79,21.4-23.51,33.85-32.93,6.21-4.72,12.68-9.07,19.24-13.18l4.89-3.12c1.66-1.01,3.34-1.93,5.02-2.92,3.37-1.89,6.66-3.95,10.09-5.73C174.19,21.19,218.87,8.82,264.1,6.41c22.62-1.16,45.36.11,67.71,3.89,11.18,1.72,22.31,4.31,33.31,7.86,10.96,3.6,21.74,8.36,31.65,14.86,17.84,11.62,32.33,29.7,37.13,51.5,2.38,10.84,1.75,22.58-1.79,33.06-1.61,5.33-4.15,10.25-6.84,14.97-2.85,4.64-6,9.03-9.5,13.02-14.02,16.05-31.55,27.59-49.01,37.56-17.5,10.12-35.71,19.03-54.42,26.71-17.55,7.3-35.63,13.25-53.96,18.22-18.35,4.91-36.99,8.9-55.84,11.38-18.85,2.53-37.87,3.88-56.91,4l-14.29-.16-14.28-.74c-9.55-.55-19.23-1.68-28.8-3.48-16.48-3.2-33.17-8.37-47.99-18.17-14.76-9.63-27.1-24.7-31.7-42.41-4.78-17.56-2.54-36.01,4.05-52.17,3.33-8.1,7.8-15.76,13.4-22.51,5.53-6.72,11.93-12.63,18.89-17.69,6.52-4.78,14.1-9.47,22.31-13.3":""}
          fill="none"
          stroke="blue"
          strokeWidth="5"
          stroke-dasharray="1186px" 
          stroke-miterlimit="10" //stroke-width="12" 
          whileHover={{ scale: 5 }}
          transition={{ duration: 2, ease: "easeOut" ,loop: Infinity}}
        />
       
      </motion.svg>
        </div>             
     
     
   
   
  </>
  );
};

export default LineDrawingAnimation;
