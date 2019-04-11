var React = require("react");
// var Layout = require('./layout');

    class Home extends React.Component {
      render() {
        // return (
        //   <html>
        //     <head />
        //     <body>
        //       <h1>Welcome!</h1>
        //     </body>
        //   </html>
        // );

        const artistInfo = this.props.artistInfo;
        // return the artist array of objects

        let allArtist = artistInfo.map(obj => {
            const link = `album/${obj.id}`;
            /*const link = `artist/${obj.id}`;*/
            const actionDelete = `/artist/${obj.id}?_method=delete`;
            const editLink = `/artist/${obj.id}/edit`;
           /* const addSongLink = `/artist/${obj.id}/songs/new`;*/

            return <div class="artist-container">
                        <div class="artistImage-container">
                            <img src={obj.photo_url} id="photoUrl" alt="Image not found"/>
                        </div>

                        <div class="artistName-container">
                            <h5><a href={link}>{obj.name}</a></h5>
                        </div>

                        <div class="artistButton-container">
                            <form method="POST" action={actionDelete}>
                                <button type="submit" class="btn btn-danger btn-lg" id="deleteButton">Delete</button>
                            </form>

                            <a href={editLink} class="btn btn-warning btn-lg">Edit</a>

                        </div>

                   </div>


        }) // end of map




        // return (<Layout>
                <div class="artistMain-container">
                    {allArtist}
                </div>
        // </Layout>);
      }
    }

    module.exports = Home;