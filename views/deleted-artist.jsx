var React = require('react');
var DefaultLayout = require('./default');

class DeletedArtist extends React.Component {
    render() {
        return(
            <DefaultLayout>
                <h1>Successfully Deleted Artist!</h1>
            </DefaultLayout>

        )
    }
}

module.exports = DeletedArtist;