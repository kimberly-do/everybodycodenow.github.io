function getPhotos(photoset_id) {

  //get pictures for each photoset
  $.getJSON("https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=30326df98ef709db64dd9cebe1702492&user_id=137000489%40N06&format=json&nojsoncallback=1&photoset_id=" + photoset_id).done(function(data) {
    var pictures = data.photoset.photo;
    classactive = 'active';
    for (var i = 0; i < pictures.length; ++i) {
      var photo = pictures[i];
      var farmid = photo.farm;
      var serverid = photo.server;
      var imageid = photo.id;
      var imagesecret = photo.secret;
      var flickrAPI_farmURL = "https://farm" + farmid + ".staticflickr.com/" + serverid + "/" + imageid + "_" + imagesecret + "_c.jpg";
      $('#' + photoset_id + '>.carousel-inner').append("<div class='item "+classactive+"'><img src='" + flickrAPI_farmURL + "'></div>");
      $('#' + photoset_id + '>.carousel-indicators').append('<li data-target="#'+ photoset_id +'" data-slide-to="'+i+'" class="'+classactive+'"></li>')
      classactive='';
    }
  });
}

function showAlbum(albumid) {
  $('.album').hide();
  $('#' + albumid).fadeIn();
}
  first_album = 1;
  //Get all the albums
  $.getJSON("https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=30326df98ef709db64dd9cebe1702492&user_id=137000489%40N06&format=json&nojsoncallback=1").done(function(data) {
    var photosets = data.photosets.photoset;
    for (var x = 0; x < photosets.length; ++x) {
      var photoset_name = photosets[x].title['_content'];
      var photoset_id = photosets[x].id;
      if (x == 0) {
        first_album = photoset_id;
      }
      $('#gallery_albums').append("<div id='" + photoset_id + "' class='carousel slide album' data-ride='carousel'><div class='carousel-inner' role='listbox'><h3>" + photoset_name + "</h3></div></div>");
      $('#gallery_album_nav').append("<li><a onClick='showAlbum(\"" + photoset_id + "\")'>" + photoset_name + "</a></li>");
      $('#'+photoset_id ).append('<ol class="carousel-indicators"></ol>');
      $('#'+photoset_id ).append('<a class="left carousel-control" href="#'+ photoset_id +'" role="button" data-slide="prev"> <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="right carousel-control" href="#'+ photoset_id +'" role="button" data-slide="next"> <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> <span class="sr-only">Next</span> </a>');
      getPhotos(photoset_id);
    }
     showAlbum(first_album);
  });