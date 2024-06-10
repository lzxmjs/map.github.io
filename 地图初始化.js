mapboxgl.accessToken = 'pk.eyJ1IjoieGl1eXVhbnRhbiIsImEiOiJjbHRmZm94ZDUwYWo4MmxyejJscXd0Y2RmIn0.7ldsCfaUSdT8xmTdBwpx_Q';

var initialCenter = [118.784445, 32.035036];
var initialZoom = 12;
var initialPitch = 45;
var initialBearing = -17.6;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/xiuyuantan/clw4z7wxh024801rjczu94zn0',
    center: initialCenter, // 修改后的初始中心点
    zoom: initialZoom, // 初始缩放级别
    pitch: initialPitch, // 倾斜角度
    bearing: initialBearing // 地图旋转角度
});

var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving',
    alternatives: false,
    geometries: 'geojson',
    controls: { instructions: true, inputs: false }
});


map.addControl(directions, 'top-right');

var start = document.getElementById('start');
var end = document.getElementById('end');
var routeButton = document.getElementById('route-button');
var resetViewButton = document.getElementById('reset-view-button');

routeButton.addEventListener('click', function () {
    var startLocation = start.value;
    var endLocation = end.value;

    if (startLocation && endLocation) {
        directions.setOrigin(startLocation);
        directions.setDestination(endLocation);

        map.flyTo({ pitch: 0, bearing: 0 });
    } else {
        alert('请填写起点和终点！');
    }
});

resetViewButton.addEventListener('click', function () {
    map.flyTo({ 
        center: initialCenter, 
        zoom: initialZoom, 
        pitch: initialPitch, 
        bearing: initialBearing 
    });
});

var driveModeButton = document.getElementById('drive-mode');
var walkModeButton = document.getElementById('walk-mode');
var transitModeButton = document.getElementById('transit-mode');

driveModeButton.addEventListener('click', function () {
    directions.setProfile('mapbox/driving');
    driveModeButton.style.backgroundColor = '#005f7a';
    walkModeButton.style.backgroundColor = '#0078A8';
    transitModeButton.style.backgroundColor = '#0078A8';
});

walkModeButton.addEventListener('click', function () {
    directions.setProfile('mapbox/walking');
    walkModeButton.style.backgroundColor = '#005f7a';
    driveModeButton.style.backgroundColor = '#0078A8';
    transitModeButton.style.backgroundColor = '#0078A8';
});

transitModeButton.addEventListener('click', function () {
    directions.setProfile('mapbox/cycling'); // Mapbox currently doesn't support public transit, so using cycling as an example
    transitModeButton.style.backgroundColor = '#005f7a';
    driveModeButton.style.backgroundColor = '#0078A8';
    walkModeButton.style.backgroundColor = '#0078A8';
});

resetViewButton.addEventListener('click', function () {
    map.flyTo({
        center: initialCenter,
        zoom: initialZoom,
        pitch: initialPitch,
        bearing: initialBearing
    });
});

document.getElementById('driving-button').addEventListener('click', function() {
    directions.setProfile('mapbox/driving');
});

document.getElementById('walking-button').addEventListener('click', function() {
    directions.setProfile('mapbox/walking');
});

document.getElementById('cycling-button').addEventListener('click', function() {
    directions.setProfile('mapbox/cycling');
});
var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving',
    alternatives: false,
    geometries: 'geojson',
    controls: { instructions: true }
});

map.addControl(directions, 'top-right');

var start = document.getElementById('suggestIdStart');
var end = document.getElementById('suggestIdEnd');
var routeButton = document.getElementById('route-button');
var resetViewButton = document.getElementById('reset-view-button');


document.getElementById('driving-button').addEventListener('click', function() {
    directions.setProfile('mapbox/driving');
});

document.getElementById('walking-button').addEventListener('click', function() {
    directions.setProfile('mapbox/walking');
});

document.getElementById('cycling-button').addEventListener('click', function() {
    directions.setProfile('mapbox/cycling');
});