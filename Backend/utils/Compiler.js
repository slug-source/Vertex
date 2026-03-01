import { exec, spawn } from 'child_process';
import { generateOutputFile } from './GenerateFile.js';
import fs from "fs";

export const pyExecute = (filePath, inputPath, timeLimit = 5000) => {
  return new Promise((resolve, reject) => {
    const child = spawn("python", [filePath], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    const inputStream = fs.createReadStream(inputPath);
    inputStream.pipe(child.stdin);
    
    inputStream.on("end", () => {
      child.stdin.end();
    });

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error("Time Limit Exceeded"));
    }, timeLimit);

    child.on("close", (code) => {
      clearTimeout(timer);

      if (code !== 0 && stderr) {
        return reject(new Error(stderr.trim()));
      }

      resolve(stdout);
    });

    child.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
};

export const jsExecute = async (filePath, inputPath) => {
  return new Promise((resolve, reject) => {
    const run = spawn("node", [filePath], {
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true,
    });

    let stdout = "";
    let stderr = "";

    fs.createReadStream(inputPath).pipe(run.stdin);

    run.stdout.on("data", (d) => {
      stdout += d.toString();
    });

    run.stderr.on("data", (d) => {
      stderr += d.toString();
    });

    const timer = setTimeout(() => {
      run.kill("SIGTERM");
      reject(new Error("Program took too long and was stopped"));
    }, 5000);

    run.on("close", (code) => {
      clearTimeout(timer);

      if (code !== 0 && stderr.trim()) {
        return reject(new Error(stderr.trim()));
      }

      resolve(stdout);
    });
  });
};

export const cppExecute = async (filePath, inputPath) => {
  const outputPath = await generateOutputFile(filePath, inputPath);

  await new Promise((resolve, reject) => {
    const compile = spawn("g++", [filePath, "-O2", "-std=c++17", "-o", outputPath], {
      shell: false,
    });

    let compileErr = "";

    compile.stderr.on("data", (d) => (compileErr += d.toString()));

    compile.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(compileErr || "Compilation failed"));
      }
      resolve();
    });
  });

  return new Promise((resolve, reject) => {
    const run = spawn(outputPath, [], {
      stdio: ["pipe", "pipe", "pipe"],
      shell: false,
    });

    let stdout = "";
    let stderr = "";

    import("fs").then(({ createReadStream }) => {
      createReadStream(inputPath).pipe(run.stdin);
    });

    run.stdout.on("data", (d) => (stdout += d.toString()));
    run.stderr.on("data", (d) => (stderr += d.toString()));

    const timer = setTimeout(() => {
      run.kill("SIGTERM");
      reject(new Error("Program took too long and was stopped"));
    }, 5000);

    run.on("close", (code) => {
      clearTimeout(timer);

      if (code !== 0 && stderr.trim()) {
        return reject(new Error(stderr.trim()));
      }
      resolve(stdout);
    });
  });
};

export const extractErrorLine = (raw) => {
  if (!raw) return "Runtime error";

  return raw
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean)
    .filter(line =>
      !line.startsWith("at ") &&                 
      !line.includes("node:internal") &&     
      !line.startsWith("Traceback") &&        
      !line.match(/^[A-Z]:\\/i) &&
      !line.match(/[A-Z]:\\.*\.(js|py|cpp)/i) &&          
      !line.match(/^\/.*\.(js|py|cpp):/i) &&     
      !line.startsWith("file:///") && 
      !line.includes("/app/")   
    );
};

export const normalize = (s = "") =>
        s.replace(/\r\n/g, "\n").trim();