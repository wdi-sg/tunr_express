var React = require("react");

class Artists extends React.Component {
  render() {
  let stuff = this.props.artists.map(item=>{
    console.log("item"+item);
    return (
      <div>
        <tr>
        <td>{item.name}</td>
        <td>{item.nationality}</td>
        <td><img width = "100px" src ={item["photo_url"]}/></td>
        </tr>
      </div>
    );
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
