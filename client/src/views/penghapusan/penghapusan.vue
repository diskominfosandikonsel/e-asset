<template>
    <div class="about" style="padding:15px">
        <q-card bordered class="my-card">
            <q-card-section class="bg-blue-3 text-white">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="text-h6 h_titleHead">Penghapusan</div>
                        <div class="text-subtitle2">Penghapusan Aset</div>
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
                        <thead>
                            <tr class="h_table_head bg-blue-2">
                                <th class="text-center" width="5%">No</th>
                                <th class="text-center" width="12%">Kode Barang</th>
                                <th class="text-center" width="15%">Nama Barang</th>
                                <th class="text-center" width="12%">Nomor SK</th>
                                <th class="text-center" width="12%">Tanggal SK</th>
                                <th class="text-center" width="10%">Kondisi Barang</th>
                                <th class="text-center" width="12%">Alasan Penghapusan</th>
                                <th class="text-center" width="14%">Ket. Alasan</th>
                                <th class="text-center" width="8%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                                <td class="text-center">{{ index + 1 }}.</td>
                                <td>{{ data.kode }}</td>
                                <td>{{ data.nm_aset }}</td>
                                <td>{{ data.nomor }}</td>
                                <td>{{ UMUM.tglConvert(data.tgl) }}</td>
                                <td>{{ data.nama }}</td>
                                <td>{{ data.alasan }}</td>
                                <td>{{ data.informasi }}</td>
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
                    <!-- =================================================== KONTENT =========================================================== -->
                </div>
                <hr class="hrpagin2">

                <div class="flex flex-center">
                    <q-pagination @click="getView()" v-model="page_first" :max="page_last" :max-pages="4"
                        color="orange-14" :direction-links="true" :boundary-links="true" icon-first="skip_previous"
                        icon-last="skip_next" icon-prev="fast_rewind" icon-next="fast_forward">
                    </q-pagination>
                </div>
            </q-card-section>

            <!-- <q-card-section>
                <hr class="hrpagin2">
                <div class="lister">    
                <div class="lister1" v-for="data in dataDummy" :key="data.id">
                    <div class="lister_left">
                        <a class="clear_underline h_judulDoc" href="javascript:void(0);" @click="selectData(data), mdl_detil = true">{{ data.keterangan }}</a>
                        <div class="h_sidebar_menu">Rp. {{data.nilai}}</div>
                        <div class="h_nip">{{ data.jns_posting }}</div>
                        <div class="h_titleDoc">{{ data.no_spk }} - {{ data.tgl_spk }}</div>
                        <div class="q-gutter-sm">
                            <q-btn square class="bg-blue-3 text-white" size="xs" icon="school" @click="selectData(data), openModal('RINCIAN')">
                                <q-tooltip content-class="bg-blue-4" content-style="font-size: 13px">
                                    Rincian
                                </q-tooltip>
                            </q-btn>
                            <q-btn square class="bg-teal-3 text-white" size="xs" icon="navigation" @click="selectData(data), openModal('BAST')">
                                <q-tooltip content-class="bg-teal-4" content-style="font-size: 13px">
                                    BAST
                                </q-tooltip>
                            </q-btn>
                            <q-btn square class="bg-orange-3 text-white" size="xs" icon="work" @click="selectData(data), openModal('SP2D')">
                                <q-tooltip content-class="bg-orange-4" content-style="font-size: 13px">
                                    SP2D
                                </q-tooltip>
                            </q-btn>
                        </div>
                    </div>
                    <div class="lister_right">
                        <q-btn-dropdown class="rizwan_sex1" size="xs" glossy color="orange" icon="settings" label=""
                            padding="xs">
                            <q-list>
                            <q-item clickable v-close-popup @click="selectData(data), mdl_detil = true">
                                <q-item-section>
                                    <q-item-label>Detile</q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup @click="selectData(data), mdl_edit = true">
                                <q-item-section>
                                    <q-item-label>Edit</q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup @click="selectData(data), mdl_hapus = true">
                                <q-item-section>
                                    <q-item-label>Hapus</q-item-label>
                                </q-item-section>
                            </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </div>
                </div>
                </div>
                <hr class="hrpagin">
                <br>
                <div class="flex flex-center">
                <q-pagination @click="getView()" v-model="page_first" :max="page_last" :max-pages="4" color="orange-14"
                    :direction-links="true" :boundary-links="true" icon-first="skip_previous" icon-last="skip_next"
                    icon-prev="fast_rewind" icon-next="fast_forward">
                </q-pagination>
                </div>
                <br>
            </q-card-section> -->
        </q-card>

        <!-- =================================================== MODAL =========================================================== -->
         <q-dialog v-model="mdl_add" persistent>
            <q-card class="mdl-md">
                <q-card-section class="bg-primary text-white">
                    <div class="text-h6">Tambah Data</div>
                </q-card-section>

                <form @submit.prevent="addData()">
                    <q-card-section class="q-pa-md">
                        <div class="row q-col-gutter-sm">
                            <div class="col-12">
                                <div class="text-subtitle2 text-primary q-mb-xs">Dokumen Penghapusan</div>
                                <q-separator q-mb-md />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Penyebab Penghapusan</span>
                                <q-select
                                    v-model="form.nama"
                                    :options="$store.state.list_penyebab"
                                    option-value="id"
                                    option-label="uraian"
                                    outlined square :dense="true"
                                    class="bg-white margin_btn"
                                    emit-value map-options
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Nomor SK</span>
                                <q-input v-model="form.nomor" outlined square dense class="bg-white" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Tanggal</span>
                                <q-input v-model="form.tgl" type="date" outlined square dense class="bg-white" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Keterangan</span>
                                <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Lampiran</span>
                                <q-file v-model="form.file" outlined square :dense="true" class="bg-white margin_btn">
                                    <template v-slot:prepend>
                                        <q-icon name="attach_file" />
                                    </template>
                                </q-file>
                            </div>
                            <div class="col-12 q-mt-md">
                                <div class="text-subtitle2 text-primary q-mb-xs">Penghapusan Barang</div>
                                <q-separator q-mb-md />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Alasan Penghapusan</span>
                                <q-select
                                    v-model="form.alasan"
                                    :options="$store.state.list_alasan"
                                    option-value="id"
                                    option-label="uraian"
                                    outlined square :dense="true"
                                    class="bg-white margin_btn"
                                    emit-value map-options
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Kode Aset</span>
                                <q-select
                                    v-model="form.kode"
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
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Informasi Penghapusan </span>
                                <q-input v-model="form.informasi" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
                            </div>
                        </div>
                    </q-card-section>
                </form>

                <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    <q-btn :loading="btn_add" color="primary" @click="addData()" label="Simpan" />
                    <q-btn label="Batal" color="negative" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="mdl_edit" persistent>
            <q-card class="mdl-md">
                <q-card-section class="bg-orange text-white">
                    <div class="text-h6">Edit Data</div>
                </q-card-section>

                <q-card-section class="q-pa-md">
                    <div class="row q-col-gutter-sm">
                        <div class="col-12">
                            <div class="text-subtitle2 text-primary q-mb-xs">Dokumen Penghapusan</div>
                            <q-separator q-mb-md />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Penyebab Penghapusan</span>
                            <q-select
                                v-model="form.nama"
                                :options="$store.state.list_penyebab"
                                option-value="id"
                                option-label="uraian"
                                outlined square :dense="true"
                                class="bg-white margin_btn"
                                emit-value map-options
                            />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nomor SK</span>
                            <q-input v-model="form.nomor" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Tanggal</span>
                            <q-input v-model="form.tgl" type="date" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Keterangan</span>
                            <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Lampiran</span>
                            <q-file v-model="form.file" outlined square :dense="true" class="bg-white margin_btn">
                                <template v-slot:prepend>
                                    <q-icon name="attach_file" />
                                </template>
                            </q-file>
                        </div>
                        <div class="col-12 q-mt-md">
                            <div class="text-subtitle2 text-primary q-mb-xs">Penghapusan Barang</div>
                            <q-separator q-mb-md />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Alasan Penghapusan</span>
                            <q-select
                                v-model="form.alasan"
                                :options="$store.state.list_alasan"
                                option-value="id"
                                option-label="uraian"
                                outlined square :dense="true"
                                class="bg-white margin_btn"
                                emit-value map-options
                            />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Kode Aset</span>
                            <q-select
                                v-model="form.kode"
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
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Informasi Penghapusan </span>
                            <q-input v-model="form.informasi" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
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
                <q-card-section class="bg-blue-3 text-white">
                    <div class="text-h6">Detail Penghapusan Aset</div>
                </q-card-section>
                <q-separator/>
                <q-card-section class="q-gutter-md">
                    <div>
                        <div class="text-subtitle1 text-bold q-mb-sm">Informasi Dokumen</div>
                        <q-list bordered dense separator>
                            <q-item>
                                <q-item-section class="col-4"><b>Penyebab Penghapusan</b></q-item-section>
                                <q-item-section>{{ form.penyebab }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4"><b>Nomor SK</b></q-item-section>
                                <q-item-section>{{ form.nomor }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4"><b>Tanggal</b></q-item-section>
                                <q-item-section>{{ UMUM.tglConvert(form.tgl) }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4"><b>Keterangan</b></q-item-section>
                                <q-item-section>{{ form.keterangan }}</q-item-section>
                            </q-item>
                        </q-list>
                    </div>
                    <div>
                        <div class="text-subtitle1 text-bold q-mb-sm">Informasi Penghapusan</div>
                        <q-list bordered dense separator>
                            <q-item>
                                <q-item-section class="col-4"><b>Alasan Penghapusan</b></q-item-section>
                                <q-item-section>{{ form.alasan }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4"><b>Kode Aset</b></q-item-section>
                                <q-item-section>{{ form.sebab_ket }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4"><b>Nama Aset</b></q-item-section>
                                <q-item-section>{{ form.sebab_ket }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4"><b>Keterangan</b></q-item-section>
                                <q-item-section>{{ form.keterangan }}</q-item-section>
                            </q-item>
                        </q-list>
                    </div>
                    <div>
                        <div class="text-subtitle1 text-bold q-mb-sm">Lampiran</div>
                        <embed :src="file_path + form.file" width="100%" height="600">
                    </div>
                </q-card-section>
                <q-separator/>
                <q-card-actions align="right" class="bg-grey-3">
                    <q-btn label="Tutup" color="negative" v-close-popup/>
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- =================================================== MODAL =========================================================== -->


    </div>
</template>


<script>


import FETCHING from '../../library/fetching'
import UMUM from '../../library/umum'
import DATA_MASTER from '../../library/dataMaster'

export default {
    computed: {
        cardClass() {
            if (this.modal_komponen_jenis === 'RINCIAN') {
                return 'mdl-lg';
            } else if (this.modal_komponen_jenis === 'BAST') {
                return 'mdl-lg';
            } else if (this.modal_komponen_jenis === 'SP2D') {
                return 'mdl-lg';
            }
            return 'mdl-default'; // Default class
        }
    },
    data() {
        return {
            optionsSubSub: [],
            form: {
                id: '',
                nama: '',
                nomor: '',
                tgl: '',
                keterangan: '',
                file: null,
                alasan: '',
                informasi: '',
                kode: '',
                asetId: '',
            },

            list_data: [],

            page_first: 1,
            page_last: 0,
            cari_value: "",
            cek_load_data: true,
            file_path: this.$store.state.url.URL_APP + "uploads/",

            mdl_add: false,
            mdl_edit: false,
            mdl_remove: false,
            mdl_lihat: false,
            btn_add: false,

            modal_komponen: false,
            modal_komponen_jenis: '',

            FETCHING: FETCHING,
            UMUM: UMUM,
            DATA_MASTER: DATA_MASTER,
        }
    },
    methods: {


        getView: function () {
            this.$store.commit("shoWLoading");
            fetch(this.$store.state.url.URL_PENGHAPUSAN + "view", {
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
                    console.log(res_data);
                });
        },


        addData: function () {
            var formData = new FormData();
            formData.append('data', JSON.stringify(this.form))
            formData.append("file", this.form.file);

            fetch(this.$store.state.url.URL_PENGHAPUSAN + "addData", {
                method: "POST",
                headers: {
                    // "content-type": "application/json",
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

            fetch(this.$store.state.url.URL_PENGHAPUSAN + "editData", {
                method: "POST",
                headers: {
                    // "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: formData
            }).then(res_data => {
                this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
                this.getView();
            });
        },

        removeData: function (E) {
            fetch(this.$store.state.url.URL_PENGHAPUSAN + "removeData", {
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
            this.form.nama = data.nama;
            this.form.nomor = data.nomor;
            this.form.tgl = data.tgl;
            this.form.keterangan = data.keterangan;
            this.form.file = data.file;
            this.file_old = data.file;
            this.form.alasan = data.alasan;
            this.form.informasi = data.informasi;
            this.form.kode = data.kode;
            this.form.asetId = data.asetId;
        },

        openModal(data) {
            this.modal_komponen = true;
            this.modal_komponen_jenis = data
        },

        autocomplete_getSubKegiatan(val, update) {
            update(() => {
                fetch(this.$store.state.url.URL_ASET + "subSubList", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        authorization: "kikensbatara " + localStorage.token
                    },
                    body: JSON.stringify({
                        val: val
                    })
                })
                .then(res => res.json())
                .then(data => {
                    this.optionsSubSub = data.map(item => ({
                        kode: item.kode,
                        label: item.kode + " - " + item.uraian
                    }))
                })
            })
        },

        loadSubSubAwal() {
            FETCHING.getSubKegiatan('')
        },

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
        this.getView();
        DATA_MASTER.getAlasan();
        DATA_MASTER.getPenyebab();
        FETCHING.getContohAtocomplete('')
    },
}
</script>