import React, { useCallback, useEffect, useState , useRef } from 'react'
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Switch from '@mui/material/Switch';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Pagination } from '@mui/material';
import Image from 'next/image';
import Swal from 'sweetalert2'
import { useSnackbar } from '../SnackbarProvider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';

import  axios  from "axios";
import { useFormik } from 'formik';
import * as Yup from 'yup';

// const validationSchema = Yup.object({
//   categoryName: Yup.string().required('VendorDetails Name is required'),
//   category_no: Yup.number().required('VendorDetails No is required'),
//    image: Yup.mixed().required('Image is required'),
// });

const VendorDetails = () => {

  const  {openSnackbar}  = useSnackbar()

    const [inputValue, setInputValue] = useState('');
    const [valToggle, setValToggle] = useState(false);
    const [idCloseDialogue, setIdCloseDialogue] = useState("");
    const [valCloseDialogue, setValCloseDialogue] = useState("");
    const [vendorData, setVendorData] = useState([])
    const [dialogData, setDialogData] = useState({})
  // const [openDialogue, setOpenDialogue] = useState(false)
  




  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const totalRows = vendorData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const filteredRows = vendorData.filter((e) =>
    e?.vendorRegisterFirstName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );



    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');
  
    const handleClickOpen = (scrollType) => () => {
      setOpen(true);
      setScroll(scrollType);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const descriptionElementRef = useRef(null);
    useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);
  
    

    const handleUpdate = async (value, id) => {
        await axios.put("http://localhost:3000/auth/vendor/register/admin-update", {approve:value, vendorId:id}, { headers  : {
                // 'Content-Type': 'multipart/form-data', // Adjust the content type based on your API requirements
              'authorization':  localStorage.getItem('logintoken'), // Add any authentication headers if needed
            }})
              .then(response => {
                // Handle success
                  console.log('Response:', response);
            
                getVendorApi()
                
              openSnackbar("Status changed successfully", "success")
              })  
              .catch(error => {
                // Handle error
                console.error('Error:', error);
              });
         
    }
    

    const cancelFunction = async () => {
      await  handleApprove(true, idCloseDialogue)
        handleOpen()
        getVendorApi()
    }

    const handleApprove = async (value, id) => {
       setIdCloseDialogue(id)
      setValCloseDialogue(value)
      
        if (value == false) {
            handleOpen()
        } 
        await axios.put("http://localhost:3000/auth/approve-seller", {approve:value, userId:id}, { headers  : {
                // 'Content-Type': 'multipart/form-data', // Adjust the content type based on your API requirements
              'authorization':  localStorage.getItem('logintoken'), // Add any authentication headers if needed
            }})
              .then(response => {
                // Handle success
                // console.log('Response:', response);
                getVendorApi()

              openSnackbar("Status changed successfully", "success")
              })  
              .catch(error => {
                // Handle error
                console.error('Error:', error);
              });
         
    }
      

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };
    
    
    const handleFalse = async () => {
      
        
        await axios.post("http://localhost:3000/auth/dissa/reason-seller", {reason : inputValue , userId:idCloseDialogue} , { headers  : {
            // 'Content-Type': 'multipart/form-data', // Adjust the content type based on your API requirements
          'authorization':  localStorage.getItem('logintoken'), // Add any authentication headers if needed
        }})
          .then(response => {
            // Handle success
              console.log('Response:', response);
              //   handleOpen()
              setInputValue("")
              getVendorApi()
          })  
          .catch(error => {
            // Handle error
            console.error('Error:', error);
          });

        await axios.put("http://localhost:3000/auth/approve-seller", {approve:true, userId:idCloseDialogue}, { headers  : {
            // 'Content-Type': 'multipart/form-data', // Adjust the content type based on your API requirements
          'authorization':  localStorage.getItem('logintoken'), // Add any authentication headers if needed
        }})
          .then(response => {
            // Handle success
              // console.log('Response:', response);
              handleOpen()
              getVendorApi()
          })  
          .catch(error => {
            // Handle error
            console.error('Error:', error);
          });
    }




    const getVendorApi = () => {
        axios.get('http://localhost:3000/auth/vendor/register-get', {
            headers: {
              'authorization': localStorage.getItem('logintoken')},
          })
            .then(function (response) {
                // handle success
                 setVendorData(response.data.data)
            //   console.log("responseqq", response.data.data);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            }) 
    }

    useEffect(() => {
        getVendorApi()
    }, [])



    const handleDialogData = async(id) => {
        // setOpen(true)
        // console.log("iamfordialogue", elem);
       await axios.get( `http://localhost:3000/auth/vendor/register-get/${id}`, {
            headers: {
              'authorization': localStorage.getItem('logintoken')},
          })
           .then(function (response) {
            setOpen(true)
                // handle success
              setDialogData(response.data)
              console.log("responseqq", response.data);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            }) 
    }

    
   
  
  return (

    <>
      <div className='px-[20px]  container mx-auto'>
          <div className=' py-[10px] flex flex-col space-y-5'>
            <div className='flex flex-col space-y-1'>
              <span className='text-[30px] text-[#101828] font-[500]'>Vendor List</span>
              {/* <span className='text-[#667085] font-[400] text-[16px]'>Effortlessly organize your category offerings with intuitive Category Setup for a seamless and structured e-commerce experience.</span> */}
            </div>

            <div className='flex flex-col space-y-1 border border-[#EAECF0] rounded-[8px] p-[10px]'>
              <div className='flex items-center justify-between'>
                <div className='flex space-x-2 items-center'>
                <span className='text-[18px] font-[500] text-[#101828]'>Vendor&apos;s Data</span>
                {/*-------------------------------------------------------------------- {categoryData.length} */}
                  <span className='px-[10px] py-[5px] bg-[#FCF8EE] rounded-[16px] text-[12px] text-[#A1853C]'> details</span>
              </div>

              <div className='flex items-center space-x-3 inputText w-[50%]'>
                  <IoSearch className='text-[20px]' />
                  <input
                    type='text'
                    className='outline-none focus-none w-full'
                    placeholder='Search vendor name here'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
           
              </div>
              <Paper >
                <TableContainer component={Paper} sx={{ height: '100%', width: '100%' }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow className='!bg-[#F9FAFB]'>
                      {/*                     {[ "", "","","", "" , "" ].map((el) => (
 */}

                      <TableCell style={{ minWidth: 80 }}>SL no</TableCell>
                      <TableCell style={{ minWidth: 200 }}>Name</TableCell>
                      <TableCell style={{ minWidth: 200 }}>Approve</TableCell>
                      <TableCell style={{ minWidth: 20 }}>Shop Name</TableCell>
                      <TableCell style={{ minWidth: 20 }}>Registred No</TableCell>
                      <TableCell style={{ minWidth: 20 }}>Name of business</TableCell>
                      <TableCell style={{ minWidth: 20 }}>KYC</TableCell>
                      </TableRow>
                    </TableHead>
                   
                      <TableBody>
                      {paginatedRows.filter( (item) => item ).map((elem,i) => {
                          return   <TableRow key={i} >
                            <TableCell>{i+1}</TableCell>
                            <TableCell>  {elem?.vendorRegisterFirstName} {elem?.vendorRegisterLastName} </TableCell>
                              <TableCell>
                                  {<Switch defaultChecked={elem.approve} onChange={(event) => handleUpdate(event.target.checked, elem._id)} />}  </TableCell>
                            
                              <TableCell> {elem?.vendorRegisterShopName}
                              </TableCell>
                              <TableCell>   {elem?.vendorRegisterMobileNo}
                              </TableCell>
                              <TableCell>   {elem?.vendorRegisterNameOfBuisness}
                              </TableCell>
                            
                      
                         
                         <TableCell> 
                                <Button onClick={()=>handleDialogData(elem?._id)}>View</Button></TableCell>
                         
                          
                              </TableRow>
                        })}
                      </TableBody>  
                   
                      {/* <TableRow>
                        <TableCell colSpan={7} className='text-center text-[15px] font-bold'>No product found</TableCell>
                      </TableRow> */}
                  </Table>
                </TableContainer>
            </Paper>
          
          
            {filteredRows.length > rowsPerPage && (
              <div className="flex justify-center mt-3">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handleChangePage}
                  shape="rounded"
                />
              </div>
            )}
          
              
          </div>
     <Dialog          
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Vendor&apos;s Documents</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
       <div  className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-[100%]">
  <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-60">
    <img width="100%" src={dialogData?.vendorRegisterPanImage?.url} alt="picture" />
  </div>
  <div className=" text-center">
    <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
PAN Deatils -  {dialogData.vendorRegisterPanNumber }  
    </h4>
  </div>
</div>
                         <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-[100%]">
  <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-60">
    <img width="100%" src={dialogData?.vendorRegisterAadhaarImage?.url} alt="profile-picture" />
  </div>
  <div className=" text-center">
    <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
Aadhaar Number -  {dialogData.vendorRegisterAadharNo }  
    </h4>
  </div>
</div>
                         <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-[100%]">
  <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-60">
    <img width="100%" src={dialogData?.vendorRegisterGstinImage?.url} alt="profile-picture" />
  </div>
  <div className=" text-center">
    <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
     Gstin Number -  {dialogData.vendorRegisterGistnNo   }  
    </h4>
  </div>
</div>
                         <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-[100%]">
  <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-60">
    <img width="100%" src={dialogData?.vendorRegisterCinImage?.url} alt="profile-picture" />
  </div>
  <div className=" text-center">
    <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
CIN destails -  {dialogData.vendorRegisterCinNo }  
    </h4>
  </div>
</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
      
        </DialogActions>
      </Dialog>
          </div>        
      </div>
    </>
  )
}

export default VendorDetails