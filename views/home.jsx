// class Home extends React.Component {
//       render() {
//         const seeSingleArtistPath = `/artist/${this.props.artist[0].id}`
//         const tablebody = this.props.artist.map(item) => {
//       //     return (
//       //       <tbody>
//       //         <tr>

//       //         </tr>
//       //       </tbody>
//       //     )
//       // };

// var React = require('react');

// class Home extends React.Component {
//   render() {
//         const seeSingleArtistPath = `/artist/${this.props.artist[0].id}`
//         const tablebody = this.props.artist.map(item) => {
//     return (
//       <html>
//         <body>
//           <div>
//              <h1>Welcome!</h1>
//               <h1>Welcome to Tunr! The world's #1 music catalog/player</h1>
//               <table>
//                 <thead>
//                   <tr>
//                     <td>{item.id}</td>
//                     <td><a style={{color:'black'}} href={seeSingleArtistPath}>{item.name}</a></td>
//                     <td><img width="100px" src={item.photo_url} alt="photo of artist"/></td>
//                     <td>{item.nationality}</td>
//                   </tr>
//                 </thead>
//               </table>
//           </div>
//         </body>
//       </html>
//     );
//   }
// }

// module.exports = Home;

   // <th>Id</th>
                    // <th>Name</th>
                    // <th>Photo</th>
                    // <th>Nationality</th>


class Home extends React.Component {
  render() {
    let data = this.props.data;
    let artistHTML = data.map(artist => {
      return (
        <tr key={artist.id}>
          <th scope="row">{artist.id}</th>
          <td>{artist.name}</td>
          <td>{artist.photo_url}</td>
          <td>{artist.nationality}</td>
          <td>
          <form action={"/artist/"+artist.id} method="get">
          <button type="submit">View</button>
          </form>
          </td>
        </tr>
      );
    });
    // return (
    //   <html>
    //     <head />
    //     <head>
    //       <link
    //         rel="stylesheet"
    //         href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    //         integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
    //         crossorigin="anonymous"
    //       />
    //     </head>
    //     <body>
    //       <h1>Welcome!</h1>
    //       <form action="/artist/create" method="get">
    //       <button className="btn btn-primary" type="submit">Add an Artist!</button>
    //       </form>
    //       <table class="table">
    //         <thead>
    //           <tr>
    //             <th scope="col">#</th>
    //             <th scope="col">Name</th>
    //             <th scope="col">Photo Link</th>
    //             <th scope="col">Nationality</th>
    //             <th scope='col'>View Artist</th>
    //           </tr>
    //         </thead>
    //         <tbody>{artistHTML}</tbody>
    //       </table>
    //       <script
    //         src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    //         integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    //         crossorigin="anonymous"
    //       />
    //       <script
    //         src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
    //         integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
    //         crossorigin="anonymous"
    //       />
    //       <script
    //         src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
    //         integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
    //         crossorigin="anonymous"
    //       />
    //     </body>
    //   </html>
    // );