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
        let favArr = this.props.favArr;
        let fav = favArr.map(element =>{
            return <ArtistFunction key1={element}/>
        })
        return (
            <html>
                <head />
                <body>
                    <p>Your favorite songs:</p>
                    <ul>{fav}</ul>
                    <form method="GET" action={"/favorites/new"}>
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