var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); 
}
const club1= '5de3f7431c9d4400002a41db'
const club2= '5de4dc541c9d44000060b187'
const club3= '5de3f75d1c9d4400002a41dd'
const club4= '5de4dcb61c9d44000060b189'

var number = localStorage.getItem('numberClub') || 1
if(number == 1){
    id = club1
}
else if(number == 2){
    id = club2
}
else if(number == 3){
    id = club3
}
else if(number == 4){
    id = club4
}

function getClubs(){
    $.ajax({
        url: 'https://proyecto-a01273884.herokuapp.com/clubs/' + id,
        headers: {
            'Content-Type':'application/json',
        },
        method: 'GET',
        dataType: 'json',
        success: function(data){
          console.log(data)
          localStorage.setItem('nombreClub', data.name)
          localStorage.setItem('locationClub', data.location)
    
          newHtml = `
          <p> Reserva en ${data.name} </p>
          `
          $('#headerclubs').append(newHtml)
          newHtml = `
            <h5>Nombre: ${data.name}</h5>
            <h5>Ubicacion: ${data.location}</h5>
            <h5>Fecha: <input id="fecha-reserva" type="date" class="cantidad"></h5>
            <h5>Consumo Minimo: ${data.conMinimo}.00 MXN ||<input class="cantidad" type="number" id="consumo" min="8000" max="10000" value="${data.conMinimo}"> MXN</h5>
            <h5>Cantidad:  <input class="cantidad" type="number" id="cantidad_personas" min="5" max="10" value="5"> Personas</h5>
            <h5>Descripción:</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos vitae accusamus voluptates, dicta illum amet nam soluta quas
                    rem sit excepturi odio. Excepturi dignissimos, suscipit corporis ipsam consectetur ea quibusdam at. Quidem at eos deserunt 
                    neque reiciendis inventore perferendis ad? Dicta laudantium harum provident illo incidunt unde iste quisquam doloremque.</p>
          `
          $('#form-reserva').append(newHtml)
        },
        error: function(error_msg) {
            console.log("Info not available")
          alert((error_msg['responseText']));
        }
      });
}

getClubs()


$('#btn-reserva').on('click', function(){
    let clubName = localStorage.getItem('nombreClub')
    let location = localStorage.getItem('locationClub')
    let numberPeople = $('#cantidad_personas').val()
    let date = $('#fecha-reserva').val()
    var fecha = new Date(date)
    let amount = $('#consumo').val()

    json_to_send = {
        "clubName": clubName,
        "location": location,
        "numberPeople": numberPeople,
        "date": fecha,
        "amount": amount 
    };

    json_to_send = JSON.stringify(json_to_send);
    console.log(json_to_send)
    $.ajax({
        url: 'https://proyecto-a01273884.herokuapp.com/reservations',
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        dataType: 'json',
        data: json_to_send,
        success: function(data){
            alert("Reserva creada con exito");
            console.log('success: '+ data);
            window.location = './profile.html'
        },
        error: function(error_msg) {
            alert((error_msg['responseText']));
        }
    });
})