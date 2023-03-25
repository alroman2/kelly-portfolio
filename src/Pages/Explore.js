import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { storage } from "../firebase";
import { ref, list, getDownloadURL } from "firebase/storage";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Masonry, useInfiniteLoader } from "masonic";

const getImages = async (category, lastImage = null, returnEmpty = false) => {

  if (returnEmpty) {
    return { imageUrls: [], nextPagetoken: null };
  }
  
  const cat = category.charAt(0).toUpperCase() + category.slice(1);
  const storageRef = ref(storage, `image/${cat}/resized`);

  let imageListParams = {
    maxResults: 15,
    orderBy: "name",
  };

  if (lastImage !== null) {
    imageListParams.pageToken = lastImage;
  }

  const imageList = await list(storageRef, imageListParams);

  // Get the download URL for each image in the list
  const imageUrls = await Promise.all(
    imageList.items.map(async (imageRef) => {
      const url = await getDownloadURL(imageRef);
      return url;
    })
  );

  const nextPagetoken = imageList.nextPageToken || null;
  return { imageUrls, nextPagetoken  };
};


const Explore = () => {
  const { category } = useParams();
  const [images, setImages] = useState([]);
  const [lastImage, setLastImage] = useState(null);
  const [initLoad, setInitLoad] = useState(false);
  const [didTokenReturnNull, setDidTokenReturnNull] = useState(false);
 
  useEffect(() => {
    if (initLoad !== true) {
      getImages(category).then(({ imageUrls, nextPagetoken }) => {
        setInitLoad(true);
        setImages(imageUrls);
        setLastImage(nextPagetoken);
      }); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadmMore = useInfiniteLoader(
    async ({ startIndex, stopIndex, currentItems }) => {
      
      const { imageUrls, nextPagetoken } = await getImages(
        category,
        lastImage,
        didTokenReturnNull
      );
        if (imageUrls.length === 0) {
          return;
        }
      if (nextPagetoken === null) {
        setDidTokenReturnNull(true);
      }

      //check if there are duplicate images in the imageUrls array with the images array and remove them from the imageUrls array
      const duplicateImages = images.filter((image) =>
        imageUrls.includes(image)
      );
      const filteredImageUrls = imageUrls.filter(
        (image) => !duplicateImages.includes(image)
      );


      
      setImages((prevImages) => [...prevImages, ...filteredImageUrls]);
      setLastImage(nextPagetoken);
    },
    {
      isItemLoaded: (index, items) => !!items[index],
      threshold: 5
    }
  )
  const masonryItems = images.map((image, index) => ({
    src: image,
   
  }));

  const renderItem = ({ data: { src }  }) => (
    <div key={src} className="w-full">
      <img src={src} className={`w-full object-contain transition-all`} alt="preview" />
    </div>
  );

  return (
    <>
      <div id="Title">
        <h1 className="text-3xl md:text-5xl text-center uppercase mt-4 md:mt-8 lg:mt-10">
          {category}
        </h1>
      </div>
      <div className="md:mx-8 lg:mx-10 my-10">
        {initLoad ?  <Masonry
          onRender={loadmMore}
          items={masonryItems}
          columnGutter={16}
          columnWidth={320}
          overscanBy={2}
          render={
           renderItem
          } 
        />
          : 
          <>
            <div
          className="flex flex-wrap gap-4"
          style={{ height: "320px" }}
        >
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} width={200} height={200} />
          ))}
        </div>
          </>
      }
      </div>
    </>
  );
};

export default Explore;
