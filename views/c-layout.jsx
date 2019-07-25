var React = require('react');

class Layout extends React.Component {
  render() {
    return (
    <html>
        <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>


        <link href="./style.css" rel="stylesheet"/>
        </head>


      <body>
        <header>
          <div class="collapse bg-dark" id="navbarHeader">
            <div class="container">
              <div class="row">
                <div class="col-sm-8 col-md-7 py-4">
                  <h4 class="text-white">TUNR BITCHESSS</h4>
                  <p class="text-muted">Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.</p>
                </div>
                <div class="col-sm-4 offset-md-1 py-4">
                  <h4 class="text-white">Contact</h4>
                  <ul class="list-unstyled">
                    <li><a href="#" class="text-white">Follow on Twitter</a></li>
                    <li><a href="#" class="text-white">Like on Facebook</a></li>
                    <li><a href="#" class="text-white">Email me</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="navbar navbar-dark bg-dark shadow-sm">
            <div class="container d-flex justify-content-between">
              <a href="#" class="navbar-brand d-flex align-items-center">
                <img src="./disc.png" width="20" height="20" fill="none"/>
                <strong>TUNR</strong>
              </a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </header>

        <main role="main">

            <section class="jumbotron text-center">
            <div class="container">
              <h1 class="jumbotron-heading">My Collection</h1>
              <p class="lead text-muted">Browse discography and songs by your favourite artists. TUNR bitchesss!</p>
              <p>
                <a href={'/'} class="btn btn-primary my-2">Browse by Artists</a>
                <a href={'/artist/new'} class="btn btn-secondary my-2">Add New Artist</a>
              </p>
            </div>
          </section>
          <div class="album py-5 bg-dark">
            <div class="container">
                <div class="row">

                    {this.props.children}

                </div>
            </div>
          </div>
        </main>
      </body>
    </html>
    );
  }
}


module.exports = Layout;