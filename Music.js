document.addEventListener('DOMContentLoaded', function () {
    //#region 顶部轮播图切换
    const banners = document.querySelectorAll('.Top-Banner');
    const next = document.querySelector('.next-btn');
    const prev = document.querySelector('.prev-btn');
    
    const bannerImg =[
        "./img/Run.gif",
        "./img/toronto14.gif",
        "./img/dylm.gif"
    ]
    bannerImg.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    let currentBanner = 0;
    const totalBanners = banners.length;

    function showBanner(index) {
        banners.forEach((banner, i) => {
            banner.style.opacity = i === index ? 1 : 0;
            banner.style.zIndex = i === index ?  1 : 0;
        });
    }

    next.addEventListener('click', () => {
        currentBanner = (currentBanner + 1) % totalBanners;
        setTimeout(() => {
            banners[currentBanner].opacity = 0;
        }, 500);
            showBanner(currentBanner);
    });

    prev.addEventListener('click', () => {
        currentBanner = (currentBanner - 1 + totalBanners) % totalBanners;
        setTimeout(() => {
            banners[currentBanner].opacity = 0;
        }, 500);
        showBanner(currentBanner);
    });
    //#endregion 顶部轮播图切换
    //#region 控制音乐播放
    const PK = document.getElementsByClassName('PlayKey');
    const audioElements = document.getElementsByClassName('listAudio');
    const PB = document.getElementsByClassName('PlayButton');
    Array.from(PK).forEach(Key => {
        Key.addEventListener('click', function () {
            let audio = this.nextElementSibling;
            const currentLi = this.closest('.Single,li');

            Array.from(audioElements).forEach(otherAudio => {
                if (otherAudio !== audio) {
                    const otherLi = otherAudio.closest('.Single,li');   
                    if (!otherAudio.paused) {
                        otherAudio.pause();
                        otherAudio.currentTime = 0;
                        const otherPlayKey = otherAudio.previousElementSibling;
                        otherPlayKey.src = './img/播放器_播放.svg';
                        if (otherLi===otherPlayKey.closest('li')) {
                            otherLi.style.backgroundColor = '';
                        }
                        if (otherLi===otherPlayKey.closest('.Single')) {
                            otherPlayKey.textContent = 'Play';
                            otherPlayKey.style.backgroundColor = '';
                        }
                    }
                }
            });

            if (audio.paused) {
                this.src = './img/暂停.svg';
                audio.play();
                if (currentLi===this.closest('li')) {
                    currentLi.style.backgroundColor = 'rgb(0, 0, 0)';
                }
                if (currentLi===this.closest('.Single')) {
                    this.textContent = '| |';
                    this.style.backgroundColor = 'rgb(0, 0, 0,0.7)';
                }   
            } else {
                this.src = './img/播放器_播放.svg';
                audio.pause();
                audio.currentTime = 0;
                if (currentLi===this.closest('li')) {
                    currentLi.style.backgroundColor = '';
                }
                if (currentLi===this.closest('.Single')) {
                    this.textContent = 'Play';
                    this.style.backgroundColor = '';
                }   
            }

            audio.addEventListener('ended', function() {
                if (currentLi===Key.closest('li')) {
                    currentLi.style.backgroundColor = '';
                    Key.src = './img/播放器_播放.svg';
                }
                if (currentLi===Key.closest('.Single')) {
                    Key.textContent = 'Play';
                    Key.style.backgroundColor = '';
                }
            });
        });
    });
    //#endregion 控制音乐播放
    //#region 视频切换及播放
    const videoItems = document.querySelectorAll('.VideoItem');
    const fullscreenContainer = document.querySelector('.fullscreen-video-container');
    const closeVideoBtn = document.querySelector('.close-video-btn');

    // 为每个VideoItem添加鼠标交互
    videoItems.forEach((item) => {
        const videoInfo = item.querySelector('.VideoInfo');
        const playKey = item.querySelector('.PlayKey');
        const videoSrc = item.querySelector('.videoSRC').src;
        
        // 当鼠标进入VideoItem时，展开VideoInfo
        item.addEventListener('mouseenter', () => {
            videoInfo.classList.add('expanded');
        });
        
        // 当鼠标离开VideoItem时，收起VideoInfo
        item.addEventListener('mouseleave', () => {
            videoInfo.classList.remove('expanded');
        });
        
        playKey.addEventListener('click', () => {
            const video = document.createElement('video');
            video.src = videoSrc;
            video.controls = true;
            video.autoplay = true;
            
            fullscreenContainer.innerHTML = '';
            fullscreenContainer.appendChild(video);
            fullscreenContainer.appendChild(closeVideoBtn);
            fullscreenContainer.style.display = 'flex';
        });
    });

    closeVideoBtn.addEventListener('click', () => {
        fullscreenContainer.style.display = 'none';
        const video = fullscreenContainer.querySelector('video');
        if (video) {
            video.pause();
            video.remove();
        }
    });
    //#endregion 视频播放    
});