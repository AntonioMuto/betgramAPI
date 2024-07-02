const megaService = require('../services/megaService');

exports.getFolders = async (req, res, next) => {
    try {
        const folders = await megaService.getFolders();
        res.json(folders);
    } catch (error) {
        next(error);
    }
};

exports.getElements = async (req, res, next) => {
    try {
        const elements = await megaService.getElements();
        res.json(elements);
    } catch (error) {
        next(error);
    }
};

exports.downloadElement = async (req, res, next) => {
    try {
        const id = req.params.id
        const fileInfo = await megaService.downloadFile(id, "Screenshot 2024-03-24 180017.png");
        res.json( fileInfo);
    } catch (error) {
        next(error);
    }
};