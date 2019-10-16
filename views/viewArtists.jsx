var React = require("react");

class ArtistFunction extends React.Component {
    render(){
        let element = this.props.key1;
        return(
            <div>
                <h5><a href={"http://localhost:3000/artists/"+element.id}>{element.name}</a></h5>
                {/*<img src={element.photo_url}/>*/}
            </div>
        );
    }
}

class vArtist extends React.Component {
    render() {
        let artistArr = this.props.artistArr;
        let artist = artistArr.map(element =>{
            return <ArtistFunction key1={element}/>
        })
        return (
            <html>
                <head />
                <body>
                    <div>{artist}</div>
                    <form method="GET" action="/artists/new">
                        <p>
                            To add artists: <br/>
                            <input type="submit" value="Add"/>
                        </p>
                    </form>
                    <form method="GET" action="/">
                        <p>
                            Click here to go back: <br/>
                            <input type="submit" value="Back"/>
                        </p>
                    </form>
                </body>
            </html>
        );
    }
}

module.exports = vArtist;