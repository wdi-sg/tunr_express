var React = require("react");
var DefaultLayout = require('./layouts/default');

class Artist extends React.Component {
  render() {
    return (
        <DefaultLayout>
            <h1>{this.props[0].id}</h1>
            <h1>{this.props[0].name}</h1>
            <img src={this.props[0].photo_url} style={{height: '200px', width: '200px'}}></img>
            <h1>{this.props[0].nationality}</h1>

            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal">
              Edit Artist
            </button>

            <form method="POST" action={`/${this.props[0].name}?_method=DELETE`}>
                <input type="submit" class="btn btn-danger" value="Delete Recipe"/>
            </form>




            <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Adding New Artist</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form method="POST" action={`/${this.props[0].name}?_method=PUT`}>
                        <input type="" name="name" placeholder={`${this.props[0].name}`}/>
                        <input type="" name="photo_url" placeholder={`${this.props[0].photo_url}`}/>
                        <input type="" name="nationality" placeholder={`${this.props[0].nationality}`}/>
                        <input type="submit"/>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        </DefaultLayout>
    );
  }
}

module.exports = Artist;
