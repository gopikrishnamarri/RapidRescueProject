module.exports = (app)=>{
    // user
    const user = require('../controllers/user.controller')

    const issue = require('../controllers/issue.controller');
    const upload = require('../middlewares/uploads');

    const feedback = require('../controllers/feedback.controller');

    const payment = require('../controllers/payment.controller');

    // const serviceRoutes = require('./service.routes');

    // app.use('/api/mechanic', serviceRoutes);

    const serviceRoutes = require("./service.routes");
app.use("/api/mechanic", serviceRoutes);


   
    app.post("/api/userSignUp", user.userSignUp);

    app.post('/api/userLogin',user.userLogin)

    app.put('/api/changeUserPassword/:usersRegId', user.changeUserPassword);


    // mechanic 
    app.post("/api/mechanicSignUp", user.mechanicSignUp);

    app.post('/api/mechanicLogin',user.mechanicLogin)


    // Issue routes
    app.post('/api/createIssue', upload.single('photo'), issue.createIssue); // Use upload.single for local storage
    // app.get('/api/getUserIssues/:userId', issue.getUserIssues);

    // Route to find nearby mechanics
    // app.get("/api/findNearbyMechanics", issue.findNearbyMechanics);

    app.post("/api/findNearbyMechanics", issue.findNearbyMechanics);


    app.post("/api/submitFeedback", feedback.submitFeedback);

    app.post('/api/processPayment', payment.processPayment);    

    
    app.post("/api/selectMechanic", issue.selectMechanic);

    app.get("/api/getAssignedMechanic/:userId", issue.getAssignedMechanic);

    
    

   


}
