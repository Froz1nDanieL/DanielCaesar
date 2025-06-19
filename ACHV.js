document.addEventListener('DOMContentLoaded', function() {
    const awardLists = document.querySelectorAll('.Award-List');

    awardLists.forEach(list => {
        list.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const showImg = this.querySelector('img');
            content.classList.toggle('active');
            this.classList.toggle('active');
            showImg.classList.toggle('active');
        });
    });
});