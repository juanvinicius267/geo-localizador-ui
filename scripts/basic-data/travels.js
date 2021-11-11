function newTravel(){
    $("#modal-title").html('<i class="bi bi-card-list"></i> - Criação de Viagens');
    $("#status-bar").html(`<div id="alert-error" class="container-fluid"><div class="alert alert-danger" role="alert">
    Esta pagina está em construção, caso queira utiliza-lá, entre em contato com o time de desenvolvimento!
            </div></div>`)
        removeStatusBar("#alert-error");
}
function getTravel(){
    $("#modal-title").html('<i class="bi bi-card-list"></i> - Lista de Viagens');
    $("#status-bar").html(`<div id="alert-error" class="container-fluid"><div class="alert alert-danger" role="alert">
            Esta pagina está em construção, caso queira utiliza-lá, entre em contato com o time de desenvolvimento!
            </div></div>`)
        removeStatusBar("#alert-error");
}
function removeStatusBar(id) {
    setTimeout(function () {
        $(id).remove();
        $("#mainModal").modal('hide');
    }, 3000);
}



