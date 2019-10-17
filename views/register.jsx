var React = require('react');
var Layout = require('./defaultlayout.jsx');

class Register extends React.Component {
	render() {
		return (
			<Layout>
				<div className='text-center col-12 d-flex flex-wrap justify-content-center'>
					<h2 class='m-3 col-12'>New User Registration</h2>
					<form class='m-3' method='POST' action='/register'>
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

module.exports = Register;
