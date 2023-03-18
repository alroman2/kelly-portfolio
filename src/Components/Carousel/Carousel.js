import React, { useEffect, useState } from "react";

import img1 from '../../Assets/Portraits/1.png';
import img2 from '../../Assets/Portraits/2.png';
import img3 from '../../Assets/Portraits/3.png';
import { motion } from "framer-motion";

import Stack from "./Stack";

const Carousel = () => {
    const [currStackIndex, setCurrStackIndex] = useState(0);
    const [stacks, setStacks] = useState([]);
   
    /**
     * Rotates the stack index one left. This is used to rotate the stack of items left
     */
    const handleLeftArrowClick = () => {
        setCurrStackIndex((prevIndex) => (prevIndex - 1 + stacks.length) % stacks.length);
    }

    const handleRightArrowClick = () => {
        setCurrStackIndex((prevIndex) => (prevIndex + 1 + stacks.length) % stacks.length);
    }

    /**
     *  A utility function to create and return a stack object
     * @param {Array} images 
     * @param {String} title 
     * @returns 
     */
    const createStack = (images, title) =>{
        return (
            <>
                <Stack images={images} title={title} />
            </>
        )
    }

    /**
     * Constructor function that create the stacks from all available images. If pulling images via network, make the request here.
     */
    useEffect(()=>{
        //create stack objects here
        setStacks([...stacks, createStack([img1,img2,img3], "Portraits"), createStack([img2,img3], "Pets"),createStack([img1], "Nature")])
    },[stacks])

    return (
        <>
            <motion.div className="grid grid-rows-2 space-y-10 md:space-y-20 h-[80vh] mt-28 md:mt-0 md:grid-cols-3 md:justify-items-center md:items-center transition-all transform-gpu" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 2}}>
                {/** left arrow */}
                <div className="hidden md:h-[750px] md:flex md:flex-row md:items-end" id="left-arrow" onClick={handleLeftArrowClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:w-20 md:h-20 hover:scale-125 transition-all">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>

                </div>
                {/** <!-- The stack object centered */}
                <motion.div initial={{
                    y: -500,
                }} animate={{
                    y: 0, 
                }}
                transition={{
                    duration: 2,
                    type: "spring",
                }}
                className="pl-32 mt-5 md:justify-self-start md:self-start md:mt-32 md:pl-0 lg:pl-32 relative">
                    {
                        stacks[currStackIndex]
                    }       
                </motion.div>

                {/** <!-- The right arrow on mobile devices. There are two arrows for sizing due to clipping issues with the stack container. --> */}
                <div className="hidden md:h-[650px] md:flex md:flex-row md:items-end" onClick={handleRightArrowClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:w-20 md:h-20 hover:scale-125 transition-all">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>

                </div>

                {/** <!-- The left arround on md to lg devices */}
                <div className="grid grid-cols-2 md:hidden" onClick={handleRightArrowClick}>
                    <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-12 h- mr-10 justify-self-end md:w-20 md:h-20 hover:scale-125 transition-all">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </motion.svg>

                    <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    transition={
                        {
                            type: "easeOut",
                            duration: 1,
                            delay: 3,
                        }
                    }
                    animate={{
                        x: ["0rem", "4rem", "0rem"],    
                    }}
                    className="w-12 h-12 ml-10 justify-self-start md:w-20 md:h-20 hover:scale-125 transition-all">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </motion.svg>
                </div>
            </motion.div>
        </>
      );
}

export default Carousel;