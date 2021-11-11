//Listagem de urls
//let urlList = routes();

let listDataGeoPosition;
//Esta função busca os dados dentro do banco de dados e chama a função de preenchimento do modal
function getGeoPosition() {
    let endpointUri = urlList.geoPositions;
    let success = (response) => {
        console.log(response)
        if (response.success == true) {
            listDataGeoPosition = response.data;
            fillModalGeoPosition(response.data);
        }
        //document.location.reload(true);
    };

    let error = () => {
        $("#status-bar").html(`<div id="alert-error" class="container-fluid"><div class="alert alert-danger" role="alert">
            Não foi possivel ler os items, Tente novamente mais tarde!
            </div></div>`)
        removeStatusBar("#alert-error");
    };
    let complete = () => {

    };
    // Get data from API            
    ajaxCall("GET", endpointUri, null, success, error, complete);
}

// Esta função realiza a listagem dos caminhões, cadastrados no banco de dados
// e adiciona os dados dentro do modal
function fillModalGeoPosition(_data) {
    let tbody = "";
    for (let i = 0; i < _data.length; i++) {
        let tr = `<tr id="table-row-${_data[i].idPosition}">
                <th>${_data[i].idPosition}</th>
                <td>${_data[i].name}</td>
                <td>${_data[i].latitude}</td>
                <td>${_data[i].longitude}</td>
                <td>${_data[i].country}</td>
                <td>${_data[i].state}</td>
                <td>${_data[i].city}</td>
                <td>${_data[i].street}</td>
                <td>${_data[i].number}</td>
                <td>${_data[i].zipCode}</td>
                <th><button id="button-edit-${_data[i].idPosition}" class="btn btn-sm btn-success"><i class="bi bi-pen"></i></button></th>
                <th><button id="button-remove-${_data[i].idPosition}" class="btn btn-sm btn-danger"><i class="bi bi-trash"></i></button></th>                
            </tr>`;
        tbody = tbody + tr;
    }

    let table = `
        <div id="edit-form" style="max-height:200px; overflow-y:auto;"></div>
        <table class="table" style="max-height:200px; overflow-y:auto;">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Longitude</th>
                        <th scope="col">Pais</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">Rua</th>
                        <th scope="col">Numero</th>
                        <th scope="col">CEP</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${tbody}            
                </tbody>
            </table>`;
    $("#modal-body").html(table);
    $("#modal-title").html('<i class="bi bi-card-list"></i> - Lista de Origens e Destinos');
    for (let index = 0; index < _data.length; index++) {
        $(`#button-edit-${_data[index].idPosition}`).on('click', function () {
            showEditFieldGeoPosition(_data[index].idPosition);
        });
        $(`#button-remove-${_data[index].idPosition}`).on('click', function () {
            removeGeoPosition(_data[index].idPosition)
        });
    }
    $("#edit-form").hide();
}
//-------------------------------Edição-------------------------------//

let editFormGeoPosition = `<h6>Edição</h6>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Id</span>
                    </div>
                        <input id="idGeo" type="text" class="form-control" aria-describedby="basic-addon1" disabled>
                    </div>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Nome</span>
                    </div>
                        <input id="nameGeo" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Latitude</span>
                    </div>
                        <input id="latGeo" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Longitude</span>
                    </div>
                        <input id="lonGeo" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Pais</span>
                    </div>
                        <input id="paisGeo" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Estado</span>
                    </div>
                        <input id="estadoGeo" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Cidade</span>
                    </div>
                        <input id="cidadeGeo" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Rua</span>
                    </div>
                        <input id="ruaGeo" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Numero</span>
                    </div>
                        <input id="numeroGeo" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">CEP</span>
                    </div>
                        <input id="cepGeo" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                <div>
                    <button class="btn btn-danger" id="close-edit-modal">Fechar</button>
                    <button class="btn btn-primary" id="save-editions">Salvar</button>
                </div>
                <br/>
                <br/>`;
function showEditFieldGeoPosition(id) {
    let _data = listDataGeoPosition.filter(
        function (listDataGeoPosition) { return listDataGeoPosition.idPosition == id }
    );
    console.log(_data);
    if ($("#edit-form").is(":visible") === false) {
        $("#edit-form").show();
        $("#edit-form").html(editFormGeoPosition);
    } else {
        $("#edit-form").show();
    }
    $("#idGeo").val(_data[0].idPosition);
    $("#nameGeo").val(_data[0].name);
    $("#latGeo").val(_data[0].latitude);
    $("#lonGeo").val(_data[0].longitude);
    $("#paisGeo").val(_data[0].country);
    $("#estadoGeo").val(_data[0].state);
    $("#cidadeGeo").val(_data[0].city);
    $("#ruaGeo").val(_data[0].street);
    $("#numeroGeo").val(_data[0].number);
    $("#cepGeo").val(_data[0].zipCode);

    $("#save-editions").on('click', function () {
        saveEditions();
    });
    $("#close-edit-modal").on('click', function () {
        $("#edit-form").hide();
    })
}
function saveEditions() {
    let endpointUri = urlList.geoPositions + "/" + $("#idGeo").val();
    let _data = {
        "name": $("#nameGeo").val().toString(),
        "latitude": $("#latGeo").val().toString(),
        "longitude": $("#lonGeo").val().toString(),
        "country": $("#paisGeo").val().toString(),
        "state": $("#estadoGeo").val().toString(),
        "city": $("#cidadeGeo").val().toString(),
        "street": $("#ruaGeo").val().toString(),
        "number": parseInt($("#numeroGeo").val()),
        "zipCode": $("#cepGeo").val().toString(),
    }
    let success = (response) => {
        console.log(response)
        if (response.success == true) {
            getGeoPosition();
        }
    };

    let error = () => {
        $("#status-bar").html(`<div id="alert-error" class="container-fluid"><div class="alert alert-danger" role="alert">
            Não foi possivel atualizar o item, Tente novamente mais tarde!
            </div></div>`)
        removeStatusBar("#alert-error");
    };
    let complete = () => {

    };
    ajaxCall("PUT", endpointUri, JSON.stringify(_data), success, error, complete);
}




// Remoção
function removeGeoPosition(id) {
    let endpointUri = urlList.geoPositions + "/" + id;
    let success = (response) => {
        if (response.success == true) {
            getGeoPosition();
        } else {
            $("#status-bar").html(`<div id="alert-error" class="container-fluid"><div class="alert alert-danger" role="alert">
                Não foi possivel deletar o item, Tente novamente mais tarde!
                </div></div>`)
            removeStatusBar("#alert-error");
        }
    };
    let error = (response) => {
        $("#status-bar").html(`<div id="alert-error" class="container-fluid"><div class="alert alert-danger" role="alert">
                                        Não foi possivel deletar o item, Tente novamente mais tarde!
                                        </div></div>`)
        removeStatusBar("#alert-error");
    };
    let complete = (response) => {

    };
    // Get data from API            
    ajaxCall("DELETE", endpointUri, null, success, error, complete);
}
function removeStatusBar(id) {
    setTimeout(function () {
        $(id).remove();
        $("#mainModal").modal('hide');
    }, 3000);
}
// Criação
function newGeoPosition() {
    let createForm = editFormGeoPosition;
    createForm = createForm.replaceAll("Edição", "Criação");
    createForm = createForm.replaceAll("close-edit-modal", "close-create-modal");
    createForm = createForm.replaceAll("save-editions", "save-new");
    if ($("#create-form").is(":visible") === false) {
        $("#modal-body").html("<div id='create-form'></div>");
        $("#create-form").html(createForm);
    } else {
        $("#create-form").show();
    }
    $("#modal-title").html('<i class="bi bi-pin-map-fill"></i> - Criação de Posições');
    $("#idGeo").val("");
    $("#nameGeo").val("");
    $("#latGeo").val("");
    $("#lonGeo").val("");
    $("#paisGeo").val("");
    $("#estadoGeo").val("");
    $("#cidadeGeo").val("");
    $("#ruaGeo").val("");
    $("#numeroGeo").val("");
    $("#cepGeo").val("");
    $("#save-new").on('click', function () {
        saveNew();
    });
    $("#close-create-modal").on('click', function () {
        $("#create-form").remove();
        $('#mainModal').modal('hide');
    })
}
function saveNew(){
    let endpointUri = urlList.geoPositions;
    let _data = {
        "name": $("#nameGeo").val().toString(),
        "latitude": $("#latGeo").val().toString(),
        "longitude": $("#lonGeo").val().toString(),
        "country": $("#paisGeo").val().toString(),
        "state": $("#estadoGeo").val().toString(),
        "city": $("#cidadeGeo").val().toString(),
        "street": $("#ruaGeo").val().toString(),
        "number": parseInt($("#numeroGeo").val()),
        "zipCode": $("#cepGeo").val().toString(),
    }
    let success = (response) => {
        console.log(response)
        if (response.success == true) {
            getGeoPosition();
        }
    };

    let error = () => {
        $("#status-bar").html(`<div id="alert-error" class="container-fluid"><div class="alert alert-danger" role="alert">
            Não foi possivel criar o item, Tente novamente mais tarde!
            </div></div>`)
        removeStatusBar("#alert-error");
    };
    let complete = () => {

    };
    ajaxCall("POST", endpointUri, JSON.stringify(_data), success, error, complete);
    
}