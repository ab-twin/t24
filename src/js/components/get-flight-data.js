import config from '../config';

//Функция подгрузки данных с сайта
function getFlightData(text = '') {
    if (!text) {
        return;
    }

    return fetch(config.getFlightUrl + text)
        .then(response => response.json());
}

//Функция расчета дистанции межжду двумя координатами
function getDistanceFromLatLonInKm(lat1, lon1, lat2 = config.lat, lon2 = config.lon) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Math.floor(d * 10) / 10;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

//Функция перерасчета данных в нужную систему
function mapData(data) {
    const result = data;
    result[4] = Math.floor(data[4] / 3.2808);
    result[5] = Math.floor(1.852 * data[5]);
    return result;
}

export default {
    getFlightData,
    getDistanceFromLatLonInKm,
    mapData
}