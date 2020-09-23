let paramsCount = 0;

// hiding parameter box when the page is loaded...
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// hiding request json box when the params radio is clicked...
let paramsRadio = document.getElementById('params');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    parametersBox.style.display = 'block';
})

// hiding parameters box when the json radio is clicked again...
let jsonRadio = document.getElementById('json');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    parametersBox.style.display = 'none';
})

// Adding more parameters by clicking on plus button...
let addParams = document.getElementById('addParams');
addParams.addEventListener('click', () => {

    let newParams = document.getElementById('newParams');
    let str = `<div class="form-row">
                <label class="col-sm-2 col-form-label" for="parameter"
                    >Parameter ${paramsCount + 2}</label
                >
                <div class="form-group col-md-4">
                    <input
                    type="text"
                    class="form-control"
                    id="parameterKey${paramsCount + 2}"
                    placeholder="enter parameter key ${paramsCount + 2}"
                    />
                </div>
                <div class="form-group col-md-4">
                    <input
                    type="text"
                    class="form-control"
                    id="parameterValue${paramsCount + 2}"
                    placeholder="enter parameter value ${paramsCount + 2}"
                    />
                </div>
                <button class="btn btn-primary form-group deleteParams"> - </button>
            </div>`;
    newParams.innerHTML += str;

    // removing parameters div when clicked on minus button...
    let deleteParams = document.getElementsByClassName('deleteParams');
    for (let item of deleteParams) {
        item.addEventListener('click', (e) => {
            let result = confirm("Do you want to delete this parameter?");
            if (result == true) {
                e.target.parentElement.remove();
            }
        })
    }

    paramsCount++;
})

// adding event listener to submit button...
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // changing the response box text while fetching response...asking user to please wait...
    document.getElementById("responsePrism").innerHTML = 'Please wait...fetching response...';

    // fetching all the values user entered...
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    // when content type is params instead of json...collect the params in an object...
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < paramsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    console.log(url);
    console.log(requestType);
    console.log(contentType);
    console.log(data);

    // Invoke fetch api to make get or post requests...
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then(text => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then(text => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
    }
})

console.log(JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1
}))