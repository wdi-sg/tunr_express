let cookiesV = document.querySelector('.cookiesV').innerText;
let badge = document.querySelector('.badge')

console.log(cookiesV);
if (cookiesV >= 10 && cookiesV < 50) {
    badge.innerText = "🥉";
    console.log('MORE THAN 10')
} else if (cookiesV >= 50 && cookiesV < 100) {
    badge.innerText = "🥈";
    console.log('MORE THAN 50')
} else if (cookiesV >= 100) {
    badge.innerText = "🥇";
    console.log('MORE THAN 50')
} else {
    badge.innerText = "🆕";
}