const ad = document.getElementById("ad");
const soyad = document.getElementById("soyad");
const mail = document.getElementById("mail");

const form = document.getElementById("form-rehber");
const kisiListesi = document.querySelector(".kisi-listesi");
const Kisiler = [];
let secilenSatir = undefined;

form.addEventListener("submit", submit);
kisiListesi.addEventListener("click", kisiIslemleriniYap);


function submit(e) {
  e.preventDefault();
  const addPerson = {
    ad: ad.value,
    soyad: soyad.value,
    mail: mail.value,
  };
  const sonuc = dataValidation(addPerson);
  if (sonuc.durum) {
    if (secilenSatir) {
      kisiyiGuncelle(addPerson);
    } else {
      kisiyiEkle(addPerson);
    }
  } else {
    bilgiOlustur(sonuc.mesaj, sonuc.durum);
  }
}



function kisiIslemleriniYap(e) {
  if (e.target.classList.contains("btn--delete")) {
    const silinecekTR = e.target.parentElement.parentElement;
    const silinecekMail =
      e.target.parentElement.previousElementSibling.textContent;
    rehberdenSil(silinecekTR, silinecekMail);
  } else if (e.target.classList.contains("btn--edit")) {
    document.querySelector(".kaydetGuncelle").value = "Güncelle";
    const secilenTr = e.target.parentElement.parentElement;
    const guncellenecekMail = secilenTr.cells[2].textContent;
    

    ad.value = secilenTr.cells[0].textContent;
    soyad.value = secilenTr.cells[1].textContent;
    mail.value = secilenTr.cells[2].textContent;

    secilenSatir = secilenTr;
  }
}

function rehberdenSil(silinecekTrElement, silinecekMail) {
  silinecekTrElement.remove();

  Kisiler.forEach((kisi, index) => {
    if (kisi.mail == silinecekMail) {
      Kisiler.splice(index, 1);
    }
  });
}



function dataValidation(person) {
  for (const value in person) {
    if (person[value]) {
    } else {
      return {
        durum: false,
        mesaj: "Boş alan bırakmayınız",
      };
    }
  }
  alanlariTemizle();
  return {
    durum: true,
    mesaj: "Kaydedildi",
  };
}

function bilgiOlustur(mesaj, durum) {
  const bilgi = document.createElement("div");
  bilgi.textContent = mesaj;
  bilgi.classList.add("bilgi");

  bilgi.classList.add(durum ? "bilgi--success" : "bilgi--error");

  document.querySelector(".container").insertBefore(bilgi, form);

  setTimeout(function () {
    silinecekDiv = document.querySelector(".bilgi");
    if (silinecekDiv) {
      silinecekDiv.remove();
    } else {
    }
  }, 2000);
}

function alanlariTemizle() {
  ad.value = "";
  soyad.value = "";
  mail.value = "";
}

function kisiyiEkle(person) {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${person.ad}</td>
    <td>${person.soyad}</td>
    <td>${person.mail}</td>
    <td>
        <button class="btn btn--delete"><i class="far fa-trash-alt"></i></button>
        <button class="btn btn--edit"><i class="far fa-edit"></i></button>
    </td>`;
  kisiListesi.appendChild(tr);
  Kisiler.push(person);
  bilgiOlustur("Kişi rehbere kaydedildi ", true);
}

function kisiyiGuncelle(kisi) {

  for (let i = 0; i < Kisiler.length; i++) {
    if(Kisiler[i].mail === secilenSatir.cells[2].textContent){
      Kisiler[i] = kisi;
      break;
    }
    
  }


  secilenSatir.cells[0].textContent = kisi.ad;
  secilenSatir.cells[1].textContent = kisi.soyad;
  secilenSatir.cells[2].textContent = kisi.mail;

  document.querySelector('.kaydetGuncelle').value = 'Kaydet';
  secilenSatir = undefined;
}
