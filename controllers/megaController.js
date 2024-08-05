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

exports.createUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const uploaded = await megaService.createUser(id);
        res.json( {uploaded: uploaded} );
    } catch (error) {
        next(error);
    }
};

exports.createBet = async (req, res, next) => {
    try {
        const id = req.params.id
        const uploaded = await megaService.createBet(id);
        res.json( {uploaded: uploaded} );
    } catch (error) {
        next(error);
    }
};


exports.deleteBet = async (req, res, next) => {
    try {
        const id = req.params.id
        const deleted = await megaService.deleteBet(id);
        res.json( {deleted: deleted} );
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const id = req.params.id
        const page = req.params.page
        const file = await megaService.getUserById(id,page);
        res.json( file );
    } catch (error) {
        next(error);
    }
};