var React = require("react");

//artist-added page to include hyperlinks to home page and etc
console.log("Artist Added Page Accessed");
console.log("------------------");

class ArtistAdded extends React.Component {
    render() {
        // console.log(this.props);

        return (
            <html>
                <head />
                <body>
                    <h1>Your Artist Has Been Added Successfully!</h1>
                    <div>
                        <p>Artists Name: {this.props.name}</p>
                        <p><img src={this.props.photo_url} /></p>
                        <p>Artists Nationality: {this.props.nationality}</p>
                    </div>
                    <h6>Click here to go to Artists List Page<a href="views/artists/" /></h6>
                </body>
            </html>
        );
    }
}

module.exports = ArtistAdded;
