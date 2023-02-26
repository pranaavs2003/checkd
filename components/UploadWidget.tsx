'use client'
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import { useEffect, useState } from 'react';
export default function UploadWidget() {
  const [files, setFiles] = useState<File | undefined>(undefined);
  const [fileName, setFileName] = useState<string>("Upload file here");

  const getFiles = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files?.[0]);
      setFileName(e.target.files?.[0]?.name.slice(0, 15));
    }
  };

  // useEffect(() => {
  //   console.log("🌜", files);
  // }, [files]);

  return (
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
          <input type="file" className="opacity-0" name="file" id="file" onChange={(e) => getFiles(e)} />
        </div>
        
    </div>
  )
}