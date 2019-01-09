var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
        </head>
        <body>
            <div class="container" style={{marginTop: '50px'}}>
                <div class="row">
                    <div class="col-md-6">
                        <h1>Tunr</h1>
                    </div>
                    <div class="col-md-3">
                        {/* Home Button */}
                        <form method="GET" action={"/"} style={{float: 'right'}}>
                            <input type="submit" class="btn btn-primary" value="Home"/>
                        </form>
                    </div>
                    <div class="col-md-3">
                        {/* Modal New Recipe Form */}
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style={{float: 'right'}}>
                          Add New Artist
                        </button>
                    </div>
                </div>

                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Adding New Artist</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form method="POST" action="/">
                            <input type="" name="name" placeholder="Artist Name"/>
                            <input type="" name="photo_url" placeholder="Artist Photo URL"/>
                            <input type="" name="nationality" placeholder="Nationality" />
                            <input type="submit"/>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>

            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;