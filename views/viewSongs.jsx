var React = require("react");

class ArtistFunction extends React.Component {
    render(){
        let element = this.props.key1;
        return(
            <li>
                {element.title}
            </li>
        );
    }
}

class vArtist extends React.Component {
    render() {
        let artistArr = this.props.artistArr;
        let artistId = artistArr[0]["id"]
        let artist = artistArr.map(element =>{
            return <ArtistFunction key1={element}/>
        })
        return (
            <html>
                <head />
                <body>
                    <p>List of songs:</p>
                    <ul>{artist}</ul>
                    <form method="GET" action={"/artists/"+artistId+"/songs/new"}>
                        <p>
                            Click here to add new song: <br/>
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