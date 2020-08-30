# tunr cookies / static


Build a view counter into the tunr app.

When the user visits the home page, increment the view counter.

Show the counter on every page.

#### further
When the view counter goes up give the user badges:

  - 10 visits: newbie badge
  - 50 visits: repeat badge
  - 100 visits: veteran badge
  
You can use these open source badge icons: [https://www.flaticon.com/free-icons/badge](https://www.flaticon.com/free-icons/badge)

#### further
If the user hasn't visited in a week, drop them back to 50 visits.

#### further

Add a `style.css` file. Add your own css.

#### further

Add the playlist functionality to work according to the cookies.

There is a "public" playlist, (the many-to-many table) and a "user" playlist, that is kept track of in the cookies.

When a song is "added" to the playlist, save that information in the cookie. Use what is in the cookie to render the list of songs.


#### further

Add a `script.js` on the `/songs` index page.

When the user presses the "playlist" button, use DOM manipulation to highlight all of the songs they have put in their playlist.
