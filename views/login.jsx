const React = require('react');

class Login extends React.Component {
	render () {

		return (

			<html lang="en">
			<head>
				<title>Login</title>
			</head>
			<body>
				<div>
					Login<br/><br/>
					<form action="/logged" method="post">
					Name: <input type="text" name="name"/><br/>
					Password: <input type="password" name="password"/><br/>
					<button>Login</button>
					</form>
				</div>
			</body>
			</html>


		)
	}
}

module.exports = Login;