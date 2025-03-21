// issue.controller.js
const Issue = require('../models/issue.model');
// const user = require('../models/user.model');
const User = require('../models/user.model');
// const mechanic = require('../models/mechanic.model');
const Mechanic = require('../models/mechanic.model'); // Fix import name
// const AssignedMechanic = require("../models/assignedMechanics.model"); // Import the AssignedMechanic model
const AssignedMechanic = require("../models/assignedMechanic.model");


exports.createIssue = async (req, res) => {
  try {
    const { user_Id, issueType, description, address, latitude, longitude } = req.body;
    const photoUrl = req.file ? req.file.path : null;

    // Debugging: Log the request body
    // console.log("Request Body:", req.body);

    // Convert latitude and longitude to numbers
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    // Debugging: Log the parsed latitude and longitude
    // console.log("Parsed Latitude:", lat, "Type:", typeof lat);
    // console.log("Parsed Longitude:", lon, "Type:", typeof lon);

    // Validate latitude and longitude
    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ message: "Invalid latitude or longitude format. They must be numbers." });
    }

    if (!user_Id || !issueType || !description || !address || !photoUrl) {
      return res.status(400).send({ message: 'All fields are required', status: 400 });
    }

    const newIssue = await Issue.create({
      user_Id,
      issueType,
      description,
      address,
      latitude: lat,
      longitude: lon,
      photoUrl
    });

    // Find nearby mechanics
    // const nearbyMechanics = await mechanic.find({
    //   latitude: { $near: lat },
    //   longitude: { $near: lon }
    // });

    return res.status(200).send({
      data: newIssue,
      message: 'Issue created successfully',
    //   nearbyMechanics,
      status: 200
    });
  } catch (error) {
    console.error("Error in createIssue:", error);
    return res.status(500).send({ message: error.message, status: 500 });
  }
};



// exports.getUserIssues = async (req, res) => {
//     try {
//         const user_Id = req.params.userId;
//         // const totalCount = await user.countDocuments({ deleteFlag: false }); // Count the total users

//         const issues = await Issue.find({ user_Id }).sort({ createdAt: -1 });

//         return res.status(200).send({ data: issues,  
//             // totalCount, // Include the total count 
//             message: 'Issues fetched successfully', 
//             status: 200 });
//     } catch (error) {
//         return res.status(500).send({ message: error.message, status: 500 });
//     }
// };

exports.getUserIssues = async (req, res) => {
    try {
      const user_Id = req.params.userId;
  
      // Fetch issues for the specific user
      const issues = await Issue.find({ user_Id }).sort({ createdAt: -1 });
  
      // Get the total count of issues for the user
      const totalCount = await Issue.countDocuments({ user_Id });
  
      return res.status(200).send({
        data: issues,
        totalCount, // Include the total count in the response
        message: 'Issues fetched successfully',
        status: 200
      });
    } catch (error) {
      return res.status(500).send({ message: error.message, status: 500 });
    }
  };


exports.findNearbyMechanics = async (req, res) => {
    try {
        // const { latitude, longitude, maxDistance = 5000 } = req.query; // Use query params

        // Support both GET (req.query) and POST (req.body)
        const { latitude, longitude, maxDistance = 5000 } = req.method === "GET" ? req.query : req.body;

        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        if (isNaN(lat) || isNaN(lon)) {
            return res.status(400).json({ message: "Invalid latitude or longitude format." });
        }

        const mechanics = await Mechanic.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lon, lat]
                    },
                    $maxDistance: maxDistance // Find within 5km radius
                }
            }
        });

        return res.status(200).json({ message: "Nearby mechanics found", data: mechanics });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



// exports.getAllIssues = async (req, res) => {
//     try {
//       // Fetch all issues sorted by creation date (newest first)
//       const issues = await Issue.find().sort({ createdAt: -1 });
  
//       return res.status(200).send({
//         data: issues,
//         message: 'All issues fetched successfully',
//         status: 200
//       });
//     } catch (error) {
//       console.error("Error in getAllIssues:", error);
//       return res.status(500).send({ message: error.message, status: 500 });
//     }
//   };


exports.getAllIssues = async (req, res) => {
    try {
      const { status, page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;
  
      let query = {};
  
      // Filter by status if provided
      if (status) {
        query.status = status;
      }
  
      // Fetch issues with pagination and filters
      const issues = await Issue.find(query)
        .populate('user_Id', 'user_Name user_Email') // Populate user details
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
  
      // Get total count of issues (for pagination)
      const totalCount = await Issue.countDocuments(query);
  
      return res.status(200).send({
        data: issues,
        totalCount, // Include total count in the response
        message: 'All issues fetched successfully',
        status: 200
      });
    } catch (error) {
      console.error("Error in getAllIssues:", error);
      return res.status(500).send({ message: error.message, status: 500 });
    }
  };


//   exports.selectMechanic = async (req, res) => {
//     try {
//         const { user_Id, mechanic_Id } = req.body;

//         if (!user_Id || !mechanic_Id) {
//             return res.status(400).json({ message: "User ID and Mechanic ID are required." });
//         }

//         // Find the latest issue created by the user
//         const issue = await Issue.findOne({ user_Id }).sort({ createdAt: -1 });

//         if (!issue) {
//             return res.status(404).json({ message: "No issue found for this user." });
//         }

//         // Update the issue with the selected mechanic
//         issue.mechanic_Id = mechanic_Id;
//         await issue.save();

//         return res.status(200).json({
//             message: "Mechanic selected successfully.",
//             data: issue,
//         });
//     } catch (error) {
//         console.error("Error in selectMechanic:", error);
//         return res.status(500).json({ message: error.message });
//     }
// };


exports.selectMechanic = async (req, res) => {
  try {
      const { user_Id, mechanic_Id } = req.body;

      if (!user_Id || !mechanic_Id) {
          return res.status(400).json({ message: "User ID and Mechanic ID are required." });
      }

      // Find the latest issue created by the user
      const issue = await Issue.findOne({ user_Id }).sort({ createdAt: -1 });

      if (!issue) {
          return res.status(404).json({ message: "No issue found for this user." });
      }

      // Update the issue with the selected mechanic
      issue.mechanic_Id = mechanic_Id;
      await issue.save();

      // Fetch user details
      const user = await User.findById(user_Id);
      if (!user) {
          return res.status(404).json({ message: "User not found." });
      }

      // Fetch mechanic details
      const mechanic = await Mechanic.findById(mechanic_Id);
      if (!mechanic) {
          return res.status(404).json({ message: "Mechanic not found." });
      }

      // Store assignment details in the AssignedMechanic collection
      const assignedMechanic = new AssignedMechanic({
          user_Id: user._id,
          user_Name: user.user_Name,
          mechanic_Id: mechanic._id,
          mechanic_Name: mechanic.user_Name,
          issueType: issue.issueType,
          description: issue.description,
          address: issue.address,
          latitude: issue.latitude,
          longitude: issue.longitude,
          photoUrl: issue.photoUrl,
          status: "Pending", // Default status
      });

      await assignedMechanic.save();

      return res.status(200).json({
          message: "Mechanic selected successfully and assignment stored.",
          data: assignedMechanic,
      });

  } catch (error) {
      console.error("Error in selectMechanic:", error);
      return res.status(500).json({ message: error.message });
  }
};


// exports.getAssignedMechanic = async (req, res) => {
//   try {
//       const { user_Id } = req.params;

//       if (!user_Id) {
//           return res.status(400).json({ message: "User ID is required." });
//       }

//       // Fetch the latest assigned mechanic details for the user
//       const assignedMechanic = await AssignedMechanic.findOne({ user_Id }).sort({ createdAt: -1 });

//       if (!assignedMechanic) {
//           return res.status(404).json({ message: "No assigned mechanic found for this user." });
//       }

//       return res.status(200).json({
//           message: "Assigned mechanic retrieved successfully.",
//           data: assignedMechanic,
//       });

//   } catch (error) {
//       console.error("Error in getAssignedMechanic:", error);
//       return res.status(500).json({ message: error.message });
//   }
// };

exports.getAssignedMechanic = async (req, res) => {
  try {
      const { userId } = req.params; // Corrected parameter name

      if (!userId) {
          return res.status(400).json({ message: "User ID is required." });
      }

      // Fetch the latest assigned mechanic details for the user
      const assignedMechanic = await AssignedMechanic.findOne({ user_Id: userId }).sort({ createdAt: -1 });

      if (!assignedMechanic) {
          return res.status(404).json({ message: "No assigned mechanic found for this user." });
      }

      return res.status(200).json({
          message: "Assigned mechanic retrieved successfully.",
          data: assignedMechanic,
      });

  } catch (error) {
      console.error("Error in getAssignedMechanic:", error);
      return res.status(500).json({ message: error.message });
  }
};




