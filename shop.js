document.addEventListener("DOMContentLoaded", function () {
    // 选择所有商品价格元素
    const priceElements = document.querySelectorAll(".GoodsContent p");
  
    // 为每个价格元素生成随机价格
    priceElements.forEach((element) => {
      // 生成 10 到 100 之间的随机价格
      const randomPrice = (Math.random() * (100 - 10) + 10).toFixed(2);
      element.textContent = `$ ${randomPrice}`;
    });
  });
  