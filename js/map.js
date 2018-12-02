var carte = {
  // initialiasation map
  initMap: function () {
    map = new google.maps.Map(document.getElementById('map'), {
      center: pos,
      zoom: 13
    });

    // Initialiser modal
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    var geocoder = new google.maps.Geocoder;

    // event click sur la carte
    map.addListener('click', function(e) {
      monResto = {};
      monResto.lat = e.latLng.lat();
      monResto.long = e.latLng.lng();
      monResto.ratings = [];
      $('#nomResto').val('');
      var elem = document.getElementById('modal1');
      var instance = M.Modal.getInstance(elem);
      instance.open();
      geocoder.geocode({'location': e.latLng}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            monResto.address = results[0].formatted_address;
            monResto.restaurantName = 'Le super Resto';
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    });
  },

  // Créer un marqueur
  creer_marker: function (position, color, titre) {
    var url = "http://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png";
    var marker = new google.maps.Marker({
      position,
      map: map,
      icon: {
        url
      },
      title: titre
    });
  },

  // Gestion de la géolocalisation
  geoloc: function () {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        map.setCenter(pos);
        carte.creer_marker(pos, "blue", "Vous êtes ici");
      });
    }
  }
}