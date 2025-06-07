 document.addEventListener("DOMContentLoaded", () => {
      const sections = document.querySelectorAll("section");
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.1 }
      );

      sections.forEach(section => {
        observer.observe(section);
      });
    });

    // GSAP animation for hero heading
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero h2", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Three.js Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#bg"),
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00d9ff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Animate
    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });