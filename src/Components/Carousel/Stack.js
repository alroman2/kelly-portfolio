import React, {useEffect } from "react";
import { motion, useAnimation } from "framer-motion";


import Card from "./Card";
const Stack = ({images, title ,rotionDegree = 20}) => {
    //const [shouldNextCardFlip, setShouldNextCardFlip] = useState(false);
    var b = false
    const createCard =  (image, randomRotation, key,index) => {
        var randNumber = ((Math.random() * (rotionDegree - 5) + 5));
        randNumber = (b) ? randNumber * -1 : randNumber;
        b = !b;
        console.log("creating image: ", image);
        return ( 
            <>
                {
                    randomRotation ? <Card index={index} image={image} rotateClass={`${randNumber}deg`} key={key}/> : <Card index={index} image={image} rotateClass={`0 deg`} key={key}/>
                }
            </>
        );
    }
    
    const animation = useAnimation();
    const pulseAnimation = async () => {
        await animation.start({ scale: 1.1, transition: { duration: 0.2 } });
        animation.start({ scale: 1, transition: { duration: 0.2 } });
      };
    useEffect(() => {
        const interval = setInterval(() => {
        pulseAnimation();
        }, 10000); // Adjust the interval duration (in milliseconds) as needed
        return () => clearInterval(interval);
    }, []);

 
    return (
        <>
        
            <div className="relative">
            
                {   
                    
                    images.map((image, i) => {
                        
                        if (i + 1 === images.length) {
                            return createCard(image, false, "card-"+i, 0);
                        }
                        return createCard(image, true, "card-"+i, 0);
                        
                    })
                    
                }
               
                <motion.div className="pl-0 pt-20 md:pt-28 md:pl-10 lg:pl-24 lg:pt-48 w-40 md:w-64 lg:w-80" animate={animation}>
                    <p className="relative text-3xl md:text-5xl text-white bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                        {
                            title
                        }
                    </p>
                </motion.div>
            </div>
            
        </>
    );
};

export default Stack;