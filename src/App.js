import React from 'react';
import  {  ARPerspectiveCamera  }  from  'three.ar.js';
import  renderer  from  './Managers/Renderer';
import entityManager from './Managers/EntityManager';
import  VRControls  from  './Utils/VRControls';
import  *  as  THREE  from  'three';

class App extends React.Component {
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
			<div />
		);
	}
}

export default App;
