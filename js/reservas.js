


var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); 
}

function loadUserInfo(){
    $.ajax({
        url:'https://proyecto-a01273884.herokuapp.com/users',
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'GET',
        dataType: 'json',
        success: function(data){
          console.log(data)
            newHtml=`
                <p id="user-info"> Hola ${data.Nombre} ${data.Apellido} puedes modificar tus datos</p>
            `
           $('#profile-info').append(newHtml)
        },
        error: function(error_msg) {
            console.log("Info not available")
          alert((error_msg['responseText']));
          window.location = './index.html'
        }
    });
}


function loadReservas() {
    $.ajax({
      url: 'https://proyecto-a01273884.herokuapp.com/reservations',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'GET',
      dataType: 'json',
      success: function(data){
        console.log(data)
        console.log(token)
        if(data.length===0){
            newHtml=`
            <tr>
                <td> No hay reservas para mostrar por el momento</td>
            </tr>
            `
            $('#show-reservas').append(newHtml)
        }
        else{
            for( let i = 0; i < data.length; i++) {
          
                addReservation(data[i]._id, data[i].clubName, data[i].location, data[i].numberPeople,
                    data[i].date, data[i].amount, data[i].paid)
                
            }
        }
        
      },
      error: function(error_msg) {
          console.log("Info not available")
        alert((error_msg['responseText']));
      }
    });
}

  function addReservation(id, name, location, numPeople, date, amount, paid){
    if(paid){
        var estado = "Reservacion Pagada"
    }
    else{
        var estado = "Pago Pendiente"
    }
    var newHtml = `
    
    <tr>
        <td><b>${id}</b></td>
        <td><b>${name}</b></td>
        <td><b>${location}</b></td>
        <td><b>${numPeople}</b></td>
        <td><b>${date}</b></td>
        <td><b>${amount}</b></td>
        <td><b>${estado}</b></td>
        <td><input class="check" type="checkbox" name="seleccionado" value="${id}"></td>
    <tr/>
    
    `
    $('#show-reservas').append(newHtml)
  }

loadReservas()
loadUserInfo()


//get id seleccionado
var _id = 0;
$('#updateReserve').on('click',function(){
  var total=document.getElementsByName('seleccionado');
  for(var i = 0; i < total.length ; i++){
    if(total[i].type == 'checkbox'){
      if(total[i].checked == true){
        _id = total[i].value;
        localStorage.setItem('idReserva', _id)
        window.location = './updateReserve.html'
        break
      }
      else if(i == (total.length -1)){
        alert('None Selected')
      }
    }
  }
})

//get id seleccionado para delete
$('#deleteReserve').on('click',function(){
  var total=document.getElementsByName('seleccionado');
  for(var i = 0; i < total.length ; i++){
    if(total[i].type == 'checkbox'){
      if(total[i].checked == true){
        _id = total[i].value;
        break
      }
      else if(i == (total.length -1)){
        alert('None Selected')
      }
    }
  }

  $.ajax({
    url: 'https://proyecto-a01273884.herokuapp.com/reservations/' + _id,
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'DELETE',
    dataType: 'json',
    success: function(data){
      alert("Reserva Eliminada con exito");
      window.location = "./profile.html"
      console.log('Eliminado: '+ data);
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
})

