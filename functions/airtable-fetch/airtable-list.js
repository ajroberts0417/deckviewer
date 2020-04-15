// IMPORT THE AIRTABLE.JS PACKAGE
const Airtable = require('airtable');

//pull the required information from your environment variables, which can be set in the Netlify UI
const {AIRTABLE_BASE_ID, AIRTABLE_API_KEY } = process.env;
const API_URL = "https://api.airtable.com"

// CONFIGURE YOUR AIRTABLE BASE CONNECTION
Airtable.configure({
  endpointUrl: API_URL,
  apiKey: AIRTABLE_API_KEY
});
var base = Airtable.base(AIRTABLE_BASE_ID);

/** THIS IS YOUR SERVERLESS FUNCTION */
exports.handler = function(event, context, callback) {

  // THIS FUNCTION FORMATS AND SENDS YOUR RESPONSE BACK TO YOUR FRONT-END
  const send = body => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    });
  }

  const allRecords = []
  base('Card')
    .select({
      maxRecords: 100,
      view: 'Grid view'
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function(record) {
          allRecords.push(record)
        })
        fetchNextPage()
      },
      function done(err) {
        if (err) {
          callback(err)
        } else {
          send(allRecords)
        }
      }
    )
}
