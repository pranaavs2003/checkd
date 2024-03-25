'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// import { useHistory } from 'react-router-dom';

// interface OtpInputProps {
//   onSuccess: () => void;
//   onFailure: () => void;
// }


const OtpInput = () => {
  const [otp, setOtp] = useState('');
  const router = useRouter();
//   const history = useHistory();

  const onSuccess = () => {
    router.replace('/success');
  };

  const onFailure = () => {
    router.replace('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      
      const response = await axios.post('http://127.0.0.1:8000/check_otp', { otp: otp });
      if (response.data.success) {
        onSuccess();
      } else {
        onFailure();
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      onFailure();
    }
  };

  useEffect(() => {
    const sendAPI = async () => {
      await axios.get('http://127.0.0.1:8000/send_otp');
    };
  
    sendAPI();
  }, []);

  return (
    <div>
      <div className="text-3xl font-semibold p-5 ml-[20vw] min-h-screen h-fit" >
          <div className="flex-1" >

            {/* Top Container */}
            <div className="mb-44" >
                <span className="font-bold text-6xl text-[#a287e7]" >Enter your OTP</span>
            </div>  
  
            <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={otp}
              onChange={handleChange}
              placeholder="Enter OTP"
            />
            <button type="submit">Submit</button>
          </form>


          </div>
        </div>
    </div>
  );
};

export default OtpInput;
