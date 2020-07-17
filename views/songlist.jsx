var React = require("react");
var DefaultLayout = require('./layout/default');

 class Songlist extends React.Component {
  render() {
         let songs = this.props.list.map(item =>{
           return (
                <li><a href="">{item.title}</a></li>
                )
         });

     return (
        <DefaultLayout>
          <h3>Songs by {this.props.artists.name}</h3>
            <div className="wrapper_new">
                {songs}
            </div>
            <p><a href={"/artist/" + this.props.artists.id +"/songs/new"}>Add a new song</a></p>
            <a href="/artist/"><p>Home</p></a>
            </DefaultLayout>
    );
  }
}

 module.exports = Songlist;