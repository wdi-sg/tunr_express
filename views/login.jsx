var React = require('react');

class Login extends React.Component {
	render() {
		return (
			<html>
				<body>
					<h1> Login into this cool music app!!</h1>
					<form method="POST" action="/register">
						<p>
							name
							<input name="name" />
						</p>
						<p>
							password
							<input name="password" />
						</p>
						<p>
							<input type="submit" />
						</p>
					</form>
				</body>
			</html>
		);
	}
}

module.exports = Login;
