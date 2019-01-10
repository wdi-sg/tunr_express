var React = require('react');
var Defaultcss = require('./defaultcss');

class Songsadd extends React.Component{
    render(){
        return(
            <Defaultcss>
                <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">
                  <strong>Congratulations!</strong><br /> You have successfully created a new song for artist with ID {this.props.list[4]}
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div>
                    <h3>New Song </h3>
                    <br />
                    Song Title: {this.props.list[0]}
                    <br />
                    Song Album: {this.props.list[1]}
                    <br />
                    Song Preview Link: {this.props.list[2]}
                    <br />
                    Song Artwork: {this.props.list[3]}
                    <br />
                    <br />
                    <form method="GET" action="/songs">
                        <input type="submit" value="Home" />
                    </form>
                </div>
            </Defaultcss>
            );
    }
}

module.exports = Songsadd;