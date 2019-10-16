const React = require('react');
const Layout = require('./layout');

class Show extends React.Component {
    render() {
// grab and destructure object
        let {name} = this.props.rows[0];
        let list = this.props.rows.map(song=>{
            return (
                <li><a href={'/songs/'+song.id}>{song.title}</a></li>
            );
        });
        return (
            <Layout>

                <div className="row">
                    <div className="col-8">
                        <h1 className="display-4">{name}</h1>
                        <hr className="my-4"/>
                        <ul>
                            {list}
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <form method="GET" action={"/playlists/"+this.props.playlistId+"/newsong"}>
                            <input type="submit" className="btn btn-warning btn-block" value="Add Song"/>
                        </form>
                    </div>
                    <div className="col">
                        <form method="POST" action={"/playlists/"+this.props.playlistId+"?_method=delete"}>
                            <input type="submit" className="btn btn-danger btn-block" value="Delete"/>
                        </form>
                    </div>
                </div>
            </Layout>
        );
    };
};

module.exports = Show;