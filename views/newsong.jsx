var React = require("react");
var Layout = require('./layout');

class New extends React.Component {
  render() {
     console.log("THIS IS ADD NEW SONG PAGE");
    console.log(this.props.index);
    var artistArr = this.props.artists;
    var addPath = "/artists/"+ this.props.index +"/songs"
    var options = artistArr.rows.map((item)=>{
        return(
            <option value={item.id}>{item.name}</option>
            )
    })

    return (
      <Layout>
          <form action = {addPath} method = "POST">
              <div class="form-group">
                <label for="exampleFormControlInput1">Title:</label>
                <input type="text" class="form-control" name="title" placeholder="Title"/>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Album:</label>
                <input type="text" class="form-control" name="album" placeholder="Album"/>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Preview_link:</label>
                <input type="text" class="form-control" name="preview_link" placeholder="Preview_link"/>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Artwork:</label>
                <input type="text" class="form-control" name="artwork" placeholder="Artwork"/>
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect1">Artist</label>
                <select class="form-control" name="artist_id">
                {options}
                </select>
              </div>
              <input class="btn btn-secondary btn-lg" type="submit" value="Submit"/>
            </form>
        </Layout>
    );
  }
}

module.exports = New;