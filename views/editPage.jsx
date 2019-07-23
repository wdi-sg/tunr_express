var React = require('react');

class Edit extends React.Component {
  render() {
    let url = "/artists/"+this.props.id+"?_method=PUT";

    return(
        <html>
        <body>
            <h1>Edit info of {this.props.name}</h1>
            <form action ={url} method ="POST">

                <h2>Name</h2>
                <input type="text" name="name" defaultValue={this.props.name}/>

                <h2>Image</h2>
                <input type="text" name="photo_url" defaultValue={this.props.photo_url}/>

                <h2>Nationality</h2>
                <input type="text" name="nationality" defaultValue={this.props.nationality}/>
                <br/><br/>
                <input type="submit" value ="Update"/>
            </form>
        </body>
        </html>
    )
  }
}


module.exports = Edit;