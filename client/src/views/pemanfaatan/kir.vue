<template>
    <div class="about" style="padding:15px">
        <q-card bordered class="my-card">
            <q-card-section class="bg-blue-3 text-white">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="text-h6 h_titleHead">Kartu Inventaris Ruangan</div>
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
                <div class="lister row q-col-gutter-sm">
                    <div class="col-12 col-md-6" v-for="data in list_kir" :key="data.id">
                        <div class="lister2 full-width shadow-2" style="box-sizing: border-box;">
                            <div class="lister_left">
                                <a class="clear_underline text-h6 text-primary text-weight-bold" style="font-size: 16px;" href="javascript:void(0);" @click="selectData(data), openModal('DAFTAR')">{{ data.nama_ruangan }}</a>
                                <div class="h_sidebar_menu">
                                    {{ data.penanggung_jawab }}
                                </div>
                                <div class="text-caption text-grey-6 q-mb-sm">
                                    NIP: {{ data.nip }}
                                </div>
                                <div class="text-caption text-weight-medium text-red-5 row items-center" style="margin-bottom: 6px;">
                                    <q-icon name="location_on" size="sm" class="q-mr-sm" />
                                    {{ data.lokasi }}
                                </div>
                                <q-separator />
                                <q-card-actions class="bg-blue-grey-1 q-px-md q-py-sm">
                                    <div class="text-caption text-weight-bold text-grey-8" style="margin-left: 16px;">
                                        Total Aset: <q-badge color="primary" class="q-ml-xs">{{ hitungJumlahAset(data.aset) }} Unit</q-badge>
                                    </div>
                                </q-card-actions>
                            </div>
                        <div class="lister_right">
                            <q-btn-dropdown class="rizwan_sex1" size="xs" glossy color="orange" icon="settings" label=""
                                padding="xs">
                                <q-list>
                                    <q-item clickable v-close-popup @click="selectData(data), openModal('DAFTAR')">
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
                </div>
                <hr class="hrpagin">
                <br>
                <div class="flex flex-center">
                    <q-pagination @click="getView()" v-model="page_first" :max="page_last" :max-pages="4"
                        color="orange-14" :direction-links="true" :boundary-links="true" icon-first="skip_previous"
                        icon-last="skip_next" icon-prev="fast_rewind" icon-next="fast_forward">
                    </q-pagination>
                </div>
                <br>
            </q-card-section>
        </q-card>

        <!-- =================================================== MODAL =========================================================== -->


        <!-- ================================================= MODAL TAMBAH ================================================ -->
        <q-dialog v-model="mdl_add" persistent>
            <q-card class="mdl-md">
                <q-card-section class="bg-primary text-white">
                    <div class="text-h6 h_modalhead">Simpan Data</div>
                </q-card-section>

                <form @submit.prevent="addData()">
                    <q-card-section class="q-pa-md">
                        <div class="row q-col-gutter-sm">
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Nama Ruangan</span>
                                <q-input v-model="form.nama" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Lokasi Ruangan</span>
                                <q-input v-model="form.lokasi" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Penanggung Jawab Ruangan</span>
                                <q-select
                                    v-model="form.penanggung_jawab"
                                    :options="$store.state.list_pengguna"
                                    option-value="nip"
                                    option-label="nama"
                                    emit-value map-options
                                    outlined square :dense="true"
                                    class="bg-white margin_btn"
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">NIP</span>
                                <q-input v-model="form.nip" outlined square :dense="true" class="bg-white margin_btn" disable />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Jabatan</span>
                                <q-input v-model="form.jabatan" outlined square :dense="true" class="bg-white margin_btn" disable />
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

                <q-card-section class="q-pa-md">
                        <div class="row q-col-gutter-sm">

                            <div class="col-12">
                                <div class="text-subtitle2 text-primary q-mb-xs">Bagian Kontrak</div>
                                <q-separator q-mb-md />
                            </div>

                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">No. SPK/Perjanjian/Kontrak</span>
                                <q-input v-model="form.no_spk" outlined square dense class="bg-white" />
                            </div>

                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">Tgl SPK/Perjanjian/Kontrak</span>
                                <q-input v-model="form.tgl_spk" outlined square dense type="date" class="bg-white" />
                            </div>

                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Keterangan</span>
                                <q-input v-model="form.keterangan" outlined square :dense="true"
                                    class="bg-white margin_btn" type="textarea" />
                            </div>

                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Jangka Waktu</span>
                                <q-input v-model="form.jangka_waktu" outlined square dense type="number"
                                    class="bg-white" />
                            </div>

                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Nilai</span>
                                <q-input v-model="form.nilai" outlined square dense type="number" class="bg-white" />
                            </div>

                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Jenis Posting</span>
                                <select v-model="form.jenis" class="bg-white margin_btn">
                                    <option value="">-- Pilih Jenis Posting --</option>
                                    <option value="0">Aset Baru</option>
                                    <option value="1">Kapitalisasi</option>
                                </select>
                            </div>

                            <div class="col-12 q-mt-md">
                                <div class="text-subtitle2 text-primary q-mb-xs">Perusahaan</div>
                                <q-separator q-mb-md />
                            </div>

                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">Nama</span>
                                <q-input v-model="form.nama" outlined square dense class="bg-white" />
                            </div>

                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">NPWP</span>
                                <q-input v-model="form.npwp" outlined square dense class="bg-white" />
                            </div>

                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">Bentuk</span>
                                <q-input v-model="form.bentuk" outlined square dense class="bg-white" />
                            </div>

                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">Bank</span>
                                <q-input v-model="form.bank" outlined square dense class="bg-white" />
                            </div>

                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">Alamat</span>
                                <q-input v-model="form.alamat" outlined square dense class="bg-white" />
                            </div>

                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">Atas Nama</span>
                                <q-input v-model="form.alias" outlined square dense class="bg-white" />
                            </div>

                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">Pimpinan</span>
                                <q-input v-model="form.pimpinan" outlined square dense class="bg-white" />
                            </div>

                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">No. Rekening</span>
                                <q-input v-model="form.rekening" outlined square dense class="bg-white" />
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

        <!-- ================================================ MODAL LIHAT ================================================ -->
        <q-dialog v-model="mdl_detil" persistent>
            <q-card class="mdl-md">
                <!-- Header -->
                <q-card-section class="bg-blue-3 text-white flex items-center">
                    <div class="text-h6">Detil Aset</div>
                </q-card-section>

                <q-separator />

                <q-card-section class="q-gutter-md">
                    <div>
                        <div class="text-subtitle1 text-bold q-mb-sm">Informasi Aset</div>
                        <q-list dense bordered separator class="rounded-borders">
                            <q-item>
                                <q-item-section class="col-4 text-weight-medium word-wrap"><b>No. SPK/Perjanjian/Kontrak</b></q-item-section>
                                <q-item-section>{{ form.no_spk }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4 text-weight-medium word-wrap"><b>Tgl SPK/Perjanjian/Kontrak</b></q-item-section>
                                <q-item-section>{{ form.tgl_spk }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4 text-weight-medium"><b>Keterangan</b></q-item-section>
                                <q-item-section>{{ form.keterangan }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4 text-weight-medium"><b>Jangka Waktu</b></q-item-section>
                                <q-item-section>{{ form.jangka_waktu }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4 text-weight-medium"><b>Nilai</b></q-item-section>
                                <q-item-section>{{ form.nilai }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4 text-weight-medium"><b>Jenis Posting</b></q-item-section>
                                <q-item-section>
                                    <span v-if="form.jenis == 0">Aset Baru</span>
                                    <span v-else-if="form.jenis == 1">Kapitalisasi</span>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </div>

                    <div>
                        <div class="text-subtitle1 text-bold q-mb-sm">Perusahaan</div>
                        <q-list dense bordered separator class="rounded-borders">
                            <q-item>
                                <q-item-section class="col-4 text-weight-medium"><b>Nama</b></q-item-section>
                                <q-item-section>{{ form.nama }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4 text-weight-medium"><b>NPWP</b></q-item-section>
                                <q-item-section>{{ form.npwp }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4 text-weight-medium"><b>Bentuk</b></q-item-section>
                                <q-item-section>{{ form.bentuk }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4 text-weight-medium"><b>Bank</b></q-item-section>
                                <q-item-section>{{ form.bank }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4 text-weight-medium"><b>Alamat</b></q-item-section>
                                <q-item-section>{{ form.alamat }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4 text-weight-medium"><b>Atas Nama</b></q-item-section>
                                <q-item-section>{{ form.alias }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4 text-weight-medium"><b>Pimpinan</b></q-item-section>
                                <q-item-section>{{ form.pimpinan }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-4 text-weight-medium"><b>No. Rekening</b></q-item-section>
                                <q-item-section>{{ form.rekening }}</q-item-section>
                            </q-item>
                        </q-list>
                    </div>
                </q-card-section>

                <q-separator />

                <q-card-actions class="bg-grey-3" align="right">
                    <q-btn label="Tutup" color="negative" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- ================================================ MODAL LIHAT ================================================ -->
        <q-dialog v-model="modal_komponen" persistent>
            <q-card :class="cardClass">
                <div v-if="modal_komponen_jenis == 'DAFTAR'">
                    <!-- <kompRincian :pengadaanId = "form.id" /> -->
                    <kompDaftarAset />
                </div>
            </q-card>
        </q-dialog>
        <!-- =================================================== MODAL =========================================================== -->




    </div>
</template>


<script>


import FETCHING from '../../library/fetching'
import UMUM from '../../library/umum'
import DATA_MASTER from '../../library/dataMaster'
import { DATA_RUANGAN } from '../../dataDummy/kir';

export default {
    computed: {
        cardClass() {
            if (this.modal_komponen_jenis === 'DAFTAR') {
                return 'mdl-lg';
            }
            return 'mdl-default'; // Default class
        }
    },
    data() {
        return {

            form: {
                id: '',
                nama: '',
                lokasi: '',
                penanggung_jawab: null,
            },
            
            list_data: [],
            list_kir: DATA_RUANGAN,


            page_first: 1,
            page_last: 0,
            cari_value: "",
            cek_load_data: true,


            mdl_add: false,
            mdl_edit: false,
            mdl_hapus: false,
            mdl_detil: false,
            btn_add: false,

            modal_komponen: false,
            modal_komponen_jenis: '',

            FETCHING: FETCHING,
            UMUM: UMUM,
            DATA_MASTER: DATA_MASTER,
        }
    },
    watch: {
        'form.penanggung_jawab'(nip) {
            console.log("NIP berubah:", nip)
            if (!nip) return
            const pengguna = this.$store.state.list_pengguna.find(
                p => String(p.nip) === String(nip)
            )
            console.log("Data pengguna:", pengguna)
            if (!pengguna) return
            this.form.id = pengguna.id
            this.form.nip = pengguna.nip
            this.form.jabatan = pengguna.jabatan
        },
    },
    methods: {
        hitungJumlahAset(asetArray) {
            if (!asetArray) return 0;
            return asetArray.reduce((total, item) => total + item.jumlah, 0);
        },
            hitungTotalNilai(asetArray) {
            if (!asetArray) return 0;
            return asetArray.reduce((total, item) => total + (item.jumlah * item.harga_satuan), 0);
        },

        getView: function () {
            this.$store.commit("shoWLoading");
            fetch(this.$store.state.url.URL_PENGADAAN + "view", {
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
            fetch(this.$store.state.url.URL_PENGADAAN + "addData", {
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
            fetch(this.$store.state.url.URL_PENGADAAN + "editData", {
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
            fetch(this.$store.state.url.URL_PENGADAAN + "removeData", {
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
            this.form.uraian = data.uraian;
            this.form.keterangan = data.keterangan;

            this.form.no_spk = data.no_spk;
            this.form.tgl_spk = data.tgl_spk;
            this.form.keterangan = data.keterangan;
            this.form.jangka_waktu = data.jangka_waktu;
            this.form.nilai = data.nilai;
            this.form.jenis = data.jenis;
            this.form.nama = data.nama;
            this.form.npwp = data.npwp;
            this.form.bentuk = data.bentuk;
            this.form.bank = data.bank;
            this.form.alamat = data.alamat;
            this.form.alias = data.alias;
            this.form.pimpinan = data.pimpinan;
            this.form.rekening = data.rekening;
        },

        openModal(data) {
            this.modal_komponen = true;
            this.modal_komponen_jenis = data
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