var React = require('react');
var Layout = require('./components/layout.jsx');

class wrongPwd extends React.Component {
  render() {
    return (
      <Layout>
            <h1>Oops! Wrong Password!<br/>Please try again.</h1>
            <form action="/login" method="POST">
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

module.exports = wrongPwd;