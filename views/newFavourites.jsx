var React = require('react');

class newFavourite extends React.Component {
    render() {

        let songs = this.props.id;

        return (
            <html>
            <body>
            <form method = "POST" action='/favourite'>

             let songs = this.props.songs;

    let optionArr = songs.map( song => {
        return (
              <option value={song.id}>{song.title}</option>
        )
    })

    return  <select name="song_id">
                {optionArr}
            </select>

  }
}

                <input type="submit" value="submit"/>
                </form>

            </body>

            </html>)
    }
}


module.exports = newFavourite;