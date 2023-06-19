'use client'
import CheckDetailedItem from "./ChequeDetailedItem";
import { Timestamp } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useSession } from "next-auth/react";

type Cheque = {
  amount: number;
  bankName: string;
  chequeNumber: string;
  chequeStatus: number;
  payeeAccountNumber: string;
  timestamp: Timestamp;
};

type Cheques = Cheque[];

export default function Cheques() {
  const session = useSession();
  const [cheques, setCheques] = useState<Cheques>([]);
  const [accountNumber, setAccountNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const accountNumberRef = collection(db, "users", session?.data?.user?.email!, "accounts");

  useEffect( () => {
    getCheques();
  }, []);

  useEffect(() => {
    getChequeData();
  }, [accountNumber]);

  // useEffect(() => {
  //   console.log(cheques);
  // }, [cheques]);

  const getCheques = async () => {
    try{
      setLoading(true);
      const data = await getDocs(accountNumberRef);
      if(data?.docs[0]?.data()?.accountNumber) setAccountNumber(data?.docs[0]?.data().accountNumber);
    }
    catch(err){
      console.log(err);
    }
  };

  const getChequeData = async () => {
    try {
      const acno = accountNumber?.trim();
      const chequeRef = collection(
        db,
        "users",
        session?.data?.user?.email!,
        "accounts",
        acno!,
        "cheques"
      );
      const data1 = await getDocs(chequeRef);
      const filteredData = data1?.docs?.map((item) => item.data());
      setCheques(filteredData as Cheques);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  
  
  

  return (
    <div className='mb-5 ' >
        <div className='text-lg font-semibold text-[#666666]' >Recent Transactions</div>
        {/* Transactions Table */}
        <div className='mt-3 flex flex-col space-y-3' >
        {
              cheques?.map((item) => <CheckDetailedItem data={item} key={item?.chequeNumber} />)
            }
        </div>

    </div>
  )
}
