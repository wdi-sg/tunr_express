var React = require("react");
var Layout = require("./layout");

class Artistcreateform extends React.Component {
  render() {

    return (
        <Layout>
            <h3>Add new artist:</h3>
                <form method="POST" action="/artists">
                    Artist Name: <br/>
                        <textarea name="name" cols="40" rows="10" value="e.g. Beyoncé"></textarea><br/>
                    Photo URL: <br/>
                    <textarea name="photo_url" cols="40" rows="10" value="e.g. https://bit.ly/2UHSJsV"></textarea><br/>
                    Nationality: <br/>
                    <textarea name="nationality" cols="40" rows="10" value="e.g. Singaporean"></textarea><br/>
                    <input type="submit" value="Submit"/>
                </form>
        </Layout>
    );
  }
}

module.exports = Artistcreateform;