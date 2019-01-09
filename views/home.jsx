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
          <ul>
          {items}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;