const React = require('react');

export default class Profile extends React.Component { //component is capitalized for first letter of name of file.
    render(){
        let {id,name,photo_url,nationality} = this.props;

        return (
            <html>
                <body>
                    <div>
                      <ul>
                          <li>Name: {name} <br/></li>
                          <li>Profile Picture: <br /> <img src={`${photo_url}`} style={{width: 10 + '%'}}/> <br /></li>
                          <li>Nationality: {nationality}</li>
                          <li><a href={`/artists/${id}/songs`}>Song List</a></li>
                      </ul>
                    </div>
                    <div>
                    <a href={`/artists/${id}/songs/new`}>Add Song</a>
                    <br />
                        <a href={`/artists/${id}/delete`}>Delete Artist</a>
                        <br />
                        <a href={`/artists/${id}/edit`}>Update Artist</a>
                         <br />
                        <a href={`/artists/`}>Home</a>
                        <br />
                    </div>
                </body>
            </html>
            )
    }
}


