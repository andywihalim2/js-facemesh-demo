function isMobile() {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  return isAndroid || isiOS;
}

export const setupCamera = async (webcam, width, height) => {
  const mobile = isMobile();

  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'user',
      // Only setting the video to a specified size in order to accommodate a
      // point cloud, so on mobile devices accept the default size.
      width: mobile ? undefined : width,
      height: mobile ? undefined : height
    },
  });
  webcam.srcObject = stream;

  return new Promise((resolve) => {
    webcam.onloadedmetadata = () => {
      resolve(webcam);
    };
  });
};

export const stopCamera = webcam => {
  webcam.srcObject.getTracks().forEach(function(track) {
    track.stop();
  });
};
