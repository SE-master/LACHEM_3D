
document.addEventListener('DOMContentLoaded', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
    document.getElementById('viewer').appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0x404040, 2);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1).normalize();
    scene.add(directionalLight);

    const objLoader = new THREE.OBJLoader();
    const fileInput = document.getElementById('file-input');

    let model;
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.name.endsWith('.obj')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const contents = e.target.result;
                const object = objLoader.parse(contents);
                if (model) scene.remove(model);
                model = object;
                scene.add(model);
                model.position.set(0, 0, 0);
                model.scale.set(1, 1, 1);
                camera.position.z = 5;
            };
            reader.readAsText(file);
        }
    });

    function animate() {
        requestAnimationFrame(animate);
        if (model) model.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight * 0.8;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
});
