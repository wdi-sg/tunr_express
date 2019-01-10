var React = require("react");

class Delete extends React.Component {
  render() {
    let urlAction= `/artist/delete/${this.props.id}/?_method=delete`;
    return (
      <html>
        <head />
        <body>
          <h1> {this.props.name} </h1>
          <img src={this.props.photo_url}/>
          <h2> {this.props.nationality} </h2>
          <div>
            <form action={urlAction} method ="POST">
                <input type="submit" value="delete this artist"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Delete;