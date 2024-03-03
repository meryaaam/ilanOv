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
      
         
          <div className='grid-container'   >
            
            {features.map((feature, index: number) => (
            <section
              key={index}
              className={`section-sm ${index % 2 === 0 && "bg-gradient"}`}
            >
              <div className="container">
                <div className="row items-center justify-between">
                  <div
                    className={`mb:md-0 mb-6 md:col-5 ${
                      index % 2 !== 0 && "md:order-2"
                    }`}
                  >
                    <ImageFallback
                      src={feature.image}
                      height={480}
                      width={520}
                      alt={feature.title}
                    />
                  </div>
                  <div
                    className={`md:col-7 lg:col-6 ${
                      index % 2 !== 0 && "md:order-1"
                    }`}
                  >
                    <h2
                      className="mb-4"
                      dangerouslySetInnerHTML={markdownify(feature.title)}
                    />
                    <p
                      className="mb-8 text-lg"
                      dangerouslySetInnerHTML={markdownify(feature.content)}
                    />
                    {/*<ul>
                      {feature.bulletpoints.map((bullet: string) => (
                        <li className="relative mb-4 pl-6" key={bullet}>
                          <FaCheck className={"absolute left-0 top-1.5"} />
                          <span dangerouslySetInnerHTML={markdownify(bullet)} />
                        </li>
                      ))}
                      </ul>*/}
                    {feature.button.enable && (
                      <Link
                        className="btn btn-primary mt-5"
                        href={feature.button.link}
                      >
                        {feature.button.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </section>
              ))}
        </div>
        
      );
    
};

export default LayoutCards;
 