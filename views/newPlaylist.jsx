const React = require('react');

class newPlaylist extends React.Component {
    render() {

        return(
            <html>
             <body>
                <div>
                    <h1>New Playlist</h1>
                    <form action="/playlist/" method="post" id="new">

                        <div>
                            <label htmlFor="name">Name: </label>
                            <input type="text" name="name" />
                        </div>
                    </form>
                    <button type="submit" form="new" value="submit">
                        Submit
                    </button>
                </div>
             </body>
            </html>
            )}
    }



module.exports = newPlaylist;