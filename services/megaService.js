const getMegaStorage = require('../config/mega').getMegaStorage;
const streamToPromise = require('stream-to-promise');

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



module.exports = {
    getFolders,
    getElements,
    downloadFile
};