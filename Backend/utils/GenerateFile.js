import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';
import path from 'path';
import * as fs from 'fs';

const generateFile = async (filecontent, extension) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dirCodes = path.join(__dirname, "codes");
    if (!fs.existsSync(dirCodes)) {
        fs.mkdirSync(dirCodes, { recursive: true });
    }
    const filename = `${uuid()}.${extension}`;

    const filePath = path.join(dirCodes, filename);
    fs.writeFileSync(filePath, filecontent);
    return filePath;
}

const generateInputFile = async (filecontent="", filePath, extension) => {
    const filename = path.basename(filePath, extension)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dirCodes = path.join(__dirname, "inputs");

    if (!fs.existsSync(dirCodes)) {
        fs.mkdirSync(dirCodes, { recursive: true });
    }
    const inputfilename = `${filename.split('.')[0]}.txt`;
    const inputFilePath = path.join(dirCodes, inputfilename);
    fs.writeFileSync(inputFilePath, filecontent);
    return inputFilePath;
}

const deleteFile = async(filePath) => {
    fs.rm(filePath, { force: true }, () => {});
}

const generateOutputFile = async (filePath, extension) => {
    const filename = path.basename(filePath, extension)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dirCodes = path.join(__dirname, "outputs");

    if (!fs.existsSync(dirCodes)) {
        fs.mkdirSync(dirCodes, { recursive: true });
    }
    const outputfilename = `${filename.split('.')[0]}.out`;
    const outputFilePath = path.join(dirCodes, outputfilename);
    return outputFilePath;
}

export {generateFile, generateInputFile, deleteFile, generateOutputFile};