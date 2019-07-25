var React = require("react");
var DefaultLayout = require('./layout/default');


class Home extends React.Component {
  render() {
    let artists = this.props.artists.map(item=>{
    let url = '/artist/' + item.id;
    return <div className="artists">
           <a href={url}><img className="artist_pic" src={item.photo_url} width="400px" height="400px"/></a>
           <p> Name:{item.name} </p><p> Nationality: {item.nationality} </p>
           </div>
    });
    return (
          <DefaultLayout>
          {artists}
          </DefaultLayout>
    );
  }
}

module.exports = Home;