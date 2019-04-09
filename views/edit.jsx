var React = require("react");
var Layout = require("./layout");

class Edit extends React.Component {
  render() {
    const actionAttribute = `/artist/${this.props.artistId[0].id}?_method=PUT`
      return (<Layout>
         <form method = "POST" action = {actionAttribute}>
           <h4>Artist's Name:</h4>
           <input type= "text" name = "name" value = {this.props.artistId[0].name}/><br/>
           <img className ="card-img-top" src = {this.props.artistId[0].photo_url} alt= "Artist's image"/>
           <h4>Photo Url: </h4>
           <input type= "text" name = "photo_url" value = {this.props.artistId[0].photo_url}/><br/>
           <h4>Nationality: </h4>
           <input type= "text" name = "nationality" value = {this.props.artistId[0].nationality}/><br/>
           <br/>
           <input type= "submit" value= "Submit"/><br/>
         </form>
        </Layout>);
  }
}

module.exports = Edit;
