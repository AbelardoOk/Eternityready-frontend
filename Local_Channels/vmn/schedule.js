const params = new URLSearchParams(window.location.search);
const channel = params.get('channel') || 'default-channel'; // default to 'schedule' if no channel provided

fetch(`${channel}/schedule.json`)
  .then(response => response.json())
  .then(scheduleData => {
    // Helper: Convert "HH:mm" to minutes since midnight.
    const timeToMinutes = timeStr => {
      const [h, m] = timeStr.split(':').map(n => parseInt(n, 10));
      return h * 60 + m;
    };

    // Helper: Get current Toronto time components.
    const getTorontoTimeData = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Toronto',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      const day = now.toLocaleDateString('en-US', {
        timeZone: 'America/Toronto',
        weekday: 'long'
      });
      const [hours, minutes] = timeStr.split(':').map(Number);
      return { day, currentMinutes: hours * 60 + minutes };
    };

    // Choose a video based on schedule or random.
    const randomPlaybackEnabled = scheduleData.randomPlayback === true;
    const getVideoURL = () => {
      let candidate = "";
      if (randomPlaybackEnabled) {
        const days = Object.keys(scheduleData).filter(k => k !== 'randomPlayback');
        const allVideos = days.reduce((acc, d) => acc.concat(scheduleData[d]), []);
        candidate = allVideos[Math.floor(Math.random() * allVideos.length)].url;
      } else {
        const { day, currentMinutes } = getTorontoTimeData();
        console.log(`Current Toronto time: ${day} ${currentMinutes}`);
        if (scheduleData[day]) {
          for (let slot of scheduleData[day]) {
            const start = timeToMinutes(slot.start);
            const end = timeToMinutes(slot.end);
            console.log(`Checking slot: ${slot.start} - ${slot.end} (${start} - ${end})`);
            if (currentMinutes >= start && currentMinutes <= end) {
              candidate = slot.url;
              break;
            }
          }
        }
        // Fallback to a random video if no slot matched.
        if (!candidate) {
          const days = Object.keys(scheduleData).filter(k => k !== 'randomPlayback');
          const allVideos = days.reduce((acc, d) => acc.concat(scheduleData[d]), []);
          candidate = allVideos[Math.floor(Math.random() * allVideos.length)].url;
        }
      }
      return candidate;
    };

    // For non-YouTube videos, do a HEAD request.
    function checkMp4Video(url) {
      return fetch(url, { method: 'HEAD' }).then(response => {
        if (response.ok) return true;
        else throw new Error("Video not found");
      });
    }

    // For YouTube links, use the oEmbed endpoint.
    function checkYouTubeVideo(url) {
      let videoId = null;
      const match = url.match(/(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^&]+)/);
      if (match) {
        videoId = match[1];
      }
      if (!videoId) return Promise.reject(new Error("Invalid YouTube URL"));
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      return fetch(oembedUrl).then(response => {
        if (response.ok) return true;
        else throw new Error("YouTube video not available");
      });
    }

    // Validate a video URL.
    function validateVideo(url) {
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        return checkYouTubeVideo(url);
      } else {
        return checkMp4Video(url);
      }
    }

    // Recursively get a valid video URL.
    function loadValidatedVideo() {
      let url = getVideoURL();
      return validateVideo(url)
        .then(() => url)
        .catch(err => {
          console.log("Validation failed for", url, err);
          return loadValidatedVideo();
        });
    }

    // Load a valid video, then initialize the player.
    loadValidatedVideo().then(validUrl => {
      let videoURL = validUrl;
      let videoType = (videoURL.includes("youtube.com") || videoURL.includes("youtu.be"))
        ? "video/youtube" : "video/mp4";

      const player = videojs('kazaa-video', {
        autoplay: true,
        techOrder: ['html5', 'youtube'],
        sources: [{ src: videoURL, type: videoType }]
      });

      // Clone the logo element into the player's container.
      player.ready(function() {
        var link = document.createElement('a');
        link.href = '/';
        link.className = 'video-logo';
        var logo = document.createElement('img');
        logo.src = `${channel}/logo.png`;
        logo.className = 'video-logo';
        link.appendChild(logo);
        this.el().appendChild(link);
      });

      // On ended or error, load a new valid video.
      function loadNextVideo() {
        loadValidatedVideo().then(newUrl => {
          const newType = (newUrl.includes("youtube.com") || newUrl.includes("youtu.be"))
            ? "video/youtube" : "video/mp4";
          player.src({ src: newUrl, type: newType });
          player.play();
        });
      }

      player.on('ended', loadNextVideo);
      player.on('error', loadNextVideo);
    }).catch(err => {
      console.log("Could not load a valid video:", err);
    });
  });
