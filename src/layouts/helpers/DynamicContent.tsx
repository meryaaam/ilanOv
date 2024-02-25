"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { Feature } from "@/types";

 

const DynamicContent = (props: { features: Feature[] })  => {
  const { features } = props;
  const [selectedId, setSelectedId] = useState("")

  const selectedFeature = features.find((feature) => feature.id === selectedId);

  return (
    <>
      {features.map((item , index:number) => (
        
        <motion.div key={item.id} layoutId={item.id} 
                    onClick={() => setSelectedId(item.id)}>
          <motion.h5>{item.content}</motion.h5>
          <motion.h2>{item.title}</motion.h2>
        </motion.div>
      ))}

    <AnimatePresence>
    {selectedId && (
        <motion.div layoutId={selectedId}>
          {selectedFeature && (
            <>
              <motion.h5>{selectedFeature.content}</motion.h5>
              <motion.h2>{selectedFeature.title}</motion.h2>
              <motion.button onClick={() => setSelectedId("")} />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default DynamicContent;
