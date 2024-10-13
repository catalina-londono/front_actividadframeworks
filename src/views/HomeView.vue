<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <br>
        <table class="table table-bordered table-striped">
         <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>título</th>
            <th>contenido</th>
            <th>autor</th>
            <th>fecha de registro</th>
            <th></th>
          </tr>
         </thead>
         <tbody class="table-group-divider" id="contenido">
          <tr v-if="this.cargando">
            <td colspan="6"><h3>cargando...</h3></td>
          </tr>
          <tr v-else v-for="post, i in posts" :key="post.id">
            <td v-text="(i+1)"></td>
            <td v-text="post.id"></td>
            <td v-text="post.titulo"></td>
            <td>
              <img v-if="post.contenido" style="width: 150px !important;" :src="post.contenido" class="img-thumbnail" alt="">
              <img v-else style="width: 150px !important;" src="https://cdn4.iconfinder.com/data/icons/facebook-likes/100/8.png">
            </td>
            <td v-text="post.autor"></td>
            <td v-text=" new Date(post.created_at).toLocaleDateString('es-ES',{
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })"></td>
            <td >
              <router-link :to="{path:'viewP/'+post.id}" class="btn btn-info">
                <i class="fa-solid fa-eye"></i>
              </router-link>
              &nbsp;
              <router-link :to="{path:'editP/'+post.id}" class="btn btn-warning">
                <i class="fa-solid fa-edit"></i>
              </router-link>
              &nbsp;
              <button class="btn btn-danger" v-on:click="eliminar(post.id,post.titulo)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
         </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {confirmar} from '../funciones'
import { useRoute } from 'vue-router';

  export default {
    data(){
      return{
        posts:null,
        cargando:false
      }
    },
    mounted(){
      this.getPosts();
     
    },
    methods:{
      getPosts(){
        this.cargando=true;
        axios.get('http://127.0.0.1:8000/api/v1/posts').then(
        res =>{
          this.posts = res.data.data;
          this.cargando=false;
        }      
        );      
      },
      eliminar(id,titulo){
        confirmar('http://127.0.0.1:8000/api/v1/posts/', id, 'Eliminar Registro', '¿Realmente desea eliminar a '+titulo+'?')
        this.cargando=false
      }
    }
  }
</script>
