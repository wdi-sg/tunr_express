var React = require('react');

class singleArtist extends React.Component {
  render() {
        let editurl = "/artists/" + this.props.id + "/edit";
        let deleteurl = "/artists/" + this.props.id + "/delete";


    return(
        <html>
            <body>
                <h1>{this.props.name}</h1>
                <div>
                <img src={this.props.photo_url}/>
                <p>{this.props.nationality}</p>
                <form action = {editurl} method ="GET">
                <input type = "submit" value="Edit Artist" />
                </form>
                <br/>
                <form action = {deleteurl} method ="GET">
                <input type = "submit" value="Delete Artist" />
                </form>
                </div>
            </body>
        </html>
    )
  }
}


module.exports = singleArtist;