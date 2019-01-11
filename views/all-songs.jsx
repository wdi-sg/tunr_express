var React = require('react');
var DefaultLayout = require('./default');

class AllSongs extends React.Component {
    render() {
        const song = this.props.songs.map ((each,index)=>{

        return <div key={index}>
                    <h4>Songs : <a href = "#">{each.title}</a> Album : <a href = "#">{each.album}</a></h4>
               </div>
           });
        return(
            <DefaultLayout>
                <h1> All Songs </h1>
                <button type="button" className="btn btn-info my-4 mx-3"><a href= "/song/new">New Song</a></button>
                <button type="button" className="btn btn-info my-4 mx-3"><a href= "/songs/1">By Yeah Yeah Yeahs</a></button>
                <button type="button" className="btn btn-info my-4 mx-3"><a href= "/songs/2">By Nosaj Thing</a></button>
                <button type="button" className="btn btn-info my-4 mx-3"><a href= "/songs/3">By Norah Jones</a></button>
                <button type="button" className="btn btn-info my-4 mx-3"><a href= "/songs/4">By Lykke Li</a></button>
                <button type="button" className="btn btn-info my-4 mx-3"><a href= "/songs/5">By Kendrick Lamar</a></button>
                {song}
            </DefaultLayout>
        );
    }
}

module.exports = AllSongs;