document.addEventListener('DOMContentLoaded', function () {
    // #region 添加滚动监听
    window.addEventListener('scroll', function() {
        const topNav = document.querySelector('.Top-Nav');
        const topLogo = document.querySelector('#TopLogo');
        const navList = document.querySelectorAll('#NavText');
        if (window.scrollY > 0) {
            topNav.classList.add('scrolled');
            topLogo.classList.add('scrolled');
            navList.forEach((navList) => {
                navList.classList.add('scrolled');
            });
        } 
        else {
            topNav.classList.remove('scrolled');
            topLogo.classList.remove('scrolled');
            navList.forEach((navList) => {
                navList.classList.remove('scrolled');
            });
        }
    });
    // #endregion 添加滚动监听

    
    // 歌曲播放功能
    const tracks = document.querySelectorAll('.Track');
    const playButtons = document.querySelectorAll('.PlayButton');
    const audioElements = document.querySelectorAll('audio');
    
    // 高亮活跃的歌曲
    const highlightTrack = (trackElement) => {
        tracks.forEach(track => {
            track.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
            track.style.backgroundColor = '';
            track.style.paddingLeft = '1rem';
        });
        
        if (trackElement) {
            trackElement.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
            trackElement.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            trackElement.style.paddingLeft = '1.5rem';
        }
    };
    
    playButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const audio = this.nextElementSibling;
            const track = this.closest('.Track');
            
            // 停止所有其他播放中的音频
            audioElements.forEach((otherAudio, otherIndex) => {
                if (otherIndex !== index && !otherAudio.paused) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                    playButtons[otherIndex].src = './img/播放器_播放.svg';
                }
            });
            
            // 取消高亮所有轨道
            highlightTrack(null);
            
            // 切换当前音频的播放状态
            if (audio.paused) {
                audio.play();
                this.src = './img/暂停.svg';
                highlightTrack(track);
            } else {
                audio.pause();
                audio.currentTime = 0;
                this.src = './img/播放器_播放.svg';
                track.style.backgroundColor = '';
                track.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
            }
            
            // 音频播放结束时
            audio.addEventListener('ended', function() {
                button.src = './img/播放器_播放.svg';
                track.style.backgroundColor = '';
                track.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
                track.style.paddingLeft = '1rem';
            });
        });
    });
}); 