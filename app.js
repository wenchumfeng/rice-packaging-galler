// 轮播图相关变量
let currentSlide = 0;
let slideInterval;

// 选中的值
let selectedSeries = "bianzhidai";
let selectedSpec = "";

// 初始化规格选项
function initSpecOptions() {
  // 初始化系列按钮
  initSeriesButtons();
  // 初始化规格按钮
  updateSpecButtons();
}

// 初始化系列按钮
function initSeriesButtons() {
  const seriesButtons = document.getElementById("series-buttons");
  seriesButtons.innerHTML = "";
  
  const series = [
    { value: "bianzhidai", text: "编织袋" },
    { value: "suliaodai", text: "塑料袋" }
  ];
  
  series.forEach(item => {
    const button = document.createElement("button");
    button.className = `filter-button ${selectedSeries === item.value ? "active" : ""}`;
    button.textContent = item.text;
    button.onclick = () => {
      selectedSeries = item.value;
      // 更新按钮状态
      document.querySelectorAll("#series-buttons .filter-button").forEach(btn => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      // 更新规格按钮
      updateSpecButtons();
    };
    seriesButtons.appendChild(button);
  });
}

// 根据选择的系列动态更新规格按钮
function updateSpecButtons() {
  const specButtons = document.getElementById("spec-buttons");
  specButtons.innerHTML = "";
  
  // 根据系列设置对应的规格选项
  let specs = [];
  if (selectedSeries === "bianzhidai") {
    // 编织袋规格：25kg、15kg、10kg、5kg
    specs = ["25kg", "15kg", "10kg", "5kg"];
  } else if (selectedSeries === "suliaodai") {
    // 塑料袋规格：10kg、5kg、2.5kg、1kg、500g
    specs = ["10kg", "5kg", "2.5kg", "1kg", "500g"];
  }
  
  // 重置选中的规格
  selectedSpec = specs[0];
  
  // 添加规格按钮
  specs.forEach(spec => {
    const button = document.createElement("button");
    button.className = `filter-button ${selectedSpec === spec ? "active" : ""}`;
    button.textContent = spec;
    button.onclick = () => {
      selectedSpec = spec;
      // 更新按钮状态
      document.querySelectorAll("#spec-buttons .filter-button").forEach(btn => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
    };
    specButtons.appendChild(button);
  });
}

// 初始化轮播图
function initCarousel() {
  const carousel = document.getElementById("carousel");
  const indicators = document.getElementById("carousel-indicators");
  
  // 清除现有内容
  carousel.innerHTML = "";
  indicators.innerHTML = "";
  
  // 加载 cuxiao 文件夹中的所有图片
  const imgCount = 4; // 从目录结构中得知有 4 张图片
  
  for (let i = 1; i <= imgCount; i++) {
    const num = String(i).padStart(2, '0');
    const src = `images/cuxiao/${num}.jpg`;
    
    // 创建轮播项
    const carouselItem = document.createElement("div");
    carouselItem.className = "carousel-item";
    
    // 创建图片
    const img = document.createElement("img");
    img.src = src;
    img.alt = `热销产品 ${num}`;
    img.loading = "lazy";
    img.onclick = () => openLightbox(src, img.alt);
    
    carouselItem.appendChild(img);
    carousel.appendChild(carouselItem);
    
    // 创建指示器
    const indicator = document.createElement("div");
    indicator.className = "carousel-indicator";
    indicator.onclick = () => goToSlide(i - 1);
    indicators.appendChild(indicator);
  }
  
  // 设置初始状态
  updateIndicators();
  
  // 启动自动轮播
  startAutoSlide();
}

// 自动轮播
function startAutoSlide() {
  slideInterval = setInterval(() => {
    moveCarousel(1);
  }, 5000); // 每 5 秒切换一次
}

// 停止自动轮播
function stopAutoSlide() {
  clearInterval(slideInterval);
}

// 移动轮播图
function moveCarousel(direction) {
  const carousel = document.getElementById("carousel");
  const slideCount = carousel.children.length;
  
  currentSlide = (currentSlide + direction + slideCount) % slideCount;
  updateCarousel();
  updateIndicators();
  
  // 重置自动轮播
  stopAutoSlide();
  startAutoSlide();
}

// 跳转到指定幻灯片
function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
  updateIndicators();
  
  // 重置自动轮播
  stopAutoSlide();
  startAutoSlide();
}

// 更新轮播图位置
function updateCarousel() {
  const carousel = document.getElementById("carousel");
  const slideWidth = 100; // 百分比
  carousel.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
}

// 更新指示器状态
function updateIndicators() {
  const indicators = document.querySelectorAll(".carousel-indicator");
  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

function loadImages(){
  const series = selectedSeries;
  const spec = selectedSpec;
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  
  // 尝试加载多个图片文件（01.jpg, 02.jpg, 03.jpg...）
  for(let i=1; i<=10; i++){ // 最多尝试加载10张图片
    const num = String(i).padStart(2, '0');
    const src = `images/${series}/${spec}/${num}.jpg`;
    
    // 创建画廊项容器
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";
    
    // 创建图片
    const img = document.createElement("img");
    img.src = src;
    
    // 优化 alt 文本，使用中文名称
    const seriesName = series === "bianzhidai" ? "编织袋" : "塑料袋";
    img.alt = `${seriesName} ${spec} ${num}`;
    img.loading = "lazy";
    img.onclick = () => openLightbox(src, img.alt);
    img.onerror = () => {
      galleryItem.remove();
    };
    
    // 创建信息区域
    const itemInfo = document.createElement("div");
    itemInfo.className = "item-info";
    
    const itemTitle = document.createElement("div");
    itemTitle.className = "item-title";
    itemTitle.textContent = `${seriesName} ${spec}`;
    
    const itemMeta = document.createElement("div");
    itemMeta.className = "item-meta";
    itemMeta.textContent = `图片 ${num}`;
    
    itemInfo.appendChild(itemTitle);
    itemInfo.appendChild(itemMeta);
    
    galleryItem.appendChild(img);
    galleryItem.appendChild(itemInfo);
    
    gallery.appendChild(galleryItem);
  }
}

// 页面加载时初始化
window.onload = function() {
  initSpecOptions();
  initCarousel();
};

function openLightbox(src,caption){
  const lb=document.getElementById("lightbox");
  document.getElementById("lightbox-img").src=src;
  document.getElementById("caption").textContent=caption;
  lb.style.display="block";
}
function closeLightbox(){document.getElementById("lightbox").style.display="none";}