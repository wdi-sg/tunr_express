const React = require('react');

class Register extends React.Component {
	render () {

		return (

			<html lang="en">
			<head>
				<title>Registration</title>
			</head>
			<body>
				<div>
					Register<br/><br/>
					<form action="/registered" method="post">
					Name: <input type="text" name="name"/><br/>
					Password: <input type="password" name="password"/><br/>
					<button>Register</button>
					</form>
				</div>
			</body>
			</html>


			)

	}
}

module.exports = Register;