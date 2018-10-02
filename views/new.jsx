var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Insert new artist:</h3>
            <div>
                <form method = "POST" action ="/artists/">
                    <div></div>
                        Name:
                        <input name="name"/>
                        <br></br>
                        Photo URL:
                        <input name="photo_url"/>
                        <br></br>
                        Nationality:
                        <input name="nationality"/>
                        <br></br>
                        <br></br>
                    <input type = "submit" value = "Submit"></input>
                </form>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = New;

