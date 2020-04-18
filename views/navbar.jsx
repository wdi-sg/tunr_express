var React = require("react");

class Navbar extends React.Component {
  render() {
    return (
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a class="navbar-brand">TUNES</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample02"
          aria-controls="navbarsExample02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsExample02">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/artists">
                Artists
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/songs">
                Songs
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/playlist">
                Playlists
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Add New
              </a>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a class="dropdown-item" href="/artists/new">
                  Add New Artist
                </a>
                <a class="dropdown-item" href="/songs/new">
                  Add New Song
                </a>
                <a class="dropdown-item" href="/playlist/new">
                  Add New Playlist
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

module.exports = Navbar;
