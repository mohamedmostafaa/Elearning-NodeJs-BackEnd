const Cours = require('../models/course.model');
const Question = require('../models/question.model')
const Reponse = require('../models/reponse.model')
const ObjectId = require('mongodb').ObjectID
const CoursContent = require('../models/cours-content.model')
const LectureContent = require('../models/lecture-content.model')

const TestQcm = require('../models/testQcm.model')
const RepQcm = require('../models/repQcm.model')
const StartQcm = require('../models/startQcm.model')

const Notif = require('../models/notif.model');
const user = require('../models/user');

const Subscribe =require('../models/subscribe.model');
const Favoris = require('../models/favoris.model');

exports.createCours = (req, res) => {
       
       // _idc: new mongoose.Types.ObjectId(),
       
    // course_name:req.body.course_name,
    // subtitle:req.body.subtitle,
    // description:req.body.description,
    // price:req.body.price,
    // createdOn: req.body.createdOn,
    const cours = new Cours(
        req.body,

    )
    // var  result = await cours.save()*  
      cours.save().then(async(result) => {


        req.body.coursContent.map((content) => {

            const newCoursContent = new CoursContent(content);
            newCoursContent.course_id = result._id
            newCoursContent.save().then((res_) => {
                content.lectureContent.map((cont) => {
                    console.log("cont", cont);

                    const newLecture = new LectureContent(cont);
                    newLecture.course_content_id = res_._id
                    newLecture.save().then((res__) => {

                    })
                })

            })
        })
      var teacher = await user.findOne({_id:result.teacher_id})
        
      user.findOne({role:'admin'}).then((admin)=>{
            const newNotif= new Notif({ 
                user_id:admin._id,
                course_id:result._id,
                textNotif:'suivie un nouveau cour postulé par : '+ teacher.firstname
            })
            newNotif.save()

        })

        Subscribe.find({teacher_id:teacher._id}).then((listsub)=>{
            listsub.map(x=> {
                const newNotif= new Notif({ 
                    user_id:x.student_id,
                    course_id:result._id,
                    textNotif:'suivie un nouveau cour postulé par : '+ teacher.firstname
                })
                newNotif.save()

            })

        })

        res.end()
    })


}

exports.updateCours = (req, res) => {
    const b = req.body;
    b.updatedOn = new Date()
    Cours.updateOne({ _id: req.body._id }, b)
        .then((result) => { res.end() })
}



exports.getAllCours = (req, res) => {
    Cours.find()
        .populate('speciality_id')
        .populate('category_id')
        .populate('type_id')
        .populate('filiere_id')
        .populate('teacher_id')
         .sort({'createdOn':-1}).exec()
        .then((result) => { res.json(result) })
}

exports.getTroisCours = (req, res) => {
    Cours.find().limit(3)
        .populate('speciality_id')
        .populate('category_id')
        .populate('type_id')
        .populate('filiere_id')
        .populate('teacher_id')
        
         .sort({'createdOn':-1}).exec()
         
        .then((result) => { res.json(result) })
}

exports.getCoursByTeacherId = (req, res) => {
    Cours.find({ teacher_id: req.params.teacher_id })
        .populate('speciality_id')
        .populate('category_id')
        .populate('type_id')
        .populate('filiere_id')
        .then((result) => { res.json(result) })
}
exports.getCoursById = (req, res) => {
    Cours.findOne({ _id: req.params._id })
        .populate('speciality_id')
        .populate('category_id')
        .populate('type_id')
        .populate('filiere_id')
        .populate('teacher_id')
        .then((result) => { res.json(result) })
}

exports.getContentByCourId = (req, res) => {
    CoursContent.aggregate([
        {
            $match: {
                course_id: ObjectId(req.params.course_id)
            }
        },
        {
            $lookup: {
                from: "lecturecontents",
                localField: "_id",
                foreignField: "course_content_id",
                as: "lectureContent"

            }
        }]).exec((err, result) => {

            res.send(result);


        })

}

exports.deleteContent = (req, res) => {
    LectureContent.deleteMany({ course_content_id: req.params._id }).then(() => {
        CoursContent.deleteOne({ _id: req.params._id }).then(() => {
            res.end()
        })

    })

}


exports.deleteOneCours = (req, res) => {
    const id = req.params._id
    Cours.deleteOne({ _id: id })
        .then((result) => { 
            Favoris.deleteMany({ course_id: id })
            .then((d)=> console.log("deleted"))
            
            res.end() })
  
        
}

exports.deleteSelectionCours = (req, res) => {

    Cours.deleteMany({ _id: { $in: req.body } })
        .then((result) => { res.end() })

}

exports.getCoursByType = (req, res) => {
    Cours.find({ type_id: req.params._idType })
        .populate('speciality_id')
        .populate('category_id')
        .populate('type_id')
        .populate('filiere_id')
        .populate('teacher_id')
        .sort({'createdOn':-1}).exec()
        .then((result) => { res.json(result) })
}

exports.getCoursByCategory = (req, res) => {
    Cours.find({ category_id: req.params._idCategory })
        .populate('speciality_id')
        .populate('category_id')
        .populate('type_id')
        .populate('filiere_id')
        .populate('teacher_id')
        .sort({'createdOn':-1}).exec()
        .then((result) => { res.json(result) })
}

//cours_name_search esem 7otou inta lmohem houwa param fi route te3 router
exports.searchCours = (req, res) => {
   let term =req.params.term.toLowerCase().trim();
   let place=req.params.place;
    Cours.find({ course_name: { $regex: '.*' + req.params.cours_name_search + '.*' } })
        .populate('speciality_id')
        .populate('category_id')
        .populate('type_id')
        .populate('filiere_id')
        .populate('teacher_id')
        .then((result) => { res.json(result) })
}

//
exports.searchCours = (req, res) => {

 
    
    Cours.find()
        .populate('speciality_id')
        .populate('category_id')
        .populate('type_id')
        .populate('filiere_id')
        .populate('teacher_id')
        .then((result) => { 
            var resultat =result.
            filter(x=>x.course_name.toLowerCase().indexOf(req.params.cours_name_search.toLowerCase())>-1)
            res.json(resultat) })
}



//search payee-gratuit-0-2h sup a 2 h
exports.searchCoursGratuit = (req, res) => {

 
    
    Cours.find()
        .populate('speciality_id')
        .populate('category_id')
        .populate('type_id')
        .populate('filiere_id')
        .populate('teacher_id')
        .then((result) => { 
            var gratuit =result.
            filter(x=>x.price==0)
            res.json(gratuit) })
}
//
exports.searchCoursPayee = (req, res) => {

 
    
    Cours.find()
        .populate('speciality_id')
        .populate('category_id')
        .populate('type_id')
        .populate('filiere_id')
        .populate('teacher_id')
        .then((result) => { 
            var payee =result.
            filter(x=>x.price>0)
            res.json(payee) })
}

exports.searchCoursDuration_0_2h = (req, res) => {

 
    
    Cours.find()
        .populate('speciality_id')
        .populate('category_id')
        .populate('type_id')
        .populate('filiere_id')
        .populate('teacher_id')
        .then((result) => { 
            var duration_0_2h =result.
            filter(x=>x.duration>0 && x.duration<120 )
            res.json(duration_0_2h) })
}
exports.searchCoursDuration_sup_2h = (req, res) => {

 
    
    Cours.find()
        .populate('speciality_id')
        .populate('category_id')
        .populate('type_id')
        .populate('filiere_id')
        .populate('teacher_id')
        .then((result) => { 
            var duration_sup_2h =result.
            filter(x=>x.duration>120 )
            res.json(duration_sup_2h) })
}

//qcm
exports.createQcm = (req, res) => {
    const qcm = new TestQcm(req.body)
    qcm.save().then((result) => {

        req.body.reponseqcm.map((content) => {
            const newreponseqcm = new RepQcm(content);
            newreponseqcm.qcm_id = result._id
            newreponseqcm.save().then((res_) => { })
        })
        res.end()
    })


}


exports.getQcmByCourseId = (req, res) => {
    TestQcm.aggregate([
        {
            $match: {
                course_id: ObjectId(req.params.course_id)
            }
        },
        {
            $lookup: {
                from: "repqcms",
                localField: "_id",
                foreignField: "qcm_id",
                as: "reponseqcm"

            }
        }]).exec((err, result) => {
            res.send(result);
        })
}


exports.startQcm = (req, res) => {
    const startQcm = new StartQcm(req.body)
    startQcm.save().then((result) => {
        res.end()
    })
}

exports.hasPassedQcm = (req, res) => {
    StartQcm.findOne({ user_id: req.params.user_id, course_id: req.params.cours_id }).
        then((result) => {
            res.send(result)
        })


}





///question-reponse
exports.createQuestion = (req, res) => {
    const question = new Question(req.body)
    question.save().then((result) => {
        res.end()
    })
}
exports.createReponse = (req, res) => {
    const reponse = new Reponse(req.body)
    reponse.save().then((result) => {
        res.end()
    })
}
//

exports.getQuestionByCourseId = (req, res) => {
    Question.aggregate([
        {
            $match: {
                course_id: ObjectId(req.params.course_id)
            }
        },
        {
            $lookup: {
                from: "reponses",
                localField: "_id",
                foreignField: "question_id",
                as: "listReponses"

            }
        }]).exec((err, result) => {
            Question.populate(result, [{ path: "user_id" }], (error, data) => {
                res.send(data);
            })

        })
}

exports.getAllQuestion = (req, res) => {
    Question.aggregate([
        {
            $match: { course_id: null }
        },
        {
            $lookup: {
                from: "reponses",
                localField: "_id",
                foreignField: "question_id",
                as: "listeReponses"

            }
        }]).exec((err, result) => {
            Question.populate(result, [{ path: "user_id" }, { path: "reponses.user_id" }], (error, data) => {
                res.send(data);
            })

        })
}


exports.deleteCom = (req, res) => {

    Reponse.deleteMany({ question_id: req.params._id }).then(() => {

        Question.deleteOne({ _id: req.params._id }).then(() => {
            res.end()
        })
    })


}




exports.EditCom = (req, res) => {

    Question.updateOne({ _id: req.body._id }, { question: req.body.question }).then(() => {
        res.end()
    })
}



exports.EditRep = (req, res) => {

    Reponse.updateOne({ _id: req.body._id }, { reponse: req.body.reponse }).then(() => {
        res.end()
    })
}

exports.deleteRep = (req, res) => {

    Reponse.deleteOne({ _id: req.params._id }).then(() => {
        res.end()
    })



}


exports.vote = (req, res) => {
    Reponse.findOne({ _id: req.params.reponse_id }).then((rep) => {
        if (rep.votes.indexOf(req.params.user_id) == -1) {
            rep.votes.push(req.params.user_id)
            rep.save().then((result) => {
                res.end()
            })

        }
        else {
            res.end()
        }

    })
}

exports.markAsValid = (req, res) => {

    Reponse.updateOne({ _id: req.params.reponse_id }, { isValid: true }, (err, result) => { res.end() })
}





