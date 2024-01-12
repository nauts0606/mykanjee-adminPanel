import React, { useRef, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FaRegTrashAlt, FaTimes } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Switch from '@mui/material/Switch';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Pagination } from '@mui/material';
import Image from 'next/image';
import Swal from 'sweetalert2'
import { MdAdd } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";



const ProductList = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };


  const [categoryData, setCategoryData] = useState([
    { id: 1, col1: 'Attribute 1', col2: 'Data 1', category_name: 'Exterior', col4: 'Data 3', col5: 'Data 4', status: 0, col7: 'Data 6' },
    { id: 2, col1: 'Attribute 2', col2: 'Data 1', category_name: 'Interior', col4: 'Data 3', col5: 'Data 4', status: 1, col7: 'Data 6' },
    { id: 3, col1: 'Attribute 3 asdasda sda dadaa sd', col2: 'Data 1', category_name: 'Shop By Car', col4: 'Data 3', col5: 'Data 4', status: 0, col7: 'Data 6' },
    { id: 4, col1: 'Attribute 4', col2: 'Data 1', category_name: 'Alloy Wheels', col4: 'Data 3', col5: 'Data 4', status: 0, col7: 'Data 6' },
    { id: 5, col1: 'Attribute 5', col2: 'Data 1', category_name: 'Lights', col4: 'Data 3', col5: 'Data 4', status: 1, col7: 'Data 6' },
    { id: 6, col1: 'Attribute 6', col2: 'Data 1', category_name: 'Air freshener', col4: 'Data 3', col5: 'Data 4', status: 1, col7: 'Data 6' }
  ]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const totalRows = categoryData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredRows = categoryData.filter((e) =>
    e.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedRows = filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleSwitchChange = (id) => {
    const updatedRows = categoryData.map((e) =>
      e.id === id ? { ...e, status: e.status === 0 ? 1 : 0 } : e
    );

    setCategoryData(updatedRows)
  };

  const deleteCategory = (data) => {
    Swal.fire({
      title: "Delete",
      text: `Do you want to Delete this ${data.col1}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CFAA4C",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes! Delete it"
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedRows = categoryData.filter((row) => row.id !== data.id);
        setCategoryData(updatedRows);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  const [isClickedAddProduct, setIsClickedAddProduct] = useState(false)
  const handleAddNewProduct = () => {
    setIsClickedAddProduct(true)
  }

  const handleBack = () => {
    setIsClickedAddProduct(false)
  }

  const fileInputRef = useRef(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        setUploadedImages((prevImages) => [...prevImages, e.target.result]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };
  return (
    <>
      <div className='px-[20px] py-[10px] space-y-5 container mx-auto w-[100%] overflow-y-scroll'>
        {!isClickedAddProduct ?
          <>

            <div className=' py-[10px] flex flex-col space-y-5'>
              <div className='flex flex-col space-y-1'>
                <span className='text-[30px] text-[#101828] font-[500]'>Product List</span>
                <span className='text-[#667085] font-[400] text-[16px]'>Simplify product management and presentation with Product Setup, ensuring a streamlined and visually compelling e-commerce storefront.</span>
              </div>
            </div>
            <div className='flex items-center justify-between gap-[10px]'>
              <div className='flex flex-col space-y-1 w-full'>
                <span className='text-[14px] font-[500] text-[#344054]'>Search by category</span>
                <input type='text' placeholder='Exterior' className='inputText' />
              </div>
              <div className='flex flex-col space-y-1 w-full'>
                <span className='text-[14px] font-[500] text-[#344054]'>Search by sub category</span>
                <input type='text' placeholder='Exterior' className='inputText' />
              </div>
              <div className='flex flex-col space-y-1 w-full'>
                <span className='text-[14px] font-[500] text-[#344054]'>Search by super sub category</span>
                <input type='text' placeholder='Exterior' className='inputText' />
              </div>
              <div className='flex flex-col space-y-1 w-full'>
                <span className='text-[14px] font-[500] text-[#344054]'>Search by Brand</span>
                <input type='text' placeholder='Exterior' className='inputText' />
              </div>
            </div>

            <div className='flex flex-col space-y-5  border border-[#EAECF0] rounded-[8px] p-[10px]'>
              <div className='flex items-center px-3 justify-between'>
                <div className='flex space-x-2 items-center'>
                  <span className='text-[18px] font-[500] text-[#101828]'>Product List</span>
                  <span className='px-[10px] py-[5px] bg-[#FCF8EE] rounded-[16px] text-[12px] text-[#A1853C]'>{categoryData.length} Products</span>
                </div>
                <div className='flex items-center space-x-3 inputText w-[50%]'>
                  <IoSearch className='text-[20px]' />
                  <input
                    type='text'
                    className='outline-none focus-none'
                    placeholder='Search By Product'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className='flex space-x-2'>
                  <div className='px-[16px] py-[10px] gap-[5px] flex items-center rounded-[8px] border border-[#D0D5DD] cursor-pointer '>
                    <MdOutlineFileDownload className='text-[20px] font-[600]' />
                    <span className=' text-[14px] font-[600]'>Export</span>
                  </div>
                  <div className='flex items-center gap-[5px] px-[18px] py-[10px] bg-[#cfaa4c] rounded-[8px] cursor-pointer hover:opacity-70' onClick={handleAddNewProduct}>
                    <MdAdd className='text-[#fff] text-[20px] font-[600]' />
                    <span className=' text-[14px] text-[#fff] font-[600]'>Add New Product</span>
                  </div>
                </div>
              </div>

              {/* Table content here */}
              <Paper >
                <TableContainer component={Paper} sx={{ height: '100%', width: '100%' }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow className='!bg-[#F9FAFB]'>
                        {/* Define your table header columns */}
                        <TableCell style={{ minWidth: 100 }}>SL no</TableCell>
                        <TableCell style={{ minWidth: 200 }}>Car Brand</TableCell>
                        <TableCell style={{ minWidth: 150 }}>Product Image</TableCell>
                        <TableCell style={{ minWidth: 300 }}>Product Name</TableCell>
                        <TableCell style={{ minWidth: 300 }}>Category Name</TableCell>
                        <TableCell style={{ minWidth: 150 }}>Stock</TableCell>
                        <TableCell style={{ minWidth: 150 }}>Status</TableCell>
                        <TableCell style={{ minWidth: 150 }}>Change Status</TableCell>
                        <TableCell style={{ minWidth: 50 }}>Delete</TableCell>
                        <TableCell style={{ minWidth: 50 }}>Edit</TableCell>
                      </TableRow>
                    </TableHead>
                    {filteredRows.length > 0 ?
                      <TableBody>
                        {paginatedRows.map((row) => (
                          <TableRow key={row.id} >
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.col1}</TableCell>
                            <TableCell>
                              <Image src="/images/categoryimage.svg" width={40} height={30} alt='categroy' className='rounded-[8px]' />
                            </TableCell>
                            <TableCell>{row.col1}</TableCell>
                            <TableCell>{row.col1}</TableCell>
                            <TableCell>{row.col1}</TableCell>
                            <TableCell >
                              {row.status === 1 ?
                                <div className='flex items-center gap-[5px] py-[5px] bg-[#ECFDF3] rounded-[16px] justify-center'>
                                  <Image src="/images/active.svg" height={10} width={10} alt='active' />
                                  <span className='text-[#027A48] text-[12px] font-[500]'>Active</span>
                                </div> :
                                <div className='flex items-center gap-[5px] py-[5px] bg-red-200 rounded-[16px] justify-center'>
                                  <Image src="/images/inactive.svg" height={10} width={10} alt='active' />
                                  <span className='text-red-500 text-[12px] font-[500]'>Inactive</span>
                                </div>
                              }
                            </TableCell>
                            <TableCell>
                              <Switch
                                checked={row.status === 1}
                                onChange={() => handleSwitchChange(row.id)}
                                inputProps={{ 'aria-label': 'controlled' }}
                                sx={{
                                  '& .MuiSwitch-thumb': {
                                    backgroundColor: row.status === 1 ? '#CFAA4C' : '',
                                  },
                                  '& .Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: '#CFAA4C',
                                  },
                                }}
                              />
                            </TableCell>
                            <TableCell ><FaRegTrashAlt className='cursor-pointer' onClick={() => deleteCategory(row)} /></TableCell>
                            <TableCell><FaEdit className='cursor-pointer' onClick={() => handleEdit(row)} /></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      :
                      <TableRow>
                        <TableCell colSpan={7} className='text-center text-[15px] font-bold'>No product found</TableCell>
                      </TableRow>
                    }
                  </Table>
                </TableContainer>
              </Paper>

              {filteredRows.length > rowsPerPage && (
                <div className='flex justify-center mt-3'>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChangePage}
                    shape="rounded"
                  />
                </div>
              )}
            </div>
          </>
          :
          <>
            <div className=' py-[10px] flex flex-col space-y-5'>
              <div className='flex flex-col space-y-1'>
                <span className='text-[30px] text-[#101828] font-[500]'>Add New Product</span>
                <span className='text-[#667085] font-[400] text-[16px]'>Introduce new items effortlessly with the Add New Product feature in the admin application for a dynamic and up-to-date online store.</span>
              </div>
            </div>

            <div className='flex items-center justify-between gap-[30px]'>
              <div className='flex flex-col space-y-3 border border-[#D0D5DD] rounded-[16px] p-[16px] w-[100%]'>
                <span className='text-[18px] font-[600]'>Add New Product</span>
                <div className='flex flex-col space-y-1'>
                  <span className='text-[14px] text-[#344054] font-[500]'>Product Name</span>
                  <input type='text' className='outline-none focus-none inputText !text-[14px]' placeholder='Add new product name' />
                </div>
                <div className='flex flex-col space-y-1'>
                  <span className='text-[14px] text-[#344054] font-[500]'>Description</span>
                  <textarea className='outline-none focus-none inputText !text-[14px] h-[120px]' placeholder='Add product description' />
                </div>
                <div className='flex flex-col space-y-1'>
                  <span className='text-[14px] text-[#344054] font-[500]'>Brand Name</span>
                  <input type='text' className='outline-none focus-none inputText !text-[14px]' placeholder='Add product brand name' />
                </div>
              </div>
              <div className='flex flex-col border space-y-3 border-[#D0D5DD] rounded-[16px] p-[16px] w-[100%]'>
                <span className='text-[18px] font-[600]'>Category</span>
                <div className='flex flex-col space-y-1'>
                  <span className='text-[14px] text-[#344054] font-[500]'>Select Main Category</span>
                  <select className='!text-[14px]'>
                    <option>Choose Category</option>
                    <option>Select Category1</option>
                    <option>Select Category2</option>
                  </select>
                </div>
                <div className='flex flex-col space-y-1'>
                  <span className='text-[14px] text-[#344054] font-[500]'>Select Sub Category</span>
                  <select className='!text-[14px]'>
                    <option>Choose Sub Category</option>
                    <option>Select Category1</option>
                    <option>Select Category2</option>
                  </select>
                </div>
                <div className='flex flex-col space-y-1'>
                  <span className='text-[14px] text-[#344054] font-[500]'>Select Super Sub Category</span>
                  <select className='!text-[14px]'>
                    <option>Choose Super Sub Category</option>
                    <option>Select Category1</option>
                    <option>Select Category2</option>
                  </select>
                </div>
                <div className='flex flex-col space-y-1'>
                  <span className='text-[14px] text-[#344054] font-[500]'>Maximum Order Quantity</span>
                  <input type='text' className='outline-none focus-none inputText !text-[14px]' placeholder='Ex: 05' />
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between gap-[30px]'>
              <div className='flex flex-col space-y-3 border border-[#D0D5DD] rounded-[16px] p-[16px] w-[100%]'>
                <span className='text-[18px] font-[600]'>Product Image</span>
                <div className="flex flex-col items-center justify-center text-[16px]">
                  <div className="flex flex-col space-y-1 items-center border border-dashed border-gray-400 p-[10px] rounded-lg text-center w-full">
                    <div className="text-[40px]">
                      <FaCloudUploadAlt />
                    </div>
                    <header className="text-[10px] font-semibold">Drag & Drop to Upload File</header>
                    <span className="mt-2 text-[10px] font-bold">OR</span>
                    <button
                      className=" text-[12px] text-[#A1853C] font-[600] rounded hover:text-[#A1853C]/60 transition duration-300"
                      onClick={handleButtonClick}
                    >
                      Click to Upload
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                      multiple
                    />
                  </div>
                  <div className="flex flex-wrap items-center mt-3">
                    {uploadedImages.map((imageDataUrl, index) => (
                      <div key={index} className="p-2 relative">
                        <img src={imageDataUrl} alt={`Uploaded ${index + 1}`} className="max-w-[80px] max-h-[80px]" />
                        <button
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          onClick={() => handleImageRemove(index)}
                        >
                          <FaTimes className='text-[10px]'/>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex flex-col space-y-3 border border-[#D0D5DD] rounded-[16px] p-[16px] w-[100%]'>
                <span className='text-[18px] font-[600]'>Price Info</span>
                <div className='flex items-center justify-between gap-[10px]'>
                  <div className='flex flex-col space-y-1 w-full'>
                    <span className='text-[14px] text-[#344054] font-[500]'>Default Unit Price</span>
                    <input type='text' className='outline-none focus-none inputText !text-[14px]' placeholder='Price of product (in rupees)' />
                  </div>
                  <div className='flex flex-col space-y-1 w-full'>
                    <span className='text-[14px] text-[#344054] font-[500]'>Product Stock</span>
                    <input type='text' className='outline-none focus-none inputText !text-[14px]' placeholder='stock' />
                  </div>
                </div>
                <div className='flex items-center justify-between gap-[10px]'>
                  <div className='flex flex-col space-y-1 w-full'>
                    <span className='text-[14px] text-[#344054] font-[500]'>Discount Type</span>
                    {/* <input type='text' className='outline-none focus-none inputText !text-[14px]' placeholder='Add new product name' /> */}
                    <select className='!text-[14px] outline-none focus-none'>
                      <option>Select Discount Type</option>
                      <option>Percent</option>
                      <option>Amount</option>
                    </select>
                  </div>
                  <div className='flex flex-col space-y-1 w-full'>
                    <span className='text-[14px] text-[#344054] font-[500]'>Discount</span>
                    <input type='text' className='outline-none focus-none inputText !text-[14px]' placeholder='0' />
                  </div>
                </div>
                <div className='flex items-center justify-between gap-[10px]'>
                  <div className='flex flex-col space-y-1 w-full'>
                    <span className='text-[14px] text-[#344054] font-[500]'>Tax Type</span>
                    {/* <input type='text' className='outline-none focus-none inputText !text-[14px]' placeholder='Add new product name' /> */}
                    <select className='!text-[14px] outline-none focus-none'>
                      <option>Select Discount Type</option>
                      <option>Percent</option>
                      <option>Amount</option>
                    </select>
                  </div>
                  <div className='flex flex-col space-y-1 w-full'>
                    <span className='text-[14px] text-[#344054] font-[500]'>Tax rate</span>
                    <input type='text' className='outline-none focus-none inputText !text-[14px]' placeholder='0' />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between gap-[30px]'>
              <div className='flex flex-col space-y-3 border border-[#D0D5DD] rounded-[16px] p-[16px] w-[100%]'>
                <span className='text-[18px] font-[600]'>Product Brand Info</span>
                <div className='flex flex-col space-y-1 w-full'>
                  <span className='text-[14px] text-[#344054] font-[500]'>Product Type</span>
                  <select className='!text-[14px] outline-none focus-none'>
                    <option>Select Product Type</option>
                    <option>Vehicle Selection</option>
                    <option>General</option>
                  </select>

                  <div className='flex items-end gap-[10px]'>
                    <div className='flex flex-col space-y-1 w-full'>
                      <span className='text-[14px] text-[#344054] font-[500]'>Product Type</span>
                      <select className='!text-[14px] outline-none focus-none w-[100%]'>
                        <option>Select Brand Here</option>
                        <option>Audi</option>
                        <option>BMW</option>
                      </select>
                    </div>
                    <Image src="/images/categoryimage.svg" width={70} height={50} className='rounded-[8px]' />
                  </div>
                  <div className='flex flex-col space-y-1 w-full'>
                    <span className='text-[14px] text-[#344054] font-[500]'>Car Model</span>
                    <select className='!text-[14px] outline-none focus-none w-[100%]'>
                      <option>Select Car Model Here</option>
                      <option>Audi</option>
                      <option>BMW</option>
                    </select>
                  </div>
                  <div className='flex items-end gap-[10px]'>
                    <div className='flex flex-col space-y-1 w-full'>
                      <span className='text-[14px] text-[#344054] font-[500]'>Start Year</span>
                      <select className='!text-[14px] outline-none focus-none w-[100%]'>
                        <option>Select Brand Here</option>
                        <option>Audi</option>
                        <option>BMW</option>
                      </select>
                    </div>
                    <div className='flex flex-col space-y-1 w-full'>
                      <span className='text-[14px] text-[#344054] font-[500]'>Last Year</span>
                      <select className='!text-[14px] outline-none focus-none w-[100%]'>
                        <option>Select Brand Here</option>
                        <option>Audi</option>
                        <option>BMW</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col space-y-3 border border-[#D0D5DD] rounded-[16px] p-[16px] w-[100%]'>
                <span className='text-[18px] font-[600]'>Exchange Policy</span>
                <div className='flex flex-col space-y-1'>
                  <span className='text-[14px] text-[#344054] font-[500]'>Description</span>
                  <textarea className='outline-none focus-none inputText !text-[14px] h-[190px]' placeholder='Add product description' />
                </div>
                <div className='flex items-center gap-[20px] justify-between'>
                  <span className='px-[18px] py-[10px] rounded-[8px] border border-[#D0D5DD] w-full text-center text-[16px] font-[600] bg-[#fff] cursor-pointer'>No</span>
                  <span className='px-[18px] py-[10px] rounded-[8px] text-[#fff] w-full text-center text-[16px] font-[600] bg-[#CFAA4C] hover:opacity-80 cursor-pointer'>Yes, there is</span>
                </div>
              </div>
            </div>

            <div className='flex items-end justify-between gap-[30px]'>
              <div className='flex flex-col space-y-3 border border-[#D0D5DD] rounded-[16px] p-[16px] w-[100%]'>
                <span className='text-[18px] font-[600]'>Net Quantity and warranty info</span>
                <div className='flex flex-col space-y-1'>
                  <span className='text-[14px] text-[#344054] font-[500]'>Net Quantity</span>
                  <input type='text' className='outline-none focus-none inputText !text-[14px]' placeholder='06' />
                </div>
                <div className='flex items-end gap-[10px]'>
                  <div className='flex flex-col space-y-1'>
                    <span className='text-[14px] text-[#344054] font-[500]'>Net Quantity</span>
                    <input type='text' className='outline-none focus-none inputText !text-[14px]' placeholder='06' />
                  </div>
                  <div className='flex items-center gap-[20px] justify-between w-full'>
                    <span className='px-[10px] py-[10px] rounded-[8px] border border-[#D0D5DD] w-full text-center text-[16px] font-[600] bg-[#fff] cursor-pointer'>No</span>
                    <span className='px-[10px] py-[10px] rounded-[8px] text-[#fff] w-full text-center text-[16px] font-[600] bg-[#CFAA4C] hover:opacity-80 cursor-pointer'>Yes, there is</span>
                  </div>
                </div>
              </div>
              <div className='flex flex-col space-y-3 border border-[#D0D5DD] rounded-[16px] p-[16px] w-[100%]'>
                <span className='text-[18px] font-[600]'>Exchange Policy</span>
                <div className='flex flex-col space-y-1'>
                  <span className='text-[14px] text-[#344054] font-[500]'>Description</span>
                  <textarea className='outline-none focus-none inputText !text-[14px] h-[190px]' placeholder='Add product description' />
                </div>
                <div className='flex items-center gap-[20px] justify-between'>
                  <span className='px-[18px] py-[10px] rounded-[8px] border border-[#D0D5DD] w-full text-center text-[16px] font-[600] bg-[#fff] cursor-pointer'>No</span>
                  <span className='px-[18px] py-[10px] rounded-[8px] text-[#fff] w-full text-center text-[16px] font-[600] bg-[#CFAA4C] hover:opacity-80 cursor-pointer'>Yes, there is</span>
                </div>
              </div>
            </div>

            <div className='flex flex-col space-y-3 border border-[#D0D5DD] rounded-[16px] p-[16px] w-[100%]'>
              <span className='text-[18px] font-[600]'>Attribute</span>
              <div className='flex flex-col space-y-1 w-full'>
                <span className='text-[14px] text-[#344054] font-[500]'>Attribute</span>
                <select className='!text-[14px] outline-none focus-none w-[100%]'>
                  <option>Select Attribute</option>
                  <option>Audi</option>
                  <option>BMW</option>
                </select>
              </div>
            </div>


            <div className='flex items-center gap-[30px] justify-end'>
              <span className='px-[38px] py-[10px] rounded-[8px] border border-[#D0D5DD] text-[16px] text-[#344054] font-[600] cursor-pointer' onClick={handleBack}>Reset</span>
              <span className='px-[38px] py-[10px] rounded-[8px] text-[16px] text-[#fff] font-[600] bg-[#CFAA4C] hover:opacity-80 cursor-pointer'>Submit</span>
            </div>

          </>
        }
      </div>
    </>
  )
}

export default ProductList