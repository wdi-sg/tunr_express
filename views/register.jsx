const React = require("react");
const Layout = require("./layout");

class Register extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <form action="/register" method="POST">
            <div class="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="username"
                placeholder="Username"
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    );
  }
}

module.exports = Register;
