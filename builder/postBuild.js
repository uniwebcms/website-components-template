const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env files
dotenv.config({ path: '../.env.dev' });
dotenv.config({ path: '../.env' });

const TARGET_MODULE = process.env.TARGET_MODULE;
const PUBLIC_URL = process.env.PUBLIC_URL;

if (!PUBLIC_URL) {
    console.error('PUBLIC_URL must be set in the environment variables.');
    process.exit(1);
}

const distDir = path.join(__dirname, '../dist');

// Function to read the latest version UUID from the latest_version.txt file
function getLatestVersion(moduleDir) {
    const latestVersionFile = path.join(moduleDir, 'latest_version.txt');
    try {
        const data = fs.readFileSync(latestVersionFile, 'utf8');
        return data.split('\n')[0].trim();
    } catch (err) {
        console.error(`Error reading latest version file in ${moduleDir}:`, err);
        return null;
    }
}

// Function to create file mappings for a given build directory
function createFileMappings(buildDir, moduleName, latestVersion) {
    const fileMappings = {};
    try {
        const files = fs.readdirSync(buildDir);
        files.forEach((file) => {
            const filePath = path.join(buildDir, file);
            if (fs.statSync(filePath).isFile()) {
                fileMappings[file] = `${PUBLIC_URL.toLowerCase()}/${moduleName}/${latestVersion}/${file}`;
            }
        });
    } catch (err) {
        console.error(`Error reading files in build directory ${buildDir}:`, err);
    }
    return fileMappings;
}

// Function to write file mappings to manifest.json
function writeManifest(buildDir, fileMappings) {
    const manifestPath = path.join(buildDir, 'manifest.json');
    try {
        fs.writeFileSync(manifestPath, JSON.stringify(fileMappings, null, 2), 'utf8');
        console.log(`Manifest written to ${manifestPath}`);
    } catch (err) {
        console.error('Error writing manifest file:', err);
    }
}

// Main function to process a module
function processModule(moduleName) {
    const moduleDir = path.join(distDir, moduleName);
    const latestVersion = getLatestVersion(moduleDir);

    if (!latestVersion) {
        console.error(`Skipping module ${moduleName} due to missing latest version.`);
        return;
    }

    const buildDir = path.join(moduleDir, latestVersion);
    const fileMappings = createFileMappings(buildDir, moduleName, latestVersion);
    writeManifest(buildDir, fileMappings);
}

// Check the value of TARGET_MODULE
if (TARGET_MODULE === '*') {
    try {
        const modules = fs.readdirSync(distDir).filter((file) => {
            const modulePath = path.join(distDir, file);
            return fs.statSync(modulePath).isDirectory();
        });

        modules.forEach((moduleName) => {
            console.log(`Processing module: ${moduleName}`);
            processModule(moduleName);
        });
    } catch (err) {
        console.error('Error reading module directories:', err);
        process.exit(1);
    }
} else {
    processModule(TARGET_MODULE);
}
