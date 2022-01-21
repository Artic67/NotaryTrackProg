import { getDefaultConfiguration } from "electron-compile";
import { drawDiagram } from "./diagram.js"

const { notification } = require('./notification.js');

let modalButton = document.querySelector('.modal-launch');
if(modalButton) {
    modalButton.addEventListener('click', () => {
        let model = document.querySelector('.modal');
        model.classList.add('is-active');
    })
}


let modalCross = document.querySelector('.close-modal');
if (modalCross) {
    modalCross.addEventListener('click', () => {
        let model = document.querySelector('.modal');
        model.classList.remove('is-active');
    })
}

let lb = document.querySelector('.cd-loading-bar');
let ab = document.querySelector('.actions-block');

function changePage(url, bool) {
    let lb = document.querySelector('.cd-loading-bar');
    let ab = document.querySelector('.actions-block');

    ab.classList.add('page-is-changing');
    lb.classList.add('page-is-changing');

    lb.classList.remove('nonedisplay');

    setTimeout(() => loadNewContent(url, bool), 1000);
    setTimeout(() => {if(lb) {lb.classList.toggle('nonedisplay'); lb.classList.remove('page-is-changing')}}, 2000);
}

async function changePageWA(url) {

    window.section = document.createElement('div');
    section.innerHTML = await fetchHtmlAsText(url);

    document.querySelector('main').innerHTML = section.querySelector('main').innerHTML;

    /*let animElems = document.querySelectorAll('.to-menu-trans-anim');
    for (let ael of animElems) {
        ael.addEventListener('click', function(event){
            event.preventDefault();
            let newPage = ael.getAttribute('href');
            changeBackPage(newPage, true);
        });
    }*/

    let scripts = section.querySelectorAll('main scr');
    if(scripts.length > 0) {
        for (let script of scripts) {
            let filename = script.getAttribute('src');

            if (!fileScript.hasOwnProperty(url)) { console.error(new Error(`FileScript object doesn't have this url: ${url}`)); return; }

            fileScript[url](filename, script);

        }
    }
}

function changeBackPage(url, bool) {
    let lb = document.querySelector('.cd-loading-bar');

    lb.classList.remove('page-is-changing');
    lb.classList.remove('nonedisplay');
    lb.classList.add('page-is-back-changing');


    setTimeout(() => loadMainContent(url, bool), 1000);
    setTimeout(() => {if(lb) lb.classList.toggle('nonedisplay');  lb.classList.remove('page-is-back-changing')}, 2000);
}

async function loadNewContent(url, bool) {
    let newSectionName = 'cd-'+url.replace('.html', '');

    window.section = document.createElement('div');

    section.classList.add(newSectionName);
    section.innerHTML = await fetchHtmlAsText(url);

    console.log('Main: ' + section.querySelector('main'));

    document.querySelector('main').innerHTML = section.querySelector('main').innerHTML;

    let animElems = document.querySelectorAll('.to-menu-trans-anim');
    for (let ael of animElems) {
        ael.addEventListener('click', function(event){
            event.preventDefault();
            let newPage = ael.getAttribute('href');
            changeBackPage(newPage, true);
        });
    }

    let scripts = section.querySelectorAll('main scr');
    if (scripts.length > 0) {
        for (let script of scripts) {
            let filename = script.getAttribute('src');

            if (!fileScript.hasOwnProperty(url)) {console.error(new Error(`FileScript object doesn't have this url: ${url}`)); return;}

            fileScript[url](filename, script);

        }
    }
}

async function loadMainContent(url, bool) {
    let newSectionName = 'cd-'+url.replace('.html', '');

    window.section = document.createElement('div');
    section.classList.add(newSectionName);
    section.innerHTML = await fetchHtmlAsText(url);


    document.querySelector('main').innerHTML = section.querySelector('main').innerHTML;

    let ab = document.querySelector('.actions-block');
    ab.classList.add('page-is-back-changing');
    setTimeout(() => ab.classList.remove('page-is-back-changing'), 1000);
    


    let animElems = document.querySelectorAll('.menu-trans-anim');
    for (let ael of animElems) {
        ael.addEventListener('click', function(event){
            event.preventDefault();
            let newPagelink = ael.getAttribute('href');
            changePage(newPagelink, true);
        });
    }

    let scripts = section.querySelectorAll('main scr');
    if(scripts.length > 0) {
        for (let script of scripts) {
            console.log(script);
            let filename = script.getAttribute('src');
            
            if (filename === "./diagram.js") {
                let file = require(filename);
                console.log(file);
                file.drawDiagram()
            } else {
                let file = require(filename);
                console.log(file);
                file.main();
            }
        }
    }
}

window.onload = function(){
    let animElems = document.querySelectorAll('.menu-trans-anim');
    for (let ael of animElems) {
        ael.addEventListener('click', function(event){
            event.preventDefault();
            let newPage = ael.getAttribute('href');
            changePage(newPage, true);
        });
    }
}

async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}

async function addRecordFunc(filename, script) {
    if (filename === './dbcontroller.js') {
        let scrquery = script.getAttribute('query');
        let db = require(filename);

        document.querySelector('.income-input').onchange = function(){
            document.querySelector('.real-income-input').value = document.querySelector('.income-input').value;
        }
        
        let dbdata = await db.DBController.getData(scrquery);
        const catSelector = document.querySelector('.select-cat');
        const subcatSelector = document.querySelector('.select-subcat');
        const serviceSelector = document.querySelector('.select-service');
        const incomeInput = document.querySelector('.income-input');
        const realIncomeInput = document.querySelector('.real-income-input');
        const dateInput = document.querySelector('.date-input');
        const dropOffInput = document.querySelector('.dropoff-input');

        for (let el of dbdata) {
            let option = document.createElement('option');
            option.innerText = el['Name'];
            option.value = el['Id'];
            catSelector.append(option);
        }

        const catSelectorChange = async () => {
            subcatSelector.innerHTML = '';
            serviceSelector.innerHTML = '';
            dbdata = await db.DBController.getData(`select * from SubCategories where CategoryId = ${catSelector.value}`);
            for (let el of dbdata) {
                let option = document.createElement('option');
                option.innerText = el['Name'];
                option.value = el['Id'];
                subcatSelector.append(option);
            }
            subcatSelectorChange();
        }

        const subcatSelectorChange = async () => {
            serviceSelector.innerHTML = '';
            console.log(subcatSelector.value);
            dbdata = await db.DBController.getData(`select * from Services where SubCategoryId = ${subcatSelector.value}`);
            console.log(dbdata);
            for (let el of dbdata) {
                let option = document.createElement('option');
                option.innerText = el['Name'];
                option.value = el['Id'];
                serviceSelector.append(option);
            }
        }

        catSelectorChange();

        catSelector.onchange = catSelectorChange;
        subcatSelector.onchange = subcatSelectorChange;

        let clickAllowed = true;

        document.querySelector('.addrecord-button').addEventListener('click',  async function() {

            if (
                serviceSelector.value != '' &&
                incomeInput.value != '' &&
                parseInt(incomeInput.value) != NaN &&
                realIncomeInput.value != '' &&
                parseInt(realIncomeInput.value) != NaN &&
                dateInput.value != '' &&
                clickAllowed == true
            ) {
                clickAllowed = false;
                console.log(clickAllowed);
                let nextid = await db.DBController.getData('select top 1 Id from log order by Id desc');
                let recordAdded = await db.DBController.writeData(`INSERT INTO Log (Id, ServiceId, RecordDate, Price, ActualPrice, DropOff) VALUES (${(nextid[0]['Id']+1)}, ${serviceSelector.value}, "${dateInput.value}", ${incomeInput.value}, ${realIncomeInput.value}, ${dropOffInput.checked})`);

                if (recordAdded) {
                    let link = document.querySelector('.addrecord-button').getAttribute('hreflink');
                    changeBackPage(link, true);
                }
            }
        });
    } else {
        let file = require(filename);
        console.log(file);
        file.main();
    }
}

async function changeRecordFunc(filename, script) {

    if (filename === './dbcontroller.js') {
        let scrquery = script.getAttribute('query');
        let db = require(filename);
        
        let dbdata = await db.DBController.getData(scrquery);
        const tbody = document.querySelector('table.table > tbody');

        console.log(JSON.stringify(dbdata));

        for (let row of dbdata) {
            let tr = document.createElement('tr');
            
            let date = new Date(row['RecordDate']);

            let day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
            let month = ((date.getMonth()+1) < 10) ? "0" + (date.getMonth()+1) : (date.getMonth()+1);
            let year = date.getFullYear();
            let datestring = `${day}.${month}.${year}`;
            row['RecordDate'] = datestring;

            tr.setAttribute('href', './changerecordtr.html');

            tr.addEventListener('click', function(){
                let newPage = tr.getAttribute('href');
                window.ChosenChangeId = tr.getAttribute('id');
                changePageWA(newPage);
            });

            tr.setAttribute('id', row['Id']);

            tr.classList.add('tabletr');

            for (let cell in row) {
                let td = document.createElement('td');
                td.innerHTML = row[cell];
                tr.append(td);
            }

            tbody.append(tr);
            console.log(row);
        }

    } else {
        let file = require(filename);
        console.log(file);
        file.main();
    }
}

async function changeRecordTrFunc(filename, script) {

    if (filename === './dbcontroller.js') {
        let scrquery = script.getAttribute('query');
        let db = require(filename);

        document.querySelector('.income-input').onchange = function(){
            document.querySelector('.real-income-input').value = document.querySelector('.income-input').value;
        }
        
        let dbdata = await db.DBController.getData(scrquery);
        const catSelector = document.querySelector('.select-cat');
        const subcatSelector = document.querySelector('.select-subcat');
        const serviceSelector = document.querySelector('.select-service');
        const incomeInput = document.querySelector('.income-input');
        const realIncomeInput = document.querySelector('.real-income-input');
        const dateInput = document.querySelector('.date-input');
        const dropOffInput = document.querySelector('.dropoff-input');

        for (let el of dbdata) {
            let option = document.createElement('option');
            option.innerText = el['Name'];
            option.value = el['Id'];
            catSelector.append(option);
        }
       

        const catSelectorChange = async () => {
            subcatSelector.innerHTML = '';
            serviceSelector.innerHTML = '';
            dbdata = await db.DBController.getData(`select * from SubCategories where CategoryId = ${catSelector.value}`);
            for (let el of dbdata) {
                let option = document.createElement('option');
                option.innerText = el['Name'];
                option.value = el['Id'];
                subcatSelector.append(option);
            }
            subcatSelectorChange();
        }

        const subcatSelectorChange = async () => {
            serviceSelector.innerHTML = '';
            console.log(subcatSelector.value);
            dbdata = await db.DBController.getData(`select * from Services where SubCategoryId = ${subcatSelector.value}`);
            console.log(dbdata);
            for (let el of dbdata) {
                let option = document.createElement('option');
                option.innerText = el['Name'];
                option.value = el['Id'];
                serviceSelector.append(option);
            }
        }

        //Choose category
        let dbRecord = await db.DBController.getData(`SELECT * FROM Log where Id = ${ChosenChangeId}
        `);

        let date = new Date(dbRecord[0]['RecordDate']);

        //Make normal Date

        let day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
        let month = ((date.getMonth()+1) < 10) ? "0" + (date.getMonth()+1) : (date.getMonth()+1);
        let year = date.getFullYear();
        let datestring = `${day}.${month}.${year}`;
        dbRecord[0]['RecordDate'] = datestring;

        //----------------
        
        let dbIds = await db.DBController.getData(`
        SELECT ft.Num AS Id, ft.SubCatId AS SubCatId, ft.CatId as CatId
        FROM (SELECT s.Id AS Num, s.Name AS Name, su.Id as SubCatId,su.Name AS SubCatName, su.CategoryId AS CatId FROM Services AS s LEFT JOIN SubCategories AS su ON s.SubCategoryId = su.Id) 
        AS ft LEFT JOIN Categories AS c ON ft.CatId = c.Id
        where ft.Num = ${dbRecord[0]['ServiceId']}
        `);
        console.log('-------------');
        console.log(ChosenChangeId);
        console.log(dbRecord[0]['ServiceId']);

        catSelector.value = dbIds[0]['CatId'];
        console.log(dbIds[0]['CatId']);
        await catSelectorChange();
        subcatSelector.value = dbIds[0]['SubCatId'];
        console.log(dbIds[0]['SubCatId']);
        await subcatSelectorChange();
        serviceSelector.value = dbIds[0]['Id'];
        console.log(dbIds[0]['Id']);
        console.log('-------------');
        
        //----------------
        // Writing other fields

        incomeInput.value = dbRecord[0]['Price'];
        realIncomeInput.value = dbRecord[0]['ActualPrice'];
        dateInput.value = dbRecord[0]['RecordDate'];
        dropOffInput.checked = dbRecord[0]['DropOff'];

        //catSelectorChange();

        catSelector.onchange = catSelectorChange;
        subcatSelector.onchange = subcatSelectorChange;

        document.querySelector('.changerecord-button').addEventListener('click',  async function() {

            if (
                serviceSelector.value != '' &&
                incomeInput.value != '' &&
                parseInt(incomeInput.value) != NaN &&
                realIncomeInput.value != '' &&
                parseInt(realIncomeInput.value) != NaN &&
                dateInput.value != ''
            ) {

                let recordUpdated = await db.DBController.writeData(`update Log
                set ServiceId = ${serviceSelector.value}, RecordDate = "${dateInput.value}", Price = ${incomeInput.value}, ActualPrice = ${realIncomeInput.value}, DropOff = ${dropOffInput.checked}
                where Id = ${ChosenChangeId}`);

                if (recordUpdated) {
                    let link = document.querySelector('.changerecord-button').getAttribute('hreflink');
                    changeBackPage(link, true);
                }
            }
        });
    } else {
        let file = require(filename);
        console.log(file);
        file.main();
    }
}

async function deleteRecordFunc(filename, script) {

    if (filename === './dbcontroller.js') {
        let scrquery = script.getAttribute('query');
        let db = require(filename);

        const setTable = async () => {
            let dbdata = await db.DBController.getData(scrquery);
            const tbody = document.querySelector('table.table > tbody');
    
            console.log(JSON.stringify(dbdata));
    
            for (let row of dbdata) {
                let tr = document.createElement('tr');
                
                let date = new Date(row['RecordDate']);
    
                let day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
                let month = ((date.getMonth()+1) < 10) ? "0" + (date.getMonth()+1) : (date.getMonth()+1);
                let year = date.getFullYear();
                let datestring = `${day}.${month}.${year}`;
                row['RecordDate'] = datestring;
    
                window.trToDelete = null;
    
                tr.addEventListener('click', function(){
                    window.trToDelete = tr.getAttribute('id');
                    let trlist = document.querySelectorAll('table.table > tbody > tr');
                    for (let trel of trlist) {
                        trel.classList.remove('selectedtr');
                    }
                    tr.classList.add('selectedtr');
    
                    console.log('trToDelete = ' + trToDelete);
                });
    
                tr.setAttribute('id', row['Id']);
    
                tr.classList.add('tabletr');
    
                for (let cell in row) {
                    let td = document.createElement('td');
                    td.innerHTML = row[cell];
                    tr.append(td);
                }
    
                tbody.append(tr);
                console.log(row);
            }
        }

        const clearTable = () => {
            document.querySelector('table.table > tbody').innerHTML = '';
        }

        const updateTable = async () => {
            clearTable();
            setTable();
        }

        setTable();

        let deletePopupCloseList = document.querySelectorAll('.close-delete-popup');
        for (let deletePopupClose of deletePopupCloseList) {
            deletePopupClose.addEventListener('click', function() {
                let deletePopup = document.querySelector('.delete-popup');
                deletePopup.classList.remove('is-active');
            });
        }


        document.querySelector('.deleterecord-button').addEventListener('click', function() {
            if (trToDelete) {
                let deletePopup = document.querySelector('.delete-popup');
                deletePopup.classList.add('is-active');
                console.log('is-active added');
            } else {
                console.error(new Error('Don`t choosed the record to delete!'));
                notification.raise('Не выбрана запись для удаления. Сначала выберите запись которую хотите удалить.');
            }
        });

        document.querySelector('.truly-deleterecord-button').addEventListener('click', async function() {
            let recordDeleted = await db.DBController.writeData(`delete from Log where Id = ${trToDelete}`);
            
            if (recordDeleted) {
                let deletePopup = document.querySelector('.delete-popup');
                deletePopup.classList.remove('is-active');
                updateTable();
            }
        });

    } else {
        let file = require(filename);
        console.log(file);
        file.main();
    }
}

function statFunc(filename, script) {
    if (filename === "./diagram.js") {
        let file = require(filename);
        console.log(file);
        file.drawDiagram()
    } else {
        let file = require(filename);
        console.log(file);
        file.main();
    }
}

const fileScript = {
    './addrecord.html' : addRecordFunc,
    './changerecord.html' : changeRecordFunc,
    './changerecordtr.html' : changeRecordTrFunc,
    './deleterecord.html' : deleteRecordFunc,
    './stat.html' : statFunc,
}