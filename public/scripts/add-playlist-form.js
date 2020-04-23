const addSongBtn = document.querySelector('.add-form__add-song-btn');
const deleteSongBtn = document.querySelector('.add-form__delete-song-btn');
const addPlaylistBtn = document.querySelector('.add-form__submit-btn');
const addPlaylistForm = document.querySelector('.add-form');


const songSelect = document.getElementById('songs-select');
const artistSelect = document.getElementById('artists-select');

const filterSongOptions = () => {

    const songOptions = document.querySelectorAll('.song-options');
    songOptions.forEach(option => {
        option.getAttribute("artist") !== artistSelect.value ?
            option.hidden = true :
            option.hidden = false;
    })

    songSelect.value = "";
}

artistSelect.addEventListener('change', filterSongOptions);

addSongBtn.addEventListener('click', () => {

    addPlaylistBtn.style.visibility = 'visible';

    document.querySelector('.form__btn-wrapper').insertAdjacentHTML('afterend',
        `
        <div class="add-form__song-container">
            <h5>Artist: </h5>
            <input type="text" name="[artist]" value="${artistSelect.value}"></input>
            <h5>Song:</h5>
            <input type="text" name="[song]" value="${songSelect.value}"></input>
        </div>
        `
    )

})

deleteSongBtn.addEventListener('click', () => {

    if (document.querySelectorAll('.add-form__song-container').length <= 1)
        addPlaylistBtn.style.visibility = 'hidden';

    const songInputs = document.querySelectorAll('.add-form__song-container');

    addPlaylistForm.removeChild(songInputs[songInputs.length - 1]);

})