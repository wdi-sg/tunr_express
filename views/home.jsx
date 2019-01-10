var React = require("react");
var Defaultcss = require('./defaultcss');

class Artistlist extends React.Component{
    render(){
        return(
            <div>
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title text-danger" id="exampleModalLabel">WARNING!</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body text-danger">
                    You are about to delete an artist from the database. Click <strong>close</strong> to return to main menu or click <strong>confirm</strong> to proceed with the deletion.
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <form method="POST" action={"/artist/delete/" + this.props.list.id + "?_method=delete"}>
                        <button type="submit" value="Delete" className="btn btn-primary">Confirm</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
                <div>
                    <ul>
                        Artist: {this.props.list.name} <br />
                        <form method="GET" action={"/artist/" + this.props.list.id}>
                            <input type="submit" className="details" value="Show Details" />
                        </form>
                        <form method="GET" action={"/artist/edit/" + this.props.list.id}>
                            <input type="submit" className="edit" value="Edit Artist" />
                        </form>
                        <input type="submit" className="delete" value="Delete" data-toggle="modal" data-target="#exampleModal"/>
                    </ul>
                </div>
            </div>
            );
    }
}

class Home extends React.Component {
  render() {
    const artists = this.props.list.map( artist => {
            return <Artistlist list={artist}></Artistlist>;
        });
    return (
        <Defaultcss>
            <form method="GET" action="/artist/new">
                <input type="submit" className="new" value="Create New Artist" />
            </form>
            {artists}
        </Defaultcss>
    );
  }
}

module.exports = Home;