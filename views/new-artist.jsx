var React = require("react");

class NewArtist extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>
                </head>
                <body>
                    <h3>New Artist</h3>
                    <br/>
                    <form method="POST" action="/artists/new">
                    <input type="text" name="name" placeholder ="name"/>
                    <br/>
                    <input type="text" name="photo_url" placeholder ="photo_url"/>
                    <br/>
                    <input type="text" name="nationality" placeholder ="nationality"/>
                    <br/><br/>
                    <button type="submit"> Submit </button>
                    </form>

                </body>
            </html>
        );
    }
}

module.exports = NewArtist;
