const React = require('react');

export default class Songprofile extends React.Component { //component is capitalized for first letter of name of file.
    render(){
        let {songs} = this.props;

        let songList = songs.map(item=>{
            return <li>Title: {item.title} <br />
                        Album: {item.album} <br />
                        Preview: <img src={`${item.preview_link}`} /> <br />
                        ArtWork: <img src={`${item.artwork}`} /> <br />
                        </li>
        })

        return (
            <html>
                <body>
                    <div>
                      <ol>
                      <h3>Songs List:</h3>
                        {songList}
                      </ol>
                    </div>
                </body>
            </html>
            )
    }
}


