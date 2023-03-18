import React from "react";

const Card = ({image, rotateClass, index}) => {
    
    const style = 'w-[40vw] md:w-[30vw] h-[80vh] lg:w-[20vw] md:h-[50vh] object-contain transform-gpu absolute z-1 hover:brightness-50';
    return(
    <>
        <div className={style} style={{
            rotate: rotateClass,
            zIndex: index
        }}>
            <img src={image} alt="card" className="drop-shadow-lg rounded-lg" >
            </img>
        </div>
    </>
    );
};

export default Card;