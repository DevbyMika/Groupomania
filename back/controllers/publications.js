const models = require ('../models');

module.exports = {

    createPublication : function(req, res){
    const publication = {
        userId:req.body.id,
        content: req.body.content,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
    }
    models.Publication.create(publication).then(result => {
        res.status(201).json({
            message: 'Publication created successfully',
            post: result
        });
        }).catch(error => {
            console.log(res);
            res.status(500).json({
                message: 'Something went wrong',
                error: error
            })
        });
    },
    getOnePublication : function(req, res){
        const id = req.params.id;
        models.Publication.findByPk(id).then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json({
                message: 'Something went wrong'});
        });
    },

    getAllPublication: function(req, res){
        models.Publication.findAll().then(result => {
            res.status(200).json(result);
        }) .catch(error => {
            res.status(500).json({
                message: 'Something went wrong'});
        });
    },
    updatePublication : function(req,res){
        const id = req.params.id;
        const updatedPublication ={
            content: req.body.content,
            imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
        }

        const userId = req.body.userId;

        models.Publication.update(updatedPublication, {where: {id : id, userId :userId}})
        .then(result => {
            res.status(200).json({
            message:"publication updated successfully",
            publication: updatedPublication
        });
    }).catch(error => {
        res.status(200).json({
            message: "Somenthing went wrong",
        });
    })
    },
    //likeDislikePublication: function(req,res){
    //    const userId = req.body.userId
    //    const like = req.body.like
    //    const publicationId = req.params.id
    //    models.Publication.findOne({where: {id: publicationId}})
    //        .then(publication => {
    //            const newValues = {
    //                usersLiked: publication.usersLiked,
    //                likes:0
    //            }
    //            switch(like){
    //                case 1:
    //                newValues.usersLiked.push(userId)
    //                break
    //                case 0:
    //                newValues.usersLiked.includes(userId)
    //                // delete like
    //                const index = newValues.usersLiked.indexOf(userId)
    //                newValues.usersLiked.splice(index, 1)
    //                break
    //            };
    //            //likes count
    //            newValues.likes = newValues.usersLiked.length
    //            Publication.update({where: {id : publicationId}, newValues})
    //                .then(() => res.status(200).json({ message: 'Like ajouté' }))
    //                .catch(error => res.status(400).json({ error }))
    //        })
    //        .catch(error => res.status(500).json({ error }))
    //},
    destroyPublication: function(req, res){
        const id = req.params.id; 
       // const userId = req.body.userId;

        models.Publication.destroy({where: {id: id}})
        .then(result => {
            res.status(200).json({
            message:"publication deleted successfully"});
    }).catch(error => {
        res.status(200).json({ message: "Somenthing went wrong"
        });
    })
    }

}