# HTTP Server with Cloudflare Tunnel

## Introduction

This project provides a simple yet powerful solution for quickly serving local files over the internet using a combination of `http-server` and Cloudflare's Tunnel service. It's designed to be easy to set up and use, making it perfect for developers who need to share their work in progress, demonstrate local builds, or provide temporary access to files.

Key features:

- Serves local files using `http-server`
- Creates a secure tunnel using Cloudflare Tunnel
- Cross-platform compatibility (macOS, Windows, Linux)
- Configurable port and directory settings
- CORS and Gzip support
- Automatic HTTPS redirection

## Prerequisites

- Node.js (version 12.0.0 or higher)
- Yarn (version 1.22.0 or higher)
- Cloudflared CLI tool (installation instructions below)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/http-server-with-cloudflare-tunnel.git
cd http-server-with-cloudflare-tunnel
```

### 2. Install project dependencies

```bash
yarn install
```

### 3. Install Cloudflared

For the latest installation instructions, visit: [Cloudflare Tunnel
Downloads](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/)

Choose the appropriate method for your operating system:

#### macOS

Using Homebrew:

```bash
brew install cloudflared
```

#### Windows

Download and install cloudflared via [winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/):

```bash
winget install --id Cloudflare.cloudflared
```

Alternatively, download the latest release directly from the [Cloudflare GitHub releases page](https://github.com/cloudflare/cloudflared/releases):

1. Download the latest [cloudflared-windows-amd64.exe](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe).
2. Rename the downloaded file to `cloudflared.exe`.
3. Move the file to a directory in your system PATH, or add the directory containing `cloudflared.exe` to your PATH.

#### Linux

You can download and install cloudflared via the [Cloudflare Package Repository](https://pkg.cloudflare.com/).

Alternatively, download the latest release directly:

For Debian/Ubuntu:

```bash
sudo apt-get update && sudo apt-get install cloudflared
```

For other Linux distributions, download the appropriate package from the [Cloudflare GitHub releases page](https://github.com/cloudflare/cloudflared/releases) and install it according to your distribution's package management system.

## Usage

### Starting the server

To start the server with default settings (no caching, port 3005, serving from '../build_dev'):

```bash
yarn start
```

To use custom port and directory:

```bash
yarn start:custom [cache_in_seconds] [port] [dest_folder]
```

Example:

```bash
yarn start:custom 60 8080 ./public
```

This will start the server on port 8080 and serve files from the './public' directory, caching them for 60 seconds.

### Accessing your files

Once the server is running, you'll see output in your terminal including a Cloudflare Tunnel URL. This URL is also saved to a file named `quick_tunnel.txt` in the project directory.

You can share this URL with anyone to give them access to your local files through the tunnel.

### Stopping the server

To stop the server and close the tunnel, press `Ctrl+C` in the terminal where the server is running.

## Configuration

The default configuration serves files from the '../build_dev' directory on port 3005. You can modify these defaults by editing the `server.js` file.

## Permanent URL Solutions

While this project provides a quick and easy way to create temporary tunnels, some developers may require a permanent URL solution. Here are two recommended approaches:

### 1. Web Server with a Proper Domain

Setting up a web server with a dedicated domain is a robust solution for permanent access.

Pros:

- Complete control over your infrastructure
- Can be more cost-effective for long-term use
- Allows for complex configurations and additional services

Cons:

- Requires more setup and maintenance
- May need to handle SSL certificates manually
- Might incur higher initial costs

Steps:

1. Purchase a domain name from a domain registrar.
2. Set up a web server (e.g., Nginx, Apache) on a cloud provider like AWS, Google Cloud, or DigitalOcean.
3. Configure your domain's DNS to point to your server's IP address.
4. Set up SSL certificates (e.g., using Let's Encrypt) for HTTPS.
5. Configure your web server to serve your files or proxy requests to your local development server.

### 2. Permanent Cloudflare Tunnel

Cloudflare offers a paid service called Cloudflare for Teams that includes the ability to create permanent tunnels.

Pros:

- Easier to set up than a full web server
- Managed SSL and DDoS protection
- Can work with dynamic IP addresses

Cons:

- Requires a paid Cloudflare for Teams subscription
- Depends on Cloudflare's infrastructure

Steps:

1. Sign up for a Cloudflare for Teams account.
2. Install the `cloudflared` daemon on your server or development machine.
3. Create a named tunnel in your Cloudflare dashboard.
4. Configure the tunnel to point to your local server.
5. Start the tunnel using the provided configuration.

For detailed instructions, refer to the [Cloudflare Tunnels documentation](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/).

### Choosing the Right Solution

- For production environments or services that need to be always online, a dedicated web server is often the best choice.
- For development environments or situations where you need a permanent link to a changing local environment, a permanent Cloudflare Tunnel might be more suitable.

Consider your specific needs, budget, and technical expertise when choosing between these options.

## Troubleshooting

- If you encounter permission issues when running `cloudflared`, make sure you have the necessary permissions to execute the file.
- If the tunnel fails to start, ensure that the specified port is not already in use by another application.
- For Windows users, if `cloudflared` is not recognized as a command, ensure that it's correctly added to your system's PATH.
- If you're having issues with Yarn, ensure you have the latest version installed by running `yarn --version` and updating if necessary.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [http-server](https://github.com/http-party/http-server) for the simple zero-configuration command-line HTTP server.
- [Cloudflare](https://www.cloudflare.com/) for providing the Tunnel service that makes secure sharing possible.
- [Yarn](https://yarnpkg.com/) for efficient dependency management.
