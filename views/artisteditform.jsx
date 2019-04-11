var React = require('react');

class Artisteditform extends React.Component {

    render() {

        let putAction = `/artists/${this.props.artist[0].id}?_method=PUT`;

        return (
            <body>
                <h1>Edit Artist</h1>
                    <form method="POST" action={putAction}>
                        Artist Name: <br/>
                            <textarea name="name" cols="40" rows="10" value={this.props.artist[0].name}></textarea><br/>
                        Photo URL: <br/>
                            <textarea name="photo_url" cols="40" rows="10" value={this.props.artist[0].photo_url}></textarea><br/>
                        Nationality: <br/>
                            <textarea name="nationality" cols="40" rows="10" value={this.props.artist[0].nationality}></textarea><br/>
                        <input type="submit" value="Edit"/>
                    </form>
            </body>
        );
    }
}

module.exports = Artisteditform;