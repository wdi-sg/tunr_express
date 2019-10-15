var React = require('react');
class New extends React.Component {
  render() {
    return (
      <html>
        <body>
                  <div>

                              <br/>

            <h1>Edit Artist: { this.props.name }</h1>
            <form method="POST" action={"/artists/"+this.props.id+"?_method=put"}>
            <br/>
            Name: <input type="text" name="name" value={this.props.name}/>
            <br/>
            Image URL: <input type="text" name="photo_url" value={this.props.photo_url}/>
            <br/>
            Nationality: <input type="text" name="nationality" value={this.props.nationality}/>
            <br/>
            <input type="submit" value="Submit"/>
            </form>


          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;