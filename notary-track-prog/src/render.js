import { getDefaultConfiguration } from "electron-compile";
import { drawDiagram } from "./diagram.js";

const { notification } = require('./notification.js');
const { config } = require('./config.js');
const { writePDF } = require('./report.js');
const { loading } = require('./loading.js');

const db = require('./dbcontroller.js');

setMainClientsForDates(() => {
    let el = document.querySelector('.start-prog-loading');
    el.parentNode.removeChild(el);
});

// Coming soon

let comingSoonArr = document.querySelectorAll('.coming-soon');
for (let el of comingSoonArr) {
    el.addEventListener('click', () => {
        notification.raise('Цей функціонал буде доданий найближчим часом :)', 'is-info')
    })
}

// Coming soon

// Main Functions Block --------------


/*
let modalButton = document.querySelector('.modal-launch');
if(modalButton) {
    modalButton.addEventListener('click', () => {
        let modal = document.querySelector('.modal');
        modal.classList.add('is-active');
    })
}


let modalCloses = document.querySelectorAll('.close-modal');
if (modalCloses) {
    for (let el of modalCloses) {
        el.addEventListener('click', () => {
            let settingsModal = document.querySelector('.modal');
            settingsModal.classList.remove('is-active');
        })
    }
}

let applySettingsButton = document.querySelector('.apply-settings');
*/

// Main Functions Block End -----------------

let lb = document.querySelector('.cd-loading-bar');
let ab = document.querySelector('.actions-block');
let lbg = document.querySelector('.loading-background');

function changePage(url, bool) {
    let ab = document.querySelector('.actions-block');

    ab.classList.add('page-is-changing');

    lb.classList.add('lb-fade-in-forward');
    lb.classList.remove('nonedisplay');

    setTimeout(() => { loadNewContent(url, bool); lb.classList.add('at-top'); lb.classList.remove('lb-fade-in-forward'); lbg.classList.add('nonedisplay'); loading.start(); }, 1000);
    //setTimeout(() => {if(lb) {lb.classList.toggle('nonedisplay'); lb.classList.remove('page-is-changing')}}, 2000);
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
    if (scripts.length > 0) {
        for (let script of scripts) {
            let filename = script.getAttribute('src');

            if (!fileScript.hasOwnProperty(url)) { console.error(new Error(`FileScript object doesn't have this url: ${url}`)); return; }

            fileScript[url](filename, script);

        }
    }
}

function changeBackPage(url, bool) {

    lb.classList.add('lb-fade-in-backward');
    lb.classList.remove('nonedisplay');


    setTimeout(() => { loadMainContent(url, bool); lb.classList.remove('lb-fade-in-backward'); }, 1000);
    //setTimeout(() => {if(lb) lb.classList.toggle('nonedisplay');  lb.classList.remove('page-is-back-changing')}, 2000);
}

async function loadNewContent(url, bool) {

    window.section = document.createElement('div');

    section.innerHTML = await fetchHtmlAsText(url);

    console.log('Main: ' + section.querySelector('main'));

    document.querySelector('main').innerHTML = section.querySelector('main').innerHTML;

    let animElems = document.querySelectorAll('.to-menu-trans-anim');
    for (let ael of animElems) {
        ael.addEventListener('click', function (event) {
            event.preventDefault();
            let newPage = ael.getAttribute('href');
            changeBackPage(newPage, true);
        });
    }

    let scripts = section.querySelectorAll('main scr');
    if (scripts.length > 0) {
        for (let script of scripts) {
            let filename = script.getAttribute('src');

            if (!fileScript.hasOwnProperty(url)) { console.error(new Error(`FileScript object doesn't have this url: ${url}`)); return; }

            console.log(url);
            console.log(fileScript[url]);

            let functionEnded = await fileScript[url](filename, script);

            console.log(functionEnded);

            if (functionEnded) {
                if (lb) {
                    loading.end();
                    lbg.classList.remove('nonedisplay');
                    lb.classList.add('lb-fade-out-forward');
                    setTimeout(() => { lb.classList.add('nonedisplay'); lb.classList.remove('lb-fade-out-forward'); }, 1000);
                }
            }

        }
    } else {
        if (!fileScript.hasOwnProperty(url)) { console.error(new Error(`FileScript object doesn't have this url: ${url}`)); return; }

        console.log(url);

        console.log(fileScript[url]);

        let functionEnded = await fileScript[url]();

        console.log(functionEnded);

        if (functionEnded) {
            if (lb) {
                loading.end();
                lbg.classList.remove('nonedisplay');
                lb.classList.add('lb-fade-out-forward');
                setTimeout(() => { lb.classList.add('nonedisplay'); lb.classList.remove('lb-fade-out-forward'); }, 1000);
            }
        }
    }
}

async function loadMainContent(url, bool) {

    // Changing page content

    window.section = document.createElement('div');
    section.innerHTML = await fetchHtmlAsText(url);

    document.querySelector('main').innerHTML = section.querySelector('main').innerHTML;

    // End of Changing page content

    let ab = document.querySelector('.actions-block');

    ab.classList.add('page-is-back-changing');
    lb.classList.add('lb-fade-out-backward');
    lb.classList.remove('at-top');
    setTimeout(() => { ab.classList.remove('page-is-back-changing'); lb.classList.remove('lb-fade-out-backward'); lb.classList.add('nonedisplay'); }, 1000);



    let animElems = document.querySelectorAll('.menu-trans-anim');
    for (let ael of animElems) {
        ael.addEventListener('click', function (event) {
            event.preventDefault();
            let newPagelink = ael.getAttribute('href');
            changePage(newPagelink, true);
        });
    }

    setMainClientsForDates();

    // Coming soon
    let comingSoonArr = document.querySelectorAll('.coming-soon');
    for (let el of comingSoonArr) {
        el.addEventListener('click', () => {
            notification.raise('Цей функціонал буде доданий найближчим часом :)', 'is-info')
        })
    }
    // Coming soon

    let scripts = section.querySelectorAll('main scr');
    if (scripts.length > 0) {
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

window.onload = function () {
    let animElems = document.querySelectorAll('.menu-trans-anim');
    for (let ael of animElems) {
        ael.addEventListener('click', function (event) {
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

        document.querySelector('.income-input').onchange = function () {
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

        const contractSumInput = document.querySelector('.contruct-sum-input');
        const pdfoInput = document.querySelector('.pdfo-input');
        const militaryLevyInput = document.querySelector('.military-levy-input');
        const pensionFundPaymentInput = document.querySelector('.pension-fund-payment-input');

        const contractSumDiv = document.querySelector('.contruct-sum-div');
        const pdfoDiv = document.querySelector('.pdfo-div');
        const militaryLevyDiv = document.querySelector('.military-levy-div');
        const pensionFundPaymentDiv = document.querySelector('.pension-fund-payment-div');

        const commentInput = document.querySelector('.comment-input');
        const taxFreeInput = document.querySelector('.tax-free-input');
        const freedomReasonSelect = document.querySelector('.freedom-reason-select');

        const commentDiv = document.querySelector('.comment-div');
        const taxFreeDiv = document.querySelector('.tax-free-div');
        const freedomReasonDiv = document.querySelector('.freedom-reason-div');

        taxFreeInput.onchange = function () {
            if (taxFreeInput.checked) {
                freedomReasonDiv.classList.remove('nonedisplay');
                pensionFundPaymentInput.value = '';
                pensionFundPaymentInput.setAttribute('disabled', '');
                pensionFundPaymentInput.setAttribute('placeholder', 'Недоступно');
            } else {
                freedomReasonDiv.classList.add('nonedisplay');
                pensionFundPaymentInput.removeAttribute('disabled');
                pensionFundPaymentInput.removeAttribute('placeholder');
            }
        }


        for (let el of dbdata) {
            let option = document.createElement('option');
            option.innerText = el['Name'];
            option.value = el['Id'];
            catSelector.append(option);
        }

        const frReasons = [
            { 'Id': 0, 'Name': 'Перебування у черзі на одержання житла' },
            { 'Id': 1, 'Name': 'Придбання житла вперше' },
        ];

        for (let el of frReasons) {
            let option = document.createElement('option');
            option.innerText = el['Name'];
            option.value = el['Id'];
            freedomReasonSelect.append(option);
        }

        const catSelectorChange = async () => {

            let hideThreeFields = threefieldsCheck(catSelector.value);

            if (hideThreeFields) {
                contractSumDiv.classList.add('nonedisplay');
                pdfoDiv.classList.add('nonedisplay');
                militaryLevyDiv.classList.add('nonedisplay');

                contractSumInput.value = '';
                pdfoInput.value = '';
                militaryLevyInput.value = '';
            } else {
                contractSumDiv.classList.remove('nonedisplay');
                pdfoDiv.classList.remove('nonedisplay');
                militaryLevyDiv.classList.remove('nonedisplay');
            }

            subcatSelector.innerHTML = '';
            serviceSelector.innerHTML = '';
            dbdata = await db.DBController.getData(`select * from SubCategories where CategoryId = ${catSelector.value}`);
            for (let el of dbdata) {
                let option = document.createElement('option');
                option.innerText = el['Name'];
                option.value = el['Id'];
                subcatSelector.append(option);
            }
            console.log('CatSelector: ' + catSelector.value);

            subcatSelectorChange();
        }

        const subcatSelectorChange = async () => {

            let hidePensionFundField = pensionFundFieldCheck(subcatSelector.value);

            if (hidePensionFundField) {
                pensionFundPaymentDiv.classList.add('nonedisplay');
                taxFreeDiv.classList.add('nonedisplay');
                freedomReasonDiv.classList.add('nonedisplay');

                pensionFundPaymentInput.value = '';
                taxFreeInput.checked = false;
                //freedomReasonSelect.innerHTML = '';
            } else {
                pensionFundPaymentDiv.classList.remove('nonedisplay');
                taxFreeDiv.classList.remove('nonedisplay');
            }

            serviceSelector.innerHTML = '';
            dbdata = await db.DBController.getData(`select * from Services where SubCategoryId = ${subcatSelector.value}`);
            console.log(dbdata);

            console.log('SubcatSelector: ' + subcatSelector.value);

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
        serviceSelector.onchange = function () { console.log('ServiceSelector: ' + serviceSelector.value) };

        let clickAllowed = true;


        catSelector.onchange = catSelectorChange;
        subcatSelector.onchange = subcatSelectorChange;


        document.querySelector('.addrecord-button').addEventListener('click', async function () {

            if (
                serviceSelector.value != '' &&
                incomeInput.value != '' &&
                parseInt(incomeInput.value) != NaN &&
                realIncomeInput.value != '' &&
                parseInt(realIncomeInput.value) != NaN &&
                dateInput.value != '' &&
                clickAllowed == true
            ) {
                let freedomReasonSelectValue = freedomReasonSelect.value;
                let taxFreeInputChecked = taxFreeInput.checked;


                if (!taxFreeInputChecked) {
                    freedomReasonSelectValue = '';
                }

                clickAllowed = false;
                loading.start();

                let nextid = await db.DBController.getData('select top 1 Id from log order by Id desc');
                console.log(nextid);
                if (nextid.length === 0) {
                    nextid = [{
                        'Id': 0
                    }];
                }
                let recordAdded = await db.DBController.writeData(`INSERT INTO Log (Id, ServiceId, RecordDate, Price, ActualPrice, DropOff, ContractSum, PersonalIncomeTax, MilitaryLevy, PensionFundPayment, PensionTaxFree, Comment) VALUES (${(nextid[0]['Id'] + 1)}, ${serviceSelector.value}, "${dateInput.value}", ${incomeInput.value}, ${realIncomeInput.value}, ${dropOffInput.checked}, ${contractSumInput.value || 'NULL'}, ${pdfoInput.value || 'NULL'}, ${militaryLevyInput.value || 'NULL'}, ${pensionFundPaymentInput.value || 'NULL'}, ${freedomReasonSelectValue || 'NULL'}, "${commentInput.value || ''}")`);

                if (recordAdded) {
                    loading.end();
                    let link = document.querySelector('.addrecord-button').getAttribute('hreflink');
                    notification.raise('Запис успішно додано', 'is-primary');
                    changeBackPage(link, true);
                }
            }
        });
    } else {
        let file = require(filename);
        console.log(file);
        file.main();
    }

    return true;
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

            // START Normal Date

            let date = new Date(row['RecordDate']);

            let day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
            let month = ((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
            let year = date.getFullYear();
            let datestring = `${day}.${month}.${year}`;
            row['RecordDate'] = datestring;

            // END Normal Date

            // START Check Service name

            let name = row['Name'];
            if (name.length > 46) {
                name = name.slice(0, 42) + '... ';
            }

            row['Name'] = name;

            // END Check Service name

            // START Drop Off normal name

            const dropOffNames = {
                true: 'Так',
                false: 'Ні'
            };

            let dropOffName = row['DropOff'];

            row['DropOff'] = dropOffNames[dropOffName];

            // END Drop Off normal name

            // START Normal Tax Freedom Reason

            const TaxFreedomReasons = {
                0: 'Черга на одержання',
                1: 'Придбання вперше',
            };

            if (row['PensionTaxFree'] !== null) {
                let reason = TaxFreedomReasons[row['PensionTaxFree']];
                row['PensionTaxFree'] = reason;
            }

            // END Normal Tax Freedom Reason

            tr.setAttribute('href', './changerecordtr.html');

            tr.addEventListener('click', function () {
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

    return true;
}

async function changeRecordTrFunc(filename, script) {

    if (filename === './dbcontroller.js') {
        let scrquery = script.getAttribute('query');
        let db = require(filename);

        loading.start();

        document.querySelector('.income-input').onchange = function () {
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

        const contractSumInput = document.querySelector('.contruct-sum-input');
        const pdfoInput = document.querySelector('.pdfo-input');
        const militaryLevyInput = document.querySelector('.military-levy-input');
        const pensionFundPaymentInput = document.querySelector('.pension-fund-payment-input');

        const contractSumDiv = document.querySelector('.contruct-sum-div');
        const pdfoDiv = document.querySelector('.pdfo-div');
        const militaryLevyDiv = document.querySelector('.military-levy-div');
        const pensionFundPaymentDiv = document.querySelector('.pension-fund-payment-div');

        const commentInput = document.querySelector('.comment-input');
        const taxFreeInput = document.querySelector('.tax-free-input');
        const freedomReasonSelect = document.querySelector('.freedom-reason-select');

        const commentDiv = document.querySelector('.comment-div');
        const taxFreeDiv = document.querySelector('.tax-free-div');
        const freedomReasonDiv = document.querySelector('.freedom-reason-div');

        taxFreeInput.onchange = function () {
            if (taxFreeInput.checked) {
                freedomReasonDiv.classList.remove('nonedisplay');
                pensionFundPaymentInput.value = '';
                pensionFundPaymentInput.setAttribute('disabled', '');
                pensionFundPaymentInput.setAttribute('placeholder', 'Недоступно');
            } else {
                freedomReasonDiv.classList.add('nonedisplay');
                pensionFundPaymentInput.removeAttribute('disabled');
                pensionFundPaymentInput.removeAttribute('placeholder');
            }
        }


        for (let el of dbdata) {
            let option = document.createElement('option');
            option.innerText = el['Name'];
            option.value = el['Id'];
            catSelector.append(option);
        }

        const frReasons = [
            { 'Id': 0, 'Name': 'Перебування у черзі на одержання житла' },
            { 'Id': 1, 'Name': 'Придбання житла вперше' },
        ];

        for (let el of frReasons) {
            let option = document.createElement('option');
            option.innerText = el['Name'];
            option.value = el['Id'];
            freedomReasonSelect.append(option);
        }

        const catSelectorChange = async () => {

            let hideThreeFields = threefieldsCheck(catSelector.value);

            if (hideThreeFields) {
                contractSumDiv.classList.add('nonedisplay');
                pdfoDiv.classList.add('nonedisplay');
                militaryLevyDiv.classList.add('nonedisplay');

                contractSumInput.value = '';
                pdfoInput.value = '';
                militaryLevyInput.value = '';
            } else {
                contractSumDiv.classList.remove('nonedisplay');
                pdfoDiv.classList.remove('nonedisplay');
                militaryLevyDiv.classList.remove('nonedisplay');
            }

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

            let hidePensionFundField = pensionFundFieldCheck(subcatSelector.value);

            if (hidePensionFundField) {
                pensionFundPaymentDiv.classList.add('nonedisplay');
                taxFreeDiv.classList.add('nonedisplay');
                freedomReasonDiv.classList.add('nonedisplay');

                pensionFundPaymentInput.value = '';
                taxFreeInput.checked = false;
                //freedomReasonSelect.innerHTML = '';
            } else {
                pensionFundPaymentDiv.classList.remove('nonedisplay');
                taxFreeDiv.classList.remove('nonedisplay');
            }

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
        let dbRecord = await db.DBController.getData(`SELECT * FROM Log where Id = ${ChosenChangeId}`);

        let date = new Date(dbRecord[0]['RecordDate']);

        //Make normal Date

        let day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
        let month = ((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
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

        contractSumInput.value = dbRecord[0]['ContractSum'];
        pdfoInput.value = dbRecord[0]['PersonalIncomeTax'];
        militaryLevyInput.value = dbRecord[0]['MilitaryLevy'];
        pensionFundPaymentInput.value = dbRecord[0]['PensionFundPayment'];

        contractSumInput.value = dbRecord[0]['ContractSum'];
        pdfoInput.value = dbRecord[0]['PersonalIncomeTax'];
        militaryLevyInput.value = dbRecord[0]['MilitaryLevy'];
        pensionFundPaymentInput.value = dbRecord[0]['PensionFundPayment'];


        freedomReasonSelect.value = dbRecord[0]['PensionTaxFree'];
        if (dbRecord[0]['PensionTaxFree'] !== null) {
            taxFreeInput.checked = true;
            freedomReasonDiv.classList.remove('nonedisplay');
            pensionFundPaymentInput.setAttribute('disabled', '');
            pensionFundPaymentInput.setAttribute('placeholder', 'Недоступно');
        } else {
            taxFreeInput.checked = false;
            pensionFundPaymentInput.removeAttribute('disabled');
            pensionFundPaymentInput.removeAttribute('placeholder');
        }
        commentInput.value = dbRecord[0]['Comment'];

        loading.end();

        //catSelectorChange();


        document.querySelector('.changerecord-button').addEventListener('click', async function () {

            if (
                serviceSelector.value != '' &&
                incomeInput.value != '' &&
                parseInt(incomeInput.value) != NaN &&
                realIncomeInput.value != '' &&
                parseInt(realIncomeInput.value) != NaN &&
                dateInput.value != ''
            ) {

                let freedomReasonSelectValue = freedomReasonSelect.value;
                let taxFreeInputChecked = taxFreeInput.checked;


                if (!taxFreeInputChecked) {
                    freedomReasonSelectValue = '';
                }

                loading.start();
                let recordUpdated = await db.DBController.writeData(`update Log
                set ServiceId = ${serviceSelector.value}, RecordDate = "${dateInput.value}", Price = ${incomeInput.value}, ActualPrice = ${realIncomeInput.value}, DropOff = ${dropOffInput.checked},
                ContractSum = ${contractSumInput.value || 'NULL'}, PersonalIncomeTax = ${pdfoInput.value || 'NULL'}, MilitaryLevy = ${militaryLevyInput.value || 'NULL'}, PensionFundPayment = ${pensionFundPaymentInput.value || 'NULL'}, 
                PensionTaxFree = ${freedomReasonSelectValue || 'NULL'}, Comment = "${commentInput.value || ''}"
                where Id = ${ChosenChangeId}`);

                if (recordUpdated) {
                    loading.end();
                    let link = document.querySelector('.changerecord-button').getAttribute('hreflink');
                    notification.raise('Запис успішно змінено', 'is-primary');
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

                // START Normal Date

                let date = new Date(row['RecordDate']);

                let day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
                let month = ((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
                let year = date.getFullYear();
                let datestring = `${day}.${month}.${year}`;
                row['RecordDate'] = datestring;

                // END Normal Date

                // START Check Service name
            
                let name = row['Name'];
                if (name.length > 46) {
                    name = name.slice(0, 42) + '... ';
                }

                row['Name'] = name;

                // END Check Service name

                // START Drop Off normal name

                const dropOffNames = {
                    true: 'Так',
                    false: 'Ні'
                };

                let dropOffName = row['DropOff'];

                row['DropOff'] = dropOffNames[dropOffName];

                // END Drop Off normal name

                // START Normal Tax Freedom Reason

                const TaxFreedomReasons = {
                    0: 'Черга на одержання',
                    1: 'Придбання вперше',
                };

                if (row['PensionTaxFree'] !== null) {
                    let reason = TaxFreedomReasons[row['PensionTaxFree']];
                    row['PensionTaxFree'] = reason;
                }

                // END Normal Tax Freedom Reason

                window.trToDelete = null;

                tr.addEventListener('click', function () {
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
            return true;
        }

        const clearTable = () => {
            document.querySelector('table.table > tbody').innerHTML = '';
        }

        const updateTable = async () => {
            clearTable();
            await setTable();
            return true;
        }

        await setTable();

        let deletePopupCloseList = document.querySelectorAll('.close-delete-popup');
        for (let deletePopupClose of deletePopupCloseList) {
            deletePopupClose.addEventListener('click', function () {
                let deletePopup = document.querySelector('.delete-popup');
                deletePopup.classList.remove('is-active');
            });
        }


        document.querySelector('.deleterecord-button').addEventListener('click', function () {
            if (trToDelete) {
                let deletePopup = document.querySelector('.delete-popup');
                deletePopup.classList.add('is-active');
                console.log('is-active added');
            } else {
                console.error(new Error('Don`t choosed the record to delete!'));
                notification.raise('Не обраний запис для видалення. Спрочатку оберіть запис який бажаєте видалити.');
            }
        });

        document.querySelector('.truly-deleterecord-button').addEventListener('click', async function () {
            loading.start();
            let deletePopup = document.querySelector('.delete-popup');
            deletePopup.classList.remove('is-active');
            let recordDeleted = await db.DBController.writeData(`delete from Log where Id = ${trToDelete}`);

            if (recordDeleted) {
                await updateTable();
                loading.end();
                notification.raise('Запис успішно видалено', 'is-primary');
            }
        });

    } else {
        let file = require(filename);
        console.log(file);
        file.main();
    }

    return true;
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

    return true;
}

async function rightMenuFunc(filename, script) {
    if (filename === './dbcontroller.js') {
        let scrquery = script.getAttribute('query');
        let db = require(filename);

        const rmDiagram = require('./rightMenuDiagram.js');
        const rmDiagram2 = require('./rightMenuDiagram2.js');

        await setInfoForDates();

        rmDiagram.main('rightMenuChart');

        rmDiagram2.main('rightMenuChart2');

        //      Make chart

        /*const { drawDiagram } = require("./diagram1.js");

        let labels = [];
        let data1Arr = [];
        let data2Arr = [];

        console.log('Chart loading');

        let dbdata1 = await db.DBController.getData('select * from (SELECT top 10 RecordDate, sum(ActualPrice) as Income, count(id) as ClientsNumber from log group by RecordDate order by RecordDate desc) as ft order by RecordDate');

        console.log('Chart loaded');

        for (let i = 0; i < dbdata1.length; i++) {
          let date = new Date(dbdata1[i]['RecordDate']);
          let datestring = `${date.getDate()}.${date.getMonth()+1}`;
          labels.push(datestring);
          data2Arr.push(dbdata1[i]['Income']);
          data1Arr.push(dbdata1[i]['ClientsNumber']);
        }

        let arr = drawDiagram('rightMenuChart', 'Соотношение прибыли к количеству клиентов', 'Количество клиентов', data1Arr, 'Прибыль', data2Arr, labels);

        let myChart = new Chart(arr[0], arr[1]);

        */

        //       Make table

        console.log('Table loading');

        let dbdata = await db.DBController.getData(scrquery);

        console.log('Table loaded');

        const tbody = document.querySelector('table.table > tbody');

        console.log(JSON.stringify(dbdata));

        for (let row of dbdata) {
            let tr = document.createElement('tr');

            let date = new Date(row['RecordDate']);

            let day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
            let month = ((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
            let year = date.getFullYear();
            let datestring = `${day}.${month}.${year}`;
            row['RecordDate'] = datestring;

            // START Check Service name

            let name = row['Name'];
            if (name.length > 46) {
                name = name.slice(0, 42) + '... ';
            }

            row['Name'] = name;

            // END Check Service name

            // START Drop Off normal name

            const dropOffNames = {
                true: 'Так',
                false: 'Ні'
            };

            let dropOffName = row['DropOff'];

            row['DropOff'] = dropOffNames[dropOffName];

            // END Drop Off normal name

            // START Normal Tax Freedom Reason

            const TaxFreedomReasons = {
                0: 'Черга на одержання',
                1: 'Придбання вперше',
            };

            if (row['PensionTaxFree'] !== null) {
                let reason = TaxFreedomReasons[row['PensionTaxFree']];
                row['PensionTaxFree'] = reason;
            }

            // END Normal Tax Freedom Reason

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

    return true;
}

async function leftMenuFunc() {

    // START Report settings

    let modalButton = document.querySelector('.modal-launch');
    if (modalButton) {
        modalButton.addEventListener('click', () => {
            let modal = document.querySelector('.settings-modal');
            modal.classList.add('is-active');
        })
    }


    let modalCloses = document.querySelectorAll('.close-modal');
    if (modalCloses) {
        for (let el of modalCloses) {
            el.addEventListener('click', () => {
                let settingsModal = document.querySelector('.settings-modal');
                settingsModal.classList.remove('is-active');
            })
        }
    }

    // END Report settings

    // START Tax settings

    let yearReportModalButton = document.querySelector('.tax-modal-launch');
    if (yearReportModalButton) {
        yearReportModalButton.addEventListener('click', () => {
            let taxModal = document.querySelector('.tax-modal');
            taxModal.classList.add('is-active');
        })
    }


    let taxModalClose = document.querySelectorAll('.close-tax-modal');
    if (taxModalClose) {
        for (let el of taxModalClose) {
            el.addEventListener('click', () => {
                let taxModal = document.querySelector('.tax-modal');
                taxModal.classList.remove('is-active');
            })
        }
    }

    // END Tax settings

    const mainTab = document.querySelector('.main-report');
    const yearReportTab = document.querySelector('.year-report');
    const quartReportTab = document.querySelector('.quart-report');
    const pensionFundTab = document.querySelector('.pension-fund-report');
    const tabToDivSelector = {
        'mainTab': '.main-report-div',
        'yearReportTab': '.year-report-div',
        'quartReportTab': '.quart-report-div',
        'pensionFundTab': '.pension-fund-report-div'
    };

    mainTab.addEventListener('click', () => {
        changeTab(mainTab, 'mainTab');
    });

    yearReportTab.addEventListener('click', () => {
        changeTab(yearReportTab, 'yearReportTab');
    });

    quartReportTab.addEventListener('click', () => {
        changeTab(quartReportTab, 'quartReportTab');
    });

    pensionFundTab.addEventListener('click', () => {
        changeTab(pensionFundTab, 'pensionFundTab');
    });

    function changeTab(tab, tabSelector) {
        mainTab.classList.remove('is-active');
        yearReportTab.classList.remove('is-active');
        quartReportTab.classList.remove('is-active');
        pensionFundTab.classList.remove('is-active');

        tab.classList.add('is-active');

        for (let key in tabToDivSelector) {
            document.querySelector(tabToDivSelector[key]).classList.add('nonedisplay');
        }

        document.querySelector(tabToDivSelector[tabSelector]).classList.remove('nonedisplay');
    }

    let idToConfigName = {
        '#notary-name': 'name',
        '#notary-loc': 'loc',
        '#notary-fio': 'fio',
        '#notary-performer': 'performer',
        '#notary-tel': 'tel',
        '#notary-email': 'email',
        //'#notary-budgetTax': 'budgetTax',
        //'#notary-pensionFundTax': 'pensionFundTax',
        '#notary-employment': 'employment',
        '#notary-namer': 'namer',
        '#notary-fior': 'fior',
        '#notary-pensionFundName': 'pensionFundName',
        '#notary-rnokpp': 'rnokpp',
    };

    let configObject = config.read();

    // Settings filling when page is loading
    for (let key in idToConfigName) {
        if (configObject[idToConfigName[key]]) {
            document.querySelector(key).value = configObject[idToConfigName[key]];
        }
    }

    if (configObject['reportFolder']) {
        document.querySelector('span.folder-pick-text').innerHTML = configObject['reportFolder'];
    }

    if (configObject['reportKind']) {
        document.querySelector(`.button.report-kind[value="${configObject['reportKind']}"]`).classList.add('is-primary');
    }

    if (configObject['yearKind']) {
        document.querySelector(`.button.year-kind[value="${configObject['yearKind']}"]`).classList.add('is-primary');
    }

    if (configObject['quartKind']) {
        document.querySelector(`.button.quart-kind[value="${configObject['quartKind']}"]`).classList.add('is-primary');
    }

    if (configObject['pensQuartKind']) {
        document.querySelector(`.button.pens-quart-kind[value="${configObject['pensQuartKind']}"]`).classList.add('is-primary');
    }

    // End settings filling

    // Save settings

    let applySettingsButton = document.querySelector('.apply-settings');

    if (applySettingsButton) {

        let configObectToWrite = {};

        applySettingsButton.addEventListener('click', () => {

            if (document.querySelector('#folderpick').files[0]) {
                let arr = document.querySelector('#folderpick').files[0]['path'].split('\\');
                arr.pop();
                let selectedFolderPath = arr.join('\\');
                configObectToWrite['reportFolder'] = selectedFolderPath;
            }

            if (document.querySelector('.button.report-kind.is-primary')) {

                let button = document.querySelector('.button.report-kind.is-primary');
                let valueKind = button.getAttribute('value');
                configObectToWrite['reportKind'] = valueKind.toString();
            }

            if (document.querySelector('.button.year-kind.is-primary')) {

                let button = document.querySelector('.button.year-kind.is-primary');
                let valueKind = button.getAttribute('value');
                configObectToWrite['yearKind'] = valueKind.toString();
            }

            if (document.querySelector('.button.quart-kind.is-primary')) {

                let button = document.querySelector('.button.quart-kind.is-primary');
                let valueKind = button.getAttribute('value');
                configObectToWrite['quartKind'] = valueKind.toString();
            }

            if (document.querySelector('.button.pens-quart-kind.is-primary')) {

                let button = document.querySelector('.button.pens-quart-kind.is-primary');
                let valueKind = button.getAttribute('value');
                configObectToWrite['pensQuartKind'] = valueKind.toString();
            }

            for (let key in idToConfigName) {
                if (document.querySelector(key).value) {
                    let value = document.querySelector(key).value;
                    configObectToWrite[idToConfigName[key]] = value;
                }
            }

            config.write(configObectToWrite);

            notification.raise('Налаштування звітів успішно збережені', 'is-primary');

            let settingsModal = document.querySelector('.settings-modal');
            settingsModal.classList.remove('is-active');
        })
    }

    // END save settings

    // START Report-kind buttons functionality

    let reportButtons = document.querySelectorAll('.report-kind');

    for (let button of reportButtons) {
        button.addEventListener('click', (e) => {

            if (!reportButtons[0].classList.contains('is-primary') && !reportButtons[1].classList.contains('is-primary')) {
                e.target.classList.add('is-primary');
            } else if (!e.target.classList.contains('is-primary')) {
                reportButtons[0].classList.toggle('is-primary');
                reportButtons[1].classList.toggle('is-primary');
            }
        });
    }
    // END Report-kind buttons functionality

    // START Year-kind buttons functionality

    let yearButtons = document.querySelectorAll('.year-kind');

    for (let button of yearButtons) {
        button.addEventListener('click', (e) => {

            if (!yearButtons[0].classList.contains('is-primary') && !yearButtons[1].classList.contains('is-primary')) {
                e.target.classList.add('is-primary');
            } else if (!e.target.classList.contains('is-primary')) {
                yearButtons[0].classList.toggle('is-primary');
                yearButtons[1].classList.toggle('is-primary');
            }
        });
    }
    // END Year-kind buttons functionality

    // START Quart-kind buttons functionality

    let quartButtons = document.querySelectorAll('.quart-kind');

    for (let button of quartButtons) {
        button.addEventListener('click', (e) => {

            if (!quartButtons[0].classList.contains('is-primary') && !quartButtons[1].classList.contains('is-primary')) {
                e.target.classList.add('is-primary');
            } else if (!e.target.classList.contains('is-primary')) {
                quartButtons[0].classList.toggle('is-primary');
                quartButtons[1].classList.toggle('is-primary');
            }
        });
    }
    // END Quart-kind buttons functionality

    // START Pens-quart-kind buttons functionality

    let pensQuartButtons = document.querySelectorAll('.pens-quart-kind');

    for (let button of pensQuartButtons) {
        button.addEventListener('click', (e) => {

            if (!pensQuartButtons[0].classList.contains('is-primary') && !pensQuartButtons[1].classList.contains('is-primary')) {
                e.target.classList.add('is-primary');
            } else if (!e.target.classList.contains('is-primary')) {
                pensQuartButtons[0].classList.toggle('is-primary');
                pensQuartButtons[1].classList.toggle('is-primary');
            }
        });
    }
    // END Pens-quart-kind buttons functionality

    // START Folder pick functionality

    document.querySelector('#folderpick').onchange = function () {
        if (!document.querySelector('#folderpick').files[0]) return;
        let arr = document.querySelector('#folderpick').files[0]['path'].split('\\');
        arr.pop();
        let selectedFolderPath = arr.join('\\');

        document.querySelector('span.folder-pick-text').innerHTML = selectedFolderPath;
    }

    // END Folder pick functionality

    const getQuart = {
        1: "I",
        2: "II",
        3: "III",
        4: "IV",
    };

    const yearAndQuartNumToQuery = {
        0: '- 1',
        1: '',
    }

    const getUkrMonth = {
        0: "січня",
        1: "лютого",
        2: "березня",
        3: "квітня",
        4: "травня",
        5: "червня",
        6: "липня",
        7: "серпня",
        8: "вересня",
        9: "жовтня",
        10: "листопада",
        11: "грудня",
    };

    const idToConfigNameTaxSettings = {
        '#notary-budgetTax': 'budgetTax',
        '#notary-pensionFundTax': 'pensionFundTax',
    };

    // START Year report button EventListener
    document.querySelector('.create-year-report').addEventListener('click', async () => {

        let configObectToWrite2 = {};

        for (let key in idToConfigNameTaxSettings) {
            if (document.querySelector(key).value) {
                let value = document.querySelector(key).value;
                configObectToWrite2[idToConfigNameTaxSettings[key]] = value;
            }
        }

        config.write(configObectToWrite2);

        notification.raise('Створення звіту', 'is-info');

        let taxModal = document.querySelector('.tax-modal');
        taxModal.classList.remove('is-active');


        let configObject = config.read();

        if (!configObject['reportFolder']) {
            console.error(new Error('Don`t choosed the report folder!'));
            notification.raise('Не вказана папка для зберігання звіта. Ви можете вказати її в налаштуваннях звітів.');
            return;
        }

        loading.start();

        let date = new Date();

        let yearNumberOfReport = parseInt(configObject['yearKind'] || 1);
        let yearOfReport = date.getFullYear() + yearNumberOfReport - 1;

        let reportData = await db.DBController.getData(`SELECT Services.Id as ServiceId, SubCategories.Id as SubcatId, Categories.Id as CatId, ft.Num as Num
        FROM Services, SubCategories, Categories, (SELECT Log.ServiceId as ServiceId,
        count(Log.ServiceId)  as Num
        from
        Log
        where
        Year(Log.RecordDate) = Year(Date()) ${yearAndQuartNumToQuery[yearNumberOfReport]}
        group by Log.ServiceId) as ft
        WHERE Services.SubCategoryId = SubCategories.Id
        and
        SubCategories.CategoryId = Categories.Id
        and ft.ServiceId = Services.Id`);

        console.log(reportData);

        let dropOffCount = await db.DBController.getData(`SELECT count(*) as DropOffCount
        FROM Log
        WHERE
        DropOff = true
        And
        Year(Log.RecordDate) = Year(Date()) ${yearAndQuartNumToQuery[yearNumberOfReport]}`);

        let incomeSum = await db.DBController.getData(`SELECT sum(Price) as IncomeSum
        FROM Log
        WHERE
        Year(Log.RecordDate) = Year(Date()) ${yearAndQuartNumToQuery[yearNumberOfReport]}`);

        let performer = '';

        if (configObject['performer']) {
            performer = configObject['performer'].slice(0, -1);
        }

        const countData = countDataMemorize(reportData);



        let pdfCreated = writePDF({
            'year': yearOfReport.toString(),
            'name': configObject['name'] || '',
            'loc': configObject['loc'] || '',
            '1': '-',
            '2': '1',
            '3': '-',
            '4': '1',
            '5': '-',
            '6': countData('CatId', 1),
            '6.1': countData('SubcatId', 1),
            '6.1.1': countData('ServiceId', 1),
            '6.1.2': countData('ServiceId', 2),
            '6.2': countData('SubcatId', 2),
            '6.2.1': countData('ServiceId', 6),
            '6.2.2': countData('ServiceId', 7),
            '6.3': countData('SubcatId', 3),
            '6.3.1': countData('ServiceId', 11),
            '6.3.2': countData('ServiceId', 12),
            '6.4': countData('SubcatId', 4),
            '6.5': countData('SubcatId', 5),
            '6.6': countData('SubcatId', 6),
            '6.7': countData('SubcatId', 7),
            '7': countData('CatId', 2),
            '7.1': countData('SubcatId', 8),
            '7.2': countData('SubcatId', 9),
            '7.3': countData('SubcatId', 10),
            '8': countData('CatId', 3),
            '9': countData('CatId', 4),
            '10': countData('CatId', 5),
            '11': countData('CatId', 6),
            '11.1': countData('SubcatId', 22),
            '11.2': countData('SubcatId', 23),
            '11.3': countData('SubcatId', 24),
            '12': countData('CatId', 7),
            '12.1': countData('SubcatId', 25),
            '12.2': countData('SubcatId', 26),
            '13': countData('CatId', 8),
            '14': countData('CatId', 9),
            '14.1': countData('SubcatId', 28),
            '14.2': countData('SubcatId', 29),
            '14.3': countData('SubcatId', 30),
            '14.4': countData('SubcatId', 31),
            '15': countData('CatId', 10),
            '15.1': countData('SubcatId', 32),
            '15.2': countData('SubcatId', 33),
            '16': countData('CatId', 11),
            '17': countData('CatId', 12),
            '18': countData('CatId', 13),
            '19': countData('CatId', 14),
            '20': countData('CatId', 15),
            '20.1': countData('SubcatId', 39),
            '20.2': countData('SubcatId', 40),
            '20.3': countData('SubcatId', 41),
            '21': countData('CatId', 16),
            '22': countData('CatId', 17),
            '23': countData('CatId', 18),
            '24': countData('CatId', 19),
            '24.1': countData('SubcatId', 45),
            '24.2': countData('SubcatId', 46),
            '25': countData('CatId', 20),
            '26': countData('CatId', 21),
            '26.1': countData('SubcatId', 48),
            '26.2': countData('SubcatId', 49),
            '26.3': countData('SubcatId', 50),
            '27': countData('CatId', 22),
            '28': countData('CatId', 23),
            '29': countData('CatId', 24),
            '30': countData('CatId', 25),
            '31': countData('CatId', 26),
            '32': countData('CatId', 27),
            '33': countData('CatId', 28),
            '34': countData('CatId', 29),
            '35': countDataSum(reportData),
            '36': countDataSum(reportData),
            '37': dropOffCount[0]['DropOffCount'].toString(),
            '38': Math.ceil(getRandomNumber(0.6, 0.7) * parseInt(countDataSum(reportData))).toString(),
            '39': '-',
            '40': '-',
            '41': incomeSum[0]['IncomeSum'].toString(),
            '42': configObject['budgetTax'] || '-',
            '43': configObject['pensionFundTax'] || '-',
            '44': configObject['employment'] || '-',
            '45': '-',
            '46': '-',
            'fio': configObject['fio'] || '',
            'performer': configObject['performer'] || '',
            'tel': configObject['tel'] || '',
            'email': configObject['email'] || '',
        }, configObject['reportFolder'], `Статзвіт річний ${date.getFullYear().toString()} ПНКМНО ${performer}`, 'zvit_year.pdf');

        if (pdfCreated) {
            notification.raise(`Річний звіт успішно створений в папці ${configObject['reportFolder']}`, 'is-primary');
            loading.end();
        }
    });
    // END Year report button EventListener

    // START Quartal report button EventListener
    document.querySelector('.create-quartal-report').addEventListener('click', async () => {

        let configObject = config.read();

        if (!configObject['reportFolder']) {
            console.error(new Error('Don`t choosed the report folder!'));
            notification.raise('Не вказана папка для зберігання звіта. Ви можете вказати її в налаштуваннях звітів.');
            return;
        }

        loading.start();

        let date = new Date();

        let quartNumberOfReport = parseInt(configObject['quartKind'] || 1);
        let quartToday = quarterOfYear(date);
        let quartOfReport = quartToday + quartNumberOfReport - 1 || 4;
        let yearQuartNumberOfReport = 1;

        let yearOfReport = date.getFullYear();

        if (quartToday === 1 && quartNumberOfReport === 0) {
            yearQuartNumberOfReport = 0;
            yearOfReport--;
        }



        let reportData = await db.DBController.getData(`SELECT Services.Id as ServiceId, SubCategories.Id as SubcatId, Categories.Id as CatId, ft.Num as Num
        FROM Services, SubCategories, Categories, (SELECT Log.ServiceId as ServiceId,
        count(Log.ServiceId)  as Num
        from
        Log
        where
        Year(Log.RecordDate) = Year(Now()) ${yearAndQuartNumToQuery[yearQuartNumberOfReport]}
        And
        DatePart("q", Log.RecordDate) = DatePart("q", Now()) ${yearAndQuartNumToQuery[quartNumberOfReport]}
        group by Log.ServiceId) as ft
        WHERE Services.SubCategoryId = SubCategories.Id
        and
           SubCategories.CategoryId = Categories.Id
        and ft.ServiceId = Services.Id`);

        console.log(reportData);

        const countData = countDataMemorize(reportData);

        let performer = '';

        if (configObject['performer']) {
            performer = configObject['performer'].slice(0, -1);
        }

        let pdfCreated = writePDF({
            'quart': getQuart[quartOfReport],
            'year': yearOfReport.toString(),
            'name': configObject['name'] || '',
            'loc': configObject['loc'] || '',

            '1': countData('CatId', 1),
            '1.1': countData('SubcatId', 1),
            '1.1.1': countData('ServiceId', 1),
            '1.1.2': countData('ServiceId', 2),
            '1.2': countData('SubcatId', 2),
            '1.2.1': countData('ServiceId', 6),
            '1.2.2': countData('ServiceId', 7),
            '1.3': countData('SubcatId', 3),
            '1.3.1': countData('ServiceId', 11),
            '1.3.2': countData('ServiceId', 12),
            '1.4': countData('SubcatId', 4),
            '1.5': countData('SubcatId', 5),
            '1.6': countData('SubcatId', 6),
            '1.7': countData('SubcatId', 7),

            '2': countData('CatId', 2),
            '2.1': countData('SubcatId', 8),
            '2.2': countData('SubcatId', 9),
            '2.3': countData('SubcatId', 10),

            '2.4': countData('SubcatId', 14),
            '3': (
                (parseInt(countData('SubcatId', 11)) || 0) +
                (parseInt(countData('SubcatId', 12)) || 0) +
                (parseInt(countData('SubcatId', 13)) || 0)
                || '-').toString(),
            '3.1': (
                (parseInt(countData('ServiceId', 24)) || 0) +
                (parseInt(countData('ServiceId', 26)) || 0) +
                (parseInt(countData('ServiceId', 28)) || 0)
                || '-').toString(),
            '3.2': (
                (parseInt(countData('ServiceId', 25)) || 0) +
                (parseInt(countData('ServiceId', 27)) || 0) +
                (parseInt(countData('ServiceId', 29)) || 0)
                || '-').toString(),
            '4': (
                (parseInt(countData('CatId', 1)) || 0) +
                (parseInt(countData('CatId', 2)) || 0)
                || '-').toString(),

            'fio': configObject['fio'] || '',
        }, configObject['reportFolder'], `Статзвіт квартальний ${date.getFullYear().toString()} ПНКМНО ${performer}`, 'zvit_quar.pdf');

        if (pdfCreated) {
            notification.raise(`Квартальний звіт успішно створений в папці ${configObject['reportFolder']}`, 'is-primary');
            loading.end();
        }
    });
    // END Quartal report button EventListener

    // START Pension report button EventListener
    document.querySelector('.create-pension-report').addEventListener('click', async () => {

        let configObject = config.read();

        if (!configObject['reportFolder']) {
            console.error(new Error('Don`t choosed the report folder!'));
            notification.raise('Не вказана папка для зберігання звіта. Ви можете вказати її в налаштуваннях звітів.');
            return;
        }

        loading.start();

        let date = new Date();

        let pensQuartNumberOfReport = parseInt(configObject['pensQuartKind'] || 1);
        let pensQuartToday = quarterOfYear(date);
        let pensQuartOfReport = pensQuartToday + pensQuartNumberOfReport - 1 || 4;
        let yearQuartNumberOfReport = 1;

        let yearOfReport = date.getFullYear();

        if (pensQuartToday === 1 && pensQuartNumberOfReport === 0) {
            yearQuartNumberOfReport = 0;
            yearOfReport--;
        }

        let reportData = await db.DBController.getData(`SELECT Services.Id as ServiceId, ft.RecordDate as RecordDate, ft.ContractSum as ContractSum, ft.PensionTaxFree as PensionTaxFree
        FROM Services, SubCategories, Categories, (SELECT Log.ServiceId as ServiceId, Log.RecordDate as RecordDate, Log.ContractSum as ContractSum, Log.PensionTaxFree as PensionTaxFree
        from
        Log
        where
        Year(Log.RecordDate) = Year(Now()) ${yearAndQuartNumToQuery[yearQuartNumberOfReport]}
        ) as ft
        WHERE Services.SubCategoryId = SubCategories.Id
        and
        SubCategories.CategoryId = Categories.Id
        and
        ft.ServiceId = Services.Id
        and
        Services.SubCategoryId = 1`);

        console.log(reportData);

        //const sumPensDataByDate = sumPensDataByDateMemorize(reportData);
        //const countPensDataByDate = countPensDataByDateMemorize(reportData);

        let reportDataByMonths = [
            [],
            [],
            [],
        ];

        for (let el of reportData) {
            let recordDate = new Date(el.RecordDate);
            let quart = quarterOfYear(recordDate);

            if (quart === pensQuartOfReport) {
                let months = [quart * 3 - 2, quart * 3 - 1, quart * 3];
                reportDataByMonths[months.indexOf(recordDate.getMonth() + 1)].push(el);
            }
        }


        let performer = '';

        if (configObject['performer']) {
            performer = configObject['performer'].slice(0, -1);
        }

        //const countData = countDataMemorize(reportData);

        console.log(reportDataByMonths[0]);
        console.log(reportDataByMonths);


        let pdfCreated = writePDF({
            'quart': getQuart[pensQuartOfReport],
            'quartword': "квартал",
            'yearEnding1': yearOfReport.toString().slice(2, 4),
            'scr1': pensionTopScribe('0', configObject),
            'scr2': pensionTopScribe('1', configObject),
            'fior': configObject['fior'] || '',
            'namer': configObject['namer'] || '',
            'pensfond': configObject['pensionFundName'] || '',
            'innnum': configObject['rnokpp'] || '',
            'loc': configObject['loc'] || '',
            'tel': configObject['tel'] || '',

            '1q': (
                (parseInt(countPensDataByDate(reportDataByMonths[0])) || 0) +
                (parseInt(countPensDataByDate(reportDataByMonths[1])) || 0) +
                (parseInt(countPensDataByDate(reportDataByMonths[2])) || 0)
                || '-').toString(),
            '1y': countPensDataByDate(reportData),
            '1.1': countPensDataByDate(reportDataByMonths[0]),
            '1.2': countPensDataByDate(reportDataByMonths[1]),
            '1.3': countPensDataByDate(reportDataByMonths[2]),
            '2q': (
                (parseInt(sumPensDataByDate(reportDataByMonths[0])) || 0) +
                (parseInt(sumPensDataByDate(reportDataByMonths[1])) || 0) +
                (parseInt(sumPensDataByDate(reportDataByMonths[2])) || 0)
                || '-').toString(),
            '2y': sumPensDataByDate(reportData),
            '2.1': sumPensDataByDate(reportDataByMonths[0]),
            '2.2': sumPensDataByDate(reportDataByMonths[1]),
            '2.3': sumPensDataByDate(reportDataByMonths[2]),

            '3.1q': (
                (parseInt(countPensExcDataByDate(reportDataByMonths[0], [0, 1])) || 0) +
                (parseInt(countPensExcDataByDate(reportDataByMonths[1], [0, 1])) || 0) +
                (parseInt(countPensExcDataByDate(reportDataByMonths[2], [0, 1])) || 0)
                || '-').toString(),
            '3.1y': countPensExcDataByDate(reportData, [0, 1]),
            '3.1.1': countPensExcDataByDate(reportDataByMonths[0], [0, 1]),
            '3.1.2': countPensExcDataByDate(reportDataByMonths[1], [0, 1]),
            '3.1.3': countPensExcDataByDate(reportDataByMonths[2], [0, 1]),
            //---------
            '3.2q': (
                (parseInt(countPensExcDataByDate(reportDataByMonths[0], [0])) || 0) +
                (parseInt(countPensExcDataByDate(reportDataByMonths[1], [0])) || 0) +
                (parseInt(countPensExcDataByDate(reportDataByMonths[2], [0])) || 0)
                || '-').toString(),
            '3.2y': countPensExcDataByDate(reportData, [0]),
            '3.2.1': countPensExcDataByDate(reportDataByMonths[0], [0]),
            '3.2.2': countPensExcDataByDate(reportDataByMonths[1], [0]),
            '3.2.3': countPensExcDataByDate(reportDataByMonths[2], [0]),
            //---------
            '3.3q': (
                (parseInt(countPensExcDataByDate(reportDataByMonths[0], [1])) || 0) +
                (parseInt(countPensExcDataByDate(reportDataByMonths[1], [1])) || 0) +
                (parseInt(countPensExcDataByDate(reportDataByMonths[2], [1])) || 0)
                || '-').toString(),
            '3.3y': countPensExcDataByDate(reportData, [1]),
            '3.3.1': countPensExcDataByDate(reportDataByMonths[0], [1]),
            '3.3.2': countPensExcDataByDate(reportDataByMonths[1], [1]),
            '3.3.3': countPensExcDataByDate(reportDataByMonths[2], [1]),
            //---------
            '4.1q': (
                (parseInt(sumPensExcDataByDate(reportDataByMonths[0], [0, 1])) || 0) +
                (parseInt(sumPensExcDataByDate(reportDataByMonths[1], [0, 1])) || 0) +
                (parseInt(sumPensExcDataByDate(reportDataByMonths[2], [0, 1])) || 0)
                || '-').toString(),
            '4.1y': sumPensExcDataByDate(reportData, [0, 1]),
            '4.1.1': sumPensExcDataByDate(reportDataByMonths[0], [0, 1]),
            '4.1.2': sumPensExcDataByDate(reportDataByMonths[1], [0, 1]),
            '4.1.3': sumPensExcDataByDate(reportDataByMonths[2], [0, 1]),
            //---------
            '4.2q': (
                (parseInt(sumPensExcDataByDate(reportDataByMonths[0], [0])) || 0) +
                (parseInt(sumPensExcDataByDate(reportDataByMonths[1], [0])) || 0) +
                (parseInt(sumPensExcDataByDate(reportDataByMonths[2], [0])) || 0)
                || '-').toString(),
            '4.2y': sumPensExcDataByDate(reportData, [0]),
            '4.2.1': sumPensExcDataByDate(reportDataByMonths[0], [0]),
            '4.2.2': sumPensExcDataByDate(reportDataByMonths[1], [0]),
            '4.2.3': sumPensExcDataByDate(reportDataByMonths[2], [0]),
            //----------
            '4.3q': (
                (parseInt(sumPensExcDataByDate(reportDataByMonths[0], [1])) || 0) +
                (parseInt(sumPensExcDataByDate(reportDataByMonths[1], [1])) || 0) +
                (parseInt(sumPensExcDataByDate(reportDataByMonths[2], [1])) || 0)
                || '-').toString(),
            '4.3y': sumPensExcDataByDate(reportData, [1]),
            '4.3.1': sumPensExcDataByDate(reportDataByMonths[0], [1]),
            '4.3.2': sumPensExcDataByDate(reportDataByMonths[1], [1]),
            '4.3.3': sumPensExcDataByDate(reportDataByMonths[2], [1]),

            '5q': (
                (
                ((
                (parseInt(sumPensDataByDate(reportDataByMonths[0])) || 0) +
                (parseInt(sumPensDataByDate(reportDataByMonths[1])) || 0) +
                (parseInt(sumPensDataByDate(reportDataByMonths[2])) || 0)
                ) -
                (
                (parseInt(sumPensExcDataByDate(reportDataByMonths[0], [0, 1])) || 0) +
                (parseInt(sumPensExcDataByDate(reportDataByMonths[1], [0, 1])) || 0) +
                (parseInt(sumPensExcDataByDate(reportDataByMonths[2], [0, 1])) || 0)
                )) * 0.01)
                || '-').toString(),
            '5y': ((( sumPensDataByDate(reportData) - sumPensExcDataByDate(reportData, [0, 1]) ) * 0.01) || '-').toString(),

            'x1': "X",
            'x2': "X",
            'x3': "X",
            'x4': "X",
            'x5': "X",
            'x6': "X",
            'x7': "X",
            'x8': "X",
            'x9': "X",

            '5.1': ((( sumPensDataByDate(reportDataByMonths[0]) - sumPensExcDataByDate(reportDataByMonths[0], [0, 1]) ) * 0.01) || '-').toString(),
            '5.2': ((( sumPensDataByDate(reportDataByMonths[1]) - sumPensExcDataByDate(reportDataByMonths[1], [0, 1]) ) * 0.01) || '-').toString(),
            '5.3': ((( sumPensDataByDate(reportDataByMonths[2]) - sumPensExcDataByDate(reportDataByMonths[2], [0, 1]) ) * 0.01) || '-').toString(),
            
            '6q': (
                (
                ((
                (parseInt(sumPensDataByDate(reportDataByMonths[0])) || 0) +
                (parseInt(sumPensDataByDate(reportDataByMonths[1])) || 0) +
                (parseInt(sumPensDataByDate(reportDataByMonths[2])) || 0)
                ) -
                (
                (parseInt(sumPensExcDataByDate(reportDataByMonths[0], [0, 1])) || 0) +
                (parseInt(sumPensExcDataByDate(reportDataByMonths[1], [0, 1])) || 0) +
                (parseInt(sumPensExcDataByDate(reportDataByMonths[2], [0, 1])) || 0)
                )) * 0.01)
                || '-').toString(),
            '6y': ((( sumPensDataByDate(reportData) - sumPensExcDataByDate(reportData, [0, 1]) ) * 0.01) || '-').toString(),
            '6.1': ((( sumPensDataByDate(reportDataByMonths[0]) - sumPensExcDataByDate(reportDataByMonths[0], [0, 1]) ) * 0.01) || '-').toString(),
            '6.2': ((( sumPensDataByDate(reportDataByMonths[1]) - sumPensExcDataByDate(reportDataByMonths[1], [0, 1]) ) * 0.01) || '-').toString(),
            '6.3': ((( sumPensDataByDate(reportDataByMonths[2]) - sumPensExcDataByDate(reportDataByMonths[2], [0, 1]) ) * 0.01) || '-').toString(),

            'x10': "X",
            'x11': "X",
            'x12': "X",

            'fio': configObject['performer'] || '',

            'scr3': "________________",

            'day': date.getDate().toString().padStart(2, 0),
            'month': getUkrMonth[date.getMonth()],
            'yearEnding2': date.getFullYear().toString().slice(2, 4),
        }, configObject['reportFolder'], `Статзвіт пенсійний ${date.getFullYear().toString()} ПНКМНО ${performer}`, 'zvit_pens.pdf');

        if (pdfCreated) {
            notification.raise(`Пенсійний звіт успішно створений в папці ${configObject['reportFolder']}`, 'is-primary');
            loading.end();
        }
    });
    // END Pension report button EventListener

    console.log('return true');

    return true;
}

const fileScript = {
    './addrecord.html': addRecordFunc,
    './changerecord.html': changeRecordFunc,
    './changerecordtr.html': changeRecordTrFunc,
    './deleterecord.html': deleteRecordFunc,
    './stat.html': statFunc,
    './leftmenu.html': leftMenuFunc,
    './rightmenu.html': rightMenuFunc,
}

function pensionTopScribe(number, configObject) {
    let scribe = "________";
    let pensionKind = configObject['reportKind'] || '';
    if (number === pensionKind) return scribe;
    return '';
}

function quarterOfYear(date) {
    var month = date.getMonth() + 1;
    return (Math.ceil(month / 3));
}

function sumPensDataByDate(arr) {
    let sum = 0;
    for (let obj of arr) {
        if (obj.ContractSum) sum += obj.ContractSum;
    }
    if (sum > 0) return sum.toString();
    return '-';
}

function countPensDataByDate(arr) {
    let count = 0;
    for (let obj of arr) {
        count++;
    }
    if (count > 0) return count.toString();
    return '-';
}

function countPensExcDataByDate(arr, numArr) {
    let count = 0;
    for (let obj of arr) {
        if (numArr.includes(obj.PensionTaxFree)) {
            count++;
        }
    }
    if (count > 0) return count.toString();
    return '-';
}

function sumPensExcDataByDate(arr, numArr) {
    let sum = 0;
    for (let obj of arr) {
        if (numArr.includes(obj.PensionTaxFree)) {
            if (obj.ContractSum) sum += obj.ContractSum;
        }
    }
    if (sum > 0) return sum.toString();
    return '-';
}

function countDataMemorize(arr) {
    let array = arr;
    return function (idName, id) {
        let count = 0;
        for (let obj of array) {
            if (obj[idName] === id) {
                count += obj.Num;
            }
        }
        if (count > 0) return count.toString();
        return '-';
    }
}

function countDataSum(arr) {

    let count = 0;

    for (let obj of arr) {
        if (obj['CatId'] !== 16) {
            count += obj.Num;
        }
    }

    return count.toString();
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

async function setMainClientsForDates(callback) {

    let clientsForDay = await db.DBController.getData(`SELECT count(*) as Clients
    FROM log
    WHERE RecordDate >= Date()`);

    let clientsForSevenDays = await db.DBController.getData(`SELECT count(*) as Clients
    FROM log
    WHERE RecordDate >= Date()-7`);

    document.querySelector('#clients-for-day').innerHTML = clientsForDay[0]['Clients'];
    document.querySelector('#clients-for-seven-days').innerHTML = clientsForSevenDays[0]['Clients'];

    if (callback) callback();
}

async function setInfoForDates() {

    let dataForAll = await db.DBController.getData(`SELECT ActualPrice, DropOff
    FROM log
    WHERE RecordDate >= Date()-30`);

    let servicesForMonth = dataForAll.length;

    let incomeForMonth = ((arr) => {
        let sum = 0;
        for (let obj of arr) {
            sum += obj.ActualPrice;
        }
        return sum;
    })(dataForAll);

    let dropOffsForMonth = ((arr) => {
        let count = 0;
        for (let obj of arr) {
            if (obj.DropOff == true) count++;
        }
        return count;
    })(dataForAll);

    let avgServicePrice = incomeForMonth / servicesForMonth || 0;
    let maxServicePrice = ((arr) => {
        let max = 0;
        for (let obj of arr) {
            if (obj.ActualPrice > max) max = obj.ActualPrice;
        }
        return max;
    })(dataForAll);

    document.querySelector('#services-for-month').innerHTML = servicesForMonth;
    document.querySelector('#income-for-month').innerHTML = incomeForMonth + " грн";
    document.querySelector('#dropoffs-for-month').innerHTML = dropOffsForMonth;
    document.querySelector('#avg-service-price').innerHTML = avgServicePrice.toFixed(2) + " грн";
    document.querySelector('#max-service-price').innerHTML = maxServicePrice + " грн";

    return true;
}

function threefieldsCheck(catId) {
    let allowedCat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 19];
    if (!allowedCat.includes(parseInt(catId))) return true;
    return false;
}

function pensionFundFieldCheck(subcatId) {
    let allowedSubcat = [1, 11];
    if (!allowedSubcat.includes(parseInt(subcatId))) return true;
    return false;
}