var React = require("react");

class Delete extends React.Component {
  render() {
            var imageStyle = {
                height:'200px',
                width:'300px'
                }
            var url = '/homepage/'+this.props.result.id+'?_method=DELETE';
            var urlHome ='/homepage';
            return (
                <html>
                    <head>
                        <body>
                            <h1>DELETE</h1>
                            <a href={urlHome}>Home</a>
                            <br />
                            <img style={imageStyle} src={this.props.result.photo_url}/>
                            <p>Name: {this.props.result.name}</p>
                            <p>Nationality: {this.props.result.nationality}</p>
                            <br />
                            <form method="POST" action={url}>
                                <button type="submit">submit</button>
                            </form>
                        </body>
                    </head>
              </html>
            );
          }
        }

module.exports = Delete;