var React = require("react");


class AddToPlayList extends React.Component {
    render() {
        let url = '/playlist/'+ this.props.id;
        const songList = this.props.songs.map(song => {
         return <option value={song.id}>{song.title}--{song.album}</option>
       });

         return (<html>
                    <body>
                        <h1>Add song to playlist</h1>
                        <form action={url} method="POST">
                            <p>Name:
                                <select name="songs">
                                {songList}
                                </select>
                            </p>
                            <button type = "submit">Submit</button>
                        </form>
                    </body>
                </html>
                );
    }
}

 module.exports = AddToPlayList;