var React = require('react');
var Layout = require('./defaultlayout.jsx');

class Login extends React.Component {
	render() {
			console.log("wowowowowo")
			console.log(this.props.loggedin)
			if (this.props.loggedin != undefined) {
				console.log("already logged in");
				return (
					<Layout>
					<div className='text-center col-12 d-flex flex-wrap justify-content-center'>
						<h2 class='m-3 col-12'>Already logged in</h2>
					</div>
				</Layout>
				)
			} else {
			console.log('not logged in');
				return (
					<Layout>
						<div className='text-center col-12 d-flex flex-wrap justify-content-center'>
							<h2 class='m-3 col-12'>Log in</h2>
							<form class='m-3' method='POST' action='/login'>
								Username: <input type='text' name='username' required />
								<br />
								Password: <input type='password' name='password' required />
								<br />
								<input type='submit' value='Submit' className='m-2' />
							</form>
						</div>
					</Layout>
				);
	}
	}
}

module.exports = Login;