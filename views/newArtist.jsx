var React = require('react');
var Layout = require('./layout');

class NewArtist extends React.Component {

    render () {

        return (<Layout>

            <div class="new-header">
                <h1>New Artist!</h1>
            </div>

            <div class="form-container">
                <form method="POST" action="/artist">

                    <div class="form-row">
                        <div class="col">
                            <label for="artistName">Artist Name</label>
                            <input type="text" class="form-control form-control-lg" name="name" />
                        </div>

                        <div class="col">
                            <label for="photo">Photo</label>
                            <input type="text" class="form-control form-control-lg" name="photo_url" />
                        </div>
                    </div>

                    <br />

                    <div class="form-row">
                        <div class="col">
                            <label for="nationality">Nationality</label>
                            <input type="text" class="form-control form-control-lg" name="nationality" />
                        </div>

                        <div class="col">
                        </div>
                    </div>

                    <br />

                    <button type="submit" class="btn btn-primary btn-lg float-right">Submit</button>

                </form>
            </div>

        </Layout>)  // end of return

    }  // end of rendering
}  // end of new artist class

module.exports = NewArtist;