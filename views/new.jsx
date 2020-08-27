var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>ADD A NEW ARTIST</h3>
              <form method ="POST" action="/artists" >
                Artist Name<input type="text" name="name"/>
               <br/>
               <br/>
                PHOTO LINK<input type="text" name="photo"/>
               <br/>
               <br/>
               Nationality <input type="text" name="nationality"/>
               <br/>
               <br/>

               <input type="submit" value="Submit"/>
            </form>

        </body>
      </html>
    );
  }
}

module.exports = New;