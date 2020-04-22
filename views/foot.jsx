const React = require('react');

class Foot extends React.Component {
  render() {
    let username = this.props.data.user || "";
    return (
      <footer className="footer mt-auto bg-info text-right">
        <p className="px-3 py-2 m-0 text-white">{username} Visits: {this.props.data.count}</p>
      </footer>
    );
  }
}

module.exports = Foot;
