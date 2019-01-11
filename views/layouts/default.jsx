var React = require("react");

class DefaultLayout extends React.Component {
  render() {

    return (
        <html>
            <head>
                <title>{this.props.title}</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
                <link rel="stylesheet" type="text/css" href="/style.css"/>
            </head>
            <body>
            <div className="row grow w-100">
                <div className="col-12 bg-dark text-white py-3">
                    <h2 className="ml-3">Tunr_Express</h2>
                </div>
                <div className="col-2 py-3">
                    <div className="nav flex-column nav-pills ml-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                      <a className="nav-link" id="v-pills-home-tab" data-toggle="pill" href="/" role="tab" aria-controls="v-pills-home" aria-selected="false">Home</a>
                      <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="artists" role="tab" aria-controls="v-pills-profile" aria-selected="false">Artists</a>
                      <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Songs</a>
                      <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Playlist</a>
                    </div>
                </div>
                <div className="main col-10 h-100 py-3 pl-4" id="test">
                {this.props.children}
                </div>
            </div>
            <div className="row w-100">
                <div className="col-12 py-3 bg-dark text-white">
                    Footer
                </div>
            </div>
            </body>
        </html>
    );

  }
}

module.exports = DefaultLayout;

            // <div className="container">
            //     <div className="row">
            //       <div className="col-3 bg-dark ">
            //         <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            //           <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
            //           <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
            //           <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
            //           <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
            //         </div>
            //       </div>
            //       <div className="col-9">
            //         {this.props.children}
            //       </div>
            //     </div>
            // </div>