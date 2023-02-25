import TransactionItem from "./TransactionItem"
import MoreButton from "./MoreButton"
export default function RecentTransactions() {
  return (
    <div className='mb-5' >
        <div className='text-lg font-semibold text-[#666666]' >Recent Transactions</div>
        {/* Transactions Table */}
        <div className='mt-3 flex flex-col space-y-3' >
            <TransactionItem />
            <TransactionItem />
            <TransactionItem />
            <TransactionItem />
        </div>
        <MoreButton />

    </div>
  )
}
