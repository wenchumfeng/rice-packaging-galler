// 初始化规格选项
function initSpecOptions() {
  updateSpecOptions();
}

// 根据选择的系列动态更新规格选项
function updateSpecOptions() {
  const series = document.getElementById("series").value;
  const specSelect = document.getElementById("spec");
  specSelect.innerHTML = "";
  
  // 根据系列设置对应的规格选项
  let specs = [];
  if (series === "bianzhidai") {
    // 编织袋规格：25kg、15kg、10kg、5kg
    specs = ["25kg", "15kg", "10kg", "5kg"];
  } else if (series === "suliaodai") {
    // 塑料袋规格：10kg、5kg、2.5kg、1kg、500g
    specs = ["10kg", "5kg", "2.5kg", "1kg", "500g"];
  }
  
  // 添加规格选项
  specs.forEach(spec => {
    const option = document.createElement("option");
    option.value = spec;
    option.textContent = spec;
    specSelect.appendChild(option);
  });
}

function loadImages(){
  const series = document.getElementById("series").value;
  const spec = document.getElementById("spec").value;
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  
  // 尝试加载多个图片文件（01.jpg, 02.jpg, 03.jpg...）
  let imageCount = 0;
  
  for(let i=1; i<=10; i++){ // 最多尝试加载10张图片
    const num = String(i).padStart(2, '0');
    const src = `images/${series}/${spec}/${num}.jpg`;
    const img = document.createElement("img");
    img.src = src;
    
    // 优化 alt 文本，使用中文名称
    const seriesName = series === "bianzhidai" ? "编织袋" : "塑料袋";
    img.alt = `${seriesName} ${spec} ${num}`;
    img.loading = "lazy";
    img.onclick = () => openLightbox(src, img.alt);
    img.onerror = () => {
      img.remove();
      // 如果没有图片加载成功，显示错误信息
      if(imageCount === 0 && i === 10) {
        const errorMsg = document.createElement("div");
        errorMsg.className = "error-message";
        errorMsg.textContent = `该规格（${spec}）暂无图片`;
        gallery.appendChild(errorMsg);
      }
    };
    img.onload = () => {
      imageCount++;
    };
    
    gallery.appendChild(img);
  }
}

// 页面加载时初始化规格选项
window.onload = initSpecOptions;
function openLightbox(src,caption){
  const lb=document.getElementById("lightbox");
  document.getElementById("lightbox-img").src=src;
  document.getElementById("caption").textContent=caption;
  lb.style.display="block";
}
function closeLightbox(){document.getElementById("lightbox").style.display="none";}