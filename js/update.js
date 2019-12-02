var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); 
}


$('#updateUser').on('click', function(){
    let nombre = $('#nombre').val()
    let apellido = $('#apellido').val()
    let edad = $('#age').val()
    let password = $('#password').val()

    json_to_send = {
        "Nombre": nombre,
        "age": edad,
        "Apellido": apellido,
        "password" : password
      };
    
      json_to_send = JSON.stringify(json_to_send);

    $.ajax({
        url:'https://proyecto-a01273884.herokuapp.com/users',
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'PATCH',
        dataType: 'json',
        data: json_to_send,
        success: function(data){
            console.log(data)
            alert('Usuario Actualizado con éxito')
            window.location = './profile.html'
        },
        error: function(error_msg) {
            console.log("Server Error")
            alert((error_msg['responseText']));
        }
    });    
})


//updateReserve.html
$('#updateReserva').on('click', function(){
  var _id = localStorage.getItem('idReserva');
  let personas = $('#numberPersons').val()
  let date = $('#date').val()
  var fecha = new Date(date)

  let cantidad = $('#cantidad').val()
  
  json_to_send = {
      "numberPeople": personas,
      "date": fecha,
      "amount": cantidad
    };
  
  json_to_send = JSON.stringify(json_to_send);
  console.log(json_to_send)
  console.log(_id)
  $.ajax({
      url:'https://proyecto-a01273884.herokuapp.com/reservations/' + _id,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
          alert('Reserva Actualizada con éxito')
          window.location = './profile.html'
      },
      error: function(error_msg) {
          console.log("Server Error")
          alert((error_msg['responseText']));
      }
  });    
})


$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
    var $this = $(this),
        label = $this.prev('label');
  
        if (e.type === 'keyup') {
              if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
          if( $this.val() === '' ) {
              label.removeClass('active highlight'); 
              } else {
              label.removeClass('highlight');   
              }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
              label.removeClass('highlight'); 
              } 
        else if( $this.val() !== '' ) {
              label.addClass('highlight');
              }
      }
  
  });
  
  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
  
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });