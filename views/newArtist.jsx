var React = require ('react');

class newArtist extends React.Component {
    render() {

        return (
                <form className="new-artist" action="/artist/" method="POST">
                    <div>
                        <h5>Artist name:</h5>
                        <input name="name"/>
                    </div>
                    <div>
                        <h5>Photo URL for Artist:</h5>
                        <input name="photo_url"></input>
                    </div>
                    <div>
                        <h5>Nationality:</h5>
                        <input name="nationality"></input>
                    </div>
                    <div>
                        <button type="submit"> Add New Artist </button>
                    </div>
                </form>
        )
    }
}

module.exports = newArtist;