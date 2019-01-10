var React = require("react");
var DefaultLayout = require('./layouts/default');

class Song extends React.Component {
  render() {
    return (
        <DefaultLayout>
            <h1>{this.props[0][0].id}</h1>
            <h1>{this.props[0][0].title}</h1>
            <h1>{this.props[0][0].album}</h1>
            <h1>{this.props[0][0].preview_link}</h1>
            <h1>{this.props[0][0].artwork}</h1>

            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal">
              Edit Song
            </button>

            <form method="POST" action={`/${this.props[1]}/songs/${this.props[0][0].title}?_method=DELETE`}>
                <input type="submit" class="btn btn-danger" value="Delete Song"/>
            </form>


            <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Editing Song</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form method="POST" action={`/${this.props[1]}/songs/${this.props[0][0].title}?_method=PUT`}>
                        <input type="hidden" name="artist" value={`${this.props[1]}`}/>
                        <input type="" name="title" placeholder={`${this.props[0][0].title}`}/>
                        <input type="" name="album" placeholder={`${this.props[0][0].album}`}/>
                        <input type="" name="preview_link" placeholder={`${this.props[0][0].preview_link}`}/>
                        <input type="" name="artwork" placeholder={`${this.props[0][0].artwork}`}/>
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

module.exports = Song;
