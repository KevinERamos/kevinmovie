const URL_API = "https://api.themoviedb.org";
const API_KEY = "28dadedaa0553049189b17dfb82fb1ec";

const q = document.querySelector.bind(document);
const cl = console.log



document.addEventListener('DOMContentLoaded',()=>{
    let pag = getPag().page;
        pag == undefined ? pag = '1' : null;
        //cl(pag);

    pintarPelis(pag);
    paginar(pag);
});


const getPag = ()=>{ 
    let vars = {};

    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value){
        vars[key] = value;
    });
    return vars;
}

const getPelis = (pagi)=>{ 
    const URL = `${URL_API}/3/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=${pagi}`;

    return fetch(URL)
        .then(response=>response.json())
        .then(data=>data.results)
        .catch(error => cl(error))
}

const pintarPelis = async (id)=>{
    //let img = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const pel = await getPelis(id);
        //cl(pel);
    let html = '';

    pel.forEach(pelicula => {
        html += `
            <div class="col-12 col-sm-6 col-md-3 bg-light mt-4 efecto" >
                <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" class="card-img-top" alt="${pelicula.title}">
                <div class="card-body text-center">
                    <h5 class="card-title">${pelicula.title}</h5>
                    <p class="card-text"></p>
                    <a href="pelicula.html?id=${pelicula.id}" class="btn btn-info">Más Detalles</a>
                </div>
            </div>
        `;
    }); 

    q('.listado').innerHTML = html;
}



const paginar = (page)=>{

    let pagina = parseInt(page);
    //cl(typeof pagina, pagina);
    let prev = pagina - 1;
    let sig = pagina + 1;
    let html = '';

    if (pagina == 1) {
    
        html = `
            <li class="page-item disabled">
                <a class="page-link " href="ultimos.html?page=${prev}">Anterior</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="ultimos.html?page=${page}">${page}</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="ultimos.html?page=${sig}">2</a>
                </li>
            <li class="page-item">
                <a class="page-link" href="ultimos.html?page=${sig + 1}">3</a>
                </li>
            <li class="page-item">
                <a class="page-link" href="ultimos.html?page=${sig}">Siguiente</a>
            </li>
        `;
    }else{
        html = `
        
            <li class="page-item">
                <a class="page-link" href="ultimos.html?page=${prev}" tabindex="-1"     aria-disabled="true">Anterior</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="ultimos.html?page=${prev}">${prev}</a>
            </li>
            <li class="page-item active" aria-current="page">
                <a class="page-link" href=""ultimos.html?page=${page}">${page} <span class="sr-only">(current)</span></a>
            </li>
            <li class="page-item">
                <a class="page-link" href="ultimos.html?page=${sig}">${sig}</a></li>
            <li class="page-item">
                <a class="page-link" href="ultimos.html?page=${sig}">Siguiente</a>
            </li>
     
        `;
    }


    q('.pagination').innerHTML = html;
}
