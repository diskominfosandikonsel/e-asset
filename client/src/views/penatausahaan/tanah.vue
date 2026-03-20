<template>
    <div style="padding:15px">
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
                <q-tabs
                    v-model="tab"
                    dense
                    class="text-primary"
                    active-color="primary"
                    indicator-color="primary"
                    align="left"
                >
                    <q-tab name="v1" label="Versi 1" />
                    <q-tab name="v2" label="Versi 2" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="v1" class="q-pa-md">
                        <div class="row q-col-gutter-lg">
                            <div class="col-12 col-sm-6 col-md-4" v-for="data in list_data" :key="data.id">
                            <q-card class="card-aset shadow-1 hover-shadow">
                                <div class="relative-position cursor-pointer" @click="mdl_detil = true, selectData(data)">
                                    <q-img
                                        :src="file_path+data.file || 'https://cdn.quasar.dev/img/image-placeholder.png'"
                                        class="rounded-borders"
                                    >
                                        <template v-slot:error>
                                            <div class="absolute-full flex flex-center bg-grey-3 text-grey-7">
                                                <q-icon name="image_not_supported" size="lg" />
                                            </div>
                                        </template>
                                        
                                        <div class="absolute-top-right">
                                            <q-badge color="positive" class="text-subtitle2 q-pa-sm shadow-2">
                                                {{ UMUM.formatRupiah(data.harga) }}
                                            </q-badge>
                                        </div>
                                    </q-img>
                                </div>

                                <q-card-section>
                                    <div class="text-h6 text-primary text-weight-bold ellipsis cursor-pointer" @click="mdl_detil = true, selectData(data)">
                                        {{ data.subSubId }} - {{ data.uraian_sub_sub }}
                                        <q-tooltip>{{ data.uraian_sub_sub }}</q-tooltip>
                                    </div>
                                    
                                    <div class="text-subtitle2 text-grey-7 q-mb-sm">
                                        {{ data.merk }} <span v-if="data.type">/ {{ data.type }}</span>
                                    </div>

                                    <q-separator inset class="q-my-sm" />

                                    <div class="column q-gutter-y-xs text-body2 text-grey-9">
                                        <div class="row items-center">
                                            <q-icon name="event" size="xs" class="q-mr-sm text-grey-6" />
                                            <span class="text-grey-7 q-mr-xs">Perolehan:</span> 
                                            <span class="text-weight-medium">{{ UMUM.tglConvert(data.tgl_beli) }}</span>
                                        </div>
                                        
                                        <div class="row items-start no-wrap">
                                            <q-icon name="notes" size="xs" class="q-mr-sm q-mt-xs text-grey-6" />
                                            <div class="ellipsis-2-lines text-italic text-grey-8">
                                                "{{ data.keterangan || 'Tidak ada keterangan' }}"
                                            </div>
                                        </div>
                                    </div>
                                </q-card-section>

                                <q-separator />

                                <q-card-actions align="right" class="bg-grey-1">
                                    <q-btn flat round icon="visibility" color="primary" @click="mdl_detil = true, selectData(data)">
                                        <q-tooltip>Detail</q-tooltip>
                                    </q-btn>
                                    <q-btn flat round icon="edit_square" color="orange-8" @click="mdl_edit = true, selectData(data)">
                                        <q-tooltip>Ubah</q-tooltip>
                                    </q-btn>
                                    <q-btn flat round icon="delete" color="negative" @click="mdl_remove = true, selectData(data)">
                                        <q-tooltip>Hapus</q-tooltip>
                                    </q-btn>
                                </q-card-actions>
                            </q-card>
                            </div>
                        </div>
                    </q-tab-panel>
                    <q-tab-panel name="v2" class="q-pa-none">
                        <div class="tbl_responsive">
                            <!-- =================================================== KONTENT =========================================================== -->
                            <table width="100%">
                                <thead>
                                    <tr class="h_table_head bg-blue-2">
                                        <th class="text-center">No</th>
                                        <th class="text-center">Kode Aset</th>
                                        <th class="text-center">Nama Aset</th>
                                        <th class="text-center">Letak / Alamat</th>
                                        <th class="text-center">Status Tanah</th>
                                        <th class="text-center">Pengguna</th>
                                        <th class="text-center">Keterangan</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                                        <td class="text-center">{{ index + 1 }}.</td>
                                        <td class="text-center">{{ data.subSubId }}</td>
                                        <td>{{ data.uraian_sub_sub }}</td>
                                        <td>{{ data.alamat }}</td>
                                        <td>{{ data.hak_tanah }}</td>
                                        <td>{{ data.guna }}</td>
                                        <td>{{ data.keterangan }}</td>
                                        <td class="text-center">
                                            <q-btn-group flat>
                                                <q-btn glossy color="blue" icon="search" size="sm" @click="mdl_detil = true, selectData(data)">
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
                            <!-- =================================================== KONTENT =========================================================== -->
                        </div>
                    </q-tab-panel>
                </q-tab-panels>

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
                            <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Kode Aset</span>
                            <q-select
                                v-model="form.subSubId"
                                use-input hide-selected fill-input
                                input-debounce="300"
                                :options="$store.state.list_sub_sub"
                                option-value="kode"
                                option-label="uraian"
                                emit-value map-options
                                @filter="autocomplete_getSubKegiatan"
                                @focus="loadSubSubAwal"
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
                            <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable ">No. Register</span>
                                <q-input v-model="form.no_reg" type="number" outlined square :dense="true" class="bg-white margin_btn" />
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
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Kode Aset</span>
                            <q-select
                                v-model="form.subSubId"
                                use-input hide-selected fill-input
                                input-debounce="300"
                                :options="$store.state.list_sub_sub"
                                option-value="kode"
                                option-label="uraian"
                                emit-value map-options
                                @filter="autocomplete_getSubKegiatan"
                                @focus="loadSubSubAwal"
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
                        <div class="col-12 col-md-12 frame_cari frame_cari">
                            <span class="h_lable ">No. Register</span>
                            <q-input v-model="form.no_reg" type="number" outlined square :dense="true" class="bg-white margin_btn" />
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

                    <div>
                        <q-img :src="file_path+form.file" spinner-color="primary" style="max-height: 500px;
                            border: 1px solid #ddd;
                            border-radius: 6px;"
                        />
                    </div>

                    <div>
                        <div class="text-subtitle1 text-bold q-mb-sm">Informasi Aset</div>
                        <q-list dense bordered separator class="rounded-borders">
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Kode Pemilik</b></q-item-section>
                                <q-item-section>{{ form.kodep }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Kode Aset</b></q-item-section>
                                <q-item-section>{{ form.subSubId }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Tanggal Perolehan</b></q-item-section>
                                <q-item-section>{{ UMUM.tglConvert(form.tgl_beli) }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Ukuran / Luas Tanah</b></q-item-section>
                                <q-item-section>{{ form.luas }} m2</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Alamat</b></q-item-section>
                                <q-item-section>{{ form.alamat }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Nomor Sertifikat</b></q-item-section>
                                <q-item-section>{{ form.no_sert }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Tanggal Sertifikat</b></q-item-section>
                                <q-item-section>{{ UMUM.tglConvert(form.tgl_sert) }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Asal Usul</b></q-item-section>
                                <q-item-section>{{ form.asal_usul }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Penggunaan</b></q-item-section>
                                <q-item-section>{{ form.guna }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Harga</b></q-item-section>
                                <q-item-section>Rp. {{ UMUM.formatRupiah(form.harga) }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Keterangan</b></q-item-section>
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
            tab: 'v1',
            form: {
                id: '',
                kodep: 12,
                subSubId: '',
                no_reg: '',
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
                file_old: '',
                file: null,
            },
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

            file_path: this.$store.state.url.URL_APP + "uploads/",
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
                    console.log(res_data);
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
            this.form.subSubId = data.subSubId;
            this.form.no_reg = data.no_reg;
            this.form.tgl_beli = data.tgl_beli;
            this.form.tgl_buku = data.tgl_buku;
            this.form.tgl_pembukuan = data.tgl_pembukuan;
            this.form.luas = data.luas;
            this.form.alamat = data.alamat;
            this.form.id_hak = data.id_hak;
            this.form.no_sert = data.no_sert;
            this.form.tgl_sert = data.tgl_sert;
            this.form.id_asal = data.id_asal;
            this.form.asal_usul = data.asal_usul;
            this.form.guna = data.guna;
            this.form.harga = data.harga;
            this.form.keterangan = data.keterangan;
            this.form.file = data.file;
            this.form.file_old = data.file;
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

        autocomplete_getSubKegiatan : function (val, update) {
            update(() => {
                if (val === '') {

                } else {
                    FETCHING.getSubKegiatan(val)
                }
            })
        },

        loadSubSubAwal() {
            FETCHING.getSubKegiatan('')
        },
    },

    mounted() {
        this.getView();

        DATA_MASTER.getAset();
        DATA_MASTER.getHak();
        DATA_MASTER.getAsal();
    },
}
</script>