var React = require ('react');
var DefaultLayout = require('./default');

class UpdatedArtist extends React.Component {
    render() {
        return(
            <DefaultLayout>
                <h1>Successfully deleted artist!</h1>
            </DefaultLayout>

        )
    }
}

module.exports = UpdatedArtist;