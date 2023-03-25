import React, { useState, useEffect } from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, list, getDownloadURL, deleteObject} from 'firebase/storage';
import DialogBox from '../Error/DialogBox';
import  useBottomScrollListener  from './../../Hooks/useBottomScrollListener';
const categories = ['Portraits', 'Nature', 'Graduation', 'Pets'];

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

const Manager = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [didTokenReturnNull, setDidTokenReturnNull] = useState(false);
  const [tab, setTab] = useState('upload');
  const [images, setImages] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const isBottom = useBottomScrollListener();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleFileUpload =  (e) => {
    const files = e.target.files;
    setFilesToUpload(files);
  };

  const handleStartFileUpload =  async () => {
    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      const storageRef = ref(storage, `image/${selectedCategory}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      }, (error) => {
        console.log(error);
      });
    }
  };


  const deleteImageByURL = async (url) => {
    const storageRef = ref(storage, url);
    try {
      await deleteObject(storageRef);
      // File deleted successfully
      //Remove this url from the array
      setImages((prevImages) => prevImages.filter((image) => image !== url));
      setDialogMessage('Image deleted successfully');
      setShowDialog(true);
    } catch (error) {
      // Uh-oh, an error occurred! Display error message
      setDialogMessage(error.message);
      setShowDialog(true);
    }
    
  };
  const handleImageDelete = (e) => {
    deleteImageByURL(e.target.id);
    console.log('delete image', e.target.id);
  };


  useEffect(() => {
    if (selectedCategory !== '' && tab === 'delete') {
      getImages(selectedCategory).then(({ imageUrls, nextPagetoken }) => {
        setImages(imageUrls);
        setNextPageToken(nextPagetoken);
        setDidTokenReturnNull(false);
      }); 
    }
  }, [tab,selectedCategory])

  useEffect(() => {
    console.log('isBottom: ', isBottom);
    if (isBottom) {
        const getMore = async() => {
          const { imageUrls, nextPagetoken } = await getImages(
            selectedCategory,
            nextPageToken,
            didTokenReturnNull
          );

          console.log('attempted to fetch more images, count ', imageUrls.length)
          if (imageUrls.length === 0) {
            return;
          }
          if (nextPagetoken === null) {
            setDidTokenReturnNull(true);
          }

          const duplicateImages = images.filter((image) =>
          imageUrls.includes(image)
          );
          const filteredImageUrls = imageUrls.filter(
            (image) => !duplicateImages.includes(image)
          );


          setImages((prevImages) => [...prevImages, ...filteredImageUrls]);
          setNextPageToken(nextPagetoken);
        }
      getMore();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottom]);
  

  return (
    
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mb-4">Site Admin</h1>
    {
      showDialog && (
        <DialogBox message={dialogMessage} onClose={() => setShowDialog(false)} />
      )
    }
      <div className='bg-white rounded-lg  drop-shadow-lg min-h-[60vh]'>
        {/** Dropdown */}
        <div className='flex items-center justify-center mb-10'>
            <label htmlFor="category" className="block mb-2">
            Category:
            </label>
            <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border rounded p-2"
            >
            <option value="">Select a category</option>
            {categories.map((category) => (
                <option key={category} value={category}>
                {category}
                </option>
            ))}
            </select>
        </div>
        {
            selectedCategory && (
                <>
                                    {/** Upload section */}

                        <div className='grid grid-flow-col grid-cols-2 items-center justify-center text-center'>
                            
                            <button className={` p-2 rounded ${tab === 'upload' ? 'bg-black text-white': 'bg-white text-black'}`} onClick={() => setTab('upload')}>
                                Upload
                            </button>
                            <button className={`p-2 rounded ${tab === 'delete' ? 'bg-black text-white': 'bg-white text-black'}`} onClick={() => setTab('delete')}>
                                Delete
                            </button>
                        </div>
                        {/** Add a divider here */}
                        <div className='border-t-2 border-gray-200'></div>
                        
                        {tab === 'upload' && (
                            <div className='flex flex-row justify-center w-full h-full'>
                                    <div className='flex flex-col justify-start items-center mt-32'>
                                        <label htmlFor="upload" className="block mb-2">
                                            Upload Images:
                                        </label>
                                        <input
                                            type="file"
                                            id="upload"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            multiple
                                            className="border rounded p-2"
                                        />
                                    </div>
                            
                            </div>
                        )}
                        {filesToUpload.length > 0 && (
                          <>
                            <button
                              className="mt-4 bg-blue-500 text-white p-2 rounded"
                              onClick={handleStartFileUpload}
                            >
                              Upload
                            </button>
                            <div className="mt-4 relative pt-1">
                              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                <div
                                  style={{ width: `${uploadProgress}%` }}
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                ></div>
                              </div>
                            </div>
                          </>
                        )}
      
                      {tab === 'delete' && (
                            <div className="mt-4 max-w-full grid grid-cols-2 md:grid-cols-3 space-y-10">
                              {
                                  images.length > 0 && (
                                    images.map((image,index) => (
                                      <div key={image} className="w-full h-full">
                                      <div className="bg-white rounded shadow-md flex flex-col justify-between">
                                          <img key={image} src={image} className="w-full object-contain transition-all" alt="preview" />
                                          <div className="p-4"> 
                                              <button id={image} className="block w-full py-2 px-4 border border-gray-900 text-gray-900 rounded font-semibold hover:text-white hover:bg-gray-900" onClick={handleImageDelete}> Delete </button>      
                                          </div>
                                      </div>
                                  </div>
                                    ))
                                  )
                              }
                            </div>
                          )}
                </>
            )
        }
        </div>

  
    </div>
  );
};

export default Manager;
