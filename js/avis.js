
// initialiasation map
function initMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latParis, lng: lngParis},
    zoom: 12
  });
}

function afficherMap (cle) {
  var baliseMap = '<script src="https://maps.googleapis.com/maps/api/js?key=' + cle + '&callback=initMap" async defer></script>'
  $('body').append(baliseMap);
}