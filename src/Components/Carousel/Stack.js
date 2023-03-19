import React, {useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";


import Card from "./Card";
const Stack =React.memo( ({images, title ,rotationDegree = 20}) => {
    //const [shouldNextCardFlip, setShouldNextCardFlip] = useState(false);
    const [rotations, setRotations]= useState([]);
    
    React.useEffect(() => {
        const calculateRotations = () => {
          return images.map((_, index) => {
            const randNumber =
              (Math.random() * (rotationDegree - 5) + 5) *
              (index % 2 === 0 ? 1 : -1);
            return `${randNumber}deg`;
          });
        };
    
        setRotations(calculateRotations());
      }, [images, rotationDegree]);
    const animation = useAnimation();
    
    useEffect(() => {
        const pulseAnimation = async () => {
            await animation.start({ scale: 1.1, transition: { duration: 0.2 } });
            animation.start({ scale: 1, transition: { duration: 0.2 } });
          };
        const interval = setInterval(() => {
        pulseAnimation();
        }, 10000); // Adjust the interval duration (in milliseconds) as needed
        return () => clearInterval(interval);
    },[animation]);

 
    return (
        <>
        
        <div className="relative">
        {images.map((image, i) => (
          <Card
            index={i}
            image={image}
            rotateClass={rotations[i]}
            key={image}
          />
        ))}
        <motion.div
  className="absolute pl-0 pt-20 md:pt-28 md:pl-10 lg:pl-24 lg:pt-48 w-40 md:w-64 lg:w-80"
  style={{ zIndex: 100 }}
  animate={animation}
>
    <a href={`/explore/${title.toLowerCase()}`}>
        <p className="relative text-3xl md:text-5xl text-white text-center bg-black bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
        {title}
        </p>
    </a>
  
</motion.div>
      </div>
            
        </>
    );
});

export default Stack;