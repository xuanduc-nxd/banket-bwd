(function () {
  const container = document.getElementById("canvas3d-wrapper");
  if (!container) return;

  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xd6e8ee); // Canvas color variable #D6E8EE

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(5.5, 4.5, 5.5);
  camera.lookAt(0, 0, 0);

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight1.position.set(5, 10, 7);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x97cadb, 0.4);
  dirLight2.position.set(-5, -5, -5);
  scene.add(dirLight2);

  // Pivot group for overall rotation & dragging
  const pivotGroup = new THREE.Group();
  scene.add(pivotGroup);

  // Create three group layers for separate spinning
  const layers = {
    "-1": new THREE.Group(),
    "0": new THREE.Group(),
    "1": new THREE.Group()
  };
  pivotGroup.add(layers["-1"]);
  pivotGroup.add(layers["0"]);
  pivotGroup.add(layers["1"]);

  // Colors for each layer representing safe, fit, and reach
  const layerColors = {
    "-1": 0x97cadb, // Safe: soft light blue
    "0": 0x018abe,  // Fit: vibrant ocean blue
    "1": 0xffdd53   // Reach: yellow highlight / dream
  };

  const cubes = [];

  // Construct Rubik's College Cube (3x3x3 grid)
  const size = 0.85;
  const gap = 1.05;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        // Skip central cube for performance & cleaner geometry
        if (x === 0 && y === 0 && z === 0) continue;

        // Geometry
        const geometry = new THREE.BoxGeometry(size, size, size);

        // Material
        const material = new THREE.MeshLambertMaterial({
          color: layerColors[y.toString()],
          roughness: 0.4
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x * gap, y * gap, z * gap);

        // Black wireframe edges (Neo-Brutalist look)
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 })
        );
        mesh.add(line);

        // Save original position & scale info for animation
        mesh.userData = {
          gridY: y.toString(),
          originalScale: new THREE.Vector3(1, 1, 1),
          originalColor: layerColors[y.toString()]
        };

        // Add cube to respective layer group
        layers[y.toString()].add(mesh);
        cubes.push(mesh);
      }
    }
  }

  // Interactive mouse dragging to rotate overall pivot
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  container.addEventListener("mousemove", (e) => {
    // 1. Raycaster for hover highlight
    const rect = renderer.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Recursively check meshes in layer groups
    const intersects = raycaster.intersectObjects(pivotGroup.children, true);

    // Reset all cubes scale & color
    cubes.forEach((cube) => {
      cube.scale.lerp(cube.userData.originalScale, 0.15);
      cube.material.emissive.setHex(0x000000);
    });

    if (intersects.length > 0) {
      // Find the parent mesh if line is intersected
      let targetMesh = intersects[0].object;
      if (targetMesh.type === "Mesh") {
        targetMesh.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.2);
        targetMesh.material.emissive.setHex(0x222222);
      }
    }

    // 2. Drag to rotate pivot group
    if (isDragging) {
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      const q = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          (deltaMove.y * 0.007),
          (deltaMove.x * 0.007),
          0,
          "XYZ"
        )
      );
      pivotGroup.quaternion.multiplyQuaternions(q, pivotGroup.quaternion);
    }

    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Touch support for mobile devices
  container.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  });

  container.addEventListener("touchmove", (e) => {
    if (isDragging && e.touches.length === 1) {
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y
      };

      const q = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          (deltaMove.y * 0.008),
          (deltaMove.x * 0.008),
          0,
          "XYZ"
        )
      );
      pivotGroup.quaternion.multiplyQuaternions(q, pivotGroup.quaternion);

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  });

  container.addEventListener("touchend", () => {
    isDragging = false;
  });

  // Window resize handler
  window.addEventListener("resize", () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // Play click audio if available when clicking canvas
  container.addEventListener("click", () => {
    if (window.UniMatch && typeof window.playAudioTone === "function") {
      window.playAudioTone("click");
    } else if (typeof playAudioTone === "function") {
      playAudioTone("click");
    }
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Auto rotate pivot slowly when not dragging
    if (!isDragging) {
      pivotGroup.rotation.y += 0.002;
      pivotGroup.rotation.x += 0.001;
    }

    // Separate spinning speeds for layers
    layers["-1"].rotation.y += 0.003; // bottom layer
    layers["0"].rotation.y -= 0.004;  // middle layer
    layers["1"].rotation.y += 0.006;  // top layer

    renderer.render(scene, camera);
  }

  animate();
})();
