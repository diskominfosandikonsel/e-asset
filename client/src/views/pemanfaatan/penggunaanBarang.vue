<template>
    <div class="about" style="padding:15px">
        <q-card bordered class="my-card">
            <q-card-section class="bg-blue-3 text-white">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="text-h6 h_titleHead">Penggunaan Barang</div>
                        <div class="text-subtitle2">Pemanfaatan</div>
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
                                <th class="text-center" width="12%">Kode Aset</th>
                                <th class="text-center" width="12%">Nama Aset</th>
                                <th class="text-center" width="11%">Nama Pemakai</th>
                                <th class="text-center" width="11%">Jabatan</th>
                                <th class="text-center" width="11%">No. BAST</th>
                                <th class="text-center" width="11%">Tanggal</th>
                                <th class="text-center" width="12%">Keterangan</th>
                                <th class="text-center" width="15%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                                <td class="text-center">{{ index + 1 }}.</td>
                                <td>{{ data.asetId }}</td>
                                <td>{{ data.nm_aset }}</td>
                                <td>{{ data.g_depan }} {{ data.nama }}, {{ data.g_belakang }}</td>
                                <td>{{ data.jabatan }}</td>
                                <td>{{ data.nomor }}</td>
                                <td>{{ data.tgl }}</td>
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
            <q-card class="mdl-md" style="min-width: 400px">
                <q-card-section class="bg-primary text-white">
                    <div class="text-h6">Tambah Data</div>
                </q-card-section>

                <form @submit.prevent="addData()">
                    <q-card-section class="q-pa-md">
                        <div class="row q-col-gutter-sm">
                            <div class="col-12">
                                <div class="text-subtitle2 text-primary q-mb-xs">Jenis Penggunaan Barang</div>
                                <q-separator q-mb-md />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Jenis BMD</span>
                                <q-select
                                    v-model="form.id_bmd"
                                    :options="list_bmd"
                                    option-value="id"
                                    option-label="uraian"
                                    outlined square :dense="true"
                                    class="bg-white margin_btn"
                                    emit-value map-options
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Daftar Aset Sesuai KIB</span>
                                <q-select
                                    v-model="form.asetId"
                                    :options="list_aset"
                                    option-value="id"
                                    option-label="uraian"
                                    outlined square :dense="true"
                                    class="bg-white margin_btn"
                                    emit-value map-options
                                />
                            </div>
                            <div class="col-12 q-mt-md">
                                <div class="text-subtitle2 text-primary q-mb-xs">Dokumen Pendukung</div>
                                <q-separator q-mb-md />
                            </div>
                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">Nomor BAST</span>
                                <q-input v-model="form.nomor" outlined square dense class="bg-white" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">Tanggal</span>
                                <q-input v-model="form.tgl" type="date" outlined square dense class="bg-white" />
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
                                <div class="text-subtitle2 text-primary q-mb-xs">Data Pemakai Aset</div>
                                <q-separator q-mb-md />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Nama Pemakai</span>
                                <q-select
                                    v-model="form.penggunaId"
                                    :options="$store.state.list_pengguna"
                                    option-value="id"
                                    option-label="nama"
                                    emit-value map-options
                                    outlined square :dense="true"
                                    class="bg-white margin_btn"
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Status Pemakai</span>
                                <q-input v-model="form.id_status" outlined square dense class="bg-white" disable />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Jabatan</span>
                                <q-input v-model="form.jabatan" outlined square dense class="bg-white" disable />
                            </div>
                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">NIK</span>
                                <q-input v-model="form.nik" outlined square dense class="bg-white" disable />
                            </div>
                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">NIP</span>
                                <q-input v-model="form.nip" outlined square dense class="bg-white" disable />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Alamat</span>
                                <q-input v-model="form.alamat" outlined square :dense="true" class="bg-white margin_btn" type="textarea" disable />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Keterangan</span>
                                <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
                            </div>
                        </div>
                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn :loading="btn_add" color="primary" label="Simpan" @click="addData()" />
                        <q-btn label="Batal" color="negative" v-close-popup />
                    </q-card-actions>
                </form>
            </q-card>
        </q-dialog>

        <q-dialog v-model="mdl_edit" persistent>
            <q-card class="mdl-md" style="min-width: 400px">
                <q-card-section class="bg-orange text-white">
                    <div class="text-h6">Edit Data</div>
                </q-card-section>

                <q-card-section class="q-pa-md">
                    <div class="row q-col-gutter-sm">
                        <div class="col-12">
                            <div class="text-subtitle2 text-primary q-mb-xs">Dokumen Pendukung</div>
                            <q-separator q-mb-md />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Nomor BAST</span>
                            <q-input v-model="form.nomor" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Tanggal</span>
                            <q-input v-model="form.tgl" type="date" outlined square dense class="bg-white" />
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
                            <div class="text-subtitle2 text-primary q-mb-xs">Data Pemakai Aset</div>
                            <q-separator q-mb-md />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nama Pemakai</span>
                            <q-select
                                v-model="form.penggunaId"
                                :options="$store.state.list_pengguna"
                                option-value="id"
                                option-label="nama"
                                emit-value map-options
                                outlined square :dense="true"
                                class="bg-white margin_btn"
                            />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Status Pemakai</span>
                            <q-input v-model="form.id_status" outlined square dense class="bg-white" disable />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Jabatan</span>
                            <q-input v-model="form.jabatan" outlined square dense class="bg-white" disable />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">NIK</span>
                            <q-input v-model="form.nik" outlined square dense class="bg-white" disable />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">NIP</span>
                            <q-input v-model="form.nip" outlined square dense class="bg-white" disable />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Alamat</span>
                            <q-input v-model="form.alamat" outlined square :dense="true" class="bg-white margin_btn" type="textarea" disable />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Keterangan</span>
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
                    <form @submit.prevent="removeData(form.id, file_old)">
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
                    <div class="text-h6">Detail Penggunaan Aset</div>
                </q-card-section>
                <q-separator />
                <q-card-section class="q-gutter-md">
                <div>
                    <div class="text-subtitle1 text-bold q-mb-sm">Informasi Aset</div>
                    <q-list dense bordered separator class="rounded-borders">
                    <q-item>
                        <q-item-section class="col-4"><b>Kode Aset</b></q-item-section>
                        <q-item-section>{{ form.asetId }}</q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section class="col-4"><b>Nama Aset</b></q-item-section>
                        <q-item-section>{{ form.uraian }}</q-item-section>
                    </q-item>

                    </q-list>
                </div>

                <div>
                    <div class="text-subtitle1 text-bold q-mb-sm">Informasi Pemakai</div>
                    <q-list dense bordered separator class="rounded-borders">
                        <q-item>
                            <q-item-section class="col-4"><b>Nama Pemakai</b></q-item-section>
                            <q-item-section>{{ form.nama }}, {{ form.g_belakang }}</q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section class="col-4"><b>Status</b></q-item-section>
                            <q-item-section>{{ form.id_status }}</q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section class="col-4"><b>NIP</b></q-item-section>
                            <q-item-section>{{ form.nip }}</q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section class="col-4"><b>Jabatan</b></q-item-section>
                            <q-item-section>{{ form.jabatan }}</q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section class="col-4"><b>Alamat</b></q-item-section>
                            <q-item-section>{{ form.alamat }}</q-item-section>
                        </q-item>
                    </q-list>
                </div>

                <div>
                    <div class="text-subtitle1 text-bold q-mb-sm">Informasi BAST</div>
                    <q-list dense bordered separator class="rounded-borders">

                        <q-item>
                            <q-item-section class="col-4"><b>No. BAST</b></q-item-section>
                            <q-item-section>{{ form.nomor }}</q-item-section>
                        </q-item>

                        <q-item>
                            <q-item-section class="col-4"><b>Tanggal</b></q-item-section>
                            <q-item-section>{{ form.tgl }}</q-item-section>
                        </q-item>

                        <q-item>
                            <q-item-section class="col-4"><b>Keterangan</b></q-item-section>
                            <q-item-section>{{ form.keterangan }}</q-item-section>
                        </q-item>

                    </q-list>
                </div>

                <div>
                    <div class="text-subtitle1 text-bold q-mb-sm">Lampiran</div>
                    <q-list dense bordered separator class="rounded-borders">
                        <embed :src="file_path + form.file" width="100%" height="600">
                    </q-list>

                </div>

                </q-card-section>

                <!-- Footer -->
                <q-separator />

                <q-card-actions class="bg-grey-3" align="right">
                <q-btn label="Tutup" color="negative" v-close-popup />
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
    data() {
        return {

            form: {
                id: '',
                id_bmd: '',
                asetId: '',
                kode_aset: '',
                nomor: '',
                tgl: '',
                file_old: '',
                file: null,
                penggunaId: null,
                nip: '',
                nik: '',
                alamat: '',
                id_status: '',
                jabatan: '',
                keterangan: '',
            },


            list_data: [],
            list_bmd: [
                {id: 1, uraian: 'KIB A - Tanah'},
                {id: 2, uraian: 'KIB B - Peralatan dan Mesin'},
                {id: 3, uraian: 'KIB C - Gedung dan Bangunan'},
                {id: 4, uraian: 'KIB D - Jalan, Irigasi, dan Jaringan'},
                {id: 5, uraian: 'KIB E - Aset Tetap Lainnya'},
                {id: 6, uraian: 'KIB F - Konstruksi Dalam Pengerjaan'},
            ],
            list_aset: [],

            page_first: 1,
            page_last: 0,
            cari_value: "",
            cek_load_data: true,


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

            file_path: this.$store.state.url.URL_APP + "uploads/",
        }
    },
    watch: {
        'form.penggunaId'(id) {
            // console.log("ID berubah:", id)
            if (!id) return
            const pengguna = this.$store.state.list_pengguna.find(
                p => String(p.id) === String(id)
            )
            // console.log("Data pengguna:", pengguna)
            if (!pengguna) return
            this.form.nip = pengguna.nip
            this.form.nik = pengguna.NIK
            this.form.jabatan = pengguna.jabatan
            this.form.alamat = pengguna.alamat
            this.form.id_status = pengguna.uraian
        },
        'form.id_bmd'(val) {
            if (!val) return

            if (val == 1) {
                this.getKibA()
            }
        },
        'form.asetId'(val) {
            const selected = this.list_aset.find(item => item.id === val)

            if (selected) {
                this.form.asetId = selected.kode_aset
            }

            console.log("KODE ASET:", this.form.asetId)
        },
    },
    methods: {
        getView: function () {
            this.$store.commit("shoWLoading");
            fetch(this.$store.state.url.URL_PENGGUNA + "view", {
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

            fetch(this.$store.state.url.URL_PENGGUNA + "addData", {
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

            fetch(this.$store.state.url.URL_PENGGUNA + "editData", {
                method: "POST",
                headers: {
                    authorization: "kikensbatara " + localStorage.token
                },
                body: formData
            }).then(res_data => {
                this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
                this.getView();
            });
        },

        removeData: function (idnya, file_old) {
            fetch(this.$store.state.url.URL_PENGGUNA + "removeData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({
                    id: idnya,
                    file: file_old
                })
            }).then(res_data => {
                this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
                this.getView();
            });

        },

        selectData: function (data) {
            this.form.id = data.id;
            this.form.asetId = data.asetId;
            this.form.uraian = data.uraian;
            this.form.nomor = data.nomor;
            this.form.tgl = data.tgl;
            this.form.file_old = data.file;
            this.form.file = data.file;
            this.form.penggunaId = data.penggunaId;
            this.form.id_status = data.id_status;
            this.form.nama = data.nama;
            this.form.g_depan = data.g_depan;
            this.form.g_belakang = data.g_belakang;
            this.form.jabatan = data.jabatan;
            this.form.nik = data.nik;
            this.form.nip = data.nip;
            this.form.alamat = data.alamat;
            this.form.keterangan = data.keterangan;
        },

        openModal(data) {
            this.modal_komponen = true;
            this.modal_komponen_jenis = data
        },

        getKibA() {
            fetch(this.$store.state.url.URL_TANAH + "kib_a", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({})
            })
                .then(res => res.json())
                .then(res => {
                    console.log("DATA KIB A:", res.data)

                    // mapping ke dropdown
                    this.list_aset = res.data.map(item => ({
                        id: item.subSubId,
                        uraian: item.keterangan,
                    }))
                })
            .catch(err => {
                console.log("ERROR:", err)
            })
        },

        getAset(kode) {
            fetch(this.$store.state.url.URL_PENGGUNA + `aset?kode=${kode}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                }
            })
                .then(res => res.json())
                .then(res => {
                    console.log("RESPONSE:", res)
                    const data = res.data || res
                    this.list_aset = data.map(item => ({
                        id: item.kode_aset,
                        uraian: item.kode_aset + " - " + item.uraian,
                    }))
                })
                .catch(err => {
                    console.error("ERROR:", err)
                    this.list_aset = []
                })
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
        this.getView();
        DATA_MASTER.getPengguna();
    },
}
</script>
