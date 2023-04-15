import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector('#eliminar-proyecto')

if(btnEliminar){
    btnEliminar.addEventListener('click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl
        
        Swal.fire({
            title: 'Are really sure?',
            text: "Yoy won't able to revert this, okay?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Yes, delete it, I don't Care",
        }).then((result) => {
            if(result.value){
                //Enviar peticion
                const url = `${location.origin}/proyectos/${urlProyecto}`
                
                axios.delete(url, {params: {urlProyecto}})
                    .then(function(respuesta){
                        console.log(respuesta)

                        Swal.fire(
                            'Deleted!',
                            respuesta.data,
                            'success'
                        )
                        setTimeout(() =>{
                            window.location.href = '/'
                        }, 3000)
                    })
                    .catch(() => {
                        Swal.fire({
                            type: 'error',
                            title: "There's an error",
                            text: "You can't delete this project"
                        })
                    })
            }
        })
    })
}

export default btnEliminar