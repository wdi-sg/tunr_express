var React = require("react");

class BANNER extends React.Component {
  render() {
    return (
    	<div>
    		<div className ={'banner'}>
	      	</div>
      		<nav className={"navbar navbar-expand-lg navbar-light bg-light"}>
	  			<button className={"navbar-toggler"} type={"button"} data-toggle={"collapse"} data-target={"#navbarTogglerDemo01"} aria-controls={"navbarTogglerDemo01"} aria-expanded={"false"} aria-label={"Toggle navigation"}>
	    			<span className={"navbar-toggler-icon"}></span>
	  			</button>
	 			 <div className={"collapse navbar-collapse justify-content-center"} id={"navbarTogglerDemo01"}>
	   				<ul className={"navbar-nav mt-2 mt-lg-0"} id={'navbar'}>
	      				<li className={"nav-item active"}>
	        				<a className={"nav-link"} href="#">Home</a>
	      				</li>
	      				<li className={"nav-item dropdown"}>
	        				<a className={"nav-link dropdown-toggle"} data-toggle={"dropdown"} href={"#"} role={"button"} aria-haspopup={"true"} aria-expanded={"false"}>Artists</a>
    						  <div className={"dropdown-menu"}>
      							<a className={"dropdown-item"} href={'/artists'}>All Artists</a>
      							<div className={"dropdown-divider"}></div>
      							<a className={"dropdown-item"} href={'/artists/new'}>New Artist</a>
    						  </div>
	      				</li>
	      				<li className={"nav-item dropdown"}>
	        				<a className={"nav-link dropdown-toggle"} data-toggle={"dropdown"} href={"#"} role={"button"} aria-haspopup={"true"} aria-expanded={"false"}>Songs</a>
    						  <div className={"dropdown-menu"}>
      							<a className={"dropdown-item"} href={'/songs'}>All Songs</a>
      							<div className={"dropdown-divider"}></div>
      							<a className={"dropdown-item"} href={'/songs/new'}>New Song</a>
    						  </div>
	      				</li>
                <li className={"nav-item dropdown"}>
                  <a className={"nav-link dropdown-toggle"} data-toggle={"dropdown"} href={"#"} role={"button"} aria-haspopup={"true"} aria-expanded={"false"}>Playlists</a>
                  <div className={"dropdown-menu"}>
                    <a className={"dropdown-item"} href={'/playlist'}>Playlists</a>
                    <div className={"dropdown-divider"}></div>
                    <a className={"dropdown-item"} href={'/playlist/new'}>New Playlist</a>
                  </div>
                </li>
                <li className={"nav-item active"}>
                  <a className={"nav-link"} href="/logout">Logout</a>
                </li>
	    			</ul>
  				</div>
			</nav>
      </div>
    );
  }
}

module.exports = BANNER;