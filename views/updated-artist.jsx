var React = require ('react');

class UpdatedArtist extends React.Component {
    render() {
        return(
            <html>
                <body>
                  <h1>Successfully deleted artist!</h1>
                  <button><a href="/artists/">Home</a></button>
                </body>
            </html>
        )
    }
}

module.exports = UpdatedArtist;