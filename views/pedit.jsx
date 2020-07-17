const React = require('react');
const Layout = require('./layout');

class Edit extends React.Component {
    render() {
        let {id, name} = this.props;
        return (
            <Layout>

                <form method="POST" action={"/playlists/"+id+"?_method=put"}>
                    <div>
                        <h1 className='display-4'><small class="text-muted">Add Song into </small>{name}</h1>
                    </div>
                    <div className="form-group">
                        <label>Song Title</label>
                        <input className="form-control form-control-lg" type="text" placeholder="e.g. We Will (console.)Log You!" name="title" required/>
                    </div>
                    <input type="submit" className="btn btn-success btn-block" value="Submit"/>
                </form>

            </Layout>
        );
    };
};

module.exports = Edit;