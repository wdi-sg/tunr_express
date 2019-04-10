var React = require("react");
var Layout = require("./layout");

class New extends React.Component {
  render() {
      return (<Layout>
         <form method = "POST" action = {'/'}>
           <h4>Artist's Name:</h4>
           <input type= "text" name = "name" value = {this.props.name}/><br/>
           <h4>Photo Url: </h4>
           <input type= "text" name = "photo_url" value = {this.props.photo_url}/><br/>
           <h4>Nationality: </h4>
           <input type= "text" name = "nationality" value = {this.props.nationality}/><br/>
           <br/>
           <input type= "submit" value= "Submit"/><br/>
         </form>
        </Layout>);
  }
}

module.exports = New;
