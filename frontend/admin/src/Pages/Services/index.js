import React, { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import {
  deleteApihandler,
  getApihandler,
  postApihandler,
  putApihandler,
} from "../../Apihandler";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Services() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [serviceid, setServiceId] = useState("");
  const [index, setIndex] = useState(null);
  const [servicename, setServiceName] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    const res = await getApihandler("/admin/getAllServices");
    if (res.message === "Services fetched successfully") {
      setServices(res.data);
    }
  };

  const AddServices = async (e) => {
    e.preventDefault();
    const data = { service_name: servicename, role: "Admin" };
    const res = await postApihandler("/services", data);
    if (res.message === "Service added successfully") {
      Swal.fire({ title: "Service added successfully", icon: "success" });
      setOpen(false);
      getServices();
    }
  };

  const deleteService = async (id) => {
    const res = await deleteApihandler(`/admin/deleteService/${id}`);
    if (res.message === "Service deleted successfully") {
      Swal.fire({ title: "Service deleted successfully", icon: "success" });
      getServices();
    }
  };

  const handleEdit = (id, index) => {
    setServiceId(id);
    setIndex(index);
    setServiceName(services[index]?.service_name || "");
    setOpen1(true);
  };

  const UpdateServices = async () => {
    const data = { service_name: servicename };
    const res = await putApihandler(`/admin/updateService/${serviceid}`, data);
    console.log("udate api ", res);
    if (res.message === "Service updated successfully") {
      Swal.fire({ title: "Service updated successfully", icon: "success" });
      setOpen1(false);
      getServices();
    }
  };

  return (
    <AdminLayout>
      <h4>Service Category</h4>
      <div style={{ textAlign: "left" }}>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Add service
        </Button>

        {/* Add Service Modal */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={style}>
            <Typography variant="h6">Add services</Typography>
            <TextField
              label="Service Name"
              variant="outlined"
              fullWidth
              onChange={(e) => setServiceName(e.target.value)}
            />
            <Button variant="contained" className="mt-3" onClick={AddServices}>
              Add Services
            </Button>
          </Box>
        </Modal>

        <TableContainer component={Paper} className="mt-3">
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Service Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service, idx) => (
                <TableRow key={service._id}>
                  <TableCell>{service.service_name}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(service._id, idx)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() =>
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
                            deleteService(service._id);
                          }
                        })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Update Service Modal */}
        <Modal open={open1} onClose={() => setOpen1(false)}>
          <Box sx={style}>
            <Typography variant="h6">Update services</Typography>
            <TextField
              label="Service Name"
              variant="outlined"
              fullWidth
              value={servicename}
              onChange={(e) => setServiceName(e.target.value)}
            />
            <Button
              variant="contained"
              className="mt-3"
              onClick={UpdateServices}
            >
              Update Services
            </Button>
          </Box>
        </Modal>
      </div>
    </AdminLayout>
  );
}
