module.exports = (app)=>{
    const admin  = require('../controllers/admin.controller')
    const issue = require('../controllers/issue.controller');

    // const serviceRoutes = require('./service.routes');
    // app.use('/api/admin', serviceRoutes);

    const serviceRoutes = require("./service.routes");
    app.use("/api/admin", serviceRoutes);


    app.post('/api/createAdmin', admin.createAdmin);

    app.post('/api/adminLogin', admin.adminLogin);


    app.get('/api/getAllUsers', admin.getAllUsers);

    // Edit user route
    app.put('/api/editUser/:userId', admin.editUser);

    // Delete user route
    app.delete('/api/deleteUser/:userId', admin.deleteUser);

    app.get('/api/admin/getUserIssues/:userId', issue.getUserIssues);

    app.get('/api/admin/getAllIssues', issue.getAllIssues);

    app.get('/api/admin/getAllMechanics', admin.getAllMechanics);

    app.get('/api/admin/getAllServices', admin.getAllServices);

    // ✅ Update a Service
    app.put('/api/admin/updateService/:serviceId', admin.updateService);

    // // ✅ Delete a Service
    app.delete('/api/admin/deleteService/:serviceId', admin.deleteService);

    app.put('/api/admin/updateMechanic/:mechanicId', admin.updateMechanic);

    app.delete('/api/admin/deleteMechanic/:mechanicId', admin.deleteMechanic);


}