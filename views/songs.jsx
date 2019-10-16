const React = require('react');


class Showsongs extends React.Component {
    render() {

        let cards = this.props.rows.map(song=>{
            let {title, album, preview_link, artwork, artist_id} = song;
            return (
               <html>
                    <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
                    <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"></link>
                    <link href="https://fonts.googleapis.com/css?family=Libre+Baskerville&display=swap" rel="stylesheet"></link>
                    </head>
                    <body>
                    <main style={{ margin: '50px auto',  width: '500px', fontFamily: 'Montserrat'}} >
                    <img src={artwork} style={{ width: '500px', fontFamily: 'Montserrat'}} />

                        <h3 class="text-center" style={{width: '500px'}}>{title}</h3>
                        <h3 class="text-center" style={{width: '500px'}}>{album}</h3>

                </main>
                  </body>
                 </html>
            );
        });

    };
};

module.exports = Showsongs;