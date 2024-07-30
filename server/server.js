const { spawn } = require("child_process");
const fs = require("fs");
const readline = require("readline");
const path = require("path");
const dotenv = require("dotenv");

// Load env variables to the global variable process.env
dotenv.config({ path: "../.env.dev" });
dotenv.config({ path: "../.env" });

// Parse command line arguments
const cacheTime = process.argv[2] || process.env.DEV_SERVER_CACHE_SECONDS || -1; // Caching in seconds or -1 for no caching
const port = process.argv[3] || process.env.DEV_SERVER_PORT || 3005;
const destFolder = process.argv[4] || "../build_dev";

// Ensure dest folder exists
const absoluteDestPath = path.resolve(process.cwd(), destFolder);

// Create the target folder if it doesn't exist
if (!fs.existsSync(absoluteDestPath)) {
  fs.mkdirSync(absoluteDestPath);

  if (!fs.existsSync(absoluteDestPath)) {
    console.error(
      `Error: The specified dest folder does not exist: ${absoluteDestPath}`
    );
    process.exit(1);
  }
}

// Start http-server
const httpServer = spawn("npx", [
    "http-server",
    absoluteDestPath,
    "-p",
    port.toString(),
    "--cors",
    "--gzip",
    "-c" + cacheTime,
    "-P",
    `http://localhost:${port}?`, // Enable HTTPS redirect
    ]
);

httpServer.stdout.on("data", (data) => {
    console.log(`http-server: ${data}`);
});

httpServer.stderr.on("data", (data) => {
    console.error(`http-server error: ${data}`);
});

console.log(`Starting HTTP server for ${absoluteDestPath} on port ${port}`);

// If there is no tunnel URL, create a quick tunnel
if (process.env.TUNNEL_URL) {
    console.log("Press Ctrl+C to stop both the server");
} else {
    // Determine the cloudflared executable name based on the platform
    const cloudflaredExecutable = process.platform === "win32" ? "cloudflared.exe" : "cloudflared";

    // Start Cloudflare tunnel
    const cloudflared = spawn(cloudflaredExecutable, [
        "tunnel",
        "--url",
        `http://localhost:${port}`,
    ]);

    const rl = readline.createInterface({
        input: cloudflared.stderr,
        crlfDelay: Infinity,
    });

    const infoFile = path.resolve(absoluteDestPath, "quick-tunnel.txt");

    rl.on("line", (line) => {
        console.log(`cloudflared: ${line}`);

        if (line.includes("https://")) {
            const match = line.match(/(https:\/\/[^\s]+)/);
            if (match) {
            const url = match[0];
            fs.writeFile(infoFile, url, (err) => {
                if (err) {
                console.error("Error writing to file:", err);
                } else {
                console.log(`Tunnel URL saved to ${infoFile}`);
                }
            });
            }
        }
    });

    cloudflared.stdout.on("data", (data) => {
        console.log(`cloudflared stdout: ${data}`);
    });

    process.on("SIGINT", () => {
        console.log("Shutting down...");
        cloudflared.kill();
        httpServer.kill();
        process.exit();
    });

    cloudflared.on("close", (code) => {
        console.log(`Cloudflare tunnel process exited with code ${code}`);
        httpServer.kill();
    });

    httpServer.on("close", (code) => {
        console.log(`http-server process exited with code ${code}`);
        cloudflared.kill();
    });

    cloudflared.on('error', (error) => {
        if (error.code === 'ENOENT') {
            console.error(`Error: Command '${cloudflaredExecutable}' not found. Please make sure it's installed and in your PATH.`);
        } else {
            console.error(`Error spawning process: ${error.message}`);
        }
    });

    console.log("Starting Cloudflare quick tunnel");
    console.log("Press Ctrl+C to stop both the server and the tunnel");
}
