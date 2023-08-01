// This is a Node.js script that you'd run before building your Docusaurus site.
const sizeOf = require('image-size');
const path = require('path');
const fs = require('fs');

// Replace with your actual image directory path.
const IMAGES_DIR = path.resolve(__dirname, '../static/img');

const imageDimensions = {};

// This function recursively scans a directory for image files.
function scanDir(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            scanDir(fullPath);
        } else if (entry.isFile() && (entry.name.endsWith('.png') || entry.name.endsWith('.jpg'))) {
            const dimensions = sizeOf(fullPath);
            // We'll use the full path, relative to IMAGES_DIR, as the key in the JSON file.
            const key = path.relative(IMAGES_DIR, fullPath);
            imageDimensions[key] = dimensions;
        }
    }
}

// Start scanning from the base directory.
scanDir(IMAGES_DIR);

// Write the dimensions object to a JSON file.
fs.writeFileSync(path.resolve(__dirname, '../static/img/dimensions.json'), JSON.stringify(imageDimensions, null, 2));
