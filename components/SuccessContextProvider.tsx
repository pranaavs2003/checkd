'use client'
import React, { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';
import { useState } from 'react';

interface ChequeDataProps {
  amount: number,
  bankName: string,
  chequeNumber: string,
  ifsCode: string,
  ocrStatus: boolean,
  payeeAccountNumber: string,
  receiverName: string,
  signatureStatus: boolean
}

interface SuccessContextProps {
  isPopup: boolean;
  setIsPopup: Dispatch<SetStateAction<boolean>>;
  isData: ChequeDataProps;
  setIsData: Dispatch<SetStateAction<ChequeDataProps>>;
}

interface SuccessContextProviderProps {
  children: React.ReactNode;
}

export const SuccessContext = createContext<SuccessContextProps>({
  isPopup: false,
  setIsPopup: () => {},
  isData: {
    amount: 0,
    bankName: "",
    chequeNumber: "",
    ifsCode: "",
    ocrStatus: false,
    payeeAccountNumber: "",
    receiverName: "",
    signatureStatus: false
  },
  setIsData: () => {},
});

export default function SuccessContextProvider({
  children,
}: SuccessContextProviderProps) {
  const [isPopup, setIsPopup] = useState(false); // set initial value to false instead of true
  const [isData, setIsData] = useState<ChequeDataProps>(
    {
      amount: 0,
      bankName: "",
      chequeNumber: "",
      ifsCode: "",
      ocrStatus: false,
      payeeAccountNumber: "",
      receiverName: "",
      signatureStatus: false
    }
  );

  return (
    <SuccessContext.Provider value={{ isPopup, setIsPopup, isData, setIsData }}>
      {children}
    </SuccessContext.Provider>
  );
}