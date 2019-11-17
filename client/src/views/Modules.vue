<template>
  <div class="modules">
   <v-container
        class="fill-height"
        fluid
      >
      
        <v-row v-for="(module, index) in modules" :key="module._id" class="shrink"
          align="center"
          justify="center"
        >
          <v-col>
              <v-card
              dark
            >
              <v-card-title class="headline">{{module.title}}
                <v-spacer>
                </v-spacer>
                <v-dialog v-model="deleteDialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">Видалити назавжди?</v-card-title>
        <v-card-text><h2>Модуль: {{editedItem.title}}</h2> <h3>Опис: {{editedItem.description}}</h3></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="close">Відміна</v-btn>
          <v-btn color="primary" text @click="deleteItem">Видалити</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-icon @click="editItem(module)" class="ma-2" large v-on="on">mdi-pencil</v-icon>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Редагувати модуль</span>
              </v-card-title>
  
              <v-card-text>
                <v-form
      ref="form"
    >
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" >
                      <v-text-field v-model="editedItem.title" label="Назва"></v-text-field>
                    </v-col>
                     <v-col cols="12" sm="12" >
                      <v-text-field v-model="editedItem.externalId" label="ІD"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" >
                      <v-text-field v-model="editedItem.description" label="Опис"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" >
                      <v-text-field v-model="editedItem.ports" label="К-сть портів"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                </v-form>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close()">Відміна</v-btn>
                <v-btn color="blue darken-1" text @click="save()">Зберегти</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
                 
                 <v-divider
                 vertical></v-divider>
                 <v-icon @click="deleter(module)"  class="ma-2" large>mdi-delete-forever</v-icon>
              </v-card-title>
  
              <v-card-subtitle>ID ({{module.externalId}}) {{module.description}}</v-card-subtitle>
  
             <v-card-text>
               <v-row v-if="module.data">
               <v-col cols="12" md="2"  v-for="port in module.data" :key="port.port">
                  <v-btn block @click="switchRelay(index, module.externalId, port.port, port.relay)" :color="port.relay? 'info' : ''" dark>
                     <v-icon v-if="!port.state" class="text-center" large dark left>mdi-power-socket-eu</v-icon>
                   <span class="title text-center" v-else>{{port.lastID}}</span>
                   <!-- <span class="title text-center grey--text" v-else>{{port.lastID}}</span>   -->
             </v-btn>
               </v-col>
               </v-row>
               <v-row v-else>
               <v-col cols="12">
                  <v-alert type="error" border="left"
        
        dark>
       Модуль не відповідає
      </v-alert>
               </v-col>
               </v-row>
             </v-card-text>
            </v-card>
            
          </v-col>
           <v-btn
                fixed
                fab
                bottom
                right
                light
                large
                @click="editItem()"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
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
      modules: [],
      mqttClient: {},
      logs:[],
      editedItem: {
        _id: '',
        title: '',
        ports:'',
        externalId:'',
        description:''
      },
      editedIndex:-1,
      dialog: false,
      deleteDialog: false,
    }
    },
  
  created () {
      this.getModules();
      //this.getLastLog();
      //this.$mqtt.publish('melnyk/rfid/'+id+'/in', JSON.stringify({relay:port, state:!state}));
      //this.$mqtt.publish('param/param/param/test', 'message')

    },
    methods: {
      getModules(){
        let vm = this;
    vm.$axios.get('module')
  .then(function (response) {
    // handle success
    vm.modules=response.data.modules;
    vm.MQTTConnection();
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  })
  },
  getLastLog(){
        let vm = this;
        setInterval(function(){
vm.$axios.get('log/last')
  .then(function (response) {
    // handle success
    vm.logs=response.data.logs;

    console.log(vm.logs);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  })
        }, 2000);
  },
  MQTTConnection(){
    let vm=this;
    let success = false;
    vm.$mqtt.on('message', function (topic, message) {
  console.log(topic+message.toString())
  try{
    let ind = _.findIndex(vm.modules, function(o) { return o.externalId == JSON.parse(message).ID; });
    if(ind!==-1){
      //vm.logs[ind]=JSON.parse(message);
      vm.$set(vm.modules[ind], 'data', JSON.parse(message).data)
      //success=true;
      //vm.modules[ind].data = JSON.parse(message).data
      console.log(vm.modules);
    }
    else{
      //success=false;
      //vm.logs.push(JSON.parse(message).data)
    }

  }catch(err){}
  //vm.$mqtt.end()
})
vm.PubSub();
  },

  PubSub(){
    let vm = this;
_.forEach(this.modules, function(module) {
  vm.$mqtt.subscribe('melnyk/rfid/'+module.externalId+'/out');
  vm.$mqtt.publish('melnyk/rfid/'+module.externalId+'/in', 'GET_STATUS');
  console.log('Work')
});
 },
  switchRelay(index, id, port, state){
    //this.modules[index].data[port-1].relay=!this.modules[index].data[port-1].relay
      this.$mqtt.publish('melnyk/rfid/'+id+'/in', JSON.stringify([{relay:port, state:!state}]));

    }, 
    findId(id){
      try{
      let data = (_.find(this.logs, function(o) { return o.ID==id })).data;
      console.log('DAta',data);
      if(data){

      return data;
      }
      else return false 
    }
    catch{}
    },
     editItem (item) {
        this.editedIndex = this.modules.indexOf(item);
        console.log("INDEX", this.editedIndex)
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem(){
        let vm= this;
        this.$axios.delete('module/'+this.editedItem._id ).then(function(response){
          if(response.data){vm.deleteDialog=false;}
        })
        this.$delete(this.modules, this.editedIndex);
      },

      deleter (item) {
        this.editedItem = Object.assign({}, item);
        this.editedIndex = this.modules.indexOf(item);
        this.deleteDialog=true;
      },

      close () {
        this.dialog = false;
        this.deleteDialog=false;
        this.editedItem = Object.assign({}, {});
        this.editedIndex = -1
      },
      save () {
        if (this.editedIndex > -1) {
         let vm = this;
         Object.assign(vm.modules[vm.editedIndex], vm.editedItem);
        
        this.$axios.patch('module/'+this.editedItem._id,{
        title: vm.editedItem.title,
        ports: vm.editedItem.ports,
        externalId: vm.editedItem.externalId,
        description:vm.editedItem.description,
        })
        vm.close();
        } else {
         let vm = this;
        
        this.$axios.post('module/',{
            title: vm.editedItem.title,
        ports: vm.editedItem.ports,
        externalId: vm.editedItem.externalId,
        description:vm.editedItem.description,
        }).then(function (response) {
          console.log(response);
    vm.modules.push(response.data.document);
    vm.PubSub();
  })
        vm.close();
        }}
  }
}
</script>
