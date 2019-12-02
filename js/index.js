//registro
$('#registerbtn').on('click', function(){
  let nombre = $('#nombre').val()
  let apellido = $('#apellido').val()
  let edad = $('#edad').val()
  let email = $('#email').val()
  let password = $('#password').val()

  json_to_send = {
    "Nombre": nombre,
    "age": edad,
    "Apellido": apellido,
    "email": email,
    "password" : password
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'https://proyecto-a01273884.herokuapp.com/users',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      alert("Usuario creado con exito");
      console.log('success: '+ data);
      window.location = './index.html'
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
})

//login
$('#loginbtn').on('click', function(){
  let email = $('#email_log').val()
  let password = $('#pass_log').val()

  json_to_send = {
    "email": email,
    "password" : password
  };

  json_to_send = JSON.stringify(json_to_send)
  console.log(json_to_send)
  $.ajax({
    url: 'https://proyecto-a01273884.herokuapp.com/login',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      // guardar token en localstorage o cookie
      localStorage.setItem('token', data.token)
      alert("Sesion Iniciada")
      window.location = './home.html'
    },
    error: function(error_msg) {
      alert((error_msg["responseText"]))
    }
  })
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