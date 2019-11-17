<template>
  <div class="modules">
   <v-container
        class="fill-height"
        fluid
      >
      
        <v-row class="shrink"
          align="center"
          justify="center"
        >
          <v-col >
            <v-card>
      <v-card-title>
        Логи
        <v-spacer></v-spacer>
        <!-- <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Пошук"
          single-line
          hide-details
        ></v-text-field> -->
      </v-card-title>
             <v-data-table
      :headers="headers"
      :items="logs"
      class="elevation-1"
      :header-props="{
        sortByText: 'Відсортувати'
      }"
      :footer-props="{
        
        itemsPerPageText: 'К-сть записів',
        itemsPerPageAllText: 'Всі'
      }"
    >
    <template v-slot:footer.page-text="{ pageStart, pageStop, itemsLength }">
      {{ pageStart }} - {{ pageStop }} з {{ itemsLength }}
    </template>
    <template v-slot:item.data="{ item }">
      <v-row> 
        
      <v-col cols="12" md="3" v-for="port in JSON.parse(item.data)" :key="port.port">
        <v-btn depressed outlined :color="port.relay? 'info' : ''" block dark>
                     <v-icon v-if="!port.lastID" class="text-center" large dark left>mdi-power-socket-eu</v-icon>
                   <span class="title text-center" v-else-if="findDevice(port.lastID)">{{findDevice(port.lastID).title}}</span> 
                   <span class="title text-center" v-else>{{port.lastID}}</span> 
        </v-btn>
        </v-col>
       </v-row>   
        </template>
         <template v-slot:item.createdAt="{ item }">
          
            {{ $date_format($date_json(item.createdAt), 'dd/MM/yyyy HH:mm') }}
        
        </template>
    </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
import _ from 'lodash'
export default {

  name: 'modules',
  data() {
    return {
      headers: [
        {
          text: 'Модуль',
          align: 'left',
          value: 'module.title',
        },
        { text: 'Дані', value: 'data', sortable:false },
        { text: 'Дата', value: 'createdAt'}
      ],
      
      logs:[],
      devices:[],
      //search: '',
    }
    },
  
  created () {
      this.getLogs();
      this.getDevices();

    },
    methods: {getDevices(){
        let vm = this;
    vm.$axios.get('device')
  .then(function (response) {
    // handle success
    vm.devices=response.data.devices;
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  })
  },
      getLogs(){
        let vm = this;
    vm.$axios.get('log')
  .then(function (response) {
    // handle success
    vm.logs=response.data.logs;
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  })
  },
  findDevice(id){
    return _.find(this.devices, function(o) { return o.externalId == id; })
  },

  filterLogs (value, search, item) {
    let vm=this;
    //console.log(`Value - ${value}, Item - ${item}, Search - ${search}`)
      // return value != null &&
      //   search != null &&
      //   typeof value === 'string' &&
      //   //vm.$date_format(vm.$date_json(value), 'dd/MM/yyyy').toString().indexOf(search) !== -1 //&&
      //   //value.toString().toLowerCase().indexOf(search) !== -1
      //  return vm.logs.filter((i) => {
      //   return vm.$date_format(vm.$date_json(i.createdAt), 'dd/MM/yyyy').toString() == search.toString().toLowerCase();
      // })
        
    },
}}
</script>
