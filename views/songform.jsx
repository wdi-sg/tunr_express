const React = require('react');
const Template = require('./template');

class SongForm extends Template {
  constructor(props) {
    super(props);
    this.title = "Add New Song"; // switch it up if it's an edit?
  }

  renderContent() {
    return (
      <h1>someday we'll have a form</h1>
    );
  }
}

module.exports = SongForm;
