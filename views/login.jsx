const React = require('react');

class login extends React.Component {
	render () {

		return (
			<html>
			<head></head>
			  <body>
			  <h1>Login to your account</h1>
			    <h3>
			    <form method="post" action="/login" >
			      <p>Username: </p><input type="text" name="username" />
			      <p>Password: </p><input type="password" name="password" />
			      <br/>
			      <input type="submit" value="Submit" />
			    </form>
			    </h3>
			  </body>
			</html>
		);

	}
}

module.exports = login;