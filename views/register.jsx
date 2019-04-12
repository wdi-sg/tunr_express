var React = require("react");
var Layout = require("./layout");

class Register extends React.Component {
  render() {

    let actionAttribute = `/register`;
    //IS THERE any way for a input for to not allow for user to edit? I want to keep the artist_id intact
    return (
            <Layout title = "Register">
              <form method = "POST" action = {actionAttribute}>
                <input name = "name" placeholder = "Name"/>
                <input name = "password" placeholder = "Password"/>
                <input name = "email" placeholder = "Email Address"/>
                <input type = "submit"/>
              </form>
            </Layout>
          );
    }
  }
module.exports = Register;
