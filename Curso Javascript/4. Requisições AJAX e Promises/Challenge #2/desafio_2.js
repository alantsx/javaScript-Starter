var username = document.querySelector('#userInput').value;
var button = document.querySelector('#userButton');
var listElement = document.querySelector('#gitApi ul');

var userPromise = function () {
    return new Promise (function(resolve,reject) {
        button.onclick = function () {
            listElement.innerHTML = '';
            var xhr = new XMLHttpRequest();
            xhr.open ('GET', 'https://api.github.com/users/'+username+'/repos');
            xhr.send(null);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                        var repos = JSON.parse(xhr.responseText);
                        
                        for (repo of repos) {
                            var repoElement = document.createElement('li');
                            var repoText = document.createTextNode(repo.name);

                            repoElement.appendChild(repoText);
                            listElement.appendChild(repoElement);
                        }
                    } else {
                        reject('Requisition error');
                    }
                }
            }
        }
    });
}

userPromise ()
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.warn(error);
    });