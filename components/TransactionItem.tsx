"use client";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";
export default function TransactionItem() {
  return (
    <div className="bg-white p-3 rounded-md text-xs flex items-center justify-between max-w-[500px] cursor-pointer mild__box__shadow hover:scale-[0.98] transition-[0.5s]">
      <span className="p-1 bg-[#C7B6F2] rounded-full">
        <CallReceivedIcon className="text-lg text-white " />
      </span>
      <span className="font-semibold text-lg text-green-400">$1000</span>
      <span className="font-medium text-gray-500 text-sm">
        1234-4212-4212-3411
      </span>
      <div className="flex text-gray-500 text-[12px]">
        {/* <span className="">10:39 AM: </span> */}
        <span className="">02/25/2023</span>
      </div>
    </div>
  );
}
