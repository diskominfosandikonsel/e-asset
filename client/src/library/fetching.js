// import Swal from 'sweetalert2'
const Swal = require('sweetalert2')
var DataStore = require('../store');
var store = DataStore.default;
var storex = store.state


const getMasterMenu = async () => {
    return new Promise(resolve => {
        fetch(storex.url.URL_DM_KLP_USERS + "listAdd", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
            }
        })
            .then(res => res.json())
            .then(res_data => {
                // console.log(res_data)
                resolve(res_data)

            });
    })
}

// ini buat ambil menu pada saat edit data
const postMasterMenu = async (id) => {
    return new Promise(resolve => {
        fetch(storex.url.URL_DM_KLP_USERS + "listEdit", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                menu_klp_id: id,
            })
        })
            .then(res => res.json())
            .then(res_data => {
                // console.log(res_data)
                resolve(res_data)

            });
    })
}


const postMasterKlpMenu = async () => {
    return new Promise(resolve => {
        fetch(storex.url.URL_DM_KLP_USERS + "list", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                menu_klp_id: 'id',
            })
        })
            .then(res => res.json())
            .then(res_data => {
                console.log(res_data)
                resolve(res_data)

            });
    })
}


const postMasterMenuGetSideBar = async (id) => {
    return new Promise(resolve => {
        fetch(storex.url.URL_DM_KLP_USERS + "listSidebar", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                side_bar: true,
                menu_klp_id: id,
            })
        })
            .then(res => res.json())
            .then(res_data => {
                // console.log(res_data)
                resolve(res_data)

            });
    })
}

// const getSubKegiatan = (val) => {
//     fetch(store.state.url.URL_ASET + "subSubList", {
//         method: "POST",
//         headers: {
//             "content-type": "application/json",
//             authorization: "kikensbatara " + localStorage.token
//         },
//         body: JSON.stringify({
//             val: val,
//         })
//     })
//     .then(res => res.json())
//     .then(res_data => {
//         store.state.list_sub_sub = res_data.map(item => ({
//             kode: item.kode,
//             uraian: item.kode + " - " + item.uraian
//         }))
//     });
// }

const getSubKegiatan = (keyword = '') => {
    let url = store.state.url.URL_DM_KODE_AKUN + "subSub";

    // kalau ada input filter
    if (keyword) {
        url += "?q=" + encodeURIComponent(keyword);
    }

    fetch(url, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
        }
    })
    .then(res => res.json())
    .then(res_data => {
        // console.log("SUBSUB:", res_data.data);

        store.state.list_sub_sub = res_data.data.map(item => ({
            kode: item.kode,
            uraian: item.kode + " - " + item.uraian
        }));
    });
};

const getPengguna = (val) => {
    fetch(store.state.url.URL_PENGGUNA + "pengguna", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
            val: val,
        })
    })
    .then(res => res.json())
    .then(res_data => {
        console.log(res_data);
        // store.state.list_sub_sub = res_data
    });
}



// ====================================== CONTOH AUTOCOMPLETE ====================================
const getContohAtocomplete = (val) => {

    fetch(storex.url.checkAuth + "autocomplete_db", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
            val: val,
        })
    })
        .then(res => res.json())
        .then(res_data => {

            storex.list_contoh_autocomplete = res_data
        });
}

// ====================================== CONTOH AUTOCOMPLETE ====================================






module.exports = {

    getMasterMenu: getMasterMenu,
    postMasterMenu: postMasterMenu,
    postMasterMenuGetSideBar: postMasterMenuGetSideBar,
    postMasterKlpMenu: postMasterKlpMenu,
    getContohAtocomplete: getContohAtocomplete,
    getSubKegiatan: getSubKegiatan,
    getPengguna: getPengguna,
}