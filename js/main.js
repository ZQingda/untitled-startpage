// Array list of search engines

var search = [
  ["",    "https://www.google.com/#q="],                              // Google (Default)
  ["g",  "https://www.google.com/#q="],                               // Google
  ["i",  "https://www.google.com/search?tbm=isch&q="],                // Google Images
  ["y",  "https://www.youtube.com/results?search_query="],            // YouTube
  ["w",  "http://en.wikipedia.org/w/index.php?search="],              // Wikipedia
  ["n",  "http://www.nyaa.se/?page=search&cats=0_0&filter=0&term="],  // Nyaa
  ["b",  "https://bakabt.me/browse.php?q="],                          // BakaBT
  ["m",  "https://developer.mozilla.org/en-US/search?q="],            // MDN
  ["t",  "https://www.google.ca/search?sitesearch=www.tutorialspoint.com&q="], //tutorialspoint
  ["s",  "http://stackoverflow.com/search?q="],                       // stackoverflow
  ["k",  "https://kat.cr/usearch/"]                                   // kickass torrents
];

// Array list of navbar item - content div associations

var content = [
  ["1",  "linkSet1"],
  ["2",  "linkSet2"],
  ["3",  "rss"],
  ["4",  "weather"],
  ["5",  "youtube"]
];
// var getId = function(id) {
//   return document.getElementById(id);
// }

/* Function called whenever keypress occurs in searchbar */
var searchPress = function(e, query) {
  var keyPress = e.keyCode || e.which;

  //If key is 'return', performs functions...
  if (keyPress == 13) {

    //Instructional placeholder display when ?~ is searched for
    if (query == "?~") {
      $("#q").val("");
      $("#q").attr("placeholder", "tags are: ![g, i, y, w, n, b, m, t, s, k]");
      e.preventDefault();
    }

    //If exclamation mark found - looks for flag char in search array
    else if (query.lastIndexOf("!") != -1){
      var flag = query.lastIndexOf("!") + 1;

      //
      for(i = 0; i < search.length; i++) {
        if(query.charAt(flag) == search[i][0]) {
          e.preventDefault();
          window.location = search[i][1] + query.substring(0, flag-2);
        }
      }
    }

    //If no exclamation mark found - default search engine
    else {
      e.preventDefault();
      window.location = search[0][1]+query;
    }
  }
}

/* Function called on load and continuously on resize to adjust blurred bg */
function blurAdjustBG () {
  var totalInnerWidth = window.innerWidth;
  var totalInnerHeight = window.innerHeight;
  document.getElementById("blur").style.backgroundSize = totalInnerWidth + "px";
};

/* global variable indicating active content, default first linkset */
var currentActive = "linkSet1";
/* Function called when navbar items clicked to load appropriate content */
function tabOpener () {

  $('.tab').on('click', function() {
    for(count = 0; count < content.length; ++count) {
      if(this.id == content[count][0]) {
        var page = content[count][1];
        //alert(page + " " + currentActive);
        //removes existing content first
        if(page != currentActive) {
          $('.content').children().fadeOut();
          $('#' + page).fadeIn();
          currentActive = page;
        }
      }
    }

  });
};

$(document).ready(function(){
  $('.content').children().hide();
  $('#linkSet1').show();

  tabOpener();
});

window.onload = blurAdjustBG;
window.onresize = blurAdjustBG;
