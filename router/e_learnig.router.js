module.exports=(app)=>{

    const couresController=require('../controllers/course.controller');
    app.post('/createCours',couresController.createCours)
    app.put('/updateCours',couresController.updateCours)
    app.delete('/deleteCours/:_id',couresController.deleteOneCours)
    app.delete('/deleteCours',couresController.deleteSelectionCours)
    app.get('/getAllCours',couresController.getAllCours)
    
    app.get('/getTroisCours',couresController.getTroisCours)
    app.get('/getCoursById/:_id',couresController.getCoursById)
    app.get('/getCoursByType/:_idType',couresController.getCoursByType)
    app.get('/getCoursByCategory/:_idCategory',couresController.getCoursByCategory)
    app.get('/searchCours/:cours_name_search',couresController.searchCours)

    //cour-search-gratuit-payee
    app.get('/searchCoursGratuit',couresController.searchCoursGratuit)
    app.get('/searchCoursPayee',couresController.searchCoursPayee)
   
    app.get('/getCoursByTeacherId/:teacher_id',couresController.getCoursByTeacherId)

    app.post('/createQuestion',couresController.createQuestion)
    app.post('/createReponse',couresController.createReponse)
   app.get('/getQuestionByCourseId/:course_id',couresController.getQuestionByCourseId)
   app.get('/getAllQuestion',couresController.getAllQuestion)
  

   app.get('/getContentByCourId/:course_id',couresController.getContentByCourId)
   app.delete('/deleteContent/:course_content_id',couresController.deleteContent)

   app.get('/getQcmByCourseId/:course_id',couresController.getQcmByCourseId)
   app.post('/startQcm',couresController.startQcm)
   app.get('/hasPassedQcm/:cours_id/:user_id',couresController.hasPassedQcm)
   app.post('/createQcm',couresController.createQcm)
   app.delete('/deleteCom/:_id',couresController.deleteCom)
   app.delete('/deleteRep/:_id',couresController.deleteRep)
   app.put('/EditCom',couresController.EditCom)
   app.put('/EditRep',couresController.EditRep)
   

   app.put('/vote/:user_id/:reponse_id',couresController.vote)
    app.put('/markAsValid/:reponse_id',couresController.markAsValid)

    


    const categoryController=require('../controllers/category.controller');
    app.post('/createCategory',categoryController.createCategory)
    app.put('/updateCategory',categoryController.updateCategory)
    app.delete('/deleteCategory/:_id',categoryController.deleteOneCategory)
    app.delete('/deleteCategory',categoryController.deleteSelectionCategory)
    app.get('/getAllCategory',categoryController.getAllCategory)
    app.get('/getCategoryById/:_id',categoryController.getCategoryById)

    

    const couresTypeController=require('../controllers/courseType.controller');
    app.post('/createCoursType',couresTypeController.createCoursType)
    app.put('/updateCours',couresTypeController.updateCoursType)
    app.delete('/deleteCoursType/:_id',couresTypeController.deleteOneCoursType)
    app.delete('/deleteCoursType',couresTypeController.deleteSelectionCoursType)
    app.get('/getAllCoursType',couresTypeController.getAllCoursType)
    app.get('/getCoursTypeById/:_id',couresTypeController.getCoursTypeById)
    app.get('/searchCoursType/:coursType_name_search',couresTypeController.searchCoursType)


    const filiereController=require('../controllers/filiere.controller');
    app.post('/createFiliere',filiereController.createFiliere)
    app.put('/updateFiliere',filiereController.updateFiliere)
    app.delete('/deleteFiliere/:_id',filiereController.deleteOneFiliere)
    app.delete('/deleteFiliere',filiereController.deleteSelectionFiliere)
    app.get('/getAllFiliere',filiereController.getAllFiliere)
    app.get('/getFiliereById/:_id',filiereController.getFiliereById)
    app.get('/searchFiliere/:filiere_name_search',filiereController.searchFiliere)


    const participateController=require('../controllers/participate.controller');
    app.post('/createParticipant',participateController.createParticipant)  
    app.get('/getAllParticipants',participateController.getAllParticipants)
    app.put('/updateParticipate',participateController.updateParticipant)
    app.delete('/deleteParticipant/:course_id/:user_id',participateController.deleteOneParticipant)
    app.get('/getAllParticipantByCourseId/:course_id',participateController.getParticipantByCourseId)
    app.get('/getParticipantByUserId/:user_id',participateController.getParticipantByUserId)
   

    const specialityController=require('../controllers/speciality.controller');
    app.post('/createSpeciality',specialityController.createSpeciality)
    app.put('/updateSpeciality',specialityController.updateSpeciality)
    app.delete('/deleteSpeciality/:_id',specialityController.deleteOneSpeciality)
    app.delete('/deleteSpeciality',specialityController.deleteSelectionSpeciality)
    app.get('/getAllSpeciality',specialityController.getAllSpeciality)
    app.get('/getSpecialityById/:_id',specialityController.getSpecialityById)
    app.get('/searchSpeciality/:speciality_search',specialityController.searchSpeciality)

    

    const notifController=require('../controllers/notif.controller');

    app.get('/getAllNotifByUserId/:user_id',notifController.getAllNotifByUserId)
    app.put('/markAsSeen/:user_id/:course_id',notifController.markAsSeen)


//    const subsController=require('../controllers/subscribe.controller');
//    app.post('/createSpeciality',specialityController.createSpeciality)
//    app.get('/getTeacherSub',subsController.getTeacherSub)
//    app.get('/getStudentSub',subsController.getStudentSub)


    const favorisController=require('../controllers/favoris.controller');

    app.post('/createFavoris',favorisController.createFavoris)
    app.delete('/deleteOneFavoris/:user_id/:course_id',favorisController.deleteOneFavoris)
    app.delete('/deleteSelectionFavoris/:user_id',favorisController.deleteSelectionFavoris)
    app.get('/getAllFavoris',favorisController.getAllFavoris)



    const likesController=require('../controllers/like.controller');

    app.post('/createLike',likesController.createLike)
    app.delete('/deleteOneLike/:user_id/:question_id/:reponse_id',likesController.deleteOneLike)
    app.get('/getAllLikes',likesController.getAllLikes)


    const visiteController=require('../controllers/visite.controller');

    app.get('/getVisiteByCoursId/:course_id',visiteController.getVisiteByCoursId)
    app.post('/createVisite',visiteController.createVisite)

    const sockController=require('../controllers/sock.controller');

    app.post('/createSock',sockController.createSock)
   
    app.get('/getAllSocks/:user1/:user2',sockController.getAllSocks)
    
    app.get('/getUsersSock/:user1',sockController.getUsersSock)

    
    app.put('/markAsSeenSock/:user1/:user2',sockController.markAsSeenSock)

}