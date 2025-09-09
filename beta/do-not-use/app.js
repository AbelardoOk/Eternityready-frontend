document.addEventListener("DOMContentLoaded", () => {
    const tvGrid = document.getElementById('tv-grid');
    const iframeContainer = document.getElementById('iframe-container');
    const channelIframe = document.getElementById('channel-iframe');
    const searchBar = document.getElementById('searchBar');

    // Fetch the channel data from the JSON file
    fetch('channels.json')
        .then(response => response.json())
        .then(data => {
            const channels = data.channels;

            // Function to render the grid items
            function renderGrid(filteredChannels) {
                tvGrid.innerHTML = '';
                filteredChannels.forEach(channel => {
                    const channelBox = document.createElement('div');
                    channelBox.classList.add('tv-channel');
                    channelBox.dataset.channelName = channel.name;
                    channelBox.innerHTML = `
                        <img src="${channel.image}" alt="${channel.name}">
                        <p>${channel.name}</p>
                    `;
                    channelBox.addEventListener('click', () => {
                        if (channel.embed) {
                            channelIframe.src = channel.embed;
                            iframeContainer.style.display = 'block';
                        } else {
                            window.location.href = channel.link;
                        }
                    });
                    tvGrid.appendChild(channelBox);
                });
            }

            // Initial rendering of all channels
            renderGrid(channels);

            // Search functionality
            searchBar.addEventListener('input', (event) => {
                const query = event.target.value.toLowerCase();
                const filteredChannels = channels.filter(channel => 
                    channel.name.toLowerCase().includes(query) || 
                    (channel.categories && channel.categories.some(cat => cat.toLowerCase().includes(query)))
                );
                renderGrid(filteredChannels);
            });
        })
        .catch(error => console.error('Error loading channel data:', error));
});
