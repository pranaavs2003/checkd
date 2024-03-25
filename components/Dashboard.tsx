'use client'
import RecentTransactions from "./RecentTransactions";
import BalanceWidget from "./BalanceWidget";
import UploadWidget from "./UploadWidget";
import RecentCheques from "./RecentCheques";
import SuccessWidget from "./SuccessWidget";
import NewUploadWidget from "./NewUploadWidget";
import { useContext } from "react";
import { SuccessContext } from "./SuccessContextProvider";
import CropImage from "../app/crop/CropImage";

type TransactionRes = {
  bankName: "AXIS BANK LTD";
  chequeNumber: "30906250021101242616031";
  amount: 329000;
  payeeAccountNumber: "911010049001545";
  receiverName: "Vijay Kumar Singh";
  ifsCode: "UTIB0000426";
  ocrStatus: true;
  signatureStatus: true;
};

type TransactionResProps = {
  data: TransactionRes;
};

const data: TransactionRes = {
  bankName: "AXIS BANK LTD",
  chequeNumber: "30906250021101242616031",
  amount: 329000,
  payeeAccountNumber: "911010049001545",
  receiverName: "Vijay Kumar Singh",
  ifsCode: "UTIB0000426",
  ocrStatus: true,
  signatureStatus: true
};

export default function Dashboard() {
  const { isPopup, setIsPopup } = useContext(SuccessContext);
  return (
    <div className="bg-[#ece7f6] h-fit min-h-[100vh] p-10 relative" >

        <button onClick={() => setIsPopup(!isPopup)} >{ ":)" }</button>
        
        <SuccessWidget data={data} />
        <div className="flex-1" >
          {/* Top Container */}
          <div className="" >
              <span className="font-bold text-6xl text-[#a287e7]" >Dashboard</span>
          </div>  

          {/* <CropImage /> */}

          {/* Bottom Container */}
          <div className="mt-8 flex flex-col w-full" >

            {/* Right Container */}
            <div className="lg:w-1/2 w-full" >
              {/* <NewerUploadWidget /> */}
              {/* Quick Actions */}
              <div className="w-full" >
                  <BalanceWidget />
                  {/* <UploadWidget /> */}
                  <NewUploadWidget />
              </div>
              {/* Transactions */}
              <RecentTransactions />
            </div>

            {/* Left Container */}
            <div className="lg:w-1/2 w-full" >
              {/* Cheques */}
              <RecentCheques />
            </div>

          </div>
        </div>
    </div>
  )
}
