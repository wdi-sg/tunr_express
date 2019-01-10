var React = require("react");
var DefaultLayout = require ('./default');


class Home extends React.Component {
  render() {
let items = this.props.artlist.map(name => {
return <li>
<a href = {'/artist/'+name.id} > <h6>{name.name}</h6></a>
<div className="col-md-4 center-block"><a href = {'/artist/'+name.id + '/songs'} className="btn btn-primary btn-sm active" role="button" aria-pressed="true"> View songs for this artist </a></div>
 </li>
});


    return (
        <DefaultLayout>
      <html>
        <head />
        <body>
        <h1> These are the list of Artists</h1>
        <h4>Click on the name to see artist info or delete</h4>
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