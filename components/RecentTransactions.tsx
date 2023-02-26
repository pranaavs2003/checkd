'use client'
import TransactionItem from "./TransactionItem";
import MoreButton from "./MoreButton";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { collection, getDocs, Timestamp } from "firebase/firestore";

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
      const data = await getDocs(transactionsCollectionRef);
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
              transactions.map((item) => <TransactionItem data={item} key={item?.transactionID} /> )
            }
        </div>
        <MoreButton route={'/transactions'} />

    </div>
  )
}
