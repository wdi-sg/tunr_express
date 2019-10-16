var React = require('react');
class EditedArtist extends React.Component {
    render() {
        return (
            <html>
        <body>
          <div>
            <h1>Edited Artist content</h1>
            <div>
                    <h3>Name :</h3>
                    <ul>{this.props.name}</ul>
                    <h3>Photo :</h3>
                    <ul>{this.props.photo_url}</ul>
                    <h3>Nationality:</h3>
                    <ul>{this.props.nationality}</ul>
                     </div>
          </div>
        </body>
      </html>
            )
    }
}


module.exports = EditedArtist;