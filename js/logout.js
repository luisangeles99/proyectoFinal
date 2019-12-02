var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); 
}

$('#logout').on('click', function(){
    $.ajax({
        url:'https://proyecto-a01273884.herokuapp.com/logout',
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        dataType: 'json',
        success: function(data){
            alert('Sesión cerrada con éxito')
            window.location = './index.html'
        },
        error: function(error_msg) {
            alert('No user')
            window.location = './index.html'
        }
    });  
})