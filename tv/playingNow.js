// function parseJSON(jsonData) {
//     const schedule = [];

//     jsonData.forEach(channel => {
//         const channelName = channel.channel_name;
//         channel.shows.forEach(show => {
//             schedule.push({
//                 channel: channelName,
//                 day: show.day,
//                 startTime: show.start_time,
//                 endTime: show.end_time,
//                 program: show.show_name
//             });
//         });
//     });

//     return schedule;
// }

// function findCurrentProgramsFromJSON(jsonData, timezoneOffset = 0) {
//     const schedule = parseJSON(jsonData);
//     const currentTime = new Date();
//     currentTime.setMinutes(currentTime.getMinutes() + timezoneOffset);
    
//     const dayOfWeek = currentTime.toLocaleDateString('en-US', { weekday: 'long' });

//     schedule.forEach(entry => {
//         if (entry.day !== dayOfWeek) return;

//         const [startH, startM, startS] = entry.startTime.split(':').map(Number);
//         const [endH, endM, endS] = entry.endTime.split(':').map(Number);

//         const start = new Date();
//         start.setHours(startH, startM, startS || 0, 0);

//         const end = new Date();
//         end.setHours(endH, endM, endS || 0, 0);

//         if (end < start) end.setDate(end.getDate() + 1); // handle crossing midnight

//         if (currentTime >= start && currentTime < end) {
//             const safeChannelName = CSS.escape(entry.channel);
//             const selector = `[data-channel-name="${CSS.escape(entry.channel)}"]`;
// 			const channelElement = document.querySelector(selector);
//             if (channelElement) {
// 				console.log('hit')
//                 channelElement.innerHTML = '';

//                 const onNowSpan = document.createElement('span');
//                 onNowSpan.textContent = 'On now: ';

//                 const programText = document.createTextNode(entry.program);

//                 channelElement.appendChild(onNowSpan);
//                 channelElement.appendChild(programText);
//                 console.log(entry.channel)
//             }
//             else {
//                 console.log(`Channel "${entry.channel}" not found on DOM.`);
//             }
//         }
//     });
// }

// const jsonUrl = 'https://www.eternityready.com/tv/tv-schedule-data.json';

// window.updatePrograms = function() {
// 	console.log('fetching')
//     fetch(jsonUrl)
//         .then(response => response.json())
//         .then(jsonData => {
//             findCurrentProgramsFromJSON(jsonData, 0);
//         })
//         .catch(error => {
//             console.error('Error fetching or parsing JSON:', error);
//         });
// };

// setInterval(() => {
//     updatePrograms();
// }, 60000);


function parseScheduleJSON(jsonData) {
  const schedule = [];
  jsonData.forEach((channel) => {
    const channelName = channel.channel_name;
    channel.shows.forEach((show) => {
      schedule.push({
        channel: channelName,
        day: show.day,
        startTime: show.start_time,
        endTime: show.end_time,
        program: show.show_name,
      });
    });
  });
  return schedule;
}

function findAndDisplayCurrentPrograms(scheduleData, timezoneOffset = 0) {
  const schedule = parseScheduleJSON(scheduleData);
  const currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() + timezoneOffset);

  const dayOfWeek = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
  });

  schedule.forEach((entry) => {
    if (entry.day !== dayOfWeek) return;

    const [startH, startM] = entry.startTime.split(":").map(Number);
    const [endH, endM] = entry.endTime.split(":").map(Number);

    const start = new Date();
    start.setHours(startH, startM, 0, 0);

    const end = new Date();
    end.setHours(endH, endM, 0, 0);

    if (end < start) end.setDate(end.getDate() + 1);

    if (currentTime >= start && currentTime < end) {
      const selector = `[data-channel-name="${CSS.escape(entry.channel.toLowerCase())}"]`;
      const channelElement = document.querySelector(selector);

      if (channelElement) {
        channelElement.innerHTML = `<span>On now: </span>${entry.program}`;
      } else {
        console.log(
          `Channel "${entry.channel}" not found on DOM. (This might be intentional if the channel is not displayed).`
        );
      }
    }
  });
}

function startProgramUpdates() {
  const jsonUrl = "./tv-schedule-data.json";
  ("");
  const fetchAndUpdate = () => {
    console.log("Fetching program schedule...");
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        findAndDisplayCurrentPrograms(jsonData, 0);
      })
      .catch((error) => {
        console.error("Error fetching or parsing schedule JSON:", error);
      });
  };

  fetchAndUpdate();
  setInterval(fetchAndUpdate, 60000);
}
