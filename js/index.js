const URL_API = "https://api.themoviedb.org";
const API_KEY = "28dadedaa0553049189b17dfb82fb1ec";

//Ejecutar Funcion con DOM cargado
document.addEventListener("DOMContentLoaded", () => {
    pintarPeliculas();
    pintarPopular();
    pintarPuntuadas();
})

//Funcion retorna Array de Fetch
const getNuevasPeliculas = () => {

    const URL = `${URL_API}/3/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`;

    return fetch(URL)
        .then(response => response.json())
        .then(data => data.results)
        .catch(error => console.log(error))
}

const pintarPeliculas = async () => {
    
    // const nuevasPeliculas = await getApi('popular');
    const nuevasPeliculas = await getNuevasPeliculas();
    //console.log(nuevasPeliculas);

    let html = '';

    //Portadas
    nuevasPeliculas.forEach((pelicula, i) => {
        const { id, title, overview, backdrop_path } = pelicula;
        const urlImagen = `https://image.tmdb.org/t/p/original${backdrop_path}`;
        const urlPelicula = `pelicula.html?id=${id}`;

        //console.log(urlImagen);


        html += `
        <div class="carousel-item ${i === 0 ? "active" : null}" style="background-image:url(${urlImagen})">
       
            <div class="carousel-caption ">
                <h5>${title}</h5>
                <p class="d-none d-md-block">${overview}</p>
                <a class="btn btn-info" href="${urlPelicula}">Mas Información</a>
            </div>

        </div>`;
    });

    //Controles
    html += `
    <a class="carousel-control-prev" href="#carousel-nuevas-peliculas" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Anterior</span>
    </a>

    <a class="carousel-control-next" href="#carousel-nuevas-peliculas" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Siguiente</span>
    </a>`;


    document.getElementsByClassName('list-nuevas-peliculas')[0].innerHTML = html;
}

//**************************************************************************

//Fetch retorna array de populares
const getPopulares = ()=>{ 
    const URL  = `${URL_API}/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`;

    return fetch(URL)
        .then(response=>response.json())
        .then(data=>data.results)
        .catch(error=> console.log(error));
}

const pintarPopular = async ()=>{ 

    // const populares = await getApi('now_playing');
    const populares = await getPopulares();
    //console.log(populares);
    
    let html = '';

    //Recorrer arreglo
    populares.forEach((pelicula, i) => {

        const urlPopular =  `https://image.tmdb.org/t/p/original${pelicula.poster_path}`;
        const urlPelicula = `pelicula.html?id=${pelicula.id}`;

        if (i < 5) {
            html += `
                <li class="list-group-item bg-light mt-4">
                    <div class="row">
                        <div class="col-12">
                            <img src="${urlPopular}" alt=""  class="img-fluid">
                        </div>

                        <div class="col-12 p-2 text-center">
                        <h2 class"text-muted">${pelicula.title}</h2>
                        </div>

                        <div class="col-12 p-2 text-center">
                            <a class="btn btn-info" href="${urlPelicula}">Ver mas</a>
                        </div>
                    <div>
                
                </li>
            `;
        }
        
       
    });

    document.getElementsByClassName('popular')[0].innerHTML = html;
    
};

//**************************************************************************


const getPuntuadas = ()=>{ 

    const URL = `${URL_API}/3/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`;

    return fetch(URL)
        .then(response=>response.json())
        .then(data=>data.results)
        .catch(error=> console.log(error));
};


const pintarPuntuadas = async ()=>{ 

    // const puntuadas = await getApi('top_rated');
    const puntuadas = await getPuntuadas();
    console.log(puntuadas);

    let html = '';

    puntuadas.forEach( (pelicula, i) => {
        const {poster_path, title, id} = pelicula;
        const urlPopular = `https://image.tmdb.org/t/p/original${poster_path}`;
        const urlPelicula = `pelicula.html?id=${id}`;

        if (i < 5) {
            html += `
            <li class="list-group-item bg-light mt-4">
                <div class="row">
                        <div class="col-12">
                            <img src="${urlPopular}" alt=""  class="img-fluid">
                        </div>

                        <div class="col-12 p-2 text-center">
                        <h2>${title}</h2>
                        </div>

                        <div class="col-12 p-2 text-center">
                            <a class="btn btn-info" href="${urlPelicula}">Ver mas</a>
                        </div>
                    <div>
            </li>
            `;
        }

        
    });

    document.querySelector('.puntuadas').innerHTML = html;
    
};


/* const getApi = (section)=>{ 

    const URL  = `${URL_API}/3/movie/${section}?api_key=${API_KEY}&language=es-ES&page=1`;

    return fetch(URL)
        .then(response=>response.json())
        .then(data=>data.results)
        .catch(error=> console.log(error));
}; */