var React = require("react");

class NewSong extends React.Component {
  render() {
    let list = this.props.result.map(item => {
        return(
             <option value={item.id}>{item.title} by {item.name}</option>
        )

     
    });
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
            <h1 className="display-2 border-bottom">
              Add a song to your favorites{" "}
            </h1>
            <form method="POST" action="/favorites" className="pt-3"
            >
              <div class="input-group mb-3">
                <select class="custom-select" name="song" id="song">
                  {list}
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-success btn-lg btn-block"
              >
                Add
              </button>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = NewSong;
