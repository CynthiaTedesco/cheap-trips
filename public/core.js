var addCity = function(event){
    if (event.keyCode && event.keyCode === 13){
    	var newCityInput = $('#newCity');
    	var isOrigin = $('#isOrigin');
    	var isDestination = $('#isDestination');

    	if (newCityInput[0] && newCityInput[0].value){
    		var path = '/add-city?name='+newCityInput[0].value;
    		if(isOrigin[0] && isOrigin[0].checked){
    			path += '&isOrigin=true';
    		}
    		if(isDestination[0] && isDestination[0].checked){
    			path += '&isDestination=true';
    		}

	        window.location.href = path;
    	}
    }
}

var removeCity = function(city){
    console.log('closing');
    window.location.href = "/remove-city?name="+city;
}
