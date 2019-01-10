var React = require('react');
var Defaultcss = require('./defaultcss');

class Artistadd extends React.Component{
    render(){
        return(
            <Defaultcss>
                <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">
                  <strong>Congratulations!</strong><br /> You have successfully created a new artist
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div>
                    <h3>New Artist </h3>
                    <br />
                    Artist Name: {this.props.list[0]}
                    <br />
                    Artist Photo: <img src={this.props.list[1]} alt="broken link" height="270" width="270" />
                    <br />
                    Artist Nationality: {this.props.list[2]}
                    <br />
                    <br />
                    <form method="GET" action="/">
                        <input type="submit" value="Home" />
                    </form>
                </div>
            </Defaultcss>
            );
    }
}

module.exports = Artistadd;