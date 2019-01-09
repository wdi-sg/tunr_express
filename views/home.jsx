var React = require("react");


class Home extends React.Component {
  render() {

let items = this.props.artlist.map(name => {
return <li> {name.name} </li>
});


    return (
      <html>
        <head />
        <body>
        <h1> These are the list of Artists</h1>
          <ol>
          {items}
          </ol>
        </body>
      </html>
    );
  }
}

module.exports = Home;