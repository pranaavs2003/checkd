'use client'
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useContext } from "react";
import { SuccessContext } from './SuccessContextProvider';
//import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'

import 'react-image-crop/dist/ReactCrop.css'

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function NewerUploadWidget() {
  const [files, setFiles] = useState<File | undefined>(undefined);
  const [fileName, setFileName] = useState<string>("Upload file here");
  const [selectedImage, setSelectedImage] = useState('');
  const session = useSession();
  const router = useRouter();
  const { isPopup, setIsPopup, setIsData } = useContext(SuccessContext); 

  const getFiles = async (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const notification = toast.loading('Processing Cheque');
      setFiles(e.target.files?.[0]);
      setFileName(e.target.files?.[0]?.name.slice(0, 15));
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      formData.append('upload_preset', 'CheckdPreset');
      formData.append('cloud_name', 'dbzzj25vc');
      formData.append("api_key", '914423246894855');

      try{
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dbzzj25vc/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
    
        const file = await response.json();
        setSelectedImage(file.secure_url);

        const data = {
          "accountNumber": "654321987546",
          "email": session?.data?.user?.email!,
          "balance": 100000000,
          "chequeImage": file.secure_url,
          "signatureImage": file.secure_url
        }

        const response1 = await axios.post('https://checkd-api.onrender.com/transaction/', data);  

        console.log(response1?.data);
        console.log('API call made successfully.');
        toast.success('Cheque processed successfully!', {
          id: notification
        });
        //const redirect = toast.loading('Redirecting');
        router.replace('/');
        setIsPopup(true);
        setIsData({
          amount: response1?.data?.amount,
          bankName: response1?.data?.bankName,
          chequeNumber: response1?.data?.chequeNumber,
          ifsCode: response1?.data?.ifsCode,
          ocrStatus: response1?.data?.ocrStatus,
          payeeAccountNumber: response1?.data?.payeeAccountNumber,
          receiverName: response1?.data?.receiverName,
          signatureStatus: response1?.data?.signatureStatus
        });
      }

      catch(err){
        toast.error('Error processing your cheque');
      }

    }
  };

  // useEffect(() => {
  //   console.log("🌜", files);
  // }, [files]);


  //New Code
  //<------------------------------------------------------>
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null)
  const blobUrlRef = useRef('')
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(16 / 9)

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current
    const previewCanvas = previewCanvasRef.current
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist')
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    )
    const ctx = offscreen.getContext('2d')
    if (!ctx) {
      throw new Error('No 2d context')
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    )
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    })

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
    }
    blobUrlRef.current = URL.createObjectURL(blob)

    if (hiddenAnchorRef.current) {
      hiddenAnchorRef.current.href = blobUrlRef.current
      hiddenAnchorRef.current.click()
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined)
    } else {
      setAspect(16 / 9)

      if (imgRef.current) {
        const { width, height } = imgRef.current
        const newCrop = centerAspectCrop(width, height, 16 / 9)
        setCrop(newCrop)
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height))
      }
    }
  }


  //<------------------------------------------------------>


  return (
    <div className="flex flex-row h-[100vh] w-[100vw]">

        <div className="h-32 w-40 p-3 flex flex-col justify-between bg-white rounded-md milder__box__shadow mb-6 cursor-pointer hover:scale-[0.98] transition-[0.5s]" >
            
            {/* Top Container */}
            <div className='flex items-center justify-between' >
                <span className='text-xl font-semibold text-[#727272]' >Upload</span>
                <span className='h-10 w-10 flex justify-start items-center pl-2 rounded-full bg-[#C7B6F2]' >
                    <CenterFocusWeakIcon className='text-white' />
                </span>
            </div>

            {/* Bottom Container */}
            <div className=' text-xs font-semibold text-[#C7B6F2] flex justify-center pt-2 pb-2 border-[2px] border-dashed border-[#C7B6F2] rounded-sm cursor-pointer relative ' >
                <span className='absolute text-sm truncate' >{fileName}</span>
                <input type="file" className="opacity-0" name="file" id="file" accept="image/*" onChange={onSelectFile} />
            </div>
      
        </div>

        <div className="" >
        {/* <div className="Crop-Controls">
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div> */}
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          minWidth={10}
          minHeight={10}
          // circularCrop
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
            className="h-[100vh] w-[100vw]"
          />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
          <div>
            <button onClick={onDownloadCropClick}>Download Crop</button>
            <a
              href="#hidden"
              ref={hiddenAnchorRef}
              download
              style={{
                position: 'absolute',
                top: '-200vh',
                visibility: 'hidden',
              }}
            >
              Hidden download
            </a>
          </div>
        </>
      )}
        
        </div>


    </div>

    
  )
}

