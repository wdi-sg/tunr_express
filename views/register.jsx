var React = require("react");
import Nav from "./components/nav";
import Head from "./components/header";
import Footer from "./components/footer"

class Register extends React.Component {
  render() {

    return (
      <html>
        <Head/>
        <body>
        <Nav/>
          <h3>Register</h3>
          <form action="/register" method="post">
            <input name="username" placeholder="username" />
            <input name="password" placeholder="password" />
            <button className="btn btn-success" type="submit">
              Register
            </button>
          </form>
          <Footer/>
        </body>
      </html>
    );
  }
}

module.exports = Register;
