const getMegaStorage = require('../config/mega').getMegaStorage;
const MegaUtils = require('../utils/megaUtils');
const streamToPromise = require('stream-to-promise');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const Bet = require('../models/Bet');


const getFolders = async () => {
    try {
        const storage = await getMegaStorage();
        const elements = storage.root.children;
        const folders = [];

        elements.forEach(element => {
            if (element.directory) {
                folders.push({
                    name: element.name,
                    id: element.nodeId
                });
            }
        });

        if (folders.length > 0) {
            return folders;
        } else {
            return { error: 'No folders found' };
        }
    } catch (error) {
        throw new Error(error);
    }
};


const getElements = async () => {
    try {
        const storage = await getMegaStorage();
        const elements = storage.root.children;
        const elementsResult = [];

        elements.forEach(element => {
            if (element) {
                elementsResult.push({
                    name: element.name,
                    id: element.nodeId,
                });
            }
        });

        if (elementsResult.length > 0) {
            return elementsResult;
        } else {
            return { error: 'No elements found' };
        }
    } catch (error) {
        throw new Error(error);
    }
};


const downloadFile = async (nodeId) => {
    try {
        const storage = await getMegaStorage();
        const fileNode = storage.root.children.find(node => node.nodeId === nodeId);

        if (!fileNode) {
            throw new Error('File not found');
        }

        const fileStream = fileNode.download();
        const buffer = await streamToPromise(fileStream);
        let responseObject = {
            fileName: fileNode.name,
            size: fileNode.size,
            type: fileNode.name.split('.').pop(),
            buffer: buffer.toString('base64')
        }
        return responseObject;
    } catch (error) {
        throw new Error(`Error in downloadFileAsBase64: ${error.message}`);
    }
};

const createUser = async (id) => {
    try {

        const usersFolder = await MegaUtils.retrieveFolder('USERS');
        const exists = await MegaUtils.checkIfElementAlredyExists(usersFolder, id);
        if (exists) {
            throw new Error('User already exists');
        }
        const user = new User(id, []);
        const userData = JSON.stringify(user, null, 2);
        await usersFolder.upload(`${id}.json`, userData);
        return true;

    } catch (error) {
        throw new Error(`Error in createUser: ${error.message}`);
    }
};

const createBet = async (id) => {
    try {

        const betFolder = await MegaUtils.retrieveFolder('BETS');
        const exists = await MegaUtils.checkIfElementAlredyExists(betFolder, id);
        if (exists) {
            throw new Error('User already exists');
        }
        const bet = new Bet(id, 0, []);
        const betData = JSON.stringify(bet, null, 2);
        await betFolder.upload(`${id}.json`, betData);
        return true;
    } catch (error) {
        throw new Error(`Error in createBet: ${error.message}`);
    }
};

const deleteBet = async (id) => {
    try {
        const betFolder = await MegaUtils.retrieveFolder('BETS');
        const file = await MegaUtils.findFile(betFolder, id);
        await file.delete();
        return true;
    } catch (error) {
        throw new Error(`Error in deleteBet: ${error.message}`);
    }
};


module.exports = {
    getFolders,
    getElements,
    downloadFile,
    createUser,
    createBet,
    deleteBet
};