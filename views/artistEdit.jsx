var React = require('react');
var DefaultLayout = require('./layouts/default');
var Form = require('./artistForm');

class artistEdit extends React.Component {
    render() {
        return (
            <DefaultLayout>
                <body>
                    <h3 className="h6">Edit an Artist</h3>
                    <Form artist={this.props.artist}/>
                </body>
            </DefaultLayout>
        );
    }
}


module.exports = artistEdit;