const { google } = require("googleapis");
const authentication = require("./authentication");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const SHEET_ID = "10ltst1stu-vpzX2qWrDqWLgp7OJJ5BtUEoVPy_btJ_w";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));
app.get("/", (req, res) => {
  res.sendfile("index.html");
});

app.get("/getData", (req, res) => {
  const auth = authentication.getAuth().then(auth => {
    // console.log(res);
    const sheets = google.sheets("v4");
    sheets.spreadsheets.values.get(
      {
        auth: auth,
        spreadsheetId: SHEET_ID,
        range: "Sheet1" //Change Sheet1 if your worksheet's name is something else
      },
      (err, response) => {
        if (err) {
          console.log("The API returned an error: " + err);
          return;
        }
        var rows = response.data.values;
        if (rows) {
          res.json(rows);
        } else {
          res.json(false);
        }
        return;
      }
    );
  });
});

app.get("/getDownloadUrl", (req, res) => {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=xlsx&amp;id=${SHEET_ID}`;
  res.json({ url });
});

app.post("/updateData", (req, res) => {
  const auth = authentication.getAuth().then(auth => {
    const rowPos = req.body.rowPos;
    const colPos = req.body.colPos;
    const notation = colPos + rowPos;
    const value = req.body.value;

    const sheets = google.sheets("v4");
    sheets.spreadsheets.values.update(
      {
        auth: auth,
        spreadsheetId: SHEET_ID,
        range: `Sheet1!${notation}:${notation}`,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[value]]
        }
      },
      (err, response) => {
        if (err) {
          console.log("The API returned an error: " + err);
          return;
        }

        var rows = response.data.values;
        res.json(rows);
        return;
      }
    );
  });
});

app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
