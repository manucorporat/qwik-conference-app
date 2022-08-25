/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

export function ThreeJSReact() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
}

function Box(props: any) {
  const ref = useRef<any>();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame(() => (ref.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export const ThreeJS = /*#__PURE__*/ qwikify$(ThreeJSReact);
