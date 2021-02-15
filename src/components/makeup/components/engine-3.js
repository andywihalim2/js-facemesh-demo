import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs-core";
import * as THREE from "three";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-backend-webgl";
import Stats from "stats.js";
import { setupCamera, stopCamera } from "../methods/camera";
import Resize from "./resize";
import { cssCam, cssCanvasBase, cssCanvasDraw, cssWrapper } from "../style";
import {
  getCamera,
  getTextureMaterial,
  getGeometry,
  paintFace,
} from "../methods/three";

const IMAGE =
  "https://samarthgulati.com/ar-face-filters/assets/cherial-mask.jpg";

const Engine = ({ skin, lip, eyeShadow, onReady }) => {
  const [ready, setReady] = useState(false);
  const color = useRef({ skin, lip, eyeShadow });
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasCamRef = useRef(null);
  const webcamRef = useRef(null);
  const VIDEO_WIDTH = 405;
  const VIDEO_HEIGHT = 720;

  useEffect(() => {
    if (ready) onReady();
  }, [ready, onReady]);

  useEffect(() => {
    /* set color props to color ref
    in paiting methods we are using ref instead of props to avoid depedencies
    that cause re-render and re-init the whole things when user do some changes */
    color.current = { skin, lip, eyeShadow };
  }, [skin, lip, eyeShadow]);

  useEffect(() => {
    /* semi-global var
    shared for init and predictAndPaint method */
    let video = webcamRef.current;
    let canvas = canvasRef.current;
    let canvasCam = canvasCamRef.current;

    let ctx, ctxCam, videoWidth, videoHeight, model;
    let camera, material, scene, renderer, geometry, predictions;
    let recursive = true;
    const stats = new Stats();

    /* prediction and painting method */
    const predictAndPaint = async () => {
      /* capture Stats (fps) */
      stats.begin();
      /* get prediction/estimate values from video frame  */

      /* draw webcam frame for replacing actual webcam camera
      to ensure painting canvas and video frame are sync */
      ctxCam.drawImage(
        video,
        0,
        0,
        videoWidth,
        videoHeight,
        0,
        0,
        canvasCam.width,
        canvasCam.height
      );

      /* clear painting canvas every frame before next painting */
      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* get values of user-select colors in ref and do painting */
      // const { skin, lip, eyeShadow } = color.current;
      paintFace(predictions, { renderer, scene, camera, geometry });

      /* Stat capture end */
      stats.end();

      /* recall for next frame after current animation frame is done - recursive */
      recursive && requestAnimationFrame(predictAndPaint);
    };

    /* init method - will be call when component did mount */
    const init = async () => {
      /* using tfjs backend webgl
      also available: wasm, cpu - require deps + setup */
      await tf.setBackend("webgl");

      stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
      wrapperRef.current.appendChild(stats.dom);

      /* camera init */
      await setupCamera(video, VIDEO_WIDTH, VIDEO_HEIGHT);
      video.play();
      videoWidth = video.videoWidth;
      videoHeight = video.videoHeight;

      /* sync video size to canvas */
      video.width = videoWidth;
      video.height = videoHeight;
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      canvasCam.width = videoWidth;
      canvasCam.height = videoHeight;

      /* initiate canvas for painting */
      ctx = canvas.getContext("2d");
      ctxCam = canvasCam.getContext("2d");
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctxCam.translate(canvasCam.width, 0);
      ctxCam.scale(-1, 1);

      /* load facemesh */
      model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
        {
          maxContinuousChecks: 5,
          detectionConfidence: 0.9,
          maxFaces: 1,
          iouThreshold: 0.3,
          scoreThreshold: 0.75,
        }
      );

      /* initialize renderer */
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });

      renderer.setSize(canvas.width, canvas.height);
      canvas.appendChild(renderer.domElement);

      /* create scene */
      scene = new THREE.Scene();

      /* create camera */
      camera = getCamera(canvas);

      /* create light */
      const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
      scene.add(light);

      /* load material */
      material = getTextureMaterial(IMAGE);

      geometry = getGeometry();

      predictions = await model.estimateFaces({
        input: video,
      });

      const mesh = new THREE.Mesh(geometry, material);

      scene.add(mesh);

      console.log(scene);

      /* call prediction and paint method */
      await predictAndPaint();
      setReady(true);
    };

    /* call init method - only once and for forever */
    init();

    /* component unmount */
    return () => {
      /* end predictAndPaint recursive call */
      recursive = false;
      /* stop webcam */
      stopCamera(video);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={cssWrapper}>
      <video ref={webcamRef} playsInline className={cssCam} />
      <canvas ref={canvasCamRef} className={cssCanvasBase} />
      <Resize>
        <canvas ref={canvasRef} className={cssCanvasDraw} />
      </Resize>
    </div>
  );
};

export default Engine;
