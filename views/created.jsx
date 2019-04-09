var React = require('react');

class Created extends React.Component {

    render() {

        return (

        <body>
            <h1>Recipe</h1>
                <div>
                    <div>Artist Name:
                        <p>{this.props.artist[0].name}</p>
                    </div>
                    <div>Photo URL:
                        <p>{this.props.artist[0].photo_url}</p>
                    </div>
                    <div>Nationality:
                        <p>{this.props.artist[0].nationality}</p>
                    </div>
                </div>
        </body>
        );
    }
}

module.exports = Created;