var React = require('react');

class ArtistProfile extends React.Component {
  render() {
    {/*var url = "/artists/"+this.props.data.id;*/}

    return (
        <div>
            <img src={this.props.data.photo_url}/><br/>
            {this.props.data.name} <br/>
            {this.props.data.nationality}
          {/*<a href={url}>dsfldld</a>*/}
        </div>

    );
  }
}

module.exports = ArtistProfile;
