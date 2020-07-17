const React = require("react");
const Layout = require('./layout');

class New extends React.Component {
    render() {
        return (
            <Layout>
                <h1 className="display-4">Log In</h1>
                <form method="POST" action="/login">
                    <div className="form-group">
                        <label>Username</label>
                        <input className="form-control" type="text" placeholder="username" name="username" required/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="password" placeholder="password" name="password" required/>
                    </div>
                    <input type="submit" className="btn btn-success btn-block" value="Log In!"/>
                </form>

            </Layout>
        );
    };
};

module.exports = New;