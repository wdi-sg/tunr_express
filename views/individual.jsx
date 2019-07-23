var React = require("react");

class Individual extends React.Component {
  render() {
            var imageStyle = {
                height:'200px',
                width:'300px'
                }
            var urlHome ='/homepage';
            var urlEdit ='/homepage/'+this.props.result.id+'/edit';
            var urlDelete ='/homepage/'+this.props.result.id+'/delete';
            return (
              <html>
                <head />
                <body>
                  <h1>Individual</h1>
                  <img style={imageStyle} src={this.props.result.photo_url}/>
                  <p>Artist id: {this.props.result.id}</p>
                  <p>Artist name: {this.props.result.name}</p>
                  <p>Artist nationality: {this.props.result.nationality}</p>
                  <a href={urlHome}>Home</a>
                  <a href={urlEdit}>Edit</a>
                  <a href={urlDelete}>Delete</a>
                </body>
              </html>
            );
          }
        }

module.exports = Individual;