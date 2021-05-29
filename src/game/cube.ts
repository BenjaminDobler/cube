import { animate } from "popmotion";
import {
  BoxBufferGeometry,
  BoxGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Mesh,
  MeshLambertMaterial,
  Object3D,
  Vector3,
} from "three";

export class Cube {
  targetRotation = 0;
  rotation = 0;

  pivot = new Object3D();
  wrapper = new Object3D();
  box: Mesh;

  positionX = 0;
  positionZ = 0;

  animating = false;

  speed = 400;


  constructor() {}

  init() {
    const brickGeometry: BoxBufferGeometry = new BoxGeometry(50, 50, 50);

    const brickMaterial: MeshLambertMaterial = new MeshLambertMaterial({
      color: "#ff0000",
    });

    this.box = new Mesh(brickGeometry, brickMaterial);

    var geometry = new EdgesGeometry(this.box.geometry); // or WireframeGeometry
    var material = new LineBasicMaterial({ color: 0xffff00, linewidth: 5 });
    var edges = new LineSegments(geometry, material);
    this.box.add(edges);

    this.wrapper.add(this.box);

    document.addEventListener('keydown', (e: KeyboardEvent)=>{
        if (this.animating) {
            return;
        }
        if(e.key === 'ArrowUp') {
            this.moveUp();
        } else if(e.key === 'ArrowDown') {
            this.moveDown();
        } else if(e.key === 'ArrowLeft') {
            this.moveLeft();
        } else if(e.key === 'ArrowRight') {
            this.moveRight();
        }
    })

    return this.wrapper;
  }

  moveLeft() {
      this.animating = true;
    this.targetRotation = 90;
    if (this.pivot) {
      this.wrapper.remove(this.pivot);
    }
    this.wrapper.remove(this.box);
    this.pivot = new Object3D();
    this.pivot.position.x = -25;
    this.pivot.position.y = -25;
    this.box.position.y = 25;
    this.box.position.x = 25;
    this.pivot.add(this.box);
    this.wrapper.add(this.pivot);

    animate({
      from: 0,
      to: 90,
      duration: this.speed,
      onUpdate: (value) => {
        this.rotation = value;
        this.pivot.setRotationFromAxisAngle(
          new Vector3(0, 0, 1),
          MathUtils.degToRad(value)
        );
      },
      onComplete: () => {
        console.log("done");
        this.pivot.remove(this.box);
        this.wrapper.add(this.box);
        this.box.position.y = 0;
        this.box.position.x = 0;
        this.box.setRotationFromAxisAngle(
          new Vector3(0, 0, 1),
          MathUtils.degToRad(this.rotation)
        );
        this.positionX = this.positionX - 50;
        this.wrapper.position.x = this.positionX;
        this.wrapper.remove(this.pivot);
        this.animating = false;

      },
    });
  }


  moveUp() {
    this.animating = true;

    if (this.pivot) {
      this.wrapper.remove(this.pivot);
    }
    this.wrapper.remove(this.box);
    this.pivot = new Object3D();
    this.pivot.position.z = -25;
    this.pivot.position.y = -25;
    this.box.position.y = 25;
    this.box.position.z = 25;
    this.pivot.add(this.box);
    this.wrapper.add(this.pivot);

    animate({
      from: 0,
      to: -90,
      duration: this.speed,
      onUpdate: (value) => {
        this.rotation = value;
        this.pivot.setRotationFromAxisAngle(
          new Vector3(1, 0, 0),
          MathUtils.degToRad(value)
        );
      },
      onComplete: () => {
        console.log("done");
        this.pivot.remove(this.box);
        this.wrapper.add(this.box);
        this.box.position.y = 0;
        this.box.position.x = 0;
        this.box.position.z = 0;
        this.box.setRotationFromAxisAngle(
          new Vector3(0, 0, 1),
          MathUtils.degToRad(this.rotation)
        );
        this.positionZ = this.positionZ - 50;
        this.wrapper.position.x = this.positionX;
        this.wrapper.position.z = this.positionZ;
        this.wrapper.remove(this.pivot);
        this.animating = false;

      },
    });
  }


  moveDown() {
    this.animating = true;

    if (this.pivot) {
      this.wrapper.remove(this.pivot);
    }
    this.wrapper.remove(this.box);
    this.pivot = new Object3D();
    this.pivot.position.z = 25;
    this.pivot.position.y = -25;
    this.box.position.y = 25;
    this.box.position.z = -25;
    this.pivot.add(this.box);
    this.wrapper.add(this.pivot);

    animate({
      from: 0,
      to: 90,
      duration: this.speed,
      onUpdate: (value) => {
        this.rotation = value;
        this.pivot.setRotationFromAxisAngle(
          new Vector3(1, 0, 0),
          MathUtils.degToRad(value)
        );
      },
      onComplete: () => {
        console.log("done");
        this.pivot.remove(this.box);
        this.wrapper.add(this.box);
        this.box.position.y = 0;
        this.box.position.x = 0;
        this.box.position.z = 0;
        this.box.setRotationFromAxisAngle(
          new Vector3(0, 0, 1),
          MathUtils.degToRad(this.rotation)
        );
        this.positionZ = this.positionZ + 50;
        this.wrapper.position.x = this.positionX;
        this.wrapper.position.z = this.positionZ;
        this.wrapper.remove(this.pivot);
        this.animating = false;

      },
    });
  }



  moveRight() {
    this.animating = true;

    if (this.pivot) {
      this.wrapper.remove(this.pivot);
    }
    this.wrapper.remove(this.box);
    this.pivot = new Object3D();
    this.pivot.position.x = 25;
    this.pivot.position.y = -25;
    this.box.position.y = 25;
    this.box.position.x = -25;
    this.pivot.add(this.box);
    this.wrapper.add(this.pivot);

    animate({
      from: 0,
      to: -90,
      duration: this.speed,
      onUpdate: (value) => {
        this.rotation = value;
        this.pivot.setRotationFromAxisAngle(
          new Vector3(0, 0, 1),
          MathUtils.degToRad(value)
        );
      },
      onComplete: () => {
        console.log("done");
        this.pivot.remove(this.box);
        this.wrapper.add(this.box);
        this.box.position.y = 0;
        this.box.position.x = 0;
        this.box.position.z = 0;
        this.box.setRotationFromAxisAngle(
          new Vector3(0, 0, 1),
          MathUtils.degToRad(this.rotation)
        );
        this.positionX = this.positionX + 50;
        this.wrapper.position.x = this.positionX;
        this.wrapper.remove(this.pivot);
        this.animating = false;

      },
    });
  }

  update() {
    // this.group.setRotationFromAxisAngle(
    //   new Vector3(0, 0, 1),
    //   MathUtils.degToRad(this.rotation)
    // );
  }
}
