var React = require("react");
var Layout = require ('./layout')

class Landing extends React.Component {

  render() {


    return (
     <Layout>
         <div className="tenor-gif-embed" data-postid="11069584" data-share-method="host" data-width="100%" data-aspect-ratio="0.9417670682730924"><a href="https://tenor.com/view/banana-dance-dancing-banana-gif-11069584">Banana Dance Dancing Banana GIF</a> from <a href="https://tenor.com/search/bananadance-gifs">Bananadance GIFs</a></div><script type="text/javascript" async src="https://tenor.com/embed.js"></script>

         <br/>

         <div>

            <a href="/register"><input type="submit" className="btn btn-danger btn-block" value="REGISTER!!!"/></a>

        </div>

        <br/>

        <div>

                <a href="/login"><input type="submit" className="btn btn-success btn-block" value="Login"/></a>
        </div>

    </Layout>

    );
  }
}

module.exports = Landing;