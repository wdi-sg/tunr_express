var React = require("react");

class Index extends React.Component {
  render() {
    let allName = this.props.result.map((item)=>{
        return (
            <div>
                <h4> Title: {item.title} </h4>
                <h4> Album: {item.album} </h4>
            </div>
        )
    })
    return (
      <html>
        <head />
        <body>
          <h3>Index!</h3>
          <p>See all the songs</p>
          {allName}
        </body>
      </html>
    );
  }
}

module.exports = Index;