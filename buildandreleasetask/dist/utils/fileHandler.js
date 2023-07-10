"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHandler = void 0;
const tar_1 = __importDefault(require("tar"));
class FileHandler {
    constructor() {
        this.compressFile = (sourcePath, prefix, outputPath) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield tar_1.default.c({
                    gzip: true,
                    prefix: prefix,
                    file: outputPath,
                    preservePaths: false,
                    cwd: sourcePath,
                }, ['./']);
            }
            catch (error) {
                console.log('An error occered while compressing config file:', error);
            }
            return outputPath;
        });
        this.convertFileToBase64String = (file) => {
            const fs = require('fs');
            const file_buffer = fs.readFileSync(file);
            return file_buffer.toString('base64');
        };
    }
}
exports.FileHandler = FileHandler;
