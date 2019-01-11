var React = require('react');
var DefaultLayout = require('./default');

class Home extends React.Component {
  render() {

    const artist = this.props.artists.map ((each,index)=>{
        let link = `/artist/${each.id}`;
        return <div key={index}>
                    <h4>Artist : <a href = {link}>{each.name}</a></h4>
               </div>
    })

    return (
        <DefaultLayout>
            <h1>All Artist</h1>
            <button type="button" className="btn btn-info my-4"><a href= "/artist/new">New Artist</a></button>
            {artist}

        </DefaultLayout>

    );
  }
}

module.exports = Home;