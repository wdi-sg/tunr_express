var React = require('react');

class Add extends React.Component {

  render() {
    let newId = this.props.data.map ((id) => {
        return (parseInt(id.id) + 1);
    });
    console.log(newId);

    return (
    <html>
        <body>
            <div><h1>Add new artist</h1></div>
            <form method="POST" action={`/artists/${newId}`}>
                <div>Artist Name:<input type="text" name="name"/></div>  <br/>
                <div>Image:<input type="text" name="photo_url"/></div>  <br/>
                <div>Nationality:<input type="text" name="nationality"/></div>  <br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
    </html>
    );

  }


}

module.exports = Add;