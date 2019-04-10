var React = require("react");
var Layout = require('./layout');

class Home extends React.Component {
  render() {

    const artistInfo = this.props.artistInfo;
    // return the artist array of objects

    let allArtist = artistInfo.map(obj => {
        const link = `artist/${obj.id}`;
        const actionDelete = `/artist/${obj.id}?_method=delete`;
        const editLink = `/artist/${obj.id}/edit`;

        return <div class="card">
                    <img src={obj.photo_url} class="card-img-top" id="photoUrl" alt="Image not found"/>
                    <div class="card-body">
                        <h5 class="card-title"><a href={link}>{obj.name}</a></h5>
                    </div>

                    <form method="POST" action={actionDelete}>
                        <button type="submit" class="btn btn-danger btn-lg" id="deleteButton">Delete</button>
                    </form>

                    <a href={editLink} class="btn btn-warning btn-lg">Edit</a>

               </div>


    }) // end of map




    return (<Layout>
            <div class="card-group">
                {allArtist}
            </div>

            <a href="/artist/new" class="btn btn-outline-success btn-lg">Add Artist</a>
    </Layout>);
  }
}

module.exports = Home;