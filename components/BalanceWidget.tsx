'use client'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
export default function BalanceWidget() {
  return (
    <div className="h-32 w-40 p-3 flex flex-col justify-between bg-white rounded-md milder__box__shadow mb-6 cursor-pointer hover:scale-[0.98] transition-[0.5s]" >
        {/* Top Container */}
        <div className='flex items-center justify-between' >
            <span className='text-xl font-semibold text-[#727272]' >Balance</span>
            <span className='h-10 w-10 flex justify-start items-center pl-2 rounded-full bg-[#C7B6F2]' >
                <AccountBalanceWalletIcon className='text-white' />
            </span>
        </div>

        {/* Bottom Container */}
        <div className='font-bold text-[#C7B6F2] text-3xl mb-3' >
            $1523.43
        </div>
    </div>
  )
}
