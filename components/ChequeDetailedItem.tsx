'use client'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { Timestamp } from 'firebase/firestore';
import formatAccno from '../utilities/formatAccountNumber';
type Cheque = {
    amount: number;
    bankName: string;
    chequeNumber: string;
    chequeStatus: number;
    payeeAccountNumber: string;
    timestamp: Timestamp;
};

type Prop = {
    data: Cheque;
};

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();
const date = `${day}/${month}/${year}`;

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

export default function CheckDetailedItem({data} : Prop) {
  return (
    <div className="bg-white p-3 rounded-md text-xs flex items-center justify-between max-w-[1000px] space-x-10 cursor-pointer mild__box__shadow hover:scale-[0.98] transition-[0.5s]">
      <span className="">
        {
          data?.chequeStatus
          ?
          <CheckCircleOutlineIcon className="text-2xl text-green-400 " />
          :
          <CancelIcon className="text-xl text-red-500 " />
        }
      </span>
      <span className={`font-semibold text-lg ${true ? "text-green-400" : "text-red-400"}`}>${data?.amount}</span>
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
      <span className={` ${data?.chequeStatus ? "text-green-400" : "text-red-500"} text-sm font-semibold`}>
        {data?.chequeStatus ? "Success" : "Failed"}
      </span>
    </div>
  )
}
