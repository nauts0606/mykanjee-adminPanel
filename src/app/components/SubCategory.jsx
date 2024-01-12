import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Switch from '@mui/material/Switch';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Pagination } from '@mui/material';
import Image from 'next/image';
import Swal from 'sweetalert2'

const SubCategory = () => {
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
    { id: 1, col1: 'Row 1', col2: 'Data 1', category_name: 'Exterior', col4: 'Data 3', col5: 'Data 4', status: 0, col7: 'Data 6' },
    { id: 2, col1: 'Row 2', col2: 'Data 1', category_name: 'Interior', col4: 'Data 3', col5: 'Data 4', status: 1, col7: 'Data 6' },
    { id: 3, col1: 'Row 3', col2: 'Data 1', category_name: 'Shop By Car', col4: 'Data 3', col5: 'Data 4', status: 0, col7: 'Data 6' },
    { id: 4, col1: 'Row 4', col2: 'Data 1', category_name: 'Alloy Wheels', col4: 'Data 3', col5: 'Data 4', status: 0, col7: 'Data 6' },
    { id: 5, col1: 'Row 5', col2: 'Data 1', category_name: 'Lights', col4: 'Data 3', col5: 'Data 4', status: 1, col7: 'Data 6' },
    { id: 6, col1: 'Row 6', col2: 'Data 1', category_name: 'Air freshener', col4: 'Data 3', col5: 'Data 4', status: 1, col7: 'Data 6' }
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
      text: `Do you want to Delete this ${data.category_name}?`,
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

  const [isEditable, setIsEditable] = useState(false)
  const [editData, setEditData] = useState({})
  const handleEdit = (data) => {
    setEditData(data)
    setIsEditable(true)
  }

  const returnMain = () => {
    setIsEditable(false)
    setEditData({})
  }
  return (
    <>
      <div className='px-[20px]  container mx-auto w-[100%] overflow-hidden'>
        {!isEditable ?
          <div className=' py-[10px] flex flex-col space-y-5'>
            <div className='flex flex-col space-y-1'>
              <span className='text-[30px] text-[#101828] font-[500]'>Sub Category Setup</span>
              <span className='text-[#667085] font-[400] text-[16px]'>Effortlessly organize your product offerings with intuitive Category Setup for a seamless and structured e-commerce experience.</span>
            </div>

            <div className='flex items-center justify-between gap-[10px]'>
              <div className='flex flex-col space-y-1 w-full'>
                <span>Select Category Name *</span>
                <select>
                  <option>Choose Category</option>
                  <option>Alloy Wheels</option>
                  <option>Exterior</option>
                  <option>Interior</option>
                </select>
              </div>
              <div className='flex flex-col space-y-1 w-full'>
                <span>Sub Category Name *</span>
                <input type='text' placeholder='Horn' className='inputText' />
              </div>
              <div className='flex flex-col space-y-1 w-full'>
                <span>Sub Category Image *</span>
                <input type='file' accept='image/*' onChange={handleImageChange} />
              </div>

              {image && (
                <div className="relative bg-[#D8C7B6] rounded-[8px]">
                  <img src={image} alt='Uploaded Preview' width='200' className='rounded-[8px]' />
                  <span onClick={handleRemoveImage} className="absolute top-[-15px] right-0 bg-transparent text-black cursor-pointer">
                    <IoClose />
                  </span>
                </div>
              )}
            </div>

            <div className='flex items-center gap-[24px] justify-end'>
              <span className='resetButton'>Reset</span>
              <span className='submitButton'>Submit</span>
            </div>

            <div className='flex flex-col space-y-1 border border-[#EAECF0] rounded-[8px] p-[10px]'>
              <div className='flex items-center justify-between'>
                <div className='flex space-x-2 items-center'>
                  <span className='text-[18px] font-[500] text-[#101828]'>Sub Category Table</span>
                  <span className='px-[10px] py-[5px] bg-[#FCF8EE] rounded-[16px] text-[12px] text-[#A1853C]'>{categoryData.length} Sub Category</span>
                </div>
                <div className='flex items-center space-x-3 inputText'>
                  <IoSearch className='text-[20px]' />
                  <input
                    type='text'
                    className='outline-none focus-none'
                    placeholder='Search here'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Table content here */}
              {/* <div style={{ height: '400px', overflowY: 'auto' }}>  */}
                <TableContainer >
                  <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 400 }}>
                    <TableHead>
                      <TableRow className='!bg-[#F9FAFB]'>
                        {/* Define your table header columns */}
                        <TableCell style={{ minWidth: 80 }}>SL no</TableCell>
                        <TableCell style={{ minWidth: 150 }}>Category image</TableCell>
                        <TableCell style={{ minWidth: 200 }}>Category Name</TableCell>
                        <TableCell style={{ minWidth: 200 }}>Sub Category image</TableCell>
                        <TableCell style={{ minWidth: 200 }}>Sub Category Name</TableCell>
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
                            <TableCell>
                              <Image src="/images/categoryimage.svg" width={30} height={30} alt='categroy' className='rounded-[8px]' />
                            </TableCell>
                            <TableCell>{row.category_name}</TableCell>
                            <TableCell>
                              <Image src="/images/categoryimage.svg" width={30} height={30} alt='categroy' className='rounded-[8px]' />
                            </TableCell>
                            <TableCell>{row.category_name}</TableCell>
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
              {/* </div> */}
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
          </div>
          :

          <div className=' py-[10px] flex flex-col space-y-5'>
            <div className='flex flex-col space-y-1'>
              <span className='text-[30px] text-[#101828] font-[500]'>Category Setup</span>
              <span className='text-[#667085] font-[400] text-[16px]'>Effortlessly organize your product offerings with intuitive Category Setup for a seamless and structured e-commerce experience.</span>
            </div>
            <div className='flex items-center justify-between gap-[10px]'>
              <div className='flex flex-col space-y-1 w-full'>
                <span>Select Category Name *</span>
                <select>
                  <option>Choose Category</option>
                  <option>Alloy Wheels</option>
                  <option>Exterior</option>
                  <option>Interior</option>
                </select>
              </div>
              <div className='flex flex-col space-y-1 w-full'>
                <span>Sub Category Name *</span>
                <input type='text' placeholder='Horn' className='inputText' />
              </div>
              <div className='flex flex-col space-y-1 w-full'>
                <span>Sub Category Image *</span>
                <input type='file' accept='image/*' onChange={handleImageChange} />
              </div>
            </div>

            <div className='flex items-center gap-[24px] justify-end'>
              <span className='resetButton' onClick={returnMain}>Back</span>
              <span className='submitButton'>Update</span>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default SubCategory