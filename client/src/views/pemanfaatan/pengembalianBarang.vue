<template>
    <div class="about" style="padding:15px">
        <q-card bordered class="my-card">
            <q-card-section class="bg-blue-3 text-white">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="text-h6 h_titleHead">Pengembalian Barang</div>
                        <div class="text-subtitle2">Pemanfaatan</div>
                    </div>
                    <div class="col-12 col-md-2"></div>
                    <div class="col-12 col-md-4">
                        <div class="row">
                            <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:90%" />
                            <q-btn glossy class="bg-red-4" @click="mdl_add = true" dense flat icon="add" style="width:10%" disabled>
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
                                <th class="text-center" width="15%">Kode Aset</th>
                                <th class="text-center" width="15%">Nama Aset</th>
                                <th class="text-center" width="15%">Nama Pemakai</th>
                                <th class="text-center" width="10%">Jabatan</th>
                                <th class="text-center" width="10%">No. BAST</th>
                                <th class="text-center" width="10%">Tanggal</th>
                                <th class="text-center" width="10%">Status</th>
                                <th class="text-center" width="10%">Aksi</th>
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
                                <td>{{ UMUM.tglConvert(data.tgl) }}</td>
                                <td class="text-center">
                                    <q-badge 
                                        v-if="!data.status" 
                                        color="orange"
                                        label="Belum Dikembalikan"
                                    />
                                    <q-badge 
                                        v-else 
                                        color="green"
                                        label="Sudah Dikembalikan"
                                    />
                                </td>
                                <td class="text-center">
                                    <q-btn-group flat>
                                        <q-btn glossy color="blue" icon="search" size="sm" @click="mdl_lihat = true, selectData(data)">
                                            <q-tooltip>Lihat Data</q-tooltip>
                                        </q-btn>
                                        <q-btn glossy color="red-4" icon="double_arrow" size="sm" @click="selectData(data), openModal('PENGEMBALIAN')">
                                            <q-tooltip>Dokumen Pengembalian</q-tooltip>
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

                            <q-item clickable v-close-popup @click="selectData(data), mdl_pengembalian = true">
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
                            <div class="text-subtitle2 text-primary q-mb-xs">Dokumen Pendukung</div>
                            <q-separator q-mb-md />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Nomor BAST</span>
                            <q-input v-model="form.no" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Tanggal</span>
                            <q-input v-model="form.tgl" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Alamat</span>
                            <q-input v-model="form.alamat" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
                        </div>
                        <div class="col-12 q-mt-md">
                            <div class="text-subtitle2 text-primary q-mb-xs">Data Pemakai Aset</div>
                            <q-separator q-mb-md />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nama Pemakai</span>
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
                            <span class="h_lable">Status Pemakai</span>
                            <q-select
                                v-model="form.id_status"
                                :options="list_bmd"
                                option-value="id"
                                option-label="uraian"
                                outlined square :dense="true"
                                class="bg-white margin_btn"
                                emit-value map-options
                            />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Jabatan</span>
                            <q-input v-model="form.jabatan" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">NIK</span>
                            <q-input v-model="form.nik" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">NIP</span>
                            <q-input v-model="form.nip" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Alamat</span>
                            <q-input v-model="form.alamat" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
                        </div>
                    </div>
                </q-card-section>

                <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    <q-btn :loading="btn_add" color="primary" label="Simpan" />
                    <q-btn label="Batal" color="negative" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="mdl_pengembalian" persistent>
            <q-card class="mdl-md" style="min-width: 400px">
                <q-card-section class="bg-red-4 text-white">
                    <div class="text-h6">Dokumen Pengembalian</div>
                </q-card-section>

                <q-card-section class="q-pa-md">
                    <div class="row q-col-gutter-sm">
                        <div class="col-12">
                            <div class="text-subtitle2 text-primary q-mb-xs">Dokumen Pengembalian</div>
                            <q-separator q-mb-md />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Nomor Dokumen</span>
                            <q-input v-model="form.no" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Tanggal Dokumen</span>
                            <q-input v-model="form.tgl" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Alamat</span>
                            <q-file v-model="form.file" outlined square :dense="true" class="bg-white margin_btn">
                                <template v-slot:prepend>
                                    <q-icon name="attach_file" />
                                </template>
                            </q-file>
                        </div>

                        <div class="col-12 q-mt-md">
                            <div class="text-subtitle2 text-primary q-mb-xs">Penerima Pengembalian Aset</div>
                            <q-separator q-mb-md />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nama Pemakai</span>
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
                            <span class="h_lable">Pangkat/Gol</span>
                            <q-input v-model="form.pangkat_gol" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Jabatan</span>
                            <q-input v-model="form.jabatan" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">OPD</span>
                            <q-input v-model="form.opd" outlined square dense class="bg-white" />
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
                <div class="text-h6">Detail Penggunaan Aset</div>
                </q-card-section>

                <q-separator />

                <!-- Body -->
                <q-card-section class="q-gutter-md">

                <!-- Informasi Aset -->
                <div>
                    <div class="text-subtitle1 text-bold q-mb-sm">Informasi Aset</div>

                    <q-list dense bordered separator class="rounded-borders">

                    <q-item>
                        <q-item-section class="col-4"><b>Kode Aset</b></q-item-section>
                        <q-item-section>{{ form.asetId }}</q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section class="col-4"><b>Nama Aset</b></q-item-section>
                        <q-item-section>{{ form.nm_aset }}</q-item-section>
                    </q-item>

                    </q-list>
                </div>


                <!-- Informasi Pemakai -->
                <div>
                    <div class="text-subtitle1 text-bold q-mb-sm">Informasi Pemakai</div>

                    <q-list dense bordered separator class="rounded-borders">

                    <q-item>
                        <q-item-section class="col-4"><b>Nama Pemakai</b></q-item-section>
                        <q-item-section>{{ form.g_depan }} {{ form.nama }}, {{ form.g_belakang }}</q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section class="col-4"><b>Jabatan</b></q-item-section>
                        <q-item-section>{{ form.jabatan }}</q-item-section>
                    </q-item>

                    </q-list>
                </div>


                <!-- Informasi BAST -->
                <div>
                    <div class="text-subtitle1 text-bold q-mb-sm">Informasi BAST</div>

                    <q-list dense bordered separator class="rounded-borders">

                    <q-item>
                        <q-item-section class="col-4"><b>No. BAST</b></q-item-section>
                        <q-item-section>{{ form.no_bast }}</q-item-section>
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

                </q-card-section>

                <!-- Footer -->
                <q-separator />

                <q-card-actions class="bg-grey-3" align="right">
                <q-btn label="Tutup" color="negative" v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>

        <q-dialog v-model="mdl_status" persistent>
            <q-card class="mdl-md">

                <q-card-section class="bg-blue-3 text-white">
                <div class="text-h6">Detail Pengembalian Aset</div>
                </q-card-section>

                <q-separator/>

                <q-card-section class="q-gutter-md">

                <!-- Informasi Aset -->
                <div>
                    <div class="text-subtitle1 text-bold q-mb-sm">Informasi Aset</div>

                    <q-list dense bordered separator>

                    <q-item>
                        <q-item-section class="col-4"><b>Kode Aset</b></q-item-section>
                        <q-item-section>{{ form.kd_aset }}</q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section class="col-4"><b>Nama Aset</b></q-item-section>
                        <q-item-section>{{ form.nm_aset }}</q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section class="col-4"><b>Nama Pemakai</b></q-item-section>
                        <q-item-section>{{ form.g_depan }} {{ form.nama }}, {{ form.g_belakang }}</q-item-section>
                    </q-item>

                    </q-list>
                </div>


                <!-- Dokumen -->
                <div>
                    <div class="text-subtitle1 text-bold q-mb-sm">Dokumen Pengembalian</div>

                    <q-list dense bordered separator>

                    <q-item>
                        <q-item-section class="col-4"><b>Nomor Dokumen</b></q-item-section>
                        <q-item-section>{{ form.no }}</q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section class="col-4"><b>Tanggal</b></q-item-section>
                        <q-item-section>{{ form.tgl }}</q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section class="col-4"><b>File Dokumen</b></q-item-section>
                        <q-item-section>{{ form.file }}</q-item-section>
                    </q-item>

                    </q-list>
                </div>


                <!-- Penerima -->
                <div>
                    <div class="text-subtitle1 text-bold q-mb-sm">Penerima Pengembalian</div>

                    <q-list dense bordered separator>

                    <q-item>
                        <q-item-section class="col-4"><b>Pangkat / Gol</b></q-item-section>
                        <q-item-section>{{ form.pangkat_gol }}</q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section class="col-4"><b>Jabatan</b></q-item-section>
                        <q-item-section>{{ form.jabatan }}</q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section class="col-4"><b>OPD</b></q-item-section>
                        <q-item-section>{{ form.opd }}</q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section class="col-4"><b>Keterangan</b></q-item-section>
                        <q-item-section>{{ form.keterangan }}</q-item-section>
                    </q-item>

                    </q-list>
                </div>

                </q-card-section>

                <q-separator/>

                <q-card-actions align="right" class="bg-grey-3">
                <q-btn label="Tutup" color="negative" v-close-popup/>
                </q-card-actions>

            </q-card>
        </q-dialog>

        <q-dialog v-model="modal_komponen" persistent>
            <q-card :class="cardClass">
                <div v-if="modal_komponen_jenis == 'PENGEMBALIAN'">
                    <kompPengembalian :penggunaanId = "form.id" />
                </div>
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
            if (this.modal_komponen_jenis === 'PENGEMBALIAN') {
                return 'mdl-lg';
            } 
            return 'mdl-default'; // Default class
        }
    },
    data() {
        return {

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
                    nm_aset: "Laptop",
                    nm_pemakai: "Hidayat Darmawan",
                    jabatan: "Programmer",
                    no_bast: "BAST-001/DISKOMINFO/2026",
                    tgl: "2026-03-07",
                    keterangan: "Digunakan untuk pengembangan aplikasi e-Aset",
                    status_pengembalian: false
                },
                {
                    id: 2,
                    kd_aset: "1.3.2.10.01.02.002.002",
                    nm_aset: "Laptop",
                    nm_pemakai: "Iksan",
                    jabatan: "Network Engineer",
                    no_bast: "BAST-002/DISKOMINFO/2026",
                    tgl: "2026-03-05",
                    keterangan: "Digunakan untuk monitoring server",
                    status_pengembalian: true
                },
                {
                    id: 3,
                    kd_aset: "1.3.2.10.01.02.002.003",
                    nm_aset: "Server",
                    nm_pemakai: "Riswan M. Rizal",
                    jabatan: "System Administrator",
                    no_bast: "BAST-003/DISKOMINFO/2026",
                    tgl: "2026-03-01",
                    keterangan: "Server untuk aplikasi e-Aurel",
                    status_pengembalian: true
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

            list_status: [
                {id: 1, uraian: 'PNS'},
                {id: 2, uraian: 'PPPK'},
                {id: 3, uraian: 'Non-ASN'},
            ],

            list_pengembalian: [
                {
                    id: 1,
                    kd_aset: "1.3.2.10.01.02.002.001",
                    nm_aset: "Laptop Lenovo Thinkpad",
                    nm_pemakai: "Hidayat Darmawan",

                    no: "BAP-001/DISKOMINFO/III/2026",
                    tgl: "2026-03-08",
                    file: "dokumen_pengembalian_1.pdf",

                    id_bmd: 2,
                    pangkat_gol: "III/a",
                    jabatan: "Programmer",
                    opd: "Dinas Kominfo",

                    keterangan: "Aset telah dikembalikan dalam kondisi baik",

                    status_pengembalian: true
                },
                {
                    id: 2,
                    kd_aset: "1.3.2.10.01.02.002.002",
                    nm_aset: "Laptop HP Probook",
                    nm_pemakai: "Iksan",

                    no: "BAP-002/DISKOMINFO/III/2026",
                    tgl: "2026-03-07",
                    file: "dokumen_pengembalian_2.pdf",

                    id_bmd: 2,
                    pangkat_gol: "III/b",
                    jabatan: "Network Engineer",
                    opd: "Dinas Kominfo",

                    keterangan: "Pengembalian aset setelah selesai pemeliharaan server",

                    status_pengembalian: true
                },
                {
                    id: 3,
                    kd_aset: "1.3.2.10.01.02.002.003",
                    nm_aset: "Server Dell PowerEdge",
                    nm_pemakai: "Riswan M. Rizal",

                    no: "BAP-003/DISKOMINFO/III/2026",
                    tgl: "2026-03-06",
                    file: "dokumen_pengembalian_3.pdf",

                    id_bmd: 2,
                    pangkat_gol: "III/c",
                    jabatan: "System Administrator",
                    opd: "Dinas Kominfo",

                    keterangan: "Server dikembalikan ke ruang server utama",

                    status_pengembalian: true
                }
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
            mdl_pengembalian: false,
            mdl_remove: false,
            mdl_lihat: false,
            mdl_status: false,
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
            this.form.asetId = data.asetId;
            this.form.nm_aset = data.nm_aset;
            this.form.nama = data.nama;
            this.form.g_depan = data.g_depan;
            this.form.g_belakang = data.g_belakang;
            this.form.jabatan = data.jabatan;
            this.form.no_bast = data.no_bast;
            this.form.tgl = data.tgl;
            this.form.keterangan = data.keterangan;
        },

        openModal(data) {
            this.modal_komponen = true;
            this.modal_komponen_jenis = data
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
        FETCHING.getContohAtocomplete('')
    },
}
</script>