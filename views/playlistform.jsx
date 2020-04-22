const React = require('react');
const Template = require('./template');

class PlaylistForm extends Template {
  constructor(props) {
    super(props);
    this.title = "Add New Playlist"; // switch it up if it's an edit?
  }

  renderContent() {
    return (
      <h1>someday we'll have a form</h1>
    );
  }
}

module.exports = PlaylistForm;
