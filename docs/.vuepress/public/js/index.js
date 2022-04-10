window.addEventListener('load', () => {
    const selectDom = document.createElement('select');
    selectDom.className = 'page-theme';
    const options = `<option>白天</option><option>晚上</option>`;
    selectDom.innerHTML = options;
    const themeData = localStorage.getItem('themeData');
    if (themeData) {
        const { themeIndex, themeName } = JSON.parse(themeData);
        selectDom.selectedIndex = parseInt(themeIndex) - 1;
        themeChange(themeName);
    }
    selectDom.addEventListener('change', e => themeChange(e.target.value));
    const box = document.getElementsByClassName('search-box')[0];
    box.parentNode.insertBefore(selectDom, box);
})

function themeChange(themeName) {
    let themeIndex = 1;
    switch (themeName) {
        case '白天':
            setBodyClass('');
            break;
        case '晚上':
            setBodyClass('theme-night');
            themeIndex = 2;
            break;
        default:
            break;
    }
    localStorage.setItem('themeData', JSON.stringify({ themeName, themeIndex }));
}

function setBodyClass(className) {
    document.body.className = className;
    document.documentElement.className = className;
}