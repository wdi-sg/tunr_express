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