const addSongBtn = document.querySelector('.edit-form__add-song-btn');
const deleteSongBtn = document.querySelector('.edit-form__delete-song-btn');
const editPlaylistBtn = document.querySelector('.edit-form__submit-btn');
const editPlaylistForm = document.querySelector('.edit-form');


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

    editPlaylistBtn.style.visibility = 'visible';

    document.querySelector('.form__btn-wrapper').insertAdjacentHTML('afterend',
        `
        <div class="edit-form__song-container">
            <h5>Artist: </h5>
            <input type="text" name="[artist]" value="${artistSelect.value}"></input>
            <h5>Song:</h5>
            <input type="text" name="[song]" value="${songSelect.value}"></input>
        </div>
        `
    )

})

deleteSongBtn.addEventListener('click', () => {

    if (document.querySelectorAll('.edit-form__song-container').length <= 1)
        editPlaylistBtn.style.visibility = 'hidden';

    const songInputs = document.querySelectorAll('.edit-form__song-container');

    editPlaylistForm.removeChild(songInputs[songInputs.length - 1]);

})