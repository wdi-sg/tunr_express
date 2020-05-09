var React = require('react');
var Layout = require('./layout');

class EditArtist extends React.Component {

    render () {

        const action = `/artist/${this.props.id}?_method=put`;

        return (<Layout>

            <div class="new-header">
                <h1>Edit Artist!</h1>
            </div>

            <div class="form-container">
                <form method="POST" action={action}>

                    <div class="form-row">
                        <div class="col">
                            <label for="artistId">ID</label>
                            <input type="number" class="form-control form-control-lg" name="id" readonly="readonly" value={this.props.id} />
                        </div>

                        <div class="col">
                            <label for="artistName">Artist Name</label>
                            <input type="text" class="form-control form-control-lg" name="name" value={this.props.name}/>
                        </div>
                    </div>

                    <br />

                    <div class="form-row">
                        <div class="col">
                            <label for="photo">Photo</label>
                            <input type="text" class="form-control form-control-lg" name="photo_url" value={this.props.photo_url}/>
                        </div>

                        <div class="col">
                            <label for="nationality">nationality</label>
                            <input type="text" class="form-control form-control-lg" name="nationality" value={this.props.nationality}/>
                        </div>
                    </div>

                    <br />

                    <button type="submit" class="btn btn-primary btn-lg float-right">Edit</button>

                </form>
            </div>

        </Layout>)  // end of return
    }  // end of rendering
}  // end of class

module.exports = EditArtist;