let loader = document.getElementById('loader');
let convert = document.getElementById('convert');
let error = document.getElementById('error');
let result = document.getElementById('result');


convert.onclick = function (element) {
    error.innerText = null;
    let from_currency = document.getElementById('from').value;
    let to_currency = document.getElementById('to').value;
    let amt = document.getElementById('amt').value;
    if(from_currency && to_currency){
        let api_amt = (amt) ? amt : 1;
        loader.style.display = "block";
        axios.get(`https://dry-cove-37966.herokuapp.com/?to=${to_currency.trim().toUpperCase()}&from=${from_currency.trim().toUpperCase()}&amt=${api_amt}`)
        .then((res) => {
            alert('hi');return false;
            loader.style.display = "none";
            let total_converted_res = '';
            let converted_res = '<p> 1 '+res.data.unit_converted_data.base+' = '+res.data.unit_converted_data.numeric+' '+res.data.unit_converted_data.currency+'</p>';
            if(api_amt > 1){
                let base = res.data.unit_converted_data.base;
                let inverC = res.data.unit_converted_data.currency;
                total_converted_res  += '<br/><p>'+api_amt +' '+base+' = '+res.data.total.inverC.numeric+' '+res.data.total.inverC.currency+'</p>';
            }
            result.innerHTML = converted_res+total_converted_res;
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
};