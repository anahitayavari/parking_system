<script setup>
import { RouterLink, RouterView } from 'vue-router'


</script>

<template>
  <q-card-section>
  <div class="text-center q-mt-lg ">
<strong class="text-red-5 font" >پارکینگ</strong>

  </div>
  <div class="row q-mt-md justify  ">
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 ">
      <q-input rounded filled v-model="text" label="شماره پلاک" class="text-grey-8 " />
    </div>

  </div>
    <div class="col-6 button q-mt-md">
      <q-btn color="pink-7" glossy  label="ورود"></q-btn>
    </div>

  </q-card-section>
  <RouterView />
</template>

<style scoped>
.font{
  font-size: 20px;
}
.justify{
  justify-content: center;

}
.button{
  display: grid;
  place-items: center;
}

</style>
