const { log } = require('console');
var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {

    home: function(req, res){
        return res.status(200).send({
            message: "Soy Home"
        })
    },
    test: function(req, res){
        return res.status(200).send({
            message: "Soy test"
        })

    },

    saveProject: async function(req, res){
        try {
            var project = new Project();
            var params = req.body;

            project.name = params.name;
            project.description = params.description;
            project.category = params.category;
            project.langs = params.langs;
            project.year = params.year;
            project.image = null;

            projectStored = await project.save();

            return res.status(200).send({
                project: projectStored
            })
        } catch (err) {
            return res.status(500).send({
                message: "Error en el servidor:" + err
            })
        }
    },

    getProject: async function(req, res){
        var projectId = req.params.id;

        if (projectId == null){
            return res.status(404).send({message: "El proyecto no existe"});
        }

        Project.findById(projectId)
            .then(project => {
                if (!project) {
                    return res.status(404).send({message: "El proyecto no existe"});
                }
        
                return res.status(200).send({project});
            })
            .catch(err => {
                return res.status(500).send({message: "Error en la peticion"});
            });
        
    },

    getProjects: function(req, res){

        Project.find()
        .then(projects =>{
            return res.status(200).send({
                projects
            })
        })
        .catch(err =>{
            return res.status(500).send({
                message: "Error en la peticion"
            })
        })

    },

    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;

        if (projectId == null){
            return res.status(404).send({message: "El proyecto no existe"});
        }

        Project.findByIdAndUpdate(projectId, update, {new: true})
            .then(project => {
                if (!project) {
                    return res.status(404).send({message: "El proyecto no existe"});
                }
                return res.status(200).send({project});
            })
            .catch(err => {
                return res.status(500).send({message: "Error en la peticion"});
            })

    },

    deleteProject: function(req, res){
        var projectId = req.params.id;

        Project.findByIdAndDelete(projectId)
        .then(project => {
            if (!project) {
                return res.status(404).send({message: "El proyecto no existe"});
            }
            return res.status(200).send({project});
        })
        .catch(err => {
            return res.status(500).send({message: "Error en la peticion"});
        })
    },

    uploadImage: function(req, res){
        var projectId = req.params.id;
        var file_name = 'No subido...';

        if (req.files){
            
            var file_path = req.files.image.path;
            var file_split = file_path.split('\\')
            var file_name = file_split[1];
            var ext_split = file_name.split('\.');
            var file_ext = ext_split[1];

            if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){

                Project.findByIdAndUpdate(projectId, {image: file_name}, {new: true})
                .then(project => {
                    if (!project) {
                        return res.status(404).send({message: "El proyecto no existe"});
                    }
                    return res.status(200).send({project});
                })
                .catch(err => {
                    return res.status(500).send({message: "Error en la peticion"});
                })

            }else{
                fs.unlink(file_path, (err) =>{
                    return res.status(200).send({message: "La extension no es valida"})
                })
            }
        }
    },

    getImageFile: function(req, res){
        var file = req.params.image;
        var file_path = './uploads/' + file;
    
        fs.exists(file_path, (exists) => {
            if (exists){
                return res.sendFile(path.resolve(file_path) );
            } else {
                return res.status(404).send({message: "La imagen no existe"});
            }
        });
    }
    
        
}

module.exports = controller;