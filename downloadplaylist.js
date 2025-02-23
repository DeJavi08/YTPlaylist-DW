const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawn } = require('child_process');
const ProgressBar = require('progress');

const CONFIG_FILE = 'config.json';

function checkDependencies() {
    if (!fs.existsSync(CONFIG_FILE)) {
        console.log("Config file not found. Creating a new one...");
        fs.writeFileSync(CONFIG_FILE, JSON.stringify({ ytDlpPath: "", ffmpegPath: "" }, null, 4));
        console.log("Please fill in the paths for yt-dlp and ffmpeg in config.json");
        process.exit(1);
    }
    
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE));
    if (!fs.existsSync(config.ytDlpPath) || !fs.existsSync(config.ffmpegPath)) {
        console.log("\nDependencies not found!\n");
        console.log("Download yt-dlp: https://github.com/yt-dlp/yt-dlp/releases");
        console.log("Download ffmpeg: https://ffmpeg.org/download.html\n");
        console.log("After downloading, update the paths in config.json and restart the program.\n");
        process.exit(1);
    }
    return config;
}

function displayHeader() {
    console.log("\x1b[33m");
    console.log("███████╗██╗░░░░░░█████╗░░██████╗██╗░░██╗");
    console.log("██╔════╝██║░░░░░██╔══██╗██╔════╝██║░░██║");
    console.log("█████╗░░██║░░░░░███████║╚█████╗░███████║");
    console.log("██╔══╝░░██║░░░░░██╔══██║░╚═══██╗██╔══██║");
    console.log("██║░░░░░███████╗██║░░██║██████╔╝██║░░██║");
    console.log("╚═╝░░░░░╚══════╝╚═╝░░╚═╝╚═════╝░╚═╝░░╚═╝");
    console.log("\x1b[0m");
}

function promptUser() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question("Select an option: ", (choice) => {
        rl.close();
        handleMenuChoice(choice);
    });
}

function handleMenuChoice(choice) {
    switch (choice) {
        case "1":
            startConversion();
            break;
        case "2":
            console.log("\nDeveloper: DeJavi08");
            console.log("GitHub: https://github.com/DeJavi08");
            console.log("Source Code: https://github.com/DeJavi08/YTPlaylist-DW\n");
            displayMenu();
            break;
        case "3":
            console.log("\nDonate me: https://saweria.co/DeJavi08\n");
            displayMenu();
            break;
        case "4":
            console.log("Exiting program...");
            process.exit(0);
            break;
        default:
            console.log("Invalid choice! Please select a valid option.");
            displayMenu();
    }
}

function displayMenu() {
    displayHeader();
    console.log("\n[1] Start Converting Youtube Playlist");
    console.log("[2] About Developer");
    console.log("[3] Donate Me");
    console.log("[4] Exit Program\n");
    promptUser();
}

function startConversion() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question("Enter output folder path: ", (outputPath) => {
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        }
        rl.question("Enter YouTube playlist link (e.g. https://youtube.com/playlist?list=...): ", (playlistUrl) => {
            console.log("\nChoose format:");
            console.log("[1] MP3");
            console.log("[2] MP4");
            rl.question("Select format (1/2): ", (formatChoice) => {
                const format = formatChoice === "1" ? "mp3" : "mp4";
                console.log("\nChoose quality:");
                const qualityOptions = format === 'mp3' 
                    ? ["128kbps", "192kbps", "320kbps"] 
                    : ["720p", "1080p"];
                qualityOptions.forEach((q, i) => console.log(`[${i+1}] ${q}`));
                rl.question("Select quality (1/2/3): ", (qualityChoice) => {
                    const quality = qualityOptions[parseInt(qualityChoice) - 1];
                    console.log(`\nStarting download in ${format} format with ${quality} quality...`);
                    downloadPlaylist(outputPath, playlistUrl, format, quality);
                    rl.close();
                });
            });
        });
    });
}

function downloadPlaylist(outputPath, playlistUrl, format, quality) {
    const config = checkDependencies();
    const args = [
        playlistUrl,
        "-o", path.join(outputPath, "%(title)s.%(ext)s"),
        "--ffmpeg-location", config.ffmpegPath,
        "--newline"
    ];
    
    if (format.toLowerCase() === 'mp3') {
        args.push("-f", "bestaudio", "--extract-audio", "--audio-format", "mp3", "--audio-quality", quality);
    } else {
        args.push("-f", `bestvideo[height<=${quality}]+bestaudio/best[height<=${quality}]`, "--merge-output-format", "mp4");
    }
    
    const downloader = spawn(config.ytDlpPath, args);
    let progressBar = null;

    downloader.stdout.on("data", (data) => {
        const output = data.toString();
        const match = output.match(/\[download\]\s+(\d+\.\d+)% of ~?\s*([\d.]+\w+)/);
        if (match) {
            const percent = parseFloat(match[1]);
            const totalSize = match[2];
            if (!progressBar) {
                progressBar = new ProgressBar(`Downloading [:bar] :percent of ${totalSize}`, {
                    total: 100,
                    width: 40,
                    complete: '=',
                    incomplete: ' ',
                });
            }
            progressBar.update(percent / 100);
        }
        console.log(output);
    });

    downloader.stderr.on("data", (data) => {
        console.error(data.toString());
    });

    downloader.on("close", (code) => {
        if (code === 0) {
            console.log("Download completed successfully!");
        } else {
            console.log(`Download process exited with code ${code}`);
        }
        displayMenu();
    });
}

const config = checkDependencies();
displayMenu();
