var React = require('react');
var Layout = require('./defaultlayout.jsx');

class Home extends React.Component {
	render() {
		return (
			<Layout>
				<h1 className='display-1 text-center'>Welcome!</h1>
				<div className='d-flex justify-content-center m-4'>
					<img
						src='https://camo.githubusercontent.com/35e6f40a123bc0498fcce97d3848e91ad53a2f9f/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f6b75354563466534504e4757412f67697068792e676966'
						className='img-fluid'
					/>
				</div>
				<div className='text-center'>
					<p>Show songs by artist: 		/artists/:id/songs</p>
					<p>Add songs to playlists: 		/playlist/:id/newsong</p>
				</div>
			</Layout>
		);
	}
}

module.exports = Home;
