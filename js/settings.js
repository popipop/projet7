/* ---------- variables de l'application ----------- */

var cleMap = "AIzaSyBn5VqrB_xDjGcFUaoZ-rzR_Q6pB1g75kQ";
var map;
var service;
var monResto ={};
var pos = {
  lat: 48.88091655382385,
  lng: 2.3465631508483966
};
var zoom = 14;
var radius = 500;
var locations = [];
var markers = [];
var service;
var infowindow;

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
  var cible = $('li.active').find('.collapsible-body');
  if (monCommentaire) {
    var div_stars = $('<div>').addClass('stars').appendTo(cible);
    restaurants.ajouter_stars(maNote, monCommentaire, div_stars, true);
  };
  $('#monRateYo').rateYo('rating', 3);
  $('#monAvis').val('');
});