var React = require('react');
var DefaultLayout = require('./layouts/default');

class Artists extends React.Component {
	render() {
		return (
			<DefaultLayout>
				<div className="row my-5">
					{/*{songs}*/}
				</div>
			</DefaultLayout>
		);
	}
}

module.exports = Artists;
