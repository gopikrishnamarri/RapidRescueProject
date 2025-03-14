import React, { useEffect, useState } from "react";

import AdminLayout from "../../Layout/AdminLayout";
import {
  deleteApihandler,
  getApihandler,
  putApihandler,
} from "../../Apihandler";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
export default function Mechanic() {
  const [data, setData] = useState([]);
  console.log("data is ", data);
  useEffect(() => {
    getMechanic();
  }, []);
  // ******** get api ************
  const getMechanic = async () => {
    const res = await getApihandler("/admin/getAllMechanics");
    console.log("get mechanic api res --->", res);
    if (res.message === "Mechnaics fetched successfully") {
      setData(res.data);
    }
  };

  // ******** delete api ************
  const deleteMechanic = async (id) => {
    const res = await deleteApihandler(`/admin/deleteMechanic/${id}`);
    console.log("mechanic api res is --->", res);
    if (res.message === "Mechanic deleted successfully") {
      Swal.fire({
        title: "mechanic delete successfully",
        icon: "success",
      });
      getMechanic();
    }
  };
  // ******** update api ************
  const [mechanicid, setMechanicId] = useState("");
  const [index, setIndex] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countrycode, setCountryCode] = useState("");
  const [mobileno, setMobileNumber] = useState("");
  const [garagename, setGarageName] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (index !== null && data[index]) {
      const { user_Name, user_Email, country_code, mobile_no, garage_name } =
        data[index] || {};
      setName(user_Name || "");
      setEmail(user_Email || "");
      setCountryCode(country_code || "");
      setMobileNumber(mobile_no || "");
      setGarageName(garage_name || "");
    }
  }, [data, index]);
  const updateMechanic = async () => {
    const data = {
      user_Name: name,
      user_Email: email,
      country_code: countrycode,
      mobile_no: mobileno,
      garage_name: garagename,
    };
    const res = await putApihandler(
      `/admin/updateMechanic/${mechanicid}`,
      data
    );
    console.log("update mechanic ---->", res);
    if (res.message === "Mechanic updated successfully") {
      Swal.fire({
        title: "Mechanic updated successfully",
        icon: "success",
      });
      setOpen(false);
      getMechanic();
    } else {
      Swal.fire({
        icon: "error",
        text: "Failed to update mechanic!",
      });
    }
  };
  return (
    <AdminLayout>
      <h3>Mechanic</h3>
      <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mobile</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Garage Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((mechanic, index) => (
              <TableRow key={mechanic._id}>
                <TableCell>{mechanic.user_Name}</TableCell>
                <TableCell>{mechanic.user_Email}</TableCell>
                <TableCell>{mechanic.mobile_no}</TableCell>
                <TableCell>{mechanic.garage_name}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setMechanicId(mechanic._id);
                      setIndex(index);
                      setOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
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
                          deleteMechanic(mechanic._id);
                        }
                      });
                    }}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* ******** update mechanic modal ********* */}
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
            label="Garage Name "
            fullWidth
            margin="normal"
            value={garagename}
            onChange={(e) => setGarageName(e.target.value)}
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
              onClick={updateMechanic}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </AdminLayout>
  );
}
