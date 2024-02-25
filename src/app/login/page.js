"use client"
import React from 'react'
import { FaRegEyeSlash } from "react-icons/fa";

import  axios  from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation"

const Page = () => {

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const router = useRouter()
    

    const handleSubmit = async (event) => {
        event.preventDefault();
    
    
        // console.log("username",userName , password);
        // return
    
        try {
          const response = await axios.post('http://103.174.103.122:3000/auth/login', {
            userName, password
          });
            
          const token = response.data.token; // Assuming your server returns a token
          // console.log("token", token);
          localStorage.setItem("logintoken", token);
    
          if (token) {
            router.push('/');
          }
    
          // Store the token in local storage or a global state management solution (e.g., Redux)
        } catch (error) {
          console.error('Login failed', error);
        }
      };
    return (
        <>
            <div className='auth-wrapper'>
                <div className='auth-wrapper-left'>
                    <h1>Mykanjee</h1>
                </div>
                <div className='auth-wrapper-right'>
                    <div className='auth-wrapper-form'>
                        <div className='auth-header'>
                            <div className='mb-5'>
                                <h2 className='text-[28px] font-[800]'>Login <span className='text-[14px]'>(Admin)</span></h2>
                                <span className='text-[14px] font-[400] text-slate-400'>Welcome back!</span>
                            </div>
                            <form   onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
        
                            <div className='flex flex-col space-y-2 mb-5'>
                                <label className='text-[#334257] capitalize text-[0.875rem]'>Your Email</label>
                                <input className='border border-slate-300 p-2 rounded-[5px] h-[40px] bg-[#e8f0fe] text-black outline-none focus-none'  value={userName}
              onChange={(e) => setUsername(e.target.value)} name='email' type='email' placeholder='email@address.com' />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <label className='text-[#334257] capitalize text-[0.875rem]'>Password</label>
                                <div className='flex items-center border border-slate-300 p-2 rounded-[5px] h-[40px] bg-[#e8f0fe]'>
                                    <input           value={password}
              onChange={(e) => setPassword(e.target.value)} className=' text-black w-full bg-[#e8f0fe] outline-none focus-none' name='password' type='password' placeholder='********' />
                                    <FaRegEyeSlash className='cursor-pointer text-slate-400 text-[14px]' />
                                </div>
                            </div>

                            <button className='bg-[#ebc25b] p-2 rounded-[5px] text-black text-[14px] font-bold w-full mt-5 hover:bg-[#ebc25b]/70'>Login</button>
                        
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
