<script>
export default {
  name: "Parking_System",
  mounted() {
    for (let i=1;i<=12;i++){
      this.saved_plates.push(
          {
            id : i,
            plate : null,
            time : null,
            available : true,
          }
      )
    }
    if (localStorage.getItem("plates")){
      this.saved_plates = JSON.parse(localStorage.getItem("plates"));
    }


  },
  data(){
    return {
      plate : null,
      saved_plates : [],
      randomElement:''

    }
  },
  methods:{
    getCurrentTime() {
          const now = new Date();

          const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // Use 24-hour format
          };

          const formattedDate = now.toLocaleString('en-US', options)
              .replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+)/, '$3/$1/$2 - $4');

          return formattedDate;
    },
    CheckPlate(give_plate){

      let exists = false;
      this.saved_plates.forEach(item => {
        if (item.plate === give_plate ){
          exists = true;
        }
      })

      return exists;
    },
    SavePlateValue(){
      if(this.plate.trim() !== ''){
        let data = {
          id: null,
          plate : this.plate,
          time : this.getCurrentTime(),
          available : true,
        }
        if (this.CheckPlate(this.plate)){
          this.plate = null;
          return alert('این پلاک وجود دارد')
        }
        let places = this.saved_plates.filter(item => {
          if (!item.plate && item.available){
            return item;
          }
        })
        if (places.length < 1){
          return alert('ظرفیت تکمیل است')
        }
        //get random from places
        const randomIndex = Math.floor(Math.random() * places.length);
        let find = places[randomIndex]
        data.id = find.id
        this.saved_plates =  this.saved_plates.map(item => {
          if (item.id === find.id){
            return data;
          }else{
            return item;
          }
        })
        localStorage.setItem('plates', JSON.stringify(this.saved_plates))

      }else{
        alert('لطفا پلاک خود را وارد کنید')
      }

    },
    Change_Available(id){
      this.saved_plates = this.saved_plates.filter(item => {
        if (item.id === id){
          item.available = !item.available;
        }
        return item;
      })
      localStorage.setItem('plates', JSON.stringify(this.saved_plates))
    },
    Exit_Car(id){
      this.saved_plates = this.saved_plates.filter(item => {
        if (item.id === id){
          item.available = true;
          item.plate  = null;
          item.time  = null;
        }
        return item;
      })

      //
      alert('هزینه خودرو : ')

      localStorage.setItem('plates', JSON.stringify(this.saved_plates))
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
          <q-card-section class=" q-pa-xs">
            <div v-if="value.plate" class="q-mb-md text-center">
              <div>
                <strong class="text-white">{{value.plate}}</strong>
              </div>
              <div>
                <span class="text-white">{{value.time}}</span>
              </div>
            </div>
            <div class="text-center">
              <q-btn @click="Exit_Car(value.id)" v-if="value.plate" color="white" label="خروج" size="sm" text-color="dark" rounded class="q-mr-sm"></q-btn>
              <q-btn @click="Change_Available(value.id)" rounded label="تغییر وضعیت" color="grey-8" size="sm"></q-btn>
            </div>
          </q-card-section>
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