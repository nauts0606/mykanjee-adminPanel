import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Switch from '@mui/material/Switch';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Pagination } from '@mui/material';
import Image from 'next/image';
import Swal from 'sweetalert2'
import { MdAdd } from "react-icons/md";

const ProductAttribute = () => {

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
    { id: 3, col1: 'Attribute 3', col2: 'Data 1', category_name: 'Shop By Car', col4: 'Data 3', col5: 'Data 4', status: 0, col7: 'Data 6' },
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
      <div className='px-[20px]  container mx-auto'>
        <div className=' py-[10px] flex flex-col space-y-5'>
          <div className='flex flex-col space-y-1'>
            <span className='text-[30px] text-[#101828] font-[500]'>Product Attribute</span>
            <span className='text-[#667085] font-[400] text-[16px]'>Simplify Management, Streamline Operations Unleash Efficiency in Admin Applications.</span>
          </div>

          <div className='flex flex-col space-y-5  border border-[#EAECF0] rounded-[8px] p-[10px]'>
            <div className='flex items-center px-3 justify-between'>
              <div className='flex space-x-2 items-center'>
                <span className='text-[18px] font-[500] text-[#101828]'>Product Attibute</span>
                <span className='px-[10px] py-[5px] bg-[#FCF8EE] rounded-[16px] text-[12px] text-[#A1853C]'>{categoryData.length} Attribute</span>
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

              <div className='flex items-center gap-[5px] px-[18px] py-[10px] bg-[#cfaa4c] rounded-[8px] cursor-pointer hover:opacity-70'>
                <MdAdd className='text-[#fff] text-[16px] font-[600]'/>
                <span className=' text-[16px] text-[#fff] font-[600]'>Add Attribute</span>
              </div>
            </div>

            {/* Table content here */}
            <Paper >
              <TableContainer component={Paper} sx={{ height: '100%', width: '100%' }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow className='!bg-[#F9FAFB]'>
                      {/* Define your table header columns */}
                      <TableCell style={{ minWidth: 50 }}>SL no</TableCell>
                      <TableCell style={{ minWidth: 150 }}>Product Attibute Name</TableCell>
                      <TableCell style={{ minWidth: 50}}>Status</TableCell>
                      <TableCell style={{ minWidth: 50 }}>Change Status</TableCell>
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
                            {row.col1}
                          </TableCell>
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
        </div>


      </div>
    </>
  )
}

export default ProductAttribute