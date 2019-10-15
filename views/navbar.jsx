var React = require('react');
class Navbar extends React.Component {
  render() {
    return (
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <h1 class="name lead">Tunr App</h1>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-item nav-link" href="/artists/">Home</a>
              <a class="nav-item nav-link" href="/artists/new">Add New Artist</a>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

module.exports = Navbar;