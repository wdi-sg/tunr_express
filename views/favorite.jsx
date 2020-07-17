
const React = require("react");
const Layout = require('./layout');

class Favorite extends React.Component {
    render() {
        return (
            <Layout>

                <form method="POST" action="/favorites">
                    <div className="form-group">
                        <label>Favorite:</label>
                        <input className="form-control form-control-lg" type="text" placeholder="e.g. FAVORITE SONG" name="favorite" required/>
                    </div>

                    <input type="submit" className="btn btn-primary btn-block" value="Submit"/>
                </form>

            </Layout>
        );
    };
};

module.exports = Favorite;