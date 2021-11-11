//Listagem de urls
//let urlList = routes();

let listDataUsers;
//Esta função busca os dados dentro do banco de dados e chama a função de preenchimento do modal
function getUsers() {
    let endpointUri = urlList.users;
    let success = (response) => {
        console.log(response)
        if (response.success == true) {
            listDataUsers = response.data;
            fillModalUsers(response.data);
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
function fillModalUsers(_data) {
    let tbody = "";
    for (let i = 0; i < _data.length; i++) {
        let tr = `<tr id="table-row-${_data[i].id}">
                <th>${_data[i].id}</th>
                <td>${_data[i].name}</td>
                <td>${_data[i].surname}</td>
                <td>${_data[i].username}</td>
                <td>${_data[i].role}</td>
                <td>${_data[i].status}</td>
                <th><button id="button-edit-${_data[i].id}" class="btn btn-sm btn-success"><i class="bi bi-pen"></i></button></th>
                <th><button id="button-remove-${_data[i].id}" class="btn btn-sm btn-danger"><i class="bi bi-trash"></i></button></th>                
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
                        <th scope="col">Sobrenome</th>
                        <th scope="col">Username</th>
                        <th scope="col">Tipo Acesso</th>
                        <th scope="col">Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${tbody}            
                </tbody>
            </table>`;
    $("#modal-body").html(table);
    $("#modal-title").html('<i class="bi bi-card-list"></i> - Lista de Usuários');
    for (let index = 0; index < _data.length; index++) {
        $(`#button-edit-${_data[index].id}`).on('click', function () {
            showEditFieldUsers(_data[index].id);
        });
        $(`#button-remove-${_data[index].id}`).on('click', function () {
            removeUsers(_data[index].id)
        });
    }
    $("#edit-form").hide();
}
//-------------------------------Edição-------------------------------//

let editFormUsers = `<h6>Edição</h6>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Id</span>
                    </div>
                        <input id="idUser" type="text" class="form-control" aria-describedby="basic-addon1" disabled>
                    </div>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Nome</span>
                    </div>
                        <input id="nameUser" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Sobrenome</span>
                    </div>
                        <input id="surnameUser" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Username</span>
                    </div>
                        <input id="username" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Password</span>
                    </div>
                        <input id="password" type="password" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Tipo de acesso</span>
                    </div>
                        <input id="roleUser" type="text" class="form-control" aria-describedby="basic-addon1">
                    </div>
                    
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Status</span>
                    </div>
                        <select id="statusUser" type="text" class="form-control" aria-describedby="basic-addon1">
                            <option>true</option>
                            <option>false</option>
                        </select>
                    </div>
                <div>
                    <button class="btn btn-danger" id="close-edit-modal">Fechar</button>
                    <button class="btn btn-primary" id="save-editions">Salvar</button>
                </div>
                <br/>
                <br/>`;
function showEditFieldUsers(id) {
    let _data = listDataUsers.filter(
        function (listDataUsers) { return listDataUsers.id == id }
    );
    console.log(_data);
    if ($("#edit-form").is(":visible") === false) {
        $("#edit-form").show();
        $("#edit-form").html(editFormUsers);
    } else {
        $("#edit-form").show();
    }
    $("#idUser").val(_data[0].id);
    $("#nameUser").val(_data[0].name);
    $("#surnameUser").val(_data[0].surname);
    $("#username").val(_data[0].username);
    $("#roleUser").val(_data[0].role);
    $("#statusUser").val(_data[0].status);

    $("#save-editions").on('click', function () {
        saveEditions();
    });
    $("#close-edit-modal").on('click', function () {
        $("#edit-form").hide();
    })
}
function saveEditions() {
    let endpointUri = urlList.users + "/" + $("#idHarbor").val();
    let _data = {
        "name": $("#nameUser").val().toString(),
        "surname": $("#surnameUser").val().toString(),
        "username": $("#username").val().toString(),
        "password": $("#password").val().toString(),
        "role": $("#roleUser").val().toString(),
        "status": Boolean($("#statusUser").val().toString())
    }
    let success = (response) => {
        console.log(response)
        if (response.success == true) {
            getUsers();
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
function removeUsers(id) {
    let endpointUri = urlList.users + "/" + id;
    let success = (response) => {
        if (response.success == true) {
            getUsers();
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
function newUsers() {
    let createForm = editFormUsers;
    createForm = createForm.replaceAll("Edição", "Criação");
    createForm = createForm.replaceAll("close-edit-modal", "close-create-modal");
    createForm = createForm.replaceAll("save-editions", "save-new");
    if ($("#create-form").is(":visible") === false) {
        $("#modal-body").html("<div id='create-form'></div>");
        $("#create-form").html(createForm);
    } else {
        $("#create-form").show();
    }
    $("#modal-title").html('<i class="bi bi-pin-map-fill"></i> - Criação de Usuários');
    $("#idUser").val();
    $("#nameUser").val();
    $("#surnameUser").val();
    $("#username").val();
    $("#roleUser").val();
    $("#statusUser").val();
    $("#save-new").on('click', function () {
        saveNew();
    });
    $("#close-create-modal").on('click', function () {
        $("#create-form").remove();
        $('#mainModal').modal('hide');
    })
}
function saveNew(){
    let endpointUri = urlList.users;
    let _data = {
        "name": $("#nameUser").val().toString(),
        "surname": $("#surnameUser").val().toString(),
        "username": $("#username").val().toString(),
        "password": $("#password").val().toString(),
        "role": $("#roleUser").val().toString(),
        "status": Boolean($("#statusUser").val().toString())
    }
    let success = (response) => {
        console.log(response)
        if (response.success == true) {
            getUsers();
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