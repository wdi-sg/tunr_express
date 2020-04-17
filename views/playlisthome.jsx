var React = require("react");

class playlist extends React.Component {
  render() {

    const playlist=this.props.playlist.map(playlist=>
        {
            const url="/playlist/"+playlist.id;
            return <div class={"col-12 text-center border"}>

            <p  class={"mt-3"}>Playlist: <a href={url}>{playlist.name}</a></p>

            </div>
        });

    return (
      <html>
        <head/>
        <link rel={"stylesheet"} href={"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"} integrity={"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"} crossorigin={"anonymous"}></link>
        <body>
        <div class={"container border mt-5"}>
            <div class={"row text-center mt-3"}>
                <div class={"col-12 text-center"}>
                <h1>Playlist</h1>
                </div>
            </div>
            <div class="row">
                {playlist}
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = playlist;