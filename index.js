require('dotenv').config();
const express = require('express');
const axios = require('axios').default;
const fastXmlParser = require('fast-xml-parser');
const cors = require('cors');

const apiKey = process.env.API_KEY;
const apiPassword = process.env.API_PASSWORD;

const apiUrl = 'http://aisweb.decea.gov.br/api/?apiKey=' + apiKey + '&apiPass=' + apiPassword;

const server = express();


server.use(cors());

// Cartas
server.get('/cartas', async (req, res) => {
  let query = req.query;

  if (query.icaoCode !== undefined) {
      let response = await axios.get(`${apiUrl}&area=cartas&icaoCode=${query.icaoCode}`, { "Content-Type": "application/xml; charset=utf-8" })
      let result = response.data;
      let parsedResult = parseResult(result);
      return res.send(parsedResult);
  } else {
    axios.get(`${apiUrl}&area=cartas`, { "Content-Type": "application/xml; charset=utf-8" })
    .then(response => {
      let result = response.data;
      let parsedResult = parseResult(result);
      return res.send(parsedResult);
    })
  }
});

//Metar & TAF
server.get('/metar', (req, res) => {
  let query = req.query;
  if (query.icaoCode) {
    axios.get(`${apiUrl}&area=met&icaoCode=${query.icaoCode}`, { "Content-Type": "application/xml; charset=utf-8" })
      .then((response) => {
        let result = response.data;
        let parsedResult = parseResult(result);
        return res.send(parsedResult);
      })
      // .catch(() => {
      //   return axios.get()
      // }); 
  } else {
    res.code = 403
    return res.send('Invalid Request - IcaoCode is required!');
  }
});

// NOTAM
server.get('/notam', (req, res) => {
  let query = req.query;
  if (query.icaoCode) {
    axios.get(`${apiUrl}&area=notam&icaoCode=${query.icaoCode}`, { "Content-Type": "application/xml; charset=utf-8" })
      .then((response) => {
        let result = response.data;
        let parsedResult = parseResult(result);
        return res.send(parsedResult);
      })
  } else {
    axios.get(`${apiUrl}&area=notam`, { "Content-Type": "application/xml; charset=utf-8" })
    .then(response => {
      let result = response.data;
      let parsedResult = parseResult(result);
      return res.send(parsedResult);
    })
  }
});

// Tabela Nascer e Por do Sol
server.get('/sol', (req, res) => {
  let query = req.query;
  if (query.icaoCode) {
    axios.get(`${apiUrl}&area=sol&icaoCode=${query.icaoCode}`, { "Content-Type": "application/xml; charset=utf-8" })
      .then((response) => {
        var result = response.data;
        var parsedResult = parseResult(result);
        return res.send(parsedResult);
      })
  } else {
    res.code = 403
    return res.send('Invalid Request - IcaoCode is required!');
  }
});

// ROTAER 
server.get('/rotaer', (req, res) => {
  let query = req.query;
  if (query.icaoCode) {
    axios.get(`${apiUrl}&area=rotaer&icaoCode=${query.icaoCode}`, { "Content-Type": "application/xml; charset=utf-8" })
      .then((response) => {
        let result = response.data;
        let parsedResult = parseResult(result);
        return res.send(parsedResult);
      })
  } else {
    axios.get(`${apiUrl}&area=rotaer`, { "Content-Type": "application/xml; charset=utf-8" })
    .then(response => {
      let result = response.data;
      let parsedResult = parseResult(result);
      return res.send(parsedResult);
    })
  }
});


// Result Parser
function parseResult(result) {
  let jsonObj = fastXmlParser.parse(result);
  return jsonObj;

};



server.listen(process.env.PORT || 3000, () => {
  console.log("API Aberta");
});
