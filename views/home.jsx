var React = require("react");

class Home extends React.Component {
  render() {
//console.log(this.props);

    let artistElement = this.props.idontknow.map(item=>{
        console.log("hey this is an item", item)
        return (<div>{item.name}, {item.nationality}</div>)
    })


    return (
      <html>
        <head />
        <body>
          <h1>{artistElement}</h1>

        </body>
      </html>
    );
  }
}

module.exports = Home;