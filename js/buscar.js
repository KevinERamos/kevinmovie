const URL_API = "https://api.themoviedb.org";
const API_KEY = "28dadedaa0553049189b17dfb82fb1ec";

const q = document.querySelector.bind(document);
const cl = console.log



document.addEventListener('DOMContentLoaded',()=>{
    let busq = buscar();
});



const getPelis = (cad)=>{ 
    const URL = `${URL_API}/3/search/movie?api_key=${API_KEY}&language=es-ES&query=${cad}&page=1&include_adult=true`;

    return fetch(URL)
        .then(response=>response.json())
        .then(data=>data.results)
        .catch(error => cl(error))
}


const buscar = async ()  =>{ 
    let cad = q('#buscar').value;
    // cl(cadena);

    if (cad.length < 3) {
        return;
    }else if(cad.length >= 3){
        const pelis = await getPelis(cad);
        cl(pelis)
    

        let html = '';
        let imgBase = `https://image.tmdb.org/t/p/w500/`;

        if (pelis.length > 0) {
            

            pelis.forEach(pelicula => {

                const {id, title, overview, poster_path} = pelicula;
    
                
                    html += `
                    <div class="col-12 col-sm-6 col-md-3" >
                        <img src="https://image.tmdb.org/t/p/w500${poster_path}" class="card-img-top text-center" alt="SIN IMAGEN">
                        <div class="card-body text-center">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text"></p>
                            <a href="pelicula.html?id=${id}" class="btn btn-info">Más Detalles</a>
                        </div>
                    </div>
                `;
                
                   

            });
            q('.listado').innerHTML = html;
            
        }
        else{
            html += `           
                    <h5 class="display-4 p-4 text-center">NO HAY RESULTADOS PARA ESTA BUSQUEDA</h5>         
        `;
        q('.sin-listado').innerHTML = html;
        }
    }

}



