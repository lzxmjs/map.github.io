mapboxgl.accessToken = 'pk.eyJ1Ijoid290dnVtIiwiYSI6ImNsdDAxcW93ODBzcTQya3BoYXUxMHZ2ZXgifQ.2QD6GwmrQiZQNpV5qaSUdg';
var initialCenter = [118.796877, 32.060255]; // 南京的中心点
var initialZoom = 12;
var initialPitch = 45;
var initialBearing = -17.6;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/wotvum/clxdbp0fv000f01r26duo81t2',
    center: initialCenter,
    zoom: initialZoom,
    pitch: initialPitch,
    bearing: initialBearing
});

map.on('load', () => {
    // 确保所有图层在初始加载时隐藏
    hideAllLayers();
});

function showOptions(layer) {
    hideAllLayers();
    document.getElementById('main-buttons').classList.add('hidden');
    document.getElementById(layer + '-options').classList.remove('hidden');
    map.setLayoutProperty(layer, 'visibility', 'visible');
}

function showSubOptions(layer, type) {
    document.getElementById(layer + '-options').classList.add('hidden');
    var subOptionsId = layer + '-suboptions-' + type;
    document.getElementById(subOptionsId).classList.remove('hidden');
}

function flyToRoute(layer, choice) {
    // 根据choice设置飞行位置，这里只是示例，请根据实际情况设置坐标
    const coordinates = {
        '上海路': [118.769, 32.0568],
        '颐和路': [118.762, 32.0643],
        '新街口': [118.781, 32.0451],
        '燕雀湖--梧桐大道': [118.824, 32.056],
        '紫峰大厦--鸡鸣寺--玄武湖':[118.791, 32.063],
        '大行宫--南京博物馆': [118.798, 32.0424],
        '1912街区':[118.791,32.0463],
        '科巷':[118.791,32.041],
        '张府园--大香炉':[118.778,32.0329],
        '老门西--水西门':[118.77,32.0217],
        '夫子庙--熙南里--老门东': [118.778, 32.0225],
        '滨江风光':[118.739,32.1064],
        '汤山佘村':[118.924,31.9841],
        '百家湖':[118.816,31.9339],
        '侵华日军南京大屠杀遇难同胞纪念馆--绿博园':[118.716,32.0141]
    };

    map.flyTo({
        center: coordinates[choice],
        zoom: 15,
        pitch: 0,  // 设置俯视视角
        bearing: 0
    });
}

function hideAllLayers() {
    const layers = ['gulou', 'xuanwu', 'qinhuai','pukou','jiangning','jianye'];
    layers.forEach(layer => {
        map.setLayoutProperty(layer, 'visibility', 'none');
    });
}

function resetView() {
    // 恢复地图初始视角
    map.flyTo({
        center: initialCenter,
        zoom: initialZoom,
        pitch: initialPitch,
        bearing: initialBearing
    });
    // 隐藏所有子选项和子子选项
    const allOptions = document.querySelectorAll('.buttonsROAD');
    allOptions.forEach(option => option.classList.add('hidden'));
    // 显示主选项
    document.getElementById('main-buttons').classList.remove('hidden');
    hideAllLayers(); // 确保所有图层隐藏
}

var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving',
    alternatives: false,
    geometries: 'geojson',
    controls: { instructions: true }
});

document.getElementById('mapbox-directions').appendChild(directions.onAdd(map));

// 设置初始中心和缩放级别的按钮
var resetViewButton = document.createElement('button');
resetViewButton.textContent = '复原';
resetViewButton.className = 'resetViewButton'; // 使用 CSS 类

document.body.appendChild(resetViewButton);

resetViewButton.addEventListener('click', resetView);
