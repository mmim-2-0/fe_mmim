var express = require('express');
var app = express();
app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 8080);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
    app.get('*', (req, res) => {
      const index = path.join(__dirname, 'build', 'index.html');
      res.sendFile(index);
    });
  }

const path =  require("path");
