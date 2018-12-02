var restaurants = {

  // Afficher la liste des restaurants du fichier JSON
  creer_liste_restos: function () {
    $.getJSON("src/restaurants.json", function (json) {
      $.each(json, function (index, resto) {
        restaurants.afficher_descriptif(resto);
      });
    });
  },

  // Affichage de chaque restaurant dans la liste
  afficher_descriptif: function (resto) {
    var li = $('<li>').appendTo('#restos');
    $('<div>').addClass('waves-effect collapsible-header').text(resto.restaurantName).appendTo(li);
    var div = $('<div>').addClass('collapsible-body').appendTo(li);
    var p = $('<p>').appendTo(div);
    $('<i>').addClass('material-icons').text('location_on').appendTo(p);
    $('<span>').text(resto.address).appendTo(p);
    $(restaurants.afficher_image_streetview(resto)).appendTo(div);
    var moy = 0;
    $.each(resto.ratings, function (index, rating) {
      moy += rating.stars;
      var div_stars = $('<div>').addClass('stars').appendTo(div);
      $('<p>').rateYo({
        rating: rating.stars,
        readOnly: true
      }).appendTo(div_stars);
      $('<p>').text(rating.comment).appendTo(div_stars);
    });
    if (resto.ratings.length > 0) {
      moy = moy / resto.ratings.length;
    }
    $('<input>').attr('type','hidden').val(moy).appendTo(div);
    $('.collapsible').collapsible();
    var position_resto = {
      lat: resto.lat,
      lng: resto.long
    }
    carte.creer_marker(position_resto, "red", resto.restaurantName);
  },

  // Affichage de l'image Streetview du restaurant
  afficher_image_streetview: function (resto) {
    var image_streetview = '<img src='
      + '"https://maps.googleapis.com/maps/api/streetview?size=120x120&location='
      + resto.lat + ',' + resto.long
      + '&key='
      + cleMap
      + '">';
    return image_streetview;
  },

  // Gestion du filtre par note
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
    slider.noUiSlider.on('set.one', function (value) {
      var lesRestos = $('#restos li');
      lesRestos.each(function() {
        $(this).hide();
        var moyResto = $(this).find('input').val();
        if (moyResto >= value[0] && moyResto <= value[1]) {
          $(this).show();
        }
      });
    });
  }
}