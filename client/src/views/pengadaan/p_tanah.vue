<template>
    <div class="about" style="padding:15px">
        <q-card bordered class="my-card">
            <q-card-section class="bg-blue-3 text-white">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="text-h6 h_titleHead">Tanah</div>
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

            <q-card-section>
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

							<!-- <q-card-actions align="between">
								<div class="text-caption text-grey"></div>
								<div>
									<q-btn flat round icon="visibility" color="primary" size="sm" @click="mdl_detil = true, selectData(data)">
										<q-tooltip>Lihat Detail</q-tooltip>
									</q-btn>
									<q-btn flat round icon="edit" color="orange" size="sm" @click="mdl_edit = true, selectData(data)">
										<q-tooltip>Ubah Lapak</q-tooltip>
									</q-btn>
									<q-btn flat round icon="delete" color="negative" size="sm" @click="mdl_hapus = true, selectData(data)">
										<q-tooltip>Hapus Data</q-tooltip>
									</q-btn>
								</div>
							</q-card-actions> -->
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
			</q-card-section>
        </q-card>

        <!-- =================================================== MODAL =========================================================== -->


        <!-- ================================================= MODAL TAMBAH ================================================ -->
        <q-dialog v-model="mdl_add" persistent>
            <q-card class="mdl-md">
                <q-card-section class="bg-primary">
                    <div class="text-h6 h_modalhead">Simpan Data</div>
                </q-card-section>

                <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <div class="row">
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Kode Pemilik</span>
                                <q-input v-model="form.kd_pemilik" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Kode Aset</span>
                                <q-input v-model="form.kd_aset" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Tanggal Pembelian</span>
                                <q-input v-model="form.uraian" outlined square :dense="true" type="date" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Tanggal Pembukuan</span>
                                <q-input v-model="form.uraian" outlined square :dense="true" type="date" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Luas (M2)</span>
                                <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="number"/>
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Alamat</span>
                                <q-input v-model="form.alamat" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Hak Tanah</span>
                                <select v-model="hak_tanah" class="bg-white margin_btn">
                                    <option value="">-- Pilih Hak Tanah --</option>
                                    <option value="HM">Hak Milik</option>
                                    <option value="HP">Hak Pakai</option>
                                    <option value="HGB">Hak Guna Bangunan (HGB)</option>
                                    <option value="HGU">Hak Guna Usaha (HGU)</option>
                                    <option value="HPL">Hak Pengelolaan</option>
                                    <option value="TN">Tanah Negara</option>
                                    <option value="TA">Tanah Adat</option>
                                    <option value="BS">Belum Bersertifikat</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Nomor Sertifikat</span>
                                <q-input v-model="form.no_sertifikat" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Tanggal Sertifikat</span>
                                <q-input v-model="form.tgl_sertifikat" outlined square :dense="true" type="date" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable">Asal Usul</span>
                                <select v-model="form.asal_usul" class="bg-white margin_btn">
                                    <option value="">-- Pilih Asal Usul --</option>
                                    <option value="PEMBELIAN">Pembelian</option>
                                    <option value="HIBAH">Hibah</option>
                                    <option value="BANTUAN_PUSAT">Bantuan Pemerintah Pusat</option>
                                    <option value="BANTUAN_PROV">Bantuan Pemerintah Provinsi</option>
                                    <option value="BANTUAN_KAB">Bantuan Pemerintah Kabupaten/Kota</option>
                                    <option value="TUKAR_MENUKAR">Tukar Menukar</option>
                                    <option value="PUTUSAN_PENGADILAN">Putusan Pengadilan</option>
                                    <option value="PENYERTAAN_MODAL">Penyertaan Modal Pemerintah Daerah</option>
                                    <option value="RAMPASAN">Rampasan</option>
                                    <option value="SITAAN">Hasil Sitaan</option>
                                    <option value="LAINNYA">Lainnya</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Penggunaan</span>
                                <q-input v-model="form.penggunaan" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Harga</span>
                                <q-input v-model="form.harga" outlined square :dense="true" type="number" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Keterangan</span>
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

        <!-- ================================================ MODAL HAPUS ================================================ -->
        <q-dialog v-model="mdl_detil" persistent>
			<q-card class="mdl-md">
				<!-- Header -->
				<q-card-section class="bg-blue-3 text-white flex items-center">
					<div class="text-h6">Detil Aset</div>
				</q-card-section>

				<q-separator />

				<!-- Body -->
				<q-card-section class="q-gutter-md">

					<!-- Lampiran File -->
					<div>
                        <q-img
                            :src="form.file"
                            spinner-color="primary"
                            style="max-height: 400px;
                            border: 1px solid #ddd;
                            border-radius: 6px;"
                        />
					</div>

					<div>
						<div class="text-subtitle1 text-bold q-mb-sm">Informasi Aset</div>
						<q-list dense bordered separator class="rounded-borders">
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Kode Pemilik</b></q-item-section>
								<q-item-section>{{ form.kode_pemilik }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Kode Aset</b></q-item-section>
								<q-item-section>{{ form.kode_aset }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Tanggal Perolehan</b></q-item-section>
								<q-item-section>{{ UMUM.tglConvert(form.tgl_perolehan) }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Ukuran / Luas Tanah</b></q-item-section>
								<q-item-section>{{ form.luas }} m2</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Alamat</b></q-item-section>
								<q-item-section>{{ form.alamat }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Nomor Sertifikat</b></q-item-section>
								<q-item-section>{{ form.no_sertifikat }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Tanggal Sertifikat</b></q-item-section>
								<q-item-section>{{ UMUM.tglConvert(form.tgl_sertifikat) }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Asal Usul</b></q-item-section>
								<q-item-section>{{ form.asal_usul }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Penggunaan</b></q-item-section>
								<q-item-section>{{ form.penggunaan }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Harga</b></q-item-section>
								<q-item-section>Rp. {{ form.harga }}</q-item-section>
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
        <!-- ================================================ MODAL HAPUS ================================================ -->




        <!-- =================================================== MODAL =========================================================== -->




    </div>
</template>


<script>


import FETCHING from '../../library/fetching'
import UMUM from '../../library/umum'

export default {
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

            listTanah: [
                {
                    id: 1,
                    kode_pemilik: "12.01.01",
                    kode_aset: "1.3.1.01.001",
                    tgl_perolehan: "2010-06-15",
                    tgl_pembukuan: "2010-06-20",
                    luas: 2500,
                    alamat: "Jl. Poros Andoolo, Desa Andoolo, Kec. Andoolo",
                    hak_tanah: "HM",
                    no_sertifikat: "HM No.123/Andoolo",
                    tgl_sertifikat: "2011-03-10",
                    asal_usul: "PEMBELIAN",
                    penggunaan: "Kantor Dinas C",
                    harga: 750000000,
                    keterangan: "Tanah digunakan sebagai kantor operasional",
                    file: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW6APCCP6Mb4gpy9CDdPKX5fW7sXCwG5M2Dw&s',
                    opd: "Dinas Komunikasi Informatika dan Persandian"
                },
                {
                    id: 2,
                    kode_pemilik: "12.01.01",
                    kode_aset: "1.3.1.01.002",
                    tgl_perolehan: "2012-09-18",
                    tgl_pembukuan: "2012-09-25",
                    luas: 1800,
                    alamat: "Desa Wawonggole, Kec. Palangga",
                    hak_tanah: "HP",
                    no_sertifikat: "HP No.045/Wawonggole",
                    tgl_sertifikat: "2013-01-05",
                    asal_usul: "HIBAH",
                    penggunaan: "Gudang Arsip",
                    harga: 420000000,
                    keterangan: "Tanah hibah dari masyarakat",
                    file: 'https://img.okezone.com/content/2017/01/25/470/1600919/tanah-nganggur-milik-pemerintah-bisa-dimanfaatkan-NSMGO0EA4h.jpg',
                    opd: "Dinas Pekerjaan Umum dan Tata Ruang"
                },
                {
                    id: 3,
                    kode_pemilik: "12.01.01",
                    kode_aset: "1.3.1.01.003",
                    tgl_perolehan: "2015-04-11",
                    tgl_pembukuan: "2015-04-15",
                    luas: 3000,
                    alamat: "Kel. Ranomeeto Barat",
                    hak_tanah: "HM",
                    no_sertifikat: "HM No.331/Ranomeeto",
                    tgl_sertifikat: "2016-02-20",
                    asal_usul: "PEMBELIAN",
                    penggunaan: "Tidak digunakan",
                    harga: 980000000,
                    keterangan: "Tanah belum dimanfaatkan",
                    file: 'https://awsimages.detik.net.id/visual/2023/07/25/ilustrasi-tanah-di-jual-dok-freepik-1_169.jpeg?w=650',
                    opd: "Dinas Pekerjaan Umum dan Tata Ruang"
                },
                {
                    id: 4,
                    kode_pemilik: "12.01.01",
                    kode_aset: "1.3.1.01.004",
                    tgl_perolehan: "2018-08-02",
                    tgl_pembukuan: "2018-08-10",
                    luas: 1500,
                    alamat: "Desa Lalowaru, Kec. Moramo Utara",
                    hak_tanah: "BS",
                    no_sertifikat: "",
                    tgl_sertifikat: "",
                    asal_usul: "BANTUAN_PROV",
                    penggunaan: "Lapangan Parkir",
                    harga: 350000000,
                    keterangan: "Belum bersertifikat",
                    file: 'https://cdn1-production-images-kly.akamaized.net/66pLtr3KKL5DfHgYiaa0FQW70bI=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/5448056/original/043135100_1765977918-Taman_Nasional_Rawa_Aopa_Watumaohai_Konawe_Selatan.jpg',
                    opd: "Dinas Tanaman Pangan Holtikultura dan Perkebunan"
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

            this.form.kode_pemilik = data.kode_pemilik;
            this.form.kode_aset = data.kode_aset;
            this.form.tgl_perolehan = data.tgl_perolehan;
            this.form.tgl_pembukuan = data.tgl_pembukuan;
            this.form.luas = data.luas;
            this.form.alamat = data.alamat;
            this.form.hak_tanah = data.hak_tanah;
            this.form.no_sertifikat = data.no_sertifikat;
            this.form.tgl_sertifikat = data.tgl_sertifikat;
            this.form.asal_usul = data.asal_usul;
            this.form.penggunaan = data.penggunaan;
            this.form.harga = data.harga;
            this.form.keterangan = data.keterangan;
            this.form.file = data.file;
            this.form.opd = data.opd;
        },


        // ====================================== CONTOH eDOC ====================================
        onClickx(data) {
            alert(data)
        },
        // ====================================== CONTOH eDOC ====================================

        // ====================================== CONTOH AUTOCOMPLETE ====================================
        autocomplete_db_filter: function (val, update) {
            update(() => {
                if (val === '') { }
                else { FETCHING.getContohAtocomplete(val) }
            })
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