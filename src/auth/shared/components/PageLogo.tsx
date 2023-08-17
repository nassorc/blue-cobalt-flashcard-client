import { useRef, useState } from 'react';
import authStyles from '../../auth.module.css'

// import * as THREE from 'three';

// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'
// import { useFrame } from 'react-three-fiber'
export default function PageLogo() {
    // const [model, setModel] = useState();
    // const modelRef = useRef();
    
    // const loader = new GLTFLoader()
    // loader.load('../assets/robotCollection/scene.gltf', (gltf) => {
    //     setModel(gltf.model)
    // })
    // useFrame(() => {
    //     if(modelRef.current) {
    //         modelRef.current.rotation.y += 0.01;
    //     }
    // })
    return (
        <div className={`${authStyles['center']} ${authStyles['logo']}`}>
            <h1 style={{color: 'rgb(38,38,38)'}}>Blue</h1>
        <div className={`${authStyles['center']} ${authStyles['logo']} ${authStyles['logo-clip']}`}>
            <h1>Cobalt</h1>
        </div>
        </div>
    )
}