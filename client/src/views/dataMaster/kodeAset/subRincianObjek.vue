<template>
    <div class="about" style="padding:15px">
        <q-card bordered class="my-card">
            <q-card-section class="bg-blue-3 text-white">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="text-h6 h_titleHead">Kode Aset</div>
                        <div class="text-subtitle2">Sub-sub Rincian Objek</div>
                    </div>
                    <div class="col-12 col-md-2"></div>
                    <div class="col-12 col-md-4">
                        <div class="row">
                            <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:90%" />
                            <q-btn glossy class="bg-red-4" @click="mdl_add = true" dense flat icon="add" style="width:10%">
                                <q-tooltip content-class="bg-red-4" content-style="font-size: 13px">
                                    Click untuk menambah data
                                </q-tooltip>
                            </q-btn>
                        </div>

                    </div>
                </div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section>
                <hr class="hrpagin2">


                <div class="tbl_responsive">
                    <!-- =================================================== KONTENT =========================================================== -->
                    <table width="100%">
                        <tr class="h_table_head bg-blue-2">
                            <th width="10%" class="text-center">No</th>
                            <th width="15%" colspan="7" class="text-center">Kode</th>
                            <th width="50%" class="text-center">Uraian</th>
                            <th width="30%"></th>
                        </tr>
                        <tr class="h_table_body" v-for="(data, index) in listSubRincianObjek" :key="data.id">
                            <td class="text-center">{{ indexing(index + 1) }}.</td>
                            <td class="text-center">{{ data.aset_id }}</td>
                            <td class="text-center">{{ data.kelompok_id }}</td>
                            <td class="text-center">{{ data.jenis_id }}</td>
                            <td class="text-center">{{ data.objek_id }}</td>
                            <td class="text-center">{{ data.rincian_id }}</td>
                            <td class="text-center">{{ data.sub_rincian_id }}</td>
                            <td class="text-center">{{ data.kode }}</td>
                            <td>{{ data.uraian }}</td>
                            <td class="text-center">
                                <q-btn-group>
                                    <q-btn @click="mdl_edit = true, selectData(data)" glossy color="orange" icon="create" class="tbl_btn">
                                        <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                                            Click untuk mengubah data ini
                                        </q-tooltip>
                                    </q-btn>
                                    <q-btn @click="mdl_hapus = true, selectData(data)" glossy color="negative" icon="delete_forever" class="tbl_btn">
                                        <q-tooltip content-class="bg-red" content-style="font-size: 13px">
                                            Click untuk menghapus data ini
                                        </q-tooltip>
                                    </q-btn>
                                </q-btn-group>
                            </td>
                        </tr>

                    </table>

                    <!-- =================================================== KONTENT =========================================================== -->
                </div>
                <hr class="hrpagin">
                <br>
                <div class="text-center">
                    <q-btn @click="btn_prev" glossy color="orange" icon="skip_previous" class="paginate_btn" />
                    <span class="h_panation">&nbsp; {{ page_first }} - {{ page_last }} &nbsp;</span>
                    <q-btn @click="btn_next" glossy color="orange" icon="skip_next" class="paginate_btn" />
                </div>
                <br>
            </q-card-section>
        </q-card>





        <!-- =================================================== MODAL =========================================================== -->


        <!-- ================================================= MODAL TAMBAH ================================================ -->
        <q-dialog v-model="mdl_add" persistent>
            <q-card class="mdl-md">
                <q-card-section class="bg-primary">
                    <div class="text-h6 h_modalhead">Simpan Data</div>
                </q-card-section>
                <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <div class="row">
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Kode Aset</span>
                                <q-select
                                    v-model="form.aset_id"
                                    :options="listAset"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined
                                    square
                                    :dense="true"
                                    class="bg-white margin_btn"
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Kode Kelompok</span>
                                <q-select
                                    v-model="form.kelompok_id"
                                    :options="listKelompok"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined
                                    square
                                    :dense="true"
                                    class="bg-white margin_btn"
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Kode Jenis</span>
                                <q-select
                                    v-model="form.jenis_id"
                                    :options="listJenis"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined
                                    square
                                    :dense="true"
                                    class="bg-white margin_btn"
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Kode Objek</span>
                                <q-select
                                    v-model="form.objek_id"
                                    :options="listObjek"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined
                                    square
                                    :dense="true"
                                    class="bg-white margin_btn"
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Kode Rincian Objek</span>
                                <q-select
                                    v-model="form.rincian_id"
                                    :options="listRincian"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined
                                    square
                                    :dense="true"
                                    class="bg-white margin_btn"
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Kode Sub Rincian Objek</span>
                                <q-select
                                    v-model="form.sub_rincian_id"
                                    :options="listSubRincian"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined
                                    square
                                    :dense="true"
                                    class="bg-white margin_btn"
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Kode</span>
                                <q-input v-model="form.kode" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable ">Uraian</span>
                                <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn :loading="btn_add" color="primary" @click="addData()" label="Simpan" />
                        <q-btn label="Batal" color="negative" v-close-popup />
                    </q-card-actions>
                </form>
            </q-card>
        </q-dialog>
        <!-- ================================================= MODAL TAMBAH ================================================ -->


        <!-- ================================================= MODAL EDIT ================================================ -->
        <q-dialog v-model="mdl_edit" persistent>
            <q-card class="mdl-md">
                <q-card-section class="bg-orange">
                    <div class="text-h6 h_modalhead">Edit Data</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <br>
                    <div class="row">
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Kode Aset</span>
                                <q-select
                                    v-model="form.aset_id"
                                    :options="listAset"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined
                                    square
                                    :dense="true"
                                    class="bg-white margin_btn"
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Kode Kelompok</span>
                                <q-select
                                    v-model="form.kelompok_id"
                                    :options="listKelompok"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined
                                    square
                                    :dense="true"
                                    class="bg-white margin_btn"
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Kode Jenis</span>
                                <q-select
                                    v-model="form.jenis_id"
                                    :options="listJenis"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined
                                    square
                                    :dense="true"
                                    class="bg-white margin_btn"
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Kode Objek</span>
                                <q-select
                                    v-model="form.objek_id"
                                    :options="listObjek"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined
                                    square
                                    :dense="true"
                                    class="bg-white margin_btn"
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Kode Rincian Objek</span>
                                <q-select
                                    v-model="form.rincian_id"
                                    :options="listRincian"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined
                                    square
                                    :dense="true"
                                    class="bg-white margin_btn"
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Kode Sub Rincian Objek</span>
                                <q-select
                                    v-model="form.sub_rincian_id"
                                    :options="listSubRincian"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined
                                    square
                                    :dense="true"
                                    class="bg-white margin_btn"
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Kode</span>
                                <q-input v-model="form.kode" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable ">Uraian</span>
                                <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                        </div>
                </q-card-section>

                <q-card-actions class="bg-grey-4 mdl-footer" align="right">

                    <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" />
                    <q-btn label="Batal" color="negative" v-close-popup />

                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- ================================================= MODAL EDIT ================================================ -->

        <!-- ================================================ MODAL HAPUS ================================================ -->
        <q-dialog v-model="mdl_hapus" persistent>
            <q-card class="mdl-sm ">
                <q-card-section class="q-pt-none text-center orageGrad">
                    <form @submit.prevent="removeData">
                        <br>
                        <img src="img/alert.png" alt="" width="75"> <br>
                        <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MENGHAPUS DATA INI??</span>
                        <input type="submit" style="position: absolute; left: -9999px" />
                        <br>
                        <br>
                        <q-btn label="Batal" size="sm" color="negative" v-close-popup />
                        &nbsp;
                        <q-btn type="submit" label="Hapus" size="sm" color="primary" v-close-popup />

                    </form>
                </q-card-section>
            </q-card>
        </q-dialog>

        <!-- ================================================ MODAL HAPUS ================================================ -->




        <!-- =================================================== MODAL =========================================================== -->




    </div>
</template>


<script>


import FETCHING from '../../../library/fetching'

export default {
    data() {
        return {

            form: {
                id: '',
                aset_id: null,
                kode: '',
                uraian: '',
            },

            // ====================================== CONTOH AUTOCOMPLETE ====================================
            autocomplete_db: '',
            // ====================================== CONTOH AUTOCOMPLETE ====================================




            list_data: [],

            listAset: [
                {
                    "id": 1,
                    "kode": "01",
                    "uraian": "Aset",
                },
            ],

            listKelompok: [
                {
                    "id": 1,
                    "aset_id": "01",
                    "kode": "03",
                    "uraian": "Aset Tetap",
                },
                {
                    "id": 2,
                    "aset_id": "01",
                    "kode": "05",
                    "uraian": "Aset Lainnya",
                },
            ],

            listJenis: [
                {
                    "id": 1,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "kode": "01",
                    "uraian": "TANAH",
                },
                {
                    "id": 2,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "kode": "02",
                    "uraian": "PERALATAN DAN MESIN",
                },
                {
                    "id": 3,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "kode": "03",
                    "uraian": "GEDUNG DAN BANGUNAN",
                },
                {
                    "id": 4,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "kode": "04",
                    "uraian": "JALAN, JARINGAN DAN IRIGASI",
                },
                {
                    "id": 5,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "kode": "05",
                    "uraian": "ASET TETAP LAINNYA",
                },
                {
                    "id": 6,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "kode": "06",
                    "uraian": "KONSTRUKSI DALAM PENGERJAAN",
                },
                {
                    "id": 7,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "kode": "07",
                    "uraian": "AKUMULASI PENYUSUTAN",
                },
            ],

            listObjek: [
                {
                    "id": 1,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "kode": "01",
                    "uraian": "ALAT BESAR",
                },
                {
                    "id": 2,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "kode": "02",
                    "uraian": "ALAT ANGKUTAN",
                },
                {
                    "id": 3,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "kode": "03",
                    "uraian": "ALAT BENGKEL DAN ALAT UKUR",
                },
                {
                    "id": 4,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "kode": "04",
                    "uraian": "ALAT PERTANIAN",
                },
            ],

            listRincian: [
                {
                    "id": 1,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "01",
                    "kode": "01",
                    "uraian": "ALAT BESAR DARAT",
                },
                {
                    "id": 2,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "01",
                    "kode": "02",
                    "uraian": "ALAT BESAR APUNG",
                },
                {
                    "id": 3,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "01",
                    "kode": "03",
                    "uraian": "ALAT BANTU",
                },
                {
                    "id": 4,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "kode": "01",
                    "uraian": "ALAT ANGKUTAN DARAT BERMOTOR",
                },
                {
                    "id": 5,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "kode": "02",
                    "uraian": "ALAT ANGKUTAN DARAT TAK BERMOTOR",
                },
                {
                    "id": 6,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "kode": "03",
                    "uraian": "ALAT ANGKUTAN APUNG BERMOTOR",
                },
                {
                    "id": 7,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "kode": "04",
                    "uraian": "ALAT ANGKUTAN APUNG TAK BERMOTOR",
                },
            ],

            listSubRincian:[
                {
                    "id": 1,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "kode": "01",
                    "uraian": "KENDARAAN DINAS BERMOTOR PERORANGAN",
                },
                {
                    "id": 2,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "kode": "02",
                    "uraian": "KENDARAAN BERMOTOR PENUMPANG",
                },
                {
                    "id": 3,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "kode": "03",
                    "uraian": "KENDARAAN BERMOTOR ANGKUTAN BARANG",
                },
                {
                    "id": 4,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "kode": "04",
                    "uraian": "KENDARAAN BERMOTOR BERODA DUA",
                },
                {
                    "id": 5,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "kode": "05",
                    "uraian": "KENDARAAN BERMOTOR BERODA TIGA",
                },
            ],

            listSubRincianObjek: [
                {
                    "id": 1,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "01",
                    "kode": "001",
                    "uraian": "Sedan",
                },
                {
                    "id": 2,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "01",
                    "kode": "002",
                    "uraian": "Jeep",
                },
                {
                    "id": 3,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "01",
                    "kode": "003",
                    "uraian": "Station Wagon",
                },
                {
                    "id": 4,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "01",
                    "kode": "004",
                    "uraian": "Multi Purpose Vehicle (MPV)",
                },
                {
                    "id": 5,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "01",
                    "kode": "005",
                    "uraian": "Sport Utility Vehicle (SUV)",
                },
                {
                    "id": 6,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "02",
                    "kode": "001",
                    "uraian": "Bus ( Penumpang 30 Orang Keatas )",
                },
                {
                    "id": 7,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "02",
                    "kode": "002",
                    "uraian": "Micro Bus ( Penumpang 15 S/D 29 Orang )",
                },
                {
                    "id": 8,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "02",
                    "kode": "003",
                    "uraian": "Mini Bus ( Penumpang 14 Orang Kebawah )",
                },
                {
                    "id": 9,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "02",
                    "kode": "004",
                    "uraian": "Kendaraan Lapis Baja",
                },
            ],


            page_first: 1,
            page_last: 0,
            page_limit: 10,
            cari_value: "",
            cek_load_data: true,


            mdl_add: false,
            mdl_edit: false,
            mdl_hapus: false,
            btn_add: false,


            FETCHING: FETCHING,
        }
    },
    methods: {


        getView: function () {
            this.$store.commit("shoWLoading");
            fetch(this.$store.state.url.URL_DM_ASAL_USUL + "view", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({
                    data_ke: this.page_first,
                    cari_value: this.cari_value
                })
            })
                .then(res => res.json())
                .then(res_data => {
                    this.list_data = res_data.data;
                    this.page_last = res_data.jml_data;
                    this.$store.commit("hideLoading");
                    // console.log(res_data);
                });
        },


        addData: function (number) {
            fetch(this.$store.state.url.URL_DM_ASAL_USUL + "addData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify(this.form)
            }).then(res_data => {
                this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
                this.getView();
            });
        },


        editData: function () {
            fetch(this.$store.state.url.URL_DM_ASAL_USUL + "editData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify(this.form)
            }).then(res_data => {
                this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
                this.getView();
            });
        },

        removeData: function (E) {
            fetch(this.$store.state.url.URL_DM_ASAL_USUL + "removeData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({ id: this.form.id })
            }).then(res_data => {
                this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
                this.getView();
            });

        },

        selectData: function (data) {
            this.form.id = data.id;
            this.form.aset_id = this.listAset.find( a => a.kode === data.aset_id );
            this.form.kelompok_id = this.listKelompok.find( a => a.kode === data.kelompok_id );
            this.form.jenis_id = this.listJenis.find( a => a.kode === data.jenis_id );
            this.form.objek_id = this.listObjek.find( a => a.kode === data.objek_id );
            this.form.rincian_id = this.listRincian.find( a => a.kode === data.rincian_id );
            this.form.sub_rincian_id = this.listSubRincian.find( a => a.kode === data.sub_rincian_id );
            this.form.kode = data.kode;
            this.form.uraian = data.uraian;
        },

        // ====================================== CONTOH AUTOCOMPLETE ====================================
        autocomplete_db_filter: function (val, update) {
            update(() => {
                if (val === '') { }
                else { FETCHING.getContohAtocomplete(val) }
            })
        },

        // ====================================== CONTOH AUTOCOMPLETE ====================================


        indexing: function (index) {
            var idx = ((this.page_first - 1) * this.page_limit) + index
            return idx
        },
        // ====================================== PAGINATE ====================================
        Notify: function (message, positive, icon) {
            this.$q.notify({
                message: message,
                color: positive,
                icon: icon,
                position: 'top',
                timeout: 500,
            })
        },
        btn_prev: function () {
            this.cek_load_data = true;
            if (this.page_first > 1) {
                this.page_first--
            } else {
                this.page_first = 1;
            }
            this.getView();
        },

        btn_next: function () {
            if (this.page_first >= this.page_last) {
                this.page_first == this.page_last
            } else {
                this.page_first++;
            }
            this.getView();
        },

        cari_data: function () {
            this.page_first = 1;
            this.getView();
        },
        // ====================================== PAGINATE ====================================
    },

    mounted() {
        // this.getView();
    },
}
</script>