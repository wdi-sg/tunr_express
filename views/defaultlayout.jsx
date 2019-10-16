var React = require('react');

class DefaultLayout extends React.Component {
	render() {
		const navStyle = {
			'background-color': '#78a9cc'
		};
		const aStyle = {
			color: 'black'
		};

		const imgStyle = {
			width: '100%',
			maxWidth: '400px',
			textAlign: 'center'
		};
		return (
			<html>
				<head>
					<link
						rel='stylesheet'
						href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
						integrity='sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO'
						crossorigin='anonymous'
					/>
					<title>tunr</title>
				</head>
				<body>
					<nav class='navbar navbar-light' style={navStyle}>
						<ul class='nav justify-content-center nav-tabs'>
							<li class='nav-item'>
								<a class='nav-link ml-2' href='http://localhost:3000/artists' style={aStyle}><strong>TUNR</strong>
									
								</a>
							</li>
							<li class='nav-item'>
								<a class='nav-link ml-2' href='http://localhost:3000/artists' style={aStyle}>
									Home
								</a>
							</li>
							<li class='nav-item'>
								<a class='nav-link' href='http://localhost:3000/artists/1/songs' style={aStyle}>
									Songs By Artist 1
								</a>
							</li>
							<li class='nav-item'>
								<a class='nav-link' href='http://localhost:3000/artists/new' style={aStyle}>
									New Artist
								</a>
							</li>
							<li class='nav-item'>
								<a class='nav-link' href='http://localhost:3000/playlists/new' style={aStyle}>
									New Playlist
								</a>
							</li>
							<li class='nav-item'>
								<a class='nav-link' href='http://localhost:3000/playlists' style={aStyle}>
									Show all playlists
								</a>
							</li>
						</ul>
					</nav>

                        <div>
                            {this.props.children}
                        </div>
					
				</body>
			</html>
		);
	}
}

module.exports = DefaultLayout;
