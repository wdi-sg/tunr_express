var React = require('react');
var Defaultcss = require('./defaultcss');

class Artistnew extends React.Component{
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
                    <form method="POST" action="/artists/artist/add">
                    <h3>Create a new artist: </h3><br />
                    Artist Id:
                    <input type="text" className="form-control form-control-sm" name="id" readOnly placeholder="Auto generated" /><br />
                    Artist Name:
                    <input type="text" className="form-control form-control-sm" name="name" required="required" minLength="5" pattern="[ a-zA-Z ]*$" placeholder="No special characters and numbers"/><br />
                    Artist Photo:
                    <input type="text" className="form-control form-control-sm" name="photo" required="required" minLength="5" placeholder="insert photo url"/><br />
                    Artist Nationality:
                    <input type="text" className="form-control form-control-sm" name="nat" required="required" minLength="2" /><br />
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

module.exports = Artistnew;