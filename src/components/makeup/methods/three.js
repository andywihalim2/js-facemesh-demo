import * as THREE from "three";
import TRIANGULATION from "../const/triangulation-three";
import positionBufferData from "../const/position-buffer";
import uvs from "../const/uvs";

export const getCamera = (canvas) => {
  const halfW = canvas.width * 0.5;
  const halfH = canvas.height * 0.5;
  const near = 1;
  const far = 1000;

  const camera = new THREE.OrthographicCamera(
    halfW,
    -halfW,
    -halfH,
    halfH,
    near,
    far
  );

  camera.position.x = halfW;
  camera.position.y = halfH;
  camera.position.z = -600;
  camera.lookAt(halfW, halfH, 0);

  return camera;
};

export const getTextureMaterial = (image) => {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(image);
  texture.encoding = THREE.sRGBEncoding;

  texture.anisotropy = 16;
  const alpha = 0.4;
  const beta = 0.5;

  const material = new THREE.MeshPhongMaterial({
    map: texture,
    color: new THREE.Color(0xffffff),
    specular: new THREE.Color(beta * 0.2, beta * 0.2, beta * 0.2),
    reflectivity: beta,
    shininess: Math.pow(2, alpha * 10),
  });

  return material;
};

export const getGeometry = () => {
  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(TRIANGULATION);
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positionBufferData, 3)
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  return geometry;
};

export const paintFace = ( predictions, { renderer, scene, camera, geometry }) => {
  if (predictions.length > 0) {

    /* evaluate geometry position based on predictions value */
    const positionBuffer = predictions[0].scaledMesh.reduce(
      (acc, pos) => acc.concat(pos),
      []
    );

    /* evaluate geometry position based on predictions value */
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positionBuffer, 3)
    );

    geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }
};
