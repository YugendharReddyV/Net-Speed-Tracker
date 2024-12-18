const speedDisplay = document.getElementById("speed-display");
const uploadDisplay = document.getElementById("upload-speed");
const pingDisplay = document.getElementById("ping");
const details = document.querySelector(".details");
const restartTest = document.getElementById("restart-test");

// Simulated Speed Test Logic
function performSpeedTest() {
  const downloadBase = 49; 
  const uploadBase = downloadBase * 0.6; 
  const pingBase = 20; 
  const variationPercentage = 0.2;

  const randomSpeed = (base) => base * (1 - variationPercentage + Math.random() * 2 * variationPercentage);

  return {
    download: randomSpeed(downloadBase),
    upload: randomSpeed(uploadBase),
    ping: randomSpeed(pingBase)
  };
}

// Smooth Update for Speed Results
function smoothUpdate(displays) {
  const duration = 2000; 
  const steps = 50; 
  const interval = duration / steps;

  const speedIncrement = displays.finalDownload / steps;
  const uploadIncrement = displays.finalUpload / steps;
  const pingIncrement = displays.finalPing / steps;

  let currentDownload = 0;
  let currentUpload = 0;
  let currentPing = 0;
  let stepCount = 0;

  const intervalId = setInterval(() => {
    if (stepCount >= steps) {
      clearInterval(intervalId);
      updateUI(displays.finalDownload, displays.finalUpload, displays.finalPing);
      return;
    }

    currentDownload = Math.min(displays.finalDownload, currentDownload + speedIncrement);
    currentUpload = Math.min(displays.finalUpload, currentUpload + uploadIncrement);
    currentPing = Math.min(displays.finalPing, currentPing + pingIncrement);

    updateUI(currentDownload, currentUpload, currentPing);
    stepCount++;
  }, interval);
}

// Update UI Elements
function updateUI(downloadSpeed, uploadSpeed, pingTime) {
  speedDisplay.innerHTML = `${downloadSpeed.toFixed(2)} <span class="unit">Mbps</span>`;
  uploadDisplay.innerHTML = `Upload Speed: ${uploadSpeed.toFixed(2)} <span class="unit">Mbps</span>`;
  pingDisplay.innerHTML = `Ping: ${pingTime.toFixed(2)} <span class="unit">ms</span>`;
}

// Start Test
function startSpeedTest() {
  details.textContent = "Testing network speed...";
  restartTest.classList.add("hidden");
  updateUI(0, 0, 0);

  try {
    const results = performSpeedTest();

    smoothUpdate({
      finalDownload: results.download,
      finalUpload: results.upload,
      finalPing: results.ping
    });

    setTimeout(() => {
      details.textContent = `Test complete. Download: ${results.download.toFixed(2)} Mbps, Upload: ${results.upload.toFixed(2)} Mbps, Ping: ${results.ping.toFixed(2)} ms`;
      restartTest.classList.remove("hidden");
    }, 2000);
  } catch (error) {
    details.textContent = "Speed test failed. Please try again.";
    restartTest.classList.remove("hidden");
    console.error('Speed test error:', error);
  }
}

restartTest.addEventListener("click", startSpeedTest);
startSpeedTest();
