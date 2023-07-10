"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INPUT = exports.OUTPUT_PATH = exports.SCOPE = exports.API_VERSION = void 0;
exports.API_VERSION = '2021-05-01-preview';
exports.SCOPE = 'https://management.azure.com/.default';
exports.OUTPUT_PATH = './uploading-file.tar.gz';
exports.INPUT = {
    connection: 'AZURESUBSCRIPTIONENDPOINT',
    source: 'SOURCECONFIGFOLDERPATH',
    target: 'TARGETCONFIGFOLDERPATH',
    subscription: 'SUBSCRIPTIONID',
    resource: 'RESOURCEGROUPNAME',
    deployment: 'DEPLOYMENTNAME',
};
