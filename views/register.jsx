const React = require("react");
const Layout = require("./layout");

class Register extends React.Component {
  render() {
    const route = this.props.route;
    const header = this.props.header
    return (
      <Layout username={this.props.username}>
        <div className="container">
        <h1 className="display-1 text-center">{header}</h1>
          <form action={route} method="POST">
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
                type="password"
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
