import React from "react";


import Card from "./Card";
const Stack = ({images, rotionDegree = 20}) => {
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
               
            </div>
        </>
    );
};

export default Stack;