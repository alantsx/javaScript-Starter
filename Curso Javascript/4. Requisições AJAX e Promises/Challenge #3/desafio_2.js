var username = document.querySelector('#userInput').value;
var button = document.querySelector('#userButton');
var listElement = document.querySelector('#gitApi ul');

var userPromise = function () {
    return new Promise (function(resolve,reject) {
        button.onclick = function () {
            var xhr = new XMLHttpRequest();
            xhr.open ('GET', 'https://api.github.com/users/'+username+'/repos');
            xhr.send(null);
            
            xhr.onprogress = function () {
                listElement.innerHTML = '';
                var loadElement = document.createElement('li');
                var loadText = document.createTextNode('Loading...');

                loadElement.appendChild(loadText);
                listElement.appendChild(loadElement);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        listElement.innerHTML = '';
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
                        listElement.innerHTML = '';
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
        alert ('User not found');
    });