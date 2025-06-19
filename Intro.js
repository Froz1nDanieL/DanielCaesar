document.addEventListener('DOMContentLoaded', function () {
    //#region 介绍图片切换
    const introImg = document.querySelector('.introIMG img');
    const textContents = [
        [
            'Brief Introduction',
            'Ashton Dumar Norwill Simmonds(born April 5, 1995), known professionally as Daniel Caesar, is a Canadian singer and songwriter.',
            'Starting his career independently, he released EPs like "Praise Break" in 2014 and "Pilgrim\'s Paradise" in 2015. His debut album "Freudian" in 2017 brought him Grammy nominations. He won the Best R&B Performance at the 61st Grammy Awards for "Best Part". His other albums include "Case Study 01" (2019) and "NEVER ENOUGH" (2023).',
            'In 2021, he joined Justin Bieber on "Peaches", which became his first No.1 on the Billboard Hot 100. His music blends soul, gospel, and electronic elements, with lyrics exploring religion, philosophy, and love.'
        ],
        [
            'Career',
            'In 2014, at the age of 19, he independently released his debut EP Praise Break. The EP was well-received and ranked 19th on Rolling Stone\'s "20 Best R&B Albums of 2014".',
            'In 2015, he released his second EP Pilgrim\'s Paradise. Although not an immediate commercial success, tracks like "Streetcar" from this EP became fan favorites.',
            'On August 25, 2017, Caesar released his debut album Freudian, which includes the singles "Get You", "We Find Love", and "Blessed". The album was a shortlisted finalist for the 2018 Polaris Music Prize. At the 60th Annual Grammy Awards, Caesar received two nominations for Best R&B Album and Best R&B Performance for "Get You".'
        ],
        [
            'Artistry',
            'Caesar\'s music is influenced by soul and gospel. His music draws from his childhood experiences and integrates them with R&B and electronics, while his lyrics explore subjects of religion, philosophy and unrequited love.',
            'In his music, he often references concepts of philosophy. His singing voice reshapes itself on each track, often veering into a hushed, introspective lilting style.',
            'Caesar cites Frank Ocean, Kanye West, Beyoncé, and The Doors frontman Jim Morrison as musical and stylistic inspirations.'
        ]
    ];
    let currentText = 0;
    introImg.addEventListener('click', function () {
        const textParagraphs = document.querySelectorAll('.Text p');
        textParagraphs.forEach((paragraph, index) => {
            paragraph.style.opacity = 0;
        });
        setTimeout(() => {
            currentText = (currentText + 1) % textContents.length;
            textParagraphs.forEach((paragraph, index) => {
                paragraph.textContent = textContents[currentText][index];
                paragraph.style.opacity = 1;
            });
        }, 500);
    });
    //#endregion 介绍图片切换
    //#region 顶部轮播图切换
    const banners = document.querySelectorAll('.Top-Banner');
    const next = document.querySelector('.next-btn');
    const prev = document.querySelector('.prev-btn');
    
    const bannerImg =[
        "./img/Run.gif",
        "./img/toronto14.gif",
        "./img/dylm.gif"
    ]
    function preloadImages() {
        bannerImg.forEach(src => {
            new Image().src = src;
        });
    }
    preloadImages();
    let currentBanner = 0;
    const totalBanners = banners.length;

    function showBanner(index) {
        banners.forEach((banner, i) => {
            banner.style.opacity = i === index ? 1 : 0;
            banner.style.zIndex = i === index ? 1 : 0;
        });
        if(index !== 0) {
            document.querySelector('#b1').style.animation = 'none';
        }
    }
    function startAutoPlay() {
        autoPlayTimer = setInterval(() => {
            currentBanner = (currentBanner + 1) % totalBanners;
            showBanner(currentBanner);
        }, 3000);
    }
    function resetAuto() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }
    next.addEventListener('click', () => {
        currentBanner = (currentBanner + 1) % totalBanners;
        banners[currentBanner].opacity = 0;
        showBanner(currentBanner);
        resetAuto();
    });

    prev.addEventListener('click', () => {
        currentBanner = (currentBanner - 1 + totalBanners) % totalBanners;
        banners[currentBanner].opacity = 0;
        showBanner(currentBanner);
        resetAuto();
    });
    showBanner(0);
    startAutoPlay();
    //#endregion 顶部轮播图切换    
    //#region 音乐风格渐显效果
    const sections = document.querySelectorAll('.Intro, .RNB, .Souls, .Gospel');
    
    function checkFade() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // 当元素进入视口时添加fade-in类
            if (sectionTop < windowHeight * 0.8) {
                section.classList.add('fade-in');
            }
        });
    }

    // 初始检查
    checkFade();
    
    // 添加滚动监听
    window.addEventListener('scroll', checkFade);
    //#endregion 音乐风格渐显效果
    //#region 音乐风格点击切换
    const rnbBlock = document.querySelector('.RNB');
    const soulsBlock = document.querySelector('.Souls');
    const gospelBlock = document.querySelector('.Gospel');

    // 定义三种样式属性
    const musicStyles = [
        {
            top: '0',
            zIndex: 3,
            width: '85%',
            height: '70%',
            transform: 'translateX(-50%) scale(1)',
            opacity: 1,
            border: '1vh solid #000000',
            showInfo: true
        },
        {
            top: '8vh',
            zIndex: 2,
            width: '80%',
            height: '65%',
            transform: 'translateX(-50%) scale(0.96) translateY(12px)',
            opacity: 0.7,
            border: '1vh solid #000000',
            showInfo: false
        },
        {
            top: '16vh',
            zIndex: 1,
            width: '75%',
            height: '60%',
            transform: 'translateX(-50%) scale(0.92) translateY(24px)',
            opacity: 0.5,
            border: '1vh solid #000000',
            showInfo: false
        }
    ];

    // 当前顺序，始终保持[最上, 中, 最下]
    let blockOrder = [rnbBlock, soulsBlock, gospelBlock];

    function applyMusicStyle() {
        blockOrder.forEach((block, idx) => {
            const style = musicStyles[idx];
            block.style.top = style.top;
            block.style.zIndex = style.zIndex;
            block.style.width = style.width;
            block.style.height = style.height;
            block.style.transform = style.transform;
            block.style.opacity = style.opacity;
            block.style.border = style.border;
            block.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            // 内容显示控制
            const info = block.querySelector('.styleInfo');
            if (info) info.style.display = style.showInfo ? 'flex' : 'none';
        });
    }
    applyMusicStyle();

    // 只允许点击最上层
    function onTopBlockClick() {
        // 依次顶替样式：最上->最下， 中->最上， 最下->中
        blockOrder = [blockOrder[1], blockOrder[2], blockOrder[0]];
        applyMusicStyle();
    }
    // 绑定事件（始终只绑定给最上层）
    function bindTopClick() {
        blockOrder.forEach(block => block.onclick = null);
        blockOrder[0].onclick = function() {
            onTopBlockClick();
            bindTopClick();
        };
    }
    bindTopClick();
    //#endregion 音乐风格点击切换
});
