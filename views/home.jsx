var React = require("react");

class Home extends React.Component {
  render() {

    let artistObject = this.props.artists;

    let artistArrayElement = artistObject.map(artistRow =>{
        return <li>{artistRow.name}</li>
    });

    return (
      <html>
        <head/>
        <body>
          <h1>Hello World!!</h1>
          <h2> Artists names</h2>
          <ul>{artistArrayElement}</ul>
          <form action="/artists/new">
          <input type="submit" value="create artist"/>
          </form>
        </body>
      </html>
    );
  }
  console.log("end of html");
}

module.exports = Home;