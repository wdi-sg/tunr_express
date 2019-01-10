var React = require("react");
var DefaultLayout = require('./layouts/default');
var Form = require('./songFormByArtist');


class songNewByArtist extends React.Component {
  render() {

    return (

    <DefaultLayout>
        <body>
            <h3 className="h6">Create a New Song</h3>
            <Form songs={this.props.songs} artists={this.props}/>
        </body>
    </DefaultLayout>
    )

  }
}

module.exports = songFormByArtist;