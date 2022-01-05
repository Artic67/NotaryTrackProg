export let main = function() {
    const input = document.getElementById('datepicker');
    const datepicker = new TheDatepicker.Datepicker(input);
    datepicker.render();

    datepicker.options.setInputFormat("d.m.Y");
    datepicker.options.setShowDeselectButton(false);
    let date = new Date();

    let day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
    let month = ((date.getMonth()+1) < 10) ? "0" + (date.getMonth()+1) : (date.getMonth()+1);
    let year = date.getFullYear();
    let datestring = `${day}.${month}.${year}`;
    input.value = datestring;
}
