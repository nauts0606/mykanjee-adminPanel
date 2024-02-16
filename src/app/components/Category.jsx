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
// import { useSnackbar } from '../SnackbarProvider';
import { useSnackbar } from "../snackbarProvider";

import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

// const validationSchema = Yup.object({
//   categoryName: Yup.string().required('Category Name is required'),
//   category_no: Yup.number().required('Category No is required'),
//    image: Yup.mixed().required('Image is required'),
// });

const Category = () => {
  const { openSnackbar } = useSnackbar();

  const [categoryData, setCategoryData] = useState([]);
  const [editData, setEditData] = useState(false);
  const [idData, setIdData] = useState("");

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const totalRows = categoryData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const filteredRows = categoryData.filter((e) =>
    e?.categoryName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // console.log("filteredRows", filteredRows);
  // console.log("paginatedRows", paginatedRows);
  // console.log("categoryData", categoryData);

  const getCategory = () => {
    axios
      .get("http://localhost:3000/auth/category-getall", {
        headers: {
          authorization: localStorage.getItem("logintoken"),
        },
      })
      .then(function (response) {
        // handle success
        setCategoryData(response.data.data);
        console.log("response", response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    getCategory();
  }, []);
  /////-------above get api data-------//////

  // useEffect(() => {
  //   handleCategoryEdit()
  // }, [])

  const formik = useFormik({
    initialValues: {
      categoryName: "",
      image: "",
      category_no: "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Category Name is required"),
      category_no: Yup.number().required("Category No is required"),
      image: Yup.mixed().required("Image is required"),
    }),
    onSubmit: async (values) => {
      console.log("valuesqq", editData);
      if (editData == false) {
        // Making the POST request
        await axios
          .post(
            "http://localhost:3000/auth/category",
            {
              category_no: values.category_no,
              categoryName: values.categoryName,
              image: values?.image,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data", // Adjust the content type based on your API requirements
                authorization: localStorage.getItem("logintoken"), // Add any authentication headers if needed
              },
            }
          )
          .then((response) => {
            // Handle success

            getCategory();
            console.log("Response:", response);
            getCategory();
            openSnackbar("Category added successfully", "success");
            formik.resetForm({
              values: {
                categoryName: "",
                image: null,
                category_no: "",
              },
            });
          })
          .catch((error) => {
            // Handle error
            console.error("Error:", error);
          });
      } else {
        // imageEditData

        await axios
          .put(
            "http://localhost:3000/auth/category-update",
            {
              categoryId: idData,
              category_no: values.category_no,
              categoryName: values.categoryName,
              image: values?.image,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data", // Adjust the content type based on your API requirements
                authorization: localStorage.getItem("logintoken"), // Add any authentication headers if needed
              },
            }
          )
          .then((response) => {
            // Handle success
            console.log("formikKK", response);
            getCategory();
            openSnackbar("Category updated successfully", "success");
            setEditData(false);
            formik.resetForm({
              values: {
                categoryName: "",
                image: null,
                category_no: "",
              },
            });
          })
          .catch((error) => {
            // Handle error
            console.error("Error:", error);
          });
        // } else {
        //   console.log("imageEditData", imageEditData);
        //   await    axios.put("http://localhost:3000/auth/category-update", {categoryId:id,category_no: values.category_no , categoryName:values.categoryName , image:imageEditData}, { headers  : {
        //     'Content-Type': 'multipart/form-data', // Adjust the content type based on your API requirements
        //         'authorization':  localStorage.getItem('logintoken'), // Add any authentication headers if needed
        //       }})
        //         .then(response => {
        //           // Handle success
        //           console.log('Response:', response);
        //           // navigate(-1)
        //         })
        //         .catch(error => {
        //           // Handle error
        //           console.error('Error:', error);
        //         });
        //  }
      }
    },
  });

  const handleCategoryEdit = async (id) => {
    await setEditData(true);
    await setIdData(id);

    await axios
      .get(`http://localhost:3000/auth/category-getall/${id}`, {
        headers: {
          authorization: localStorage.getItem("logintoken"),
        },
      })
      .then(function (response) {
        // handle success
        // setImageEditData(response.data.image)
        console.log("responresponsese", response.data);
        // useSnackbar()
        formik.setValues(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleDelete = async (id) => {
    // console.log("agagga", id);
    // return
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for deleting a category
      const response = await axios.delete(
        `http://103.174.103.122:3000/auth/category-delete/${id}`,
        {
          headers: {
            // 'Content-Type': 'application/json', // Adjust the content type based on your API requirements
            authorization: localStorage.getItem("logintoken"), // Add any authentication headers if needed
          },
        }
      );
      getCategory();
      openSnackbar("Category deleted successfully", "success");

      // Handle the response
      console.log("Response:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="px-[20px]  container mx-auto">
        <div className=" py-[10px] flex flex-col space-y-5">
          <div className="flex flex-col space-y-1">
            <span className="text-[30px] text-[#101828] font-[500]">
              Add Category
            </span>
            <span className="text-[#667085] font-[400] text-[16px]">
              Effortlessly organize your category offerings with intuitive
              Category Setup for a seamless and structured e-commerce
              experience.
            </span>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between gap-[10px]">
              <div className="flex flex-col space-y-1 w-full">
                <span>Category Name *</span>
                <input
                  type="text"
                  placeholder="Exterior"
                  className="inputText"
                  name="categoryName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values?.categoryName}
                />
                {formik.touched.categoryName && formik.errors.categoryName && (
                  <div className="text-red-500">
                    {formik.errors.categoryName}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col space-y-1 w-full">
                <span>Category Image *</span>
                {console.log("formikvalues", formik.values)}
                <input
                  type="file"
                  name="image"
                  onChange={(event) => {
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                    formik.setFieldTouched("image", true);
                  }}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.image && formik.errors.image && (
                  <div className="text-red-500">{formik.errors.image}</div>
                )}
              </div>

              <div className="flex flex-col space-y-1 w-full">
                <span>Category Number *</span>
                <input
                  type="text"
                  placeholder="Exterior"
                  className="inputText"
                  name="category_no"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values?.category_no}
                />
                {formik.touched.category_no && formik.errors.category_no && (
                  <div className="text-red-500">
                    {formik.errors.category_no}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-[24px] justify-end">
              <button className="submitButton" type="submit">
                Submit
              </button>
            </div>
          </form>
          <div className="flex flex-col space-y-1 border border-[#EAECF0] rounded-[8px] p-[10px]">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2 items-center">
                <span className="text-[18px] font-[500] text-[#101828]">
                  Category Table
                </span>

                {/*-------------------------------------------------------------------- {categoryData.length} */}
                <span className="px-[10px] py-[5px] bg-[#FCF8EE] rounded-[16px] text-[12px] text-[#A1853C]">
                  {" "}
                  category
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
                      <TableCell style={{ minWidth: 80 }}>SL no</TableCell>
                      <TableCell style={{ minWidth: 200 }}>
                        Category Name
                      </TableCell>

                      <TableCell style={{ minWidth: 150 }}>
                        Category image
                      </TableCell>
                      <TableCell style={{ minWidth: 200 }}>
                        Category Number
                      </TableCell>
                      {/* <TableCell style={{ minWidth: 50 }}>Status</TableCell> */}
                      {/* <TableCell style={{ minWidth: 50 }}>Change Status</TableCell> */}
                      <TableCell style={{ minWidth: 50 }}>Edit</TableCell>

                      <TableCell style={{ minWidth: 50 }}>Delete</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {paginatedRows?.map((elem, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>{elem?.categoryName}</TableCell>
                          <TableCell>
                            <img
                              src={elem?.image?.url}
                              width={50}
                              height={40}
                              className="rounded-[4px]"
                            />
                          </TableCell>
                          <TableCell>{elem?.category_no}</TableCell>
                          <TableCell>
                            <FaEdit
                              className="cursor-pointer"
                              onClick={() => handleCategoryEdit(elem._id)}
                            />
                          </TableCell>

                          <TableCell>
                            <FaRegTrashAlt
                              className="cursor-pointer"
                              onClick={() => handleDelete(elem._id)}
                            />
                          </TableCell>
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
        </div>
      </div>
    </>
  );
};

export default Category;
