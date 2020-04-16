const React = require("react");

class SingleArtist extends React.Component {

    render() {
        return (
            <html>
            <head />
            <body>
                <div className="single-artist__container">
                    <div className="single-artist__img-container">
                        <img src={this.props.singleArtist["photo_url"]} alt={this.props.singleArtist.name} className="single-artist__img"/>
                    </div>
                    <p className="single-artist__name">{this.props.singleArtist.name}</p>
                    <p className="single-artist__nationality">{this.props.singleArtist.nationality}</p>
                </div>
            </body>
            </html>
        );
    }
}

module.exports = SingleArtist;