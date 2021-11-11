//Listagem de urls
let urlList = routes();


let listData;
//Esta função busca os dados dentro do banco de dados e chama a função de preenchimento do modal
function getTrucks() {
    let endpointUri = urlList.getTruck;
    let success = (response) => {
        console.log(response)
        if (response.success == true) {
            listData = response.data;
            fillModal(response.data);
        }
        //document.location.reload(true);
    };

    let error = () => {
        $("#status-bar").html(`<div id="alert-error" class="container-fluid"><div class="alert alert-danger" role="alert">
            Não foi possivel deletar o item, Tente novamente mais tarde!
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
function fillModal(_data) {
    let tbody = "";
    for (let i = 0; i < _data.length; i++) {
        let tr = `<tr id="table-row-${_data[i].idTruck}">
                <th>${_data[i].idTruck}</th>
                <td>${_data[i].licensePlate}</td>
                <td>${_data[i].carrier}</td>
                <td>${_data[i].volumeCapacity}</td>
                <td>${_data[i].weightCapacity}</td>
                <td>${_data[i].model}</td>
                <th><button id="button-edit-${_data[i].idTruck}" class="btn btn-sm btn-success"><i class="bi bi-pen"></i></button></th>
                <th><button id="button-remove-${_data[i].idTruck}" class="btn btn-sm btn-danger"><i class="bi bi-trash"></i></button></th>                
            </tr>`;
        tbody = tbody + tr;
    }

    let table = `
        <div id="edit-form" style="max-height:200px; overflow-y:auto;"></div>
        <table class="table" style="max-height:200px; overflow-y:auto;">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Placa</th>
                        <th scope="col">Transportadora</th>
                        <th scope="col">Lim. Volume</th>
                        <th scope="col">Lim. Carga</th>
                        <th scope="col">Modelo</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${tbody}            
                </tbody>
            </table>`;
    $("#modal-body").html(table);
    $("#modal-title").html('<i class="bi bi-card-list"></i> - Lista de caminhões');
    for (let index = 0; index < _data.length; index++) {
        $(`#button-edit-${_data[index].idTruck}`).on('click', function () {
            showEditFieldTrucks(_data[index].idTruck);
        });
        $(`#button-remove-${_data[index].idTruck}`).on('click', function () {
            removeTruck(_data[index].idTruck)
        });
    }
    $("#edit-form").hide();
}
//-------------------------------Edição-------------------------------//

let editForm = `<h6>Edição</h6>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Id</span>
                    </div>
                        <input id="idTruck" type="text" class="form-control" aria-describedby="basic-addon1" disabled>
                    </div>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Placa</span>
                    </div>
                        <input id="licensePlate" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Transportadora</span>
                    </div>
                        <input id="carrier" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Cap. Volumetrica</span>
                    </div>
                        <input id="volumeCapacity" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Peso total</span>
                    </div>
                        <input id="weightCapacity" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Modelo</span>
                    </div>
                        <input id="model" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                <div>
                    <button class="btn btn-danger" id="close-edit-modal">Fechar</button>
                    <button class="btn btn-primary" id="save-editions">Salvar</button>
                </div>
                <br/>
                <br/>`;
function showEditFieldTrucks(id) {
    let _data = listData.filter(
        function (listData) { return listData.idTruck == id }
    );
    console.log(_data);
    if ($("#edit-form").is(":visible") === false) {
        $("#edit-form").show();
        $("#edit-form").html(editForm);
    } else {
        $("#edit-form").show();
    }
    $("#idTruck").val(_data[0].idTruck);
    $("#licensePlate").val(_data[0].licensePlate);
    $("#carrier").val(_data[0].carrier);
    $("#volumeCapacity").val(_data[0].volumeCapacity);
    $("#weightCapacity").val(_data[0].weightCapacity);
    $("#model").val(_data[0].model);
    $("#save-editions").on('click', function () {
        saveEditions();
    });
    $("#close-edit-modal").on('click', function () {
        $("#edit-form").hide();
    })
}
function saveEditions() {
    let endpointUri = urlList.getTruck + "/" + $("#idTruck").val();
    let _data = {
        "licensePlate": $("#licensePlate").val().toString(),
        "carrier": $("#carrier").val().toString(),
        "volumeCapacity": parseInt($("#volumeCapacity").val()),
        "weightCapacity": parseInt($("#weightCapacity").val()),
        "model": $("#model").val().toString()
    }
    let success = (response) => {
        console.log(response)
        if (response.success == true) {
            getTrucks();
        }
    };

    let error = () => {
        $("#status-bar").html(`<div id="alert-error" class="container-fluid"><div class="alert alert-danger" role="alert">
            Não foi possivel deletar o item, Tente novamente mais tarde!
            </div></div>`)
        removeStatusBar("#alert-error");
    };
    let complete = () => {

    };
    ajaxCall("PUT", endpointUri, JSON.stringify(_data), success, error, complete);
}




// Remoção
function removeTruck(id) {
    let endpointUri = urlList.getTruck + "/" + id;
    let success = (response) => {
        if (response.success == true) {
            getTrucks();
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
    }, 3000);
}
// Criação
function newTruck() {
    let createForm = editForm;
    createForm = createForm.replaceAll("Edição", "Criação");
    createForm = createForm.replaceAll("close-edit-modal", "close-create-modal");
    createForm = createForm.replaceAll("save-editions", "save-new");
    if ($("#create-form").is(":visible") === false) {
        $("#modal-body").html("<div id='create-form'></div>");
        $("#create-form").html(createForm);
    } else {
        $("#create-form").show();
    }
    $("#modal-title").html('<i class="bi bi-clipboard-plus"></i> - Criação de caminhões');
    $("#idTruck").val("");
    $("#licensePlate").val("");
    $("#carrier").val("");
    $("#volumeCapacity").val("");
    $("#weightCapacity").val("");
    $("#model").val("");
    $("#save-new").on('click', function () {
        saveNew();
    });
    $("#close-create-modal").on('click', function () {
        $("#create-form").remove();
        $('#mainModal').modal('hide');
    })
}
function saveNew(){
    let endpointUri = urlList.getTruck;
    let _data = {
        "licensePlate": $("#licensePlate").val().toString(),
        "carrier": $("#carrier").val().toString(),
        "volumeCapacity": parseInt($("#volumeCapacity").val()),
        "weightCapacity": parseInt($("#weightCapacity").val()),
        "model": $("#model").val().toString()
    }
    let success = (response) => {
        console.log(response)
        if (response.success == true) {
            getTrucks();
        }
    };

    let error = () => {
        $("#status-bar").html(`<div id="alert-error" class="container-fluid"><div class="alert alert-danger" role="alert">
            Não foi possivel deletar o item, Tente novamente mais tarde!
            </div></div>`)
        removeStatusBar("#alert-error");
    };
    let complete = () => {

    };
    ajaxCall("POST", endpointUri, JSON.stringify(_data), success, error, complete);
    
}