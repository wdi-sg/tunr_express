const React = require('react');
const DefaultLayout = require('./layouts/default');

class Register extends React.Component {
  render() {

    let headerTitle = "New Account | Tunr";

    let newAccountURL = `/register`;
    let loginURL = `/login`;
    let buttonStyle = {'fontSize': '25px'}


    return (

      <DefaultLayout title={headerTitle}>

        <h1>Register New Account</h1>

        <form method="POST" action={newAccountURL}>
            <p>Name:</p>
            <input type={"text"} name={"name"} required/>
            <p>Password:</p>
            <input type={"text"} name={"password"} required/>
            <br/>
            <br/>
            <input type="submit" value="CREATE ACCOUNT"/>
        </form>
        <br/>
        <p>Already have an account? Login instead</p>
        <form action={loginURL}>
            <button style={buttonStyle} type={"submit"}>LOGIN</button>
        </form>

      </DefaultLayout>
    );
  }
}

module.exports = Register;