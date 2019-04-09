var React = require("react");
var DefaultLayout = require('./default')

class Home extends React.Component {
  render() {

    let artists = this.props.artists.map( (artist) => {
                            return (
                                    <tr key="artists">
                                        <td scope="col" className="text-center align-middle">{artist.id}</td>
                                        <td scope="col" className="text-center align-middle">{artist.name}</td>
                                        <td scope="col" className="text-center align-middle">
                                            <img style={{height: 250+"px"}} src={artist.photo_url}/>
                                        </td>
                                        <td scope="col" className=" text-center align-middle">{artist.nationality}</td>
                                    </tr>
                                );
                            });

    return (
    <DefaultLayout>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <td scope="col" className="bg-secondary text-center align-middle text-white">Number</td>
                        <td scope="col" className="bg-secondary text-center align-middle text-white">Name</td>
                        <td scope="col" className="bg-secondary text-center align-middle text-white">Image</td>
                        <td scope="col" className="bg-secondary text-center align-middle text-white">Nationality</td>
                    </tr>
                </thead>
                <tbody>
                    {artists}
                </tbody>
            </table>
        </DefaultLayout>
    );
  }
}

module.exports = Home;
