var React = require("react");

class Index extends React.Component {
  render() {
    console.table(this.props.data);
    let allName = this.props.data.map((item)=>{
        return (
            <div>
                <h4> {item.name} </h4>
                <h4> {item.nationality} </h4>
            </div>
        )
    })
    return (
      <html>
        <head />
        <body>
          <h3>Index!</h3>
          <p>See all the artists</p>
          {allName}
        </body>
      </html>
    );
  }
}

module.exports = Index;