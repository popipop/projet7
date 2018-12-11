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
    var idResto = 'resto' + $('.collapsible li').length;
    var li = $('<li>').attr('id', idResto).appendTo('#restos');
    var divHeader = $('<div>').addClass('waves-effect collapsible-header').appendTo(li);
    $('<span>').text(resto.restaurantName).appendTo(divHeader);
    var starsHeader = $('<span>').addClass('starsHeader').appendTo(divHeader);
    var moyHeader = $('<div>').addClass('moyHeader').appendTo(divHeader);
    var div = $('<div>').addClass('collapsible-body').appendTo(li);
    var a = $('<a>').addClass("waves-effect waves-light btn avis").text('Donner mon avis').appendTo(div);
    var p = $('<p>').appendTo(div);
    $('<i>').addClass('material-icons').text('location_on').appendTo(p);
    $('<span>').text(resto.address).appendTo(p);
    $(restaurants.afficher_image_streetview(resto)).appendTo(div);
    $.each(resto.ratings, function (index, rating) {
      var div_stars = $('<div>').addClass('stars').appendTo(div);
      restaurants.ajouter_stars(rating.stars, rating.comment, div_stars);
    });
    $('.collapsible').collapsible();
    var position_resto = {
      lat: resto.lat,
      lng: resto.long
    };
    $(a).click(function() {
      $('#idResto').val(idResto);
      $("#monRateYo").rateYo({
        rating: 3,
        fullStar: true
      });
      var elem = document.getElementById('modal2');
      var instance = M.Modal.getInstance(elem);
      instance.open();
    });
    this.afficher_moy(idResto, resto.ratingPlace);
    var numMarker = carte.creer_marker(position_resto, "red", resto.restaurantName);
    $('<input>').attr('type', 'hidden').addClass('numMarker').val(numMarker).appendTo(divHeader);
  },

  // Afficher la moyenne
  afficher_moy: function (idResto, ratingPlace) {
    var cible = '#' + idResto + ' .stars';
    var moy = 0;
    if (ratingPlace) {
      moy = ratingPlace;
    } else {
      $(cible).each(function (index, element) {
        moy += Number($(this).find('.note').val());
      });
      if ($(cible).length != 0 || moy != 0) {
        moy = moy / $(cible).length;
      }
    }
    var starsHeader = $('#'+idResto).find('.starsHeader');
    var moyHeader = $('#'+idResto).find('.moyHeader');
    starsHeader.find('span').remove();
    $('<span>').rateYo({
      rating: moy,
      readOnly: true
    }).appendTo(starsHeader);
    moyHeader.find('input').remove();
    $('<input>').attr('type','hidden').addClass('moyResto').val(moy).appendTo(moyHeader);
  },

  // Ajouter étoiles
  ajouter_stars: function (note, commentaire, element, idResto) {
    $('<p>').rateYo({
      rating: note,
      readOnly: true
    }).appendTo(element);
    $('<p>').text(commentaire).appendTo(element);
    $('<input>').attr('type', 'hidden').addClass('note').val(note).appendTo(element);
    if (idResto) {
      this.afficher_moy(idResto);
    }
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
        var numMarker = $(this).find('.numMarker').val();
        markers[numMarker - 1].setMap(null);
        var moyResto = $(this).find('.moyResto').val();
        if (moyResto >= value[0] && moyResto <= value[1]) {
          $(this).show();
          markers[numMarker - 1].setMap(map);
        }
      });
    });
  }
}