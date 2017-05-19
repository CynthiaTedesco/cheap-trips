var GoEuroAPI = require("./lib/goeuro-api").default; // exposes a function 
                                               // [Function: GoEuroAPI]
const GoEuroClient = new GoEuroAPI();

//var params = {
//    currency: 'EUR',
//    domain: 'com',
//    departurePosition: 'Venice',
//    arrivalPosition: 'Rome',
//    inboundDate: new Date()
//}
//var params = {
//    "searchOptions": {
//        "departurePosition": { "id": 376217 },
//        "arrivalPosition": { "id": 377001 },
//        "travelModes": ["Flight", "Train", "Bus"],
//        "departureDate": "2017-07-08",
//        "returnDate": null,
//        "passengers": [{ "age": 12 }],
//        "userInfo": {
//            "identifier": "0.dj87mh4f039",
//            "domain": ".com", "locale": "en", "currency": "EUR"
//        },
//        "abTestParameters": []
//    }
//};

var params = {"arrivalPosition":{"positionId":442488},"currency":"EUR","departurePosition":{"positionId":442488},"domain":"com","inboundDate":"2017-08-19T00:00:00.000","locale":"en","outboundDate":"2017-07-18T00:00:00.000","passengers":[{"age":18,"rebates":[]}],"resultFormat":{"splitRoundTrip":true},"searchModes":["directbus"]};

//var params = {};

// Init the search and get flights, trains and buses.
GoEuroClient.search(params)
  .then((response) => {
    GoEuroClient.flights()
      .then(flights => console.log(flights));

    GoEuroClient.trains()
      .then(trains => console.log(trains));

    GoEuroClient.buses()
      .then(buses => console.log(buses));
  })
  .catch((error) => {console.log('LALA');console.log(error);});

//// Get buses by search_id
//var id = 551148855;
//GoEuroClient
//  .buses({ search_id: id })
//  .then(buses => console.log(buses))
//  .catch(error => console.log(error));
