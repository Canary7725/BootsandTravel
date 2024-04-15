import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Avatar from "@mui/material/Avatar";

import {
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import axios from "axios";
import * as Yup from "yup";
import { useAuth } from "../../Context/AuthContext";
import { theme } from "../../assets/Colors";

function AddItems() {
  const initialValues = {
    name: "",
    description: "",
    price: "",
    quantity_available: "",
    categories: [],
    images: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive")
      .integer("Price must be an integer"),
    quantity_available: Yup.number()
      .required("Quantity Available is required")
      .positive("Quantity must be positive")
      .integer("Quantity must be an integer"),
    categories: Yup.string().required("Categories is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const categoriesArray = values.categories
      .split(",")
      .map((category) => category.trim());

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("quantity_available", values.quantity_available);

    categoriesArray.forEach((category, index) => {
      formData.append(`categories[${index}]`, category);
    });
    values.images.forEach((image, index) => {
      formData.append(`image_${index}`, image);
    });

    try {
      const response = await axios.post(
        "http://localhost:4000/api/products/createProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error creating product:", error);
    }
    setSubmitting(false);
  };

  const { user } = useAuth();
  const userDetails = user || {};

  return (
    <Grid
      container
      spacing={2}
      sx={{
        my: 3,
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          mr: 5,
          ml: 2,
          pb: 2,
          borderBottom: "1px solid",
        }}
      >
        <Typography variant="h5">Create Products</Typography>
        <Avatar
          alt={`${userDetails.name}`}
          src={`http://localhost:4000/images/user/${userDetails.profile_image}`}
        />
      </Box>

      <Grid item xs={12} sx={{ mt: 7, mr: 5 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="name"
                    as={TextField}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: theme.palette.secondary.main, // Change label color
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.secondary.main, // Change border color
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: theme.palette.secondary.main,
                      },
                    }}
                  />
                  <ErrorMessage name="name" component="div" />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="description"
                    as={TextField}
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: theme.palette.secondary.main, // Change label color
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.secondary.main, // Change border color
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: theme.palette.secondary.main,
                      },
                    }}
                  />
                  <ErrorMessage name="description" component="div" />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    name="price"
                    as={TextField}
                    label="Price"
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: theme.palette.secondary.main, // Change label color
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.secondary.main, // Change border color
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: theme.palette.secondary.main,
                      },
                    }}
                  />
                  <ErrorMessage name="price" component="div" />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    name="quantity_available"
                    as={TextField}
                    label="Quantity Available"
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: theme.palette.secondary.main, // Change label color
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.secondary.main, // Change border color
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: theme.palette.secondary.main,
                      },
                    }}
                  />
                  <ErrorMessage name="quantity_available" component="div" />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="categories"
                    as={TextField}
                    label="Categories (comma-separated)"
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: theme.palette.secondary.main, // Change label color
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.secondary.main, // Change border color
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: theme.palette.secondary.main,
                      },
                    }}
                  />
                  <ErrorMessage name="categories" component="div" />
                </Grid>

                <Grid item xs={12}>
                  <input
                    type="file"
                    multiple
                    onChange={(event) => {
                      const files = Array.from(event.target.files);
                      setFieldValue("images", files);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                      color: theme.palette.primary.main,
                      bgcolor: theme.palette.secondary.main,
                      "&:hover": {
                        bgcolor: theme.palette.secondary.main, // Maintain the same background color on hover
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}

export default AddItems;
