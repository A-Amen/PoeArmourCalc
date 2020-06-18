// Armor slider
var armour_slider = document.getElementById('armour_slider')
armour_slider.step = "5"
var armour_value = document.getElementById('armour')
armour_slider.oninput = function(){ armour_value.value = armour_slider.value}

// fire_res slider
var fire_slider = document.getElementById('fres_slider')
var fire_value = document.getElementById('fire_res')
fire_slider.oninput = function(){ fire_value.value = fire_slider.value}

// cold_res slider
var cold_slider = document.getElementById('cres_slider')
var cold_value = document.getElementById('cold_res')
cold_slider.oninput = function(){ cold_value.value = cold_slider.value}

// lightning_res slider
var lightning_slider = document.getElementById('lres_slider')
var lightning_value = document.getElementById('lightning_res')
lightning_slider.oninput = function(){ lightning_value.value = lightning_slider.value}

// health slider
var h_slider = document.getElementById('h_slider')
var h_value = document.getElementById('health')
h_slider.oninput = function(){ h_value.value = h_slider.value}

// dmg_hit slider
var dmg_hit_slider = document.getElementById('hit_slider')
var dmg_hit_value = document.getElementById('damage_hit')
dmg_hit_slider.oninput = function(){ dmg_hit_value.value = dmg_hit_slider.value}

