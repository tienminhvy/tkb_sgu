function xoaPhanTu(btn) {
    let idToDel = btn.dataset.id_to_delete;
    let sectionToDel = document.querySelector(`[data-id="${idToDel}"]`);
    sectionToDel.remove();
    dem--;
}
function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
        //Firefox requires the link to be in the body
        document.body.appendChild(link);
        //simulate click
        link.click();
        //remove the link when done
        document.body.removeChild(link);
    } else
        window.open(uri);
}
document.getElementById('chuptkb').addEventListener('click', e => {
    let tkb = document.getElementById('tkb');
    html2canvas(tkb).then(function(canvas) {
        let y,m,d,h,p,s;
        const date = new Date();
        y = date.getFullYear();
        m = date.getMonth()+1;
        d = date.getDate();
        h = date.getHours();
        p = date.getMinutes();
        s = date.getSeconds();
        saveAs(canvas.toDataURL(), `tkb-${y}-${m}-${d}-${h}-${p}-${s}.png`);
        tkb.removeAttribute('style');
    });
})
// Khai bao
let them_mon = document.getElementById('them_mon');
let khungNhap = document.getElementById('nhap');
let ph_tu,ten_mon,thu_cua_ngay,tiet_bat_dau,so_tiet,thong_tin_mon,result;

let template = `<div class="clear"></div><div class="input">
    <input type="text" class="ten_mon" placeholder="Tên môn học">
    <input type="number" min="2" max="8" class="thu_cua_ngay" placeholder="Thứ (2->7)">
    <input type="number" min="1" max="14" class="tiet_bat_dau" placeholder="Tiết bắt đầu">
    <input type="number" min="1" class="so_tiet" placeholder="Số tiết">
</div>`;
let template_matran = `<div class="clear"></div><div class="input">
    <input type="text" class="ten_mon" placeholder="Tên môn học">
    <input type="text" class="thong_tin_mon" placeholder="Cột 1: thứ, cột 2: tiết bắt đầu, cột 3: số tiết">
</div>`;

let kiem_tra = document.getElementById('kiem_tra');
let tao_tkb = document.getElementById('tao_tkb');
let nhap_matran = document.getElementById('matran');
let nhap_macdinh = document.getElementById('macdinh');

let data_arr = [];
let tt_mon_arr = [];
let matran=true;

nhap_matran.addEventListener('click', e => {
    matran=true;
    khungNhap.innerHTML = `<p class='ghichu_matran'>Ghi chú: cột 1 => thứ, cột 2 => tiết bắt đầu, cột 3 => số tiết</p>
    <div class="nhap__input">
        <div class="input">
        <input type="text" class="ten_mon" placeholder="Tên môn học">
        <input type="text" class="thong_tin_mon" placeholder="Cột 1: thứ, cột 2: tiết bắt đầu, cột 3: số tiết">
    </div>`;
})
nhap_macdinh.addEventListener('click', e => {
    matran=false;
    khungNhap.innerHTML = `<div class="nhap__input">
        <div class="input">
            <input type="text" class="ten_mon" placeholder="Tên môn học">
            <input type="number" min="2" max="8" class="thu_cua_ngay" placeholder="Thứ (2->7)">
            <input type="number" min="1" max="14" class="tiet_bat_dau" placeholder="Tiết bắt đầu">
            <input type="number" min="1" class="so_tiet" placeholder="Số tiết">
        </div>
    </div>`;
})

function tietSo(n) {
    switch (n) {
        case 1:
            return " (Từ 7:00 đến 7:50)";
            break;
        case 2:
            return " (Từ 7:50 đến 8:40)";
            break;
        case 3:
            return " (Từ 9:00 đến 9:50)";
            break;
        case 4:
            return " (Từ 9:50 đến 10:40)";
            break;
        case 5:
            return " (Từ 10:40 đến 11:30)";
            break;
        case 6:
            return " (Từ 13:00 đến 13:50)";
            break;
        case 7:
            return " (Từ 13:50 đến 14:40)";
            break;
        case 8:
            return " (Từ 15:00 đến 15:50)";
            break;
        case 9:
            return " (Từ 15:50 đến 16:40)";
            break;
        case 10:
            return " (Từ 16:40 đến 17:30)";
            break;
        case 11:
            return " (Từ 17:40 đến 18:30)";
            break;
        case 12:
            return " (Từ 18:30 đến 19:20)";
            break;
        case 13:
            return " (Từ 19:20 đến 20:10)";
            break;
    
        default:
            return "";
            break;
    }
}

function inTkbRong() {
    let tkb_table = document.getElementById('tkb');
    let thu_tkb = `<tr>
            <td class="tkb__header__empty"></td>
            <td class="tkb__thu">thứ hai</td>
            <td class="tkb__thu">thứ ba</td>
            <td class="tkb__thu">thứ tư</td>
            <td class="tkb__thu">thứ năm</td>
            <td class="tkb__thu">thứ sáu</td>
            <td class="tkb__thu">thứ bảy</td>
            <td class="tkb__thu">chủ nhật</td>
            <td class="tkb__header__empty"></td>
        </tr>`;
    tkb_table.innerHTML+='<thead>'+thu_tkb+'</thead>';
    let nd_tkb_rong='';
    for (let i = 1; i <= 14; i++) {
        nd_tkb_rong+=`<tr>`;
        for (let j = 1; j <= 9; j++) {
            if (j==1||j==9)
                nd_tkb_rong+=`<td class="tkb__tiet" title="Tiết ${i}`+tietSo(i)+`">tiết ${i}</td>`;
            else
                nd_tkb_rong+=`<td></td>`;
        }
        nd_tkb_rong+=`</tr>`;
    }
    tkb_table.innerHTML+='<tbody>'+nd_tkb_rong+thu_tkb+'</tbody>';
}

inTkbRong();

let dem=1;
them_mon.addEventListener('click', e => {
    ph_tu=document.createElement('div')
    ph_tu.setAttribute('class','nhap__input');
    ph_tu.setAttribute('data-id',dem);
    if (!matran) {
        ph_tu.innerHTML = template;
    }
    else {
        ph_tu.innerHTML = template_matran;
    }
    khungNhap.appendChild(ph_tu);
    ph_tu.innerHTML += `<button data-id_to_delete="${dem}" onclick="xoaPhanTu(this)">Xoá</button>`;
    dem++;
})

kiem_tra.addEventListener('click', e => {

    ten_mon = document.querySelectorAll('.ten_mon');
    let input = document.querySelectorAll('.input');
    result=true;
    if (!matran) {
        thu_cua_ngay = document.querySelectorAll('.thu_cua_ngay');
        tiet_bat_dau = document.querySelectorAll('.tiet_bat_dau');
        so_tiet = document.querySelectorAll('.so_tiet');

        for (let i = 0; i < input.length; i++) {
            if (
                isNaN(parseInt(thu_cua_ngay[i].value))
                ||
                isNaN(parseInt(tiet_bat_dau[i].value))
                ||
                isNaN(parseInt(so_tiet[i].value))
            ) {
                alert("Các ô thứ, tiết bắt đầu và số tiết phải ở dạng số và không được để trống");
                result=false;
                break;
            }

            data_arr[i] = {
                ten_mon: ten_mon[i].value,
                thu_cua_ngay: parseInt(thu_cua_ngay[i].value),
                tiet_bat_dau: parseInt(tiet_bat_dau[i].value),
                so_tiet: parseInt(so_tiet[i].value),
            }
        }
    } else {
        thong_tin_mon = document.querySelectorAll('.thong_tin_mon');

        for (let i = 0; i < input.length; i++) {
            tt_mon_arr = thong_tin_mon[i].value.split(" ");
            if (tt_mon_arr.length<3) tt_mon_arr = [' ', ' ', ' '];
            if (
                isNaN(parseInt(tt_mon_arr[0]))
                ||
                isNaN(parseInt(tt_mon_arr[1]))
                ||
                isNaN(parseInt(tt_mon_arr[2]))
            ) {
                alert("Ma trận đã nhập rỗng hoặc là kiểu ký tự");
                result=false;
                break;
            }

            data_arr[i] = {
                ten_mon: ten_mon[i].value,
                thu_cua_ngay: parseInt(tt_mon_arr[0]),
                tiet_bat_dau: parseInt(tt_mon_arr[1]),
                so_tiet: parseInt(tt_mon_arr[2]),
            }
        }
    }

    function xuLy1(data_arr) {
        let start1,end1,start2,end2;
        for (let i = 0; i < data_arr.length-1; i++) {
            for (let j = i+1; j < data_arr.length; j++) {
                if (data_arr[i].thu_cua_ngay==data_arr[j].thu_cua_ngay) {

                    start1 = data_arr[i].tiet_bat_dau;
                    end1 = start1+data_arr[i].so_tiet-1;

                    start2 = data_arr[j].tiet_bat_dau;
                    end2 = start2+data_arr[j].so_tiet-1;
                
                    if (start1==start2)
                        return false;
                    else if (start1<start2)
                        for (let k = start1; k <= end1; k++)
                            if (k==start2)
                                return false;
                    else
                        for (let k = start2; k < end2; k++)
                            if (k==start1)
                                    return false;
                }

            }
        }
        return true;
    }
    if (result) {
        if (!xuLy1(data_arr)) {
            alert('Có môn bị trùng!');
            data_arr=[];
        } else {
            data_arr.sort((a,b) => {
                if (a.thu_cua_ngay==b.thu_cua_ngay)
                    return a.tiet_bat_dau-b.tiet_bat_dau;
                return a.thu_cua_ngay-b.thu_cua_ngay;
            })
        }
    }
})

function inTkb(data_arr) {
    let tkb_table = document.getElementById('tkb');
    tkb_table.innerHTML="";
    let thu_tkb = `<tr>
            <td class="tkb__header__empty"></td>
            <td class="tkb__thu">thứ hai</td>
            <td class="tkb__thu">thứ ba</td>
            <td class="tkb__thu">thứ tư</td>
            <td class="tkb__thu">thứ năm</td>
            <td class="tkb__thu">thứ sáu</td>
            <td class="tkb__thu">thứ bảy</td>
            <td class="tkb__thu">chủ nhật</td>
            <td class="tkb__header__empty"></td>
        </tr>`;
    tkb_table.innerHTML+='<thead>'+thu_tkb+'</thead>';
    let nd_tkb='';
    for (let i = 1; i <= 14; i++) {
        nd_tkb+=`<tr>`;
        for (let j = 1; j <= 9; j++) {
            if (j==1||j==9)
                nd_tkb+=`<td class="tkb__tiet" title="Tiết ${i}`+tietSo(i)+`">tiết ${i}</td>`;
            else {
                for (let k = 0; k < data_arr.length; k++) {
                    const element = data_arr[k];
                    result=true;
                    if (element.thu_cua_ngay==j && element.tiet_bat_dau==i) {
                        nd_tkb+=`<td class="tietCoMonHoc" rowspan="${element.so_tiet}">
                            <p>${element.ten_mon}</p>    
                        </td>`;
                        result=false;
                        break;
                    } else if (element.thu_cua_ngay==j
                        && 
                        (i>=element.tiet_bat_dau&&i<=element.tiet_bat_dau+element.so_tiet-1)
                    ) {
                        result=false;
                        break;
                    }
                }
                if (result)
                    nd_tkb+=`<td></td>`;
            }
        }
        nd_tkb+=`</tr>`;
    }
    tkb_table.innerHTML+='<tbody>'+nd_tkb+thu_tkb+'</tbody>';
}

tao_tkb.addEventListener('click', e => {
    if (data_arr.length>0) {
        inTkb(data_arr);
    }
})
