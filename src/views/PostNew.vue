<template>
    <div class="row mt-3">
      <div class = "col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header bg-dark text-white text-center">
            registrar post
          </div>
          <div class="card-body">
            <form v-on:submit="guardar">
              <div class="d-grid col-6 mx-auto mb-3">
                <img v-if=this.contenido height="100" :src="this.contenido" id="contenidoimg" class="img-thumbnail" alt="">
                <img v-else height="100" src="https://cdn3.iconfinder.com/data/icons/font-awesome-solid/512/signs-post-256.png" id="contenidoimg" class="img-thumbnail" alt=""> 
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-signs-post"></i></span>
                <input type="text" v-model = 'titulo' id='titulo' placeholder="Ingrese el título del Post" maxlength="50" class="form-control">
              </div>
              <span class="input-group-text"><i class="fa-solid fa-photo-film"></i></span>
                <input v-on:change="previsualizarcontenido"  type="file" accept="image/png, image/gif" class="form-control">
                  <div>
                    <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                    <input type="text" v-model = 'autor' id="autor" placeholder="Ingrese el autor del Post" maxlength="200" class="form-control">
                  </div>
                  <div class="d-grid col-6 mx-auto mb-3">
                    <br>
                    <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> crear</button>
                  </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </template>

  <script>
  import {mostrarAlerta, enviarSolicitud} from '../funciones'
  
  export default{
    data(){
      return{
        titulo:'',
        contenido: '',
        autor:'',
        url:'http://127.0.0.1:8000/api/v1/posts',
        cargando:false
      }
    },
    methods:{
  guardar(){
    event.preventDefault();
    var micontenido = document.getElementById('contenidoimg')
    this.contenido = micontenido.src;

    if(this.titulo.trim()==''){
      mostrarAlerta('Ingrese un Título','warning', 'titulo');
    }else if(this.autor.trim()==''){
      mostrarAlerta('Ingrese un Autor','warning', 'autor');
    }else{
      var parametros = {titulo:this.titulo.trim(),contenido:this.contenido.trim(),autor:this.autor.trim()}
      enviarSolicitud('POST',parametros,this.url, 'Post registrado con éxito!!');
    }
  },
  previsualizarcontenido(event){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function(){
        var micontenido = document.getElementById('contenidoimg');
        micontenido.src = reader.result;
        this.contenido = micontenido.src;
      }
    }
    },
    
  }
  </script>
  