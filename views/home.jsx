var React = require("react");

class Home extends React.Component {
   render() {
     var artistArray = this.props.artists;
     // console.log(artArray);
     let artistElements = artistArray.map(item => {
         return <div>
             <li key={item.id}>{item.name} from {item.nationality}
                 <br></br>
                 <img style= {{height: 200}} src={item.photo_url}/>
             </li>
             <br></br>
         </div>
     });

     //display list of artists using JSX
     return (

       <html>
         <head />
         <head/>
         <body>
           <h1>Welcome to Tunr</h1>
           <ul>
             {artistElements}
           </ul>
         </body>
       </html>

     );
   }
 }

 module.exports = Home;









