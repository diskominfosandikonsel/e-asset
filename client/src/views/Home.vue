<template>
   <div class="about" style="padding:15px">
      <q-card bordered class="my-card">
         <q-card-section class="bg-blue-3 text-white">
            <div class="row">
               <div class="col-12 col-md-3">
                  <div class="text-h6 h_titleHead">Home</div>
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
                        <span class="frWidgetText1">Total Aset Daerah</span> <br>
                        <span class="frWidgetText2">25</span>
                     </div>
                  </div>
               </div>

               <div class="col-12 col-md-3 frWidget">
                  <div class="row shadow-5 frWidgetSub">
                     <div class="col-4 frWidgetSub1 text-center main2x row items-center justify-center">
                        <q-icon name="block" style="font-size:420%; color:white" />
                     </div>
                     <div class="col-8 frWidgetSub2 main2">
                        <span class="frWidgetText1">Nilai Buku</span> <br>
                        <span class="frWidgetText2">11</span>
                     </div>
                  </div>
               </div>

               <div class="col-12 col-md-3 frWidget">
                  <div class="row shadow-5 frWidgetSub">
                     <div class="col-4 frWidgetSub1 text-center main3x  row items-center justify-center">
                        <q-icon name="error_outline" style="font-size:420%; color:white" />
                     </div>
                     <div class="col-8 frWidgetSub2 main3">
                        <span class="frWidgetText1">Inventarisasi</span> <br>
                        <span class="frWidgetText2">12</span>
                     </div>
                  </div>
               </div>

               <div class="col-12 col-md-3 frWidget">
                  <div class="row shadow-5 frWidgetSub">
                     <div class="col-4 frWidgetSub1 text-center main4x  row items-center justify-center">
                        <q-icon name="error_outline" style="font-size:420%; color:white" />
                     </div>
                     <div class="col-8 frWidgetSub2 main4">
                        <span class="frWidgetText1">Dilaporkan</span> <br>
                        <span class="frWidgetText2">12</span>
                     </div>
                  </div>
               </div>
            </div>

            <div class="row">
               <div class="col-12 col-md-8 padding1-5">
                  <div class="frameChart shadow-5">
                     <span class="frWidgetText1Dark">Aset Terbaru</span>
                     <hr class="hrpagin2">
                     <q-list bordered class="rounded-borders">
                        <q-item clickable v-ripple v-for="(item) in asetList" :key="item.id">
                           <q-item-section avatar>
                              <q-avatar>
                                 <img :src="item.avatar">
                              </q-avatar>
                           </q-item-section>

                           <q-item-section>
                              <q-item-label lines="1">{{ item.nama }}</q-item-label>
                              <q-item-label caption lines="2">
                                 <span class="text-weight-bold">{{ item.opd }}</span>
                              </q-item-label>
                           </q-item-section>

                           <q-item-section side top>
                              {{ item.waktu }}
                           </q-item-section>
                        </q-item>

                        <q-separator inset="item" v-if="index < asetList.length - 1" />
                     </q-list>


                  </div>
               </div>

               <div class="col-12 col-md-4 padding1-5">
                  <div class="frameChart shadow-5">
                     <span class="frWidgetText1Dark">Aset OPD Terbanyak</span>
                     <hr class="hrpagin2">
                     <div class="tbl_responsive" id="printMe" style="margin-right:1%">
                        <table width="100%">
                           <thead>
                              <tr class="h_table_head bg-blue-4" style="color:white">
                                 <th>OPD</th>
                                 <th>Jumlah Aset</th>
                              </tr>
                           </thead>
                           <tbody class="h_table_body">
                              <tr v-for="(item, index) in dummyAsetOPD" :key="index">
                                 <td>{{ item.opd }}</td>
                                 <td>{{ item.jumlah }}</td>
                              </tr>
                           </tbody>
                        </table>
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
                     <div id="usiaAset" style="width:100%; height:400px;"></div>
                  </div>
               </div>
            </div>

            <div class="row">
               <div class="col-12 col-md-12 padding1-5">
                  <div class="frameChart shadow-5">
                     <div id="container" style="width:100%; height:500px;"></div>
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
         dummyAsetOPD: [
            { opd: "Dinas Pekerjaan Umum dan Penataan Ruang", jumlah: 1245 },
            { opd: "Dinas Pendidikan dan Kebudayaan", jumlah: 987 },
            { opd: "Dinas Kesehatan", jumlah: 842 },
            { opd: "Sekretariat Daerah", jumlah: 615 },
            { opd: "Dinas Perhubungan", jumlah: 488 },
            { opd: "Dinas Pertanian", jumlah: 436 },
            { opd: "Dinas Komunikasi dan Informatika", jumlah: 312 },
            { opd: "Dinas Lingkungan Hidup", jumlah: 276 },
            { opd: "Dinas Sosial", jumlah: 198 },
            { opd: "Badan Keuangan dan Aset Daerah", jumlah: 154 }
         ],
         asetList: [
            {
               id: 1,
               nama: 'Kijang Innova 2.0 G/MT Lux',
               opd: 'Dinas Komunikasi Informatika dan Persandian',
               waktu: '1 min ago',
               avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
            },
            {
               id: 2,
               nama: 'Sepeda Motor Dinas',
               opd: 'Dinas Transmigrasi dan Ketenagakerjaan',
               waktu: '5 min ago',
               avatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
            },
            {
               id: 3,
               nama: 'Toyota Hilux Double Cabin',
               opd: 'Dinas Pekerjaan Umum dan Penataan Ruang',
               waktu: '12 min ago',
               avatar: 'https://cdn.quasar.dev/img/avatar3.jpg'
            },
            {
               id: 4,
               nama: 'Isuzu ELF Minibus',
               opd: 'Dinas Kesehatan',
               waktu: '30 min ago',
               avatar: 'https://cdn.quasar.dev/img/avatar6.jpg'
            },
            {
               id: 5,
               nama: 'Laptop Dell Latitude 5420',
               opd: 'Badan Keuangan dan Aset Daerah',
               waktu: '1 hour ago',
               avatar: 'https://cdn.quasar.dev/img/avatar5.jpg'
            },
            {
               id: 6,
               nama: 'Printer HP LaserJet Pro',
               opd: 'Inspektorat Daerah',
               waktu: '2 hours ago',
               avatar: 'https://cdn.quasar.dev/img/avatar1.jpg'
            }
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
               type: 'bar', // Mengubah 'column' menjadi 'bar' membuatnya otomatis vertikal/horizontal bar
               height: 500,
               backgroundColor: 'transparent',
            },
            title: {
               text: 'Laporan Kekayaan Daerah Per Kategori (KIB)'
            },
            credits: {
               enabled: false
            },
            xAxis: {
               categories: [
                  'KIB A (Tanah)',
                  'KIB B (Peralatan & Mesin)',
                  'KIB C (Gedung & Bangunan)',
                  'KIB D (Jalan, Irigasi & Jaringan)',
                  'KIB E (Aset Tetap Lainnya)',
                  'KIB F (Konstruksi Dlm Pengerjaan)',
                  'KIB G (Aset Tak Berwujud)'
               ],
               title: {
                  text: null
               }
            },
            yAxis: {
               min: 0,
               title: {
                  text: 'Nilai Aset (Miliar Rupiah)',
                  align: 'high'
               },
               labels: {
                  overflow: 'justify'
               }
            },
            tooltip: {
               valueSuffix: ' Miliar'
            },
            plotOptions: {
               bar: {
                  dataLabels: {
                     enabled: true,
                     format: 'Rp {point.y} M' // Menampilkan angka langsung di ujung bar
                  },
                  colorByPoint: true // Memberikan warna berbeda tiap bar agar lebih menarik bagi Bupati
               }
            },
            legend: {
               enabled: false // Dimatikan karena label sudah ada di sumbu Y
            },
            series: [{
               name: 'Nilai Perolehan',
               data: [1250, 450, 850, 2100, 75, 120, 35],
               colors: ['#2c3e50', '#2980b9', '#27ae60', '#f1c40f', '#e67e22', '#e74c3c', '#9b59b6']
            }]
         });
      },

      usiaAset: function () {
         Highcharts.chart('usiaAset', {
            chart: {
               type: 'column',
               backgroundColor: 'transparent',
            },
            title: {
               text: 'Usia Aset'
            },
            credits: {
               enabled: false
            },
            legend: {
               enabled: false // HILANGKAN "Series 1"
            },
            xAxis: {
               categories: [
                  '≤ 5 Tahun',
                  '> 5 – 10 Tahun',
                  '> 10 Tahun',
                  '> 20 Tahun'
               ]
            },
            yAxis: {
               title: {
                  text: null // HILANGKAN judul sumbu Y
               },
               labels: {
                  enabled: false // HILANGKAN angka vertikal
               }
            },
            tooltip: {
               pointFormat: '<b>{point.y}</b> unit'
            },
            plotOptions: {
               column: {
                  dataLabels: {
                     enabled: true // angka tetap tampil di atas bar
                  }
               }
            },
            series: [
               {
                  data: [485, 732, 619, 284],
                  colorByPoint: true
               }
            ]
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
      this.button();
      this.kondisiAset();
      this.usiaAset();
      this.asetOPD();
   },
}
</script>
