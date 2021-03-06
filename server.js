require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cp = require('child_process');

const app = express();
const port = process.env.PORT || 5000;
const post = "";



var Twit = require('twit')

var T = new Twit({

  consumer_key:         'Qu2IjLLOmjQuA3hF8Lh8bkHFL',
  access_token:         '1131194121836814337-QaDcJYCXaaMuueIej4i1urnz5f2jgY',
  consumer_secret:      process.env.consumer_secret,
  access_token_secret:  process.env.access_token_secret,
  
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
  // res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {

  console.log("body: " + req.body);
  res.send(
    `Thanks for tweeting: ${req.body.get("text")}`,
  );

// tweet
  // var mediaID = '';
  // T.post('media/upload', req.body.get("img"), uploaded)

  // function uploaded(err, data, response) {
  //   mediaID = data.media_id_string;
  // }

  var tweet = { 
    	status:  `${req.body.post}`,
			// status:  `${req.body.get("img")}`,
      // media_ids: [mediaID]
	}

	T.post('statuses/update', tweet, tweeted);


		function tweeted (err, data, response) {
			if(err){
				console.log('Tweet could not be sent');
			}
		  	else{
		  		console.log('Tweet sent');
		  	}
		}

// tweet via command line if needed //

//   const command = "node reactbot.js " +  `${req.body.post}`;

//   cp.exec(command, (error, stdout, stderr) => {

//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
//   });

 });

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
