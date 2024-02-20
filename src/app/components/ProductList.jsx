import React, { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Switch from "@mui/material/Switch";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Pagination,
} from "@mui/material";
import Image from "next/image";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useSnackbar } from "../SnackbarProvider";

// const validationSchema = Yup.object({
//   categoryName: Yup.string().required('ProductList Name is required'),
//   category_no: Yup.number().required('ProductList No is required'),
//    image: Yup.mixed().required('Image is required'),
// });

const ProductList = () => {
  const { openSnackbar } = useSnackbar();
  const handleClose = () => {
    setOpen(false);
  };

  const [inputValue, setInputValue] = useState("");

  const [productsData, setProductsData] = useState([]);
  const [catData, setCatData] = useState([]);

  const [idCloseDialogue, setIdCloseDialogue] = useState("");

  const handleOpen = () => setOpen(!open);

  const [open, setOpen] = useState(false);





  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const totalRows = productsData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const filteredRows = productsData.filter((e) =>
    e?.productsName
    ?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  useEffect(() => {
    axios
      .get("http://103.174.103.122:3000/auth/category-getall", {
        headers: {
          authorization: localStorage.getItem("logintoken"),
        },
      })
      .then(function (response) {
        // handle success
        setCatData(response.data.data);
        // console.log("responseCat", response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const cancelFunction = async () => {
    await handleFalse(true, idCloseDialogue);
    handleOpen();
    getProductApi();
  };
  const handleFalse = async (value, idCloseDialogue) => {
    // handleOpen()
    await axios
      .put(
        "http://103.174.103.122:3000/auth/approve-admin",
        { productId: idCloseDialogue, approve: value },
        {
          headers: {
            // 'Content-Type': 'multipart/form-data', // Adjust the content type based on your API requirements
            authorization: localStorage.getItem("logintoken"), // Add any authentication headers if needed
          },
        }
      )
      .then((response) => {
        // Handle success
        console.log("Response:", response);
        //   handleOpen()
        setInputValue("");
        getProductApi();
        openSnackbar("Status changed successfully", "success");
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };
  const handleReason = async () => {
    handleOpen();
    await axios
      .put(
        "http://103.174.103.122:3000/auth/reason-admin",
        { productId: idCloseDialogue, reason: inputValue },
        {
          headers: {
            // 'Content-Type': 'multipart/form-data', // Adjust the content type based on your API requirements
            authorization: localStorage.getItem("logintoken"), // Add any authentication headers if needed
          },
        }
      )
      .then((response) => {
        // Handle success
        console.log("Response:", response);
        //   handleOpen()
        setInputValue("");
        getProductApi();
        openSnackbar("reason updated successfully", "success");
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };
  const handleUpdate = async (value, id) => {
    if (value == false) {
      handleOpen();
    }
    // setSelectedOption(value)
    setIdCloseDialogue(id);
    await axios
      .put(
        "http://103.174.103.122:3000/auth/approve-admin",
        { productId: id, approve: value },
        {
          headers: {
            // 'Content-Type': 'multipart/form-data', // Adjust the content type based on your API requirements
            authorization: localStorage.getItem("logintoken"), // Add any authentication headers if needed
          },
        }
      )
      .then((response) => {
        // Handle success
        console.log("Response:", response);
        getProductApi();
        openSnackbar("status updated successfully", "success");
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };

  const getProductApi = () => {
    axios
      .get("http://103.174.103.122:3000/auth/products-getall", {
        headers: {
          authorization: localStorage.getItem("logintoken"),
        },
      })
      .then(function (response) {
        setProductsData(response.data.data);
        console.log("response", response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    getProductApi();
  }, []);

  return (
    <>
      <div className="px-[20px]  container mx-auto">
        <div className=" py-[10px] flex flex-col space-y-5">
          <div className="flex flex-col space-y-1">
            <span className="text-[30px] text-[#101828] font-[500]">
              Product&apos;s List
            </span>
            {/* <span className='text-[#667085] font-[400] text-[16px]'>Effortlessly organize your category offerings with intuitive Category Setup for a seamless and structured e-commerce experience.</span> */}
          </div>

          <div className="flex flex-col space-y-1 border border-[#EAECF0] rounded-[8px] p-[10px]">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2 items-center">
                <span className="text-[18px] font-[500] text-[#101828]">
                  Product&apos;s Data
                </span>
                {/*-------------------------------------------------------------------- {categoryData.length} */}
                <span className="px-[10px] py-[5px] bg-[#FCF8EE] rounded-[16px] text-[12px] text-[#A1853C]">
                  {" "}
                  products
                </span>
              </div>

              <div className='flex items-center space-x-3 inputText w-[50%]'>
                  <IoSearch className='text-[20px]' />
                  <input
                    type='text'
                    className='outline-none focus-none w-full'
                    placeholder='Search Category Name here'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
            </div>

            <Paper>
              <TableContainer
                component={Paper}
                sx={{ height: "100%", width: "100%" }}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow className="!bg-[#F9FAFB]">
                      {/* "","","",  "" , "", "" , "Product No" , "Size" , "Seller Name" */}
                      <TableCell style={{ minWidth: 80 }}>SL no</TableCell>
                      <TableCell style={{ minWidth: 200 }}>
                        Product Name
                      </TableCell>
                      <TableCell style={{ minWidth: 200 }}> Approve</TableCell>

                      <TableCell style={{ minWidth: 20 }}>
                        Disaprove Reason
                      </TableCell>
                      <TableCell style={{ minWidth: 200 }}>Price</TableCell>
                      <TableCell style={{ minWidth: 200 }}>Fabric</TableCell>
                      <TableCell style={{ minWidth: 200 }}>Pattern</TableCell>
                      <TableCell style={{ minWidth: 200 }}>
                        Product No
                      </TableCell>
                      <TableCell style={{ minWidth: 200 }}>Size</TableCell>
                      <TableCell style={{ minWidth: 200 }}>
                        Seller Name
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {paginatedRows
                      .filter((e) => e)
                      .map((elem, i) => {
                        return (
                          <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{elem?.productsName}</TableCell>
                            <TableCell>
                              <Switch
                                defaultChecked={elem.approve}
                                onChange={(event) =>
                                  handleUpdate(event.target.checked, elem._id)
                                }
                              />
                            </TableCell>
                            <TableCell> {elem.reason}</TableCell>
                            <TableCell> {elem.productPrice}</TableCell>
                            <TableCell>{elem.fabric}</TableCell>
                            <TableCell> {elem.printOrPattern}</TableCell>
                            <TableCell>
                              {" "}
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {catData.map((data) =>
                                  elem.product_no === data.category_no
                                    ? data.categoryName
                                    : ""
                                )}
                              </Typography>
                            </TableCell>
                            <TableCell>{elem.sizeFit}</TableCell>
                            <TableCell>{elem.sellerName}</TableCell>
                          </TableRow>
                        );
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
            // onClose={handleClose}
            handler={handleOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Add Reason</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                please mentioned here the reason to reject product listing.
                <TextField
                  fullWidth
                  placeholder="name@mail.com"
                  variant="outlined"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                //  variant="contained"
                onClick={() => cancelFunction()}
              >
                Cancel
              </Button>
              <Button onClick={() => handleReason()}>
                <span>Confirm</span>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default ProductList;
