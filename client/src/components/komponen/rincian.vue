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
                            <td class="text-center">{{ data.akunId }}.{{ data.kelompokId }}.{{ data.jenisId }}.{{ data.objekId }}.{{ data.rincianId }}.{{ data.subId }}.{{ data.subSubId }}</td>
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
                            <span class="h_lable">Nomor (auto increment)</span>
                            <q-input v-model="form.no" value="1" outlined square dense disable class="bg-white" />
                        </div>
                        <div class="col-12 frame_cari">
                            <span class="h_lable">Kode Aset</span>
                            <!-- <div class="grid-7-kolom q-mt-xs">
                                <q-input outlined square dense class="bg-white input-aset-kecil" placeholder="00" />
                                <q-input outlined square dense class="bg-white input-aset-kecil" placeholder="00" />
                                <q-input outlined square dense class="bg-white input-aset-kecil" placeholder="00" />
                                <q-input outlined square dense class="bg-white input-aset-kecil" placeholder="00" />
                                <q-input outlined square dense class="bg-white input-aset-kecil" placeholder="00" />
                                <q-input outlined square dense class="bg-white input-aset-kecil" placeholder="00" />
                                <q-input outlined square dense class="bg-white input-aset-kecil" placeholder="00" />
                            </div> -->


                            <div class="grid-7-kolom q-mt-xs">
                                <!-- ASET -->
                                <q-select
                                    v-model="form.akunId"
                                    :options="$store.state.list_aset"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined square
                                    :dense="true"
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.akunId"
                                    :label="form.akunId ? '' : '00'"
                                    emit-value map-options
                                    @input="awaitFetch"
                                />

                                <!-- KELOMPOK -->
                                <q-select
                                    v-model="form.kelompokId"
                                    :options="$store.state.list_kelompok"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined square
                                    :dense="true"
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.kelompokId"
                                    :label="form.kelompokId ? '' : '00'"
                                    emit-value map-options
                                    @input="awaitFetch"
                                />

                                <!-- JENIS -->
                                <q-select
                                    v-model="form.jenisId"
                                    :options="$store.state.list_jenis"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined square
                                    :dense="true"
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.jenisId"
                                    :label="form.jenisId ? '' : '00'"
                                    emit-value map-options
                                    @input="awaitFetch"
                                />

                                <!-- OBJEK -->
                                <q-select
                                    v-model="form.objekId"
                                    :options="$store.state.list_objek"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined square
                                    :dense="true"
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.objekId"
                                    :label="form.objekId ? '' : '00'"
                                    emit-value map-options
                                    @input="awaitFetch"
                                />

                                <!-- RINCIAN -->
                                <q-select
                                    v-model="form.rincianId"
                                    :options="$store.state.list_rincian"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined square
                                    :dense="true"
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.rincianId"
                                    :label="form.rincianId ? '' : '00'"
                                    emit-value map-options
                                    @input="awaitFetch"
                                />

                                <!-- SUB RINCIAN -->
                                <q-select
                                    v-model="form.subId"
                                    :options="$store.state.list_sub"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined square
                                    :dense="true"
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.subId"
                                    :label="form.subId ? '' : '00'"
                                    emit-value map-options
                                    @input="awaitFetch"
                                />

                                <!-- SUB-SUB RINCIAN -->
                                <q-select
                                    v-model="form.subSubId"
                                    :options="$store.state.list_sub_sub"
                                    option-value="kode"
                                    :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                    outlined square
                                    :dense="true"
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.subSubId"
                                    :label="form.subSubId ? '' : '00'"
                                    emit-value map-options
                                />
                            </div>
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
                        <div class="col-12 frame_cari">
                            <span class="h_lable">Kode Aset</span>
                            <div class="grid-7-kolom q-mt-xs">
                                <q-input outlined square dense class="bg-white input-aset-kecil" placeholder="00" />
                                <q-input outlined square dense class="bg-white input-aset-kecil" placeholder="00" />
                                <q-input outlined square dense class="bg-white input-aset-kecil" placeholder="00" />
                                <q-input outlined square dense class="bg-white input-aset-kecil" placeholder="00" />
                                <q-input outlined square dense class="bg-white input-aset-kecil" placeholder="00" />
                                <q-input outlined square dense class="bg-white input-aset-kecil" placeholder="00" />
                                <q-input outlined square dense class="bg-white input-aset-kecil" placeholder="00" />
                            </div>
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
                                    {{ form.akunId }}.{{ form.kelompokId }}.{{ form.jenisId }}.{{ form.objekId }}.{{ form.rincianId }}.{{ form.subId }}.{{ form.subSubId }}
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
                                <q-item-section>{{ form.harga }}</q-item-section>
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

export default {
    props: ["pengadaanId"],
    data() {
        return {
            form: {
                id: '',
                pengadaanId: this.pengadaanId,
                akunId: '',
                kelompokId: '',
                jenisId: '',
                objekId: '',
                rincianId: '',
                subId: '',
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
            this.$store.state.list_kelompok = await this.DATA_MASTER.getKelompok(this.form.akunId);
            this.$store.state.list_jenis = await this.DATA_MASTER.getJenis(this.form.kelompokId);
            this.$store.state.list_objek = await this.DATA_MASTER.getObjek(this.form.jenisId);
            this.$store.state.list_rincian = await this.DATA_MASTER.getRincian(this.form.objekId);
            this.$store.state.list_sub = await this.DATA_MASTER.getSub(this.form.rincianId);
            this.$store.state.list_sub_sub = await this.DATA_MASTER.getSubSub(this.form.subId);
        }

        // ====================================== PAGINATE ====================================

    },

    mounted() {
        this.getView();

        DATA_MASTER.getAset();
    },
}
</script>