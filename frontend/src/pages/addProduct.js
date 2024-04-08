import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import * as Yup from "yup";

function CreateProductForm() {
  const initialValues = {
    name: "",
    description: "",
    price: "",
    quantity_available: "",
    categories: "",
    images: [], // Initialize images as an empty array
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
    formData.append("categories", categoriesArray);

    // Loop through each image file and append it to the FormData
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
    } catch (error) {
      console.error("Error creating product:", error);
    }
    setSubmitting(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>Create Product</h2>
      </Grid>
      <Grid item xs={12}>
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
                    color="primary"
                    disabled={isSubmitting}
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

export default CreateProductForm;
