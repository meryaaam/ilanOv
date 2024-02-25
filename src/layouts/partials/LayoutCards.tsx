"use client";

import { motion, AnimatePresence } from "framer-motion"
import React, { useState, useRef } from 'react';
import "@/styles/layout.scss";
import { Feature } from "@/types";
import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";

 
function LayoutCards(props: { features: Feature[] }) {
    const { features } = props;

    const [clickedId, setClickedId] = useState<null | string>(null);
    const selectedFeature = features.find((feature) => feature.id === clickedId);

    return (
      <section
      key={1}
      className={`section-sm ${2 % 2 === 0 && "bg-gradient"}`}
         > 
  
        <motion.div  className="cards-container"  >
          <div className='grid-container'   >
            {features.map((i , index:number) => (
              <motion.div
                className="box"
                onClick={() => setClickedId(i.id)}
                key={index}
                layoutId={String(index)}
              > 
              <div className="title" >
                <h2  
                  dangerouslySetInnerHTML={markdownify(i.subtitle)}
                /> 
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {clickedId && (
              <motion.div 
                layoutId={clickedId}
                className="card-overlay"
                onClick={() => setClickedId(null)}
                initial={{ background: "rgba(0, 0, 0, 0)" }}
                animate={{ background: "rgba(0, 0, 0, 0.5)" }}
                exit={{ background: "rgba(0, 0, 0, 0)" }}
                
              >
                 
            <motion.div className="overlay-box" layoutId={clickedId} >
            {selectedFeature && (
            <>
     
          <section
                  key={selectedFeature.id}
                  className={`section-sm ${1 % 2 === 0 && "bg-gradient"}`}
                >
                  <div className="container">
                    <div className="row items-center justify-between">
                      <div 
                        className={`mb:md-0 mb-6 md:col-5 ${
                          1 % 2 !== 0 && "md:order-2"
                        }`}
                      >
                        <ImageFallback
                          src={selectedFeature.image}
                          height={480}
                          width={520}
                          alt={selectedFeature.title}
                        />
        
                      </div>
                      <div
                        className={`md:col-7 lg:col-6 ${
                          1 % 2 !== 0 && "md:order-1"
                        }`}
                      >
                        <h2
                          className="mb-4"
                          dangerouslySetInnerHTML={markdownify(selectedFeature.title)}
                        />
                        <p
                          className="mb-8 text-lg"
                          dangerouslySetInnerHTML={markdownify(selectedFeature.content)}
                        />
                        {/*<ul>
                          {feature.bulletpoints.map((bullet: string) => (
                            <li className="relative mb-4 pl-6" key={bullet}>
                              <FaCheck className={"absolute left-0 top-1.5"} />
                              <span dangerouslySetInnerHTML={markdownify(bullet)} />
                            </li>
                          ))}
                          </ul>*/}
                         {selectedFeature.button.enable && (
                          <Link
                            className="btn btn-primary mt-5 justify-center"
                            href={selectedFeature.button.link}
                          >
                            {selectedFeature.button.label}
                          </Link>
                          )}
                        </div>
                    </div>
                  </div>
                </section>
              <motion.button onClick={() => setClickedId("")} />
            </>

          )}
        </motion.div>
            
            </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        </section>

      );
    
};

export default LayoutCards;
 