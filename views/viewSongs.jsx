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
        let artist = artistArr.map(element =>{
            return <ArtistFunction key1={element}/>
        })
        return (
            <html>
                <head />
                <body>
                    <p>List of songs:</p>
                    <ul>{artist}</ul>
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