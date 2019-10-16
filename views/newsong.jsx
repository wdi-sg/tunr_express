
const React = require("react");
const Layout = require('./layout');

class Newsong extends React.Component {
    render() {
        return (
            <Layout>

                <form method="POST" action={"/artists/"+ this.props.artist + "/songs"}>
                    <div className="form-group">
                        <label>Artist: </label>
                        <input className="form-control form-control-lg" type="text" value = {this.props.name} name="artistid" readOnly/>

                    </div>
                    <div className="form-group">
                        <label>Add song by {this.props.name}:</label>
                        <input className="form-control form-control-lg" type="text" placeholder="e.g. BEST SONG" name="song" required/>

                    </div>
                    <div className="form-group">
                        <label>Album name:</label>
                        <input className="form-control form-control-lg" type="text" placeholder="e.g. BEST ALBUM" name="album" required/>
                         <input type="hidden" name="id" defaultValue={this.props.artist}/>
                    </div>


                    <input type="submit" className="btn btn-primary btn-block" value="Submit"/>
                </form>

            </Layout>
        );
    };
};

module.exports = Newsong