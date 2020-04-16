const URL_API = "https://api.themoviedb.org";
const API_KEY = "28dadedaa0553049189b17dfb82fb1ec";
var ID_P = "";

const q = document.querySelector.bind(document);
const cl = console.log



document.addEventListener('DOMContentLoaded',()=>{ 
    this.ID_P = getPeliculaId().id;
    pintarPelicula(this.ID_P);
    // getTrailer(this.ID_P);
    pintarTrailer(this.ID_P);
});



const getPeliculaId = ()=>{ 
    let vars = {};

    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value){
        vars[key] = value;
    });
    return vars;
}


const getPelicula = (param)=>{ 
    //console.log(param, "get");

    const URL = `${URL_API}/3/movie/${param}?api_key=${API_KEY}&language=es-ES`;
    
    return fetch(URL)
        .then(response=>response.json())
        .then(data=>data)
        .catch(error => console.log(error))  
}


const pintarPelicula = async(idP)=>{ 

    const peli = await getPelicula(idP);
        //console.log("pintar",peli);
    const{backdrop_path,poster_path, title, overview, genres, release_date} = peli;

    pintarFondo(backdrop_path);
    pintarPoster(poster_path, title);
    pintarDetalles(title, overview, genres, release_date);
}


const pintarFondo = (imagen)=>{ 
    const imagenUrl = `https://image.tmdb.org/t/p/original/${imagen}`;
    q('.fondo').style.backgroundImage = `url('${imagenUrl}')`;
}

const pintarPoster = (poster, titulo)=>{
    const urlPoster = `https://image.tmdb.org/t/p/original/${poster}`;

    const html = `
        <img src="${urlPoster}" alt="${titulo}" class="img-fluid rounded border border-white">
    `;

    q('.pelicula-poster-imagen').innerHTML = html;
}

const pintarDetalles = (titulo, descripcion, genero, fecha)=>{ 
    let dat = fecha.split("-");//Separa año mes dia
    //console.log(dat);
    
    let htmlGenero ="";

    genero.forEach(gen => {
        htmlGenero += `<li>${gen.name}</li>`;
    });

    const html =`
        <h1 class="display-4">
            ${titulo}
            <span>(${dat[0]})</span>
        </h1>

        <span class="trailer h5" data-toggle="modal" data-target="#verTrailer">
            <i class="far fa-play-circle mt-0 mb-4 pb-2"></i> Ver Trailer
        </span>

        <h5>Descripción</h5>
        <p class="pl-4">${descripcion}</p>
        <h5>Generos</h5>
        <ul class="">
            ${htmlGenero}
        </ul>
    `;

    q('.info-pelicula').innerHTML = html;
    
}



const getTrailer = (id)=>{ 
    const URL = `${URL_API}/3/movie/${id}/videos?api_key=${API_KEY}&language=es-ES`;
    
    return fetch(URL)
            .then(response=>response.json())
            //.then(data=>pintarTrailer(data.results)) --- Para no usar asincrona
            .then(data=>data.results)
            .catch(error => console.log(error))

}


/* 
SIN ASYN AWAIT


const pintarTrailer = (obj)=>{ 
    //cl("Pintar trailer",obj);

    let videokey = "";

    obj.forEach(vid => {
        if (vid.type === "Trailer" && vid.site === "YouTube") {
            videokey = vid.key;
            //cl(videokey);
        }
    });

    let frame = "";

    if (videokey !=="") {
        frame = `
            <iframe width="100%" height="440" src="https://www.youtube.com/embed/${videokey}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
    }else{
        frame = `
            <div class="container text-white text-center display-4 ">No hay video disposible</div>
        `;
    }

    q('.videoT').innerHTML = frame;
}
 */

const pintarTrailer = async(id)=>{ 

    const obj = await getTrailer(id);
    //cl("objsss", obj)
    let videokey = "";

    obj.forEach(vid => {
        if (vid.type === "Trailer" && vid.site === "YouTube") {
            videokey = vid.key;
            //cl(videokey);
        }
    });

    let frame = "";

    if (videokey !=="") {
        frame = `
            <iframe width="100%" height="440" src="https://www.youtube.com/embed/${videokey}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
    }else{
        frame = `
            <div class="container text-white text-center display-4 ">No hay video disposible</div>
        `;
    }

    q('.videoT').innerHTML = frame;
}
