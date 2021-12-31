const toDelete = document.querySelector('a.delete');
        toDelete.addEventListener("click",e=>{
            const endpoint = `/blogs/${toDelete.dataset.doc}`;

            fetch(endpoint,{method:"DELETE"})
            .then(response => response.json())
            .then(data => window.location.href = data.redirect)
            .catch(err => console.log(err));
        });