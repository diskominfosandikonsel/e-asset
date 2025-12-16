<template>
   <div class="about" style="padding:15px">
      <q-card bordered class="my-card">
         <q-card-section class="bg-blue-3 text-white">
            <div class="row">
               <div class="col-12 col-md-3">
                  <div class="text-h6 h_titleHead">Home</div>
                  <!-- <div class="text-subtitle2">by John Doe</div> -->
               </div>
            </div>
         </q-card-section>

         <q-separator dark inset />

         <q-card-section class="biruSangatmudaGrad">

            <div class="row">
               <div class="col-12 col-md-3 frWidget ">
                  <div class="row shadow-5 frWidgetSub">
                     <div class="col-4 frWidgetSub1 text-center main1x  row items-center justify-center">
                        <q-icon class="vertical-middle" name="check_circle_outline"
                           style="font-size:420%; color:white" />
                     </div>
                     <div class="col-8 frWidgetSub2 main1">
                        <span class="frWidgetText1">Total Aset</span> <br>
                        <span class="frWidgetText2">25</span>
                     </div>
                  </div>
               </div>
               <div class="col-12 col-md-3 frWidget ">
                  <div class="row shadow-5 frWidgetSub">
                     <div class="col-4 frWidgetSub1 text-center main2x row items-center justify-center">
                        <q-icon name="block" style="font-size:420%; color:white" />
                     </div>
                     <div class="col-8 frWidgetSub2 main2">
                        <span class="frWidgetText1">Dibukukan</span> <br>
                        <span class="frWidgetText2">11</span>
                     </div>
                  </div>
               </div>

               <div class="col-12 col-md-3 frWidget">
                  <div class="row shadow-5 frWidgetSub">
                     <div class="col-4 frWidgetSub1 text-center main6x  row items-center justify-center">
                        <q-icon name="error_outline" style="font-size:420%; color:#646464" />
                     </div>
                     <div class="col-8 frWidgetSub2 main6">
                        <span class="frWidgetText1Dark">Inventarisasi</span> <br>
                        <span class="frWidgetText2Dark">12</span>
                     </div>
                  </div>
               </div>

               <div class="col-12 col-md-3 frWidget">
                  <div class="row shadow-5 frWidgetSub">
                     <div class="col-4 frWidgetSub1 text-center main3x  row items-center justify-center">
                        <q-icon name="error_outline" style="font-size:420%; color:#646464" />
                     </div>
                     <div class="col-8 frWidgetSub2 main3">
                        <span class="frWidgetText1Dark">Dilaporkan</span> <br>
                        <span class="frWidgetText2Dark">12</span>
                     </div>
                  </div>
               </div>

            </div>

            <div class="row">
               <div class="col-12 col-md-6 padding1-5">
                  <div class="frameChart shadow-5">
                     <div id="kondisiAset" style="width:100%; height:400px;"></div>
                  </div>
               </div>
               <div class="col-12 col-md-6 padding1-5">
                  <div class="frameChart shadow-5">
                     <div id="nilaiAsetx" style="width:100%; height:400px;"></div>
                  </div>
               </div>
            </div>

            <div class="row">
               <div class="col-12 col-md-12 padding1-5">
                  <div class="frameChart shadow-5">
                     <div id="container" style="width:100%; height:400px;"></div>
                  </div>
               </div>
            </div>






         </q-card-section>
      </q-card>





      <!-- =================================================== MODAL =========================================================== -->
      <q-dialog v-model="alert" persistent>
         <q-card class="mdl-md">
            <q-card-section class="bg-primary">
               <div class="text-h6 h_modalhead">Simpan Data</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
               <br>
               <span class="h_lable ">Input Nama</span>
               <q-input outlined square :dense="true" class="bg-white margin_btn" />

               <span class="h_lable ">Input Nama</span>
               <q-select v-model="model" :options="inputSelect" option-value="id" option-label="nama" outlined square
                  :dense="true" class="bg-white margin_btn" />
               <!-- <q-input outlined square :dense="true" class="bg-white margin_btn" />  -->

               <span class="h_lable ">Cari File</span>
               <q-file outlined v-model="model" square :dense="true" class="bg-white margin_btn">
                  <template v-slot:prepend>
                     <q-icon name="attach_file" />
                  </template>
               </q-file>
            </q-card-section>

            <q-card-actions class="bg-grey-4 mdl-footer" align="right">

               <q-btn :loading="simpan1" color="primary" @click="simulateProgress(1)" label="Simpan" />
               <q-btn label="Batal" color="negative" v-close-popup />

            </q-card-actions>
         </q-card>
      </q-dialog>




      <!-- =================================================== MODAL =========================================================== -->




   </div>
</template>


<script>
export default {
   data() {
      return {
         alert: false,
         simpan1: false,
         model: '',
         inputSelect: [
            { id: '1', nama: 'kiken', alamat: 'beringin' },
            { id: '2', nama: 'Alung', alamat: 'Anawai' },
         ],
         date: '',
         kondisiAsetData: [
            { name: 'Baik', y: 1250 },
            { name: 'Rusak', y: 340 },
            { name: 'Rusak Berat', y: 120 }
         ],
         nilaiAsetDataMiliar: [
            { name: "Tanah", y: 125000 },
            { name: "Peralatan & Mesin", y: 57000 },
            { name: "Gedung & Bangunan", y: 98000 },
            { name: "Jalan, Irigasi & Jaringan", y: 143000 },
            { name: "Aset Tetap Lainnya", y: 8000 }
         ],
         asetPerOPD: [
            { name: "Sekretariat Daerah", y: 185 },
            { name: "Dinas Pendidikan", y: 742 },
            { name: "Dinas Kesehatan", y: 516 },
            { name: "Dinas PU & Tata Ruang", y: 392 },
            { name: "Dinas Sosial", y: 144 },
            { name: "Dinas Perhubungan", y: 278 },
            { name: "Inspektorat", y: 88 },
         ],


      }
   },
   methods: {
      simulateProgress(number) {
         // we set loading state
         this[`simpan${number}`] = true
         // simulate a delay
         setTimeout(() => {
            // we're done, we reset loading state
            this[`simpan${number}`] = false
         }, 3000)
      },

      KehadiranPie: function () {
         Highcharts.chart('KehadiranPie', {
            chart: {
               type: 'pie',
               backgroundColor: 'transparent'
            },
            credits: {
               enabled: false
            },
            tooltip: {
               pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
               point: {
                  valueSuffix: '%'
               }
            },
            plotOptions: {
               pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                     enabled: false
                  },
                  showInLegend: true
               }
            },
            series: [{
               name: 'Persentase',
               colorByPoint: true,
               data: [
                  {
                     name: 'Hadir',
                     y: 52.08,
                     color: '#1e88e5',
                     // sliced: true,
                     // selected: true
                  },
                  {
                     name: 'Izin',
                     y: 22.92,
                     color: '#7cb342',
                  },
                  {
                     name: 'Tanpa Keterangan',
                     y: 25.00,
                     color: '#ff8a65',
                  },

               ]
            }]
         });



      },

      KehadiranApelPie: function () {


         Highcharts.chart('KehadiranApelPie', {
            chart: {
               type: 'pie',
               backgroundColor: 'transparent',
               options3d: {
                  enabled: true,
                  alpha: 45,
                  beta: 0
               }
            },
            credits: {
               enabled: false
            },
            accessibility: {
               point: {
                  valueSuffix: '%'
               }
            },
            tooltip: {
               pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
               pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  depth: 35,
                  dataLabels: {
                     enabled: true,
                     format: '{point.name}'
                  }
               }
            },
            series: [{
               type: 'pie',
               name: 'Persentase',
               data: [
                  {
                     name: 'Hadir',
                     y: 52.08,
                     color: '#1e88e5',
                     // sliced: true,
                     // selected: true
                  },
                  {
                     name: 'Izin',
                     y: 22.92,
                     color: '#7cb342',
                  },
                  {
                     name: 'Tanpa Keterangan',
                     y: 25.00,
                     color: '#ff8a65',
                  },
               ]
            }]
         });
      },

      kondisiAset: function () {
         Highcharts.chart('kondisiAset', {
            chart: {
               type: 'pie',
               backgroundColor: 'transparent',
               options3d: {
                  enabled: true,
                  alpha: 45,
                  beta: 0
               }
            },
            title: {
               text: "Grafik Kondisi Aset"
            },
            credits: {
               enabled: false
            },
            accessibility: {
               point: {
                  valueSuffix: '%'
               }
            },
            tooltip: {
               pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
               pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  depth: 35,
                  dataLabels: {
                     enabled: true,
                     format: '{point.name}'
                  }
               }
            },
            series: [{
               name: "Nilai Aset",
               data: this.kondisiAsetData
            }]
         });
      },

      asetOPD: function () {
         Highcharts.chart('container', {
            chart: {
               type: 'column',
               backgroundColor: 'transparent',
            },
            title: {
               text: 'Aset OPD'
            },
            credits: {
               enabled: false
            },
            xAxis: {
               type: 'category',
               labels: {
                  autoRotation: [-45, -90],
                  style: {
                     fontSize: '13px',
                     fontFamily: 'Verdana, sans-serif'
                  }
               }
            },
            yAxis: {
               min: 0,
               title: {
                  text: ''
               }
            },
            legend: {
               enabled: false
            },
            tooltip: {
               pointFormat: 'Total Aset: <b>{point.y}</b>'
            },
            series: [{
               name: 'Aset',
               colorByPoint: true,
               groupPadding: 0,
               data: this.asetPerOPD,
               dataLabels: {
                  enabled: true,
                  rotation: -90,
                  color: '#FFFFFF',
                  inside: true,
                  verticalAlign: 'top',
                  y: 10, // 10 pixels down from the top
                  style: {
                     fontSize: '13px',
                     fontFamily: 'Verdana, sans-serif'
                  }
               }
            }]
         })
      },

      nilaiAset: function () {
         Highcharts.chart('nilaiAsetx', {
            chart: {
               type: 'pie',
               backgroundColor: 'transparent',
               custom: {},
               events: {
                  render: function () {
                     var chart = this;
                     var series = chart.series[0];
                     var customLabel = chart.options.chart.custom.label;

                     if (!customLabel) {
                        customLabel = chart.options.chart.custom.label =
                           chart.renderer
                              .label(
                                 'Total<br/>' +
                                 '<strong>2 877 820</strong>'
                              )
                              .css({
                                 color: '#000',
                                 textAnchor: 'middle'
                              })
                              .add();
                     }

                     var x = series.center[0] + chart.plotLeft;
                     var y = series.center[1] + chart.plotTop -
                        (customLabel.attr('height') / 2);

                     customLabel.attr({ x: x, y: y });

                     // Atur ukuran font berdasarkan diameter
                     customLabel.css({
                        fontSize: (series.center[2] / 12) + 'px'
                     });
                  }
               }
            },

            accessibility: {
               point: {
                  valueSuffix: '%'
               }
            },

            title: {
               text: '2023 Norway car registrations'
            },

            subtitle: {
               text: 'Source: SSB'
            },

            tooltip: {
               pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
            },

            legend: {
               enabled: false
            },

            plotOptions: {
               series: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  borderRadius: 8,
                  dataLabels: [
                     {
                        enabled: true,
                        distance: 20,
                        format: '{point.name}'
                     },
                     {
                        enabled: true,
                        distance: -15,
                        format: '{point.percentage:.0f}%',
                        style: { fontSize: '0.9em' }
                     }
                  ]
               }
            },

            series: [{
               name: 'Registrations',
               colorByPoint: true,
               innerSize: '75%',
               data: [
                  { name: 'EV', y: 23.9 },
                  { name: 'Hybrids', y: 12.6 },
                  { name: 'Diesel', y: 37.0 },
                  { name: 'Petrol', y: 26.4 }
               ]
            }]
         });
      },


      async button() {
         await setTimeout(() => {
            console.log('ini query pembacaannya')
         }, 2000);
         console.log('telASO')
      }
   },

   mounted() {
      this.KehadiranApelPie();
      this.button();
      this.kondisiAset();
      this.nilaiAset();
      this.asetOPD();
   },
}
</script>
