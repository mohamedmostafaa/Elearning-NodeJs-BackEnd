module.exports=(app)=>{
    

    const userController=require('../controllers/user.controller');
    app.post('/signup',userController.signup)
    app.post('/login',userController.login)
    app.post('/loginAdmin',userController.loginAdmin)
    
 
    app.post('/createUser',userController.createUser)
    app.put('/updateUser',userController.updateUser)

    app.put('/updateUserIsOk/:_id',userController.updateUserIsOk)
    app.delete('/deleteUser/:_id',userController.deleteOneUser)
    app.delete('/deleteUser',userController.deleteSelectionUser)
    app.get('/getAllUser',userController.getAllUser)
    app.get('/getUserById/:_id',userController.getUserById)
    app.get('/searchUser/:firstname_search',userController.searchUser)
    
    app.get('/getAllEnseignant',userController.getAllEnseignant)
    
    app.get('/get3Enseignant',userController.get3Enseignant)

    const subscribeController=require('../controllers/subscribe.controller');
    app.post('/createSubscribe',subscribeController.createSubscribe)
    app.delete('/createUnSubscribe/:teacher_id/:student_id',subscribeController.createUnSubscribe)
    app.get('/getTeacherSub/:teacher_id',subscribeController.getTeacherSub)
    app.get('/getStudentSub/:student_id',subscribeController.getStudentSub)

const configSrvController=require('../controllers/config');



const feedBackController=require('../controllers/feedBack.controller');

app.post('/feedBack',feedBackController.sendFeedBack)



app.get('/configSrv0123456789',configSrvController.configSrv)

}