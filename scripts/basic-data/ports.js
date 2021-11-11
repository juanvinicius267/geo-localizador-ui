//Listagem de urls
//let urlList = routes();

let listDataPorts;
//Esta função busca os dados dentro do banco de dados e chama a função de preenchimento do modal
function getPorts() {
    let endpointUri = urlList.ports;
    let success = (response) => {
        console.log(response)
        if (response.success == true) {
            listDataPorts = response.data;
            fillModalPorts(response.data);
        }
        //document.location.reload(true);
    };

    let error = () => {
        $("#status-bar").html(`<div id="alert-error" class="container-fluid"><div class="alert alert-danger" role="alert">
            Não foi possivel ler os itens, Tente novamente mais tarde!
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
function fillModalPorts(_data) {
    let tbody = "";
    for (let i = 0; i < _data.length; i++) {
        let tr = `<tr id="table-row-${_data[i].idHarbor}">
                <th>${_data[i].idHarbor}</th>
                <td>${_data[i].name}</td>
                <td>${_data[i].latitude}</td>
                <td>${_data[i].longitude}</td>
                <td>${_data[i].country}</td>
                <td>${_data[i].urlPhoto}</td>
                <td>${_data[i].idMarineTraffic}</td>
                <th><button id="button-edit-${_data[i].idHarbor}" class="btn btn-sm btn-success"><i class="bi bi-pen"></i></button></th>
                <th><button id="button-remove-${_data[i].idHarbor}" class="btn btn-sm btn-danger"><i class="bi bi-trash"></i></button></th>                
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
                        <th scope="col">Url Foto</th>
                        <th scope="col">Id Marine</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${tbody}            
                </tbody>
            </table>`;
    $("#modal-body").html(table);
    $("#modal-title").html('<i class="bi bi-card-list"></i> - Lista de Portos');
    for (let index = 0; index < _data.length; index++) {
        $(`#button-edit-${_data[index].idHarbor}`).on('click', function () {
            showEditFieldPorts(_data[index].idHarbor);
        });
        $(`#button-remove-${_data[index].idHarbor}`).on('click', function () {
            removePorts(_data[index].idHarbor)
        });
    }
    $("#edit-form").hide();
}
//-------------------------------Edição-------------------------------//

let editFormPorts = `<h6>Edição</h6>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Id</span>
                    </div>
                        <input id="idHarbor" type="text" class="form-control" aria-describedby="basic-addon1" disabled>
                    </div>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Nome</span>
                    </div>
                        <input id="namePort" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Latitude</span>
                    </div>
                        <input id="latPort" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Longitude</span>
                    </div>
                        <input id="lonPort" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Pais</span>
                    </div>
                        <input id="countryPort" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Url Foto</span>
                    </div>
                        <input id="urlFotoPort" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Id Marine Traffic</span>
                    </div>
                        <input id="idMarineTrafficPort" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                <div>
                    <button class="btn btn-danger" id="close-edit-modal">Fechar</button>
                    <button class="btn btn-primary" id="save-editions">Salvar</button>
                </div>
                <br/>
                <br/>`;
function showEditFieldPorts(id) {
    let _data = listDataPorts.filter(
        function (listDataPorts) { return listDataPorts.idHarbor == id }
    );
    console.log(_data);
    if ($("#edit-form").is(":visible") === false) {
        $("#edit-form").show();
        $("#edit-form").html(editFormPorts);
    } else {
        $("#edit-form").show();
    }
    $("#idHarbor").val(_data[0].idHarbor);
    $("#namePort").val(_data[0].name);
    $("#latPort").val(_data[0].latitude);
    $("#lonPort").val(_data[0].longitude);
    $("#countryPort").val(_data[0].country);
    $("#urlFotoPort").val(_data[0].urlPhoto);
    $("#idMarineTrafficPort").val(_data[0].idMarineTraffic);

    $("#save-editions").on('click', function () {
        saveEditions();
    });
    $("#close-edit-modal").on('click', function () {
        $("#edit-form").hide();
    })
}
function saveEditions() {
    let endpointUri = urlList.ports + "/" + $("#idHarbor").val();
    let _data = {
        "name": $("#namePort").val().toString(),
        "latitude": $("#latPort").val().toString(),
        "longitude": $("#lonPort").val().toString(),
        "country": $("#countryPort").val().toString(),
        "urlPhoto": $("#urlFotoPort").val().toString(),
        "idMarineTraffic": $("#idMarineTrafficPort").val().toString()
    }
    let success = (response) => {
        console.log(response)
        if (response.success == true) {
            getPorts();
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
function removePorts(id) {
    let endpointUri = urlList.ports + "/" + id;
    let success = (response) => {
        if (response.success == true) {
            getPorts();
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
function newPorts() {
    let createForm = editFormPorts;
    createForm = createForm.replaceAll("Edição", "Criação");
    createForm = createForm.replaceAll("close-edit-modal", "close-create-modal");
    createForm = createForm.replaceAll("save-editions", "save-new");
    if ($("#create-form").is(":visible") === false) {
        $("#modal-body").html("<div id='create-form'></div>");
        $("#create-form").html(createForm);
    } else {
        $("#create-form").show();
    }
    $("#modal-title").html('<i class="bi bi-pin-map-fill"></i> - Criação de portos');
    $("#idHarbor").val("");
    $("#namePort").val("");
    $("#latPort").val("");
    $("#lonPort").val("");
    $("#countryPort").val("");
    $("#urlFotoPort").val("");
    $("#idMarineTrafficPort").val("");
    $("#save-new").on('click', function () {
        saveNew();
    });
    $("#close-create-modal").on('click', function () {
        $("#create-form").remove();
        $('#mainModal').modal('hide');
    })
}
function saveNew(){
    let endpointUri = urlList.ports;
    let _data = {
        "name": $("#namePort").val().toString(),
        "latitude": $("#latPort").val().toString(),
        "longitude": $("#lonPort").val().toString(),
        "country": $("#countryPort").val().toString(),
        "urlPhoto": $("#urlFotoPort").val().toString(),
        "idMarineTraffic": $("#idMarineTrafficPort").val().toString()
    }
    let success = (response) => {
        console.log(response)
        if (response.success == true) {
            getPorts();
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