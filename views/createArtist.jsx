var React = require("react");

class CreateArtist extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>Create New Artist</title>
                </head>
                <body>
                    <div className="displayContainer">
                        <h1>Create New Artist</h1>
                        <form method="POST" action="/artist">
                <h4>Provide your new artist's details here:</h4>
                Name: <input type="text" name="name"/>
                Image link: <input type="text" name="photo_url" placeholder="URL of artist's image"/>
                Nationality: <input type="text" name="nationality"/>
                <div className="submit">
                    <input type="submit" value="Submit"/>
                </div>
            </form>
                    </div>
                </body>
            </html>
        )
    }
}

module.exports = CreateArtist;