This is a google sheets application built using nodejs as backend in whicj you can edit an existing google sheet using the sheet id.

Steps to follow

1.) Go to this url to generate credentials.json in order for this application to work
URL: https://accounts.google.com/ServiceLogin/signinchooser?service=cloudconsole&passive=1209600&osid=1&continue=https%3A%2F%2Fconsole.developers.google.com%2Fstart%2Fapi%3Fid%3Dsheets.googleapis.com&followup=https%3A%2F%2Fconsole.developers.google.com%2Fstart%2Fapi%3Fid%3Dsheets.googleapis.com&flowName=GlifWebSignIn&flowEntry=ServiceLogin

2.) Create a project in google console and activate sheets api.

3.) Go to credentials tab

4.) Then go to OAuth consent screen tab

5.) Select an email address enter project name and save it.

6.) Go to credentials tab right next to it select OAuth client ID and then Select the application type Other and enter the name and click the Create button.

7.) You will now see a list of credentials been generated next to it will be a download button click it.

8.) Rename the file to credentials.json and save in project root directory. (The content will something like dummy-credentials.json file).

9.) In index.js replace the constant SHEET_ID with your google sheet id.
