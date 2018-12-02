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

/* --------- Evènements ------------ */

// Bouton de validation modal
$('#validation').click(function() {
  if ($('#nomResto').val()) {
    monResto.restaurantName = $('#nomResto').val();
    restaurants.afficher_descriptif(monResto);
  }
});