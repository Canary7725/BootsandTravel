const { exec } = require("child_process");

exports.predict = (req, res) => {
  const { month, year } = req.body;

  // Call the Python script to get the prediction
  exec(
    `python3 backend/scripts/trainModel.py ${month} ${year}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send(error);
      }
      res.send(stdout);
    }
  );
};
