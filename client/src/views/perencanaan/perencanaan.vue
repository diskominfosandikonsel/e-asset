<template>
    <div class="about" style="padding:15px">
        <q-card bordered class="my-card">
            <q-card-section class="bg-blue-3 text-white">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="text-h6 h_titleHead">Perencanaan</div>
                        <div class="text-subtitle2">Perencanaan</div>
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
                <div class="tbl_responsive">
                    <!-- =================================================== KONTENT =========================================================== -->
                    <table width="100%">
                        <thead>
                            <tr class="h_table_head bg-blue-2">
                                <th class="text-center" width="5%">No</th>
                                <th class="text-center" width="20%">Kode Aset</th>
                                <th class="text-center" width="25%">Nama Aset</th>
                                <th class="text-center" width="25%">Keterangan</th>
                                <th class="text-center" width="15%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="h_table_body" v-for="(data, index) in dataDummy" :key="data.id">
                                <td class="text-center">{{ index + 1 }}.</td>
                                <td>{{ data.kd_aset }}</td>
                                <td>{{ data.nm_aset }}</td>
                                <td>{{ data.keterangan }}</td>
                                <td class="text-center">
                                    <q-btn-group flat>
                                        <q-btn glossy color="blue" icon="search" size="sm"
                                            @click="mdl_lihat = true, selectData(data)">
                                            <q-tooltip>Lihat Data</q-tooltip>
                                        </q-btn>
                                        <q-btn glossy color="orange" icon="edit" size="sm" @click="mdl_edit = true">
                                            <q-tooltip>Edit Data</q-tooltip>
                                        </q-btn>
                                        <q-btn glossy color="red" icon="delete" size="sm" @click="mdl_remove = true">
                                            <q-tooltip>Hapus Data</q-tooltip>
                                        </q-btn>
                                    </q-btn-group>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- =================================================== KONTENT =========================================================== -->
                </div>
                <hr class="hrpagin2">

                <div class="flex flex-center">
                    <q-pagination @click="getView()" v-model="page_first" :max="page_last" :max-pages="4"
                        color="orange-14" :direction-links="true" :boundary-links="true" icon-first="skip_previous"
                        icon-last="skip_next" icon-prev="fast_rewind" icon-next="fast_forward">
                    </q-pagination>
                </div>
            </q-card-section>

            <!-- <q-card-section>
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
            </q-card-section> -->
        </q-card>

        <!-- =================================================== MODAL =========================================================== -->
         <q-dialog v-model="mdl_add" persistent>
            <q-card class="mdl-md" style="min-width: 400px">
                <q-card-section class="bg-primary text-white">
                    <div class="text-h6">Tambah Data</div>
                </q-card-section>

                <q-card-section class="q-pa-md">
                    <div class="row q-col-gutter-sm">
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Nomor (auto increment)</span>
                            <q-input v-model="form.no" value="1" outlined square dense disable class="bg-white" />
                        </div>
                        <div class="col-12 frame_cari">
                            <span class="h_lable">Kode Aset</span>
                            <div class="grid-7-kolom q-mt-xs">
                                <!-- ASET -->
                                <q-select
                                    v-model="form.aset_id"
                                    :options="listAset"
                                    option-value="kode"
                                    :option-label="o => `${o.kode} - ${o.uraian}`"
                                    emit-value map-options outlined square dense
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.aset_id"
                                    :label="form.aset_id ? '' : '00'"
                                    stack-label="false"
                                />

                                <!-- KELOMPOK -->
                                <q-select
                                    v-model="form.kelompok_id"
                                    :options="listKelompok"
                                    option-value="kode"
                                    :option-label="o => `${o.kode} - ${o.uraian}`"
                                    emit-value map-options outlined square dense
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.kelompok_id"
                                    :label="form.kelompok_id ? '' : '00'"
                                    stack-label="false"
                                />

                                <!-- JENIS -->
                                <q-select
                                    v-model="form.jenis_id"
                                    :options="listJenis"
                                    option-value="kode"
                                    :option-label="o => `${o.kode} - ${o.uraian}`"
                                    emit-value map-options outlined square dense
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.jenis_id"
                                    :label="form.jenis_id ? '' : '00'"
                                    stack-label="false"
                                />

                                <!-- OBJEK -->
                                <q-select
                                    v-model="form.objek_id"
                                    :options="listObjek"
                                    option-value="kode"
                                    :option-label="o => `${o.kode} - ${o.uraian}`"
                                    emit-value map-options outlined square dense
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.objek_id"
                                    :label="form.objek_id ? '' : '00'"
                                    stack-label="false"
                                />

                                <!-- RINCIAN -->
                                <q-select
                                    v-model="form.rincian_id"
                                    :options="listRincian"
                                    option-value="kode"
                                    :option-label="o => `${o.kode} - ${o.uraian}`"
                                    emit-value map-options outlined square dense
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.rincian_id"
                                    :label="form.rincian_id ? '' : '00'"
                                    stack-label="false"
                                />

                                <!-- SUB RINCIAN -->
                                <q-select
                                    v-model="form.sub_rincian_id"
                                    :options="listRincian"
                                    option-value="kode"
                                    :option-label="o => `${o.kode} - ${o.uraian}`"
                                    emit-value map-options outlined square dense
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.sub_rincian_id"
                                    :label="form.sub_rincian_id ? '' : '00'"
                                    stack-label="false"
                                />
                            </div>
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Merk</span>
                            <q-input v-model="form.merk" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Type</span>
                            <q-input v-model="form.type" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Ukuran (cc)</span>
                            <q-input v-model="form.ukuran" outlined square dense type="number" class="bg-white" />
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
                            <span class="h_lable ">Rekening</span>
                            <q-input v-model="form.rekening" outlined square dense class="bg-white" />
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
                    <q-btn :loading="btn_add" color="primary" label="Simpan" />
                    <q-btn label="Batal" color="negative" v-close-popup />
                </q-card-actions>
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
                            <span class="h_lable">Nomor (auto increment)</span>
                            <q-input v-model="form.no" value="1" outlined square dense disable class="bg-white" />
                        </div>
                        <div class="col-12 frame_cari">
                            <span class="h_lable">Kode Aset</span>
                            <div class="grid-7-kolom q-mt-xs">
                                <!-- ASET -->
                                <q-select
                                    v-model="form.aset_id"
                                    :options="listAset"
                                    option-value="kode"
                                    :option-label="o => `${o.kode} - ${o.uraian}`"
                                    emit-value map-options outlined square dense
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.aset_id"
                                    :label="form.aset_id ? '' : '00'"
                                    stack-label="false"
                                />

                                <!-- KELOMPOK -->
                                <q-select
                                    v-model="form.kelompok_id"
                                    :options="listKelompok"
                                    option-value="kode"
                                    :option-label="o => `${o.kode} - ${o.uraian}`"
                                    emit-value map-options outlined square dense
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.kelompok_id"
                                    :label="form.kelompok_id ? '' : '00'"
                                    stack-label="false"
                                />

                                <!-- JENIS -->
                                <q-select
                                    v-model="form.jenis_id"
                                    :options="listJenis"
                                    option-value="kode"
                                    :option-label="o => `${o.kode} - ${o.uraian}`"
                                    emit-value map-options outlined square dense
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.jenis_id"
                                    :label="form.jenis_id ? '' : '00'"
                                    stack-label="false"
                                />

                                <!-- OBJEK -->
                                <q-select
                                    v-model="form.objek_id"
                                    :options="listObjek"
                                    option-value="kode"
                                    :option-label="o => `${o.kode} - ${o.uraian}`"
                                    emit-value map-options outlined square dense
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.objek_id"
                                    :label="form.objek_id ? '' : '00'"
                                    stack-label="false"
                                />

                                <!-- RINCIAN -->
                                <q-select
                                    v-model="form.rincian_id"
                                    :options="listRincian"
                                    option-value="kode"
                                    :option-label="o => `${o.kode} - ${o.uraian}`"
                                    emit-value map-options outlined square dense
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.rincian_id"
                                    :label="form.rincian_id ? '' : '00'"
                                    stack-label="false"
                                />

                                <!-- SUB RINCIAN -->
                                <q-select
                                    v-model="form.sub_rincian_id"
                                    :options="listRincian"
                                    option-value="kode"
                                    :option-label="o => `${o.kode} - ${o.uraian}`"
                                    emit-value map-options outlined square dense
                                    class="bg-white input-aset-kecil aset-kode-select"
                                    :display-value="form.sub_rincian_id"
                                    :label="form.sub_rincian_id ? '' : '00'"
                                    stack-label="false"
                                />
                            </div>
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Merk</span>
                            <q-input v-model="form.merk" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable">Type</span>
                            <q-input v-model="form.type" outlined square dense type="number" class="bg-white" />
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable">Ukuran (cc)</span>
                            <q-input v-model="form.ukuran" outlined square dense type="number" class="bg-white" />
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
                            <span class="h_lable ">Rekening</span>
                            <q-input v-model="form.total" outlined square dense class="bg-white" />
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
                <!-- Header -->
                <q-card-section class="bg-blue-3 text-white flex items-center">
                    <div class="text-h6">Detil Aset</div>
                </q-card-section>

                <q-separator />

                <!-- Body -->
                <q-card-section class="q-gutter-md">
                    <div>
                        <div class="text-subtitle1 text-bold q-mb-sm">Informasi Aset</div>
                        <q-list dense bordered separator class="rounded-borders">
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Kode Aset</b></q-item-section>
                                <q-item-section>{{ form.kd_aset }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Nama Aset</b></q-item-section>
                                <q-item-section>{{ form.nm_aset }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Merk</b></q-item-section>
                                <q-item-section>{{ form.merk }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Type</b></q-item-section>
                                <q-item-section>{{ form.type }} m2</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Ukuran</b></q-item-section>
                                <q-item-section>{{ form.ukuran }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="col-3 text-weight-medium"><b>Harga</b></q-item-section>
                                <q-item-section>{{ form.harga }}</q-item-section>
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
                no: '',
                merk: '',
                type: '',
                ukuran: '',
                jumlah: '',
                harga: '',
                total: '',
                rekening: '',
                keterangan: '',
                file: null,
            },



            dataDummy: [
                {
                    kd_aset: "1.3.2.10.01.02.002.001",
                    nm_aset: "Lap Top",
                    merk: "Apple",
                    type: "MacBook Pro M2",

                    ukuran: 0,        // cc (tidak relevan utk laptop)
                    luas: 0,          // m2
                    panjang: 0,       // km
                    lebar: 0,         // meter

                    jumlah: 1,
                    harga: 32000000,
                    total: 32000000,

                    keterangan: "Laptop MacBook Pro M2 untuk kebutuhan programmer an. Iksan"
                },
                {
                    kd_aset: "1.3.2.10.01.02.002.002",
                    nm_aset: "Lap Top",
                    merk: "Apple",
                    type: "MacBook Pro M2",

                    ukuran: 0,        // cc (tidak relevan utk laptop)
                    luas: 0,          // m2
                    panjang: 0,       // km
                    lebar: 0,         // meter

                    jumlah: 1,
                    harga: 32000000,
                    total: 32000000,

                    keterangan: "Laptop MacBook Pro M2 untuk kebutuhan programmer an. Hidayat"
                },
                {
                    kd_aset: "1.3.2.10.01.02.002.003",
                    nm_aset: "Lap Top",
                    merk: "Apple",
                    type: "MacBook Pro M2",

                    ukuran: 0,        // cc (tidak relevan utk laptop)
                    luas: 0,          // m2
                    panjang: 0,       // km
                    lebar: 0,         // meter

                    jumlah: 1,
                    harga: 32000000,
                    total: 32000000,

                    keterangan: "Laptop MacBook Pro M2 untuk kebutuhan programmer an. Riswan M. Rizal"
                },
                {
                    kd_aset: "1.3.2.10.01.02.002.004",
                    nm_aset: "Lap Top",
                    merk: "Apple",
                    type: "MacBook Pro M2",

                    ukuran: 0,        // cc (tidak relevan utk laptop)
                    luas: 0,          // m2
                    panjang: 0,       // km
                    lebar: 0,         // meter

                    jumlah: 1,
                    harga: 32000000,
                    total: 32000000,

                    keterangan: "Laptop MacBook Pro M2 untuk kebutuhan programmer an. Asrif Fajar"
                },
            ],

            listAset: [
                {
                    "id": 1,
                    "kode": "01",
                    "uraian": "Aset",
                },
            ],

            listKelompok: [
                {
                    "id": 1,
                    "aset_id": "01",
                    "kode": "03",
                    "uraian": "Aset Tetap",
                },
                {
                    "id": 2,
                    "aset_id": "01",
                    "kode": "05",
                    "uraian": "Aset Lainnya",
                },
            ],

            listJenis: [
                {
                    "id": 1,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "kode": "01",
                    "uraian": "TANAH",
                },
                {
                    "id": 2,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "kode": "02",
                    "uraian": "PERALATAN DAN MESIN",
                },
                {
                    "id": 3,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "kode": "03",
                    "uraian": "GEDUNG DAN BANGUNAN",
                },
                {
                    "id": 4,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "kode": "04",
                    "uraian": "JALAN, JARINGAN DAN IRIGASI",
                },
                {
                    "id": 5,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "kode": "05",
                    "uraian": "ASET TETAP LAINNYA",
                },
                {
                    "id": 6,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "kode": "06",
                    "uraian": "KONSTRUKSI DALAM PENGERJAAN",
                },
                {
                    "id": 7,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "kode": "07",
                    "uraian": "AKUMULASI PENYUSUTAN",
                },
            ],

            listObjek: [
                {
                    "id": 1,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "kode": "01",
                    "uraian": "ALAT BESAR",
                },
                {
                    "id": 2,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "kode": "02",
                    "uraian": "ALAT ANGKUTAN",
                },
                {
                    "id": 3,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "kode": "03",
                    "uraian": "ALAT BENGKEL DAN ALAT UKUR",
                },
                {
                    "id": 4,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "kode": "04",
                    "uraian": "ALAT PERTANIAN",
                },
            ],

            listRincian: [
                {
                    "id": 1,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "01",
                    "kode": "01",
                    "uraian": "ALAT BESAR DARAT",
                },
                {
                    "id": 2,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "01",
                    "kode": "02",
                    "uraian": "ALAT BESAR APUNG",
                },
                {
                    "id": 3,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "01",
                    "kode": "03",
                    "uraian": "ALAT BANTU",
                },
                {
                    "id": 4,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "kode": "01",
                    "uraian": "ALAT ANGKUTAN DARAT BERMOTOR",
                },
                {
                    "id": 5,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "kode": "02",
                    "uraian": "ALAT ANGKUTAN DARAT TAK BERMOTOR",
                },
                {
                    "id": 6,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "kode": "03",
                    "uraian": "ALAT ANGKUTAN APUNG BERMOTOR",
                },
                {
                    "id": 7,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "kode": "04",
                    "uraian": "ALAT ANGKUTAN APUNG TAK BERMOTOR",
                },
            ],

            listSubRincian: [
                {
                    "id": 1,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "kode": "01",
                    "uraian": "KENDARAAN DINAS BERMOTOR PERORANGAN",
                },
                {
                    "id": 2,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "kode": "02",
                    "uraian": "KENDARAAN BERMOTOR PENUMPANG",
                },
                {
                    "id": 3,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "kode": "03",
                    "uraian": "KENDARAAN BERMOTOR ANGKUTAN BARANG",
                },
                {
                    "id": 4,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "kode": "04",
                    "uraian": "KENDARAAN BERMOTOR BERODA DUA",
                },
                {
                    "id": 5,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "kode": "05",
                    "uraian": "KENDARAAN BERMOTOR BERODA TIGA",
                },
            ],

            listSubRincianObjek: [
                {
                    "id": 1,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "01",
                    "kode": "001",
                    "uraian": "Sedan",
                },
                {
                    "id": 2,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "01",
                    "kode": "002",
                    "uraian": "Jeep",
                },
                {
                    "id": 3,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "01",
                    "kode": "003",
                    "uraian": "Station Wagon",
                },
                {
                    "id": 4,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "01",
                    "kode": "004",
                    "uraian": "Multi Purpose Vehicle (MPV)",
                },
                {
                    "id": 5,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "01",
                    "kode": "005",
                    "uraian": "Sport Utility Vehicle (SUV)",
                },
                {
                    "id": 6,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "02",
                    "kode": "001",
                    "uraian": "Bus ( Penumpang 30 Orang Keatas )",
                },
                {
                    "id": 7,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "02",
                    "kode": "002",
                    "uraian": "Micro Bus ( Penumpang 15 S/D 29 Orang )",
                },
                {
                    "id": 8,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "02",
                    "kode": "003",
                    "uraian": "Mini Bus ( Penumpang 14 Orang Kebawah )",
                },
                {
                    "id": 9,
                    "aset_id": "01",
                    "kelompok_id": "03",
                    "jenis_id": "02",
                    "objek_id": "02",
                    "rincian_id": "01",
                    "sub_rincian_id": "02",
                    "kode": "004",
                    "uraian": "Kendaraan Lapis Baja",
                },
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
            mdl_lihat: false,
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
            this.form.no = data.no;
            this.form.merk = data.merk;
            this.form.type = data.type;
            this.form.ukuran = data.ukuran;
            this.form.jumlah = data.jumlah;
            this.form.harga = data.harga;
            this.form.total = data.total;
            this.form.rekening = data.rekening;
            this.form.keterangan = data.keterangan;
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