Video Player with Schedule Integration
----------------------------------------

This project integrates a video player into an HTML page that plays videos based on a predefined schedule using Video.js and the YouTube plugin. It also features an overlay logo that links to your homepage.

1. Create a new channel

Create a folder for you new channel in video-scheduler folder. Inside the folder add a schedule.json, your logo (name it logo.png). If you are adding hosted mp4's add them there aswell.

2. Add files to you site

Add the following iframe where you want the video player to appear:

   <iframe src="https://eternityready.com/Local_Channels/video-scheduler/index.php?channel=channelname" width="800" height="400"></iframe>

   Replace channelname with an actual channel folder you created in step 1 

3. Customize schedule.json

Edit schedule.json you create with your desired video schedule. For example:

{
    "randomPlayback": true,
    "Monday": [
        {
            "start": "16:00",
            "end": "20:00",
            "url": "https://www.youtube.com/watch?v=videoId"
        },
        {
            "start": "20:00",
            "end": "20:30",
            "url": "/YourVideo.mp4"
        }
    ],
}
