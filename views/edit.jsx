var React = require("react");

class Edit extends React.Component {
  render() {
            var url = '/homepage/'+this.props.result.id+'?_method=PUT';
            var urlHome ='/homepage';
            var urlProfile = '/homepage/'+this.props.result.id;
            return (
                <html>
                    <head>
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
                        <link href="https://fonts.googleapis.com/css?family=Fira+Sans+Extra+Condensed|Permanent+Marker&display=swap" rel="stylesheet"/>
                        <link rel="stylesheet" type="text/css" href="/style3.css"/>
                    </head>
                        <body>
                            <div className="containertop row">
                                <div className="col-4">
                                    <a className = "button" href={urlHome}>!!ARTISTS!!</a>
                                </div>
                                <div className="col-4">
                                    <div className="title">
                                        <p>Edit Entry</p>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <a className = "button" href={urlProfile}>!!Profile!!</a>
                                </div>
                            </div>
                            <img src={this.props.result.photo_url}/>
                            <div className="containermid">
                                <form method="POST" action={url}>
                                    <h4>Artist name</h4>
                                    <input name="name" defaultValue={this.props.result.name}/>
                                    <h4>Photo_url</h4>
                                    <input name="photo_url" defaultValue={this.props.result.photo_url}/>
                                    <h4>Nationality</h4>
                                    <input name="nationality" defaultValue={this.props.result.nationality}/>
                                    <br />
                                    <br />
                                    <button type="submit">submit</button>
                                </form>
                            </div>
                        </body>
              </html>
            );
          }
        }

module.exports = Edit;