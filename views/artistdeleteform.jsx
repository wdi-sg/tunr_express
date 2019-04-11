var React = require('react');

class Artistdeleteform extends React.Component {

    render() {

        let deleteAction = `/artists/${this.props.artist[0].id}?_method=delete`;

        return (
            <body>
                <h1>Delete Artist</h1>
                    <form method="POST" action={deleteAction}>
                        Artist Name: <br/>
                            <p>{this.props.artist[0].name}</p>
                        Photo URL: <br/>
                            <p>{this.props.artist[0].photo_url}></p>
                        Nationality: <br/>
                            <p>{this.props.artist[0].nationality}</p>
                        <input type="submit" value="Delete"/>
                    </form>
            </body>
        );
    }
}

module.exports = Artistdeleteform;