function ajaxCall(_method,_url,_data,_successCallBackFunction,_errorCallBackFunction,_completeCallBackFunction){
    try{
        //Checking if _data is not null value
        _data = (_data !== null ? _data : {});
        //Configuring and executing AJAX Call
        $.ajax({
            type: _method,
            contentType: "application/json",
            url: _url,
            data:  _data,
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            success: function (response) {
                _successCallBackFunction(response);                                    
            },
            error: function (response) {
                _errorCallBackFunction(response);                
            },
            complete: function (response) {
                _completeCallBackFunction(response);
            }
        });
    }
    catch(e){
        _errorCallBackFunction(e);         
    }       
};