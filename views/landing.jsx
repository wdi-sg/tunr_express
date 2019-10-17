var React = require("react");
var Layout = require ('./layout')

class Landing extends React.Component {

  render() {


    return (
     <Layout>
         <div class="tenor-gif-embed" data-postid="11069584" data-share-method="host" data-width="100%" data-aspect-ratio="0.9417670682730924"><a href="https://tenor.com/view/banana-dance-dancing-banana-gif-11069584">Banana Dance Dancing Banana GIF</a> from <a href="https://tenor.com/search/bananadance-gifs">Bananadance GIFs</a></div><script type="text/javascript" async src="https://tenor.com/embed.js"></script>

         <br/>
         <div className = "d-flex justify-content-center">

                    <a href="/register"><input type="submit" className="btn btn-danger " value="REGISTER!!!"/></a>
        </div>

    </Layout>

    );
  }
}

module.exports = Landing;