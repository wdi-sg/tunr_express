var React = require("react");

class New extends React.Component {
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
            <h1 className="display-2 border-bottom">Add a Song</h1>
            <form method="POST" action="/artists" className="pt-3">
              <p>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  class="form-control form-control-lg"
                />
              </p>
              <p>
                <input
                  type="text"
                  name="photo_url"
                  placeholder="Photo URL"
                  class="form-control form-control-lg"
                />
              </p>
              <p>
                <input
                  type="text"
                  name="nationality"
                  placeholder="Nationality"
                  class="form-control form-control-lg"
                />
              </p>
          
              <button type="submit" className="btn btn-success btn-lg btn-block" >Add</button>
            </form>
          </div>
         
        </body>
      </html>
    );
  }
}

module.exports = New;
