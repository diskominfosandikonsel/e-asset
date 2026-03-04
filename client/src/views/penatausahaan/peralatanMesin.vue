<template>
    <div class="about" style="padding:15px">
        <q-card bordered class="my-card">
            <q-card-section class="bg-blue-3 text-white">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="text-h6 h_titleHead">Peralatan & Mesin</div>
                        <div class="text-subtitle2">Penatausahaan</div>
                    </div>
                    <div class="col-12 col-md-2"></div>
                    <div class="col-12 col-md-4">
                        <div class="row">
                            <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true"
                                class="bg-white" style="width:90%" />
                            <q-btn glossy class="bg-red-4" @click="mdl_add = true" dense flat icon="add"
                                style="width:10%">
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
                    <div class="col-12 col-sm-6 col-md-4" v-for="data in list_data" :key="data.id">
                        <q-card class="my-card" flat bordered>

                            <q-img :src="data.file" style="width: 100%; height: 200px" fit="cover" ratio="16/9" />

                            <q-card-section class="q-pb-sm">
                                <div class="row no-wrap items-start">
                                    <a class="clear_underline" href="javascript:void(0);"
                                        @click="mdl_detil = true, selectData(data)">
                                        <div class="col text-h6 text-primary q-pr-sm">
                                            {{ data.nama_barang }}
                                        </div>
                                    </a>
                                </div>
                            </q-card-section>

                            <q-card-section class="q-pt-none q-pb-md">
                                <div class="column q-gutter-y-xs">
                                    <div class="text-subtitle2 text-grey-8 row no-wrap items-center">
                                        <b>Tanggal Perolehan</b>
                                        <span class="text-weight-medium q-ml-sm">: {{
                                            UMUM.tglConvert(data.tgl_perolehan) }}</span>
                                    </div>

                                    <div class="text-subtitle2 text-grey-8 row no-wrap items-center">
                                        <b>Merk/Tipe</b>
                                        <span class="text-weight-medium q-ml-sm">: {{ data.merk }} - {{ data.type
                                            }}</span>
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
                <q-card-section class="bg-primary">
                    <div class="text-h6 h_modalhead">Simpan Data</div>
                </q-card-section>

                <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <div class="row">
                            <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable ">Kode Pemilik</span>
                                <q-input v-model="form.kodep" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 frame_cari frame_cari">
                                <span class="h_lable">Kode Aset</span>
                                <div class="grid-7-kolom">
                                    <!-- ASET -->
                                    <q-select
                                        v-model="form.akunId"
                                        :options="$store.state.list_aset"
                                        option-value="kode"
                                        :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                        outlined square
                                        :dense="true"
                                        class="bg-white margin_btn input-aset-kecil aset-kode-select"
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
                                        class="bg-white margin_btn input-aset-kecil aset-kode-select"
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
                                        class="bg-white margin_btn input-aset-kecil aset-kode-select"
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
                                        class="bg-white margin_btn input-aset-kecil aset-kode-select"
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
                                        class="bg-white margin_btn input-aset-kecil aset-kode-select"
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
                                        class="bg-white margin_btn input-aset-kecil aset-kode-select"
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
                                        class="bg-white margin_btn input-aset-kecil aset-kode-select"
                                        :display-value="form.subSubId"
                                        :label="form.subSubId ? '' : '00'"
                                        emit-value map-options
                                    />
                                </div>
                            </div>
                            <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable ">No. Register</span>
                                <q-input v-model="form.no_register" type="number" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable ">Ruang</span>
                                <q-input v-model="form.ruang" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Tanggal Pembelian</span>
                                <q-input v-model="form.tgl_beli" outlined square :dense="true" type="date" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Tanggal Pembukuan</span>
                                <q-input v-model="form.tgl_buku" outlined square :dense="true" type="date"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Merk</span>
                                <q-input v-model="form.merk" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Type</span>
                                <q-input v-model="form.type" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">No. Pabrik</span>
                                <q-input v-model="form.no_pabrik" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Bahan</span>
                                <q-input v-model="form.bahan" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">No. Rangka</span>
                                <q-input v-model="form.no_rangka" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">No. Mesin</span>
                                <q-input v-model="form.no_mesin" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">No. BPKB</span>
                                <q-input v-model="form.no_bpkb" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">No. Polisi</span>
                                <q-input v-model="form.no_polisi" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable">Asal Usul</span>
                                <q-select
                                    v-model="form.id_asal"
                                    :options="$store.state.list_asal"
                                    option-value="id"
                                    option-label="uraian"
                                    outlined square :dense="true"
                                    class="bg-white margin_btn"
                                    emit-value map-options
                                />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Kondisi</span>
                                <q-select
                                    v-model="form.id_kondisi"
                                    :options="$store.state.list_kondisi"
                                    option-value="id"
                                    option-label="uraian"
                                    outlined square :dense="true"
                                    class="bg-white margin_btn"
                                    emit-value map-options
                                />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Harga</span>
                                <q-input v-model="form.harga" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Masa Manfaat</span>
                                <q-input v-model="form.masa_manfaat" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Nilai Sisa</span>
                                <q-input v-model="form.nilai_sisa" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Keterangan</span>
                                <q-input v-model="form.keterangan" outlined square :dense="true"
                                    class="bg-white margin_btn" type="textarea" />
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
                        <div class="row">
                            <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable ">Kode Pemilik</span>
                                <q-input v-model="form.kodep" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 frame_cari frame_cari">
                                <span class="h_lable">Kode Aset</span>
                                <div class="grid-7-kolom">
                                    <!-- ASET -->
                                    <q-select
                                        v-model="form.akunId"
                                        :options="$store.state.list_aset"
                                        option-value="kode"
                                        :option-label="opt => `${opt.kode} - ${opt.uraian}`"
                                        outlined square
                                        :dense="true"
                                        class="bg-white margin_btn input-aset-kecil aset-kode-select"
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
                                        class="bg-white margin_btn input-aset-kecil aset-kode-select"
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
                                        class="bg-white margin_btn input-aset-kecil aset-kode-select"
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
                                        class="bg-white margin_btn input-aset-kecil aset-kode-select"
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
                                        class="bg-white margin_btn input-aset-kecil aset-kode-select"
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
                                        class="bg-white margin_btn input-aset-kecil aset-kode-select"
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
                                        class="bg-white margin_btn input-aset-kecil aset-kode-select"
                                        :display-value="form.subSubId"
                                        :label="form.subSubId ? '' : '00'"
                                        emit-value map-options
                                    />
                                </div>
                            </div>
                            <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable ">No. Register</span>
                                <q-input v-model="form.no_register" type="number" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable ">Ruang</span>
                                <q-input v-model="form.ruang" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Tanggal Pembelian</span>
                                <q-input v-model="form.tgl_beli" outlined square :dense="true" type="date" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Tanggal Pembukuan</span>
                                <q-input v-model="form.tgl_buku" outlined square :dense="true" type="date"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Merk</span>
                                <q-input v-model="form.merk" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Type</span>
                                <q-input v-model="form.type" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">No. Pabrik</span>
                                <q-input v-model="form.no_pabrik" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Bahan</span>
                                <q-input v-model="form.bahan" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">No. Rangka</span>
                                <q-input v-model="form.no_rangka" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">No. Mesin</span>
                                <q-input v-model="form.no_mesin" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">No. BPKB</span>
                                <q-input v-model="form.no_bpkb" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">No. Polisi</span>
                                <q-input v-model="form.no_polisi" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable">Asal Usul</span>
                                <q-select
                                    v-model="form.id_asal"
                                    :options="$store.state.list_asal"
                                    option-value="id"
                                    option-label="uraian"
                                    outlined square :dense="true"
                                    class="bg-white margin_btn"
                                    emit-value map-options
                                />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Kondisi</span>
                                <select v-model="form.kondisi" class="bg-white margin_btn">
                                    <option value="">-- Pilih Kondisi --</option>
                                    <option value="BAIK">Baik</option>
                                    <option value="RUSAK_RINGAN">Rusak Ringan</option>
                                    <option value="RUSAK_BERAT">Rusak Berat</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Harga</span>
                                <q-input v-model="form.harga" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Masa Manfaat</span>
                                <q-input v-model="form.masa_manfaat" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Nilai Sisa</span>
                                <q-input v-model="form.nilai_sisa" outlined square :dense="true"
                                    class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Keterangan</span>
                                <q-input v-model="form.keterangan" outlined square :dense="true"
                                    class="bg-white margin_btn" type="textarea" />
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

                    <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" />
                    <q-btn label="Batal" color="negative" v-close-popup />

                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- ================================================= MODAL EDIT ================================================ -->

        <!-- ================================================ MODAL DETIL ================================================ -->
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
                        <q-img :src="form.file" spinner-color="primary" style="max-height: 400px;
                            border: 1px solid #ddd;
                            border-radius: 6px;" />
                    </div>

                    <div>
                        <div class="text-subtitle1 text-bold q-mb-sm">Informasi Aset</div>
                        <q-list dense bordered separator class="rounded-borders">
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Ruang</b></q-item-section>
                                <q-item-section>{{ form.ruang }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Kode Aset</b></q-item-section>
                                <q-item-section>{{ form.kode_aset }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Tanggal
                                        Perolehan</b></q-item-section>
                                <q-item-section>{{ UMUM.tglConvert(form.tgl_perolehan) }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Merk/Type</b></q-item-section>
                                <q-item-section>{{ form.merk }}/{{ form.type }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>No. Pabrik</b></q-item-section>
                                <q-item-section>{{ form.no_pabrik }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Bahan</b></q-item-section>
                                <q-item-section>{{ form.bahan }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Nomor Rangka</b></q-item-section>
                                <q-item-section>{{ form.no_rangka }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Nomor Mesin</b></q-item-section>
                                <q-item-section>{{ form.no_mesin }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>No. BPKB</b></q-item-section>
                                <q-item-section>{{ form.no_bpkb }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>No. Polisi</b></q-item-section>
                                <q-item-section>{{ form.no_polisi }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Asal Usul</b></q-item-section>
                                <q-item-section>{{ form.asal_usul }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Kondisi</b></q-item-section>
                                <q-item-section>{{ form.kondisi }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Harga</b></q-item-section>
                                <q-item-section>Rp. {{ form.harga }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Masa Manfaat</b></q-item-section>
                                <q-item-section>{{ form.masa_manfaat }} Tahun</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Nilai Sisa</b></q-item-section>
                                <q-item-section>{{ form.nilai_sisa }}</q-item-section>
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
        <!-- ================================================ MODAL DETIL ================================================ -->




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
                kodep: 12,
                akunId: '',
                kelompokId: '',
                jenisId: '',
                objekId: '',
                rincianId: '',
                subId: '',
                subSubId: '',
                no_register: '',
                ruang: '',
                tgl_beli: '',
                tgl_buku: '',
                merk: '',
                type: '',
                no_pabrik: '',
                no_rangka: '',
                no_mesin: '',
                no_bpkb: '',
                no_polisi: '',
                id_asal: '',
                kondisi: '',
                harga: '',
                masa_manfaat: '',
                nilai_sisa: '',
                keterangan: '',
                file: null,
            },

            listData: [
                {
                    "id": 1,
                    "kode_barang": "1.3.02.02.01",
                    "no_register": "001",
                    "nama_barang": "Kendaraan Dinas Roda Empat",
                    "ruang": "Garasi Kendaraan",
                    "tgl_perolehan": "2015-03-12",
                    "tgl_pembukuan": "2015-03-20",
                    "merk": "Toyota",
                    "type": "Innova",
                    "ukuran_cc": "2000 CC",
                    "no_pabrik": "TP-INV-2015-88921",
                    "bahan": "Besi",
                    "no_rangka": "MHFXW42G5FJ123456",
                    "no_mesin": "2TRFE-987654",
                    "no_bpkb": "L-12345678",
                    "no_polisi": "DT 1234 AB",
                    "asal_usul": "Pembelian APBD",
                    "kondisi": "Baik",
                    "harga": 285000000,
                    "masa_manfaat": 8,
                    "nilai_sisa": null,
                    "keterangan": "Kendaraan operasional dinas",
                    "file": "https://cikalnusantara.com/storage/works/01JEDCBCNPB75DQ7AY17NT0HXK.jpg"
                },
                {
                    "id": 2,
                    "kode_barang": "1.3.02.02.02",
                    "no_register": "002",
                    "nama_barang": "Kendaraan Dinas Roda Dua",
                    "ruang": "Garasi Kendaraan",
                    "tgl_perolehan": "2019-06-15",
                    "tgl_pembukuan": "2019-06-20",
                    "merk": "Honda",
                    "type": "Vario 150",
                    "ukuran_cc": "150 CC",
                    "no_pabrik": "HD-VR-2019-2211",
                    "bahan": "Besi",
                    "no_rangka": "MH1KF1111KK332211",
                    "no_mesin": "KF15E-221133",
                    "no_bpkb": "M-87654321",
                    "no_polisi": "DT 5678 CD",
                    "asal_usul": "Pembelian APBD",
                    "kondisi": "Baik",
                    "harga": 23500000,
                    "masa_manfaat": 5,
                    "nilai_sisa": null,
                    "keterangan": "Motor operasional lapangan",
                    "file": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjPnPL7g8ZuI8zD2_uC82k23dD9DEyBqQV3GxqoYW1SfLXmNxdxuCc8prZQBChdvkWjS_swU7rMMrYvYbus9ZY1XYEmCGNVHjUN20nkyVKVa0HBJFdlO4vlXOcQzj3E5zXkIuu5Zr22HxXijA0vGbD48sWg578Z6_DajYmtjiHfMX6x-vmKA5s99stKCu0X/s3264/20230822_083656.jpg"
                },
                {
                    "id": 3,
                    "kode_barang": "1.3.02.05.01",
                    "no_register": "015",
                    "nama_barang": "Laptop",
                    "ruang": "Ruang Sekretariat",
                    "tgl_perolehan": "2020-08-10",
                    "tgl_pembukuan": "2020-08-15",
                    "merk": "Dell",
                    "type": "Latitude 3410",
                    "ukuran_cc": "-",
                    "no_pabrik": "DL-3410-2020-3321",
                    "bahan": "Plastik & Logam",
                    "no_rangka": "-",
                    "no_mesin": "-",
                    "no_bpkb": "-",
                    "no_polisi": "-",
                    "asal_usul": "Pembelian APBD",
                    "kondisi": "Baik",
                    "harga": 14500000,
                    "masa_manfaat": 4,
                    "nilai_sisa": null,
                    "keterangan": "Laptop administrasi",
                    "file": "https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/img/VqbcmM/2024/5/18/75f1557d-ee2f-4975-a756-0b3251c235c5.jpg~tplv-aphluv4xwc-resize-jpeg:700:0.jpg"
                },
                {
                    "id": 4,
                    "kode_barang": "1.3.02.05.02",
                    "no_register": "016",
                    "nama_barang": "Printer",
                    "ruang": "Ruang TU",
                    "tgl_perolehan": "2021-02-05",
                    "tgl_pembukuan": "2021-02-08",
                    "merk": "Epson",
                    "type": "L3110",
                    "ukuran_cc": "-",
                    "no_pabrik": "EP-L3110-9981",
                    "bahan": "Plastik",
                    "no_rangka": "-",
                    "no_mesin": "-",
                    "no_bpkb": "-",
                    "no_polisi": "-",
                    "asal_usul": "Pembelian APBD",
                    "kondisi": "Baik",
                    "harga": 2800000,
                    "masa_manfaat": 4,
                    "nilai_sisa": null,
                    "keterangan": "Printer dokumen kantor",
                    "file": "https://www.brother.co.id/-/media/ap2/products/printer/hl-t4000dw/hl-t4000dw-r.jpg?rev=56a09e176700426eb894262e2cc9408e"
                },
                {
                    "id": 5,
                    "kode_barang": "1.3.02.05.03",
                    "no_register": "017",
                    "nama_barang": "Scanner",
                    "ruang": "Ruang Arsip",
                    "tgl_perolehan": "2022-01-12",
                    "tgl_pembukuan": "2022-01-15",
                    "merk": "Canon",
                    "type": "DR-C225",
                    "ukuran_cc": "-",
                    "no_pabrik": "CN-DR225-4421",
                    "bahan": "Plastik",
                    "no_rangka": "-",
                    "no_mesin": "-",
                    "no_bpkb": "-",
                    "no_polisi": "-",
                    "asal_usul": "Pembelian APBD",
                    "kondisi": "Baik",
                    "harga": 5200000,
                    "masa_manfaat": 4,
                    "nilai_sisa": null,
                    "keterangan": "Digitalisasi arsip",
                    "file": "https://asset.kompas.com/crops/-aF6g05eRZGUBU642xPPLwqVV7E=/0x0:1000x667/1200x800/data/photo/2023/01/09/63bb9bd89ab79.jpg"
                },
                {
                    "id": 6,
                    "kode_barang": "1.3.02.06.01",
                    "no_register": "018",
                    "nama_barang": "AC Split",
                    "ruang": "Ruang Kepala Dinas",
                    "tgl_perolehan": "2018-09-20",
                    "tgl_pembukuan": "2018-09-25",
                    "merk": "LG",
                    "type": "Dual Cool",
                    "ukuran_cc": "1 PK",
                    "no_pabrik": "LG-AC-9912",
                    "bahan": "Logam",
                    "no_rangka": "-",
                    "no_mesin": "-",
                    "no_bpkb": "-",
                    "no_polisi": "-",
                    "asal_usul": "Pembelian APBD",
                    "kondisi": "Baik",
                    "harga": 7500000,
                    "masa_manfaat": 8,
                    "nilai_sisa": null,
                    "keterangan": "Pendingin ruangan",
                    "file": "https://aquaelektronik.com/upload_files/1/56445b50c2-ac-split.png"
                },
                {
                    "id": 7,
                    "kode_barang": "1.3.02.05.04",
                    "no_register": "019",
                    "nama_barang": "Proyektor",
                    "ruang": "Ruang Rapat",
                    "tgl_perolehan": "2017-11-10",
                    "tgl_pembukuan": "2017-11-15",
                    "merk": "BenQ",
                    "type": "MX550",
                    "ukuran_cc": "-",
                    "no_pabrik": "BQ-MX550-3322",
                    "bahan": "Plastik",
                    "no_rangka": "-",
                    "no_mesin": "-",
                    "no_bpkb": "-",
                    "no_polisi": "-",
                    "asal_usul": "Pembelian APBD",
                    "kondisi": "Rusak Ringan",
                    "harga": 6800000,
                    "masa_manfaat": 5,
                    "nilai_sisa": null,
                    "keterangan": "Digunakan presentasi",
                    "file": "https://s3.ap-southeast-3.amazonaws.com/hartono-mh1/images/detailed/338/MS550_GT-Rev.jpg"
                },
                {
                    "id": 8,
                    "kode_barang": "1.3.02.05.05",
                    "no_register": "020",
                    "nama_barang": "Kamera Dokumentasi",
                    "ruang": "Ruang Humas",
                    "tgl_perolehan": "2021-07-05",
                    "tgl_pembukuan": "2021-07-10",
                    "merk": "Canon",
                    "type": "EOS 80D",
                    "ukuran_cc": "-",
                    "no_pabrik": "CN-EOS80D-7781",
                    "bahan": "Logam",
                    "no_rangka": "-",
                    "no_mesin": "-",
                    "no_bpkb": "-",
                    "no_polisi": "-",
                    "asal_usul": "Hibah",
                    "kondisi": "Baik",
                    "harga": 17500000,
                    "masa_manfaat": 5,
                    "nilai_sisa": null,
                    "keterangan": "Dokumentasi kegiatan",
                    "file": "https://studiopelangi.id/wp-content/uploads/2023/02/Perbedaan-Kamera-Digital-dengan-Kamera-Smartphone-1-1024x683.jpg"
                },
                {
                    "id": 9,
                    "kode_barang": "1.3.02.05.06",
                    "no_register": "021",
                    "nama_barang": "UPS",
                    "ruang": "Ruang Server",
                    "tgl_perolehan": "2022-10-01",
                    "tgl_pembukuan": "2022-10-05",
                    "merk": "APC",
                    "type": "Back-UPS 1200VA",
                    "ukuran_cc": "-",
                    "no_pabrik": "APC-UPS-1200-9911",
                    "bahan": "Plastik & Logam",
                    "no_rangka": "-",
                    "no_mesin": "-",
                    "no_bpkb": "-",
                    "no_polisi": "-",
                    "asal_usul": "Pembelian APBD",
                    "kondisi": "Baik",
                    "harga": 4200000,
                    "masa_manfaat": 4,
                    "nilai_sisa": null,
                    "keterangan": "Cadangan listrik server",
                    "file": "https://sentradaya.com/wp-content/uploads/2020/04/show_Riello_UPS_S3T_Active.jpg"
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
            DATA_MASTER: DATA_MASTER,
        }
    },
    methods: {


        getView: function () {
            this.$store.commit("shoWLoading");
            fetch(this.$store.state.url.URL_PERALATAN + "view", {
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

        addData: function () {
            var formData = new FormData();
            formData.append('data', JSON.stringify(this.form))
            formData.append("file", this.form.file);

            fetch(this.$store.state.url.URL_PERALATAN + "Add", {
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

            fetch(this.$store.state.url.URL_PERALATAN + "editData", {
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

        removeData: function (idnya, file) {
            fetch(this.$store.state.url.URL_PERALATAN + "removeData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({
                    id: idnya,
                    file, file
                })
            }).then(res_data => {
                this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
                this.getView();
            });

        },

        selectData: function (data) {
            this.form.kodep = data.kodep;
            this.form.akunId = data.akunId;
            this.form.kelompokId = data.kelompokId;
            this.form.jenisId = data.jenisId;
            this.form.objekId = data.objekId;
            this.form.rincianId = data.rincianId;
            this.form.subId = data.subId;
            this.form.subSubId = data.subSubId;
            this.form.no_register = data.no_register;
            this.form.ruang = data.ruang;
            this.form.tgl_perolehan = data.tgl_perolehan;
            this.form.tgl_pembukuan = data.tgl_pembukuan;
            this.form.merk = data.merk;
            this.form.type = data.type;
            this.form.no_pabrik = data.no_pabrik;
            this.form.bahan = data.bahan;
            this.form.no_rangka = data.no_rangka;
            this.form.no_mesin = data.no_mesin;
            this.form.no_bpkb = data.no_bpkb;
            this.form.no_polisi = data.no_polisi;
            this.form.asal_usul = data.asal_usul;
            this.form.kondisi = data.kondisi;
            this.form.harga = data.harga;
            this.form.masa_manfaat = data.masa_manfaat;
            this.form.nilai_sisa = data.nilai_sisa;
            this.form.keterangan = data.keterangan;
            this.form.keterangan = data.keterangan;
            this.form.file = data.file;
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
        DATA_MASTER.getAsal();
        DATA_MASTER.getKondisi();
    },
}
</script>