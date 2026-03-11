/**
 * ============================================================
 *  AR MIND SCAN — app.js  (FIXED v3)
 *
 *  PERBAIKAN vs versi sebelumnya:
 *  - THREE didapat dari three.min.js yang dimuat terpisah (r134)
 *  - GLTFLoader dari examples/js (UMD, bukan ES module)
 *  - MindAR dari mindar-image.prod.js (tanpa bundled Three)
 *  - MindARThree dibangun manual menggunakan THREE + MindAR.IMAGE
 *  - Audio lazy-load (tidak preload 12 sekaligus → pool exhausted)
 *  - Target 05 model URL diperbaiki ke S3
 * ============================================================
 */

/* ============================================================
   SECTION 1 — ASSET CONFIGURATION
   ============================================================ */
var AR_CONFIG = {

  mindFile: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/ordertargets.mind",

  targets: [
    {
      id: 0, label: "TARGET 01", title: "Neuron Synaptik",
      desc: "Sel saraf yang mengirimkan sinyal listrik dan kimia ke seluruh sistem otak.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/0.glb",
      modelScale: [1, 1, 1], modelPosition: [0, 0, 0], modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/0.mp3"
    },
    {
      id: 1, label: "TARGET 02", title: "Korteks Serebral",
      desc: "Lapisan terluar otak besar yang bertanggung jawab atas pemikiran tingkat tinggi.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/1.glb",
      modelScale: [1.2, 1.2, 1.2], modelPosition: [0, 0.05, 0], modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/1.mp3"
    },
    {
      id: 2, label: "TARGET 03", title: "Hipokampus",
      desc: "Pusat memori jangka panjang dan navigasi spasial di dalam sistem limbik.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/2.glb",
      modelScale: [0.9, 0.9, 0.9], modelPosition: [0, 0, 0], modelRotation: [0, Math.PI / 4, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/2.mp3"
    },
    {
      id: 3, label: "TARGET 04", title: "Amigdala",
      desc: "Pusat pemrosesan emosi, terutama rasa takut dan respons terhadap bahaya.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/3.glb",
      modelScale: [1, 1, 1], modelPosition: [0, 0, 0], modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/3.mp3"
    },
    {
      id: 4, label: "TARGET 05", title: "Otak Kecil",
      desc: "Serebelum yang mengatur keseimbangan, koordinasi gerak, dan presisi motorik.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/4.glb",
      modelScale: [1.1, 1.1, 1.1], modelPosition: [0, -0.05, 0], modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/4.mp3"
    },
    {
      id: 5, label: "TARGET 06", title: "Batang Otak",
      desc: "Mengontrol fungsi vital seperti pernapasan, detak jantung, dan siklus tidur.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/5.glb",  /* FIXED: was models/5.glb */
      modelScale: [0.8, 0.8, 0.8], modelPosition: [0, 0, 0], modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/5.mp3"
    },
    {
      id: 6, label: "TARGET 07", title: "Lobus Frontal",
      desc: "Pusat perencanaan, pengambilan keputusan, dan kepribadian manusia.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/6.glb",
      modelScale: [1, 1, 1], modelPosition: [0, 0, 0], modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/6.mp3"
    },
    {
      id: 7, label: "TARGET 08", title: "Talamus",
      desc: "Gerbang relai sensorik yang meneruskan informasi ke area korteks yang tepat.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/7.glb",
      modelScale: [1, 1, 1], modelPosition: [0, 0, 0], modelRotation: [0, Math.PI / 6, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/7.mp3"
    },
    {
      id: 8, label: "TARGET 09", title: "Korpus Kalosum",
      desc: "Jembatan serat saraf yang menghubungkan belahan otak kiri dan kanan.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/8.glb",
      modelScale: [1.3, 1.3, 1.3], modelPosition: [0, 0.1, 0], modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/8.mp3"
    },
    {
      id: 9, label: "TARGET 10", title: "Hipotalamus",
      desc: "Mengatur suhu tubuh, rasa lapar, haus, dan ritme sirkadian harian.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/9.glb",
      modelScale: [0.9, 0.9, 0.9], modelPosition: [0, 0, 0], modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/9.mp3"
    },
    {
      id: 10, label: "TARGET 11", title: "Kelenjar Pineal",
      desc: "Menghasilkan melatonin yang mengatur siklus tidur dan jam biologis tubuh.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/10.glb",
      modelScale: [1, 1, 1], modelPosition: [0, 0, 0], modelRotation: [0, 0, 0],
      audio: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/10.mp3"
    },
    {
      id: 11, label: "TARGET 12", title: "Ventrikel Otak",
      desc: "Rongga berisi cairan serebrospinal yang melindungi dan menutrisi otak.",
      model: "https://btconsultingtest.s3.us-east-2.amazonaws.com/v/11.glb",
      modelScale: [1.2, 1.2, 1.2], modelPosition: [0, 0, 0], modelRotation: [0, 0, 0],
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
    if (active) { dot.classList.add("active");    text.textContent = "TARGET AKTIF"; }
    else         { dot.classList.remove("active"); text.textContent = "SCANNING"; }
  }

  function showScanIndicator(show) {
    var el = document.getElementById("scan-indicator");
    if (!el) return;
    if (show) el.classList.remove("hidden");
    else      el.classList.add("hidden");
  }

  return { setLoadingProgress, hideLoadingScreen, showToast, updateInfoPanel, hideInfoPanel, setStatusActive, showScanIndicator };
})();


/* ============================================================
   SECTION 3 — AUDIO MANAGER
   FIXED: Lazy-load Howl per target, bukan preload 12 sekaligus.
   Browser hanya izinkan ~4-6 HTMLAudioElement bersamaan.
   ============================================================ */
var AudioManager = (function () {

  var _current   = null;
  var _isPlaying = false;
  var _cache     = {};   /* targetId → Howl */

  function _getOrCreate(targetId) {
    if (_cache[targetId]) return _cache[targetId];
    var t = AR_CONFIG.targets[targetId];
    if (!t) return null;
    _cache[targetId] = new Howl({
      src    : [t.audio],
      html5  : true,
      preload: false,           /* FIXED: jangan preload semua sekaligus */
      onend  : function () { _setState(false); },
      onloaderror: function (id, e) { console.warn("Audio error target " + targetId, e); }
    });
    return _cache[targetId];
  }

  function autoPlay(targetId) {
    if (_current) { _current.stop(); _setState(false); }
    _current = _getOrCreate(targetId);
    if (_current) { _current.play(); _setState(true); }
  }

  function togglePlayPause() {
    if (!_current) return;
    if (_isPlaying) { _current.pause(); _setState(false); }
    else            { _current.play();  _setState(true);  }
  }

  function stopAll() {
    if (_current) { _current.stop(); _setState(false); }
    _current = null;
  }

  function _setState(playing) {
    _isPlaying = playing;
    var iconPlay  = document.getElementById("icon-play");
    var iconPause = document.getElementById("icon-pause");
    var btnLabel  = document.getElementById("btn-label");
    var bars      = document.querySelectorAll(".wave-bar");
    if (playing) {
      if (iconPlay)  iconPlay.style.display  = "none";
      if (iconPause) iconPause.style.display = "inline";
      if (btnLabel)  btnLabel.textContent    = "PAUSE";
      bars.forEach(function (b) { b.classList.add("playing"); });
    } else {
      if (iconPlay)  iconPlay.style.display  = "inline";
      if (iconPause) iconPause.style.display = "none";
      if (btnLabel)  btnLabel.textContent    = "PLAY AUDIO";
      bars.forEach(function (b) { b.classList.remove("playing"); });
    }
  }

  function isPlaying() { return _isPlaying; }
  return { autoPlay, togglePlayPause, stopAll, isPlaying };
})();


/* ============================================================
   SECTION 4 — MAIN APP
   FIXED:
   - Tidak pakai MindARThree dari bundle (menyebabkan THREE confict)
   - Bangun scene Three.js manual, pasang ke MindAR controller
   - THREE.GLTFLoader tersedia dari examples/js UMD build
   ============================================================ */
(function () {
  "use strict";

  var _controller  = null;   /* MindAR.IMAGE.Controller */
  var _renderer    = null;
  var _scene       = null;
  var _camera      = null;
  var _clock       = null;
  var _anchors     = [];     /* THREE.Group per target */
  var _models      = {};
  var _mixers      = [];
  var _activeTarget = -1;

  /* ── Boot ── */
  function boot() {
    /* Pastikan THREE tersedia */
    if (typeof THREE === "undefined") {
      console.error("THREE tidak terdefinisi. Periksa urutan script di HTML.");
      Utils.setLoadingProgress(100, "ERROR: Three.js tidak termuat");
      return;
    }

    _clock = new THREE.Clock();
    Utils.setLoadingProgress(10, "MENYIAPKAN SISTEM AR...");
    setTimeout(_initThree, 200);
  }

  /* ── Buat scene Three.js ── */
  function _initThree() {
    Utils.setLoadingProgress(25, "INISIALISASI 3D ENGINE...");

    var container = document.getElementById("ar-container");

    _renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    _renderer.setPixelRatio(window.devicePixelRatio);
    _renderer.setSize(container.clientWidth, container.clientHeight);
    _renderer.setClearColor(0x000000, 0);
    container.appendChild(_renderer.domElement);

    _scene  = new THREE.Scene();
    _camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.01, 100);
    _scene.add(_camera);

    _setupLighting();
    setTimeout(_initMindAR, 200);
  }

  /* ── Init MindAR controller ── */
  function _initMindAR() {
    Utils.setLoadingProgress(40, "INISIALISASI MINDAR...");

    if (typeof MINDAR === "undefined" || typeof MINDAR.IMAGE === "undefined") {
      console.error("MINDAR.IMAGE tidak tersedia.");
      Utils.setLoadingProgress(100, "ERROR: MindAR tidak termuat");
      return;
    }

    var container = document.getElementById("ar-container");

    _controller = new MINDAR.IMAGE.Controller({
      inputWidth  : container.clientWidth,
      inputHeight : container.clientHeight,
      maxTrack    : 1,
      filterMinCF : 0.001,
      filterBeta  : 1000,
      missTolerance      : 5,
      warmupTolerance    : 5
    });

    /* Buat anchor group dan daftarkan ke scene */
    AR_CONFIG.targets.forEach(function (t) {
      var group = new THREE.Group();
      group.visible = false;
      _scene.add(group);
      _anchors[t.id] = group;
    });

    Utils.setLoadingProgress(55, "MEMUAT FILE TARGET...");

    _controller.addImageTargets(AR_CONFIG.mindFile).then(function (data) {
      Utils.setLoadingProgress(70, "MEMUAT MODEL 3D...");
      _loadModels(function () {
        Utils.setLoadingProgress(88, "MEMULAI KAMERA...");
        _startCamera();
      });
    }).catch(function (err) {
      console.error("Gagal memuat mind file:", err);
      Utils.setLoadingProgress(100, "ERROR: " + err.message);
    });
  }

  /* ── Lighting ── */
  function _setupLighting() {
    _scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    var d = new THREE.DirectionalLight(0x4fc3f7, 1.2);
    d.position.set(1, 2, 2);
    _scene.add(d);
    var r = new THREE.DirectionalLight(0x00e5ff, 0.5);
    r.position.set(-1, 0.5, -1);
    _scene.add(r);
    var p = new THREE.PointLight(0xffffff, 0.4, 3);
    p.position.set(0, 1.5, 1);
    _scene.add(p);
  }

  /* ── Load GLB models ── */
  function _loadModels(onDone) {
    var loader = null;
    if (typeof THREE.GLTFLoader !== "undefined") {
      loader = new THREE.GLTFLoader();
    }

    var total  = AR_CONFIG.targets.length;
    var loaded = 0;

    function onOne() {
      loaded++;
      var pct = 70 + Math.round((loaded / total) * 18);
      Utils.setLoadingProgress(pct, "MEMUAT MODEL " + loaded + "/" + total + "...");
      if (loaded === total && onDone) onDone();
    }

    AR_CONFIG.targets.forEach(function (t) {
      if (!loader) {
        var ph = _placeholder(t.id);
        _anchors[t.id].add(ph);
        _models[t.id] = ph;
        onOne();
        return;
      }

      loader.load(
        t.model,
        function (gltf) {
          var m = gltf.scene;
          m.scale.set(t.modelScale[0], t.modelScale[1], t.modelScale[2]);
          m.position.set(t.modelPosition[0], t.modelPosition[1], t.modelPosition[2]);
          m.rotation.set(t.modelRotation[0], t.modelRotation[1], t.modelRotation[2]);
          if (gltf.animations && gltf.animations.length) {
            var mx = new THREE.AnimationMixer(m);
            gltf.animations.forEach(function (c) { mx.clipAction(c).play(); });
            _mixers.push(mx);
          } else {
            m.userData.autoRotate = true;
          }
          _anchors[t.id].add(m);
          _models[t.id] = m;
          onOne();
        },
        undefined,
        function (err) {
          console.warn("Model gagal:", t.id, err);
          var ph = _placeholder(t.id);
          _anchors[t.id].add(ph);
          _models[t.id] = ph;
          onOne();
        }
      );
    });
  }

  function _placeholder(id) {
    var color = new THREE.Color("hsl(" + ((id / 12) * 360) + ", 80%, 60%)");
    var geo   = new THREE.IcosahedronGeometry(0.08, 1);
    var mesh  = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({ color: color, shininess: 100 }));
    mesh.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ wireframe: true, opacity: 0.25, transparent: true })));
    mesh.userData.autoRotate = true;
    return mesh;
  }

  /* ── Start kamera & render loop ── */
  function _startCamera() {
    var video = document.createElement("video");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");
    video.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:0;";
    document.getElementById("ar-container").insertBefore(video, document.getElementById("ar-container").firstChild);

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false })
      .then(function (stream) {
        video.srcObject = stream;
        return video.play();
      })
      .then(function () {
        _controller.setup(video, AR_CONFIG.targets.length);

        _controller.onUpdate = function (data) {
          if (data.type === "processDone") {
            AR_CONFIG.targets.forEach(function (t) {
              var result = _controller.getWorldMatrix(t.id);
              if (result) {
                _anchors[t.id].visible = true;
                _anchors[t.id].matrix.set(
                  result[0], result[4], result[8],  result[12],
                  result[1], result[5], result[9],  result[13],
                  result[2], result[6], result[10], result[14],
                  result[3], result[7], result[11], result[15]
                );
                _anchors[t.id].matrix.decompose(
                  _anchors[t.id].position,
                  _anchors[t.id].quaternion,
                  _anchors[t.id].scale
                );
                if (_activeTarget !== t.id) _onFound(t);
              } else {
                if (_anchors[t.id].visible) {
                  _anchors[t.id].visible = false;
                  if (_activeTarget === t.id) _onLost(t);
                }
              }
            });
          }
        };

        _controller.dummyRun(video);
        Utils.setLoadingProgress(100, "SIAP!");
        setTimeout(function () {
          Utils.hideLoadingScreen();
          Utils.showScanIndicator(true);
          _setupButtons();
          _renderLoop();
        }, 600);

        _controller.processVideo(video);
      })
      .catch(function (err) {
        console.error("Kamera gagal:", err);
        Utils.setLoadingProgress(100, "ERROR KAMERA: " + err.message);
      });
  }

  /* ── Render loop ── */
  function _renderLoop() {
    requestAnimationFrame(_renderLoop);
    var delta = _clock.getDelta();
    _mixers.forEach(function (m) { m.update(delta); });
    Object.keys(_models).forEach(function (id) {
      var m = _models[id];
      if (m && m.userData && m.userData.autoRotate) m.rotation.y += delta * 0.6;
    });
    _renderer.render(_scene, _camera);
  }

  /* ── Target found / lost ── */
  function _onFound(target) {
    _activeTarget = target.id;
    Utils.setStatusActive(true);
    Utils.showScanIndicator(false);
    Utils.updateInfoPanel(target);
    Utils.showToast("✦ " + target.title.toUpperCase() + " TERDETEKSI");
    AudioManager.autoPlay(target.id);
  }

  function _onLost(target) {
    _activeTarget = -1;
    AudioManager.stopAll();
    Utils.setStatusActive(false);
    Utils.showScanIndicator(true);
    Utils.hideInfoPanel();
  }

  /* ── Buttons ── */
  function _setupButtons() {
    var btn = document.getElementById("btn-play-pause");
    if (btn) {
      btn.addEventListener("click", function () {
        if (_activeTarget >= 0) AudioManager.togglePlayPause();
        else Utils.showToast("Arahkan kamera ke image target terlebih dahulu");
      });
    }
  }

  /* ── Start ── */
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

})();
