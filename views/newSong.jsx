var React = require('react');
var Layout = require('./layout');

class NewSong extends React.Component {

    render () {

        let artistName = this.props.artistName;
        let allArtist = artistName.map(obj => {


        return <option value={obj.id}>{obj.name}</option>


        }) // end of map


        return (<Layout>

            <div class="new-header">
                <h1>New Song!</h1>
            </div>

            <div class="form-container">
                <form method="POST" action="/songs">

                    <div class="form-row">
                        <div class="col">
                            <label for="artistName">Artist Name</label>
                            {/*<input type="text" class="form-control form-control-lg" value={this.props.name} name="artistName"readonly="readonly"/>*/}
                            <select class="form-control form-control-lg" name="artist_id">
                                <option selected>Choose...</option>
                                {allArtist}

                            </select>
                        </div>

                        <div class="col">
                        </div>
                    </div>

                    <br />

                    <div class="form-row">
                        <div class="col">
                            <label for="songTitle">Song Title</label>
                            <input type="text" class="form-control form-control-lg" name="title" />
                        </div>

                        <div class="col">
                            <label for="album">Album Name</label>
                            <input type="text" class="form-control form-control-lg" name="album" />
                        </div>
                    </div>

                    <br />

                    <div class="form-row">
                        <div class="col">
                            <label for="previewLink">Preview Link</label>
                            <input type="text" class="form-control form-control-lg" name="preview_link" />
                        </div>

                        <div class="col">
                            <label for="artwork">Artwork</label>
                            <input type="text" class="form-control form-control-lg" name="artwork" />
                        </div>
                    </div>

                    <br />

                    <button type="submit" class="btn btn-primary btn-lg float-right">Submit</button>

                </form>
            </div>

        </Layout>)  // end of return

    }  // end of rendering
}  // end of new artist class

module.exports = NewSong;