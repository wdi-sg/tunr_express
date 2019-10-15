var React = require("react");

class Edit extends React.Component {
  render() {
    let urlAction=`/artist/edit/${this.props.id}/?_method=put`;
    return (
      <html>
        <head />
        <body>
          <div>
            <form action={urlAction} method ="POST">
                <div>
                    <label> Artist name </label>
                    <input type ="text" name="name" defaultValue={this.props.name}/>
                </div>
                <div>
                    <label> Photo Url </label>
                    <input type ="text" name="photo_url" defaultValue={this.props.photo_url}/>
                </div>
                <div>
                    <label> Nationality </label>
                    <input type ="text" name="nationality" defaultValue={this.props.nationality}/>
                </div>
                <input type="submit" value="submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;