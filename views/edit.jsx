var React = require("react");
var Layout = require("./layout");

class Edit extends React.Component {
  render() {
    const actionAttribute = `/artist/${this.props.artistId[0].id}?_method=PUT`
      return (
              <Layout title = "Edit Arist">
               <form method = "POST" action = {actionAttribute}>
                 <h4>Artist's Name:</h4>
                 <input type= "text" name = "name" defaultValue = {this.props.artistId[0].name}/><br/>
                 <img className ="card-img-top" src = {this.props.artistId[0].photo_url} alt= "Artist's image"/>
                 <h4>Photo Url: </h4>
                 <input type= "text" name = "photo_url" defaultValue = {this.props.artistId[0].photo_url}/><br/>
                 <h4>Nationality: </h4>
                 <input type= "text" name = "nationality" defaultValue = {this.props.artistId[0].nationality}/><br/>
                 <br/>
                 <input type= "submit" defaultValue= "Submit"/><br/>
               </form>
              </Layout>
              );
  }
}

module.exports = Edit;
