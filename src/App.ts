import { BackSide, BoxGeometry, DirectionalLight, Font, FontLoader, Mesh, MeshBasicMaterial, MeshPhongMaterial, PCFSoftShadowMap, PerspectiveCamera, Scene, TextGeometry, TextureLoader, WebGLRenderer } from "three";

export class App {
    private camera: PerspectiveCamera;
    private scene: Scene;
    private mesh: Mesh;
    private renderer: WebGLRenderer;

    /**
     * Based off the three.js docs: https://threejs.org/examples/?q=cube#webgl_geometry_cube
     */
    constructor() {

        this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.z = 400;

        this.scene = new Scene();

        //this.mesh = new Mesh(geometry, material);
        //this.scene.add(this.mesh);

        this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setClearColor(0x000000, 0); // the default
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = PCFSoftShadowMap

        const light = new DirectionalLight(0xffffff, 1);
        light.position.set(0, 1, 0); //default; light shining from top
        light.castShadow = true; // default false
        this.scene.add(light);


        document.body.appendChild(this.renderer.domElement);

        window.addEventListener("resize", this.onWindowResize.bind(this), false);


        this.mesh = new Mesh();
        const loader = new FontLoader();
        loader.load('fonts/katakana.json', (font) => {

            console.log(font)

            const textGeometry = new TextGeometry('0123456789abcdefghijklmn', {
                font: font,
                size: 60,
                height: 5,
                curveSegments: 2,
                bevelEnabled: true,
                bevelThickness: 10,
                bevelSize: 1,
                bevelOffset: 0,
                bevelSegments: 1
            });

            var textMaterial = new MeshPhongMaterial(
                {
                    color: '#00FF00',
                    opacity: 0.8
                }
            );

            this.mesh.geometry = textGeometry
            this.mesh.material = textMaterial

            this.mesh.position.setX(-100)
            this.mesh.castShadow = true
            this.scene.add(this.mesh);
        })



        this.animate();
    }

    private onWindowResize(): void {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private animate(): void {
        requestAnimationFrame(this.animate.bind(this));

        this.mesh.position.x -= 1

        this.renderer.render(this.scene, this.camera);
    }
}

new App();