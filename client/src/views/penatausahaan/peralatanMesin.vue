<template>
    <div style="padding:15px">
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

                <!-- Isi Tab -->
                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="v1" class="q-pa-md">
                        <div class="row q-col-gutter-lg">
                            <div class="col-12 col-sm-6 col-md-4" v-for="data in list_data" :key="data.id">
                                <q-card class="card-aset shadow-1 hover-shadow">
                                    <div class="relative-position cursor-pointer" @click="mdl_detil = true, selectData(data)">
                                    <q-img
                                        :src="file_path+data.file || 'https://cdn.quasar.dev/img/image-placeholder.png'"
                                        style="height: 200px"
                                        class="rounded-borders"
                                    >
                                        <template v-slot:error>
                                            <div class="absolute-full flex flex-center bg-grey-3 text-grey-7">
                                                <q-icon name="image_not_supported" size="lg" />
                                            </div>
                                        </template>
                                        
                                        <div class="absolute-top-right">
                                            <q-badge color="positive" class="text-subtitle2 q-pa-sm shadow-2">
                                                Rp {{ UMUM.formatRupiah(data.harga).toLocaleString('id-ID') }}
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
                                    <q-btn flat round icon="delete_outline" color="negative" @click="mdl_remove = true, selectData(data)">
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
                                        <th class="text-center">Merk/Type</th>
                                        <th class="text-center">Ukuran</th>
                                        <th class="text-center">No. Pabrik</th>
                                        <th class="text-center">Keterangan</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                                        <td class="text-center">{{ index + 1 }}.</td>
                                        <td class="text-center">{{ data.subSubId }}</td>
                                        <td>{{ data.uraian_sub_sub }}</td>
                                        <td>{{ data.merk }} / {{ data.type }}</td>
                                        <td>{{ data.ukuran }}</td>
                                        <td>{{ data.no_pabrik }}</td>
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
                        <div class="row">
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
                                <q-input v-model="form.bahan" outlined square :dense="true" class="bg-white margin_btn" />
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
                                <q-input v-model="form.harga" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Masa Manfaat</span>
                                <q-input v-model="form.manfaat" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Nilai Sisa</span>
                                <q-input v-model="form.nilai" outlined square :dense="true" class="bg-white margin_btn" type="number" />
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
                                <q-input v-model="form.bahan" outlined square :dense="true" class="bg-white margin_btn" />
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
                                <q-input v-model="form.harga" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari frame_cari">
                                <span class="h_lable ">Masa Manfaat</span>
                                <q-input v-model="form.manfaat" outlined square :dense="true" class="bg-white margin_btn" type="number" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Nilai Sisa</span>
                                <q-input v-model="form.nilai" outlined square :dense="true" class="bg-white margin_btn" type="number" />
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
                        <q-img :src="file_path+form.file" spinner-color="primary" style="max-height: 400px;
                            border: 1px solid #ddd;
                            border-radius: 6px;" />
                    </div>

                    <div>
                        <div class="text-subtitle1 text-bold q-mb-sm">Informasi Aset</div>
                        <q-list dense bordered separator class="rounded-borders">
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Ruang</b></q-item-section>
                                <q-item-section>{{ form.ruang }}</q-item-section>
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
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Merk/Type</b></q-item-section>
                                <q-item-section>{{ form.merk }}/{{ form.type }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>No. Pabrik</b></q-item-section>
                                <q-item-section>{{ form.no_pabrik }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Bahan</b></q-item-section>
                                <q-item-section>{{ form.bahan }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Nomor Rangka</b></q-item-section>
                                <q-item-section>{{ form.no_rangka }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Nomor Mesin</b></q-item-section>
                                <q-item-section>{{ form.no_mesin }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>No. BPKB</b></q-item-section>
                                <q-item-section>{{ form.no_bpkb }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>No. Polisi</b></q-item-section>
                                <q-item-section>{{ form.no_polisi }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Asal Usul</b></q-item-section>
                                <q-item-section>{{ form.asal_usul }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Kondisi</b></q-item-section>
                                <q-item-section>{{ form.kondisi }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Harga</b></q-item-section>
                                <q-item-section>Rp. {{ UMUM.formatRupiah(form.harga) }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Masa Manfaat</b></q-item-section>
                                <q-item-section>{{ form.manfaat }} Tahun</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Nilai Sisa</b></q-item-section>
                                <q-item-section>{{ form.nilai }}</q-item-section>
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

        <!-- ================================================ MODAL KOMPONEN ================================================ -->
         <q-dialog v-model="modal_komponen" persistent>
            <q-card :class="cardClass">
                <div v-if="modal_komponen_jenis == 'PINDAH_RUANG'">
                    <kompPindahRuang />
                </div>
                <div v-if="modal_komponen_jenis == 'KAPITALISASI'">
                    <kompKapitalisasi />
                </div>
                <div v-if="modal_komponen_jenis == 'KOREKSI'">
                    <kompKoreksi />
                </div>
                <div v-if="modal_komponen_jenis == 'UBAH_KONDISI'">
                    <kompUbahKondisi />
                </div>
            </q-card>
        </q-dialog>
        <!-- ================================================ MODAL KOMPONEN ================================================ -->




        <!-- =================================================== MODAL =========================================================== -->




    </div>
</template>


<script>


import FETCHING from '../../library/fetching'
import UMUM, { formatRupiah } from '../../library/umum'
import DATA_MASTER from '../../library/dataMaster'

export default {
    computed: {
        cardClass() {
            if (this.modal_komponen_jenis === 'PINDAH_RUANG') {
                return 'mdl-lg';
            } else if (this.modal_komponen_jenis === 'KAPITALISASI') {
                return 'mdl-lg';
            } else if (this.modal_komponen_jenis === 'KOREKSI') {
                return 'mdl-lg';
            } else if (this.modal_komponen_jenis === 'UBAH_KONDISI') {
                return 'mdl-lg';
            }
            return 'mdl-default'; // Default class
        }
    },
    data() {
        return {
            tab: 'v1',
            form: {
                id: '',
                kodep: 12,
                subSubId: '',
                no_reg: '',
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
                id_kondisi: '',
                harga: '',
                manfaat: '',
                nilai: '',
                keterangan: '',
                file_old: '',
                file: null,
            },


            openModal(data) {
                this.modal_komponen = true;
                this.modal_komponen_jenis = data
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

            modal_komponen: false,
            modal_komponen_jenis: '',

            FETCHING: FETCHING,
            UMUM: UMUM,
            DATA_MASTER: DATA_MASTER,

            file_path: this.$store.state.url.URL_APP + "uploads/",
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

            fetch(this.$store.state.url.URL_PERALATAN + "addData", {
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

        removeData: function (idnya, file_old) {
            fetch(this.$store.state.url.URL_PERALATAN + "removeData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({
                    id: idnya,
                    file: file_old
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
            this.form.ruang = data.ruang;
            this.form.tgl_beli = data.tgl_beli ? data.tgl_beli.split('T')[0] : ''
            this.form.tgl_buku = data.tgl_buku ? data.tgl_buku.split('T')[0] : ''
            this.form.merk = data.merk;
            this.form.type = data.type;
            this.form.no_pabrik = data.no_pabrik;
            this.form.bahan = data.bahan;
            this.form.no_rangka = data.no_rangka;
            this.form.no_mesin = data.no_mesin;
            this.form.no_bpkb = data.no_bpkb;
            this.form.no_polisi = data.no_polisi;
            this.form.id_asal = data.id_asal;
            this.form.id_kondisi = data.id_kondisi;
            this.form.asal_usul = data.asal_usul;
            this.form.kondisi = data.kondisi;
            this.form.harga = data.harga;
            this.form.manfaat = data.manfaat;
            this.form.nilai = data.nilai;
            this.form.keterangan = data.keterangan;
            this.form.file = data.file;
            this.form.file_old = data.file;
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

<style scoped>
    .card-aset {
        border-radius: 12px;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        overflow: hidden;
    }

    .hover-shadow:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
    }

        /* Memastikan teks panjang tidak merusak layout */
    .ellipsis-2-lines {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
    }
    .item-aset-hover:hover {
        background-color: #f5f7fa;
        transition: background-color 0.3s ease;
    }
</style>