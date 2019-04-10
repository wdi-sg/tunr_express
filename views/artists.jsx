var React = require("react");

class Artists extends React.Component {
  render() {


  let stuff = this.props.artists.map(item=>{
    console.log("item",item)
    return (<div>{item.name}</div>)
  })
    return (

      <html>
        <head />
        <body>
          <h1>{stuff}</h1>
        </body>
      </html>
    );
  }
}

module.exports = Artists;
