import React, {useState} from 'react';
import { Masonry } from 'masonic';

const ExploreGrid = ({ images, category }) => {
    const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const loadedStyle = loaded ? "opacity-100" : "opacity-0";
  const renderItem = ({ data: { src, alt }, index }) => (
    <div key={src} className="w-full">
      <img src={src} alt={alt} className={`w-full object-contain transition-all ${loadedStyle}`} onLoad={handleImageLoad}/>
    </div>
  );

  const masonryItems = images.map((image, index) => ({
    src: image,
    alt: `Image ${index + 1}`,
    index,
  }));

  return (
    <Masonry
      items={masonryItems}
      columnGutter={16}
      columnWidth={320}
      overscanBy={2}
      render={renderItem}
      itemHeightEstimate={400}
      key={category}
    />
  );
};

export default ExploreGrid;
