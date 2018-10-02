var React = require("react");

class Show extends React.Component {
  render() {

      let actionUrl = '/artists/'+this.props.id+'/edit';
      let actionUrl2 = '/artists/'+this.props.id+'?_method=delete';
      let actionUrl3 = '/artists/'+this.props.id+'/songs';

      return (
        <html>
        <head>
          <link rel="stylesheet" type="text/css" href="/style.css"></link>
        </head>
        <body>
        <div>
          <ul>
            <li>Name: {this.props.name}</li>
            <li>Nationality: {this.props.nationality}</li>
            <p><img src={this.props.photo_url}/></p>
            <form method="GET" action={actionUrl}>
              <input type="submit" value="Edit"/>
            </form>
            <p></p>
            <form method="POST" action={actionUrl2}>
              <input type="submit" value="Delete"/>
            </form>
            <p></p>
            <form method="GET" action={actionUrl3}>
              <input type="submit" value="Songs List"/>
            </form>
          </ul>
        </div>
        </body>
        </html>
      );
  }
}

module.exports = Show;
