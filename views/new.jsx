var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <div>
                <h1>Please enter the below for a new Artist!</h1>
                <div>
                    <form action='/artists' method="POST">
                        <p>
                            Artist Name: <input name="artistName" />
                        </p>
                        <p>
                            Please enter a photo URL: <input name="photo" />
                        </p>
                        <p>
                            Please enter Artist's NationalityL: <input name="nationality" />
                        </p>
                        <input type="submit" value="Add this Artist!"></input>
                        <p>The number of page count is: {this.props.cookie}</p>
                    </form>
                </div>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = New;