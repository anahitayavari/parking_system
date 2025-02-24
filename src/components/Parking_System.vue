<script>
export default {
  name: "Parking_System",
  mounted() {
    for (let i=1;i<=60;i++){
      this.saved_plates.push(
          {
            id : i,
            plate : null,
            time : null,
            available : true,
          }
      )
    }

    this.loadFromLocalStorage()



  },
  data(){
    return {
      plate : null,
      saved_plates : [],
      randomElement:''

    }
  },
  methods:{

    pickRandom(){
      const randomIndex = Math.floor(Math.random() * this.saved_plates.length);
      this.randomElement = this.saved_plates[randomIndex];
    },

    SavePlateValue(){
      if(this.plate.trim() !== ''){
        data = {
          plate : this.plate,
          time : Date.now(),
          available : true,
        }
        let places = this.saved_plates.filter(item => {
          if (!item.plate && item.available){
            return item;
          }
        })


      }else{
        alert('لطفا پلاک خود را وارد کنید')
      }

    },
    UpdatePlateValue(){
      localStorage.setItem("saved_plate", JSON.stringify(this.saved_plate))
    },
    loadFromLocalStorage(){
      const SaveData = localStorage.getItem("saved_plate")
      if(SaveData){
        this.saved_plates = JSON.parse(SaveData)
      }
    }
  }
}
</script>

<template>
  <q-card-section>
    <div class="text-center q-mt-lg ">
      <strong class="text-red-5 font" >پارکینگ</strong>

    </div>
    <div class="row q-mt-md justify  ">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 ">
        <q-input rounded filled v-model="plate" label="شماره پلاک" class="text-grey-8 " />
      </div>

    </div>
    <div class="col-6 button q-mt-md">
      <q-btn color="pink-7" glossy  label="ورود" @click="SavePlateValue"></q-btn>
    </div>

    <div class="row q-col-gutter-lg q-mt-md ">
      <div class="col-md-2" v-for="(value,index) in saved_plates">
        <q-card class="card" :class="{'bg-green-6' : !value.plate && value.available,'bg-red-6': value.plate , 'bg-dark': !value.available}">

        </q-card>
      </div>
    </div>


  </q-card-section>
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
.card{
  padding: 15px 10px;
}

</style>