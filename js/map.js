var carte = {
  
  // initialiasation map
  initMap: function () {
    map = new google.maps.Map(document.getElementById('map'), {
      center: pos,
      zoom: 15
    });

    var geocoder = new google.maps.Geocoder;

    // event click sur la carte
    map.addListener('click', function(e) {
      monResto = {};
      monResto.lat = e.latLng.lat();
      monResto.long = e.latLng.lng();
      console.log('lat : '+ monResto.lat);
      console.log('long : ' + monResto.long);
      monResto.ratings = [];
      $('#nomResto').val('');
      var elem = document.getElementById('modal1');
      var instance = M.Modal.getInstance(elem);
      instance.open();
      geocoder.geocode({'location': e.latLng}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            monResto.address = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    });

    // Initialisation api place
    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pos,
      radius: 1000,
      type: ['restaurant']
    }, this.callback);
  },

  // afficher emplacements google place
  callback: function (results, status) {
    console.log(results);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var request = {
          placeId : results[i].place_id,
          fields: ['name', 'formatted_address', 'geometry', 'rating', 'reviews']
        }
        service.getDetails(request, function (place, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            var restoPlace = {};
            restoPlace.restaurantName = place.name;
            restoPlace.address = place.formatted_address;
            restoPlace.lat = place.geometry.location.lat();
            restoPlace.long = place.geometry.location.lng();
            restoPlace.ratingPlace = place.rating;
            restoPlace.ratings = [];
            for (var i = 0; i < place.reviews.length; i++) {
              var rating = {};
              rating.stars = place.reviews[i].rating;
              rating.comment = place.reviews[i].text;
              restoPlace.ratings.push(rating);
            }
            restaurants.afficher_descriptif(restoPlace);
          }
        });
      }
    }
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
    markers.push(marker);
    return markers.length;
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