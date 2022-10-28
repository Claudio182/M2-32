
$('#boton').click(function () {
    // GET AJAX
    $.get("http://localhost:5000/amigos", function (data) {
        // vanilla javascript
        console.log(data)
        const padre = document.getElementById('lista')
        let lista = document.createElement('li')

        for (let i = 0; i < data.length; i++) {
            
            
        }
        
    })
})