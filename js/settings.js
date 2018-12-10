/* ---------- variables de l'application ----------- */

// initialisation map avec coordonnées de Paris
var cleMap = "AIzaSyBn5VqrB_xDjGcFUaoZ-rzR_Q6pB1g75kQ";
var map;
var monResto ={};
var pos = {
  lat: 48.860423,
  lng: 2.339289
};
var locations = [];
var markers = [];

/* --------- Initialisation modal ------*/

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

/* --------- Evènements ------------ */

// Bouton de validation modal nouveau restaurant
$('#validation').click(function() {
  if ($('#nomResto').val()) {
    monResto.restaurantName = $('#nomResto').val();
    restaurants.afficher_descriptif(monResto);
  }
});

// Bouton de validation modal avis
var maNote = 0;
var monCommentaire = '';
$('#validationNote').click(function() {
  monCommentaire = $('#monAvis').val();
  maNote = $('#monRateYo').rateYo('rating');
  var cible = '#' + $('#idResto').val() + ' .collapsible-body';
  var div = $(cible);
  var div_stars = $('<div>').addClass('stars').appendTo(div);
  if (maNote && monCommentaire) {
    restaurants.ajouter_stars(maNote, monCommentaire, div_stars, $('#idResto').val());
  };
  $('#monRateYo').rateYo('rating', 3);
  $('#monAvis').val('');
});