const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')

update.addEventListener('click', _ => {
    fetch('/quotes', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Nombre: 'Varg',
                Texto: 'Quemar Iglesias'
            })
        })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true)
        })
})

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Nombre: 'Varg'
            })
        })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            if (response === 'Cero documentos') {
                message.textContent = 'Sin más documentos de ' 
            } else {
                window.location.reload(true)
            }
        })
        .catch(console.error)
})
