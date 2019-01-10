var React = require('react');
var Navbar = require('./navbar');

class TitleList extends React.Component{
    render(){
        return(
            <React.Fragment>
                <a href={"/playlists/select/" + this.props.list.id}>
                    <li class="list-group-item">
                        {this.props.list.playlist}
                    </li>
                </a>
            </React.Fragment>
        );
    }
}

class Titles extends React.Component{
    render(){
        const titling = this.props.list.map( titles => {
            return <TitleList list={titles}></TitleList>;
        });
        return(
            <Navbar>
                <div>
                    <ul class="list-group" style={{  width: '18rem'}}>
                      <li class="list-group-item active">Playlists:</li>
                      {titling}
                        <form action="http://localhost:3000/create/newPlaylist" method="post">
                            <div class="input-group mb-3">
                                <input type="text" id="playlist" name="playlist" class="form-control" placeholder="Add new playlist name" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Submit</button>
                                </div>
                            </div>
                        </form>
                    </ul>
                </div>
            </Navbar>
            );
    }
}

module.exports = Titles;