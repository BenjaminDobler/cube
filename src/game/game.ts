import {
  AmbientLight,
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  AxesHelper,
  BoxBufferGeometry,
  BoxGeometry,
  DoubleSide,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Mesh,
  MeshLambertMaterial,
  NumberKeyframeTrack,
  PerspectiveCamera,
  PlaneBufferGeometry,
  Raycaster,
  Scene,
  SpotLight,
  Vector2,
  Vector3,
  VectorKeyframeTrack,
  WebGLRenderer,
} from "three";

import { animate } from "popmotion";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Cube } from "./cube";

export class Game {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;

  actorGroup: Group;

  width = 1200;
  height = 800;

  cube: Cube;

  action: AnimationAction;

  world = new Group();
  map: any;

  brickMap: Map<string, Mesh> = new Map<string, Mesh>();

  keyMap: Map<string, boolean> = new Map<string, boolean>();
  constructor(private canvas: HTMLCanvasElement) {
    this.setup();
  }

  setup() {
    document.addEventListener("keydown", (e) => {
      this.keyMap.set(e.key, true);
    });

    document.addEventListener("keyup", (e) => {
      this.keyMap.delete(e.key);
    });

    this.scene = new Scene();

    this.camera = new PerspectiveCamera(
      80,
      this.width / this.height,
      0.1,
      2000
    );
    this.camera.position.set(0, 200, 500.0);
    this.camera.lookAt(0, 0, 0.0);

    const amb = new AmbientLight(0x444444);
    this.scene.add(amb);

    const light = new SpotLight(0xffffff);
    this.scene.add(light);
    light.position.set(200, 400, 600);
    light.castShadow = true;
    light.shadow.mapSize.width = 50;
    light.shadow.mapSize.height = 50;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 2000;
    light.shadow.camera.fov = 40;

    const brickGeometry: BoxBufferGeometry = new BoxGeometry(50, 50, 50);

    const brickMaterial: MeshLambertMaterial = new MeshLambertMaterial({
      color: "#e2e2e2",
    });

    const b = new Mesh(brickGeometry, brickMaterial);

    const brickMovableGeometry: BoxBufferGeometry = new BoxGeometry(50, 50, 50);

    const brickMovableMaterial: MeshLambertMaterial = new MeshLambertMaterial({
      color: "#964B00",
    });

    const movableBox = new Mesh(brickMovableGeometry, brickMovableMaterial);

    var geometry = new EdgesGeometry(b.geometry); // or WireframeGeometry
    var material = new LineBasicMaterial({ color: 0x000000, linewidth: 1 });
    var edges = new LineSegments(geometry, material);
    b.add(edges);

    const map = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    this.map = map;

    // const startX = -50 * (20 / 2);
    // const startY = -50 * (20 / 2);
    for (let x = 0; x < 20; x++) {
      for (let y = 0; y < 20; y++) {
        const b2 = b.clone();
        b2.position.x = x * 50;
        b2.position.z = y * 50;
        b2.position.y = -50;
        //b2.castShadow = true;
        b2.receiveShadow = true;
        this.world.add(b2);
      }
    }

    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        const value = map[y][x];
        if (value === 1) {
          const b2 = b.clone();
          b2.position.x = x * 50;
          b2.position.z = y * 50;
          b2.position.y = 0;
          //b2.castShadow = true;
          b2.receiveShadow = true;
          this.world.add(b2);
        } else if (value === 2) {
          const b2 = movableBox.clone();
          b2.position.x = x * 50;
          b2.position.z = y * 50;
          b2.position.y = 0;
          //b2.castShadow = true;
          b2.receiveShadow = true;
          this.brickMap.set(x + "_" + y, b2);
          this.world.add(b2);
        } else if (value === 3) {
          this.cube = new Cube();
          this.cube.checkMove = (x: number, z: number, type: string) => {
            return this.checkMove(x, z, type);
          };
          const cubeObject = this.cube.init();
          cubeObject.castShadow = true;
          this.world.add(cubeObject);
          this.cube.positionX = x * 50;
          this.cube.positionZ = y * 50;
          cubeObject.position.x = x * 50;
          cubeObject.position.z = y * 50;
          cubeObject.position.y = 0;
        }
      }
    }

    this.scene.add(this.world);

    this.world.position.x = -(map[0].length / 2) * 50;
    this.world.position.z = -(map.length / 2) * 50;

    const axesHelper = new AxesHelper(100);
    this.scene.add(axesHelper);

    const controls = new OrbitControls(this.camera, this.canvas);
    //controls.enableDamping = true;

    this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.setSize(this.width, this.height);
    this.render();

    var raycaster = new Raycaster();

    this.renderer.domElement.addEventListener("pointerdown", (e) => {
      const mouse = new Vector2();
      mouse.x = (e.clientX / this.width) * 2 - 1;
      mouse.y = -(e.clientY / this.height) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);

      // calculate objects intersecting the picking ray
      var intersects = raycaster.intersectObjects(this.world.children);
      console.log("Intersects ", intersects);
      if (intersects.length > 0) {
        console.log(intersects);

        const target = intersects[0].object;
        if (this.keyMap.has("a")) {
          const mesh = target.clone();
          mesh.position.y = target.position.y + 50;
          this.world.add(mesh);
        } else if (this.keyMap.has("d")) {
          this.world.remove(target);
        }
      }
    });
  }

  checkMove(x: number, z: number, moveType: string) {
    const val = this.map[z][x];

    console.log("val", x, z, val);
    if (val === 2) {
      const brick = this.brickMap.get(x + "_" + z);
      if (brick) {
        if (moveType === "up") {
          //brick.position.z = brick.position.z - 50;
          animate({
            from: brick.position.z,
            to: brick.position.z - 50,
            onUpdate: (value) => {
              brick.position.z = value;
            },
          });
          this.map[z - 1][x] = 2;
          this.brickMap.set(x + "_" + (z - 1), brick);
        } else if (moveType === "down") {
          // brick.position.z = brick.position.z + 50;
          animate({
            from: brick.position.z,
            to: brick.position.z + 50,
            onUpdate: (value) => {
              brick.position.z = value;
            },
          });
          this.map[z + 1][x] = 2;
          this.brickMap.set(x + "_" + (z + 1), brick);
        } else if (moveType === "left") {
          //brick.position.x = brick.position.x - 50;
          animate({
            from: brick.position.x,
            to: brick.position.x - 50,
            onUpdate: (value) => {
              brick.position.x = value;
            },
          });
          this.map[z][x - 1] = 2;
          this.brickMap.set(x - 1 + "_" + z, brick);
        } else if (moveType === "right") {
          this.map[z][x + 1] = 2;
          this.brickMap.set(x + 1 + "_" + z, brick);

          animate({
            from: brick.position.x,
            to: brick.position.x + 50,
            onUpdate: (value) => {
              brick.position.x = value;
            },
          });

          // brick.position.x = brick.position.x + 50;
        }
        this.brickMap.delete(x + "_" + z);

        this.map[z][x] = 0;
      }
    }
    return val === 0 || val === 3 || val === 2;
  }

  rot = 0;

  render() {
    this.cube.update();
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(() => {
      this.render();
    });
  }
}
