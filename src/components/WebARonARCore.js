import React from 'react';
import  {  ARPerspectiveCamera  }  from  'three.ar.js';
import  renderer  from  './Managers/Renderer';
import entityManager from './Managers/EntityManager';
import  VRControls  from  './Utils/VRControls';
import  *  as  THREE  from  'three';

class WebARonARCore extends React.Component {
	componentDidMount() {
		this.start();
	}

	buildCamera = () => {
		const  camera  =  new  ARPerspectiveCamera(
			renderer.vrDisplay,
			60,
			window.innerWidth / window.innerHeight,
			renderer.vrDisplay.depthNear,
			renderer.vrDisplay.depthFar
			);
			this.mainCamera  =  camera;
			this.vrControls  =  new  VRControls(camera);
	}

	setupScene = () => {
		this.scene  =  new  THREE.Scene();
		const  geometry  =  new  THREE.TorusGeometry(0.4,  0.1,  20,  30);
		const  material  =  new  THREE.MeshPhongMaterial({ color:  0xff5643  });
		this.torus  =  new  THREE.Mesh(geometry,  material);
		const  light  =  new  THREE.PointLight(0xff0000,  1,  100);
		light.position.set(5, 5, 5);
		this.torus.position.copy(new  THREE.Vector3(0,0,-1.5));
		this.scene.add(this.torus);
		this.scene.add(light);
		this.scene.add(this.mainCamera);
	}

	start = () => {
		renderer.initRenderer().then((success)  =>  {
			if (success) {
			this.buildCamera();
			this.setupScene();
			this.startUpdate();
			}
		});
	}
	
	startUpdate = () =>  {
		const  currentInstance  =  this;
		this.update = () =>{
			currentInstance.mainCamera.updateProjectionMatrix();
			currentInstance.vrControls.update();
			renderer.update(currentInstance.scene,  entityManager.mainCamera,  currentInstance.update);
		};
		this.update();
	}

	render() {
		return (
			<div ref={ref => (this.mount = ref)} />
		);
	}
}

export default WebARonARCore;
