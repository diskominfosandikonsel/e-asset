<template>
    <div class="about" style="padding:15px">
        <q-card bordered class="my-card">
            <q-card-section class="bg-blue-3 text-white">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="text-h6 h_titleHead">Jalan, Irigasi & Jaringan</div>
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
					<div class="col-12 col-sm-6 col-md-4" v-for="data in listData" :key="data.id">
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
                                            {{ data.uraian_aset }}
                                        </div>
                                    </a>
								</div>
							</q-card-section>

							<q-card-section class="q-pt-none q-pb-md">
								<div class="column q-gutter-y-xs">
									<div class="text-subtitle2 text-grey-8 row no-wrap items-center">
										<b>Tanggal Pembelian</b>
										<span class="text-weight-medium q-ml-sm">: {{ UMUM.tglConvert(data.tgl_pembelian) }}</span>
									</div>

									<div class="text-subtitle2 text-grey-8 row no-wrap items-center">
										<b>Kode Aset</b>
										<span class="text-weight-medium q-ml-sm">: {{ data.kode_aset }}</span>
									</div>

									<div class="text-subtitle2 text-grey-8 row no-wrap items-center">
										<b>Harga</b>
										<span class="text-weight-medium q-ml-sm">: Rp. {{ data.harga }}</span>
									</div>

									<div class="text-subtitle2 text-grey-8 row no-wrap items-start">
										<b>Keterangan</b>
										<span class="text-weight-medium q-ml-sm">: {{ data.keterangan }}</span>
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
                                <q-input v-model="form.kode_aset" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Tanggal Pembelian</span>
                                <q-input v-model="form.tgl_pembelian" outlined square :dense="true" type="date" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Tanggal Pembukuan</span>
                                <q-input v-model="form.tgl_pembukuan" outlined square :dense="true" type="date" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Konstruksi</span>
                                <q-input v-model="form.konstruksi" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Panjang (KM)</span>
                                <q-input v-model="form.panjang" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Lebar (M)</span>
                                <q-input v-model="form.lebar" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Luas (M2)</span>
                                <q-input v-model="form.luas" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable ">Alamat</span>
                                <q-input v-model="form.alamat" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Tanggal Dokumen</span>
                                <q-input v-model="form.tgl_dokumen" outlined square :dense="true" type="date" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Nomor Dokumen</span>
                                <q-input v-model="form.no_dokumen" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Asal Usul</span>
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
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Kondisi</span>
                                <select v-model="form.kondisi" class="bg-white margin_btn">
                                    <option value="">-- Pilih Asal Usul --</option>
                                    <option value="BAIK">BAIK</option>
                                    <option value="RUSAK">RUSAK</option>
                                    <option value="RUSAK BERAT">RUSAK BERAT</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Harga</span>
                                <q-input v-model="form.harga" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable ">Nilai Sisa</span>
                                <q-input v-model="form.nilai_sisa" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable ">Masa Manfaat (bulan)</span>
                                <q-input v-model="form.masa_manfaat" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Keterangan</span>
                                <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Status Tanah</span>
                                <q-input v-model="form.status" outlined square :dense="true" class="bg-white margin_btn" />
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
								<q-item-section class="col-3 text-weight-medium"><b>Kode Aset</b></q-item-section>
								<q-item-section>{{ form.kode_aset }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Tanggal Pembelian</b></q-item-section>
								<q-item-section>{{ UMUM.tglConvert(form.tgl_pembelian) }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Tanggal Pembukuan</b></q-item-section>
								<q-item-section>{{ UMUM.tglConvert(form.tgl_pembukuan) }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Konstruksi</b></q-item-section>
								<q-item-section>{{ form.konstruksi }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Panjang (KM)</b></q-item-section>
								<q-item-section>{{ form.panjang }} KM</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Lebar (M)</b></q-item-section>
								<q-item-section>{{ form.lebar }} M</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Luas (M)</b></q-item-section>
								<q-item-section>{{ form.luas }} M2</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Alamat</b></q-item-section>
								<q-item-section>{{ form.alamat }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Tanggal Dokumen</b></q-item-section>
								<q-item-section>{{ form.tgl_dokumen }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Nomor Dokumen</b></q-item-section>
								<q-item-section>{{ form.no_dokumen }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Asal Usul</b></q-item-section>
								<q-item-section>{{ form.asal_usul }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Harga</b></q-item-section>
								<q-item-section>Rp. {{ form.harga }}</q-item-section>
							</q-item>
                            <q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Nilai Sisa</b></q-item-section>
								<q-item-section>{{ form.nilai_sisa }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Masa Manfaat</b></q-item-section>
								<q-item-section>{{ form.masa_manfaat }} Tahun</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Keterangan</b></q-item-section>
								<q-item-section>{{ form.keterangan }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Status Tanah</b></q-item-section>
								<q-item-section>{{ form.status }}</q-item-section>
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
                kd_pemilik: '',
                kode_aset: '',
            },

            listData : [
                {
                    kd_pemilik: "12.01.01",
                    kode_aset: "04.01.01.001",
                    uraian_aset: "Jalan aspal penghubung Andoolo–Tinanggea",
                    tgl_pembelian: "2019-04-12",
                    tgl_pembukuan: "2019-04-15",
                    konstruksi: "Aspal",
                    panjang: 2.5,
                    lebar: 6,
                    luas: 15000,
                    alamat: "Jl. Poros Andoolo – Tinanggea, Konawe Selatan",
                    tgl_dokumen: "2019-04-01",
                    no_dokumen: "BAST-019/2019",
                    asal_usul: "PEMBELIAN",
                    kondisi: "BAIK",
                    harga: 3500000000,
                    nilai_sisa: 500000000,
                    masa_manfaat: 240,
                    keterangan: "Jalan aspal penghubung antar kecamatan",
                    status: "Hak Pakai",
                    file: 'https://telisik.id/assets/img/news/2024/08/warga_keluhkan_jalan_poros_motaha-konawe_selatan_rusak_berat_sejak_2019.jpg'
                },
                {
                    kd_pemilik: "12.01.02",
                    kode_aset: "04.01.01.002",
                    uraian_aset: "Jalan beton lingkungan Desa Wawatu",
                    tgl_pembelian: "2020-08-20",
                    tgl_pembukuan: "2020-08-25",
                    konstruksi: "Beton",
                    panjang: 1.2,
                    lebar: 5,
                    luas: 6000,
                    alamat: "Desa Wawatu, Kec. Moramo, Konawe Selatan",
                    tgl_dokumen: "2020-08-10",
                    no_dokumen: "BAST-022/2020",
                    asal_usul: "BANTUAN_PROV",
                    kondisi: "BAIK",
                    harga: 1800000000,
                    nilai_sisa: 300000000,
                    masa_manfaat: 180,
                    keterangan: "Jalan beton lingkungan desa",
                    status: "Hak Pakai",
                    file: 'https://sultrasatu.com/wp-content/uploads/2024/03/IMG-20240331-WA0016.jpg'
                },
                {
                    kd_pemilik: "12.01.03",
                    kode_aset: "04.01.01.003",
                    uraian_aset: "Jalan desa sirtu Lameuru–Ranomeeto",
                    tgl_pembelian: "2017-06-05",
                    tgl_pembukuan: "2017-06-10",
                    konstruksi: "Sirtu",
                    panjang: 3.8,
                    lebar: 4,
                    luas: 15200,
                    alamat: "Desa Lameuru – Ranomeeto",
                    tgl_dokumen: "2017-05-25",
                    no_dokumen: "IMB-011/2017",
                    asal_usul: "HIBAH",
                    kondisi: "RUSAK",
                    harga: 950000000,
                    nilai_sisa: 100000000,
                    masa_manfaat: 120,
                    keterangan: "Jalan desa berbahan sirtu",
                    status: "Hak Pakai",
                    file: 'https://www.wartasuluh.com/uploads/images/2024/02/image_750x_65dd9d2ece883.jpg'
                },
                {
                    kd_pemilik: "12.01.04",
                    kode_aset: "04.01.01.004",
                    uraian_aset: "Akses beton fasilitas kesehatan Tinanggea",
                    tgl_pembelian: "2021-03-18",
                    tgl_pembukuan: "2021-03-20",
                    konstruksi: "Beton",
                    panjang: 0.8,
                    lebar: 7,
                    luas: 5600,
                    alamat: "Jl. Trans Sulawesi, Tinanggea",
                    tgl_dokumen: "2021-03-05",
                    no_dokumen: "BAST-007/2021",
                    asal_usul: "BANTUAN_PUSAT",
                    kondisi: "BAIK",
                    harga: 2200000000,
                    nilai_sisa: 400000000,
                    masa_manfaat: 240,
                    keterangan: "Jalan akses menuju fasilitas kesehatan",
                    status: "Hak Pakai",
                    file: 'https://cdn.digitaldesa.com/uploads/profil/74.02.28.2010/berita/thumbs/0e42378908d0e9f15c14e0d0e30e7e67.png'
                },
                {
                    kd_pemilik: "12.01.05",
                    kode_aset: "04.01.01.005",
                    uraian_aset: "Jalan aspal lingkungan Desa Lalembuu",
                    tgl_pembelian: "2018-10-10",
                    tgl_pembukuan: "2018-10-15",
                    konstruksi: "Aspal",
                    panjang: 1.6,
                    lebar: 5,
                    luas: 8000,
                    alamat: "Desa Lalembuu, Konawe Selatan",
                    tgl_dokumen: "2018-09-30",
                    no_dokumen: "BAST-028/2018",
                    asal_usul: "PEMBELIAN",
                    kondisi: "RUSAK",
                    harga: 1400000000,
                    nilai_sisa: 200000000,
                    masa_manfaat: 180,
                    keterangan: "Jalan lingkungan permukiman",
                    status: "Hak Pakai",
                    file: 'https://cdn.antaranews.com/cache/1200x800/2019/01/Bendungan-Irigasi-Jebol-100119-NR-4.jpg.webp'
                },
                {
                    kd_pemilik: "12.01.06",
                    kode_aset: "04.01.01.006",
                    uraian_aset: "Akses beton kantor pemerintahan Andoolo",
                    tgl_pembelian: "2022-07-01",
                    tgl_pembukuan: "2022-07-05",
                    konstruksi: "Beton",
                    panjang: 0.5,
                    lebar: 6,
                    luas: 3000,
                    alamat: "Kel. Andoolo, Konawe Selatan",
                    tgl_dokumen: "2022-06-20",
                    no_dokumen: "BAST-004/2022",
                    asal_usul: "BANTUAN_KAB",
                    kondisi: "BAIK",
                    harga: 900000000,
                    nilai_sisa: 150000000,
                    masa_manfaat: 180,
                    keterangan: "Jalan akses kantor pemerintahan",
                    status: "Hak Pakai",
                    file: 'https://muarasultra.com/wp-content/uploads/2025/07/IMG_20250705_154911-e1751701791773-1280x720.jpg'
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
            this.form.kd_pemilik = data.kd_pemilik;
            this.form.kode_aset = data.kode_aset;
            this.form.tgl_pembelian = data.tgl_pembelian;
            this.form.tgl_pembukuan = data.tgl_pembukuan;
            this.form.uraian_aset = data.uraian_aset;
            this.form.konstruksi = data.konstruksi;
            this.form.panjang = data.panjang;
            this.form.lebar = data.lebar;
            this.form.luas = data.luas;
            this.form.alamat = data.alamat;
            this.form.tgl_dokumen = data.tgl_dokumen;
            this.form.no_dokumen = data.no_dokumen;
            this.form.asal_usul = data.asal_usul;
            this.form.kondisi = data.kondisi;
            this.form.harga = data.harga;
            this.form.nilai_sisa = data.nilai_sisa;
            this.form.masa_manfaat = data.masa_manfaat;
            this.form.keterangan = data.keterangan;
            this.form.file = data.file;
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