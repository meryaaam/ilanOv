"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";  
import Image from "next/image";

function BannerComponent() {
   
     
  }
  
  export function Banner() {
    const [isOn, setIsOn] = useState(true);

    const toggleSwitch = () => setIsOn(!isOn);
    const className = `switch ${"on"}`;
    return (
  <div className="frame-container"  >
  <div  className="first-row">
       
        <div className="item-1">
        <motion.div className="switch" data-ison={isOn} onClick={() => toggleSwitch()} >
        <motion.div className="ball" layout transition={isOn ? spring : bounce} />
      </motion.div>
          
          </div> 
        <div className="item-2">
          
          <div className="card">
              
              <div className="pic">
              <div className="ball">
                <Image src="/images/eleph.png"  width={55} height= {55} alt=""/>
              </div>
              </div>
              <div className="content">
               <div>
                  @john_doe
               </div>
               <div>
                Im psyched!
               </div>
              </div>
          </div>
        </div>
       
  </div>
  <div  className="second-row">
      <div className="first-col">
        <div className="card">1</div>
        <div className="card-2">2</div>
        <div>3</div> 
      </div>
        <div className="second-col">
        <div >1</div>
        <div>2</div>
        </div>
        <div className="third-col">
        <div>2</div>
        <div>3</div>
        </div>
      </div>
       
    </div>
    );
  }

  const bounce = {
    duration: 1.2,
    ease: bounceEase
  };
  
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };
  
  // From https://easings.net/#easeOutBounce
  function bounceEase(x:any) {
    const n1 = 7.5625;
    const d1 = 2.75;
  
    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  }