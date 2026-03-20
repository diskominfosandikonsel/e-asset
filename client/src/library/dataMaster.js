// import {store1} from '../store/index's

var DataStore = require('../store');
var store = DataStore.default

const fetchPOST = () => {
    return store.state.kamio
}



const getInstansi = (kabupaten_id) => {
    // console.log(kecamatan)
    fetch(store.state.url.URL_simpeg_instansi + "list", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
            kabupaten_id: 'kabupaten_id'
        })
    })
        .then(res => res.json())
        .then(res_data => {
            // console.log(res_data)
            store.state.list_instansi = res_data
        });
}


const getUnitKerja = (instansi) => {
    // console.log(kecamatan)
    fetch(store.state.url.URL_simpeg_unit_kerja + "list", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
            instansi: instansi
        })
    })
        .then(res => res.json())
        .then(res_data => {
            store.state.list_unit_kerja = res_data
            // console.log(res_data)
        });
}

const getBiodata = (sub_unit_kerja) => {
    // console.log(kecamatan)
    fetch(store.state.url.URL_simpeg_biodata + "list", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
            unit_kerja: sub_unit_kerja
        })
    })
        .then(res => res.json())
        .then(res_data => {
            store.state.list_biodata = res_data
            // console.log(res_data)
        });
}

const getHak = () => {
    fetch(store.state.url.URL_DM_HAK + "list", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({

        })
    }).then((res) => res.json()).then((res_data) => {
        store.state.list_hak = res_data
        // console.log(res_data)
    })
}

const getAsal = () => {
    fetch(store.state.url.URL_DM_ASAL_USUL + "list", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({

        })
    }).then((res) => res.json()).then((res_data) => {
        store.state.list_asal = res_data
        // console.log(res_data)
    })
}

const getKondisi = () => {
    fetch(store.state.url.URL_DM_KONDISI + "list", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({

        })
    }).then((res) => res.json()).then((res_data) => {
        store.state.list_kondisi = res_data
        // console.log(res_data)
    })
}

const getAset = () => {
    fetch(store.state.url.URL_ASET + "akun", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({

        })
    }).then((res) => res.json()).then((res_data) => {
        store.state.list_aset = res_data.data
        // console.log(res_data)
    })
}

const getKelompok = (akunId) => {
    fetch(store.state.url.URL_ASET + "kelompok", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
            akunId : akunId,
        })
    }).then((res) => res.json()).then((res_data) => {
        store.state.list_kelompok = res_data.data
        // console.log(res_data)
    })
}

const getJenis = (kelompokId) => {
    fetch(store.state.url.URL_ASET + "jenis", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
            kelompokId : kelompokId,
        })
    }).then((res) => res.json()).then((res_data) => {
        store.state.list_jenis = res_data.data
        // console.log(res_data)
    })
}

const getObjek = (jenisId) => {
    fetch(store.state.url.URL_ASET + "objek", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
            jenisId : jenisId,
        })
    }).then((res) => res.json()).then((res_data) => {
        store.state.list_objek = res_data.data
        // console.log(res_data)
    })
}

const getRincian = (objekId) => {
    fetch(store.state.url.URL_ASET + "rincian", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
            objekId : objekId,
        })
    }).then((res) => res.json()).then((res_data) => {
        store.state.list_rincian = res_data.data
        // console.log(res_data)
    })
}

const getSub = (rincianId) => {
    fetch(store.state.url.URL_ASET + "sub", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
            rincianId : rincianId,
        })
    }).then((res) => res.json()).then((res_data) => {
        store.state.list_sub = res_data.data
        // console.log(res_data)
    })
}

const getSubSub = (subId) => {
    fetch(store.state.url.URL_ASET + "subSub", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
            subId : subId,
        })
    }).then((res) => res.json()).then((res_data) => {
        store.state.list_sub_sub = res_data.data
        // console.log(res_data)
    })
}

const getPengguna = () => {
    fetch(store.state.url.URL_PENGGUNA + "pengguna", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({

        })
    }).then((res) => res.json()).then((res_data) => {
        store.state.list_pengguna = res_data.data
        // console.log(res_data)
    })
}




module.exports = {
    fetchPOST: fetchPOST,

    getInstansi: getInstansi,
    getUnitKerja: getUnitKerja,
    getBiodata: getBiodata,

    getHak: getHak,
    getAsal: getAsal,
    getKondisi: getKondisi,

    getAset: getAset,
    getKelompok: getKelompok,
    getJenis: getJenis,
    getObjek: getObjek,
    getRincian: getRincian,
    getSub: getSub,
    getSubSub: getSubSub,

    getPengguna: getPengguna,

}