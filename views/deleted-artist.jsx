var React = require('react');

class DeletedArtist extends React.Component {
    render() {
        return(
            <html>
                <body>
                    <h1>Successfully Deleted Artist!</h1>
                    <button><a href= "/artists/">Home</a></button>
                </body>
             </html>
        )
    }
}

module.exports = DeletedArtist;