var React = require("react");

class Edit extends React.Component {
  render() {

        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
                </head>
                <body>
                    <h1>Edit artist</h1>
                    <form method="POST" action={`/artist/${this.props.artists[0].id}?_method=PUT`}>
                        Name <input type="text" name="name" value={this.props.artists[0].name}/><br/>
                        Image <input type="text" name="photo_url" value={this.props.artists[0].photo_url}/><br/>
                        Nationality <input type="text" name="nationality" value={this.props.artists[0].nationality}/><br/>
                        <input type="submit" value="Submit"/><br/>
                    </form>
                </body>
            </html>
        );
    }
}

module.exports = Edit;