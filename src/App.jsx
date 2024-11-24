import React, { useState } from 'react';
import Details from "./components/Details";
import Navbar from "./components/Navbar";
import PhotoUpload from "./components/PhotoUpload";
import Divider from '@mui/material/Divider';
import axios from 'axios'; 
import { Toaster, toast } from 'sonner'

function App() {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [details, setDetails] = useState({});
  const url = import.meta.env.VITE_API_URL;

  const handleImageUpload = (side, image) => {
    if (side === 'front') {
      setFrontImage(image);
    } else if (side === 'back') {
      setBackImage(image);
    }
  };

  const handleSubmitUpload = async () => {

    if (!frontImage || !backImage) {
      toast.warning('Please upload both front and back sides of the Aadhar card');
      return;
    }

  
    const formData = new FormData();
    formData.append('frontSide', dataURLtoFile(frontImage, 'front-side.jpg'));
    formData.append('backSide', dataURLtoFile(backImage, 'back-side.jpg'));

    try {
      setIsUploading(true);
      const response = await axios.post(`${url}/upload-aadhar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
        if(response.status === 200) {
          console.log(response.data);
          
          setDetails(response.data)
          setIsUploading(false)
          toast.success('Aadhar card uploaded successfully');
          setFrontImage(null);
          setBackImage(null);
        }

    } catch (error) {
      console.error('Upload failed', error);
      toast.error('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };


  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n); 
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <>
    <Toaster position="top-center" richColors/>
      <div className="w-full min-h-screen overflow-hidden">
        <div className="fixed w-full top-0 left-0 z-10">
          <Navbar />
        </div>
        
        <main className="flex w-full h-screen pt-[35px]">
          <section className="w-1/2 px-20 py-10">
            <h1 className="text-3xl font-semibold align-middle items-center mb-5">
              Upload your Aadhar
            </h1>
            
            <div className="h-[480px] w-full flex flex-col">
              <h1 className="font-semibold pl-20">Upload Front side</h1>
              <div className="h-1/2 w-full px-10 pt-2 flex justify-center">
                <PhotoUpload 
                  side="front"
                  onImageUpload={(image) => handleImageUpload('front', image)}
                  image={frontImage}
                />
              </div>
              
              <h1 className="font-semibold pl-20">Upload Back side</h1>
              <div className="h-1/2 w-full px-10 pt-2 flex justify-center">
                <PhotoUpload 
                  side="back"
                  onImageUpload={(image) => handleImageUpload('back', image)}
                  image={backImage}
                />
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                className="h-10 w-3/4 bg-black text-white mt-5 rounded-md font-bold"
                onClick={handleSubmitUpload}
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </section>
          
          <Divider orientation="vertical" variant="middle" flexItem />
          
          <section className="w-1/2 h-full flex justify-center items-center px-20">
            <Details details = {details}/>
            
          </section>
        </main>
      </div>
    </>
  );
}

export default App;