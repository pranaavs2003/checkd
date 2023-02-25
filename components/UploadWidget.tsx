'use client'
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
export default function UploadWidget() {
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
        <div className=' text-xs font-semibold text-[#C7B6F2] flex justify-center pt-2 pb-2 border-[2px] border-dashed border-[#C7B6F2] rounded-sm cursor-pointer ' >
            Upload Image Here
        </div>
    </div>
  )
}
