var React = require("react");
import Nav from "./components/nav";
import Head from "./components/header";
import Footer from "./components/footer";

class Register extends React.Component {
  render() {

    let errorDisplay;

    if (this.props.errorMsg!==undefined){
      errorDisplay = <div className="error"><p>Error: {this.props.errorMsg}</p></div>
    }

    return (
      <html>
        <Head />
        <body>
          <Nav />
          <div className="container-fluid">
            <h3>Register</h3>
            {errorDisplay}
            <form action="/register" method="post">
              <input name="username" placeholder="username" />
              <input type="password" name="password" placeholder="password" />
              <button className="btn btn-success" type="submit">
                Register
              </button>
            </form>
          </div>

          <Footer />
        </body>
      </html>
    );
  }
}

module.exports = Register;
