const { spawn } = require("child_process");
const path = require("path");

const forecastRevenue = async () => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, "../scripts/forecast.py");
    const pythonProcess = spawn("python", [scriptPath, "predict"]);

    let output = "";
    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        console.error(`Python script error output: ${errorOutput}`);
        return reject(new Error(`Python script exited with code ${code}`));
      }
      try {
        const result = JSON.parse(output);
        resolve(result);
      } catch (err) {
        console.error("Error parsing Python script output:", err);
        reject(new Error(`Failed to parse JSON: ${output}`));
      }
    });
  });
};

module.exports = {
  forecastRevenue,
};
