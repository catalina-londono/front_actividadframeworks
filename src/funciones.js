import Swal from "sweetalert2";
import axios from "axios";

export function mostrarAlerta(titulo, icono,foco=''){
    if(foco!=''){
        document.getElementById(foco).focus();
    }
    Swal.fire({
        title:titulo,
        icon:icono,
        customClass:{confirmButton:'btn btn-primary',popup:'animated zoonIn'}
    });
}

export function confirmar(urlConSlash,id,titulo,mensaje){
    var url = urlConSlash+id;
    const swalWithBootStrapButton = Swal.mixin({
        customClass:{confrimarButton: 'btn btn-success me-3', cancelButton: 'btn btn-danger'}
    });

    swalWithBootStrapButton.fire({
        title:titulo,
        text:mensaje,
        icon:'question',
        showCancelButton:true,
        confrimarButtonText:'<i class="fa-solid fa-check"></i> SI, Eliminar',
        cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancelar'}).then((
            res=>{
                if(res.isConfirmed){
                    enviarSolicitud('DELETE', {id:id}, url, 'Eliminado con éxito')
                }else{
                    mostrarAlerta('Operación Cancelada', 'info');
                }
            }
        ));
}

export function enviarSolicitud(metodo,parametros,url,mensaje){

    axios({
        method:metodo,
        url:url,
        data:parametros,
    }).then(function(res){
        var estado = res.status;
        if(estado==200){
            mostrarAlerta(mensaje,'success');
            window.setTimeout(function(){
                window.location.href = '/'
            },1000);
        }
        else if(estado==201){
            mostrarAlerta(mensaje,'success');
            window.setTimeout(function(){
                window.location.href = '/'
            },1000);       
        }
        else if(estado ==202){
            mostrarAlerta(mensaje,'success');
            window.setTimeout(function(){
                window.location.href = '/'
            },1000);
        }
        else{
            mostrarAlerta('No se pudo recuperar la respuesta','error');
        }
}).catch(function(error){
    console.log(error); // Para ver el error completo en la consola
    if(error.response) {
        mostrarAlerta(`Error: ${error.response.status} - ${error.response.statusText}`, 'error');
    } else {
        mostrarAlerta('Servidor no disponible', 'error');
    }
});
}