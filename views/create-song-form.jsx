var React = require('react');
var DefaultLayout = require('./default');

class NewSong extends React.Component {
    render() {

        return(
        <DefaultLayout>
            <h3>Form New Songs!</h3>
            <form action="/song" method="POST">
                <label> Song Title: </label>
                <input name="title" placeholder="Enter song tile"/>   <br/>
                <label> Album: </label>
                <input name="album" placeholder="Enter album name"/>   <br/>
                <label> Preview link: </label>
                <input name="preview_link" placeholder="Enter preview link"/>   <br/>
                <label> Artwork link: </label>
                <input name="artwork" placeholder="Enter artwork link"/>   <br/>
                <label> Artist Id: </label>
                <input name="artist_id" placeholder="Enter artist id"/>   <br/>

                <button type="button submit" class="btn btn-primary my-3">Submit</button>
            </form>
        </DefaultLayout>
        )
    }
}

module.exports = NewSong;