var React = require('react');
var Layout = require('./components/layout.jsx');

class singleArtist extends React.Component {
  render() {
        let editurl = "/artist/" + this.props.id + "/edit";
        let deleteurl = "/artist/" + this.props.id + "/delete";
        let songPage = "/artist/" + this.props.id + "/songs";


    return(
        <Layout>
            <h1>{this.props.name} ({this.props.nationality})</h1>
            <div className = "page-button">
                    <form action = {editurl} method ="GET">
                        <input type = "submit" value="Edit Artist" />
                    </form>
                    <form action = {songPage} method ="GET">
                        <input type = "submit" value="View Songs" />
                    </form>
                    <form action = {deleteurl} method ="GET">
                        <input type = "submit" value="Delete Artist" />
                    </form>
                </div>
            <div className = "single-artist">
                <img src={this.props.photo_url}/>
            </div>
        </Layout>
    )
  }
}


module.exports = singleArtist;