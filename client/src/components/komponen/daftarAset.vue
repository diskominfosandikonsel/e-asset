<template>
    <div>
        <q-card-section class="bg-blue-3 text-white">
            <div class="text-h6 h_modalhead">Daftar Aset</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-btn label="Tambah" icon="add" size="sm" class="bg-blue-3 text-white q-mt-md" @click="mdl_add = true" />

            <div class="tbl_responsive q-mt-md">
                <table width="100%" class="h_table">
                    <thead>
                        <tr class="h_table_head bg-blue-2">
                            <th class="text-center" width="5%">No</th>
                            <th class="text-center" width="20%">Nama Barang</th>
                            <th class="text-center" width="10%">No Register</th>
                            <th class="text-center" width="8%">Jumlah</th>
                            <th class="text-center" width="10%">Kondisi</th>
                            <th class="text-center" width="10%">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in list_data" :key="data.id" class="h_table_body">
                            <td class="text-center">{{ index + 1 }}</td>
                            <td>{{ data.uraian }}</td>
                            <td class="text-center">{{ data.no_register }}</td>
                            <td class="text-center">{{ data.jumlah }}</td>
                            <td class="text-center">
                                <q-badge :color="data.kondisi === 'Baik' ? 'positive' : 'warning'">
                                    {{ data.kondisi }}
                                </q-badge>
                            </td>
                            <td class="text-center">
                                <q-btn-group flat>
                                    <q-btn icon="search" size="sm" color="blue" @click="mdl_lihat = true, selectData(data)" />
                                    <q-btn icon="edit" size="sm" color="orange" @click="mdl_edit = true, selectData(data)" />
                                    <q-btn icon="delete" size="sm" color="red" @click="mdl_remove = true, selectData(data)" />
                                </q-btn-group>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </q-card-section>

        <q-card-actions class="bg-grey-3" align="right">
            <q-btn label="Batal" color="negative" v-close-popup />
        </q-card-actions>

        <q-dialog v-model="mdl_add" persistent>
            <q-card class="mdl-md" style="min-width: 400px">
                <q-card-section class="bg-primary text-white">
                    <div class="text-h6">Tambah Data</div>
                </q-card-section>

                <form @submit.prevent="addData()">
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
                                    v-model="form.asetId"
                                    :options="list_aset"
                                    option-value="id"
                                    option-label="uraian"
                                    outlined square :dense="true"
                                    class="bg-white margin_btn"
                                    emit-value map-options
                                />
                            </div>
                            <div class="col-12 q-mt-md">
                                <q-separator q-mb-md />
                            </div>
                            <template v-if="form.id_bmd === 1">
                                <div class="row q-col-gutter-sm">
                                    <div class="col-12 col-md-12 frame_cari frame_cari">
                                        <span class="h_lable ">Kode Pemilik</span>
                                        <q-input v-model="formAset.kodep" outlined square :dense="true" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-12 frame_cari">
                                    <span class="h_lable">Kode Aset</span>
                                    <q-select
                                        v-model="formAset.subSubId"
                                        use-input hide-selected fill-input
                                        input-debounce="300"
                                        :options="$store.state.list_sub_sub"
                                        option-value="kode"
                                        option-label="uraian"
                                        emit-value map-options
                                        @filter="autocomplete_getSubKegiatan"
                                        @focus="loadSubSubAwal"
                                        clearable outlined square dense disable
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
                                        <q-input v-model="formAset.no_reg" type="number" outlined square :dense="true" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable ">Tanggal Pembelian</span>
                                        <q-input v-model="formAset.tgl_beli" outlined square :dense="true" type="date" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable ">Tanggal Pembukuan</span>
                                        <q-input v-model="formAset.tgl_buku" outlined square :dense="true" type="date" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-12 frame_cari">
                                        <span class="h_lable ">Luas (M2)</span>
                                        <q-input v-model="formAset.luas" outlined square :dense="true" class="bg-white margin_btn" type="number" disable />
                                    </div>
                                    <div class="col-12 col-md-12 frame_cari">
                                        <span class="h_lable ">Alamat</span>
                                        <q-input v-model="formAset.alamat" outlined square :dense="true" class="bg-white margin_btn" type="textarea" disable />
                                    </div>
                                    <div class="col-12 col-md-12 frame_cari">
                                        <span class="h_lable">Hak Tanah</span>
                                        <q-select
                                            v-model="formAset.hak_tanah"
                                            :options="$store.state.list_hak"
                                            option-value="id"
                                            option-label="uraian"
                                            outlined square :dense="true"
                                            class="bg-white margin_btn"
                                            emit-value map-options disable
                                        />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable ">Nomor Sertifikat</span>
                                        <q-input v-model="formAset.no_sert" outlined square :dense="true" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable ">Tanggal Sertifikat</span>
                                        <q-input v-model="formAset.tgl_sert" outlined square :dense="true" type="date" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-12 frame_cari frame_cari">
                                        <span class="h_lable">Asal Usul</span>
                                        <q-select
                                            v-model="formAset.asal_usul"
                                            :options="$store.state.list_asal"
                                            option-value="id"
                                            option-label="uraian"
                                            outlined square :dense="true"
                                            class="bg-white margin_btn"
                                            emit-value map-options disable
                                        />
                                    </div>
                                    <div class="col-12 col-md-12 frame_cari">
                                        <span class="h_lable ">Penggunaan</span>
                                        <q-input v-model="formAset.guna" outlined square :dense="true" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-12 frame_cari">
                                        <span class="h_lable ">Harga</span>
                                        <q-input v-model="formAset.harga" outlined square :dense="true" type="number" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-12 frame_cari">
                                        <span class="h_lable ">Keterangan</span>
                                        <q-input v-model="formAset.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea" disable />
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="form.id_bmd === 2">
                                <div class="row q-col-gutter-sm">
                                    <div class="col-12 col-md-12 frame_cari frame_cari">
                                        <span class="h_lable ">Kode Pemilik</span>
                                        <q-input v-model="formAset.kodep" outlined square :dense="true" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-12 frame_cari">
                                        <span class="h_lable">Kode Aset</span>
                                        <q-select
                                            v-model="formAset.subSubId"
                                            use-input hide-selected fill-input
                                            input-debounce="300"
                                            :options="$store.state.list_sub_sub"
                                            option-value="kode"
                                            option-label="uraian"
                                            emit-value map-options
                                            @filter="autocomplete_getSubKegiatan"
                                            @focus="loadSubSubAwal"
                                            clearable outlined square dense disable
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
                                        <q-input v-model="formAset.no_reg" type="number" outlined square :dense="true" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-12 frame_cari frame_cari">
                                        <span class="h_lable ">Ruang</span>
                                        <q-input v-model="formAset.ruang" outlined square :dense="true" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable ">Tanggal Pembelian</span>
                                        <q-input v-model="formAset.tgl_beli" outlined square :dense="true" type="date" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable ">Tanggal Pembukuan</span>
                                        <q-input v-model="formAset.tgl_buku" outlined square :dense="true" type="date" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable ">Merk</span>
                                        <q-input v-model="formAset.merk" outlined square :dense="true" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable ">Type</span>
                                        <q-input v-model="formAset.type" outlined square :dense="true" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable ">No. Pabrik</span>
                                        <q-input v-model="formAset.no_pabrik" outlined square :dense="true" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable ">Bahan</span>
                                        <q-input v-model="formAset.bahan" outlined square :dense="true" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable ">No. Rangka</span>
                                        <q-input v-model="formAset.no_rangka" outlined square :dense="true" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable ">No. Mesin</span>
                                        <q-input v-model="formAset.no_mesin" outlined square :dense="true" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable ">No. BPKB</span>
                                        <q-input v-model="formAset.no_bpkb" outlined square :dense="true" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable ">No. Polisi</span>
                                        <q-input v-model="formAset.no_polisi" outlined square :dense="true" class="bg-white margin_btn" disable />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable">Asal Usul</span>
                                        <q-select
                                            v-model="formAset.asal_usul"
                                            :options="$store.state.list_asal"
                                            option-value="id"
                                            option-label="uraian"
                                            outlined square :dense="true"
                                            class="bg-white margin_btn"
                                            emit-value map-options disable
                                        />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable ">Kondisi</span>
                                        <q-select
                                            v-model="formAset.kondisi"
                                            :options="$store.state.list_kondisi"
                                            option-value="id"
                                            option-label="uraian"
                                            outlined square :dense="true"
                                            class="bg-white margin_btn"
                                            emit-value map-options disable
                                        />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable ">Harga</span>
                                        <q-input v-model="formAset.harga" outlined square :dense="true" class="bg-white margin_btn" type="number" disable />
                                    </div>
                                    <div class="col-12 col-md-6 frame_cari frame_cari">
                                        <span class="h_lable ">Masa Manfaat</span>
                                        <q-input v-model="formAset.manfaat" outlined square :dense="true" class="bg-white margin_btn" type="number" disable />
                                    </div>
                                    <div class="col-12 col-md-12 frame_cari">
                                        <span class="h_lable ">Nilai Sisa</span>
                                        <q-input v-model="formAset.nilai" outlined square :dense="true" class="bg-white margin_btn" type="number" disable />
                                    </div>
                                    <div class="col-12 col-md-12 frame_cari">
                                        <span class="h_lable ">Keterangan</span>
                                        <q-input v-model="formAset.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea" disable />
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="form.id_bmd === 3">
                                <div class="col-12 q-mt-md"><q-badge color="teal">Detail KIB C - Gedung & Bangunan</q-badge></div>
                            </template>
                            <!-- <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">Nomor BAST</span>
                                <q-input v-model="form.nomor" outlined square dense class="bg-white" />
                            </div>
                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">Tanggal</span>
                                <q-input v-model="form.tgl" type="date" outlined square dense class="bg-white" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Lampiran</span>
                                <q-file v-model="form.file" outlined square :dense="true" class="bg-white margin_btn">
                                    <template v-slot:prepend>
                                        <q-icon name="attach_file" />
                                    </template>
                                </q-file>
                            </div>
                            <div class="col-12 q-mt-md">
                                <div class="text-subtitle2 text-primary q-mb-xs">Data Pemakai Aset</div>
                                <q-separator q-mb-md />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Nama Pemakai</span>
                                <q-select
                                    v-model="form.penggunaId"
                                    :options="$store.state.list_pengguna"
                                    option-value="id"
                                    option-label="nama"
                                    emit-value map-options
                                    outlined square :dense="true"
                                    class="bg-white margin_btn"
                                />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Status Pemakai</span>
                                <q-input v-model="form.id_status" outlined square dense class="bg-white" disable />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Jabatan</span>
                                <q-input v-model="form.jabatan" outlined square dense class="bg-white" disable />
                            </div>
                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">NIK</span>
                                <q-input v-model="form.nik" outlined square dense class="bg-white" disable />
                            </div>
                            <div class="col-12 col-md-6 frame_cari">
                                <span class="h_lable">NIP</span>
                                <q-input v-model="form.nip" outlined square dense class="bg-white" disable />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Alamat</span>
                                <q-input v-model="form.alamat" outlined square :dense="true" class="bg-white margin_btn" type="textarea" disable />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable">Keterangan</span>
                                <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea" />
                            </div> -->
                        </div>
                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn :loading="btn_add" color="primary" label="Simpan" @click="addData()" />
                        <q-btn label="Batal" color="negative" v-close-popup />
                    </q-card-actions>
                </form>
            </q-card>
        </q-dialog>

        <q-dialog v-model="mdl_edit" persistent>
            <q-card class="mdl-md" style="min-width: 400px">
                <q-card-section class="bg-orange text-white">
                    <div class="text-h6">Edit Data</div>
                </q-card-section>

                <q-card-section class="q-pa-md">
                    <div class="row q-col-gutter-sm">
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nomor</span>
                            <q-input v-model="form.no" value="1" outlined square dense disable class="bg-white" />
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
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Merk</span>
                            <q-input v-model="form.merk" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Type</span>
                            <q-input v-model="form.type" outlined square dense class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Ukuran (cc)</span>
                            <q-input v-model="form.ukuran" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Luas (M2)</span>
                            <q-input v-model="form.luas" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Panjang (km)</span>
                            <q-input v-model="form.panjang" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Lebar (Meter)</span>
                            <q-input v-model="form.lebar" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Jumlah</span>
                            <q-input v-model="form.jumlah" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Harga Satuan</span>
                            <q-input v-model="form.harga" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Total</span>
                            <q-input v-model="form.total" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Keterangan</span>
                            <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn"
                                type="textarea" />
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
                <q-card-section class="bg-blue-3 text-white flex items-center">
                    <div class="text-h6">Detil Aset</div>
                </q-card-section>

                <q-separator />

                <q-card-section class="q-gutter-md">
                    <div>
                        <q-img :src="file_path+formAset.file" spinner-color="primary" style="max-height: 400px;
                            border: 1px solid #ddd;
                            border-radius: 6px;" />
                    </div>

                    <div>
                        <div class="text-subtitle1 text-bold q-mb-sm">Informasi Aset</div>
                        <q-list dense bordered separator class="rounded-borders">
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Ruang</b></q-item-section>
                                <q-item-section>{{ formAset.ruang }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Kode Aset</b></q-item-section>
                                <q-item-section>{{ formAset.subSubId }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Tanggal Perolehan</b></q-item-section>
                                <q-item-section>{{ UMUM.tglConvert(formAset.tgl_beli) }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Merk/Type</b></q-item-section>
                                <q-item-section>{{ formAset.merk }}/{{ formAset.type }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>No. Pabrik</b></q-item-section>
                                <q-item-section>{{ formAset.no_pabrik }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Bahan</b></q-item-section>
                                <q-item-section>{{ formAset.bahan }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Nomor Rangka</b></q-item-section>
                                <q-item-section>{{ formAset.no_rangka }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Nomor Mesin</b></q-item-section>
                                <q-item-section>{{ formAset.no_mesin }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>No. BPKB</b></q-item-section>
                                <q-item-section>{{ formAset.no_bpkb }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>No. Polisi</b></q-item-section>
                                <q-item-section>{{ formAset.no_polisi }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Asal Usul</b></q-item-section>
                                <q-item-section>{{ formAset.asal_usul }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Kondisi</b></q-item-section>
                                <q-item-section>{{ formAset.kondisi }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Harga</b></q-item-section>
                                <q-item-section>Rp. {{ UMUM.formatRupiah(formAset.harga) }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Masa Manfaat</b></q-item-section>
                                <q-item-section>{{ formAset.manfaat }} Tahun</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Nilai Sisa</b></q-item-section>
                                <q-item-section>{{ formAset.nilai }}</q-item-section>
                            </q-item>

                            <q-item>
                                <q-item-section class="col-3 text-weight-medium word-wrap"><b>Keterangan</b></q-item-section>
                                <q-item-section>{{ formAset.keterangan }}</q-item-section>
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
    </div>
</template>

<script>

import FETCHING from '../../library/fetching'
import DATA_MASTER from '../../library/dataMaster'
import UMUM from '../../library/umum'

import { DATA_RUANGAN } from '../../dataDummy/kir' // sesuaikan path

export default {
    props: ["pengadaanId"],
    data() {
        return {
            optionsSubSub: [],
            form: {
                id: '',
                pengadaanId: this.pengadaanId,
                subSubId: '',
                no: '',
                merk: '',
                type: '',
                ukuran: '',
                luas: '',
                panjang: '',
                lebar: '',
                jumlah: '',
                harga: '',
                total: '',
                keterangan: '',
            },

            formAset:{
                kodep: '',
                subSubId: '',
                no_reg: '',
                tgl_beli: '',
                tgl_buku: '',
                harga: '',
                keterangan: '',

                luas: '',
                alamat: '',
                id_hak: '',
                no_sert: '',
                asal_usul: '',
                guna: '',

                ruang: '',
                merk: '',
                type: '',
                no_pabrik: '',
                bahan: '',
                no_rangka: '',
                no_mesin: '',
                no_bpkb: '',
                no_polisi: '',
                asal_usul: '',
                id_kondisi: '',
                manfaat: '',
                nilai: '',
            },

            list_data: [],
            list_aset: [],
            list_bmd: [
                {id: 1, uraian: 'KIB A - Tanah'},
                {id: 2, uraian: 'KIB B - Peralatan dan Mesin'},
                {id: 3, uraian: 'KIB C - Gedung dan Bangunan'},
                {id: 4, uraian: 'KIB D - Jalan, Irigasi, dan Jaringan'},
                {id: 5, uraian: 'KIB E - Aset Tetap Lainnya'},
                {id: 6, uraian: 'KIB F - Konstruksi Dalam Pengerjaan'},
            ],

            page_first: 1,
            page_last: 0,
            page_limit: 10,
            cari_value: "",
            file_old: "",
            cek_load_data: true,
            file_path: this.$store.state.url.URL_APP + "uploads/",

            mdl_add: false,
            mdl_edit: false,
            mdl_remove: false,
            mdl_lihat: false,
            btn_add: false,

            FETCHING: FETCHING,
            DATA_MASTER: DATA_MASTER,
            UMUM: UMUM,
        }
    },
    watch: {
        'form.asetId'(id) {
            if (!id) {
                this.form.jenis_kib = null
                return
            }
            const aset = this.list_aset.find(
                p => String(p.id) === String(id)
            )
            console.log("=============");
            console.log(aset);
            console.log("=============");
            if (!aset) return

            this.formAset.kodep = aset.kodep
            this.formAset.subSubId = aset.subSubId
            this.formAset.no_reg = aset.no_reg
            this.formAset.tgl_beli = aset.tgl_beli ? aset.tgl_beli.split('T')[0] : ''
            this.formAset.tgl_buku = aset.tgl_buku ? aset.tgl_buku.split('T')[0] : ''
            this.formAset.luas = aset.luas
            this.formAset.alamat = aset.alamat
            this.formAset.hak_tanah = aset.hak_tanah
            this.formAset.no_sert = aset.no_sert
            this.formAset.asal_usul = aset.asal_usul
            this.formAset.guna = aset.guna
            this.formAset.harga = aset.harga
            this.formAset.keterangan = aset.keterangan
            this.formAset.file = aset.file

            this.formAset.ruang = aset.ruang
            this.formAset.merk = aset.merk
            this.formAset.type = aset.type
            this.formAset.no_pabrik = aset.no_pabrik
            this.formAset.bahan = aset.bahan
            this.formAset.no_rangka = aset.no_rangka
            this.formAset.no_mesin = aset.no_mesin
            this.formAset.no_bpkb = aset.no_bpkb
            this.formAset.no_polisi = aset.no_polisi
            this.formAset.asal_usul = aset.asal_usul
            this.formAset.kondisi = aset.kondisi
            this.formAset.manfaat = aset.manfaat
            this.formAset.nilai = aset.nilai

        },
        'form.id_bmd'(val) {
            if (!val) return

            if (val == 1) {
                this.getKibA()
            }

            if (val == 2) {
                this.getKibB()
            }
        },
        // 'form.asetId'(val) {
        //     const selected = this.list_aset.find(item => item.id === val)

        //     if (selected) {
        //         this.form.subSubId = selected.kode_aset
        //     }

        //     // console.log("KODE ASET:", this.form.subSubId)
        // },
    },
    methods: {
        getView: function () {
            console.log("=================");
            console.log(this.form.pengadaanId);
            console.log("=================");

            this.$store.commit("shoWLoading");
            fetch(this.$store.state.url.URL_ASET + "view", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({
                    data_ke: this.page_first,
                    cari_value: this.cari_value,
                    pengadaanId: this.form.pengadaanId
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
            fetch(this.$store.state.url.URL_ASET + "addData", {
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
            fetch(this.$store.state.url.URL_ASET + "editData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify(this.form)
            }).then(res_data => {
                this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
                this.getView();
            })
        },

        removeData: function (E) {
            fetch(this.$store.state.url.URL_ASET + "removeData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({
                    id: this.form.id
                })
            }).then(res_data => {
                this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
                this.getView();
            });

        },

        selectData: function (data) {
            this.form.id = data.id;
            this.form.pengadaanId = data.pengadaanId;
            this.form.akunId = data.akunId;
            this.form.kelompokId = data.kelompokId;
            this.form.jenisId = data.jenisId;
            this.form.objekId = data.objekId;
            this.form.rincianId = data.rincianId;
            this.form.subId = data.subId;
            this.form.subSubId = data.subSubId;
            this.form.uraian = data.uraian;
            this.form.no = data.no;
            this.form.merk = data.merk;
            this.form.type = data.type;
            this.form.ukuran = data.ukuran;
            this.form.luas = data.luas;
            this.form.panjang = data.panjang;
            this.form.lebar = data.lebar;
            this.form.jumlah = data.jumlah;
            this.form.harga = data.harga;
            this.form.total = data.total;
            this.form.keterangan = data.keterangan;
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

        indexing: function (index) {
            var idx = ((this.page_first - 1) * this.page_limit) + index
            return idx;
        },
        
        cari_data: function () {
            this.page_first = 1;
            this.getView();
        },

        // ====================================== PAGINATE ====================================

        // ====================================== GET KIB ====================================
        getKibA() {
            fetch(this.$store.state.url.URL_TANAH + "kib_a", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({})
            })
                .then(res => res.json())
                .then(res => {
                    // console.log("DATA KIB A:", res.data)

                    // mapping ke dropdown
                    this.list_aset = res.data.map(item => ({
                        ...item,
                        id: item.subSubId,
                        uraian: item.keterangan,
                    }))
                })
            .catch(err => {
                console.log("ERROR:", err)
            })
        },
        getKibB() {
            fetch(this.$store.state.url.URL_PERALATAN + "kib_b", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({})
            })
                .then(res => res.json())
                .then(res => {
                    console.log("DATA KIB B:", res)

                    // mapping ke dropdown
                    this.list_aset = res.data.map(item => ({
                        ...item,
                        id: item.subSubId,
                        uraian: item.keterangan,
                    }))
                })
            .catch(err => {
                console.log("ERROR:", err)
            })
        },
        // ====================================== GET KIB ====================================




        loadDummy: function() {
            let hasil = [];

            DATA_RUANGAN.forEach((ruangan) => {
                ruangan.aset.forEach((aset, index) => {
                    hasil.push({
                        id: ruangan.id_kir + '-' + index,
                        subSubId: ruangan.kode_ruangan,
                        uraian: aset.nama_barang,
                        no_register: aset.nomor_register,
                        merk: '-',
                        bahan: '-',
                        tahun: '-',
                        asal_usul: ruangan.nama_ruangan,
                        jumlah: aset.jumlah,
                        harga: aset.harga,
                        kondisi: aset.kondisi,
                        keterangan: ruangan.penanggung_jawab,
                    });
                });
            });

            this.list_data = hasil
        },

    },

    mounted() {
        // this.getView();
        this.loadDummy();

        DATA_MASTER.getAset();
    },
}
</script>