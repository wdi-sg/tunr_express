var React = require("react");
var Layout = require('./layout');

class New extends React.Component {
  render() {
     console.log("THIS IS  PAGE");
    console.log(this.props);
    var path = this.props.route;

    return (
      <Layout>
      <h1 class ="display-1 text-center">{this.props.header}</h1>

          <form action = {path} method = "POST">
              <div class="form-group">
                <label for="exampleFormControlInput1">Username:</label>
                <input type="text" class="form-control" name="username" placeholder="Username"/>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Password:</label>
                <input type="text" class="form-control" name="password" placeholder="Password"/>
              </div>
              <input class="btn btn-secondary btn-lg" type="submit" value="Submit"/>
            </form>
        </Layout>
    );
  }
}

module.exports = New;