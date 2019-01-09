var React = require("react");
class CreateForm extends React.Component {

  render() {

    return (
      <html>
        <head />
        <body>
            <div>
                <h1> Create a new artist</h1>
                <form method="POST" action="/artists">
                    <input name="name"placeholder="Name"/> <br/>
                    <input name="photo_url" placeholder="Photo URL"/> <br/>
                    <input name="nationality" placeholder="Nationality"/> <br/> <br/>
                    <input type="submit" value="Submit"/>
                </form>



            </div>
        </body>
      </html>
    );
  }
}

module.exports = CreateForm;
