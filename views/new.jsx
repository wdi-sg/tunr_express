var React = require("react");
const Layout = require("./layout");

class New extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Layout username={this.props.username}>
        <div className="container">
          <form action="/artists" method="POST">
            <div class="form-group">
              <label for="exampleInputEmail1">Artist Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="name"
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Photo URL</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                name="photoURL"
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Nationality</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                name="nationality"
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

module.exports = New;
