require('dotenv').config();
const express = require('express');
const axios = require('axios').default;
const fastXmlParser = require('fast-xml-parser');

const apiKey = process.env.API_KEY;
const apiPassword = process.env.API_PASSWORD;

const apiUrl = 'http://aisweb.decea.gov.br/api/?apiKey=' + apiKey + '&apiPass=' + apiPassword;

const server = express();

// Cartas
server.get('/cartas', async (req, res) => {
  let query = req.query;

  if (query.icaoCode !== undefined) {
    axios.get(`${apiUrl}&area=cartas&icaoCode=${query.icaoCode}`, { "Content-Type": "application/xml; charset=utf-8" })
      .then((response) => {
        var result = response.data;
        var parsedResult = parseResult(result);
        return res.send(parsedResult);
      })
  } else {
    axios.get(`${apiUrl}&area=cartas`, { "Content-Type": "application/xml; charset=utf-8" })
    .then(response => {
      var result = response.data;
      var parsedResult = parseResult(result);
      return res.send(parsedResult);
    })
  }
});


//Metar
server.get('/metar', (req, res) => {
  let query = req.query;
  if (query.icaoCode) {
    axios.get(`${apiUrl}&area=met&icaoCode=${query.icaoCode}`, { "Content-Type": "application/xml; charset=utf-8" })
      .then((response) => {
        var result = response.data;
        var parsedResult = parseResult(result);
        return res.send(parsedResult);
      })
  } else {
    res.code = 403
    return res.send('Invalid Request');
  }

})

// Result Parser
function parseResult(result) {
  var jsonObj = fastXmlParser.parse(result);
  return jsonObj;

};



server.listen(process.env.PORT || 3000);





// let query = req.query;

//   if (query.icaoCode !== undefined) {
//     axios.get(`${apiUrl}&area=cartas&icaoCode=${query.icaoCode}`, { "Content-Type": "application/xml; charset=utf-8" })
//       .then((response) => {
//         var result = response.data;
//         var parsedResult = parseResult(result);
//         return res.send(parsedResult);
//       })
//   } else {
//     res.code = 403
//     return res.send('Invalid Request');
//   }