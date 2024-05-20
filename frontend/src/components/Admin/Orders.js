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
import { useContext, useState, useEffect } from "react";
import FaButton from "../FaButton";
import MainButton from "../Button";
import { theme } from "../../assets/Colors";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Items = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/order/getOrders"
        );
        if (response.data.success) {
          setOrders(response.data.data);

          const user = await axios.get(
            `http://localhost:4000/api/user/getUserById/`
          );
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchData();
  }, []);

  const { user } = useAuth();
  const userDetails = user || {};

  // Pagination
  const [page, setPage] = useState(0);
  const rowsPerPage = 7; // Fix rows per page to 7

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        my: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          mr: 5,
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
      <TableContainer sx={{ mt: 6, mr: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: theme.palette.secondary.main }}>
                #
              </TableCell>
              <TableCell style={{ color: theme.palette.secondary.main }}>
                User Name
              </TableCell>
              <TableCell style={{ color: theme.palette.secondary.main }}>
                Total Price
              </TableCell>
              <TableCell style={{ color: theme.palette.secondary.main }}>
                Address
              </TableCell>
              <TableCell style={{ color: theme.palette.secondary.main }}>
                Status
              </TableCell>
              <TableCell style={{ color: theme.palette.secondary.main }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? orders.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : orders
            ).map((order, index) => (
              <TableRow key={order._id}>
                <TableCell style={{ color: theme.palette.secondary.main }}>
                  {index + 1}
                </TableCell>
                <TableCell style={{ color: theme.palette.secondary.main }}>
                  {order.user_name}
                </TableCell>
                <TableCell style={{ color: theme.palette.secondary.main }}>
                  {order.total_price}
                </TableCell>
                <TableCell style={{ color: theme.palette.secondary.main }}>
                  {order.shipping_address}
                </TableCell>
                <TableCell style={{ color: theme.palette.secondary.main }}>
                  {order.status}
                </TableCell>
                <TableCell
                  style={{
                    color: theme.palette.secondary.main,
                  }}
                >
                  <Link to={`/updateOrder/${order._id}`}>
                    <FaEdit />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
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
          count={orders.length}
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
