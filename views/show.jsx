const React = require('react');

class Show extends React.Component {

    render(){

        let url = "/edit/" + this.props.select.id

        return(

            <html>
                <head />
                <body>
                    <h1>{this.props.select.name}</h1>
                    <img height="250px" width="250px" src={this.props.select.photo_url} />
                    <h2>Id: {this.props.select.id}</h2>
                    <h2>Nationality: {this.props.select.nationality}</h2>
                    <a href="/"><button>Home</button></a>
                    <a href={url}><button>Update</button></a>
                </body>
            </html>
    )};
};

module.exports = Show;


