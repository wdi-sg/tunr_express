var React = require("react");

class New extends React.Component {
  render() {
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
    return (
      <html>
        <head/>
        <body>
            <h1>Wana add a <span style={{ color: "#4D8EDD", fontWeight: "lighter"}}>NEW</span> artist? Do it here!</h1>
            <form method="POST" action="/artists">
                <p>Name: <input type="text" name="name"/></p>
                <p>Photo URL: <textarea type="text" name="photo_url" rows="4" cols="50"></textarea></p>
                <p>Nationality: <input type="text" name="nationality"/></p>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;