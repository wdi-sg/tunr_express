var React = require('react');
var Layout = require('./components/layout.jsx');

class Register extends React.Component {
  render() {
    return (
      <Layout>
            <h1>New User Registration</h1>
            <form action="/register" method="POST">
                <div class="form-group">
                    <label for="name">Username:</label>
                    <input name="name" class="form-control col-3" id="name"/>
                  </div>
                  <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input name="password" class="form-control col-3" id="pwd"/>
                  </div>
                <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </Layout>
    );
  }
}

module.exports = Register;