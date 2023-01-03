const modalButton = document.querySelector('.modal-button')
const modal = document.getElementById('modal-container')
const modalCloseButton = document.querySelector('.modal-container')

modalButton.addEventListener('click', () => {
    modal.classList.add('show')
})

modalCloseButton.addEventListener('click', () => {
    modal.classList.remove('show')
})