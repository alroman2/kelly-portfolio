import React from "react";
import MountainImg from '../../Assets/Nature/mountain.jpg';
import Card from "./Card";
const Carousel = () => {

    
    return (
        <div>
            <div>
                <Card image={MountainImg} />
            </div>
        </div>
      );
}

export default Carousel;