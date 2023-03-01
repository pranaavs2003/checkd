'use client'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
type Transaction = {
  amount: number;
  bankName: string;
  chequeImage: string;
  chequeNumber: string;
  otpStatus: boolean;
  payeeAccountNumber: string;
  timestamp: Timestamp;
  transactionID: string;
  transactionStatus: boolean;
  isCredited: boolean;
};

type Transactions = Transaction[];

export default function BalanceWidget() {
  const [transactions, setTransactions] = useState<Transactions>([]);
  const [balance, setBalance] = useState(0.0);
  const session = useSession();
  const router = useRouter();
  const transactionsCollectionRef = collection(db, "users", session?.data?.user?.email!, "accounts");

  useEffect(() => {
    getTransaction();
  }, [transactions]);

  const getBalance = (filteredData: Transactions):number => {
    let bal = 0;
    bal += filteredData.map((item) => {
      if (item?.isCredited) return item?.amount;
      return -item?.amount;
    }).reduce((acc, val) => acc + val, 0);
    return bal;
  };

  const getTransaction = async () => {
    const data = await getDocs(transactionsCollectionRef);
    const filteredData = data?.docs[0].data().transactions;
    setBalance(getBalance(filteredData));
  };

  return (
    <div
      onClick={() => router.replace('/account')} 
      className="h-32 w-40 p-3 flex flex-col justify-between bg-white rounded-md milder__box__shadow mb-6 cursor-pointer hover:scale-[0.98] transition-[0.5s]" >
        {/* Top Container */}
        <div className='flex items-center justify-between' >
            <span className='text-xl font-semibold text-[#727272]' >Balance</span>
            <span className='h-10 w-10 flex justify-start items-center pl-2 rounded-full bg-[#C7B6F2]' >
                <AccountBalanceWalletIcon className='text-white' />
            </span>
        </div>

        {/* Bottom Container */}
        <div className='font-bold text-[#C7B6F2] text-3xl mb-3' >
            ${balance}
        </div>
    </div>
  )
}
