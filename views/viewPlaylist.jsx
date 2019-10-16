var React = require("react");

class ArtistFunction extends React.Component {
    render(){
        let element = this.props.key1;
        let id = element.id;
        let name = element.name;
        return(
            <li>
                <a href={"http://localhost:3000/playlist/"+id}>{name}</a>
            </li>
        );
    }
}

class vArtist extends React.Component {
    render() {
        let arr = this.props.arr;
        let artist = arr.map(element =>{
            return <ArtistFunction key1={element}/>
        })
        return (
            <html>
                <head />
                <body>
                    <p>List of playlist:</p>
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