const React = require('react');

class registerNewUser extends React.Component {
	render () {

		return (
			<html>
			<head></head>
			  <body>
			  <h1>Create new account</h1>
			    <h3>
			    <form method="post" action="/register" >
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

module.exports = registerNewUser;