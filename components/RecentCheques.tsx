'use client'
import MoreButton from "./MoreButton";
import CheckWidget from "./CheckWidget";
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

export default function RecentCheques() {
  const session = useSession();
  const [cheques, setCheques] = useState<Cheques>([]);
  const chequeCollectionRef = collection(db, "users", session?.data?.user?.email!, "accounts");

  useEffect( () => {
    getCheques();
  }, []);

  // useEffect(() => {
  //   console.log(cheques);
  // }, [cheques]);

  const getCheques = async () => {
    try{
      const data = await getDocs(chequeCollectionRef);
      const filteredData = data?.docs[0].data()?.cheques;
      setCheques(filteredData);
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <div className='' >
        <div className='text-lg font-semibold text-[#666666]' >Recent Cheques</div>
        {/* Transactions Table */}
        <div className='mt-3 flex flex-wrap' >
            {
              cheques.map((item) => <CheckWidget data={item} key={item?.chequeNumber} />)
            }
            {
              cheques.map((item) => <CheckWidget data={item} key={item?.chequeNumber} />)
            }
        </div>
        <MoreButton route={'cheques'} />

    </div>
  )
}
