
// initialiasation map
function initMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latCenter, lng: lngCenter},
    zoom: 13
  });
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  console.log(locations);
  var markers = locations.map(function(location, i) {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length]
    });
  });
  var markerCluster = new MarkerClusterer(map, markers,
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}

function afficherMap (cle) {
  var baliseMap = '<script src="https://maps.googleapis.com/maps/api/js?key=' + cle + '&callback=initMap" async defer></script>'
  $('body').append(baliseMap);
}

// Liste des restaurants
function restos () {
  $.getJSON("../src/restaurants.json", function (json) {
    $.each(json, function (index, resto) {
      $('#restos').append('<h4>' + resto.restaurantName + '</h4>');
      $('#restos').append('<p>' + resto.address + '<p>');
      $.each(resto.ratings, function (index, rating) {
        $('#restos').append('<p><b>Note :</b> ' + rating.stars + ' étoiles.</p>');
        $('#restos').append('<p><b>Commentaire : </b>' + rating.comment + '</p>');
      });
      var myLatLng = {};
      myLatLng.lat = resto.lat;
      myLatLng.lng = resto.long;
      locations.push(myLatLng);
    });
    $(afficherMap(cleMap));
  });
}

function geoloc () {
if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(maPosition, refusPosition);
  }
}

function maPosition(position) {
  console.log('ok');
  latCenter = position.coords.latitude;
  lngCenter = position.coords.longitude;
  restos();
}

function refusPosition(error) {
  console.log(error);
  restos();
}