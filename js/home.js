
$('.button-reservar').on('click', function(){
    let number = $(this).val()
    localStorage.setItem('numberClub', number)
    window.location = './detalleclub.html'
})