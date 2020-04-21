const React = require('react');
const Template = require('./template');

class ContentPage extends Template {
  constructor(props) {
    super(props);
    this.title = "Content Title";
    this.count = props.sitecount || "YOU DIDN'T PASS A COUNTER (sitecount)";
  }

  renderContent() {
    return (
      <h1>BANANA!</h1>
    );
  }
}

module.exports = ContentPage;
