import React from "react";
import { useParams } from "react-router-dom";
import Navigation from "../Components/Navigation/Navigation";
import Footer from "../Components/Footer/Footer";
import ExploreGrid from "../Components/ExploreGrid/ExploreGrid";


import img1 from '../Assets/Portraits/1.png';
import img2 from '../Assets/Portraits/2.png';
import img3 from '../Assets/Portraits/3.png';

import grad1 from '../Assets/Graduation/IMG_3325.JPEG';
import grad2 from '../Assets/Graduation/IMG_3326.JPEG';
import grad3 from '../Assets/Graduation/IMG_3327.JPEG';

import nat1 from '../Assets/Nature/IMG_3331.JPEG';
import nat2 from '../Assets/Nature/IMG_3332.JPEG';
import nat3 from '../Assets/Nature/IMG_3333.JPEG';

import pet1 from  '../Assets/Pets/IMG_3328.JPEG';
import pet2 from  '../Assets/Pets/IMG_3329.JPEG';
import pet3 from  '../Assets/Pets/IMG_3330.JPEG';

const Explore = () =>{
    const {category} = useParams();

    const images = [
        img1, img2, img3, grad1, grad2, grad3, nat1, nat2, nat3, pet1, pet2, pet3
    ];
    return(
        <>
            <Navigation />
            <div id="Title">
                <h1 className="text-3xl md:text-5xl text-center uppercase mt-4 md:mt-8 lg:mt-10">
                    {category}
                </h1>
            </div>
            <div className=" md:mx-8 lg:mx-10 my-10">
                <ExploreGrid images={images} />
            </div>
            <Footer />
        </>
    );
}

export default Explore;