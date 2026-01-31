    function applyFontScale() {
    const savedScale = localStorage.getItem("font-scale") || "1";
    document.documentElement.style.setProperty("--font-scale", savedScale);
    document.body.style.fontSize = `${savedScale}em`;
  }

  applyFontScale();