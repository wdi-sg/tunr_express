var React = require('react');
var Layout = require('./components/layout.jsx');

class singleArtist extends React.Component {
  render() {
        let editurl = "/artist/" + this.props.id + "/edit";
        let deleteurl = "/artist/" + this.props.id + "/delete";


    return(
        <Layout>
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
        </Layout>
    )
  }
}


module.exports = singleArtist;