var React = require("react");

class Edit extends React.Component {
  render() {
            var imageStyle = {
                height:'200px',
                width:'300px'
                }
            var url = '/homepage/'+this.props.result.id+'?_method=PUT';
            var urlHome ='/homepage';
            return (
                <html>
                    <head>
                        <body>
                            <h1>EDIT</h1>
                            <a href={urlHome}>Home</a>
                            <br />
                            <img style={imageStyle} src={this.props.result.photo_url}/>
                            <form method="POST" action={url}>
                                <p>name</p>
                                <input name="name" defaultValue={this.props.result.name}/>
                                <p>img</p>
                                <input name="photo_url" defaultValue={this.props.result.photo_url}/>
                                <p>height</p>
                                <input name="nationality" defaultValue={this.props.result.nationality}/>
                                <br />
                                <button type="submit">submit</button>
                            </form>
                        </body>
                    </head>
              </html>
            );
          }
        }

module.exports = Edit;