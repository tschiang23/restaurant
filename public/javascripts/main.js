const restaurantForm = document.querySelector('#restaurantForm')
const dataPanel = document.querySelector('#data-panel')

function checkPhoneKey(key) {
  return (
    (key >= '0' && key <= '9') ||
    [
      '+',
      '(',
      ')',
      '-',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Backspace',
    ].includes(key)
  )
}

if (restaurantForm) {
  const saveButton = document.querySelector('#saveButton')
  const name = document.querySelector('#name')
  const location = document.querySelector('#location')
  const phone = document.querySelector('#phone')

  phone.addEventListener('keydown', (event) => {
    if (checkPhoneKey(event.key)) {
    } else {
      event.preventDefault()
    }
  })

  restaurantForm.addEventListener('keyup', (event) => {
    if (name.value.trim().length === 0) {
      name.value = ''
    }

    if (location.value.trim().length === 0) {
      location.value = ''
    }
  })

  saveButton.addEventListener('click', function onSaveButtonClicked(event) {
    restaurantForm.classList.add('was-validated')
  })
}

if (dataPanel) {
  dataPanel.addEventListener('click', function onDeleteButtonClicked(event) {
    if (event.target.matches('.btn-delete')) {
      event.preventDefault()
      const name =
        event.target.parentElement.parentElement.previousElementSibling
          .firstElementChild.textContent
      const id = event.target.dataset.id
      const form = document.querySelector('#modal-form')
      const title = document.querySelector('.modal-title')
      form.action = `./restaurants/${id}?_method=DELETE`
      title.textContent = `${name}`
    }
  })
}
