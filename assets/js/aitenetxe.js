jQuery(document).ready(function($) {

   $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $('.logo').addClass('shrink');
        } else {
            $('.logo').removeClass('shrink');
        }
  });

  var panorama = [];
  var viewer = [];
  $('div[id^="photosphere_"]').each(function(index){
      panorama[index] = new PANOLENS.ImagePanorama( $(this).data("full-img").replace(/-\d*x\d*.jpg/gi, '.jpg') );
      viewer[index] = new PANOLENS.Viewer({container:$(this)[0]});
      viewer[index].add(panorama[index]);
      viewer[index].addUpdateCallback(function() {
              viewer[index].panorama.rotation.y -= 0.001;
              
      });

  });

  $('div[id^="modal_"]').each(function(index){
      $(this).on('shown.bs.modal', function () {
          viewer[index].onWindowResize( $(this).find('.modal-body').width(), $(this).find('.modal-body').height() );
      })
  });

  $("#my-button").on("click", function(){
    jQuery.ajax({
        type: "post",
        url: ajax_var.url,
        data: "action=" + ajax_var.action + "&nonce=" + ajax_var.nonce,
        success: function(result){
            $('#my-events-list').html(result);
        }
    });
});

$('.carousel-handler').on('slide.bs.carousel', function (e) {
    /*
        CC 2.0 License Iatek LLC 2018 - Attribution required
    */
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 5;
    var totalItems = $('.carousel-item').length;
 
    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});

var location = [43.266445,-2.926613];
var zoom = 15;

if (typeof $( ".map-container" ).data( "location" )  !== "undefined"){

    location=eval("["+$( ".map-container" ).data( "location" )+"]");
}

if (typeof $( ".map-container" ).data( "zoom" )  !== "undefined"){

    zoom=$( ".map-container" ).data( "zoom" );
}


var map = L.map('map',  {
    dragging: false,
    zoomControl: false,
    scrollWheelZoom: false
 }).setView(location, zoom);
var gl = L.mapboxGL({
  attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
  style: 'https://api.maptiler.com/maps/7fb4b49b-c32b-40ee-bd50-1ef999621453/style.json?key=rKRfNfNaOvFUyS3UmW4a'
}).addTo(map);


icon = L.divIcon({
    className: 'custom-div-icon',
html: "<div style='background-color:#0f1646;' class='marker-pin'></div><img src='https://web.archive.org/web/20211231183135/https://www.aitenetxe.com/wp-content/uploads/sites/4/2020/09/logo_white_128.png'>",
iconSize: [46, 64],
iconAnchor: [23, 64]
});
marker = L.marker(location, {
icon: icon
}).addTo(map);


var offset = map.getSize().x*0.25;
map.panBy(new L.Point(-offset, 0), {animate: false});

});
