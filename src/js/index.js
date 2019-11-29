import DataFlight from './components/flight-data';


const search = document.querySelector('.search-input'); //Поле для ввода данных поиска самолетов, обновить строку поиска через Enter
const area = document.querySelector('.search-area'); //Сама строка поиска
const dataFlight = new DataFlight('.result-search');

search.addEventListener('keyup', evt => {
    let key = evt.keyCode;
    if (key === 13) {
        area.innerHTML = evt.target.value;
    }
})

    const runScript = () => {
    let text = area.innerText;
    if (true) {
        const promise = dataFlight.getData(text);
        promise
            .then(response => {
                dataFlight.setData(response);
                dataFlight.clearData();
                dataFlight.drowResult();
            })
            .catch(error => console.log(error));
    }
}
runScript();
setInterval(runScript,3000);