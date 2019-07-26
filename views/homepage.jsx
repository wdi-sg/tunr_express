var React = require('react');
var HEAD = require('./layouts/head.jsx');
var BANNER = require('./layouts/banner.jsx');
var BODY = require('./layouts/body.jsx');

class HomePage extends React.Component {
  render() {


   return ( 
      <html>
        <HEAD>
          <title> Tunr 1.0 : Homepage </title>
        </HEAD>
        <BODY>
        <BANNER />
        </BODY>
      </html>
    );
  }
}

module.exports = HomePage;
