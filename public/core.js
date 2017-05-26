var addCity = function(event, input){
    if (event.keyCode && event.keyCode === 13 && input.value){
        window.location.href = "/add-city?name="+input.value;
    }
}

var removeCity = function(city){
    console.log('closing');
    window.location.href = "/remove-city?name="+city;
}
