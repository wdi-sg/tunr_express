var React = require('react');
var Defaultcss = require('./defaultcss');

class Artistedit extends React.Component{
    render(){
        return(
            <Defaultcss>
                <div>
                    <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">
                      <strong>Please Read!</strong><br /> The values you see in the text box are originally from the server. Check before clicking the edit button.
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <form method="POST" action={"/artists/edit/" + this.props.list[0].id + "?_method=PUT"}>
                    <h3>Edit ID {this.props.list[0].id} artist: </h3><br />
                    Artist Name:
                    <input type="text" className="form-control form-control-sm" name="name" minLength="5" required="required" pattern="[ a-zA-Z ]*$" defaultValue={this.props.list[0].name}/><br />
                    Artist Photo:
                    <input type="text" className="form-control form-control-sm" name="photo" minLength="5" required="required" defaultValue={this.props.list[0].photo_url}/><br />
                    Artist Nationality:
                    <input type="text" className="form-control form-control-sm" name="nat" minLength="2" required="required" defaultValue={this.props.list[0].nationality}/><br /><br />
                    <input type="submit" value="Edit" /><br />
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

module.exports = Artistedit;