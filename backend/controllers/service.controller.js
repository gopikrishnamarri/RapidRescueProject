const Service = require('../models/service.model');
const MechanicServicepPrice = require("../models/mechanic_servicePrice.model");

// ✅ Add a Service (Admin or Mechanic)
// exports.addService = async (req, res) => {
//     try {
//         // const { srvice_name, description, price, role } = req.body;
//         const { service_name, role } = req.body;
//         const userId = req.userId; // Assume user ID is extracted from the token

//         if (!service_name) {
//             return res.status(400).json({ message: "Service name is required", status: 400 });
//         }

//         // Check if the service already exists
//         const existingService = await Service.findOne({ service_name });
//         if (existingService) {
//             return res.status(409).json({ message: "Service already exists", status: 409 });
//         }

//         const service = new Service({
//             service_name,
//             // description,
//             // price,
//             createdBy: userId,
//             role
//         });

//         await service.save();
//         return res.status(201).json({ message: "Service added successfully", data: service, status: 201 });
//     } catch (error) {
//         return res.status(500).json({ message: error.message, status: 500 });
//     }
// };

// // ✅ Get All Services
// exports.getAllServices = async (req, res) => {
//     try {
//         const services = await Service.find({ deleteFlag: false });
//         return res.status(200).json({ data: services, message: "Services fetched successfully", status: 200 });
//     } catch (error) {
//         return res.status(500).json({ message: error.message, status: 500 });
//     }
// };

// // ✅ Update a Service
// exports.updateService = async (req, res) => {
//     try {
//         const { serviceId } = req.params;
//         const { name, description, price } = req.body;

//         const updatedService = await Service.findByIdAndUpdate(serviceId, { name, description, price }, { new: true });

//         if (!updatedService) {
//             return res.status(404).json({ message: "Service not found", status: 404 });
//         }

//         return res.status(200).json({ message: "Service updated successfully", data: updatedService, status: 200 });
//     } catch (error) {
//         return res.status(500).json({ message: error.message, status: 500 });
//     }
// };

// // ✅ Delete a Service (Soft Delete)
// exports.deleteService = async (req, res) => {
//     try {
//         const { serviceId } = req.params;

//         const service = await Service.findByIdAndUpdate(serviceId, { deleteFlag: true }, { new: true });

//         if (!service) {
//             return res.status(404).json({ message: "Service not found", status: 404 });
//         }

//         return res.status(200).json({ message: "Service deleted successfully", status: 200 });
//     } catch (error) {
//         return res.status(500).json({ message: error.message, status: 500 });
//     }
// };



// exports.addService = async (req, res) => {
//     try {
//         // const { name, description, price, role } = req.body;
//         const { service_name, role } = req.body;
//         const userId = req.userId; // Assume user ID is extracted from the token

//         if (!service_name) {
//             return res.status(400).json({ message: "Service name is required", status: 400 });
//         }

//         // Check if the service already exists
//         const existingService = await Service.findOne({ service_name });
//         if (existingService) {
//             return res.status(409).json({ message: "Service already exists", status: 409 });
//         }

//         const service = new Service({
//             service_name,
//             // description,
//             // price,
//             createdBy: userId,
//             role
//         });

//         await service.save();
//         return res.status(201).json({ message: "Service added successfully", data: service, status: 201 });
//     } catch (error) {
//         return res.status(500).json({ message: error.message, status: 500 });
//     }
// };

// exports.addService = async (req, res) => {
//     try {
//         const { service_name, role } = req.body;
//         const userId = req.userId; // Extract user ID from token

//         if (!service_name) {
//             return res.status(400).json({ message: "Service name is required", status: 400 });
//         }

//         // ✅ Convert to lowercase for case-insensitive checking
//         const existingService = await Service.findOne({ service_name: service_name.toLowerCase() });

//         if (existingService) {
//             return res.status(409).json({ message: "Service already exists", status: 409 });
//         }

//         const service = new Service({
//             service_name: service_name.toLowerCase(), // ✅ Store in lowercase
//             createdBy: userId,
//             role
//         });

//         await service.save();
//         return res.status(201).json({ message: "Service added successfully", data: service, status: 201 });
//     } catch (error) {
//         return res.status(500).json({ message: error.message, status: 500 });
//     }
// };



// exports.addService = async (req, res) => {
//     try {
//         const { service_name, role } = req.body;
//         const userId = req.userId;

//         // ✅ Validate that service_name is not empty
//         if (!service_name || typeof service_name !== "string" || service_name.trim() === "") {
//             return res.status(400).json({ message: "Service name is required and cannot be empty", status: 400 });
//         }

//         // ✅ Convert service_name to lowercase for consistency
//         const serviceNameLower = service_name.toLowerCase().trim();

//         // ✅ Check if service already exists
//         const existingService = await Service.findOne({ service_name: serviceNameLower });
//         if (existingService) {
//             return res.status(409).json({ message: "Service already exists", status: 409 });
//         }

//         // ✅ Save the new service
//         const service = new Service({
//             service_name: serviceNameLower,
//             createdBy: userId,
//             role
//         });

//         await service.save();
//         return res.status(201).json({ message: "Service added successfully", data: service, status: 201 });
//     } catch (error) {
//         return res.status(500).json({ message: error.message, status: 500 });
//     }
// };


// ✅ Public API - No Authentication Required
exports.addService = async (req, res) => {
    try {
        const { service_name, role } = req.body;

        // ✅ Validate that service_name is provided
        if (!service_name || typeof service_name !== "string" || service_name.trim() === "") {
            return res.status(400).json({ message: "Service name is required", status: 400 });
        }

        // ✅ Convert to lowercase to prevent duplicate case-sensitive entries
        // const serviceNameLower = service_name.toLowerCase().trim();

        // ✅ Check if service already exists
        // const existingService = await Service.findOne({ service_name: serviceNameLower });
        const existingService = await Service.findOne({ service_name });
        if (existingService) {
            return res.status(409).json({ message: "Service already exists", status: 409 });
        }

        // ✅ Create new service (No Access Token Required)
        const service = new Service({
            // service_name: serviceNameLower,
            service_name,
            role
        });

        await service.save();
        return res.status(200).json({ message: "Service added successfully", data: service, status: 200 });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: 500 });
    }
};



// ✅ Get All Services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find({ deleteFlag: false });
        return res.status(200).json({ data: services, message: "Services fetched successfully", status: 200 });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: 500 });
    }
};

// ✅ Update a Service
exports.updateService = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const { name, description, price } = req.body;

        const updatedService = await Service.findByIdAndUpdate(serviceId, { name, description, price }, { new: true });

        if (!updatedService) {
            return res.status(404).json({ message: "Service not found", status: 404 });
        }

        return res.status(200).json({ message: "Service updated successfully", data: updatedService, status: 200 });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: 500 });
    }
};

// ✅ Delete a Service (Soft Delete)
exports.deleteService = async (req, res) => {
    try {
        const { serviceId } = req.params;

        const service = await Service.findByIdAndUpdate(serviceId, { deleteFlag: true }, { new: true });

        if (!service) {
            return res.status(404).json({ message: "Service not found", status: 404 });
        }

        return res.status(200).json({ message: "Service deleted successfully", status: 200 });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: 500 });
    }
};



exports.addMechanicServicePrice = async (req, res) => {
    try {
        // const { serviceId, price } = req.body;
        const { mechanicId, serviceId, price } = req.body; // ✅ Get mechanicId from request body
        // const mechanicId = req.userId; // ✅ Mechanic ID from token

        // if (!serviceId || !price) {
        //     return res.status(400).json({ message: "Service ID and price are required", status: 400 });
        // }
        if (!mechanicId || !serviceId || !price) {
            return res.status(400).json({ message: "Mechanic ID, Service ID, and price are required", status: 400 });
        }

        // ✅ Check if the mechanic has already added this service
        const existingService = await MechanicServicepPrice.findOne({ mechanicId, serviceId });
        if (existingService) {
            return res.status(409).json({ message: "Service Price already added", status: 409 });
        }

        // ✅ Save the service for the mechanic
        const mechanicServicePrice = new MechanicServicepPrice({ mechanicId, serviceId, price });
        await mechanicServicePrice.save();

        return res.status(200).json({ message: "Service Price added successfully", data: mechanicServicePrice, status: 200 });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: 500 });
    }
};