var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head/>
        <body>
          <h3>Add New Artist</h3>
          <form action="/" method="POST">

                <h4>Name</h4>
                <input type="text" name="name" placeholder="e.g. Briyani Chua"/>

                <h4>Photo Url</h4>
                <input type="text" name="photoUrl" placeholder="e.g. https://wwww.google.com/"/>
                              
                <h4>Nationality</h4> 
                <input type="text" name="nationality" placeholder="e.g. Brazil"/>

                <input type="submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
