"use client";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { Timestamp } from "firebase/firestore";
import formatAccno from "../utilities/formatAccountNumber";

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

type Props = {
  data: Transaction;
};

function unixToDateTime(unixTime: number) {
    const dateObj = new Date(unixTime * 1000);
    const year = dateObj.getFullYear();
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const date = ("0" + dateObj.getDate()).slice(-2);
    const hours = ("0" + dateObj.getHours()).slice(-2);
    const minutes = ("0" + dateObj.getMinutes()).slice(-2);
    const seconds = ("0" + dateObj.getSeconds()).slice(-2);
  
    const formattedDateTime = `${hours}:${minutes}     ${date}-${month}-${year}`;
  
    return formattedDateTime;
  }

export default function TransactionDetailedItem({data} : Props) {
  console.log("🍾" ,data);
  return (
    <div className="bg-white p-3 rounded-md text-xs flex items-center justify-between max-w-[800px] space-x-10 cursor-pointer mild__box__shadow hover:scale-[0.98] transition-[0.5s]">
      <span className="p-1 bg-[#C7B6F2] rounded-full">
        {
          !data?.isCredited
          ?
          <CallMadeIcon className="text-lg text-white " />
          :
          <CallReceivedIcon className="text-lg text-white " />
        }
      </span>
      <span className={`font-semibold text-lg ${data?.isCredited ? "text-green-400" : "text-red-400"}`}>${data?.amount}</span>
      <div className="flex text-gray-500 text-[12px]">
        {/* <span className="">10:39 AM: </span> */}
        <span className="text-md font-bold">{data?.bankName}</span>
      </div>
      <span className="font-medium text-gray-500 text-sm">
        {formatAccno(data?.payeeAccountNumber)}
      </span>
      <span className="font-medium text-gray-400 text-xs">
        {unixToDateTime(data?.timestamp?.seconds)}
      </span>
      <span className={` ${data?.transactionStatus ? "text-green-400" : "text-red-500"} text-sm font-semibold`}>
        {data?.transactionStatus ? "Success" : "Failed"}
      </span>
    </div>
  );
}
