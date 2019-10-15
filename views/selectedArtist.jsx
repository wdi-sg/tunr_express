var React = require("react");

class ArtistFunction extends React.Component {
    render(){
        let element = this.props.key1;
        console.log(element.name)
        console.log(element.nationality)
        return(
            <div>
                <h3>{element.name}</h3>
                <p>Nationality: {element.nationality}</p>
                {/*<img src={element.photo_url}/>*/}
            </div>
        );
    }
}

class vArtist extends React.Component {
    render() {
        let artistArr = this.props.artistArr;
        let id = artistArr[0]["id"];
        let artistId = `${id}`;
        console.log("Artist: ",artistArr)
        let artist = artistArr.map(element =>{
            return <ArtistFunction key1={element}/>
        })
        return (
            <html>
                <head />
                <body>
                    <div>{artist}</div>
                    <form method="GET" action={artistId+"/songs"}>
                        <p>
                            Click here to view songs: <br/>
                            <input type="submit" value="songs"/>
                        </p>
                    </form>
                    <form method="GET" action={artistId+"/edit"}>
                        <p>
                            Click here to edit artist: <br/>
                            <input type="submit" value="Edit"/>
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