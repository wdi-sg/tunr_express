var React = require("react");

class Home extends React.Component {
  render() {

    let data = this.props.data
    console.log('in the home JSX........:');
    // console.log(data.data);
    let outList = data.map(item=>{
        return  <div class="card-item">
                    <h4>{item.id}. {item.name}</h4>
                </div>
    })
    return (
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
          {outList}
        </body>
      </html>
    );
  }
}

module.exports = Home;