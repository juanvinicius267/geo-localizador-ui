//Listagem de urls
//let urlList = routes();

let listDataVessels;
//Esta função busca os dados dentro do banco de dados e chama a função de preenchimento do modal
function getVessels() {
    let endpointUri = urlList.vessels;
    let success = (response) => {
        console.log(response)
        if (response.success == true) {
            listDataVessels = response.data;
            fillModalVessels(response.data);
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
function fillModalVessels(_data) {
    let tbody = "";
    for (let i = 0; i < _data.length; i++) {
        let tr = `<tr id="table-row-${_data[i].idNavio}">
                <th>${_data[i].idNavio}</th>
                <td>${_data[i].imo}</td>
                <td>${_data[i].name}</td>
                <td>${_data[i].vessel_Type_Generic}</td>
                <td>${_data[i].vessel_Type_Detailed}</td>
                <td>${_data[i].status}</td>
                <td>${_data[i].mmsi}</td>
                <td>${_data[i].call_Sign}</td>
                <td>${_data[i].flag}</td>
                <td>${_data[i].gross_Tonnage}</td>
                <td>${_data[i].home_Port}</td>
                <td>${_data[i].year_Built}</td>
                <th><button id="button-edit-${_data[i].idNavio}" class="btn btn-sm btn-success"><i class="bi bi-pen"></i></button></th>
                <th><button id="button-remove-${_data[i].idNavio}" class="btn btn-sm btn-danger"><i class="bi bi-trash"></i></button></th>                
            </tr>`;
        tbody = tbody + tr;
    }

    let table = `
        <div id="edit-form" style="max-height:200px; overflow-y:auto;"></div>
        <table class="table" style="max-height:200px; overflow-y:auto;">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">IMO</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Tipo de Navio</th>
                        <th scope="col">Tipo Detalhado</th>
                        <th scope="col">Status</th>
                        <th scope="col">MMSI</th>
                        <th scope="col">Call Sign</th>
                        <th scope="col">Flag</th>
                        <th scope="col">Capacida em ton.</th>
                        <th scope="col">Porto</th>
                        <th scope="col">Ano construção</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${tbody}            
                </tbody>
            </table>`;
    $("#modal-body").html(table);
    $("#modal-title").html('<i class="bi bi-card-list"></i> - Lista de Navios');
    for (let index = 0; index < _data.length; index++) {
        $(`#button-edit-${_data[index].idNavio}`).on('click', function () {
            showEditFieldVessels(_data[index].idNavio);
        });
        $(`#button-remove-${_data[index].idNavio}`).on('click', function () {
            removeVessels(_data[index].idNavio)
        });
    }
    $("#edit-form").hide();
}
//-------------------------------Edição-------------------------------//

let editFormVessels = `<h6>Edição</h6>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Id</span>
                    </div>
                        <input id="idVessel" type="text" class="form-control" aria-describedby="basic-addon1" disabled>
                    </div>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">IMO</span>
                    </div>
                        <input id="imo" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Nome</span>
                    </div>
                        <input id="nameVessel" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Tipo de navio</span>
                    </div>
                        <input id="vessel_Type_Generic" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Tipo Detalhado</span>
                    </div>
                        <input id="vessel_Type_Detailed" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Status</span>
                    </div>
                        <input id="statusVessel" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">MMSI</span>
                    </div>
                        <input id="mmsi" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Call Sign</span>
                    </div>
                        <input id="call_Sign" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Bandeira</span>
                    </div>
                        <input id="flag" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Capacida em ton.</span>
                    </div>
                        <input id="gross_Tonnage" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Porto</span>
                    </div>
                        <input id="home_Port" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Ano construção</span>
                    </div>
                        <input id="year_Built" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">ComprimentoXLargura</span>
                    </div>
                        <input id="lengthxBreadth" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                <div>
                    <button class="btn btn-danger" id="close-edit-modal">Fechar</button>
                    <button class="btn btn-primary" id="save-editions">Salvar</button>
                </div>
                <br/>
                <br/>`;
function showEditFieldVessels(id) {
    let _data = listDataVessels.filter(
        function (listDataVessels) { return listDataVessels.idNavio == id }
    );
    console.log(_data);
    if ($("#edit-form").is(":visible") === false) {
        $("#edit-form").show();
        $("#edit-form").html(editFormVessels);
    } else {
        $("#edit-form").show();
    }
    $("#idVessel").val(_data[0].idNavio);
    $("#imo").val(_data[0].imo);
    $("#nameVessel").val(_data[0].name);
    $("#vessel_Type_Generic").val(_data[0].vessel_Type_Generic);
    $("#vessel_Type_Detailed").val(_data[0].vessel_Type_Detailed);
    $("#statusVessel").val(_data[0].status);
    $("#call_Sign").val(_data[0].call_Sign);
    $("#mmsi").val(_data[0].mmsi);
    $("#nameUser").val(_data[0].name);
    $("#flag").val(_data[0].flag);
    $("#gross_Tonnage").val(_data[0].gross_Tonnage);
    $("#home_Port").val(_data[0].home_Port);
    $("#year_Built").val(_data[0].year_Built);
    $("#lengthxBreadth").val(_data[0].lengthxBreadth);

    $("#save-editions").on('click', function () {
        saveEditions();
    });
    $("#close-edit-modal").on('click', function () {
        $("#edit-form").hide();
    })
}
function saveEditions() {
    let endpointUri = urlList.vessels + "/" + $("#idVessel").val();
    let _data = {
        "imo" : $("#imo").val().toString(),
        "name" : $("#nameVessel").val().toString(),
        "vessel_Type_Generic" : $("#vessel_Type_Generic").val().toString(),
        "vessel_Type_Detailed" : $("#vessel_Type_Detailed").val().toString(),
        "status" : $("#statusVessel").val().toString(),
        "call_Sign" : $("#call_Sign").val().toString(),
        "mmsi" : $("#mmsi").val().toString(),
        "flag" : $("#flag").val().toString(),
        "gross_Tonnage" : $("#gross_Tonnage").val().toString(),
        "home_Port" : $("#home_Port").val().toString(),
        "year_Built" : parseInt($("#year_Built").val()),
        "lengthxBreadth" : $("#lengthxBreadth").val().toString()
    }
    let success = (response) => {
        console.log(response)
        if (response.success == true) {
            getVessels();
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
function removeVessels(id) {
    let endpointUri = urlList.vessels + "/" + id;
    let success = (response) => {
        if (response.success == true) {
            getVessels();
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
function newVessels() {
    let createForm = editFormVessels;
    createForm = createForm.replaceAll("Edição", "Criação");
    createForm = createForm.replaceAll("close-edit-modal", "close-create-modal");
    createForm = createForm.replaceAll("save-editions", "save-new");
    if ($("#create-form").is(":visible") === false) {
        $("#modal-body").html("<div id='create-form'></div>");
        $("#create-form").html(createForm);
    } else {
        $("#create-form").show();
    }
    $("#modal-title").html('<i class="bi bi-pin-map-fill"></i> - Criação de Navios');
    $("#idVessel").val("");
    $("#imo").val("");
    $("#nameVessel").val("");
    $("#vessel_Type_Generic").val("");
    $("#vessel_Type_Detailed").val("");
    $("#statusVessel").val("");
    $("#call_Sign").val("");
    $("#mmsi").val("");
    $("#nameUser").val("");
    $("#flag").val("");
    $("#gross_Tonnage").val("");
    $("#home_Port").val("");
    $("#year_Built").val("");
    $("#lengthxBreadth").val("");
    $("#save-new").on('click', function () {
        saveNew();
    });
    $("#close-create-modal").on('click', function () {
        $("#create-form").remove();
        $('#mainModal').modal('hide');
    })
}
function saveNew(){
    let endpointUri = urlList.vessels;
    let _data = {
        "imo" : $("#imo").val().toString(),
        "name" : $("#nameVessel").val().toString(),
        "vessel_Type_Generic" : $("#vessel_Type_Generic").val().toString(),
        "vessel_Type_Detailed" : $("#vessel_Type_Detailed").val().toString(),
        "status" : $("#statusVessel").val().toString(),
        "call_Sign" : $("#call_Sign").val().toString(),
        "mmsi" : $("#mmsi").val().toString(),
        "flag" : $("#flag").val().toString(),
        "gross_Tonnage" : $("#gross_Tonnage").val().toString(),
        "home_Port" : $("#home_Port").val().toString(),
        "year_Built" : parseInt($("#year_Built").val()),
        "lengthxBreadth" : $("#lengthxBreadth").val().toString()
    }
    let success = (response) => {
        console.log(response)
        if (response.success == true) {
            getVessels();
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