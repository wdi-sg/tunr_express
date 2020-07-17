const React = require('react');

class id extends React.Component {
    render() {

        return (
            <html>
             <body>
                <div>
                    <h1>{this.props.artists.Name}</h1>

                        <div>

                            <ul>{this.props.artists.photo_url}</ul>
                            <ul>{this.props.artists.nationality}</ul>
                        </div>
                </div>
             </body>
            </html>
            )}
    }



module.exports = id;