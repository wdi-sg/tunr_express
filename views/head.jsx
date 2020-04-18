const React = require('react');

class Head extends React.Component {
  render() {
    return (
      <head>
        <link rel="stylesheet" href="/pub/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/pub/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/pub/css/bootstrap-checkbox-radio-list-group-item.min.css" />
      </head>
    );
  }
}

module.exports = Head;
