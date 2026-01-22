<template>
    <div class="about" style="padding:15px">
        <q-card bordered class="my-card">
            <q-card-section class="bg-blue-3 text-white">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="text-h6 h_titleHead">Gedung & Bangunan</div>
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
										<b>Tanggal Perolehan</b>
										<span class="text-weight-medium q-ml-sm">: {{ UMUM.tglConvert(data.tgl_perolehan) }}</span>
									</div>

									<div class="text-subtitle2 text-grey-8 row no-wrap items-center">
										<b>Merk/Tipe</b>
										<span class="text-weight-medium q-ml-sm">: {{ data.merk }} - {{ data.type }}</span>
									</div>

									<div class="text-subtitle2 text-grey-8 row no-wrap items-center">
										<b>Harga</b>
										<span class="text-weight-medium q-ml-sm">: Rp. {{ data.harga }}</span>
									</div>

									<div class="text-subtitle2 text-grey-8 row no-wrap items-center">
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
                            <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable ">Luas Lantai (M2)</span>
                                <q-input v-model="form.luas_lantai" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable ">Alamat</span>
                                <q-input v-model="form.alamat" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable ">Kondisi Bangunan</span>
                                <select v-model="form.kondisi" class="bg-white margin_btn">
                                    <option value="">-- Pilih Kondisi --</option>
                                    <option value="0">Baik</option>
                                    <option value="1">Tidak</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Bertingkat</span>
                                <select v-model="form.bertingkat" class="bg-white margin_btn">
                                    <option value="">-- Pilih Kondisi --</option>
                                    <option value="0">Bertingkat</option>
                                    <option value="1">Tidak</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Beton/Tidak</span>
                                <select v-model="form.beton" class="bg-white margin_btn">
                                    <option value="">-- Pilih Kondisi --</option>
                                    <option value="0">Beton</option>
                                    <option value="1">Tidak</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Tanggal Dokumen</span>
                                <q-input v-model="form.tgl_dokumen" outlined square :dense="true" class="bg-white margin_btn" type="date" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">No. Dokumen</span>
                                <q-input v-model="form.no_dokumen" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari frame_cari">
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
								<q-item-section class="col-3 text-weight-medium"><b>Luas Lantai</b></q-item-section>
								<q-item-section>{{ form.luas_lantai }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Alamat</b></q-item-section>
								<q-item-section>{{ form.alamat }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Kondisi Bangunan</b></q-item-section>
								<q-item-section>{{ form.kondisi }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Bertingkat</b></q-item-section>
								<q-item-section>{{ form.bertingkat }}</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="col-3 text-weight-medium"><b>Beton/Tidak</b></q-item-section>
								<q-item-section>{{ form.beton }}</q-item-section>
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
                    kode_aset: "03.01.01.001",
                    tgl_pembelian: "2018-03-15",
                    tgl_pembukuan: "2018-03-20",
                    luas_lantai: 450,
                    uraian_aset: "Gedung kantor OPD bertingkat untuk pelayanan publik.",
                    alamat: "Jl. Poros Andoolo, Kel. Andoolo, Konawe Selatan",
                    kondisi: "0", // Baik
                    bertingkat: "0", // Bertingkat
                    beton: "0", // Beton
                    tgl_dokumen: "2018-03-10",
                    no_dokumen: "IMB-001/2018",
                    asal_usul: "PEMBELIAN",
                    harga: 2500000000,
                    nilai_sisa: 500000000,
                    masa_manfaat: 240,
                    keterangan: "Gedung Kantor Dinas Kominfo",
                    status: "Hak Pakai",
                    file: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_5Ojb5juDDHBlq4Kcr-DEhhaCsaWfcECnrA&s'
                },
                {
                    kd_pemilik: "12.01.01",
                    kode_aset: "03.01.01.002",
                    tgl_pembelian: "2019-06-10",
                    tgl_pembukuan: "2019-06-15",
                    luas_lantai: 300,
                    uraian_aset: "Gedung aula serbaguna untuk kegiatan dan pertemuan.",
                    alamat: "Jl. Pendidikan No. 5, Andoolo",
                    kondisi: "0",
                    bertingkat: "1",
                    beton: "0",
                    tgl_dokumen: "2019-06-01",
                    no_dokumen: "IMB-014/2019",
                    asal_usul: "HIBAH",
                    harga: 1800000000,
                    nilai_sisa: 300000000,
                    masa_manfaat: 240,
                    keterangan: "Gedung Aula Serbaguna",
                    status: "Hak Pakai",
                    file: 'https://kmsgroups.com/wp-content/uploads/2020/02/a.jpg'
                },
                {
                    kd_pemilik: "12.01.02",
                    kode_aset: "03.01.01.003",
                    tgl_pembelian: "2020-02-20",
                    tgl_pembukuan: "2020-02-25",
                    luas_lantai: 120,
                    uraian_aset: "Bangunan Posyandu untuk layanan kesehatan masyarakat.",
                    alamat: "Desa Wawatu, Kec. Moramo",
                    kondisi: "0",
                    bertingkat: "1",
                    beton: "1",
                    tgl_dokumen: "2020-02-10",
                    no_dokumen: "BAST-022/2020",
                    asal_usul: "BANTUAN_PROV",
                    harga: 750000000,
                    nilai_sisa: 150000000,
                    masa_manfaat: 180,
                    keterangan: "Gedung Posyandu",
                    status: "Hak Pakai",
                    file: 'https://pengulon-buleleng.desa.id/assets/files/artikel/sedang_1657685569AA.jpeg'
                },
                {
                    kd_pemilik: "12.01.03",
                    kode_aset: "03.01.01.004",
                    tgl_pembelian: "2017-08-12",
                    tgl_pembukuan: "2017-08-18",
                    luas_lantai: 90,
                    uraian_aset: "Gudang arsip lama dengan kondisi kurang baik.",
                    alamat: "Desa Lameuru, Kec. Ranomeeto",
                    kondisi: "1", // Tidak Baik
                    bertingkat: "1",
                    beton: "1",
                    tgl_dokumen: "2017-08-01",
                    no_dokumen: "IMB-087/2017",
                    asal_usul: "PEMBELIAN",
                    harga: 450000000,
                    nilai_sisa: 50000000,
                    masa_manfaat: 180,
                    keterangan: "Gudang Arsip Lama",
                    status: "Hak Pakai",
                    file: 'https://lingkarsultra.com/wp-content/uploads/2023/02/Reses-Dapil-3-Nadira.jpeg'
                },
                {
                    kd_pemilik: "12.01.04",
                    kode_aset: "03.01.01.005",
                    tgl_pembelian: "2021-01-05",
                    tgl_pembukuan: "2021-01-10",
                    luas_lantai: 600,
                    uraian_aset: "Gedung Puskesmas untuk pelayanan kesehatan.",
                    alamat: "Jl. Trans Sulawesi, Tinanggea",
                    kondisi: "0",
                    bertingkat: "0",
                    beton: "0",
                    tgl_dokumen: "2020-12-20",
                    no_dokumen: "IMB-002/2021",
                    asal_usul: "BANTUAN_PUSAT",
                    harga: 4200000000,
                    nilai_sisa: 800000000,
                    masa_manfaat: 300,
                    keterangan: "Gedung Puskesmas",
                    status: "Hak Pakai",
                    file: 'https://jatengprov.go.id/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-28-at-14.50.21.jpeg'
                },
                {
                    kd_pemilik: "12.01.05",
                    kode_aset: "03.01.01.006",
                    tgl_pembelian: "2016-05-11",
                    tgl_pembukuan: "2016-05-15",
                    luas_lantai: 200,
                    uraian_aset: "Gudang arsip lama dengan kondisi kurang baik.",
                    alamat: "Desa Lalembuu, Konawe Selatan",
                    kondisi: "0",
                    bertingkat: "1",
                    beton: "0",
                    tgl_dokumen: "2016-05-01",
                    no_dokumen: "BAST-016/2016",
                    asal_usul: "HIBAH",
                    harga: 900000000,
                    nilai_sisa: 120000000,
                    masa_manfaat: 240,
                    keterangan: "Gedung Balai Desa",
                    status: "Hak Pakai",
                    file: 'https://lingkarsultra.com/wp-content/uploads/2023/03/Reses-Dapil-I-Taufiq.jpeg'
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
            this.form.kode_aset = data.kode_aset;
            this.form.tgl_pembelian = data.tgl_pembelian;
            this.form.tgl_pembukuan = data.tgl_pembukuan;
            this.form.luas_lantai = data.luas_lantai;
            this.form.alamat = data.alamat;
            this.form.kondisi = data.kondisi;
            this.form.bertingkat = data.bertingkat;
            this.form.beton = data.beton;
            this.form.tgl_dokumen = data.tgl_dokumen;
            this.form.no_dokumen = data.no_dokumen;
            this.form.asal_usul = data.asal_usul;
            this.form.harga = data.harga;
            this.form.nilai_sisa = data.nilai_sisa;
            this.form.masa_manfaat = data.masa_manfaat;
            this.form.keterangan = data.keterangan;
            this.form.status = data.status;
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