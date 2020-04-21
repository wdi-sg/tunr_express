const React = require('react');

class Foot extends React.Component {
  render() {
    return (
      <footer className="footer mt-auto bg-info text-right">
        <p className="px-3 py-2 m-0 text-white"> Visits: {this.props.count}</p>
      </footer>
    );
  }
}

module.exports = Foot;
