"use client";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import styles from "./page.module.css";

const PAGE_URLS = Array.from({ length: 16 }, (_, i) => `/rulebook/p${i}.webp`);
const ASPECT = 3543 / 2835; // 单页 宽/高 ≈ 1.25
const PGW = 1.5; // 单页宽（世界单位）
const PGH = PGW / ASPECT; // 单页高
const FLIP = Math.PI;
const SEG = 20;

// 叶片 = 一张纸：recto 正面（右页，单号）+ verso 背面（左页，双号）
// 图片：0=正封面(右半,首)，15=封底(左半,尾)，1=第1页(右)，2=第2页(左)…
const LEAVES: { recto: number; verso: number }[] = [
  { recto: 0, verso: -1 }, // 封面：正面=正封面，背面=内封（空白）
  { recto: 1, verso: 2 },
  { recto: 3, verso: 4 },
  { recto: 5, verso: 6 },
  { recto: 7, verso: 8 },
  { recto: 9, verso: 10 },
  { recto: 11, verso: 12 },
  { recto: 13, verso: 14 },
  { recto: -1, verso: 15 }, // 封底：正面=内封（空白），背面=封底
];

function Leaf({
  leafIndex,
  turned,
  rectoTex,
  versoTex,
}: {
  leafIndex: number;
  turned: number;
  rectoTex?: THREE.Texture;
  versoTex?: THREE.Texture;
}) {
  const group = useRef<THREE.Group>(null);

  // 背面纹理镜像修正
  const backMap = useMemo(() => {
    if (!versoTex) return undefined;
    const t = versoTex.clone();
    t.center.set(0.5, 0.5);
    t.repeat.x = -1;
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, [versoTex]);

  // 几何体：左边缘=书脊(x=0)，向右延伸到 PGW
  const { rectoGeo, versoGeo, basePos } = useMemo(() => {
    const g = new THREE.PlaneGeometry(PGW, PGH, SEG, 1);
    g.translate(PGW / 2, 0, 0);
    const g2 = g.clone();
    return {
      rectoGeo: g,
      versoGeo: g2,
      basePos: (g.attributes.position.array as Float32Array).slice(),
    };
  }, []);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const isTurned = leafIndex < turned;
    const target = isTurned ? -FLIP : 0;
    g.rotation.y += (target - g.rotation.y) * 0.14;

    // 卷曲：翻转中途拱起
    const p = Math.min(Math.abs(g.rotation.y) / FLIP, 1);
    const bend = Math.sin(p * Math.PI);
    for (const geo of [rectoGeo, versoGeo]) {
      const pos = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length; i += 3) {
        const x = basePos[i];
        pos[i + 2] = bend * 0.22 * Math.sin((x / PGW) * Math.PI);
      }
      geo.attributes.position.needsUpdate = true;
      geo.computeVertexNormals();
    }

    // 层序：当前跨页的左右两页在最上，其余向对应方向叠放
    const depth = isTurned ? turned - 1 - leafIndex : leafIndex - turned;
    g.position.z = -0.0016 * depth;
  });

  return (
    <group ref={group}>
      {/* 正面：右页（空白不渲染） */}
      {rectoTex && (
        <mesh geometry={rectoGeo}>
          <meshBasicMaterial map={rectoTex} side={THREE.FrontSide} toneMapped={false} />
        </mesh>
      )}
      {/* 背面：左页（空白不渲染） */}
      {backMap && (
        <mesh geometry={versoGeo}>
          <meshBasicMaterial map={backMap} side={THREE.BackSide} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

function Book({ turned }: { turned: number }) {
  const grp = useRef<THREE.Group>(null);
  const textures = useLoader(THREE.TextureLoader, PAGE_URLS);
  useMemo(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
    });
  }, [textures]);

  // 居中逻辑：单页（封面/首页/尾页/封底）居中；跨页时书脊居中
  useFrame(() => {
    if (!grp.current) return;
    const leftPage = turned > 0 ? LEAVES[turned - 1].verso : -1;
    const rightPage = turned < LEAVES.length ? LEAVES[turned].recto : -1;
    const leftHas = leftPage >= 0;
    const rightHas = rightPage >= 0;
    let targetX = 0;
    if (rightHas && !leftHas)
      targetX = -PGW / 2; // 仅右页有内容 → 右页居中
    else if (leftHas && !rightHas) targetX = PGW / 2; // 仅左页有内容 → 左页居中
    grp.current.position.x += (targetX - grp.current.position.x) * 0.14;
  });

  return (
    <group ref={grp}>
      {LEAVES.map((leaf, i) => (
        <Leaf
          key={i}
          leafIndex={i}
          turned={turned}
          rectoTex={leaf.recto >= 0 ? textures[leaf.recto] : undefined}
          versoTex={leaf.verso >= 0 ? textures[leaf.verso] : undefined}
        />
      ))}
      <ContactShadows
        position={[0, -PGH / 2 - 0.04, 0]}
        opacity={0.4}
        scale={PGW * 4}
        blur={2.5}
        far={2}
      />
    </group>
  );
}

export default function Book3D() {
  // turned = 已翻到左边的叶片数；0 = 合上（显示封面）
  const [turned, setTurned] = useState(0);
  const next = () => setTurned((t) => Math.min(t + 1, LEAVES.length));
  const prev = () => setTurned((t) => Math.max(t - 1, 0));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // 页码标签
  let label = "封面";
  if (turned >= LEAVES.length) {
    label = "封底";
  } else if (turned > 0) {
    const leftPage = LEAVES[turned - 1].verso;
    const rightPage = LEAVES[turned].recto;
    const nums = [leftPage, rightPage].filter((n) => n >= 1 && n <= 14);
    label = nums.length ? `第 ${nums.join("–")} 页` : "封面";
  }

  return (
    <div className={styles.stage}>
      <a className={styles.back} href="/huashuo">
        ← 返回玩家专区
      </a>

      <Canvas camera={{ position: [0, 0, 2.5], fov: 42 }} gl={{ antialias: true }}>
        <color attach="background" args={["#14110d"]} />
        <Suspense fallback={null}>
          <Book turned={turned} />
        </Suspense>
      </Canvas>

      <button className={styles.zoneLeft} onClick={prev} aria-label="上一页" />
      <button className={styles.zoneRight} onClick={next} aria-label="下一页" />

      <button
        className={`${styles.navBtn} ${styles.navPrev}`}
        onClick={prev}
        disabled={turned === 0}
      >
        ‹
      </button>
      <button
        className={`${styles.navBtn} ${styles.navNext}`}
        onClick={next}
        disabled={turned >= LEAVES.length}
      >
        ›
      </button>

      <div className={styles.counter}>{label}</div>
    </div>
  );
}
