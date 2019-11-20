let loader = document.getElementById('loader');
let convert = document.getElementById('convert');
let error = document.getElementById('error');
let result = document.getElementById('result');

chrome.storage.sync.get('color', function (data) {
    // TODO
});

convert.onclick = function (element) {
    error.innerText = null;
    let from_currency = document.getElementById('from').value;
    let to_currency = document.getElementById('to').value;
    if(from_currency && to_currency){
        loader.style.display = "block";
        axios.get(`https://dry-cove-37966.herokuapp.com/?to=${to_currency.trim().toUpperCase()}&from=${from_currency.trim().toUpperCase()}&amt=1`)
        .then((res) => {
            loader.style.display = "none";
            // alert(JSON.stringify(res.data));
            let converted_res = '<p> 1 '+res.data.unit_converted_data.base+' = '+res.data.unit_converted_data.numeric+' '+res.data.unit_converted_data.currency+'</p>';
            result.innerHTML = converted_res;
        })
        .catch((err) => {
            loader.style.display = "none";
            if(err.response.status === 400){
                error.innerText = '*Invalid Currency code';        
            }
        });
    }
    else{
        error.innerText = '*all fields required';
    }
    
    // let color = element.target.value;
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //     chrome.tabs.executeScript(
    //         tabs[0].id,
    //         { code: 'document.body.style.backgroundColor = "' + color + '";' });
    // });
};