//Configurando onde(latitude e longitude) o mapa vai abrir e qual o zoom
var mymap = L.map('map').setView([-23.7643529, -47.0395998], 5);

let listDataTrucks;

//Configurando a chamada para colocar o mapa na nossa pagina
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGlzY28tZ3JlZW4iLCJhIjoiY2t2aDEyNzhiYWF5ejJub2YwZGRycWt2biJ9.kqMKlS6sWnXVDM64mEkn1A', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGlzY28tZ3JlZW4iLCJhIjoiY2t2aDEyNzhiYWF5ejJub2YwZGRycWt2biJ9.kqMKlS6sWnXVDM64mEkn1A'
}).addTo(mymap);
// Adicionando um ponto fixo
//var marker = L.marker([-23.7643529, -47.0895998]).addTo(mymap);
//Configurando as imagens
var vesselIcon = L.icon({
    iconUrl: '../photos/vessel.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var truckIcon = L.icon({
    iconUrl: '../photos/truck.png',
    iconSize: [30, 20],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});
var vesseReverselIcon = L.icon({
    iconUrl: '../photos/vessel_reverse.png',
    iconSize: [30, 30],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});
var truckReverseIcon = L.icon({
    id: 1,
    iconUrl: '../photos/truck_reverse.png',
    iconSize: [30, 20],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});


let urlList = routes();
function getAllTrucks(){
    let endpointUri = urlList.truckPosition + "/" + "get-travels";    
    let success = (response) => {
        console.log(response)
        if (response.success == true) {
            listDataTrucks = response.data;
            for (let i = 0; i < response.data.length; i++) {
                addMarker(response.data[i]);
            }
        }
    };

    let error = () => {
        // $("#status-bar").html(`<div id="alert-error" class="container-fluid"><div class="alert alert-danger" role="alert">
        //     Não foi possivel atualizar o item, Tente novamente mais tarde!
        //     </div></div>`)
        // removeStatusBar("#alert-error");
    };
    let complete = () => {

    };
    ajaxCall("GET", endpointUri, null, success, error, complete);
}
getAllTrucks();

function addMarker(_data){
    L.marker(
        [_data.positions[0].latitude, _data.positions[0].longitude],
        {
            draggable:true,
            title:_data.truck.licensePlate,
            icon: truckIcon
        }).addTo(mymap).bindPopup(`<h6>${_data.truck.licensePlate}</h6>
        <ul>
            <li><b>Status: </b>${_data.status}</li>
            <li><b>Origem: </b>${_data.origin.name}</li>
            <li><b>Destino: </b>${_data.destination.name}</li>
            <a href="#" class="link-info" onclick="showMoreInfoTruck(${_data.idTravel})">Mais Informações</a>
        </ul>`);
}

function showMoreInfoTruck(id){
    let _data = listDataTrucks.filter(
        function (listDataTrucks) { return listDataTrucks.idTravel == id }
    );
    _data = _data[0];
  let html =  `<center  >
  <button id="close-div-more-infos" type="button" class="close" data-dismiss="modal">&times;</button>
    <h5>Informações caminhão: ${_data.truck.licensePlate}</h5>    
</center>
<div class="row">
    <div class="col-6 col-sm-6 col-md-3 col-lg-3"  >
        <h6>Dados da Origem</h6>
        <ul>
            <li>Nome: ${_data.origin.name}</li>
            <li>Endereço ${_data.origin.street}, ${_data.origin.number}, ${_data.origin.state}, ${_data.origin.country}, ${_data.origin.zipCode}</li>
            <li>Latitude: ${_data.origin.latitude}</li>
            <li>Longitude: ${_data.origin.longitude}</li>
            </ul>
    </div>
    <div class="col-6 col-sm-6 col-md-3 col-lg-3" >
        <h6>Dados do Destino</h6>
        <ul>
        <li>Nome: ${_data.destination.name}</li>
        <li>Endereço ${_data.destination.street}, ${_data.destination.number}, ${_data.destination.state}, ${_data.destination.country}, ${_data.destination.zipCode}</li>
        <li>Latitude: ${_data.destination.latitude}</li>
        <li>Longitude: ${_data.destination.longitude}</li>
            </ul>
    </div>
    <div class="col-6 col-sm-6 col-md-3 col-lg-3"  >
        <h6>Dados do Caminhão</h6>
        <ul>
            <li>Placa: ${_data.truck.licensePlate}</li>
            <li>Modelo: ${_data.truck.model}</li>
            <li>Transportador: ${_data.truck.carrier}</li>
            <li>Cap. Vol.: ${_data.truck.volumeCapacity}</li>
            <li>Cap. Peso: ${_data.truck.weightCapacity}</li>
            </ul>
    </div>
    <div class="col-6 col-sm-6 col-md-3 col-lg-3"  >
        <h6>Dados de Transporte</h6>
        <ul>
            <li>Carga: ${_data.cargo}</li>
            <li>Status: ${_data.status}</li>
            </ul>
    </div>
`
$("#div-more-infos").html(html);
$("#div-more-infos").show();
$("#close-div-more-infos").on('click', function(){
    $("#div-more-infos").hide();
});
$(document).scrollTop($(document).height());
}
$("#flowId").on('click', function(){
    $('#mainModal').modal('show');
    $(document).scrollTop(-100);
});






