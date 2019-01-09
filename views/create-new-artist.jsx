var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
           <form action="/artists" method="POST">
                <label> Artist Name: </label>
                <input name="name" placeholder="Enter artist name"/>   <br/>
                <label> Number: </label>
                <input name="photo_url" placeholder="Enter photo url"/>   <br/>
                <label> Image: </label>
                <input name="nationality" placeholder="Enter nationality"/>   <br/>
                <button type="submit">Submit</button>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;