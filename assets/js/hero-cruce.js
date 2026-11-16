const CONTUR_CRUCE = [
  [-0.9928,0.1843], [-1.0363,0.2577], [-1.0492,0.2669], [-1.1023,0.2785], [-1.1516,0.3002], [-1.1795,0.3199],
  [-1.2104,0.3509], [-1.2393,0.3964], [-1.2543,0.4379], [-1.2607,0.4814], [-1.2587,0.5263], [-1.2481,0.5681],
  [-1.2349,0.5984], [-1.1951,0.6521], [-1.1618,0.6793], [-1.1322,0.6960], [-1.0424,0.7232], [-1.0312,0.7347],
  [-1.0112,0.7755], [-0.9857,0.8099], [-0.9608,0.8333], [-0.9251,0.8571], [-0.8741,0.8772], [-0.8194,0.8840],
  [-0.7650,0.8775], [-0.7225,0.8622], [-0.6851,0.8395], [-0.6525,0.8099], [-0.6215,0.7657], [-0.5977,0.7072],
  [-0.5862,0.6956], [-0.5712,0.6892], [-0.2360,0.6885], [-0.2166,0.6933], [-0.2020,0.7065], [-0.1952,0.7293],
  [-0.1969,1.0142], [-0.2139,1.0367], [-0.2625,1.0554], [-0.3002,1.0781], [-0.3322,1.1070], [-0.3529,1.1339],
  [-0.3737,1.1727], [-0.3862,1.2138], [-0.3907,1.2577], [-0.3862,1.3012], [-0.3689,1.3546], [-0.3329,1.4083],
  [-0.2995,1.4385], [-0.2414,1.4702], [-0.2298,1.4814], [-0.2067,1.5620], [-0.1863,1.5997], [-0.1656,1.6266],
  [-0.1336,1.6555], [-0.1051,1.6738], [-0.0643,1.6905], [-0.0221,1.6990], [0.0228,1.6990], [0.0755,1.6871],
  [0.1153,1.6684], [0.1513,1.6415], [0.1809,1.6089], [0.2030,1.5722], [0.2305,1.4814], [0.2421,1.4702],
  [0.3002,1.4385], [0.3329,1.4090], [0.3652,1.3634], [0.3849,1.3121], [0.3910,1.2685], [0.3890,1.2247],
  [0.3781,1.1818], [0.3590,1.1421], [0.3335,1.1077], [0.3091,1.0843], [0.2723,1.0598], [0.2145,1.0367],
  [0.1975,1.0142], [0.1958,0.7293], [0.1989,0.7137], [0.2077,0.7004], [0.2210,0.6916], [0.2366,0.6885],
  [0.5760,0.6902], [0.5984,0.7072], [0.6171,0.7562], [0.6399,0.7936], [0.6688,0.8255], [0.6956,0.8466],
  [0.7344,0.8670], [0.7766,0.8799], [0.8194,0.8840], [0.8629,0.8799], [0.9163,0.8622], [0.9700,0.8262],
  [1.0003,0.7929], [1.0322,0.7347], [1.0431,0.7232], [1.1237,0.7001], [1.1618,0.6800], [1.1883,0.6589],
  [1.2172,0.6270], [1.2356,0.5984], [1.2522,0.5576], [1.2607,0.5154], [1.2607,0.4716], [1.2519,0.4274],
  [1.2301,0.3781], [1.2033,0.3420], [1.1713,0.3131], [1.1339,0.2904], [1.0431,0.2628], [1.0322,0.2513],
  [1.0003,0.1931], [0.9707,0.1605], [0.9251,0.1282], [0.8738,0.1085], [0.8303,0.1023], [0.7864,0.1044],
  [0.7436,0.1153], [0.7041,0.1343], [0.6695,0.1598], [0.6460,0.1843], [0.6215,0.2210], [0.5984,0.2788],
  [0.5868,0.2904], [0.5722,0.2968], [0.2326,0.2972], [0.2139,0.2907], [0.2006,0.2761], [0.1958,0.2567],
  [0.1962,-1.0064], [0.2009,-1.0217], [0.2115,-1.0343], [0.2914,-1.0710], [0.3179,-1.0921], [0.3475,-1.1247],
  [0.3696,-1.1614], [0.3818,-1.1934], [0.3903,-1.2356], [0.3903,-1.2794], [0.3784,-1.3331], [0.3539,-1.3821],
  [0.3091,-1.4317], [0.2819,-1.4508], [0.2421,-1.4702], [0.2305,-1.4814], [0.2074,-1.5620], [0.1924,-1.5915],
  [0.1669,-1.6259], [0.1425,-1.6493], [0.1057,-1.6738], [0.0649,-1.6905], [0.0228,-1.6990], [-0.0221,-1.6990],
  [-0.0748,-1.6871], [-0.1238,-1.6626], [-0.1588,-1.6340], [-0.1860,-1.6007], [-0.2026,-1.5711], [-0.2298,-1.4814],
  [-0.2414,-1.4702], [-0.2812,-1.4508], [-0.3080,-1.4317], [-0.3529,-1.3821], [-0.3774,-1.3342], [-0.3896,-1.2804],
  [-0.3896,-1.2366], [-0.3839,-1.2029], [-0.3692,-1.1625], [-0.3468,-1.1247], [-0.3172,-1.0921], [-0.2904,-1.0710],
  [-0.2105,-1.0343], [-0.2003,-1.0217], [-0.1955,-1.0064], [-0.1952,0.2567], [-0.1999,0.2761], [-0.2132,0.2907],
  [-0.2319,0.2972], [-0.5753,0.2958], [-0.5977,0.2788], [-0.6270,0.2105], [-0.6525,0.1761], [-0.6763,0.1533],
  [-0.7041,0.1336], [-0.7429,0.1153], [-0.8085,0.1023], [-0.8514,0.1044], [-0.8837,0.1115], [-0.9432,0.1394],
];

(async () => {
  const container = document.querySelector('.hero__cruce');
  if (!container) return;

  const test = document.createElement('canvas');
  if (!(test.getContext('webgl2') || test.getContext('webgl'))) return;

  let THREE, RoomEnvironment;
  try {
    THREE = await import('three');
    ({ RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js'));
  } catch (eroare) {
    console.warn('Three.js nu s-a putut încărca; rămâne crucea statică.', eroare);
    return;
  }

  const miscareRedusa = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scena = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(30, 3 / 4, 0.1, 100);
  camera.position.set(0, 0, 8);

  const contur = new THREE.Shape(CONTUR_CRUCE.map(([x, y]) => new THREE.Vector2(x, y)));
  const geometrie = new THREE.ExtrudeGeometry(contur, {
    depth: 0.26,
    bevelEnabled: true,
    bevelThickness: 0.07,
    bevelSize: 0.05,
    bevelSegments: 5,
  });
  geometrie.center();

  const aur = new THREE.MeshStandardMaterial({
    color: 0xc9a24a,
    metalness: 1,
    roughness: 0.34,
  });
  const cruce = new THREE.Mesh(geometrie, aur);
  scena.add(cruce);

  const lumina = new THREE.DirectionalLight(0xfff1d6, 1.4);
  lumina.position.set(2, 3, 4);
  scena.add(lumina);

  container.appendChild(renderer.domElement);
  container.classList.add('hero__cruce--3d');

  const redimensioneaza = () => {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (miscareRedusa) renderer.render(scena, camera);
  };
  new ResizeObserver(redimensioneaza).observe(container);
  redimensioneaza();

  if (miscareRedusa) {
    renderer.render(scena, camera);
    return;
  }

  const tinta = { x: 0, y: 0 };
  window.addEventListener('pointermove', (e) => {
    tinta.x = (e.clientY / window.innerHeight - 0.5) * 0.2;
    tinta.y = (e.clientX / window.innerWidth - 0.5) * 0.45;
  }, { passive: true });

  let vizibil = true;
  new IntersectionObserver(([intrare]) => { vizibil = intrare.isIntersecting; })
    .observe(container);

  const ceas = new THREE.Clock();
  const anima = () => {
    requestAnimationFrame(anima);
    if (!vizibil || document.hidden) return;
    const t = ceas.getElapsedTime();
    const rotY = Math.sin(t * 0.3) * 0.35 + tinta.y;
    const rotX = tinta.x;
    cruce.rotation.y += (rotY - cruce.rotation.y) * 0.05;
    cruce.rotation.x += (rotX - cruce.rotation.x) * 0.05;
    renderer.render(scena, camera);
  };
  anima();
})();
