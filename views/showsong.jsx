var React = require("react");

 class ShowSong extends React.Component {
   render() {
     return (
       <html>
         <head>
         <title>Song</title>

         </head>

         <body>
           <h1>---Song Title and Album---</h1>
            <div>
                 <div>
                     <h3>Title</h3>
                     <p>{this.props.title}</p>
                 </div>
                 <div>
                     <h3>Album</h3>
                     <p>{this.props.album}</p>
                 </div>
            </div>
            <p>Number of visits:</p>
            <p>{this.props.badge}</p>
         </body>
       </html>
     );
   }
 }

 module.exports = ShowSong;