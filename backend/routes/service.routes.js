// module.exports = (app) => {
//     const service = require('../controllers/service.controller');
//     const authMiddleware = require('../middlewares/auth.middleware'); // Assume this checks authentication

//     // app.post('/api/services', authMiddleware, service.addService);  // Add service
//     // app.get('/api/services', service.getAllServices);               // Get all services
//     // app.put('/api/services/:serviceId', authMiddleware, service.updateService); // Update service
//     // app.delete('/api/services/:serviceId', authMiddleware, service.deleteService); // Delete service

//     app.post('/services', authMiddleware, service.addService);
//     app.get('/services', service.getAllServices);
//     app.put('/services/:serviceId', authMiddleware, service.updateService);
//     app.delete('/services/:serviceId', authMiddleware, service.deleteService);
// };

// const express = require("express");
// const cors = require("cors");
// const app = express();

// // ✅ Middleware
// app.use(express.json());
// app.use(cors());

// // ✅ Import Routes
// const serviceRoutes = require("./routes/service.routes");

// // ✅ Register the Service Routes
// app.use("/api", serviceRoutes); // Now `POST /api/services` will work

// // ✅ Start Server
// const PORT = process.env.PORT || 8090;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller");
// const authMiddleware = require("../middlewares/auth.middleware");

// ✅ Add a Service
// router.post("/", authMiddleware, serviceController.addService);

// // ✅ Get All Services
// router.get("/", serviceController.getAllServices);

// ✅ Public API (No Access Token Required)
router.post("/services", serviceController.addService);

// ✅ Get All Services (Public API)
router.get("/services", serviceController.getAllServices);




// ✅ Update a Service
// router.put("/:serviceId", authMiddleware, serviceController.updateService);

// // ✅ Delete a Service
// router.delete("/:serviceId", authMiddleware, serviceController.deleteService);

// ✅ Add Service for Mechanic
// router.post("/add-service", authMiddleware, mechanicController.addMechanicService);

router.post("/addServicePrice",  serviceController.addMechanicServicePrice);


module.exports = router; // ✅ Ensure it's exported correctly
