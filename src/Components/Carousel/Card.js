import React from "react";

const Card = ({image, rotate}) => {
    
    return(
    <>
        <div className="w-[20vw] h-[50vh] object-contain rotate-[]">
            <img src={image} alt="card" />
        </div>
    </>
    );
};

export default Card;