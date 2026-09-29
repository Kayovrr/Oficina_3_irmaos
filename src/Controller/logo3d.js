import * as THREE from 'https://esm.sh/three@0.180.0';
import { GLTFLoader } from 'https://esm.sh/three@0.180.0/examples/jsm/loaders/GLTFLoader.js';

console.log("logo3d.js iniciou")
const container = document.getElementById("logo3d");
console.log("conteiner",container);
const cena = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    10000
);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);


const luz = new THREE.AmbientLight(0xffffff, 3);

cena.add(luz);


const luzDirecional = new THREE.DirectionalLight(
    0xffffff,
    3
);

luzDirecional.position.set(3, 3, 5);

cena.add(luzDirecional);


const loader = new GLTFLoader();

let logo;

const caminhoLogo = new URL(
    "../../public/imgs/logo1.glb",
    import.meta.url
).href;

console.log("Caminho do GLB:", caminhoLogo);

loader.load(
    caminhoLogo,

    function(gltf) {

        console.log("Logo carregada!");

        logo = gltf.scene;

        cena.add(logo);


        const caixa = new THREE.Box3().setFromObject(logo);

        const centro = caixa.getCenter(
            new THREE.Vector3()
        );

        const tamanho = caixa.getSize(
            new THREE.Vector3()
        );


        logo.position.x -= centro.x;
        logo.position.y -= centro.y;
        logo.position.z -= centro.z;


        const maiorDimensao = Math.max(
            tamanho.x,
            tamanho.y,
            tamanho.z
        );


        const distancia =
            maiorDimensao /
            (2 * Math.tan(
                THREE.MathUtils.degToRad(camera.fov / 2)
            ));


        camera.position.set(
            0,
            0,
            distancia * 1.5
        );

        camera.lookAt(0, 0, 0);

        console.log("Modelo adicionado à cena")

    },

    function(xhr) {
        console.log(
          "Carregando:",
           (xhr.loaded / xhr.total * 100) + "%"
        );
    },

    undefined,

    function(error) {

        console.error(
            "Erro ao carregar GLB:",
            error
        );

    }
);


function animar() {

    requestAnimationFrame(animar);

    if (logo) {

        logo.rotation.y += 0.01;

    }

    renderer.render(
        cena,
        camera
    );
}


animar();


window.addEventListener("resize", () => {

    camera.aspect =
        container.clientWidth /
        container.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

});