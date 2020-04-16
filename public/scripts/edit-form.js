const submitBtn = document.querySelector('.edit-form__submit-btn');

// let nameInput, nationalityInput, imageLinkInput;
// [nameInput, nationalityInput, imageLinkInput] = document.querySelectorAll('.edit-form>input');

submitBtn.addEventListener('click', (ev) => {

    invalidMsg = [];

    document.querySelectorAll('.edit-form>input').forEach(input => {
        if (!input.value) invalidMsg.push(input.name)
    })

    if (invalidMsg.length > 0) {

        ev.preventDefault()

        let messageEl = document.createElement('p');

        messageEl.innerText = invalidMsg.reduce((msg, input) => {
            return msg.concat(input, "\n");
        }, 'The following fields are empty:\n')

        document.querySelector('.edit-form').append(messageEl);
    }
})