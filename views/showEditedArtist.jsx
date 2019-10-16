var React = require('react');
class EditedArtist extends React.Component {
    render() {
        return (
            <html>
        <body>
          <div>
            <h1>Edited Artist content</h1>
            <div>
                    <h3>Name :</h3>
                    <ul>{this.props.name}</ul>
                    <h3>Photo :</h3>
                    <ul>{this.props.photo_url}</ul>
                    <h3>Nationality:</h3>
                    <ul>{this.props.nationality}</ul>
                     </div>
          </div>
        </body>
      </html>
            )
    }
}


module.exports = EditedArtist;

// const React = require('react');

// class Showall extends React.Component {
//     render() {
//         console.log(this.props.artists)
//             var everything = this.props.artists.map(x=>(
//             <div class="card" style={{width: "18rem"}}>
//                     <img class="card-img-top" src="" alt="Card image cap"/>
//                     <div class="card-body">
//                     <h5 class="card-title">{x.name}</h5>
//                     <p class="card-text">{x.nationality}</p>
//                     </div>
//               </div>
//               ));

//         return(
//              <html>
//         <head>

//         </head>
//         <body>
// ​
//         <main>
//           <div>
//               <h1 className="col-md-auto display-4">This Is All The Artists!</h1>
//               {everything}


//           </div>
//         </main>

//         </body>
//       </html>
//             )}
//     }



// module.exports = Showall;