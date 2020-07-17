
const React = require("react");
const Layout = require('./layout');

class Register extends React.Component {
    render() {
        return (
            <Layout>

                <form method="POST" action="/register">
                    <div className="form-group">
                        <label>Username: </label>
                        <input className="form-control form-control-lg" type="text" placeholder="be creative." name="username" required/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input className="form-control form-control-lg" type="text" placeholder="'password' is NOT a good password." name="password" required/>
                    </div>

                    <input type="submit" className="btn btn-primary" value="Submit"/>
                </form>

            </Layout>
        );
    };
};

module.exports = Register;