'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/images/logo.png'
import dashboard from '../../../public/images/dashboard.svg'
import category from '../../../public/images/category.svg'
import { MdLogout } from "react-icons/md";
import Dashboard from './Dashboard';
import Category from './Category';
import ProductList from './ProductList';
import UserList from './UserList';
import SellerList from './SellersList';
import OrderList from './OrderList';
import VendorDetails from './VendorDetails';
import VendorQuotes from './VendorQuotes';
import Transection from './Transection';
import Feedback from './Feedback';
import Page from '../login/page';

import { useRouter } from "next/navigation"
import DriverList from './DriverList';
import Invoices from './Invoices';

const Sidebar = () => {


    const router = useRouter()

    const [activeComponent, setActiveComponent] = useState('dashboard'); // Initially set to 'dashboard'
    const handleMenuItemClick = (component) => {
        setActiveComponent(component);
    };



    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isProductOpen, setIsProductOpen] = useState(false);

    const toggleCategoryDropdown = () => {
        console.log('first')
        setIsCategoryOpen(!isCategoryOpen);
    };

    const toggleProductDropdown = () => {
        setIsProductOpen(!isProductOpen);
    };

    const handleLogout = async () => {
       await localStorage.setItem("logintoken", null)
      await  router.push('/login')
    };
    return (
        <div className='flex h-screen'>

            {/*------------------------------- Lest side Menu -------------------------------------*/}
            <div className="flex flex-col w-1/4 p-4 bg-[#fcf8ee] justify-between h-full text-white">
                <div className='flex items-center space-x-3 py-2'>
                    <Image src={logo} width={50} height={50} />
                    <span className='text-black font-bold'>Mykanjee</span>
                </div>


                <ul className="space-y-3 text-black h-[100%] overflow-y-scroll">
                    <li className={`leftMenuHover p-[10px] rounded-[8px] cursor-pointer ${activeComponent === 'dashboard'? 'activeLeftMenu': ''}`} onClick={() => handleMenuItemClick('dashboard')}>
                        <div className='flex items-center gap-[10px] '>
                            <Image src={dashboard} height={20} width={20} />
                            Dashboard
                        </div>
                    </li>
                    <div className='flex flex-col spac-y-2'>
                        <span className='text-[12px] text-[#7D672E]'>Product Management</span>
                        <li className={`leftMenuHover p-[10px] rounded-[8px] cursor-pointer ${activeComponent === 'category'? 'activeLeftMenu': ''}`} onClick={() => handleMenuItemClick('category')}>
                            <div className='flex items-center justify-between gap-[10px] ' >
                                <div className='flex item-center gap-[10px]'>
                                    <Image src={category} height={20} width={20} />
                                    <div>
                                    <div > {/* <span className='bg-black w-[7px] h-[7px] rounded-full'></span> */}
                                    <span  className='text-[15px] hover:text-[#FCF8EE]'>Categories</span></div>
                                </div>
                                </div>
                                <div className='flex flex-col space-y-1 py-2'>
                                
                                
                            </div>
                            </div>
                        </li>
                        <li className={`leftMenuHover p-[10px] rounded-[8px] cursor-pointer ${activeComponent === 'userList'? 'activeLeftMenu': ''}` } onClick={() => handleMenuItemClick('userList')}>
                            <div className='flex items-center justify-between gap-[10px] ' >
                                <div className='flex item-center gap-[10px]'>
                                    <Image src={category} height={20} width={20} />
                                    <div>
                                    <div > {/* <span className='bg-black w-[7px] h-[7px] rounded-full'></span> */}
                                    <span  className='text-[15px] hover:text-[#FCF8EE]'>User List</span></div>
                                </div>
                                </div>
                                <div className='flex flex-col space-y-1 py-2'>
                                
                                
                            </div>
                            </div>
                        </li>
                        <li className={`leftMenuHover p-[10px] rounded-[8px] cursor-pointer ${activeComponent === 'productList'? 'activeLeftMenu': ''}`} onClick={() => handleMenuItemClick('productList')}>
                            <div className='flex items-center justify-between gap-[10px] ' >
                                <div className='flex item-center gap-[10px]'>
                                    <Image src={category} height={20} width={20} />
                                    <div>
                                    <div > {/* <span className='bg-black w-[7px] h-[7px] rounded-full'></span> */}
                                    <span  className='text-[15px] hover:text-[#FCF8EE]'>Product List</span></div>
                                </div>
                                </div>
                                <div className='flex flex-col space-y-1 py-2'>
                                
                                
                            </div>
                            </div>
                        </li>
                        <li className={`leftMenuHover p-[10px] rounded-[8px] cursor-pointer ${activeComponent === 'sellerList'? 'activeLeftMenu': ''}`} onClick={() => handleMenuItemClick('sellerList')}>
                            <div className='flex items-center justify-between gap-[10px] ' >
                                <div className='flex item-center gap-[10px]'>
                                    <Image src={category} height={20} width={20} />
                                    <div>
                                    <div > {/* <span className='bg-black w-[7px] h-[7px] rounded-full'></span> */}
                                    <span  className='text-[15px] hover:text-[#FCF8EE]'>Seller&apos;s List</span></div>
                                </div>
                                </div>
                                <div className='flex flex-col space-y-1 py-2'>
                            </div>
                            </div>
                        </li>
                        <li className={`leftMenuHover p-[10px] rounded-[8px] cursor-pointer ${activeComponent === 'driverList'? 'activeLeftMenu': ''}`} onClick={() => handleMenuItemClick('driverList')}>
                            <div className='flex items-center justify-between gap-[10px] ' >
                                <div className='flex item-center gap-[10px]'>
                                    <Image src={category} height={20} width={20} />
                                    <div>
                                    <div > {/* <span className='bg-black w-[7px] h-[7px] rounded-full'></span> */}
                                    <span  className='text-[15px] hover:text-[#FCF8EE]'>Driver&apos;s List</span></div>
                                </div>
                                </div>
                                <div className='flex flex-col space-y-1 py-2'>
                            </div>
                            </div>
                        </li>
                        <li className={`leftMenuHover p-[10px] rounded-[8px] cursor-pointer ${activeComponent === 'orderList'? 'activeLeftMenu': ''}`} onClick={() => handleMenuItemClick('orderList')}>
                            <div className='flex items-center justify-between gap-[10px] ' >
                                <div className='flex item-center gap-[10px]'>
                                    <Image src={category} height={20} width={20} />
                                    <div>
                                    <div > {/* <span className='bg-black w-[7px] h-[7px] rounded-full'></span> */}
                                    <span  className='text-[15px] hover:text-[#FCF8EE]'>Order&apos;s List</span></div>
                                </div>
                                </div>
                                <div className='flex flex-col space-y-1 py-2'>
                            </div>
                            </div>
                        </li>
                        <li className={`leftMenuHover p-[10px] rounded-[8px] cursor-pointer ${activeComponent === 'vendorDetails'? 'activeLeftMenu': ''}`} onClick={() => handleMenuItemClick('vendorDetails')}>
                            <div className='flex items-center justify-between gap-[10px] ' >
                                <div className='flex item-center gap-[10px]'>
                                    <Image src={category} height={20} width={20} />
                                    <div>
                                    <div > {/* <span className='bg-black w-[7px] h-[7px] rounded-full'></span> */}
                                    <span  className='text-[15px] hover:text-[#FCF8EE]'>Vendor Details</span></div>
                                </div>
                                </div>
                                <div className='flex flex-col space-y-1 py-2'>
                            </div>
                            </div>
                        </li>
                        <li className={`leftMenuHover p-[10px] rounded-[8px] cursor-pointer ${activeComponent === 'vendorQuotes'? 'activeLeftMenu': ''}`} onClick={() => handleMenuItemClick('vendorQuotes')}>
                            <div className='flex items-center justify-between gap-[10px] ' >
                                <div className='flex item-center gap-[10px]'>
                                    <Image src={category} height={20} width={20} />
                                    <div>
                                    <div > {/* <span className='bg-black w-[7px] h-[7px] rounded-full'></span> */}
                                    <span  className='text-[15px] hover:text-[#FCF8EE]'>Vendor Quotes</span></div>
                                </div>
                                </div>
                                <div className='flex flex-col space-y-1 py-2'>
                            </div>
                            </div>
                        </li>
                        <li className={`leftMenuHover p-[10px] rounded-[8px] cursor-pointer ${activeComponent === 'transectiion'? 'activeLeftMenu': ''}`} onClick={() => handleMenuItemClick('transectiion')}>
                            <div className='flex items-center justify-between gap-[10px] ' >
                                <div className='flex item-center gap-[10px]'>
                                    <Image src={category} height={20} width={20} />
                                    <div>
                                    <div > {/* <span className='bg-black w-[7px] h-[7px] rounded-full'></span> */}
                                    <span  className='text-[15px] hover:text-[#FCF8EE]'>Transection List</span></div>
                                </div>
                                </div>
                                <div className='flex flex-col space-y-1 py-2'>
                            </div>
                            </div>
                        </li>
                        <li className={`leftMenuHover p-[10px] rounded-[8px] cursor-pointer ${activeComponent === 'feedback'? 'activeLeftMenu': ''}`} onClick={() => handleMenuItemClick('feedback')}>
                            <div className='flex items-center justify-between gap-[10px] ' >
                                <div className='flex item-center gap-[10px]'>
                                    <Image src={category} height={20} width={20} />
                                    <div>
                                    <div > {/* <span className='bg-black w-[7px] h-[7px] rounded-full'></span> */}
                                    <span  className='text-[15px] hover:text-[#FCF8EE]'>Feedback List</span></div>
                                </div>
                                </div>
                                <div className='flex flex-col space-y-1 py-2'>
                            </div>
                            </div>
                        </li>
                        <li className={`leftMenuHover p-[10px] rounded-[8px] cursor-pointer ${activeComponent === 'invoices'? 'activeLeftMenu': ''}`} onClick={() => handleMenuItemClick('invoices')}>
                            <div className='flex items-center justify-between gap-[10px] ' >
                                <div className='flex item-center gap-[10px]'>
                                    <Image src={category} height={20} width={20} />
                                    <div>
                                    <div > {/* <span className='bg-black w-[7px] h-[7px] rounded-full'></span> */}
                                    <span  className='text-[15px] hover:text-[#FCF8EE]'>Invoices</span></div>
                                </div>
                                </div>
                                <div className='flex flex-col space-y-1 py-2'>
                            </div>
                            </div>
                        </li>
                        <li className={`leftMenuHover p-[10px] rounded-[8px] cursor-pointer`} onClick={handleLogout}>
                            <div className='flex items-center justify-between gap-[10px] ' >
                                <div className='flex item-center gap-[10px]'>
                                    <Image src={category} height={20} width={20} />
                                    <div>
                                    <div > {/* <span className='bg-black w-[7px] h-[7px] rounded-full'></span> */}
                                    <span  className='text-[15px] hover:text-[#FCF8EE]'>logout</span></div>
                                </div>
                                </div>
                                <div className='flex flex-col space-y-1 py-2'>
                            </div>
                            </div>
                        </li>
                        {/* {isCategoryOpen && (
                            <div className='flex flex-col space-y-1 py-2'>
                                <div className={`flex items-center hover:bg-[#cfaa4c]/60 hover:text-[#fff] rounded-[8px] gap-[20px] cursor-pointer p-[10px] ${activeComponent === 'category'? 'activeLeftMenu': ''}`} onClick={() => handleMenuItemClick('category')}>
                                    <span className='bg-black w-[7px] h-[7px] rounded-full'></span>
                                    <span className='text-[15px] hover:text-[#FCF8EE]'>Categories</span>
                                </div>
                                
                            </div>
                        )} */}
                        {/* <li className='hover:bg-[#cfaa4c]/60 hover:text-[#fff] p-[10px] rounded-[8px] cursor-pointer' onClick={toggleProductDropdown}>
                            <div className='flex items-center justify-between gap-[10px]' >
                                <div className='flex item-center gap-[10px]'>
                                    <Image src={product} height={20} width={20} />
                                    Product Setup
                                </div>
                                {isProductOpen ? <FaAngleUp /> : <FaAngleDown />}
                            </div>
                        </li>
                        {isProductOpen && (
                            <div className='flex flex-col space-y-1 py-2'>
                                <div className={`flex items-center hover:bg-[#cfaa4c]/60 hover:text-[#fff] rounded-[8px] gap-[20px] cursor-pointer p-[10px] ${activeComponent === 'productattribute'? 'activeLeftMenu': ''}`} onClick={() => handleMenuItemClick('productattribute')}>
                                    <span className='bg-black w-[7px] h-[7px] rounded-full'></span>
                                    <span className='text-[15px] hover:text-[#FCF8EE]'>Product Attribute</span>
                                </div>
                                <div className={`flex items-center hover:bg-[#cfaa4c]/60 hover:text-[#fff] rounded-[8px] gap-[20px] cursor-pointer p-[10px] ${activeComponent === 'productlist'? 'activeLeftMenu': ''}`} onClick={() => handleMenuItemClick('productlist')}>
                                    <span className='bg-black w-[7px] h-[7px] rounded-full'></span>
                                    <span className='text-[15px] hover:text-[#FCF8EE]'>Product List</span>
                                </div>
                                <div className={`flex items-center hover:bg-[#cfaa4c]/60 hover:text-[#fff] rounded-[8px] gap-[20px] cursor-pointer p-[10px] ${activeComponent === 'bulkimport'? 'activeLeftMenu': ''}`} onClick={() => handleMenuItemClick('bulkimport')}>
                                    <span className='bg-black w-[7px] h-[7px] rounded-full'></span>
                                    <span className='text-[15px] hover:text-[#FCF8EE]'>Bulk Import</span>
                                </div>
                                <div className={`flex items-center hover:bg-[#cfaa4c]/60 hover:text-[#fff] rounded-[8px] gap-[20px] cursor-pointer p-[10px] ${activeComponent === 'carlist'? 'activeLeftMenu': ''}`} onClick={() => handleMenuItemClick('carlist')}>
                                    <span className='bg-black w-[7px] h-[7px] rounded-full'></span>
                                    <span className='text-[15px] hover:text-[#FCF8EE]'>Car List</span>
                                </div>
                            </div>
                        )} */}
                    </div>
                    {/* <div className='flex flex-col spac-y-2'>
                        <span className='text-[12px] text-[#7D672E]'>Sign In</span>
                        <li className={`leftMenuHover p-[10px] rounded-[8px] cursor-pointer ${activeComponent === 'login'? 'activeLeftMenu': ''}`} onClick={() =>  router.push('/login')}>
                            <div className='flex items-center justify-between gap-[10px] ' >
                                <div className='flex item-center gap-[10px]'>
                                    <Image src={category} height={20} width={20} />
                                    <div>
                                    <div > 
                                    <span  className='text-[15px] hover:text-[#FCF8EE]'>Login</span></div>
                                </div>
                                </div>
                                <div className='flex flex-col space-y-1 py-2'>
                            </div>
                            </div>
                        </li>
                       
                       
                       
                       
                       
                    
                     
                        
                    
                         
                    </div> */}
                </ul>


                <div className=' border-t border-slate-300'>
                    <div className='flex space-x-3 justify-between items-center py-2'>
                        <div className='rounded-full'>
                            <Image src={logo} height={50} width={50} />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <span className='text-black '>Mykanjee</span>
                            <span className='text-slate-400'>mykanjee@gmail.com</span>
                        </div>
                        <MdLogout className='text-black text-[25px]' />
                    </div>
                </div>
            </div>

            {/* -------------------------- Right side screens ------------------------------- */}
            {activeComponent === 'dashboard' && <Dashboard />}

            {activeComponent === 'category' && <Category />}

            {activeComponent === 'userList' && <UserList />}

            {activeComponent === 'sellerList' && <SellerList />}

            {activeComponent === 'driverList' && <DriverList />}

            {activeComponent === 'productList' && <ProductList />}

            {activeComponent === 'orderList' && < OrderList />}

            {activeComponent === 'vendorDetails' && < VendorDetails />}

            {activeComponent === 'vendorQuotes' && < VendorQuotes />}

            {activeComponent === 'transectiion' && < Transection />}

            {activeComponent === 'feedback' && < Feedback />}

            {activeComponent === 'invoices' && < Invoices />}

            {/* {activeComponent === 'login' && < Page />} */}

            {/* {activeComponent === 'supersubcategory' && <SuperSubCategory />}

            {activeComponent === 'productattribute' && <ProductAttribute />}

            {activeComponent === 'productlist' && <ProductList />}

            {activeComponent === 'bulkimport' && <BulkImport />}

            {activeComponent === 'carlist' && <CarList />} */}

        </div>
    )
}

export default Sidebar