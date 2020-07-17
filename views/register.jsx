var React = require('react');

class Register extends React.Component {
	render() {
		return (
			<html>
				<body>
					<h1> Sign up for this cool music app!!</h1>
					<form method="POST" action="/register">
						<p>
							Username
							<input name="username" />
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

module.exports = Register;
