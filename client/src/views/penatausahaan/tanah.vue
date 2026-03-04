<template>
    <div class="about" style="padding:15px">
        <q-card bordered class="my-card">
            <q-card-section class="bg-blue-3 text-white">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="text-h6 h_titleHead">Tanah</div>
                        <div class="text-subtitle2">Penatausahaan</div>
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
                    <div class="col-12 col-sm-6 col-md-4" v-for="data in list_data" :key="data.id">
                        <q-card class="my-card" flat bordered>

                            <q-img :src="data.file" style="width: 100%; height: 200px" fit="cover" ratio="16/9" />

                            <q-card-section class="q-pb-sm">
                                <div class="row no-wrap items-start">
                                    <a class="clear_underline" href="javascript:void(0);"
                                        @click="mdl_detil = true, selectData(data)">
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
                        <div class="row q-col-gutter-sm">
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
                            <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable ">No. Register</span>
                                <q-input v-model="form.no_register" type="number" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Tanggal Pembelian</span>
                                <q-input v-model="form.tgl_beli" outlined square :dense="true" type="date" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Tanggal Pembukuan</span>
                                <q-input v-model="form.tgl_buku" outlined square :dense="true" type="date" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Luas (M2)</span>
                                <q-input v-model="form.luas" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Alamat</span>
                                <q-input v-model="form.alamat" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Hak Tanah</span>
                                <q-select
                                    v-model="form.id_hak"
                                    :options="$store.state.list_hak"
                                    option-value="id"
                                    option-label="uraian"
                                    outlined square :dense="true"
                                    class="bg-white margin_btn"
                                    emit-value map-options
                                />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Nomor Sertifikat</span>
                                <q-input v-model="form.no_sert" outlined square :dense="true" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Tanggal Sertifikat</span>
                                <q-input v-model="form.tgl_sert" outlined square :dense="true" type="date" class="bg-white margin_btn" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari frame_cari">
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
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Penggunaan</span>
                                <q-input v-model="form.guna" outlined square :dense="true" class="bg-white margin_btn" />
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
                    <div class="row q-col-gutter-sm">
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
                        <div class="col-12 col-md-12 frame_cari frame_cari">
                            <span class="h_lable ">No. Register</span>
                            <q-input v-model="form.no_register" type="number" outlined square :dense="true" class="bg-white margin_btn" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari frame_cari">
                            <span class="h_lable ">Tanggal Pembelian</span>
                            <q-input v-model="form.tgl_beli" outlined square :dense="true" type="date" class="bg-white margin_btn" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari frame_cari">
                            <span class="h_lable ">Tanggal Pembukuan</span>
                            <q-input v-model="form.tgl_buku" outlined square :dense="true" type="date" class="bg-white margin_btn" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Luas (M2)</span>
                            <q-input v-model="form.luas" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Alamat</span>
                            <q-input v-model="form.alamat" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Hak Tanah</span>
                            <q-select
                                v-model="form.id_hak"
                                :options="$store.state.list_hak"
                                option-value="id"
                                option-label="uraian"
                                outlined square :dense="true"
                                class="bg-white margin_btn"
                                emit-value map-options
                            />
                        </div>
                        <div class="col-12 col-md-6 frame_cari frame_cari">
                            <span class="h_lable ">Nomor Sertifikat</span>
                            <q-input v-model="form.no_sert" outlined square :dense="true" class="bg-white margin_btn" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari frame_cari">
                            <span class="h_lable ">Tanggal Sertifikat</span>
                            <q-input v-model="form.tgl_sert" outlined square :dense="true" type="date" class="bg-white margin_btn" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari frame_cari">
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
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Penggunaan</span>
                            <q-input v-model="form.guna" outlined square :dense="true" class="bg-white margin_btn" />
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

                    <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" />
                    <q-btn label="Batal" color="negative" v-close-popup />

                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- ================================================= MODAL EDIT ================================================ -->

        <!-- ================================================= MODAL HAPUS ================================================ -->
         <q-dialog v-model="mdl_remove" persistent>
            <q-card class="mdl-sm ">
                <q-card-section class="q-pt-none text-center orageGrad">
                    <form @submit.prevent="removeData(form.id, form.file)">
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
        <!-- ================================================= MODAL HAPUS ================================================ -->

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
                                <q-item-section class="col-3 text-weight-medium"><b>Kode Pemilik</b></q-item-section>
                                <q-item-section>{{ form.kode_pemilik }}</q-item-section>
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
                                <q-item-section class="col-3 text-weight-medium"><b>Ukuran / Luas
                                        Tanah</b></q-item-section>
                                <q-item-section>{{ form.luas }} m2</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Alamat</b></q-item-section>
                                <q-item-section>{{ form.alamat }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Nomor
                                        Sertifikat</b></q-item-section>
                                <q-item-section>{{ form.no_sertifikat }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Tanggal
                                        Sertifikat</b></q-item-section>
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
        <!-- ================================================ MODAL DETIL ================================================ -->

        <!-- =================================================== MODAL =========================================================== -->
    </div>
</template>


<script>


import FETCHING from '../../library/fetching'
import UMUM from '../../library/umum'
import DATA_MASTER from '../../library/dataMaster';

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
                tgl_beli: '',
                tgl_buku: '',
                luas: '',
                alamat: '',
                id_hak: '',
                no_sert: '',
                tgl_sert: '',
                id_asal: '',
                guna: '',
                harga: '',
                keterangan: '',
                file: null,
            },

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
            fetch(this.$store.state.url.URL_TANAH + "view", {
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

            fetch(this.$store.state.url.URL_TANAH + "addData", {
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
            
            fetch(this.$store.state.url.URL_TANAH + "editData", {
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
            fetch(this.$store.state.url.URL_TANAH + "removeData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({
                    id: idnya,
                    file: file,
                })
            }).then(res_data => {
                this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
                this.getView();
            });

        },

        selectData: function (data) {
            this.form.id = data.id;
            this.form.kodep = data.kodep;
            this.form.akunId = data.akunId;
            this.form.kelompokId = data.kelompokId;
            this.form.jenisId = data.jenisId;
            this.form.objekId = data.objekId;
            this.form.rincianId = data.rincianId;
            this.form.subId = data.subId;
            this.form.subSubId = data.subSubId;
            this.form.no_register = data.no_register;
            this.form.tgl_beli = data.tgl_beli;
            this.form.tgl_buku = data.tgl_buku;
            this.form.tgl_pembukuan = data.tgl_pembukuan;
            this.form.luas = data.luas;
            this.form.alamat = data.alamat;
            this.form.id_hak = data.id_hak;
            this.form.no_sert = data.no_sert;
            this.form.tgl_sert = data.tgl_sert;
            this.form.id_asal = data.id_asal;
            this.form.guna = data.guna;
            this.form.harga = data.harga;
            this.form.keterangan = data.keterangan;
            this.form.file = data.file;
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

        async awaitFetch() {
            this.$store.state.list_kelompok = await this.DATA_MASTER.getKelompok(this.form.akunId);
            this.$store.state.list_jenis = await this.DATA_MASTER.getJenis(this.form.kelompokId);
            this.$store.state.list_objek = await this.DATA_MASTER.getObjek(this.form.jenisId);
            this.$store.state.list_rincian = await this.DATA_MASTER.getRincian(this.form.objekId);
            this.$store.state.list_sub = await this.DATA_MASTER.getSub(this.form.rincianId);
            this.$store.state.list_sub_sub = await this.DATA_MASTER.getSubSub(this.form.subId);
        }
    },

    mounted() {
        this.getView();
        DATA_MASTER.getAset();
        DATA_MASTER.getHak();
        DATA_MASTER.getAsal();
    },
}
</script>