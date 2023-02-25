import MoreButton from "./MoreButton"
import CheckWidget from "./CheckWidget"
export default function RecentCheques() {
  return (
    <div className='' >
        <div className='text-lg font-semibold text-[#666666]' >Recent Cheques</div>
        {/* Transactions Table */}
        <div className='mt-3 flex flex-wrap' >
            <CheckWidget />
            <CheckWidget />
            <CheckWidget />
            <CheckWidget />
        </div>
        <MoreButton />

    </div>
  )
}
