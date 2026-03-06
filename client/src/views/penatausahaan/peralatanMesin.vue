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
                            <div class="col-12 col-sm-6 col-md-4" v-for="data in listData" :key="data.id">
                            <q-card class="card-aset shadow-1 hover-shadow">
                                
                                <div class="relative-position cursor-pointer" @click="mdl_detil = true, selectData(data)">
                                <q-img
                                    :src="data.file || 'https://cdn.quasar.dev/img/image-placeholder.png'"
                                    style="height: 200px"
                                    class="rounded-borders"
                                >
                                    <template v-slot:error>
                                    <div class="absolute-full flex flex-center bg-grey-3 text-grey-7">
                                        <q-icon name="image_not_supported" size="lg" />
                                    </div>
                                    </template>
                                    
                                    <div class="absolute-bottom-right q-ma-sm">
                                    <q-badge color="positive" class="text-subtitle2 q-pa-sm shadow-2">
                                        Rp {{ Number(data.harga).toLocaleString('id-ID') }}
                                    </q-badge>
                                    </div>
                                </q-img>
                                </div>

                                <q-card-section>
                                <div class="text-h6 text-primary text-weight-bold ellipsis cursor-pointer" @click="mdl_detil = true, selectData(data)">
                                    {{ data.uraian_aset }}
                                    <q-tooltip>{{ data.uraian_aset }}</q-tooltip>
                                </div>
                                
                                <div class="text-subtitle2 text-grey-7 q-mb-sm">
                                    {{ data.merk }} <span v-if="data.type">/ {{ data.type }}</span>
                                </div>

                                <q-separator inset class="q-my-sm" />

                                <div class="column q-gutter-y-xs text-body2 text-grey-9">
                                    <div class="row items-center">
                                    <q-icon name="event" size="xs" class="q-mr-sm text-grey-6" />
                                    <span class="text-grey-7 q-mr-xs">Perolehan:</span> 
                                    <span class="text-weight-medium">{{ UMUM.tglConvert(data.tgl_perolehan) }}</span>
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
                        <q-list separator class="bg-white">
                            <q-item 
                            v-for="data in listData" 
                            :key="data.id" 
                            class="q-py-md q-px-md item-aset-hover"
                            >
                            
                            <q-item-section>
                                <div class="row items-center q-gutter-sm q-mb-xs">
                                <div 
                                    class="text-weight-bold text-subtitle1 cursor-pointer text-primary"
                                    @click="selectData(data), mdl_detil = true"
                                >
                                    {{ data.merk }} {{ data.type }}
                                </div>
                                
                                <q-badge 
                                    :color="data.kondisi === 'Baik' ? 'positive' : data.kondisi === 'Kurang Baik' ? 'warning' : 'negative'"
                                    rounded
                                >
                                    {{ data.kondisi }}
                                </q-badge>
                                </div>

                                <div class="text-caption text-grey-8 q-mb-sm">
                                <span class="text-weight-medium">{{ data.no_polisi }}</span> 
                                <span class="q-mx-xs">•</span> 
                                Reg: {{ data.no_register }}
                                </div>

                                <div class="row q-gutter-md text-body2 text-grey-7">
                                <div class="row items-center">
                                    <q-icon name="place" size="xs" class="q-mr-xs" />
                                    {{ data.ruang }}
                                </div>
                                <div class="row items-center text-weight-medium text-dark">
                                    <q-icon name="payments" size="xs" class="q-mr-xs text-grey-7" />
                                    Rp {{ Number(data.harga).toLocaleString('id-ID') }}
                                </div>
                                </div>

                                <div class="q-gutter-xs q-mt-md">
                                    <q-btn square class="bg-blue-7 text-white" size="xs" icon="meeting_room" @click="selectData(data), openModal('PINDAH_RUANG')">
                                        <q-tooltip>Pindah Ruang</q-tooltip>
                                    </q-btn>
                                    <q-btn square class="bg-teal-7 text-white" size="xs" icon="add_circle" @click="selectData(data), openModal('KAPITALISASI')">
                                        <q-tooltip>Kapitalisasi</q-tooltip>
                                    </q-btn>
                                    <q-btn square class="bg-orange-7 text-white" size="xs" icon="edit_note" @click="selectData(data), openModal('KOREKSI')">
                                        <q-tooltip>Koreksi Data</q-tooltip>
                                    </q-btn>
                                    <q-btn square class="bg-purple-7 text-white" size="xs" icon="health_and_safety" @click="selectData(data), openModal('UBAH_KONDISI')">
                                        <q-tooltip>Ubah Kondisi</q-tooltip>
                                    </q-btn>
                                </div>
                            </q-item-section>

                            <q-item-section side top>
                                <q-btn icon="more_vert" flat round color="grey-7">
                                <q-menu auto-close transition-show="scale" transition-hide="scale">
                                    <q-list style="min-width: 150px">
                                    <q-item clickable @click="selectData(data), mdl_detil = true">
                                        <q-item-section>Detail Aset</q-item-section>
                                    </q-item>
                                    
                                    <q-item clickable @click="selectData(data), mdl_edit = true">
                                        <q-item-section>Edit Data</q-item-section>
                                    </q-item>

                                    <q-separator />

                                    <q-item clickable class="text-negative" @click="selectData(data), mdl_hapus = true">
                                        <q-item-section>Hapus</q-item-section>
                                    </q-item>
                                    </q-list>
                                </q-menu>
                                </q-btn>
                            </q-item-section>
                            </q-item>
                        </q-list>
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
import UMUM from '../../library/umum'
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
                    id: "AST001",
                    kodep: 12,
                    akunId: "1.3.02.01",
                    kelompokId: "02",
                    jenisId: "02.01",
                    objekId: "02.01.03",
                    rincianId: "02.01.03.01",
                    subId: "02.01.03.01.01",
                    subSubId: "02.01.03.01.01.0001",
                    no_register: "0001",
                    ruang: "Garasi Kantor Bupati",
                    tgl_beli: "2022-03-15",
                    tgl_buku: "2022-03-20",
                    merk: "Toyota",
                    type: "Innova Reborn 2.4 G",
                    no_pabrik: "TMMIN202203001",
                    no_rangka: "MHFXW8EM3N1234567",
                    no_mesin: "2GD1234567",
                    no_bpkb: "L12345678",
                    no_polisi: "DT 1 K",
                    id_asal: "APBD",
                    kondisi: "Baik",
                    harga: 420000000,
                    masa_manfaat: 8,
                    nilai_sisa: 20000000,
                    keterangan: "Kendaraan Dinas Operasional Bupati",
                    file: null
                },

                {
                    id: "AST002",
                    kodep: 12,
                    akunId: "1.3.02.02",
                    kelompokId: "02",
                    jenisId: "02.02",
                    objekId: "02.02.01",
                    rincianId: "02.02.01.01",
                    subId: "02.02.01.01.01",
                    subSubId: "02.02.01.01.01.0002",
                    no_register: "0002",
                    ruang: "Ruang Server Diskominfo",
                    tgl_beli: "2023-02-10",
                    tgl_buku: "2023-02-12",
                    merk: "Dell",
                    type: "PowerEdge R740",
                    no_pabrik: "DELLSRV20230201",
                    no_rangka: "-",
                    no_mesin: "-",
                    no_bpkb: "-",
                    no_polisi: "-",
                    id_asal: "APBD",
                    kondisi: "Baik",
                    harga: 185000000,
                    masa_manfaat: 5,
                    nilai_sisa: 5000000,
                    keterangan: "Server aplikasi pemerintah daerah",
                    file: null
                },

                {
                    id: "AST003",
                    kodep: 12,
                    akunId: "1.3.02.02",
                    kelompokId: "02",
                    jenisId: "02.02",
                    objekId: "02.02.01",
                    rincianId: "02.02.01.02",
                    subId: "02.02.01.02.01",
                    subSubId: "02.02.01.02.01.0003",
                    no_register: "0003",
                    ruang: "Ruang Operator Diskominfo",
                    tgl_beli: "2022-11-08",
                    tgl_buku: "2022-11-10",
                    merk: "HP",
                    type: "ProDesk 400 G7",
                    no_pabrik: "HPPC20221103",
                    no_rangka: "-",
                    no_mesin: "-",
                    no_bpkb: "-",
                    no_polisi: "-",
                    id_asal: "APBD",
                    kondisi: "Baik",
                    harga: 12000000,
                    masa_manfaat: 5,
                    nilai_sisa: 1000000,
                    keterangan: "Komputer operator pengelola aplikasi",
                    file: null
                },

                {
                    id: "AST004",
                    kodep: 12,
                    akunId: "1.3.02.02",
                    kelompokId: "02",
                    jenisId: "02.02",
                    objekId: "02.02.01",
                    rincianId: "02.02.01.02",
                    subId: "02.02.01.02.02",
                    subSubId: "02.02.01.02.02.0004",
                    no_register: "0004",
                    ruang: "Ruang Keuangan",
                    tgl_beli: "2021-06-15",
                    tgl_buku: "2021-06-18",
                    merk: "Lenovo",
                    type: "ThinkCentre M720",
                    no_pabrik: "LNVPC20210604",
                    no_rangka: "-",
                    no_mesin: "-",
                    no_bpkb: "-",
                    no_polisi: "-",
                    id_asal: "APBD",
                    kondisi: "Baik",
                    harga: 10500000,
                    masa_manfaat: 5,
                    nilai_sisa: 1000000,
                    keterangan: "Komputer staf keuangan",
                    file: null
                },

                {
                    id: "AST005",
                    kodep: 12,
                    akunId: "1.3.02.02",
                    kelompokId: "02",
                    jenisId: "02.02",
                    objekId: "02.02.02",
                    rincianId: "02.02.02.01",
                    subId: "02.02.02.01.01",
                    subSubId: "02.02.02.01.01.0005",
                    no_register: "0005",
                    ruang: "Ruang Kepala Dinas",
                    tgl_beli: "2023-01-20",
                    tgl_buku: "2023-01-21",
                    merk: "Apple",
                    type: "MacBook Pro M2",
                    no_pabrik: "APPLE20230105",
                    no_rangka: "-",
                    no_mesin: "-",
                    no_bpkb: "-",
                    no_polisi: "-",
                    id_asal: "APBD",
                    kondisi: "Baik",
                    harga: 32000000,
                    masa_manfaat: 5,
                    nilai_sisa: 2000000,
                    keterangan: "Laptop Kepala Dinas",
                    file: null
                },

                {
                    id: "AST006",
                    kodep: 12,
                    akunId: "1.3.02.01",
                    kelompokId: "02",
                    jenisId: "02.01",
                    objekId: "02.01.03",
                    rincianId: "02.01.03.01",
                    subId: "02.01.03.01.02",
                    subSubId: "02.01.03.01.02.0006",
                    no_register: "0006",
                    ruang: "Garasi Dinas Kominfo",
                    tgl_beli: "2020-09-12",
                    tgl_buku: "2020-09-15",
                    merk: "Mitsubishi",
                    type: "Pajero Sport Dakar",
                    no_pabrik: "MMKI20200906",
                    no_rangka: "MMPJNKG40LH654321",
                    no_mesin: "4N15678902",
                    no_bpkb: "L98765432",
                    no_polisi: "DT 8 K",
                    id_asal: "APBD",
                    kondisi: "Kurang Baik",
                    harga: 590000000,
                    masa_manfaat: 8,
                    nilai_sisa: 30000000,
                    keterangan: "Kendaraan operasional Diskominfo",
                    file: null
                }

            ],

            openModal(data) {
                this.modal_komponen = true;
                this.modal_komponen_jenis = data
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
            mdl_hapus: false,
            mdl_detil: false,
            btn_add: false,

            modal_komponen: false,
            modal_komponen_jenis: '',

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