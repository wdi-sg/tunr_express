var React = require('react');

class Artistspage extends React.Component {
  render() {

    const artistCards = this.props.rows.map(artist =>{
        // let pokePage = "/pokemon/" + pokemon.num;
        return (
                <div className="artist-card">
                        <img src={this.props.rows.photo_url}/>
                        <p>{this.props.row.nationality}</p>
                        <h1>{this.props.row.name}</h1>
                </div>
        )
    });

    return (
        <html>
        <head>
            <title>Artists Page</title>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <header>
        <nav>
            <ul id="nav-container">
                <li className="item"><a href="/pokemon">Home</a></li>
                <li className="item"><a href="/pokemon/new">New</a></li>
                <li className="item"><a href="null">Types</a></li>
                <div id="bar"></div>
            </ul>
        </nav>
        <a href="/pokemon"><img id="header-img" src="/header.jpg"/></a>
        </header>
        <body>
            <h3>Sort Those Pokémon!</h3>
            <form method='GET' action='/pokemon'>
                <select name='sortby'>
                    <option value='num'>Number</option>
                    <option value='name'>Name</option>
                    <option value='height'>Height</option>
                    <option value='weight'>Weight</option>
                </select>
                <input type='submit'/>
            </form>
            <div id="pokemon-container">
                {pokeCards}
            </div>
        </body>
        </html>
    );
  }
}

module.exports = Artistspage;