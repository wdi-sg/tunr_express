var React = require ('react');
var DefaultLayout = require('./default');

class UpdatedSong extends React.Component {
    render() {
        return(
            <DefaultLayout>
                <h1>Successfully updated Song!</h1>
            </DefaultLayout>

        )
    }
}

module.exports = UpdatedSong;