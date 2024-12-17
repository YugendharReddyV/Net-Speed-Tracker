const needle = document.querySelector(".needle");

function performSpeedTest() {
  const downloadBase = 49; 
  const uploadBase = downloadBase * 0.6; 
  const pingBase = 20; 

  const variationPercentage = 0.2; 

  const minDownload = downloadBase * (1 - variationPercentage);
  const maxDownload = downloadBase * (1 + variationPercentage);
  const downloadSpeed = Math.random() * (maxDownload - minDownload) + minDownload;

  return {
    download: downloadSpeed
  };
}

function updateNeedlePosition(downloadSpeed) {
  const needleMaxAngle = 180; // Maximum angle for the needle (full scale from 0 to 180 degrees)
  const speedRatio = downloadSpeed / 100; // Assuming the max speed is 100 Mbps

  const needleAngle = needleMaxAngle * speedRatio;
  needle.style.transform = `rotate(${needleAngle}deg)`;
}

function startSpeedTest() {
  const results = performSpeedTest();
  updateNeedlePosition(results.download);
}

// Automatically start speed test when page loads
window.onload = startSpeedTest;
