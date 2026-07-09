(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.documentElement.classList.remove("no-js");

  // --- Page-load fade-in ---
  document.body.classList.add("page-ready");

  // --- Scroll-linked signal path ---
  var path = document.querySelector(".signal-path path");
  if (path) {
    var length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    function updatePath() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? scrollTop / docHeight : 0;
      path.style.strokeDashoffset = length * (1 - progress);
    }

    window.addEventListener("scroll", updatePath, { passive: true });
    updatePath();
  }

  // --- Signal node glow on scroll ---
  var nodes = document.querySelectorAll(".signal-node");
  if (nodes.length) {
    var nodeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("node-active", entry.isIntersecting);
        });
      },
      { rootMargin: "-20% 0px -20% 0px" }
    );
    nodes.forEach(function (node) {
      nodeObserver.observe(node);
    });
  }

  // --- Section reveal on scroll (homepage + article) ---
  var revealTargets = document.querySelectorAll(
    ".content-section, .contact-section, .hero-panel, .article-reveal"
  );
  if (revealTargets.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // --- Cursor-following tilt on interactive cards (desktop only) ---
  var isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  var tiltCards = document.querySelectorAll(".project-row, .writing-card, .contact-panel");
  if (!isTouch) tiltCards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;
      var y = (e.clientY - rect.top) / rect.height;
      var tiltX = (y - 0.5) * -6;
      var tiltY = (x - 0.5) * 6;
      card.style.transform =
        "perspective(600px) rotateX(" + tiltX + "deg) rotateY(" + tiltY + "deg) translateY(-3px)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });

  // --- Article page: reveal sections as you read ---
  var articleSections = document.querySelectorAll(
    ".article-body h2, .article-figure, .source-section"
  );
  if (articleSections.length) {
    articleSections.forEach(function (el) {
      el.classList.add("article-reveal");
    });
    var articleObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            articleObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    articleSections.forEach(function (el) {
      articleObserver.observe(el);
    });
  }

  // --- Article page: reading progress bar ---
  var articleBody = document.querySelector(".article-body");
  if (articleBody) {
    var progressBar = document.createElement("div");
    progressBar.className = "reading-progress";
    document.body.appendChild(progressBar);

    function updateProgress() {
      var rect = articleBody.getBoundingClientRect();
      var articleTop = rect.top + window.scrollY;
      var articleHeight = rect.height;
      var scrolled = window.scrollY - articleTop;
      var progress = Math.max(0, Math.min(1, scrolled / (articleHeight - window.innerHeight)));
      progressBar.style.transform = "scaleX(" + progress + ")";
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }
})();
