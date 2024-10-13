<template>
  <div class="row mt-3">
    <div class = "col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          detalle del <param name="" value="">ost
        </div>
        <div class="card-body">          
            <div class="d-grid col-6 mx-auto mb-3">
              <router-link :to="{path:'/'}" class="btn btn-info">
                <i class="fa-solid fa-arrow-left"></i> regresar a la lista
              </router-link>
              <div>
                <div class="d-grid col-6 mx-auto mb-3">
              <img v-if=this.contenido height="100" :src="this.contenido" id="contenidoimg" class="img-thumbnail" alt="">
              <img v-else height="100" src="https://cdn3.iconfinder.com/data/icons/font-awesome-solid/512/signs-post-256.png" id="contenidoimg" class="img-thumbnail" alt=""> 
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-signs-post"></i></span>
              <label v-text="titulo" class="form-control"></label>
            </div>
            <div class="input-group mb-3">
            <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
            <label v-text="autor" class="form-control"></label>
                <div>
                </div>
                </div>
              </div>
              </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mostrarAlerta, enviarSolicitud} from '../funciones'
import { useRoute } from 'vue-router';
import axios from 'axios';


export default{
  data(){
    return{
      id:0,
      titulo:'',
      contenido: '',
      autor:'',
      url:'http://127.0.0.1:8000/api/v1/posts',
      cargando:false
    }
  },
  mounted(){
    const route = useRoute();
      this.id = route.params.id;
      this.url += '/'+this.id; 
      this.getPost();
    },
  methods:{
    
  getPost(){
      axios.get(this.url).then(
        res=>{
          this.titulo = res.data.data.titulo;
          this.contenido = res.data.data.contenido;
          this.autor = res.data.data.autor;
        }
      );
    },
actualizar(){
  event.preventDefault();
  var micontenido = document.getElementById('contenidoimg')
  this.contenido = micontenido.src;

  if(this.titulo.trim()==''){
    mostrarAlerta('Ingrese un Título','warning', 'titulo');
  }else if(this.autor.trim()==''){
    mostrarAlerta('Ingrese un Autor','warning', 'autor');
  }else{
    var parametros = {titulo:this.titulo.trim(),contenido:this.contenido.trim(),autor:this.autor.trim()}
    enviarSolicitud('PUT',parametros,this.url, 'Post actualizado con éxito!!');
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
