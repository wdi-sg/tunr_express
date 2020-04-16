var React = require("react");

 class Show extends React.Component {
   render() {
     return (
       <html>
         <head>
         <title>Artist</title>

         </head>

         <body>
           <h1>---Artist Details---</h1>
             <div>
                 <div>
                     <h3>Artist</h3>
                     <p>{this.props.name}</p>
                 </div>
                 <div>
                     <h3>Photo</h3>
                     <div> <img src = {this.props.photo_url} width="300" height="auto"/> </div>
                 </div>
                 <div>
                     <h3>Nationality</h3>
                     <p>{this.props.nationality}</p>
                 </div>
           </div>
         </body>
       </html>
     );
   }
 }

 module.exports = Show;