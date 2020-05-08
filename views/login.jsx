var React = require('react');
var DefaultLayout = require('./layouts/default');
class Login extends React.Component {
  render() {
    return (

          <DefaultLayout pageTitle={this.props.pageTitle}>



                  { this.props.warning }
            <form method="POST" action="/login">
             <br/>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">User Name:</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1" name="username" />
                </div>
                  <br/>
                <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Password:</label>
                <input type="password" className="form-control" id="exampleFormControlInput1" name="password" />
                </div>
                  <br/>
                  <input type="submit"  className="btn btn-primary mb-2" value="Submit"/>
            </form>
          </DefaultLayout>
    );
  }
}

module.exports = Login;