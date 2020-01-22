var React = require("react");
var DefaultLayout = require("./layouts/default");

class NewPlaylist extends React.Component {
    render() {
        return (<DefaultLayout>
                    <h1>Add new playlist</h1>
                    <form action="/playlist" method="POST">
                        <p>name:
                        <input type="text" name="name"/></p>
                        <input type="submit" className="btn btn-primary"/>
                    </form>
                </DefaultLayout>);
    }
}

module.exports = NewPlaylist;
