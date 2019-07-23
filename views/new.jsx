var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head/>
        <body>
            <h1> Add New Artist! </h1>
            <form action ="/new" method ="POST">

                <h2>Name</h2>
                <input type="text" name="name" placeholder="Name"/>

                <h2>Image</h2>
                <input type="text" name="photo_url" placeholder="Image Url"/>

                <h2>Nationality</h2>
                <input type="text" name="nationality" placeholder="Nationality"/>
                <br/><br/>
                <input type="submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;