<template>
    <div class="about" style="padding:15px">
        <q-card bordered class="my-card">
            <q-card-section class="bg-blue-3 text-white">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="text-h6 h_titleHead">Reklasifikasi</div>
                        <div class="text-subtitle2">Reklasifikasi Aset</div>
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
                                <th class="text-center" width="20%">Kode Barang</th>
                                <th class="text-center" width="25%">Nama Barang</th>
                                <th class="text-center" width="25%">Nomor Dokumen</th>
                                <th class="text-center" width="25%">Kode Barang Tujuan</th>
                                <th class="text-center" width="25%">Nama Barang Tujuan</th>
                                <th class="text-center" width="25%">Alasan Reklasifikasi</th>
                                <th class="text-center" width="25%">Keterangan</th>
                                <th class="text-center" width="15%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="h_table_body" v-for="(data, index) in dataDummy" :key="data.id">
                                <td class="text-center">{{ index + 1 }}.</td>
                                <td>{{ data.kd_aset }}</td>
                                <td>{{ data.nm_aset }}</td>
                                <td>{{ data.nm_pemakai }}</td>
                                <td>{{ data.jabatan }}</td>
                                <td>{{ data.no_bast }}</td>
                                <td>{{ data.tgl }}</td>
                                <td>{{ data.keterangan }}</td>
                                <td class="text-center">
                                    <q-btn-group flat>
                                        <q-btn glossy color="blue" icon="search" size="sm" @click="mdl_lihat = true, selectData(data)">
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

                <q-card-section class="q-pa-md">
                    <div class="row q-col-gutter-sm">
                        <div class="col-12">
                            <div class="text-subtitle2 text-primary q-mb-xs">Dokumen Reklasifikasi</div>
                            <q-separator q-mb-md />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nama Dokumen</span>
                            <q-input v-model="form.uraian" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nomor Dokumen</span>
                            <q-input v-model="form.no" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Tanggal</span>
                            <q-input v-model="form.tgl" type="date" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Keterangan</span>
                            <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
                        </div>
                        <div class="col-12 q-mt-md">
                            <div class="text-subtitle2 text-primary q-mb-xs">Informasi Barang</div>
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
                                v-model="form.id_bmd"
                                :options="list_bmd"
                                option-value="id"
                                option-label="uraian"
                                outlined square :dense="true"
                                class="bg-white margin_btn"
                                emit-value map-options
                            />
                        </div>
                        <div class="col-12 q-mt-md">
                            <div class="text-subtitle2 text-primary q-mb-xs">Barang Reklasifikasi</div>
                            <q-separator q-mb-md />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Alasan Reklasifikasi</span>
                            <q-select
                                v-model="form.id_alasan"
                                :options="list_alasan"
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
                                v-model="form.subSubId"
                                use-input hide-selected fill-input
                                input-debounce="300"
                                :options="optionsSubSub"
                                option-value="kode"
                                option-label="label"
                                emit-value map-options
                                @filter="autocomplete_getSubKegiatan"
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
                            <span class="h_lable">Spesifikasi Barang Tujuan</span>
                            <q-input v-model="form.spek" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
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
            <q-card class="mdl-md">
                <q-card-section class="bg-orange text-white">
                    <div class="text-h6">Edit Data</div>
                </q-card-section>

                <q-card-section class="q-pa-md">
                    <div class="row q-col-gutter-sm">
                        <div class="col-12">
                            <div class="text-subtitle2 text-primary q-mb-xs">Dokumen Reklasifikasi</div>
                            <q-separator q-mb-md />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nama Dokumen</span>
                            <q-input v-model="form.uraian" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nomor Dokumen</span>
                            <q-input v-model="form.no" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Tanggal</span>
                            <q-input v-model="form.tgl" type="date" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Keterangan</span>
                            <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
                        </div>
                        <div class="col-12 q-mt-md">
                            <div class="text-subtitle2 text-primary q-mb-xs">Informasi Barang</div>
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
                                v-model="form.id_bmd"
                                :options="list_bmd"
                                option-value="id"
                                option-label="uraian"
                                outlined square :dense="true"
                                class="bg-white margin_btn"
                                emit-value map-options
                            />
                        </div>
                        <div class="col-12 q-mt-md">
                            <div class="text-subtitle2 text-primary q-mb-xs">Barang Reklasifikasi</div>
                            <q-separator q-mb-md />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Alasan Reklasifikasi</span>
                            <q-select
                                v-model="form.id_alasan"
                                :options="list_alasan"
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
                                v-model="form.subSubId"
                                use-input hide-selected fill-input
                                input-debounce="300"
                                :options="optionsSubSub"
                                option-value="kode"
                                option-label="label"
                                emit-value map-options
                                @filter="autocomplete_getSubKegiatan"
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
                            <span class="h_lable">Spesifikasi Barang Tujuan</span>
                            <q-input v-model="form.spek" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
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
                <q-card-section class="bg-blue-3 text-white">
                <div class="text-h6">Detail Reklasifikasi Aset</div>
                </q-card-section>

                <q-separator />

                <!-- Body -->
                <q-card-section class="q-gutter-md">

                <!-- Informasi Aset -->
                <div>
                    <div class="text-subtitle1 text-bold q-mb-sm">Informasi Aset</div>

                    <q-list dense bordered separator class="rounded-borders">

                    <q-item>
                        <q-item-section class="col-4"><b>Kode Barang</b></q-item-section>
                        <q-item-section>{{ form.kd_aset }}</q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section class="col-4"><b>Nama Barang</b></q-item-section>
                        <q-item-section>{{ form.nm_aset }}</q-item-section>
                    </q-item>

                    </q-list>
                </div>

                <!-- Informasi Dokumen -->
                <div>
                    <div class="text-subtitle1 text-bold q-mb-sm">Informasi Dokumen</div>

                    <q-list dense bordered separator class="rounded-borders">

                    <q-item>
                        <q-item-section class="col-4"><b>Nomor Dokumen</b></q-item-section>
                        <q-item-section>{{ form.nm_pemakai }}</q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section class="col-4"><b>Tanggal</b></q-item-section>
                        <q-item-section>{{ form.tgl }}</q-item-section>
                    </q-item>

                    </q-list>
                </div>

                <!-- Informasi Reklasifikasi -->
                <div>
                    <div class="text-subtitle1 text-bold q-mb-sm">Informasi Reklasifikasi</div>

                    <q-list dense bordered separator class="rounded-borders">

                    <q-item>
                        <q-item-section class="col-4"><b>Kode Barang Tujuan</b></q-item-section>
                        <q-item-section>{{ form.jabatan }}</q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section class="col-4"><b>Nama Barang Tujuan</b></q-item-section>
                        <q-item-section>{{ form.no_bast }}</q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section class="col-4"><b>Alasan Reklasifikasi</b></q-item-section>
                        <q-item-section>{{ form.keterangan }}</q-item-section>
                    </q-item>

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
                no: '',
                merk: '',
                type: '',
                ukuran: '',
                jumlah: '',
                harga: '',
                total: '',
                rekening: '',
                keterangan: '',
                file: null,
            },

            dataDummy: [
                {
                    id: 1,
                    kd_aset: "1.3.2.10.01.02.002.001",
                    nm_aset: "Laptop Macbook Pro M2",
                    nm_pemakai: "SK-01/REK-BMD/2026",
                    jabatan: "1.3.2.10.01.02.005.001",
                    no_bast: "Laptop Programmer",
                    tgl: "Perubahan spesifikasi barang",
                    keterangan: "Reklasifikasi laptop untuk kebutuhan pengembangan aplikasi"
                },
                {
                    id: 2,
                    kd_aset: "1.3.2.10.01.02.002.002",
                    nm_aset: "Printer LaserJet HP 402",
                    nm_pemakai: "SK-02/REK-BMD/2026",
                    jabatan: "1.3.2.10.01.02.006.001",
                    no_bast: "Printer Administrasi",
                    tgl: "Kesalahan pengelompokan aset",
                    keterangan: "Penyesuaian kode barang printer pada kelompok peralatan kantor"
                },
                {
                    id: 3,
                    kd_aset: "1.3.2.10.01.02.003.001",
                    nm_aset: "Server Rack Dell PowerEdge",
                    nm_pemakai: "SK-03/REK-BMD/2026",
                    jabatan: "1.3.2.10.01.02.009.001",
                    no_bast: "Server Infrastruktur",
                    tgl: "Perubahan fungsi penggunaan",
                    keterangan: "Server dipindahkan menjadi infrastruktur pusat data"
                },
                {
                    id: 4,
                    kd_aset: "1.3.2.10.01.02.004.001",
                    nm_aset: "Proyektor Epson EB-X500",
                    nm_pemakai: "SK-04/REK-BMD/2026",
                    jabatan: "1.3.2.10.01.02.007.001",
                    no_bast: "Proyektor Ruang Rapat",
                    tgl: "Penyesuaian kode aset",
                    keterangan: "Perubahan klasifikasi proyektor pada kelompok peralatan presentasi"
                }
            ],

            list_bmd: [
                {id: 1, uraian: 'KIB A - Tanah'},
                {id: 2, uraian: 'KIB B - Peralatan dan Mesin'},
                {id: 3, uraian: 'KIB C - Gedung dan Bangunan'},
                {id: 4, uraian: 'KIB D - Jalan, Irigasi, dan Jaringan'},
                {id: 5, uraian: 'KIB E - Aset Tetap Lainnya'},
                {id: 6, uraian: 'KIB F - Konstruksi Dalam Pengerjaan'},
            ],

            list_alasan: [
                {id: 1, uraian: 'TERDAPAT KESALAHAN PENCACATAN, PENGGOLONGAN DAN KODEFIKASI BMD'},
                {id: 2, uraian: 'PERUBAHAN FUNGSI'},
                {id: 3, uraian: 'RUSAK BERAT/USANG'},
                {id: 4, uraian: 'HILANG'},
                {id: 5, uraian: 'ASET BERSEJARAH'},
                {id: 6, uraian: 'KETENTUAN PERATURAN PERUNDANG-UNDANGAN'},
                {id: 7, uraian: 'EKSTRAKOM'},
                {id: 8, uraian: 'INTRAKOM'},
                {id: 9, uraian: 'PERSEDIAAN RUSAK'},
                {id: 10, uraian: 'KARENA SEBAB LAIN'},
            ],

            list_status: [
                {id: 1, uraian: 'PNS'},
                {id: 2, uraian: 'PPPK'},
                {id: 3, uraian: 'Non-ASN'},
            ],


            // ====================================== CONTOH AUTOCOMPLETE ====================================
            autocomplete_db: '',
            // ====================================== CONTOH AUTOCOMPLETE ====================================




            list_data: [],

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
        }
    },
    methods: {


        getView: function () {
            this.$store.commit("shoWLoading");
            fetch(this.$store.state.url.URL_MasterKategori + "view", {
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
            fetch(this.$store.state.url.URL_MasterKategori + "Add", {
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
            fetch(this.$store.state.url.URL_MasterKategori + "editData", {
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
            fetch(this.$store.state.url.URL_MasterKategori + "removeData", {
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
            this.form.kd_aset = data.kd_aset;
            this.form.nm_aset = data.nm_aset;
            this.form.nm_pemakai = data.nm_pemakai;
            this.form.jabatan = data.jabatan;
            this.form.no_bast = data.no_bast;
            this.form.tgl = data.tgl;
            this.form.keterangan = data.keterangan;
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
        FETCHING.getContohAtocomplete('')
    },
}
</script>