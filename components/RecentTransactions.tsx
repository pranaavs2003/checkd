'use client'
import TransactionItem from "./TransactionItem";
import MoreButton from "./MoreButton";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { MoonLoader } from "react-spinners";

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

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transactions>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const session = useSession();

  const transactionsCollectionRef = collection(db, "users", session?.data?.user?.email!, "accounts")

  useEffect(() => {
    getTransactions();
  }, []);

  // useEffect(() => {
  //   console.log(transactions);
  // }, [transactions]);

  const getTransactions = async () => {
    try{
      setLoading(true);
      const data = await getDocs(transactionsCollectionRef);
      setLoading(false);
      const filteredData = data?.docs[0]?.data()?.transactions;
      setTransactions(filteredData);
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <div className='mb-5' >
        <div className='text-lg font-semibold text-[#666666]' >Recent Transactions</div>
        {/* Transactions Table */}
        <div className='mt-3 flex flex-col space-y-3' >
            {
              transactions.map((item) => <TransactionItem data={item} key={item?.transactionID} />)
            }
        </div>
        <MoreButton route={'/transactions'} />

    </div>
  )
}

// Loading Code removed
// {
//   (isLoading)
//   ?
//   <MoonLoader color="#A287E7" size="20px" className="w-full flex justify-center" />
//   :
//    )
// }