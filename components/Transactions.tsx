'use client'
import TransactionDetailedItem from "./TransactionDetailedItem";
import MoreButton from "./MoreButton";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { MoonLoader } from "react-spinners";
import { async } from "@firebase/util";

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

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transactions>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [accountNumber, setAccountNumber] = useState<string | null>(null);
  const session = useSession();

  const accountNumberRef = collection(db, "users", session?.data?.user?.email!, "accounts");

  useEffect(() => {
    getTransactions();
  }, []);

  // useEffect(() => {
  //   console.log(transactions);
  // }, [transactions]);

  useEffect(() => {
    getTransactionData();
  }, [accountNumber]);

  const getTransactions = async () => {
    try{
      setLoading(true);
      const data = await getDocs(accountNumberRef);
      if(data?.docs[0]?.data()?.accountNumber) setAccountNumber(data?.docs[0]?.data()?.accountNumber);
    }
    catch(err){
      console.log(err);
    }
  };

  const getTransactionData = async () => {
    try{
      if(accountNumber){
        const acno = accountNumber?.trim();
        const transactionsCollectionRef = collection(db, "users", session?.data?.user?.email!, "accounts", acno!, "transactions");
        //console.log(transactionsCollectionRef);
        const data1 = await getDocs(transactionsCollectionRef);
        const filteredData = data1?.docs?.map( (item) => item.data());
        setTransactions(filteredData!);
        setLoading(false);
      }
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <div className='mb-5 ' >
        <div className='text-lg font-semibold text-[#666666]' >Recent Transactions</div>
        {/* Transactions Table */}
        <div className='mt-3 flex flex-col space-y-3' >
            {
              transactions.map((item) => <TransactionDetailedItem data={item} key={item?.transactionID} />)
            }
        </div>

    </div>
  )
}
