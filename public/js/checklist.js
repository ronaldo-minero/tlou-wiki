let CHECK_SVG = '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>';

document.addEventListener('DOMContentLoaded', function () {
    let items = document.querySelectorAll('.item');

    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function () {
            let check = this.querySelector('.item-check');

            if (check != null) {
                if (check.classList.contains('marcado')) {
                    check.classList.remove('marcado');
                    check.innerHTML = '';
                } else {
                    check.classList.add('marcado');
                    check.innerHTML = CHECK_SVG;
                }
            }
        });
    }
});
