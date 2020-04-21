const footer = document.getElementsByTagName('footer')[0];

const badge = document.createElement('img');
badge.setAttribute('style', 'display: inline-block; margin: 0 20px');

counter = parseInt(counter);
if (counter >= 100) {
  badge.setAttribute('src', '/badges/veteran.png');
  footer.appendChild(badge);
} else if (counter >= 50) {
  console.log('hello')
  badge.setAttribute('src', '/badges/repeat.png');
  footer.appendChild(badge);
} else if (counter >= 10) {
  badge.setAttribute('src', '/badges/newbie.png');
  footer.appendChild(badge);
}

const login = document.getElementById('login');
const script = document.getElementById('script');
const logout = document.createElement('form');
logout.innerHTML = `<input type='submit' value='Log Out'></input>`;
logout.setAttribute('method', 'POST');
logout.setAttribute('action', '/logout');

console.log(loggedIn)

if (loggedIn === 'true') {
  console.log('hello')
  document.body.removeChild(login);
  document.body.insertBefore(logout, footer);
}