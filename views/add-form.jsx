var React = require('react');

class AddForm extends React.Component {

    render() {
        return (
            <html>
        <body>
          <div>
            <h1>Add New Artist!</h1>
            <form action="/artists" method="POST">
            Name: <input type="text" name="name"></input>
            <br></br>
            Image URL: <input type="text" name="photo"></input>
            <br></br>
            Nationality: <input type="text" name="nationality"></input>
            <br></br>
            <input type="submit" value="Submit"></input>
            </form>
          </div>
        </body>
      </html>
        );
    }
}

module.exports = AddForm;