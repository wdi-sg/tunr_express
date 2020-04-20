const React = require('react');
const Template = require('./template');

class Home extends Template {
  constructor(props) {
    super(props);
    this.title = "Tunr";
    this.count = props.sitecount || "YOU DIDN'T PASS A COUNTER (sitecount)";
  }

  renderContent() {
    return (
      <React.Fragment>
        <p className="h4 text-center text-info">
          Welcome to tunr!
        </p>
      </React.Fragment>
    );
  }
}

module.exports = Home;
