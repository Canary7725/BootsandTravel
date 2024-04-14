import {
  Box,
  Typography,
  Avatar,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";
import { useAuth } from "../../Context/AuthContext";
import { ProductsContext } from "../../Context/productsContext";
import { useContext, useState } from "react";
import { useTheme } from "@mui/material/styles";
import FaButton from "../FaButton";
import MainButton from "../Button";

const Items = () => {
  const products = useContext(ProductsContext);
  const { user } = useAuth();
  const userDetails = user || {};
  const theme = useTheme();

  // Pagination
  const [page, setPage] = useState(0);
  const rowsPerPage = 6; // Fix rows per page to 10

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

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
          color: theme.palette.secondary.main, // Set text color to secondary
        }}
      >
        <Typography variant="h5">Item List</Typography>
        <Avatar
          alt={`${userDetails.name}`}
          src={`http://localhost:4000/images/user/${userDetails.profile_image}`}
        />
      </Box>
      <TableContainer
        component={Paper}
        sx={{ mt: 6, mr: 5, bgcolor: theme.palette.primary.main }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: theme.palette.secondary.main }}>
                #
              </TableCell>
              <TableCell style={{ color: theme.palette.secondary.main }}>
                Name
              </TableCell>
              <TableCell style={{ color: theme.palette.secondary.main }}>
                Price
              </TableCell>
              <TableCell style={{ color: theme.palette.secondary.main }}>
                Available Quantity
              </TableCell>
              <TableCell style={{ color: theme.palette.secondary.main }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? products.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : products
            ).map((product, index) => (
              <TableRow key={index}>
                <TableCell style={{ color: theme.palette.secondary.main }}>
                  {index + 1 + page * rowsPerPage}
                </TableCell>
                <TableCell style={{ color: theme.palette.secondary.main }}>
                  {product.name}
                </TableCell>
                <TableCell style={{ color: theme.palette.secondary.main }}>
                  {product.price}
                </TableCell>
                <TableCell style={{ color: theme.palette.secondary.main }}>
                  {product.quantity_available}
                </TableCell>
                <TableCell style={{ color: theme.palette.secondary.main }}>
                  <Button
                    sx={{
                      color: theme.palette.secondary.main,
                      bgcolor: theme.palette.primary.main,
                    }}
                  >
                    {" "}
                    Update
                  </Button>
                  <Button
                    sx={{
                      color: theme.palette.secondary.main,
                      bgcolor: theme.palette.primary.main,
                      ml: 2,
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        justifyContent="right"
        sx={{
          mt: 2,
          mr: 3,
        }}
      >
        <TablePagination
          component="div" // Render TablePagination as a div
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPageOptions={[]}
          sx={{ color: theme.palette.secondary.main }}
        />
      </Grid>
    </Grid>
  );
};

export default Items;
