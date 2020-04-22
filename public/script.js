const login = document.getElementById('login');
const script = document.getElementById('script');
const logout = document.createElement('form');
logout.innerHTML = `<input type='submit' value='Log Out'></input>`;
logout.setAttribute('method', 'POST');
logout.setAttribute('action', '/logout');

console.log(loggedIn)

if (loggedIn === 'true') {
  console.log('works')
  document.body.removeChild(login);
  document.body.insertBefore(logout, footer);
}