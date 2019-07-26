const React = require('react');
const DefaultLayout = require('./layouts/default');

class Login extends React.Component {
  render() {

    let headerTitle = "New Account | Tunr";

    let newAccountURL = `/login`;

    return (

      <DefaultLayout title={headerTitle}>

        <h1>Login</h1>

        <form method="POST" action={newAccountURL}>
            <p>Name:</p>
            <input type={"text"} name={"name"} required/>
            <p>Password:</p>
            <input type={"text"} name={"password"} required/>
            <br/>
            <br/>
            <input type="submit" value="LOGIN"/>
        </form>

      </DefaultLayout>
    );
  }
}

module.exports = Login;