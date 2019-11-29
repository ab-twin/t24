import flightFunctions from './get-flight-data';

//Класс для работы с данными от сайта
export default class DataFlight {
    //Подгружаем класс элемента куда будут выводится данные
    constructor(data) {
        this.selector = document.querySelector(data);
    }

    //Записывает полученные данные с сайта
    setData(data) {
        this.data = data;
    }

    //Получаем данные с сайта
    getData(text) {
        return flightFunctions.getFlightData(text);
    }

    //Выводит результат на страницу
    drowResult() {
        this.sortData();
        this.getHtml();
        let table = document.createElement('table');
        table.classList.add('table');
        table.classList.add('table-striped');
        table.classList.add('tbl');
        table.appendChild(this.fragment);
        this.selector.append(table);
    }

    //Создает HTML разметку из данных
    getHtml() {
        let html = '';
        this.fragment = document.createDocumentFragment();
        let tr = document.createElement('tr');
        html = `<th>Название рейса</th>
                    <th>Коды аэропортов</th>
                    <th>Координаты</th>
                    <th>Расстоние до самолета</th>
                    <th>Направление движения</th>
                    <th>Высота полета</th>
                    <th>Скорость</th>`;
        tr.innerHTML = html;
        this.fragment.appendChild(tr);
        this.data_result.forEach(data => {
            let item = flightFunctions.mapData(data);
            let tr = document.createElement('tr');
            html = `<td>${item[13]}</td>
                    <td>${item[11]} -  ${item[12]}</td>
                    <td>${item[1]} ${item[2]}</td>
                    <td>${item[19]} км.</td>
                    <td>${item[3]} &#176;</td>
                    <td>${item[4]} км</td>
                    <td>${item[5]} км/ч</td>`;
            tr.innerHTML = html;
            this.fragment.appendChild(tr);
        })
    }

    //Сортирует полученные данные и отсеивает лишнее
    sortData() {
        let result = [];
        for (let key in this.data) {
            if (this.data[key].length === 19) {
                let buff = this.data[key];
                buff.push(flightFunctions.getDistanceFromLatLonInKm(this.data[key][1], this.data[key][2])) //получает растояние от самолета до точки отсчета
                result.push(buff);
                //Сама сортировка по полю расстояния до самолета
                for (let i = result.length - 1; i > 0; i--) {
                    debugger
                    if (result[i][19] < result[i - 1][19]) {
                        let buffer = result[i];
                        result[i] = result[i - 1];
                        result[i - 1] = buffer;
                    } else break;
                }
            }
        }

        this.data_result = result;
    }

    //Очищает поле данных
    clearData() {
        this.selector.innerHTML = '';
    }

}