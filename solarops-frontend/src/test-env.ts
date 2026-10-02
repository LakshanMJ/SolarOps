document.body.insertAdjacentHTML(
  "beforeend",
  `<div style="position:fixed;top:0;left:0;z-index:99999;background:white;color:black;padding:20px;font-size:20px">
    API: ${import.meta.env.VITE_API_URL}
  </div>`
);