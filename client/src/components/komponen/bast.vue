<template>
    <div>
        <q-card-section class="bg-teal-3 text-white">
            <div class="text-h6 h_modalhead">BAST</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-btn label="Tambah" icon="add" size="sm" class="bg-teal-3 text-white q-mt-md" @click="mdl_add = true" />

            <div class="tbl_responsive q-mt-md">
                <table width="100%" class="h_table">
                    <thead>
                        <tr class="h_table_head bg-teal-2">
                            <th class="text-center" width="5%">No</th>
                            <th class="text-center" width="20%">Nomor BAST</th>
                            <th class="text-center" width="25%">Tanggal BAST</th>
                            <th class="text-center" width="25%">Keterangan</th>
                            <th class="text-center" width="15%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="h_table_body" v-for="(data, index) in dataDummy" :key="data.id">
                            <td class="text-center">{{ index + 1 }}.</td>
                            <td>{{ data.no_bast }}</td>
                            <td>{{ data.tgl_bast }}</td>
                            <td>{{ data.keterangan }}</td>
                            <td class="text-center">
                                <q-btn-group flat>
                                    <q-btn glossy color="blue" icon="search" size="sm" @click="mdl_lihat = true">
                                        <q-tooltip>Lihat Data</q-tooltip>
                                    </q-btn>
                                    <q-btn glossy color="orange" icon="edit" size="sm" @click="mdl_edit = true">
                                        <q-tooltip>Edit Data</q-tooltip>
                                    </q-btn>
                                    <q-btn glossy color="red" icon="delete" size="sm" @click="mdl_remove = true">
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
                            <span class="h_lable">No. BAST</span>
                            <q-input v-model="form.no_bast" value="1" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Tgl. BAST</span>
                            <q-input v-model="form.tgl_bast" type="date" outlined square dense class="bg-white" />
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
                    <q-btn :loading="btn_add" color="primary" label="Simpan" />
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
                            <span class="h_lable">No. BAST</span>
                            <q-input v-model="form.no_bast" value="1" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Tgl. BAST</span>
                            <q-input v-model="form.tgl_bast" type="date" outlined square dense class="bg-white" />
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
            <q-card class="mdl-lg">
                <q-card-section class="bg-primary">
                    <div class="text-h6 h_modalhead">Lampiran</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <br>
                    <embed src="https://ukpbj.kemlu.go.id/uploads/laporan/20240105145356-model-dokumen-pengadaan.pdf" width="100%" height="600">
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

export default {
    props: ["biodata_id"],
    data() {
        return {
            form: {
                id: '',
                biodata_id: this.biodata_id,


                no_bast: '',
                tgl_bast: '',
                keterangan: '',
                file: null,
            },

            list_data: [],

            dataDummy: [
                {
                    no_bast: "BAST/UPBJ/II/2024/002",
                    tgl_bast: "2024-02-15",
                    keterangan: "MacBook Pro M2",
                    file: 'https://ukpbj.kemlu.go.id/uploads/laporan/20240105145356-model-dokumen-pengadaan.pdf'
                },
            ],

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
        }
    },
    methods: {
        getView: function () {
            // console.log("=================");
            // console.log(this.data);
            console.log("=================");
            console.log(this.data.biodata_id);
            console.log("=================");

            this.$store.commit("shoWLoading");
            fetch(this.$store.state.url.URL_BIO_BAHASA_ASING + "view_komponen", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({
                    biodata_id: this.data.biodata_id
                })
            })
                .then(res => res.json())
                .then(res_data => {
                    this.list_bahasa = res_data;
                    this.$store.commit("hideLoading");
                    // console.log(res_data);
                });
        },

        addData: function () {
            fetch(this.$store.state.url.URL_BIO_BAHASA_ASING + "addData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify(this.data)
            }).then(res_data => {
                this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
                this.getView();
            });
        },

        editData: function () {
            fetch(this.$store.state.url.URL_BIO_BAHASA_ASING + "editData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify(this.data)
            }).then(res_data => {
                this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
                this.getView();
            })
        },

        removeData: function (idnya) {
            fetch(this.$store.state.url.URL_BIO_BAHASA_ASING + "removeData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({
                    id: idnya
                })
            }).then(res_data => {
                this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
                this.getView();
            });

        },

        selectData: function (data) {
            this.form.id = data.id;
            this.form.biodata_id = data.biodata_id;

            this.form.no_bast = data.no_bast;
            this.form.tgl_bast = data.tgl_bast;
            this.form.keterangan = data.keterangan;
            this.form.file = data.file;
        },

        autocomplete_db_filter: function (val, update) {
            update(() => {
                if (val === '') { }
                else { FETCHING.getContohAtocomplete(val) }
            })
        },
        autocomplete_jurusan: function (val, update) {
            update(() => {
                if (val == '') { }
                else {
                    FETCHING.getJurusan(val)
                }
            })
        },

        autocomplete_keterampilan: function (val, update) {
            update(() => {
                if (val == '') { }
                else {
                    FETCHING.getKeterampilan(val)
                }
            })

            // specific logic to eventually call done(...) -- or not
            //   done(val) <- INI YANG DIBUKA NAH UNTUK MULTIPLE NYA AUTOCOMPLETE
            // jangan lupa tambahkan "done" di functionnya

            // done callback has two optional parameters:
            //  - the value to be added
            //  - the behavior (same values of new-value-mode prop,
            //    and when it is specified it overrides that prop –
            //    if it is used); default behavior (if not using
            //    new-value-mode) is to add the value even if it would
            //    be a duplicate
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

        async awaitFetch() {
            this.$store.state.list_jurusan = await this.DATA_MASTER.getJurusan(this.data.pendidikan_id);
        }

        // ====================================== PAGINATE ====================================

    },

    mounted() {
        //   this.getView();

        // DATA_MASTER.getBahasa();
    },
}
</script>