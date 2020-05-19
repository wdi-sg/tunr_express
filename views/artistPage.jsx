var React = require("react");
var DefaultLayout = require('./layouts/default');
// var artistCard = require('./components/artistCard');

class ArtistCard extends React.Component {
    render() {
        return (
            <div class="card col-2 m-3 p-0" id="artistPage-image">
                <img class="card-img-top" src={this.props.list.photo_url} alt="Card image cap" />
                <div class="card-body">
                  <h5 class="card-title">{this.props.list.name}</h5>
                  <p class="card-text">Nationality: {this.props.list.nationality}</p>
                </div>
            </div>
            )

    }
}


class ArtistPage extends React.Component {
    render() {
        const allArtists = this.props.list.map( artists => {
            return <ArtistCard list={artists}></ArtistCard>;
        });
        return (
            <DefaultLayout>
            <h1>Artists</h1>
            <div class="row">
                {allArtists}
                </div>
            </DefaultLayout>
            )
    }
}


module.exports = ArtistPage;

























//SERENEeeeeeeee


// class ArtistList extends React.Component{
//     render(){
//         return(
//             <div class="card d-inline-block m-2" style={{  width: '18rem'}}>
//               <img src={this.props.list.photo_url} class="card-img-top" alt="..." />
//               <div class="card-body">
//                 <h5 class="card-title">{this.props.list.name}</h5>
//                 <p class="card-text">Nationality: {this.props.list.nationality}</p>
//                 <a href={"/artist/" + this.props.list.id + "/songs/"}class="btn btn-info mr-3">Songs</a>
//                 <a href={"/edit/artist/" + this.props.list.id}class="btn btn-success">Edit</a>
//               </div>
//             </div>
//         );
//     }
// }

// class Artist extends React.Component{
//     render(){
//         const artists = this.props.list.map( artists => {
//             return <ArtistList list={artists}></ArtistList>;
//         });
//         return(
//             <Navbar>
//                 <div>
//                     <h1>Here are the artists:</h1>
//                     {artists}
//                 </div>
//             </Navbar>
//             );
//     }
// }

// module.exports = Artist;