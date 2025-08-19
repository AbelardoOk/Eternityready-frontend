/**
 * lib.js
 *
 * contains jquery code to run and later maintain the playlist
 */
$(document).ready(function () {

    // some flags for browser-specific things
    // canAutoplay: iOS cannot autoplay. The video widget in iOS for iPad can
    // continuously play after the user starts playback, so keeping the playlist
    // running is possible. iOS for iPhone stops after the playlist is done,
    // the play event sent from the script is ignored.
    var canAutoplay=true;

    // see if we're on iOS
    if(/(iPhone|iPad|iPod)/.test(navigator.userAgent)) {
        canAutoplay=false;
    }

    // instantiate the player
    // here we set width, height, RSS playmode and RSS playlist URL
    // RSS playmode: use html if it's MP4 video, flash otherwise
    // Buggy in Firefox, jwplayer always wants webm
    jwplayer("eternaltv").setup({
        playlist: 'playlist.rss',
        logo: {
        file: 'vm.png',
        link: ''
                
    },
    
      
        primary:"html5",
        mute:'false',
        autostart:'true',
        bufferlength: 0,
        height:700,
        width:1200

      });

    // A modified Fisher-Yates shuffle
    // This is a very efficient array shuffler.
    // http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    function shuffle(array) {
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }

    // react to new playlist being loaded
    // we can do lots of custom stuff in here
    // right now, we read the loaded playlist, shuffle it around and play the result back
    jwplayer().onReady(function (event) {
        console.log("onReady");

        var playlist = jwplayer().getPlaylist();
        playlist = shuffle(playlist);
        jQuery.each(playlist, function(index, value) {
            console.log(value.description);
        });

        jwplayer().load(playlist);
        if (canAutoplay)
            setTimeout("jwplayer().play()", 100);
    });

    // react to playlist finishing
    jwplayer().onPlaylistComplete(function (event) {
        console.log("onPlaylistComplete");

        // in here we would age the playlist somehow
        jwplayer().play();
    });

   });
