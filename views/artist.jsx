var React = require("react");

class artist extends React.Component {
  render() {



    return (
      <html>
        <head/>
        <link rel={"stylesheet"} href={"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"} integrity={"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"} crossorigin={"anonymous"}></link>
        <body>
        <div class={"container border mt-5"} style={{width:"50%"}}>
            <div class={"row text-center mt-3"}>
                <div class={"col-12 text-center"}>
                <h1>Artist: {this.props.artist[0].name}</h1>
                </div>
            </div>
            <div class="row">
                <div class={"col-12 text-center"}>
                    <img src={this.props.artist[0].photo_url}  style={{width:"90%"}}></img>
                </div>
            </div>

            <div class="row">
                <div class={"col-12 text-center"}>
                    <h2>Nationality: {this.props.artist[0].nationality}</h2>
                </div>
            </div>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = artist;