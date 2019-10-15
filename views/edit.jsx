var React = require("react");

class Edit extends React.Component {
  render() {
    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          ></link>
        </head>
        <body>
         
          <div className="container text-center pt-5">
            <h1 className="display-2 border-bottom">Editing {this.props.result.name}</h1>
            <form method="POST" action={
                    "/artists/" +
                    this.props.result.id +
                    "?_method=put"
                  } className="pt-3">
              <p>
                <input
                  type="text"
                  name="name"
                  value={this.props.result.name}
                  class="form-control form-control-lg"
                />
              </p>
              <p>
                <input
                  type="text"
                  name="photo_url"
                  value={this.props.result.photo_url}
                  class="form-control form-control-lg"
                />
              </p>
              <p>
                <input
                  type="text"
                  name="nationality"
                  value={this.props.result.nationality}
                  class="form-control form-control-lg"
                />
              </p>
          
              <button type="submit" className="btn btn-success btn-lg btn-block" >Edit</button>
            </form>
          </div>
         
        </body>
      </html>
    );
  }
}

module.exports = Edit;
