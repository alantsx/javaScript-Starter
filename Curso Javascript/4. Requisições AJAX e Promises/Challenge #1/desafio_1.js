var buttonElement = document.querySelector('#buttonAge');
var age = document.querySelector('#inputAge').value;

var agePromise = function () {
    return new Promise (function(resolve, reject) {
        buttonElement.onclick = function () {
            setTimeout(function () {
                if (age >= 18) {
                    resolve('Success');
                } else {
                    reject ('Failed');
                }
            }, 2000);
        }    
    })
}

agePromise ()
    .then(function() {
        console.log('Over 18');
    })
    .catch(function() {
        console.log('Under 18');
    });