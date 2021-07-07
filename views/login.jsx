var React = require("react");

//Using string and literals in react.

class Login extends React.Component {
	render() {

		

		return (
			<html>
				<head>
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
				</head>
					<body>
						<h1> Login Here </h1>
						 <form action = "/login/" method="POST">
									<div class="form-group">
										<label for="exampleInputEmail1">Email address</label>
										<input name="emailaddress" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
										<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
									</div>
									<div class="form-group">
										<label for="exampleInputPassword1">Password</label>
										<input name="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
									</div>
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="exampleCheck1"/>
										<label class="form-check-label" for="exampleCheck1">Check me out</label>
									</div>
									<button type="submit" class="btn btn-primary">Submit</button>
						</form>
					</body>
			</html>
		);
	}
}

module.exports = Login;