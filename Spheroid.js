var rangeIDs = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11", "r12", "r13"];
var s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
var sliders = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13];
var red = 128, green = 128, blue = 128;
var roll = 0, pitch = 0, yaw = 0, rX = pitch, rY = yaw, rZ = roll;
var radius = 15, widthSegments = 15, heightSegments = 15;
var phiStart = 0, phiLength = Math.PI*2; 
var thetaStart = 0, thetaLength = Math.PI;
var geometry, material, sphere;
for(var i = 0; i < sliders.length; i++) {
    sliders[i] = document.getElementById(rangeIDs[i]);
}
sliders[0].oninput = function() {
    red = (this.value);
}
sliders[1].oninput = function() {
    green = (this.value);
}
sliders[2].oninput = function() {
    blue = (this.value);
}
sliders[3].oninput = function() {
    roll = (this.value);
}
sliders[4].oninput = function() {
    pitch = (this.value);
}
sliders[5].oninput = function() {
    yaw = (this.value);
}
sliders[6].oninput = function() {
    radius = (this.value);
}
sliders[7].oninput = function() {
    widthSegments = (this.value);
}
sliders[8].oninput = function() {
    heightSegments = (this.value);
}
sliders[9].oninput = function() {
    phiStart = (this.value);
}
sliders[10].oninput = function() {
    phiLength = (this.value*Math.PI);
}
sliders[11].oninput = function() {
    thetaStart = (this.value);
}
sliders[12].oninput = function() {
    thetaLength = (this.value*Math.PI);
}
var example = (function() {
    "use strict";
    var scene = new THREE.Scene(),
        light = new THREE.PointLight(0xffffff),
        camera,
        renderer = new THREE.WebGLRenderer(),
        mesh;
    function initScene() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);
        scene.add(light);
        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 80;
        scene.add(camera);
        geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
        material = new THREE.MeshBasicMaterial({color: deriveColor(), wireframe: true});
        sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        animate();
    };
    function animate() {
        rY += yaw/100;
        rZ += roll/100;
        rX += pitch/100;
        requestAnimationFrame(animate);
        render();
        
    };
    function deriveColor() {
        return new THREE.Color("rgb("+red+","+green+","+blue+")");
    }
    function render() {
        scene.children[2] = new THREE.Mesh(
            new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength),
            new THREE.MeshBasicMaterial({color: deriveColor(), wireframe: true})
        );
        scene.children[2].rotation.x = rX;
        scene.children[2].rotation.y = rY;
        scene.children[2].rotation.z = rZ;
        renderer.render(scene, camera);
    };
    window.onload = initScene;
    return {
        scene: scene,
        mesh: mesh
    }
})();