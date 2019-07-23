var React = require("react");
const Layout = require('./c-layout.jsx');

const audioStyle = {
    width: "100%"
}
const thStyle = {
    width: "40%"
}

class ArtistPage extends React.Component {
  render() {
    return (
        <Layout>

            <table class="table table-sm table-striped table-dark table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Album Art</th>
                  <th scope="col">Album</th>
                  <th scope="col">Song Title</th>
                  <th style={thStyle} scope="col">Preview Link</th>
                </tr>
              </thead>
              <tbody>
                {this.props.rows.map(song =>
                <tr>
                  <th scope="row">{song.artist_id}</th>
                  <td><img src={song.artwork} class="img-thumbnail"/></td>
                  <td>{song.album}</td>
                  <td>{song.title}</td>
                  <td><audio style={audioStyle} controls>
                      <source src={song.preview_link} type="audio/mpeg"/>
                  </audio></td>
                </tr>
                )}
              </tbody>
            </table>


        </Layout>
    );
  }
}

module.exports = ArtistPage;

// <div class="col-md-4">
//           <div class="card mb-4 shadow-sm">
//             <img src={song.artwork} class="img-thumbnail"/>
//             <div class="card-body">
//               <h2>{song.title}</h2>
//               <p class="card-text">{song.album}</p>
//               <div class="d-flex justify-content-between align-items-center">
//                   <audio style={audioStyle} controls>
//                       <source src={song.preview_link} type="audio/mpeg"/>
//                   </audio>
//               </div>
//               <div class="d-flex justify-content-between align-items-center">
//                 <div class="btn-group">
//                   <a href={"/artist/"+song.title} class="btn btn-sm btn-outline-secondary">View</a>
//                   <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
//                 </div>
//                 <small class="text-muted">{song.artist_id}</small>
//               </div>
//             </div>
//             <div class="card-footer">
//                 <small class="text-muted">Last updated 3 mins ago</small>
//             </div>
//           </div>
//         </div>