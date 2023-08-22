var express = require('express');
var projectController = require('../controllers/project');


var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({
    uploadDir: './uploads'
});

router.get('/home', projectController.home);
router.post('/test', projectController.test);
router.post('/save-project', projectController.saveProject);
router.get('/get-project/:id?', projectController.getProject);
router.get('/get-projects', projectController.getProjects);
router.put('/update-project/:id?', projectController.updateProject);
router.delete('/delete-project/:id?', projectController.deleteProject);
router.post('/upload-image/:id?', multipartMiddleware, projectController.uploadImage);
router.get('/get-image/:image', projectController.getImageFile);

module.exports = router;

