var React = require("react");

 class ShowPlaylist extends React.Component {
   render() {
     return (
       <html>
         <head>
         <title>Playlist</title>

         </head>

         <body>
           <h1>---Playlist---</h1>
            <div>
                 <div>
                     <h3>Name</h3>
                     <p>{this.props.name}</p>
                 </div>
            </div>
         </body>
       </html>
     );
   }
 }

 module.exports = ShowPlaylist;