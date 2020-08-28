const React = require('react');

export default class Onesong extends React.Component { //component is capitalized for first letter of name of file.
    render(){
        let {id, title, album, preview_link, artwork, artist_id} = this.props;

        return (
            <html>
                <body>
                    <div>
                      <ul>
                          <li>Title: {title} <br/></li>
                          <li>Album: {album} <br/></li>
                          <li>Preview: <br /> <img src={`${preview_link}`} style={{width: 10 + '%'}}/> <br /></li>
                          <li>Artwork: <br /> <img src={`${artwork}`} style={{width: 10 + '%'}}/> <br /></li>
                      </ul>
                    </div>
                    <div>
                        <a href={`/songs/${id}/delete`}>Delete Song</a>
                        <br />
                        <a href={`/songs/${id}/edit`}>Update Song</a>
                         <br />
                        <a href={`/songs/`}>Home</a>
                    </div>
                </body>
            </html>
            )
    }
}


