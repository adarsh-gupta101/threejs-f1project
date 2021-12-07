import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
gui.close()
// gui.hide()
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * loader cube
 */
// threejs cube 
const group = new THREE.Group()
scene.add(group)


const param={color:0x000000};
gui.addColor(param,'color').onChange(()=>{scene.background.set(param.color)})

scene.background = new THREE.Color(param.color)
group.position.y=-5.9
group.scale.z=1
group.scale.x=1
group.scale.y=1

gui.add(group.position, 'x', -10, 10).name( "pos x")
gui.add(group.position, 'y', -10, 10).name( "pos y")
gui.add(group.position, 'z', -10, 10).name( "pos z")
gui.add(group.scale, 'z', -10, 10).name('scale z')
gui.add(group.scale, 'x', -10, 10).name('scale x')
gui.add(group.scale, 'y', -10, 10).name('scale y')


var loader= new GLTFLoader();
var obj7;
loader.load("/loaders/block_7.gltf",function(gltf){
    obj7 = gltf.scene;
    obj7.scale.set(50,50,50);
    obj7.position.set(0,1.4,0);

    
    group.add(obj7);
})

var obj6;
loader.load("/loaders/block_6.gltf",function(gltf){
    obj6 = gltf.scene;
    obj6.scale.set(50,50,50);
    obj6.position.set(0,1.5,0);
   
    group.add(obj6);
})

var obj5;
loader.load("/loaders/block_5.gltf",function(gltf){
    obj5 = gltf.scene;
    obj5.scale.set(50,50,50);
    obj5.position.set(0,-3,0);
    
    group.add(obj5);
})



var obj3;
loader.load("/loaders/block_3.gltf",function(gltf){
    obj3 = gltf.scene;
    obj3.scale.set(50,50,50);
    obj3.position.set(0,-10.3,0);
  

    

    group.add(obj3);
})
var obj4;
loader.load("/loaders/block_4.gltf",function(gltf){
    obj4 = gltf.scene;
    obj4.scale.set(50,50,50);
    obj4.position.set(0,-7.4,0);
 


    group.add(obj4);

})
var obj2;
loader.load("/loaders/block_2.gltf",function(gltf){
    obj2 = gltf.scene;
    obj2.scale.set(50,50,50);
    obj2.position.set(0,-9,0);
    


    group.add(obj2);
})

var obj;
loader.load("/loaders/block_1.gltf",function(gltf){
    obj = gltf.scene;
    obj.scale.set(50,50,50);
    obj.position.set(0,-14.5,0);

    group.add(obj);
})



// scene.background = new THREE.Color(0xffffff)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


//light
const light = new THREE.HemisphereLight(0xffffff, 0xffffff,1.1)
scene.add(light)
gui.add(light.position, 'x', -10, 10).name('light x')
gui.add(light.position, 'y', -10, 10).name('light y')
gui.add(light.position, 'z', -10, 10).name('light z')
/**
 * Camera
 */
// const m=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:0xffffff}))
// scene.add(m)

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 20)
scene.add(camera)
gui.add( camera.position , 'z', -100, 100 ).step(1).name('camera z')
gui.add( camera.position , 'y', -100, 100 ).step(1).name('camera y')
gui.add( camera.position , 'x', -100, 100 ).step(1).name('camera x')


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = false

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()