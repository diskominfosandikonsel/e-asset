<template>
    <div>
        <q-card-section class="bg-teal-3 text-white">
            <div class="text-h6 h_modalhead">Kapitalisasi</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-btn label="Tambah" icon="add" size="sm" class="bg-teal-3 text-white q-mt-md" @click="mdl_add = true" />

            <div class="tbl_responsive q-mt-md">
                <table width="100%" class="h_table">
                    <thead>
                        <tr class="h_table_head bg-teal-2">
                            <th class="text-center" width="5%">No</th>
                            <th class="text-center" width="25%">Uraian</th>
                            <th class="text-center" width="25%">Tanggal Kapitalisasi</th>
                            <th class="text-center" width="25%">Nilai Kapitalisasi</th>
                            <th class="text-center" width="25%">Keterangan</th>
                            <th class="text-center" width="15%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="h_table_body" v-for="(data, index) in list_datax" :key="data.id">
                            <td class="text-center">{{ index + 1 }}.</td>
                            <td>{{ data.uraian }}</td>
                            <td class="text-center">{{ UMUM.tglConvert(data.tanggal) }}</td>
                            <td class="text-center">Rp {{ Number(data.nilai_kapitalisasi).toLocaleString('id-ID') }}</td>
                            <td>{{ data.keterangan }}</td>
                            <td class="text-center">
                                <q-btn-group flat>
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
                            <span class="h_lable">Uraian</span>
                            <q-input v-model="form.uraian" value="1" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Tanggal</span>
                            <q-input v-model="form.tgl" type="date" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nilai Sebelum Kapitalisasi</span>
                            <q-input v-model="form.nilai_sebelum" type="number" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nilai Sesudah Kapitalisasi</span>
                            <q-input v-model="form.nilai_sesudah" type="number" outlined square dense class="bg-white" />
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
                            <span class="h_lable">Uraian</span>
                            <q-input v-model="form.uraian" value="1" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Tanggal</span>
                            <q-input v-model="form.tgl" type="date" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nilai Sebelum Kapitalisasi</span>
                            <q-input v-model="form.nilai_sebelum" type="number" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nilai Sesudah Kapitalisasi</span>
                            <q-input v-model="form.nilai_sesudah" type="number" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Keterangan</span>
                            <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
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
                    <form @submit.prevent="removeData(form.id, form.file)">
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
                <q-card-section class="bg-primary">
                    <div class="text-h6 h_modalhead">Detil Data</div>
                </q-card-section>
                <q-card-section class="q-gutter-md">
                    <div>
                        <div class="text-subtitle1 text-bold q-mb-sm">Informasi</div>
                        <q-list dense bordered separator class="rounded-borders">
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Nomor</b></q-item-section>
                                <q-item-section>
                                    <q-item-section>{{ form.nomor }}</q-item-section>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Tanggal</b></q-item-section>
                                <q-item-section>{{ form.tgl }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Keterangan</b></q-item-section>
                                <q-item-section>{{ form.keterangan }}</q-item-section>
                            </q-item>
                        </q-list>
                    </div>
                    <div>
                        <div class="text-subtitle1 text-bold q-mb-sm">Lampiran</div>
                        <embed :src="file_path + form.file" width="100%" height="600">
                        <!-- <div v-if="data.file_type == 'application/pdf'">
                        </div>
                        <div
                            v-else-if="data.file_type == 'image/png' || data.file_type == 'image/jpeg' || data.file_type == 'image/jpg'">
                            <img :src="file_path + form.file" style="height: auto; width: 100%" />
                        </div> -->
                    </div>
                </q-card-section>

                <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    <q-btn label="Batal" color="negative" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

// import FETCHING from '../../library/fetching'
// import DATA_MASTER from '../../library/dataMaster'
import UMUM from '../../library/umum'

export default {
    props: ["pengadaanId"],
    data() {
        return {
            form: {
                id: '',
                pengadaanId: this.pengadaanId,
                uraian: '',
                tgl: '',
                uraian: '',
                nilai_kapitalisasi: '',
                nilai_sebelum: '',
                nilai_sesudah: '',
                keterangan: '',
                file: null,
                file_type: '',
            },

            list_data: [],
            list_datax: [
                {
                    id: "KP001",
                    aset_id: "BPKB001",
                    tanggal: "2024-02-05",
                    uraian: "Penambahan sistem GPS Tracker dan Alarm Security",
                    nilai_kapitalisasi: 7500000,
                    nilai_aset_sebelum: 420000000,
                    nilai_aset_sesudah: 427500000,
                    keterangan: "Peningkatan keamanan kendaraan dinas"
                }
            ],

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

            // FETCHING: FETCHING,
            // DATA_MASTER: DATA_MASTER,
            UMUM: UMUM,
        }
    },
    methods: {
        getView: function () {
            // console.log("=================");
            // console.log(this.data);
            console.log("=================");
            console.log(this.form.pengadaanId);
            console.log("=================");

            this.$store.commit("shoWLoading");
            fetch(this.$store.state.url.URL_BAST + "view", {
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
            var formData = new FormData();
            formData.append('data', JSON.stringify(this.form))
            formData.append("file", this.form.file);

            fetch(this.$store.state.url.URL_BAST + "addData", {
                method: "POST",
                headers: {
                    authorization: "kikensbatara " + localStorage.token
                },
                body: formData
            }).then(res_data => {
                this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
                this.getView();
            });
        },

        editData: function () {
            var formData = new FormData();
            formData.append('data', JSON.stringify(this.form))
            formData.append("file", this.form.file);

            fetch(this.$store.state.url.URL_BAST + "editData", {
                method: "POST",
                headers: {
                    authorization: "kikensbatara " + localStorage.token
                },
                body: formData
            }).then(res_data => {
                this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
                this.getView();
            })
        },

        removeData: function (idnya, file) {
            fetch(this.$store.state.url.URL_BAST + "removeData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({
                    id: idnya,
                    file: file
                })
            }).then(res_data => {
                this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
                this.getView();
            });
        },

        selectData: function (data) {
            this.form.id = data.id;
            this.form.aset_id = data.aset_id;
            this.form.tgl = data.tgl;
            this.form.uraian = data.uraian;
            this.form.nilai_kapitalisasi = data.nilai_kapitalisasi;
            this.form.nilai_sebelum = data.nilai_sebelum;
            this.form.nilai_sesudah = data.nilai_sesudah;
            this.form.keterangan = data.keterangan;
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
    },
}
</script>