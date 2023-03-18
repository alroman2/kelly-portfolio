import React from "react";

import img1 from '../../Assets/Portraits/1.png';
import img2 from '../../Assets/Portraits/2.png';
import img3 from '../../Assets/Portraits/3.png';
import { motion } from "framer-motion";

import Stack from "./Stack";

const Carousel = () => {
    const images = [img3,img2,img1]
    
    return (
        <motion.div className="grid grid-rows-2 space-y-10 md:space-y-20 h-[80vh] mt-28 md:mt-0 md:grid-cols-3 md:justify-items-center md:items-center transition-all transform-gpu" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 2}}>
            <div className="hidden md:h-[750px] md:flex md:flex-row md:items-end">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:w-20 md:h-20 hover:scale-125 transition-all">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>

            </div>
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
                <Stack images={images} title="Portraits" >       
                </Stack >
            </motion.div>
            <div className="hidden md:h-[650px] md:flex md:flex-row md:items-end">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:w-20 md:h-20 hover:scale-125 transition-all">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>


            </div>
            <div className="grid grid-cols-2 md:hidden">
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
      );
}

export default Carousel;