
const React = require("react");
const Layout = require('./layout');

class Login extends React.Component {
    render() {
        return (
            <Layout>
                <div>
                    <a href="/register"><input type="submit" className="btn btn-danger " value="REGISTER!!!"/></a>
                </div>
                <br/>

                <h1>WELCOME TO bnana.</h1>

                <h2> Please login.</h2>
                <form method="POST" action="/bananas">
                    <div className="form-group">
                        <label>Username: </label>
                        <input className="form-control form-control-lg" type="text" placeholder="username" name="username" required/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input className="form-control form-control-lg" type="text" placeholder="password" name="password" required/>
                    </div>

                    <input type="submit" className="btn btn-primary" value="Submit"/>
                </form>

            </Layout>
        );
    };
};

module.exports = Login;