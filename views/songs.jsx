var React = require("react");
var DefaultLayout = require('./default')

class Home extends React.Component {
  render() {

    let songs = this.props.songs.map( (song) => {
                            return (
                                    <tr key="artists">
                                        <td scope="col" className="text-center align-middle">
                                            <img style={{height: 250+"px"}} src={song.artwork}/>
                                        </td>
                                        <td scope="col" className="text-center align-middle">{song.title}</td>
                                        <td scope="col" className="text-center align-middle">{song.album}</td>
                                        <td scope="col" className=" text-center align-middle">
                                            <audio src={song.preview_link} controls/>
                                        </td>
                                    </tr>
                                );
                            });

    return (
    <DefaultLayout>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <td scope="col" className="bg-secondary text-center align-middle text-white">Artwork</td>
                        <td scope="col" className="bg-secondary text-center align-middle text-white">Title</td>
                        <td scope="col" className="bg-secondary text-center align-middle text-white">Album</td>
                        <td scope="col" className="bg-secondary text-center align-middle text-white">Preview</td>
                    </tr>
                </thead>
                <tbody>
                    {songs}
                </tbody>
            </table>
        </DefaultLayout>
    );
  }
}

module.exports = Home;
