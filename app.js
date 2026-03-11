/**
 * ============================================================
 *  AR MIND SCAN — app.js
 *  12 Image Targets | 3D Models | Audio Storytelling
 *  Semua URL aset (model 3D & audio) ada di bagian CONFIG.
 *  File ini bisa di-obfuscate & di-minify secara terpisah.
 * ============================================================
 */

/* ============================================================
   SECTION 1 — ASSET CONFIGURATION
   Ganti URL model dan audio sesuai hosting Anda.
   Format model: .glb / .gltf
   Format audio: .mp3 / .ogg / .webm
   ============================================================ */
var AR_CONFIG = {

  /* Path ke file .mind (MindAR image target) */
  mindFile: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/ordertargets.mind",

  /* 12 Target definitions */
  targets: [
    {
      id: 0,
      label: "TARGET 01",
      title: "Neuron Synaptik",
      desc: "Sel saraf yang mengirimkan sinyal listrik dan kimia ke seluruh sistem otak.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/0.glb",
      modelScale: [1, 1, 1],
      modelPosition: [0, 0, 0],
      modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/0.mp3"
    },
    {
      id: 1,
      label: "TARGET 02",
      title: "Korteks Serebral",
      desc: "Lapisan terluar otak besar yang bertanggung jawab atas pemikiran tingkat tinggi.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/1.glb",
      modelScale: [1.2, 1.2, 1.2],
      modelPosition: [0, 0.05, 0],
      modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/1.mp3"
    },
    {
      id: 2,
      label: "TARGET 03",
      title: "Hipokampus",
      desc: "Pusat memori jangka panjang dan navigasi spasial di dalam sistem limbik.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/2.glb",
      modelScale: [0.9, 0.9, 0.9],
      modelPosition: [0, 0, 0],
      modelRotation: [0, Math.PI / 4, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/2.mp3"
    },
    {
      id: 3,
      label: "TARGET 04",
      title: "Amigdala",
      desc: "Pusat pemrosesan emosi, terutama rasa takut dan respons terhadap bahaya.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/3.glb",
      modelScale: [1, 1, 1],
      modelPosition: [0, 0, 0],
      modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/3.mp3"
    },
    {
      id: 4,
      label: "TARGET 05",
      title: "Otak Kecil",
      desc: "Serebelum yang mengatur keseimbangan, koordinasi gerak, dan presisi motorik.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/4.glb",
      modelScale: [1.1, 1.1, 1.1],
      modelPosition: [0, -0.05, 0],
      modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/4.mp3"
    },
    {
      id: 5,
      label: "TARGET 06",
      title: "Batang Otak",
      desc: "Mengontrol fungsi vital seperti pernapasan, detak jantung, dan siklus tidur.",
      model: "models/5.glb",
      modelScale: [0.8, 0.8, 0.8],
      modelPosition: [0, 0, 0],
      modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/5.mp3"
    },
    {
      id: 6,
      label: "TARGET 07",
      title: "Lobus Frontal",
      desc: "Pusat perencanaan, pengambilan keputusan, dan kepribadian manusia.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/6.glb",
      modelScale: [1, 1, 1],
      modelPosition: [0, 0, 0],
      modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/6.mp3"
    },
    {
      id: 7,
      label: "TARGET 08",
      title: "Talamus",
      desc: "Gerbang relai sensorik yang meneruskan informasi ke area korteks yang tepat.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/7.glb",
      modelScale: [1, 1, 1],
      modelPosition: [0, 0, 0],
      modelRotation: [0, Math.PI / 6, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/7.mp3"
    },
    {
      id: 8,
      label: "TARGET 09",
      title: "Korpus Kalosum",
      desc: "Jembatan serat saraf yang menghubungkan belahan otak kiri dan kanan.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/8.glb",
      modelScale: [1.3, 1.3, 1.3],
      modelPosition: [0, 0.1, 0],
      modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/8.mp3"
    },
    {
      id: 9,
      label: "TARGET 10",
      title: "Hipotalamus",
      desc: "Mengatur suhu tubuh, rasa lapar, haus, dan ritme sirkadian harian.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/9.glb",
      modelScale: [0.9, 0.9, 0.9],
      modelPosition: [0, 0, 0],
      modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/9.mp3"
    },
    {
      id: 10,
      label: "TARGET 11",
      title: "Kelenjar Pineal",
      desc: "Menghasilkan melatonin yang mengatur siklus tidur dan jam biologis tubuh.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/10.glb",
      modelScale: [1, 1, 1],
      modelPosition: [0, 0, 0],
      modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/10.mp3"
    },
    {
      id: 11,
      label: "TARGET 12",
      title: "Ventrikel Otak",
      desc: "Rongga berisi cairan serebrospinal yang melindungi dan menutrisi otak.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/11.glb",
      modelScale: [1.2, 1.2, 1.2],
      modelPosition: [0, 0, 0],
      modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/11.mp3"
    }
  ]
};


/* ============================================================
   SECTION 2 — UTILITIES
   ============================================================ */
var Utils = (function () {

  function setLoadingProgress(pct, msg) {
    var bar  = document.getElementById("loading-bar");
    var text = document.getElementById("loading-text");
    if (bar)  bar.style.width = pct + "%";
    if (text && msg) text.textContent = msg;
  }

  function hideLoadingScreen() {
    var screen = document.getElementById("loading-screen");
    if (screen) {
      screen.classList.add("hidden");
      setTimeout(function () { screen.style.display = "none"; }, 900);
    }
  }

  function showToast(msg) {
    var toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(function () { toast.classList.remove("show"); }, 2800);
  }

  function updateInfoPanel(target) {
    document.getElementById("info-panel-number").textContent = target.label + " / 12";
    document.getElementById("info-panel-title").textContent  = target.title;
    document.getElementById("info-panel-desc").textContent   = target.desc;
    document.getElementById("target-num").textContent        = String(target.id + 1).padStart(2, "0");
    document.getElementById("info-panel").classList.add("visible");
  }

  function hideInfoPanel() {
    document.getElementById("info-panel").classList.remove("visible");
    document.getElementById("target-num").textContent = "—";
  }

  function setStatusActive(active) {
    var dot  = document.getElementById("status-dot");
    var text = document.getElementById("status-text");
    if (active) {
      dot.classList.add("active");
      text.textContent = "TARGET AKTIF";
    } else {
      dot.classList.remove("active");
      text.textContent = "SCANNING";
    }
  }

  function showScanIndicator(show) {
    var el = document.getElementById("scan-indicator");
    if (el) {
      if (show) el.classList.remove("hidden");
      else      el.classList.add("hidden");
    }
  }

  return {
    setLoadingProgress : setLoadingProgress,
    hideLoadingScreen  : hideLoadingScreen,
    showToast          : showToast,
    updateInfoPanel    : updateInfoPanel,
    hideInfoPanel      : hideInfoPanel,
    setStatusActive    : setStatusActive,
    showScanIndicator  : showScanIndicator
  };
})();


/* ============================================================
   SECTION 3 — AUDIO MANAGER
   ============================================================ */
var AudioManager = (function () {

  var _current  = null;   // current Howl instance
  var _isPlaying = false;
  var _preloaded = {};    // cache of Howl objects

  /* Pre-load all audio files */
  function preloadAll(targets) {
    targets.forEach(function (t) {
      _preloaded[t.id] = new Howl({
        src: [t.audio],
        html5: true,
        preload: true,
        onend: function () { _setPlayingState(false); }
      });
    });
  }

  /* Switch to a specific target's audio (stops previous) */
  function switchTo(targetId) {
    if (_current) {
      _current.stop();
      _setPlayingState(false);
    }
    _current = _preloaded[targetId] || null;
  }

  /* Play or pause */
  function togglePlayPause() {
    if (!_current) return;
    if (_isPlaying) {
      _current.pause();
      _setPlayingState(false);
    } else {
      _current.play();
      _setPlayingState(true);
    }
  }

  /* Auto-play when target found */
  function autoPlay(targetId) {
    switchTo(targetId);
    if (_current) {
      _current.play();
      _setPlayingState(true);
    }
  }

  /* Stop all */
  function stopAll() {
    if (_current) {
      _current.stop();
      _setPlayingState(false);
    }
    _current = null;
  }

  function _setPlayingState(playing) {
    _isPlaying = playing;
    var iconPlay  = document.getElementById("icon-play");
    var iconPause = document.getElementById("icon-pause");
    var btnLabel  = document.getElementById("btn-label");
    var waveBars  = document.querySelectorAll(".wave-bar");

    if (playing) {
      if (iconPlay)  iconPlay.style.display  = "none";
      if (iconPause) iconPause.style.display = "inline";
      if (btnLabel)  btnLabel.textContent    = "PAUSE";
      waveBars.forEach(function (b) { b.classList.add("playing"); });
    } else {
      if (iconPlay)  iconPlay.style.display  = "inline";
      if (iconPause) iconPause.style.display = "none";
      if (btnLabel)  btnLabel.textContent    = "PLAY AUDIO";
      waveBars.forEach(function (b) { b.classList.remove("playing"); });
    }
  }

  function isPlaying() { return _isPlaying; }

  return {
    preloadAll     : preloadAll,
    switchTo       : switchTo,
    togglePlayPause: togglePlayPause,
    autoPlay       : autoPlay,
    stopAll        : stopAll,
    isPlaying      : isPlaying
  };
})();


/* ============================================================
   SECTION 4 — 3D MODEL MANAGER
   ============================================================ */
var ModelManager = (function () {

  var _loader   = null;
  var _models   = {};   // targetId → THREE.Group
  var _anchors  = [];   // MindAR anchor references
  var _mixers   = [];   // animation mixers

  function init() {
    /* GLTFLoader is bundled as THREE.GLTFLoader via CDN script */
    if (typeof THREE !== "undefined" && THREE.GLTFLoader) {
      _loader = new THREE.GLTFLoader();
    }
  }

  /* Load all models onto their respective anchors */
  function loadAll(targets, mindARScene, onProgress) {
    var total   = targets.length;
    var loaded  = 0;

    targets.forEach(function (t) {
      var anchor = mindARScene.addAnchor(t.id);
      _anchors[t.id] = anchor;

      if (_loader) {
        _loader.load(
          t.model,
          function (gltf) {
            var model = gltf.scene;
            model.scale.set(t.modelScale[0], t.modelScale[1], t.modelScale[2]);
            model.position.set(t.modelPosition[0], t.modelPosition[1], t.modelPosition[2]);
            model.rotation.set(t.modelRotation[0], t.modelRotation[1], t.modelRotation[2]);

            /* Auto-spin animation if no built-in animations */
            if (gltf.animations && gltf.animations.length > 0) {
              var mixer = new THREE.AnimationMixer(model);
              gltf.animations.forEach(function (clip) {
                mixer.clipAction(clip).play();
              });
              _mixers.push(mixer);
            } else {
              /* Add gentle continuous rotation as fallback */
              model.userData.autoRotate = true;
            }

            anchor.group.add(model);
            _models[t.id] = model;
            loaded++;
            if (onProgress) onProgress(loaded, total);
          },
          undefined,
          function (err) {
            console.warn("Model load error for target " + t.id + ":", err);
            /* Fallback: placeholder box */
            var mesh = _createPlaceholder(t.id);
            anchor.group.add(mesh);
            _models[t.id] = mesh;
            loaded++;
            if (onProgress) onProgress(loaded, total);
          }
        );
      } else {
        /* No GLTFLoader available — use placeholder */
        var mesh = _createPlaceholder(t.id);
        anchor.group.add(mesh);
        _models[t.id] = mesh;
        loaded++;
        if (onProgress) onProgress(loaded, total);
      }
    });
  }

  /* Tick: update animation mixers */
  function update(delta) {
    _mixers.forEach(function (m) { m.update(delta); });

    /* Auto-rotate fallback objects */
    Object.keys(_models).forEach(function (id) {
      var m = _models[id];
      if (m && m.userData && m.userData.autoRotate) {
        m.rotation.y += delta * 0.6;
      }
    });
  }

  /* Simple placeholder for missing models */
  function _createPlaceholder(id) {
    var hue = (id / 12) * 360;
    var color = new THREE.Color("hsl(" + hue + ", 80%, 60%)");

    var geo  = new THREE.IcosahedronGeometry(0.08, 1);
    var mat  = new THREE.MeshPhongMaterial({ color: color, wireframe: false, shininess: 100 });
    var mesh = new THREE.Mesh(geo, mat);
    mesh.userData.autoRotate = true;

    /* Wireframe overlay */
    var wireMat  = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, opacity: 0.25, transparent: true });
    var wireMesh = new THREE.Mesh(geo, wireMat);
    mesh.add(wireMesh);

    return mesh;
  }

  return {
    init   : init,
    loadAll: loadAll,
    update : update
  };
})();


/* ============================================================
   SECTION 5 — MAIN APP
   ============================================================ */
(function () {

  "use strict";

  var _mindarThree   = null;
  var _renderer      = null;
  var _scene         = null;
  var _camera        = null;
  var _clock         = new THREE.Clock();
  var _activeTarget  = -1;
  var _anchorsFound  = {};

  /* ── Boot sequence ── */
  function boot() {
    Utils.setLoadingProgress(10, "MENYIAPKAN SISTEM AR...");

    /* Pre-load audio in background */
    setTimeout(function () {
      Utils.setLoadingProgress(25, "MEMUAT AUDIO STORYTELLING...");
      AudioManager.preloadAll(AR_CONFIG.targets);
    }, 300);

    setTimeout(function () {
      Utils.setLoadingProgress(45, "INISIALISASI KAMERA...");
      _initAR();
    }, 800);
  }

  /* ── Init MindAR ── */
  function _initAR() {
    try {
      _mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container         : document.getElementById("ar-container"),
        imageTargetSrc    : AR_CONFIG.mindFile,
        maxTrack          : 1,
        uiLoading         : "no",
        uiScanning        : "no",
        uiError           : "no"
      });
    } catch (e) {
      console.warn("MindAR init failed:", e);
      Utils.setLoadingProgress(100, "DEMO MODE (tanpa kamera)");
      setTimeout(Utils.hideLoadingScreen, 1000);
      return;
    }

    _renderer = _mindarThree.renderer;
    _scene    = _mindarThree.scene;
    _camera   = _mindarThree.camera;

    _setupLighting();

    Utils.setLoadingProgress(60, "MEMUAT MODEL 3D...");
    ModelManager.init();
    ModelManager.loadAll(AR_CONFIG.targets, _mindarThree, function (loaded, total) {
      var pct = 60 + Math.round((loaded / total) * 30);
      Utils.setLoadingProgress(pct, "MEMUAT MODEL " + loaded + "/" + total + "...");
    });

    _setupTargetCallbacks();

    Utils.setLoadingProgress(92, "MENGHIDUPKAN AR ENGINE...");

    _mindarThree.start().then(function () {
      Utils.setLoadingProgress(100, "SIAP!");
      setTimeout(function () {
        Utils.hideLoadingScreen();
        _startRenderLoop();
        Utils.showScanIndicator(true);
        _setupButtonListeners();
      }, 600);
    }).catch(function (err) {
      console.error("AR start error:", err);
      Utils.setLoadingProgress(100, "ERROR: " + err.message);
    });
  }

  /* ── Lighting ── */
  function _setupLighting() {
    var ambient = new THREE.AmbientLight(0xffffff, 0.6);
    _scene.add(ambient);

    var dirLight = new THREE.DirectionalLight(0x4fc3f7, 1.2);
    dirLight.position.set(1, 2, 2);
    _scene.add(dirLight);

    var rimLight = new THREE.DirectionalLight(0x00e5ff, 0.5);
    rimLight.position.set(-1, 0.5, -1);
    _scene.add(rimLight);

    var pointLight = new THREE.PointLight(0xffffff, 0.4, 3);
    pointLight.position.set(0, 1.5, 1);
    _scene.add(pointLight);
  }

  /* ── Target event callbacks ── */
  function _setupTargetCallbacks() {
    AR_CONFIG.targets.forEach(function (t) {
      var anchor = _mindarThree.anchors ? _mindarThree.anchors[t.id] : null;

      /* MindAR emits targetFound / targetLost on the anchor */
      if (anchor) {
        anchor.onTargetFound = function () { _onTargetFound(t); };
        anchor.onTargetLost  = function () { _onTargetLost(t); };
      }
    });
  }

  function _onTargetFound(target) {
    if (_activeTarget === target.id) return;

    _activeTarget = target.id;
    _anchorsFound[target.id] = true;

    Utils.setStatusActive(true);
    Utils.showScanIndicator(false);
    Utils.updateInfoPanel(target);
    Utils.showToast("✦ " + target.title.toUpperCase() + " TERDETEKSI");

    /* Auto-play audio story */
    AudioManager.autoPlay(target.id);
  }

  function _onTargetLost(target) {
    if (_activeTarget !== target.id) return;

    _activeTarget = -1;
    _anchorsFound[target.id] = false;

    AudioManager.stopAll();
    Utils.setStatusActive(false);
    Utils.showScanIndicator(true);
    Utils.hideInfoPanel();
  }

  /* ── Render loop ── */
  function _startRenderLoop() {
    _renderer.setAnimationLoop(function () {
      var delta = _clock.getDelta();
      ModelManager.update(delta);
      _renderer.render(_scene, _camera);
    });
  }

  /* ── Button listeners ── */
  function _setupButtonListeners() {
    var btnPlayPause = document.getElementById("btn-play-pause");
    if (btnPlayPause) {
      btnPlayPause.addEventListener("click", function () {
        if (_activeTarget >= 0) {
          AudioManager.togglePlayPause();
        } else {
          Utils.showToast("Arahkan kamera ke image target terlebih dahulu");
        }
      });
    }
  }

  /* ── Start ── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

})();
