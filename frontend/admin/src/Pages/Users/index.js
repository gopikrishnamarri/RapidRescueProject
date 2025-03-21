/** @format */

import React, { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import {
  deleteApihandler,
  getApihandler,
  putApihandler,
} from "../../Apihandler";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Modal,
  Box,
  Button,
  TablePagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";

export default function Users() {
  const [data, setData] = useState([]);
  const [userid, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countrycode, setCountryCode] = useState("");
  const [mobileno, setMobileNumber] = useState("");
  const [index, setIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await getApihandler("/getAllUsers");
    console.log("Get user API response:", res);
    if (res.status === 200) {
      setData(res.data);
    }
  };

  // ****** Delete API ******
  const deleteUser = async (id) => {
    const res = await deleteApihandler(`/deleteUser/${id}`);
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        text: "User deleted successfully!",
      });
      getUsers();
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to delete user!",
      });
    }
  };

  // ****** Set Modal Data ******
  useEffect(() => {
    if (index !== null && data[index]) {
      const { user_Name, user_Email, country_code, mobile_no } =
        data[index] || {};
      setName(user_Name || "");
      setEmail(user_Email || "");
      setCountryCode(country_code || "");
      setMobileNumber(mobile_no || "");
    }
  }, [index, data]);

  // ****** Update API ******
  const handleUpdateUser = async () => {
    const item = {
      user_Name: name,
      user_Email: email,
      country_code: countrycode,
      mobile_no: mobileno,
    };

    const res = await putApihandler(`/editUser/${userid}`, item);
    console.log("Update API response:", res);

    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        text: "User updated successfully!",
      });
      setOpen(false);
      getUsers();
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to update user!",
      });
    }
  };

  return (
    <AdminLayout>
      <h4>Users List</h4>
      <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mobile</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{user.user_Name}</TableCell>
                  <TableCell>{user.user_Email}</TableCell>
                  <TableCell>{user.mobile_no}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setUserId(user._id);
                        setIndex(index);
                        setOpen(true);
                      }}
                      sx={{ marginRight: "10px" }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#3085d6",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteUser(user._id);
                          }
                        });
                      }}
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* Pagination Component */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Update User Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2>Edit User</h2>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Country Code"
            fullWidth
            margin="normal"
            value={countrycode}
            onChange={(e) => setCountryCode(e.target.value)}
          />
          <TextField
            label="Mobile Number"
            fullWidth
            margin="normal"
            value={mobileno}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={() => setOpen(false)} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateUser}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </AdminLayout>
  );
}
