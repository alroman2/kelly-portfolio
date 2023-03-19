import React from 'react';
import { Masonry } from 'masonic';

const ImageGrid = ({ images }) => {
  const renderItem = ({ data: { src, alt }, index }) => (
    <div key={index} className="w-full">
      <img src={src} alt={alt} className="w-full object-contain" />
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
    />
  );
};

export default ImageGrid;
