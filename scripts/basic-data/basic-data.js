
$("#open-modal-novo").on('click', function () {
    launchModalNovo();
})
$("#open-modal-listagem").on('click', function () {
    launchModalListagem();
})

function launchModalNovo() {
    let expr = $("#select-modal-type").val();
    $('#mainModal').modal('show');
    switch (expr) {
        case 'Caminhões':
            newTruck();
            break;
        case 'Origens e Destinos':
            newGeoPosition();
            break;
        case 'Portos':
            newPorts();
            break;
        case 'Usuarios':
            newUsers();
            break;
        case 'Navios':
            newVessels();
            break;
        case 'Viagens':
            newTravel()
            break;
        default:
            $('#mainModal').modal('hide');
    }

}
function launchModalListagem() {
    let expr = $("#select-modal-type").val();
    $('#mainModal').modal('show');
    switch (expr) {
        case 'Caminhões':
            getTrucks();
            break;
        case 'Origens e Destinos':
            getGeoPosition();
            break;
        case 'Portos':
            getPorts();
            break;
        case 'Usuarios':
            getUsers();
            break;
        case 'Navios':
            getVessels();
            break;
        case 'Viagens':
            getTravel()
            break;
        default:
            $('#mainModal').modal('hide');
    }
}
function manageAccess(){
    let user = JSON.parse(localStorage.getItem("user"));
    if(user.status == true && user.role == "admin"){
        $("#select-modal-type").html(`<option>Caminhões</option>
        <option>Origens e Destinos</option>
        <option>Portos</option>
        <option>Usuarios</option>
        <option>Navios</option>
        <option>Viagens</option>`);
    }else{
        $("#select-modal-type").html(`<option>Caminhões</option>
        <option>Origens e Destinos</option>
        <option>Viagens</option>`)
    }
}
manageAccess();