var React = require("react");
var DefaultLayout = require('./layouts/default');

class LoginForm extends React.Component {
    render() {
        return (
            <DefaultLayout>
                <div className="row">
                    <div className="col-8 offset-2">
                        <form method="POST" action="/login">
                            <h2 className="form-title">Login</h2>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-2 col-form-label">Username</label>
                                <div className="col-sm-10">
                                    <input name="username" className="form-control" required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" name="password" className="form-control" required/>
                                </div>
                            </div>
                            <div className="buttons text-center">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </DefaultLayout>
        );
    }
}

module.exports = LoginForm;