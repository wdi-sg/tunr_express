const React = require('react');

class Show extends React.Component {

    render(){


        return(

            <html>
                <head />
                <body>
                    <h1>{this.props.select.name}</h1>
                    <img height="250px" width="250px" src={this.props.select.photo_url} />
                    <h2>Id: {this.props.select.id}</h2>
                    <h2>Nationality: {this.props.select.nationality}</h2>
                </body>
            </html>
    )};
};

module.exports = Show;


