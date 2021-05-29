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

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Cube } from "./cube";

export class Game {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;

  actorGroup: Group;

  width = 1200;
  height = 800;

  cube: Cube;

  action: AnimationAction;

  keyMap: Map<string,boolean> = new Map<string, boolean>();
  constructor(private canvas: HTMLCanvasElement) {
    this.setup();
  }

  setup() {


    document.addEventListener('keydown', (e)=>{
      this.keyMap.set(e.key, true);
    })

    document.addEventListener('keyup', (e)=>{
      this.keyMap.delete(e.key);
    })

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
    light.position.set(0, 100, 500);
    light.castShadow = false;
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

    var geometry = new EdgesGeometry(b.geometry); // or WireframeGeometry
    var material = new LineBasicMaterial({ color: 0x000000, linewidth: 1 });
    var edges = new LineSegments(geometry, material);
    b.add(edges);

    const startX = -50 * (20 / 2);
    const startY = -50 * (20 / 2);
    for (let x = 0; x < 20; x++) {
      for (let y = 0; y < 20; y++) {
        const b2 = b.clone();
        b2.position.x = startX + x * 50;
        b2.position.z = startY + y * 50;
        b2.position.y = -50;
        b2.castShadow = true;
        b2.receiveShadow = true;
        this.scene.add(b2);
      }
    }

    const actor = b.clone();
    const actorGroup = new Group();
    actorGroup.add(actor);
    // actor.position.x = 0;
    // actor.position.y = -25;
    // actor.position.z = 50;
    // actorGroup.position.z = 0;
    //actor.position.z = 25;
    actor.position.x = 25;
    actor.position.y = 25;

    const axesHelper = new AxesHelper(100);
    this.scene.add(axesHelper);

    // this.scene.add(actorGroup);

    this.actorGroup = actorGroup;

    this.cube = new Cube();
    const cubeObject = this.cube.init();
    cubeObject.castShadow = true;
    this.scene.add(cubeObject);

    // setTimeout(()=>{
    //   this.cube.moveDown();
    // }, 3000);

    // setTimeout(()=>{
    //   this.cube.moveUp();
    // }, 5500);

    // setTimeout(()=>{
    //   this.cube.moveDown();
    // }, 7500);

    const controls = new OrbitControls(this.camera, this.canvas);
    //controls.enableDamping = true;

    this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.setSize(this.width, this.height);
    this.render();

    var raycaster = new Raycaster();

    this.renderer.domElement.addEventListener('pointerdown', (e)=> {
      const mouse = new Vector2();
      mouse.x = (e.clientX / this.width) * 2 - 1;
      mouse.y = -(e.clientY / this.height) * 2 + 1;
      // mouse.x = e.clientX;
      // mouse.y = e.clientY;
      raycaster.setFromCamera(mouse, this.camera);

      // calculate objects intersecting the picking ray
      var intersects = raycaster.intersectObjects(this.scene.children);
      console.log('Intersects ', intersects);
      if (intersects.length > 0) {
        console.log(intersects);

        const target = intersects[0].object;
        if (this.keyMap.has('a')) {
        const mesh = target.clone();
        mesh.position.y = target.position.y + 50;
        this.scene.add(mesh);
        } else if(this.keyMap.has('d')) {
          this.scene.remove(target);
        }
      }
    
      // for (var i = 0; i < intersects.length; i++) {
    
      // const mesh = intersects[i].object as Mesh;
      // mesh.position.y = 50;
      
      //   console.log('intersects ', intersects[i]);
    
      // }
    
    })
  }

  rot = 0;

  render() {
    // this.rot += 0.01;
    // this.actorGroup.rotateZ(MathUtils.degToRad(1));
    // this.actorGroup.setRotationFromAxisAngle(new Vector3(0,0,1), MathUtils.degToRad(30));
    this.cube.update();
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(() => {
      this.render();
    });
  }
}
