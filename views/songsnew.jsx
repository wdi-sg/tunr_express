var React = require('react');
var Defaultcss = require('./defaultcss');

class Songsnew extends React.Component{
    render(){
        return(
            <Defaultcss>
                <div>
                    <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">
                      <strong>Please Read!</strong><br /> All fields must be filled
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <form method="POST" action={"/artists/" + this.props.artistId[0] + "/songs/add"}>
                    <h3>Create a new song: </h3><br />
                    Artist Id:
                    <input type="text" className="form-control form-control-sm" name="id" readOnly placeholder="Auto generated" /><br />
                    Song Title:
                    <input type="text" className="form-control form-control-sm" name="title" required="required" minLength="5" pattern="[ a-zA-Z ]*$" placeholder="No special characters and numbers"/><br />
                    Song Album:
                    <input type="text" className="form-control form-control-sm" name="alb" required="required" minLength="5" pattern="[ a-zA-Z ]*$" placeholder="No special characters and numbers"/><br />
                    Song Preview Link:
                    <input type="text" className="form-control form-control-sm" name="pl" required="required" minLength="5" placeholder="insert preview link url"/><br />
                    Song Artwork:
                    <input type="text" className="form-control form-control-sm" name="art" required="required" minLength="5" placeholder="insert artwork link url"/><br />
                    <input type="submit" value="Create" />
                    </form>
                    <br />
                    <br />
                    <form method="GET" action="/artists">
                        <input type="submit" value="Back" />
                    </form>
                </div>
            </Defaultcss>
            );
    }
}

module.exports = Songsnew;