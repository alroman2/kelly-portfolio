import React, { useState } from "react";

const Card = ({ image, rotateClass, index }) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const style =
    "w-[40vw] md:w-[30vw] h-[80vh] lg:w-[20vw] md:h-[50vh] object-contain transform-gpu absolute z-1 hover:brightness-50 transition-opacity duration-500";
  const loadedStyle = loaded ? "opacity-100" : "opacity-0";

  return (
    <>
      <div
        className={`${style} ${loadedStyle}`}
        style={{
          rotate: rotateClass,
          zIndex: index,
          userSelect: "none",
            WebkitTouchCallout: "none",
            msUserSelect: "none",
            MozUserSelect: "none",
        }}
      >
        <img
          src={image}
          alt="card"
          className="drop-shadow-lg rounded-lg"
          onLoad={handleImageLoad}
        ></img>
      </div>
    </>
  );
};

export default Card;
