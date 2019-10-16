var React = require('react');
var Layout = require('./defaultlayout.jsx');

class New extends React.Component {
	render() {
		return (
			<Layout>
				<div className='text-center col-12 d-flex flex-wrap justify-content-center'>
					<h2 class='m-3 col-12'>New Artist</h2>
					<form class='m-3' method='POST' action='/artists'>
						Name: <input type='text' name='name' required />
						<br />
						Photo URL: <input type='url' name='photo_url' required />
						<br />
						Nationality: <input type='text' name='nationality' required />
						<br />
						<input type='submit' value='Submit' className='m-2' />
					</form>
				</div>
			</Layout>
		);
	}
}

module.exports = New;
