var React = require("react");
var Layout = require("./layout");
// console.log("this props in new jsx: "+this.props);
class New extends React.Component {
  render() {
      return (
              <Layout title = "Add New Artist">
               <form method = "POST" action = {'/'}>
                <div className = "form-group">
                   <h4>Artist's Name:</h4>
                   <input type= "text" name = "name" placeholder = "Enter artist's name"/>
                   <h4>Photo Url (optional): </h4>
                   <input type= "text" name = "photo_url" placeholder = "Enter url of artist"/>
                   <h4>Nationality (optional): </h4>
                   <input type= "text" name = "nationality" placeholder = "Enter country of origin"/>
                   <input type= "submit" defaultValue= "Submit"/>
                 </div>
               </form>
              </Layout>
              );
  }
}

module.exports = New;
