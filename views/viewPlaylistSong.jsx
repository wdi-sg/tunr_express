var React = require("react");

class ArtistFunction extends React.Component {
    render(){
        let element = this.props.key1;
        // let id = element.id;
        let title = element.title;
        return(
            <li>
                {title}
            </li>
        );
    }
}

class vArtist extends React.Component {
    render() {
        let arr = this.props.arr;
        let id = this.props.arr2;
        let artist = arr.map(element =>{
            return <ArtistFunction key1={element}/>
        })
        return (
            <html>
                <head />
                <body>
                    <p>List of Song in playlist:</p>
                    <ul>{artist}</ul>
                    <form method="GET" action={"/playlist/"+id+"/newsong"}>
                        <p>
                            Click here to add song to playlist: <br/>
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