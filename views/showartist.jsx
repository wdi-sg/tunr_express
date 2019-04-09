var React = require('react');


class ShowArtist extends React.Component {
    render() {
        return (
                <body>
                  <div>
                    <h3>Artist that you looked for: </h3>
                        <img src={this.props.artist[0].photo_url}/>
                        <div>
                          {this.props.artist[0].name}
                        </div>
                        <div>
                          {this.props.artist[0].nationality}
                        </div>
                  </div>
                </body>
            );
        }
    }


module.exports = ShowArtist;