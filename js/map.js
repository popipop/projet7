var carte = {
  // initialiasation map
  initMap: function () {
    map = new google.maps.Map(document.getElementById('map'), {
      center: pos,
      zoom: 13
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

  // Géolocalisation
  geoloc: function () {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        carte.initMap();
        carte.creer_marker(pos, "blue", "Vous êtes ici");
      });
    }
  }
}