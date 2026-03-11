/**
 * ============================================================
 *  AR MIND SCAN — app.js  (FIXED VERSION)
 *  12 Image Targets | 3D Models | Audio Storytelling
 *
 *  PERBAIKAN:
 *  1. Hapus import Three.js & GLTFLoader terpisah dari HTML
 *     → MindAR sudah bundle keduanya. Load ganda menyebabkan
 *       konflik namespace sehingga MINDAR.IMAGE menjadi undefined.
 *  2. GLTFLoader diakses via THREE.GLTFLoader (dari bundle MindAR).
 *  3. Audio pool exhausted: Howl dibuat lazy (saat pertama dibutuhkan),
 *     bukan preload semua 12 sekaligus.
 *  4. Anchor callback menggunakan cara yang benar untuk MindAR v1.2.x.
 * ============================================================
 */

/* ============================================================
   SECTION 1 — ASSET CONFIGURATION
   Ganti URL model dan audio sesuai hosting Anda.
   Format model : .glb / .gltf
   Format audio : .mp3 / .ogg / .webm
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
      /* FIXED: was "models/5.glb" (local path), now uses S3 URL */
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/5.glb",
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
   FIXED: Lazy-load Howl instances (bukan preload semua sekaligus)
   agar tidak menguras HTML5 Audio pool browser (max ~4-6 instance).
   ============================================================ */
var AudioManager = (function () {

  var _current   = null;    // Howl instance yang sedang aktif
  var _currentId = -1;      // target id yang sedang aktif
  var _isPlaying = false;
  var _cache     = {};      // cache Howl per targetId (lazy)

  /* Buat Howl instance untuk satu target (lazy) */
  function _getOrCreate(targetId) {
    if (_cache[targetId]) return _cache[targetId];

    var target = AR_CONFIG.targets[targetId];
    if (!target) return null;

    var howl = new Howl({
      src    : [target.audio],
      html5  : true,         // streaming, tidak buffer semua
      preload: false,        // FIXED: jangan preload, muat saat dibutuhkan
      onend  : function () { _setPlayingState(false); },
      onloaderror: function (id, err) {
        console.warn("Audio load error target " + targetId + ":", err);
      }
    });

    _cache[targetId] = howl;
    return howl;
  }

  /* Pindah ke target lain, hentikan yang sedang berjalan */
  function switchTo(targetId) {
    if (_current) {
      _current.stop();
      _setPlayingState(false);
    }
    _currentId = targetId;
    _current   = _getOrCreate(targetId);
  }

  /* Play / Pause toggle */
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

  /* Auto-play saat target ditemukan */
  function autoPlay(targetId) {
    switchTo(targetId);
    if (_current) {
      _current.play();
      _setPlayingState(true);
    }
  }

  /* Hentikan semua audio */
  function stopAll() {
    if (_current) {
      _current.stop();
      _setPlayingState(false);
    }
    _current   = null;
    _currentId = -1;
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
    switchTo       : switchTo,
    togglePlayPause: togglePlayPause,
    autoPlay       : autoPlay,
    stopAll        : stopAll,
    isPlaying      : isPlaying
  };
})();


/* ============================================================
   SECTION 4 — 3D MODEL MANAGER
   FIXED: THREE.GLTFLoader diambil dari bundle MindAR,
   bukan dari script terpisah yang pakai ES module import.
   ============================================================ */
var ModelManager = (function () {

  var _loader  = null;
  var _models  = {};   // targetId → THREE.Group / Mesh
  var _mixers  = [];   // AnimationMixer[]

  function init() {
    /*
     * MindAR v1.2.5 prod bundle meng-expose THREE secara global
     * beserta THREE.GLTFLoader di dalamnya.
     * JANGAN load three.min.js atau GLTFLoader.js secara terpisah.
     */
    if (typeof THREE !== "undefined" && typeof THREE.GLTFLoader !== "undefined") {
      _loader = new THREE.GLTFLoader();
    } else {
      console.warn("THREE.GLTFLoader tidak tersedia. Model akan diganti placeholder.");
    }
  }

  /* Load semua model ke anchor masing-masing */
  function loadAll(targets, mindARScene, onProgress) {
    var total  = targets.length;
    var loaded = 0;

    targets.forEach(function (t) {
      var anchor = mindARScene.addAnchor(t.id);

      if (_loader) {
        _loader.load(
          t.model,
          function (gltf) {
            var model = gltf.scene;
            model.scale.set(t.modelScale[0], t.modelScale[1], t.modelScale[2]);
            model.position.set(t.modelPosition[0], t.modelPosition[1], t.modelPosition[2]);
            model.rotation.set(t.modelRotation[0], t.modelRotation[1], t.modelRotation[2]);

            if (gltf.animations && gltf.animations.length > 0) {
              var mixer = new THREE.AnimationMixer(model);
              gltf.animations.forEach(function (clip) {
                mixer.clipAction(clip).play();
              });
              _mixers.push(mixer);
            } else {
              /* Fallback: rotasi otomatis pelan */
              model.userData.autoRotate = true;
            }

            anchor.group.add(model);
            _models[t.id] = model;
            loaded++;
            if (onProgress) onProgress(loaded, total);
          },
          undefined,
          function (err) {
            console.warn("Gagal memuat model target " + t.id + ":", err);
            var mesh = _createPlaceholder(t.id);
            anchor.group.add(mesh);
            _models[t.id] = mesh;
            loaded++;
            if (onProgress) onProgress(loaded, total);
          }
        );
      } else {
        /* Tidak ada loader — gunakan placeholder */
        var mesh = _createPlaceholder(t.id);
        anchor.group.add(mesh);
        _models[t.id] = mesh;
        loaded++;
        if (onProgress) onProgress(loaded, total);
      }
    });
  }

  /* Tick: update animation mixer & auto-rotate */
  function update(delta) {
    _mixers.forEach(function (m) { m.update(delta); });
    Object.keys(_models).forEach(function (id) {
      var m = _models[id];
      if (m && m.userData && m.userData.autoRotate) {
        m.rotation.y += delta * 0.6;
      }
    });
  }

  /* Placeholder warna-warni jika model gagal dimuat */
  function _createPlaceholder(id) {
    var hue   = (id / 12) * 360;
    var color = new THREE.Color("hsl(" + hue + ", 80%, 60%)");
    var geo   = new THREE.IcosahedronGeometry(0.08, 1);
    var mat   = new THREE.MeshPhongMaterial({ color: color, shininess: 100 });
    var mesh  = new THREE.Mesh(geo, mat);
    mesh.userData.autoRotate = true;

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
   FIXED: Anchor event binding menggunakan cara yang benar
   untuk MindAR v1.2.x (addEventListener pada anchor.group
   atau via anchor.onTargetFound / onTargetLost langsung).
   ============================================================ */
(function () {

  "use strict";

  var _mindarThree  = null;
  var _renderer     = null;
  var _scene        = null;
  var _camera       = null;
  var _clock        = null;
  var _activeTarget = -1;

  /* ── Boot sequence ── */
  function boot() {
    _clock = new THREE.Clock();
    Utils.setLoadingProgress(10, "MENYIAPKAN SISTEM AR...");

    setTimeout(function () {
      Utils.setLoadingProgress(35, "INISIALISASI KAMERA...");
      _initAR();
    }, 400);
  }

  /* ── Init MindAR ── */
  function _initAR() {
    /*
     * Pastikan MINDAR tersedia sebelum dipakai.
     * Error "Cannot read properties of undefined (reading 'IMAGE')"
     * terjadi jika Three.js dimuat ulang dan menimpa namespace
     * yang sudah dibuat oleh mindar-image-three.prod.js
     */
    if (typeof window.MINDAR === "undefined" || typeof window.MINDAR.IMAGE === "undefined") {
      console.error("MINDAR.IMAGE tidak tersedia. Pastikan hanya ada satu script MindAR dan tidak ada Three.js/GLTFLoader terpisah.");
      Utils.setLoadingProgress(100, "ERROR: MindAR gagal dimuat");
      return;
    }

    try {
      _mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container      : document.getElementById("ar-container"),
        imageTargetSrc : AR_CONFIG.mindFile,
        maxTrack       : 1,          // track 1 target sekaligus (hemat resource)
        uiLoading      : "no",
        uiScanning     : "no",
        uiError        : "no"
      });
    } catch (e) {
      console.error("MindAR init gagal:", e);
      Utils.setLoadingProgress(100, "ERROR: " + e.message);
      return;
    }

    _renderer = _mindarThree.renderer;
    _scene    = _mindarThree.scene;
    _camera   = _mindarThree.camera;

    _setupLighting();

    Utils.setLoadingProgress(55, "MEMUAT MODEL 3D...");
    ModelManager.init();
    ModelManager.loadAll(AR_CONFIG.targets, _mindarThree, function (loaded, total) {
      var pct = 55 + Math.round((loaded / total) * 30);
      Utils.setLoadingProgress(pct, "MEMUAT MODEL " + loaded + "/" + total + "...");
    });

    _setupTargetCallbacks();

    Utils.setLoadingProgress(90, "MENGHIDUPKAN AR ENGINE...");

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
      /*
       * MindAR v1.2.x: anchors tersedia setelah addAnchor() dipanggil
       * di dalam ModelManager.loadAll(). Gunakan _mindarThree.anchors[id]
       * untuk mengakses anchor dan bind callback-nya.
       *
       * PENTING: _mindarThree.anchors[id] baru terisi setelah start(),
       * sehingga binding dilakukan sebelum start() agar event tidak terlewat.
       */
      var anchor = _mindarThree.anchors ? _mindarThree.anchors[t.id] : null;
      if (!anchor) return;

      anchor.onTargetFound = function () { _onTargetFound(t); };
      anchor.onTargetLost  = function () { _onTargetLost(t); };
    });
  }

  function _onTargetFound(target) {
    if (_activeTarget === target.id) return;
    _activeTarget = target.id;

    Utils.setStatusActive(true);
    Utils.showScanIndicator(false);
    Utils.updateInfoPanel(target);
    Utils.showToast("✦ " + target.title.toUpperCase() + " TERDETEKSI");

    /* Lazy-load + auto-play audio saat target ditemukan */
    AudioManager.autoPlay(target.id);
  }

  function _onTargetLost(target) {
    if (_activeTarget !== target.id) return;
    _activeTarget = -1;

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
