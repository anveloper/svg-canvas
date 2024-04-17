(() => {
  const element = {
    svgList: document.querySelector("#leftTab"),
    canvas: document.querySelector("#content"),
  };
  element.ctx = element.canvas.getContext("2d");

  const renderSVGToCanvas = (svgText) => {
    const DOMURL = window.URL || window.webkitURL || window;

    const img = new Image();
    const svgBlob = new Blob([svgText], { type: "image/svg+xml" });
    const url = DOMURL.createObjectURL(svgBlob);

    img.onload = function () {
      element.canvas.width = img.width;
      element.canvas.height = img.height;
      element.ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url); // Clean up
    };

    img.src = url;
  };

  (() => {
    // 드래그 앤 드롭 이벤트 처리
    element.svgList.addEventListener("dragover", (e) => {
      e.preventDefault();
      element.svgList.style.borderColor = "#aaa";
    });

    element.svgList.addEventListener("dragenter", (e) => {
      e.preventDefault();
      element.svgList.style.borderColor = "#33cc33";
    });

    element.svgList.addEventListener("dragleave", (e) => {
      e.preventDefault();
      element.svgList.style.borderColor = "#ccc";
    });

    element.svgList.addEventListener("drop", (e) => {
      e.preventDefault();
      element.svgList.style.borderColor = "#ccc";

      const file = e.dataTransfer.files[0];
      if (!file) return;

      if (file.type === "image/svg+xml") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const svgText = e.target.result;
          renderSVGToCanvas(svgText);
        };
        reader.readAsText(file);
      } else {
        alert("SVG 파일을 업로드하세요.");
      }
    });
  })();
})();
