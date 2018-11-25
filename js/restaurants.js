var restaurants = {

  liste_stars: [],

  // Afficher la liste des restaurants du fichier JSON
  creer_liste_restos: function () {
    $.getJSON("src/restaurants.json", function (json) {
      $.each(json, function (index, resto) {
        $('#restos').append('<li><div class="waves-effect collapsible-header">'
          + resto.restaurantName
          + '</div>'
          + '<div class="collapsible-body"><p><i class="material-icons">location_on</i> '
          + resto.address
          + '</p>'
          + restaurants.afficher_image_streetview(resto)
          + restaurants.creer_liste_avis(resto)
          + '</div></li>');
        $('.collapsible').collapsible();
        var position_resto = {
          lat: resto.lat,
          lng: resto.long
        };
        carte.creer_marker(position_resto, "red", resto.restaurantName);
      });
      restaurants.afficher_stars();
    });
  },

  creer_liste_avis: function (resto) {
    var liste_avis = '';
    $.each(resto.ratings, function (index, rating) {
      restaurants.liste_stars.push(rating.stars);
      var id_avis = 'stars' + restaurants.liste_stars.length;
      liste_avis += '<p><span id = "' + id_avis + '"></span></p>' + '<p>' + rating.comment + '</p>';
    });
    return liste_avis;
  },

  afficher_image_streetview: function (resto) {
    var image_streetview = '<img src='
      + '"https://maps.googleapis.com/maps/api/streetview?size=120x120&location='
      + resto.lat + ',' + resto.long
      + '&heading=151.78&pitch=-0.76&key='
      + cleMap
      + '">';
    return image_streetview;
  },

  afficher_stars: function () {
    for (var i = 0; i < restaurants.liste_stars.length; i++) {
      var id_avis = "#stars" + (i + 1);
      $(id_avis).rateYo({
        rating: restaurants.liste_stars[i],
        readOnly: true
      });
    }
  },

  filtrer_restaurants: function () {
    var slider = document.getElementById('stars-slider');
      noUiSlider.create(slider, {
      start: [0, 5],
      connect: true,
      step: 1,
      orientation: 'horizontal', // 'horizontal' or 'vertical'
      range: {
        'min': 0,
        'max': 5
      },
      format: wNumb({
        decimals: 0
      })
      });
  }
}