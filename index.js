document.addEventListener('DOMContentLoaded', function () {
    // #region 添加滚动监听
    window.addEventListener('scroll', function() {
        const topNav = document.querySelector('.Top-Nav');
        const topLogo=document.querySelector('#TopLogo');
        const navList=document.querySelectorAll('#NavText');
        if (window.scrollY > 0) {
            topNav.classList.add('scrolled');
            topLogo.classList.add('scrolled');
            navList.forEach((navList)=>{
            navList.classList.add('scrolled');
        })
        } 
        else {
            topNav.classList.remove('scrolled');
            topLogo.classList.remove('scrolled');
            navList.forEach((navList)=>{
            navList.classList.remove('scrolled');
        })
        }
    });
    // #endregion 添加滚动监听

    // 全局加载动画
    window.addEventListener('DOMContentLoaded', function() {
        // 禁止滚动
        document.body.style.overflow = 'hidden';
        // 创建加载动画DOM
        const loader = document.createElement('div');
        loader.id = 'global-loader';
        loader.innerHTML = `
            <div id="global-loader-logo-text">Daniel Caesar</div>
            <div id="global-loader-waves">
                <div class="loader-wave wave1">
                    <svg viewBox="0 0 420 16"><path class="wave-path" d="M0 8 Q35 0 70 8 T140 8 T210 8 T280 8 T350 8 T420 8"/></svg>
                </div>
                <div class="loader-wave wave2">
                    <svg viewBox="0 0 420 16"><path class="wave-path" d="M0 8 Q35 0 70 8 T140 8 T210 8 T280 8 T350 8 T420 8"/></svg>
                </div>
                <div class="loader-wave wave3">
                    <svg viewBox="0 0 420 16"><path class="wave-path" d="M0 8 Q35 0 70 8 T140 8 T210 8 T280 8 T350 8 T420 8"/></svg>
                </div>
            </div>
        `;
        document.body.appendChild(loader);
        // 等待所有资源加载完毕
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.classList.add('hide');
                // 恢复滚动
                document.body.style.overflow = '';
                setTimeout(() => loader.remove(), 1600);
            }, 800);
        });
    });
});