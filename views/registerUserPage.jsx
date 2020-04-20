var React = require("react");
var DefaultLayout = require('./layouts/default');
class RegisterUser extends React.Component {
  render() {
    return (
        <DefaultLayout>
        <div className="container h-100">
    <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6">
<form className="mt-5" method="POST" action="/register">
  <div className="form-group">
  <h1>Sign Up</h1>
    <label htmlFor="name">Username</label>
    <input type="text" className="form-control" name="username"/>
    <label htmlFor="name">Password</label>
    <input type="password" className="form-control" name="password"/>
    </div>
     <div className="d-flex flex-row-reverse">
    <button type="submit" className="btn btn-primary btn-customized">Sign Up</button>
    </div>
    </form>
    </div>
    </div>
    </div>
        </DefaultLayout>
    );
  }
}

module.exports = RegisterUser;