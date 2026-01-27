<template>
    <div class="about" style="padding:15px">
        <q-card bordered class="my-card">
            <q-card-section class="bg-blue-3 text-white">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="text-h6 h_titleHead">Pengadaan</div>
                        <div class="text-subtitle2">Pengadaan</div>
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

            <!-- <q-card-section>
				<hr class="hrpagin2">
				<div class="row q-col-gutter-md">
					<div class="col-12 col-sm-6 col-md-4" v-for="data in listTanah" :key="data.id">
						<q-card class="my-card" flat bordered>
                            <q-img
                                :src="data.file"
                                style="width: 100%; height: 200px"
                                fit="cover"
                                ratio="16/9"
                            />
							<q-card-section class="q-pb-sm">
								<div class="row no-wrap items-start">
                                    <a class="clear_underline" href="javascript:void(0);" @click="mdl_detil = true, selectData(data)">
                                        <div class="col text-h6 text-primary q-pr-sm">
                                            {{ data.opd }}
                                        </div>
                                    </a>
								</div>
							</q-card-section>

							<q-card-section class="q-pt-none q-pb-md">
								<div class="column q-gutter-y-xs">
									<div class="text-subtitle2 text-grey-8 row no-wrap items-center">
										<b>Tanggal Perolehan</b>
										<span class="text-weight-medium q-ml-sm">: {{ UMUM.tglConvert(data.tgl_perolehan) }}</span>
									</div>

									<div class="text-subtitle2 text-grey-8 row no-wrap items-center">
										<b>Luas</b>
										<span class="text-weight-medium q-ml-sm">: {{ data.luas }}</span>
									</div>

									<div class="text-subtitle2 text-grey-8 row no-wrap items-center">
										<b>Harga</b>
										<span class="text-weight-medium q-ml-sm">: Rp. {{ data.harga }}</span>
									</div>

									<div class="text-subtitle2 text-grey-8 row no-wrap items-center">
										<b>Penggunaan</b>
										<span class="text-weight-medium q-ml-sm">: {{ data.penggunaan }}</span>
									</div>
								</div>
							</q-card-section>
						</q-card>
					</div>
				</div>
				<hr class="hrpagin">
                <br>
				<div class="flex flex-center">
                    <q-pagination
                        @click="getView()"
                        v-model="page_first"
                        :max="page_last"
                        :max-pages="4"
                        color="orange-14"
                        :direction-links="true"
                        :boundary-links="true"
                        icon-first="skip_previous"
                        icon-last="skip_next"
                        icon-prev="fast_rewind"
                        icon-next="fast_forward">
                    </q-pagination>
                </div>
                <br>
			</q-card-section> -->

            <q-card-section>
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
                                <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
                            </div>

                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Jangka Waktu</span>
                                <q-input v-model="form.jangka_waktu" outlined square dense type="number" class="bg-white" />
                            </div>

                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Nilai</span>
                                <q-input v-model="form.nilai" outlined square dense type="number" class="bg-white" />
                            </div>

                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Jenis Posting</span>
                                <select v-model="jns_posting" class="bg-white margin_btn">
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
                                <q-input v-model="form.atas_nama" outlined square dense class="bg-white" />
                            </div>

                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">Pimpinan</span>
                                <q-input v-model="form.pimpinan" outlined square dense class="bg-white" />
                            </div>

                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">No. Rekening</span>
                                <q-input v-model="form.no_rekening" outlined square dense class="bg-white" />
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

                <q-card-section class="q-pt-none">
                    <br>
                    <span class="h_lable ">Jenis Kategori Izin</span>
                    <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" />

                    <span class="h_lable ">Keterangan</span>
                    <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn"
                        type="textarea" />

                </q-card-section>

                <q-card-actions class="bg-grey-4 mdl-footer" align="right">

                    <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" />
                    <q-btn label="Batal" color="negative" v-close-popup />

                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- ================================================= MODAL EDIT ================================================ -->

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
								<q-item-section class="col-4 text-weight-medium"><b>No. SPK/Perjanjian/Kontrak</b></q-item-section>
								<q-item-section>{{ form.no_spk }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-4 text-weight-medium"><b>Tgl SPK/Perjanjian/Kontrak</b></q-item-section>
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
								<q-item-section>{{ form.jns_posting }}</q-item-section>
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
								<q-item-section>{{ form.atas_nama }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-4 text-weight-medium"><b>Pimpinan</b></q-item-section>
								<q-item-section>{{ form.pimpinan }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-4 text-weight-medium"><b>No. Rekening</b></q-item-section>
								<q-item-section>{{ form.no_rekening }}</q-item-section>
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
                <div v-if="modal_komponen_jenis == 'RINCIAN'">
                    <!-- <kompRincian :biodata_id="form.id" /> -->
                    <kompRincian />
                </div>
                <div v-if="modal_komponen_jenis == 'BAST'">
                    <kompBast />
                </div>
                <div v-if="modal_komponen_jenis == 'SP2D'">
                    <kompSp2d />
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

            form: {
                id: '',
                uraian: '',
                keterangan: '',
            },

            options: [
                {
                    group: 'Group 1',
                    disable: true
                },
                {
                    label: 'Google',
                    value: 'Google',
                    description: 'Search engine',
                    icon: 'mail'
                },
                {
                    label: 'Facebook',
                    value: 'Facebook',
                    description: 'Social media',
                    icon: 'bluetooth'
                },
                {
                    label: 'Twitter',
                    value: 'Twitter',
                    description: 'Quick updates',
                    icon: 'map'
                },
                {
                    group: 'Group 2',
                    disable: true
                },
                {
                    label: 'Apple',
                    value: 'Apple',
                    description: 'iStuff',
                    icon: 'golf_course'
                },
                {
                    label: 'Oracle',
                    value: 'Oracle',
                    description: 'Databases',
                    icon: 'casino'
                }
            ],

            dataDummy : [
                {
                    no_spk: "01/SPK-NA/2024",
                    tgl_spk: "2024-02-10",
                    keterangan: "Kajian naskah akademik Raperda Pajak Daerah",
                    jangka_waktu: 90,
                    nilai: 150000000,
                    jns_posting: "Aset Baru",

                    nama: "CV Cakra Konsultan",
                    npwp: "12.345.678.9-012.000",
                    bentuk: "CV",
                    bank: "Bank Sultra",
                    alamat: "Kendari",
                    atas_nama: "CV Cakra Konsultan",
                    pimpinan: "Andi Saputra",
                    no_rekening: "1234567890"
                },
                {
                    no_spk: "02/SPK-NA/2024",
                    tgl_spk: "2024-03-01",
                    keterangan: "Kajian naskah akademik Raperda RTRW",
                    uraian_aset: "Naskah Akademik Raperda RTRW",
                    jangka_waktu: 120,
                    nilai: 200000000,
                    jns_posting: "Aset Baru",

                    nama: "PT Bina Tata Ruang",
                    npwp: "23.456.789.0-123.000",
                    bentuk: "PT",
                    bank: "Bank BRI",
                    alamat: "Makassar",
                    atas_nama: "PT Bina Tata Ruang",
                    pimpinan: "Ir. Muhammad Arif",
                    no_rekening: "2345678901"
                },
                {
                    no_spk: "03/SPK-NA/2024",
                    tgl_spk: "2024-03-20",
                    keterangan: "Kajian akademik Raperda Perlindungan UMKM",
                    uraian_aset: "Naskah Akademik Raperda UMKM",
                    jangka_waktu: 75,
                    nilai: 125000000,
                    jns_posting: "Aset Baru",

                    nama: "CV Mitra Legal",
                    npwp: "34.567.890.1-234.000",
                    bentuk: "CV",
                    bank: "Bank Mandiri",
                    alamat: "Jakarta",
                    atas_nama: "CV Mitra Legal",
                    pimpinan: "Siti Rahmawati",
                    no_rekening: "3456789012"
                },
                {
                    no_spk: "04/SPK-NA/2024",
                    tgl_spk: "2024-04-05",
                    keterangan: "Kajian akademik Raperda Lingkungan Hidup",
                    uraian_aset: "Naskah Akademik Raperda LH",
                    jangka_waktu: 100,
                    nilai: 175000000,
                    jns_posting: "Aset Baru",

                    nama: "PT Green Consultant",
                    npwp: "45.678.901.2-345.000",
                    bentuk: "PT",
                    bank: "Bank BNI",
                    alamat: "Surabaya",
                    atas_nama: "PT Green Consultant",
                    pimpinan: "Dr. Ahmad Yusuf",
                    no_rekening: "4567890123"
                },
                {
                    no_spk: "05/SPK-NA/2024",
                    tgl_spk: "2024-04-18",
                    keterangan: "Kajian akademik Raperda Sistem Pemerintahan Daerah",
                    uraian_aset: "Naskah Akademik Raperda Pemda",
                    jangka_waktu: 110,
                    nilai: 185000000,
                    jns_posting: "Kapitalisasi",

                    nama: "CV Nusantara Policy",
                    npwp: "56.789.012.3-456.000",
                    bentuk: "CV",
                    bank: "Bank BTN",
                    alamat: "Yogyakarta",
                    atas_nama: "CV Nusantara Policy",
                    pimpinan: "Budi Santoso",
                    no_rekening: "5678901234"
                },
                {
                    no_spk: "06/SPK-NA/2024",
                    tgl_spk: "2024-05-02",
                    keterangan: "Kajian akademik Raperda Ketertiban Umum",
                    uraian_aset: "Naskah Akademik Raperda Tibum",
                    jangka_waktu: 80,
                    nilai: 140000000,
                    jns_posting: "Kapitalisasi",

                    nama: "PT Legal Insight",
                    npwp: "67.890.123.4-567.000",
                    bentuk: "PT",
                    bank: "Bank Syariah Indonesia",
                    alamat: "Bandung",
                    atas_nama: "PT Legal Insight",
                    pimpinan: "Rina Kurniasih",
                    no_rekening: "6789012345"
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
            mdl_edit: false,
            mdl_hapus: false,
            mdl_detil: false,
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
            this.form.uraian = data.uraian;
            this.form.keterangan = data.keterangan;

            this.form.no_spk = data.no_spk;
            this.form.tgl_spk = data.tgl_spk;
            this.form.keterangan = data.keterangan;
            this.form.jangka_waktu = data.jangka_waktu;
            this.form.nilai = data.nilai;
            this.form.jns_posting = data.jns_posting;
            this.form.nama = data.nama;
            this.form.npwp = data.npwp;
            this.form.bentuk = data.bentuk;
            this.form.bank = data.bank;
            this.form.alamat = data.alamat;
            this.form.atas_nama = data.atas_nama;
            this.form.pimpinan = data.pimpinan;
            this.form.no_rekening = data.no_rekening;
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
        FETCHING.getContohAtocomplete('')
    },
}
</script>