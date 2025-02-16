document.addEventListener("DOMContentLoaded", function () {
  const jsonUrl = `plants.json?v=${new Date().getTime()}`; // Cache-busting trick

  fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
      const urlParams = new URLSearchParams(window.location.search);
      const plantName = urlParams.get('plant');

      // Redirect to latest PDF if a plant name is found in the URL
      if (plantName) {
        const formattedPlantName = plantName.toLowerCase().replace(/\s+/g, '_');
        if (data.plants && data.plants[formattedPlantName]) {
          window.location.href = data.plants[formattedPlantName]; // Redirect to latest PDF
        } else {
          document.getElementById('message').innerText = "Plant data not found!";
        }
      } else {
        document.getElementById('message').innerText = "Select a plant to view its details.";
      }

      // Dynamically generate plant buttons
      const plantButtonsDiv = document.getElementById('plant-buttons');
      if (plantButtonsDiv) {
        plantButtonsDiv.innerHTML = ""; // Clear old buttons before adding new ones
        Object.keys(data.plants).forEach(plant => {
          const button = document.createElement('button');
          button.innerText = plant.replace(/_/g, ' ').toUpperCase();
          button.onclick = () => window.location.href = `index.html?plant=${plant}`;
          button.classList.add('plant-button');
          plantButtonsDiv.appendChild(button);
        });
      }
    })
    .catch(error => {
      console.error('Error loading plant data:', error);
      document.getElementById('message').innerText = "Error loading plant data!";
    });
});
//test01