var React = require("react");

//artist-added page to include hyperlinks to home page and etc
console.log("Artist Edited Page Accessed");
console.log("------------------");

class ArtistAdded extends React.Component {
    render() {
        console.log(this.props);

        return (
            <html>
                <head />
                <body>
                    <h1>Your Artist Has Been Edited Successfully!</h1>
                    <div>
                        <p>Artists Name: {this.props.name}</p>
                        <p><img src={this.props.photo_url} /></p>
                        <p>Artists Nationality: {this.props.nationality}</p>
                    </div>
                    <h6><a href="views/artists/" />Click here to go to Artists List Page</h6>
                </body>
            </html>
        );
    }
}

module.exports = ArtistAdded;
