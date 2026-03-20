<template>
    <div>
        <q-card-section class="bg-blue-3 text-white">
            <div class="text-h6 h_modalhead">Rincian</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-btn label="Tambah" icon="add" size="sm" class="bg-blue-3 text-white q-mt-md" @click="mdl_add = true" />

            <div class="tbl_responsive q-mt-md">
                <table width="100%" class="h_table">
                    <thead>
                        <tr class="h_table_head bg-blue-2">
                            <th class="text-center" width="5%">No</th>
                            <th class="text-center" width="20%">Kode Aset</th>
                            <th class="text-center" width="25%">Nama Aset</th>
                            <th class="text-center" width="25%">Keterangan</th>
                            <th class="text-center" width="15%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                            <td class="text-center">{{ index + 1 }}.</td>
                            <td class="text-center">{{ data.subSubId }}</td>
                            <td>{{ data.uraian }}</td>
                            <td>{{ data.keterangan }}</td>
                            <td class="text-center">
                                <q-btn-group flat>
                                    <q-btn glossy color="blue" icon="search" size="sm" @click="mdl_lihat = true, selectData(data)">
                                        <q-tooltip>Lihat Data</q-tooltip>
                                    </q-btn>
                                    <q-btn glossy color="orange" icon="edit" size="sm" @click="mdl_edit = true, selectData(data)">
                                        <q-tooltip>Edit Data</q-tooltip>
                                    </q-btn>
                                    <q-btn glossy color="red" icon="delete" size="sm" @click="mdl_remove = true, selectData(data)">
                                        <q-tooltip>Hapus Data</q-tooltip>
                                    </q-btn>
                                </q-btn-group>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </q-card-section>

        <q-card-actions class="bg-grey-3" align="right">
            <q-btn label="Batal" color="negative" v-close-popup />
        </q-card-actions>

        <q-dialog v-model="mdl_add" persistent>
            <q-card class="mdl-md" style="min-width: 400px">
                <q-card-section class="bg-primary text-white">
                    <div class="text-h6">Tambah Data</div>
                </q-card-section>

                <q-card-section class="q-pa-md">
                    <div class="row q-col-gutter-sm">
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nomor</span>
                            <q-input v-model="form.no" value="1" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Kode Aset</span>
                            <q-select
                                v-model="form.subSubId"
                                use-input hide-selected fill-input
                                input-debounce="300"
                                :options="$store.state.list_sub_sub"
                                option-value="kode"
                                option-label="uraian"
                                emit-value map-options
                                @filter="autocomplete_getSubKegiatan"
                                @focus="loadSubSubAwal"
                                clearable outlined square dense
                            >
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                            Tidak ditemukan
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Merk</span>
                            <q-input v-model="form.merk" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Type</span>
                            <q-input v-model="form.type" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Ukuran (cc)</span>
                            <q-input v-model="form.ukuran" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Luas (M2)</span>
                            <q-input v-model="form.luas" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Panjang (km)</span>
                            <q-input v-model="form.panjang" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Lebar (Meter)</span>
                            <q-input v-model="form.lebar" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Jumlah</span>
                            <q-input v-model="form.jumlah" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Harga Satuan</span>
                            <q-input v-model="form.harga" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Total</span>
                            <q-input v-model="form.total" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Keterangan</span>
                            <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
                        </div>
                    </div>
                </q-card-section>

                <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    <q-btn :loading="btn_add" color="primary" @click="addData()" label="Simpan" />
                    <q-btn label="Batal" color="negative" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="mdl_edit" persistent>
            <q-card class="mdl-md" style="min-width: 400px">
                <q-card-section class="bg-orange text-white">
                    <div class="text-h6">Edit Data</div>
                </q-card-section>

                <q-card-section class="q-pa-md">
                    <div class="row q-col-gutter-sm">
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nomor</span>
                            <q-input v-model="form.no" value="1" outlined square dense disable class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Kode Aset</span>
                            <q-select
                                v-model="form.subSubId"
                                use-input hide-selected fill-input
                                input-debounce="300"
                                :options="$store.state.list_sub_sub"
                                option-value="kode"
                                option-label="uraian"
                                emit-value map-options
                                @filter="autocomplete_getSubKegiatan"
                                @focus="loadSubSubAwal"
                                clearable outlined square dense
                            >
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                            Tidak ditemukan
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Merk</span>
                            <q-input v-model="form.merk" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Type</span>
                            <q-input v-model="form.type" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Ukuran (cc)</span>
                            <q-input v-model="form.ukuran" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Luas (M2)</span>
                            <q-input v-model="form.luas" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Panjang (km)</span>
                            <q-input v-model="form.panjang" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Lebar (Meter)</span>
                            <q-input v-model="form.lebar" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Jumlah</span>
                            <q-input v-model="form.jumlah" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Harga Satuan</span>
                            <q-input v-model="form.harga" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Total</span>
                            <q-input v-model="form.total" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Keterangan</span>
                            <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn"
                                type="textarea" />
                        </div>
                    </div>
                </q-card-section>

                <q-card-actions class="bg-grey-4 mdl-footer" align="right">

                    <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" />
                    <q-btn label="Batal" color="negative" v-close-popup />

                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="mdl_remove" persistent>
            <q-card class="mdl-sm ">
                <q-card-section class="q-pt-none text-center orageGrad">
                    <form @submit.prevent="removeData">
                        <br>
                        <img src="img/alert.png" alt="" width="75"> <br>
                        <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MENGHAPUS DATA INI??</span>
                        <input type="submit" style="position: absolute; left: -9999px" />
                        <br> <br>
                        <q-btn label="Batal" size="sm" color="negative" v-close-popup />
                        &nbsp;
                        <q-btn type="submit" label="Hapus" size="sm" color="primary" v-close-popup />
                    </form>
                </q-card-section>
            </q-card>
        </q-dialog>

        <q-dialog v-model="mdl_lihat" persistent>
            <q-card class="mdl-md">
                <!-- Header -->
                <q-card-section class="bg-blue-3 text-white flex items-center">
                    <div class="text-h6">Detil Aset</div>
                </q-card-section>

                <q-separator />

                <!-- Body -->
                <q-card-section class="q-gutter-md">
                    <div>
                        <div class="text-subtitle1 text-bold q-mb-sm">Informasi Aset</div>
                        <q-list dense bordered separator class="rounded-borders">
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Kode Aset</b></q-item-section>
                                <q-item-section>
                                    {{ form.subSubId }}
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Nama Aset</b></q-item-section>
                                <q-item-section>{{ form.uraian }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Merk</b></q-item-section>
                                <q-item-section>{{ form.merk }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Type</b></q-item-section>
                                <q-item-section>{{ form.type }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Ukuran</b></q-item-section>
                                <q-item-section>{{ form.ukuran }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Luas</b></q-item-section>
                                <q-item-section>{{ form.luas }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Panjang</b></q-item-section>
                                <q-item-section>{{ form.panjang }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Lebar</b></q-item-section>
                                <q-item-section>{{ form.lebar }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Harga</b></q-item-section>
                                <q-item-section>Rp. {{ UMUM.formatRupiah(form.harga) }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Keterangan</b></q-item-section>
                                <q-item-section>{{ form.keterangan }}</q-item-section>
                            </q-item>
                        </q-list>
                    </div>

                    <!-- <div>
                        <div class="text-subtitle1 text-bold q-mb-sm">Biodata Pemilik Lapak</div>
                        <q-list dense bordered separator class="rounded-borders">
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Nama Lengkap</b></q-item-section>
                                <q-item-section>{{ form.nm_pemilik }}</q-item-section>
                            </q-item>
                            <q-item v-if="form.uraian_bidang_sub_csr">
                                <q-item-section class="col-3 text-weight-medium"><b>NIK</b></q-item-section>
                                <q-item-section>{{ form.nik }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Alamat</b></q-item-section>
                                <q-item-section>{{ form.alamat }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Nomor HP</b></q-item-section>
                                <q-item-section>{{ form.hp }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Email</b></q-item-section>
                                <q-item-section>{{ form.email }}</q-item-section>
                            </q-item>
                        </q-list>
                    </div> -->

                </q-card-section>

                <!-- Footer -->
                <q-separator />
                <q-card-actions class="bg-grey-3" align="right">
                    <q-btn label="Tutup" color="negative" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

import FETCHING from '../../library/fetching'
import DATA_MASTER from '../../library/dataMaster'
import UMUM from '../../library/umum'

export default {
    props: ["pengadaanId"],
    data() {
        return {
            optionsSubSub: [],
            form: {
                id: '',
                pengadaanId: this.pengadaanId,
                subSubId: '',
                no: '',
                merk: '',
                type: '',
                ukuran: '',
                luas: '',
                panjang: '',
                lebar: '',
                jumlah: '',
                harga: '',
                total: '',
                keterangan: '',
            },

            list_data: [],

            page_first: 1,
            page_last: 0,
            page_limit: 10,
            cari_value: "",
            file_old: "",
            cek_load_data: true,
            file_path: this.$store.state.url.URL_APP + "uploads/",

            mdl_add: false,
            mdl_edit: false,
            mdl_remove: false,
            mdl_lihat: false,
            btn_add: false,

            FETCHING: FETCHING,
            DATA_MASTER: DATA_MASTER,
            UMUM: UMUM,
        }
    },
    methods: {
        getView: function () {
            console.log("=================");
            console.log(this.form.pengadaanId);
            console.log("=================");

            this.$store.commit("shoWLoading");
            fetch(this.$store.state.url.URL_ASET + "view", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({
                    data_ke: this.page_first,
                    cari_value: this.cari_value,
                    pengadaanId: this.form.pengadaanId
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

        addData: function () {
            fetch(this.$store.state.url.URL_ASET + "addData", {
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
            fetch(this.$store.state.url.URL_ASET + "editData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify(this.form)
            }).then(res_data => {
                this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
                this.getView();
            })
        },

        removeData: function (E) {
            fetch(this.$store.state.url.URL_ASET + "removeData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({
                    id: this.form.id
                })
            }).then(res_data => {
                this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
                this.getView();
            });

        },

        selectData: function (data) {
            this.form.id = data.id;
            this.form.pengadaanId = data.pengadaanId;
            this.form.akunId = data.akunId;
            this.form.kelompokId = data.kelompokId;
            this.form.jenisId = data.jenisId;
            this.form.objekId = data.objekId;
            this.form.rincianId = data.rincianId;
            this.form.subId = data.subId;
            this.form.subSubId = data.subSubId;
            this.form.uraian = data.uraian;
            this.form.no = data.no;
            this.form.merk = data.merk;
            this.form.type = data.type;
            this.form.ukuran = data.ukuran;
            this.form.luas = data.luas;
            this.form.panjang = data.panjang;
            this.form.lebar = data.lebar;
            this.form.jumlah = data.jumlah;
            this.form.harga = data.harga;
            this.form.total = data.total;
            this.form.keterangan = data.keterangan;
        },

        autocomplete_getSubKegiatan : function (val, update) {
            update(() => {
                if (val === '') {

                } else {
                    FETCHING.getSubKegiatan(val)
                }
            })
        },

        loadSubSubAwal() {
            FETCHING.getSubKegiatan('')
        },
        // ====================================== CONTOH AUTOCOMPLETE ====================================

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
        indexing: function (index) {
            var idx = ((this.page_first - 1) * this.page_limit) + index
            return idx;
        },
        cari_data: function () {
            this.page_first = 1;
            this.getView();
        },

        // ====================================== PAGINATE ====================================

    },

    mounted() {
        this.getView();

        DATA_MASTER.getAset();
    },
}
</script>