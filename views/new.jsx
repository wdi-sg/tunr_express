var React = require("react");
class New extends React.Component {
  render() {
    var total = parseInt(this.props.num);
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/artists">
                  <p>Artist Name:</p>
                  <input type="text" name="name"/>
                  <p>Artist Photo Link:</p>
                  <input type="text" name="photo_url"/>
                  <p>Artist Nationality:</p>
                  <input type="text" name="nationality"/>
                  <p><button type="submit">Submit</button></p>
                  <p>Total Visits to page: {total}</p>
              </form>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = New;
