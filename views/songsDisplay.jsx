var React = require("react");
var DefaultLayout = require ('./default');


class Home extends React.Component {
  render() {
console.log("inside react songs", this.props.list);

let items = this.props.list.map(name => {
return <li> {name.title} </li>
});


    return (
        <DefaultLayout>
      <html>
        <head />
        <body>
        <h1> These are the list of Songs for this Artist </h1>
          <ol>
          {items}
          </ol>
        </body>
      </html>
      </DefaultLayout>
    );
  }
}

module.exports = Home;