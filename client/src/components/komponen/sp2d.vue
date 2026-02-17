<template>
    <div>
        <q-card-section class="bg-orange-3 text-white">
            <div class="text-h6 h_modalhead">BAST</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-btn label="Tambah" icon="add" size="sm" class="bg-orange-3 text-white q-mt-md" @click="mdl_add = true" />

            <div class="tbl_responsive q-mt-md">
                <table width="100%" class="h_table">
                    <thead>
                        <tr class="h_table_head bg-orange-2">
                            <th class="text-center" width="5%">No</th>
                            <th class="text-center" width="20%">Nomor SP2D</th>
                            <th class="text-center" width="15%">Tanggal SP2D</th>
                            <th class="text-center" width="10%">Nilai</th>
                            <th class="text-center" width="25%">Keterangan</th>
                            <th class="text-center" width="15%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                            <td class="text-center">{{ index + 1 }}.</td>
                            <td>{{ data.nomor }}</td>
                            <td class="text-center">{{ UMUM.tglConvert(data.tgl) }}</td>
                            <td class="text-center">Rp. {{ data.nilai }}</td>
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
                            <span class="h_lable">No. SP2D</span>
                            <q-input v-model="form.nomor" value="1" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Tgl. SP2D</span>
                            <q-input v-model="form.tgl" type="date" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nilai</span>
                            <q-input v-model="form.nilai" type="number" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Keterangan</span>
                            <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn"
                                type="textarea" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Lampiran</span>
                            <q-file v-model="form.file" outlined square :dense="true" class="bg-white margin_btn">
                                <template v-slot:prepend>
                                    <q-icon name="attach_file" />
                                </template>
                            </q-file>
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
                            <span class="h_lable">No. SP2D</span>
                            <q-input v-model="form.nomor" value="1" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Tgl. SP2D</span>
                            <q-input v-model="form.tgl" type="date" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nilai</span>
                            <q-input v-model="form.nilai" type="number" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Keterangan</span>
                            <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn"
                                type="textarea" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Lampiran</span>
                            <q-file v-model="form.file" outlined square :dense="true" class="bg-white margin_btn">
                                <template v-slot:prepend>
                                    <q-icon name="attach_file" />
                                </template>
                            </q-file>
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
                    <div class="text-h6 h_modalhead">Detil</div>
                </q-card-section>
                <q-card-section class="q-gutter-md">
                    <div>
                        <div class="text-subtitle1 text-bold q-mb-sm">Informasi</div>
                        <q-list dense bordered separator class="rounded-borders">
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Nomor SP2D</b></q-item-section>
                                <q-item-section>
                                    <q-item-section>{{ form.nomor }}</q-item-section>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Tanggal SP2D</b></q-item-section>
                                <q-item-section>{{ form.tgl }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Nilai</b></q-item-section>
                                <q-item-section>{{ form.nilai }}</q-item-section>
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
                nomor: '',
                tgl: '',
                nilai: '',
                keterangan: '',
                file: null,
            },

            list_data: [],

            page_first: 1,
            page_last: 0,
            page_limit: 10,
            cari_value: "",
            page_first1: 1,
            page_last1: 0,
            page_limit1: 8,
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
            UMUM: UMUM
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
            fetch(this.$store.state.url.URL_SPPD + "view", {
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

            fetch(this.$store.state.url.URL_SPPD + "addData", {
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

            fetch(this.$store.state.url.URL_SPPD + "editData", {
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
            fetch(this.$store.state.url.URL_SPPD + "removeData", {
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
            this.form.pengadaanId = data.pengadaanId;
            this.form.nomor = data.nomor;
            this.form.tgl = data.tgl;
            this.form.nilai = data.nilai;
            this.form.keterangan = data.keterangan;
            this.form.file = data.file;
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

        async awaitFetch() {
            this.$store.state.list_jurusan = await this.DATA_MASTER.getJurusan(this.data.pendidikan_id);
        }

        // ====================================== PAGINATE ====================================

    },

    mounted() {
          this.getView();
    },
}
</script>