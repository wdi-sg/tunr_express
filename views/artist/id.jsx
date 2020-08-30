var React = require("react");

class New extends React.Component {
  render() {
    let {name,photo_url,nationality,id}=this.props;
    return (
      <html>
        <head />
        <body>
          <h3>{name}</h3>
          <p>Nationality: {nationality}</p><br/>
          <img src={photo_url} height='300' width='300'/>
          <form method ="POST" action={`../artists/${id}?_method=delete`}>
            <input type="submit" value="Delete"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
