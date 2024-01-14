let projectData = [];

let projectName = document.getElementById("name");
let platform = document.getElementById("platform");
let programinglanguage = document.getElementById("programinglanguage");
let platformName = ["Desktop", "Mobil", "Web"];
let programingLanguageName = [
  { Desktop: ["JavaScript", "Python"] },
  { Mobil: ["JavaScript"] },
  { Web: ["JavaScript"] },
];

/* let platformName = ['Desktop']
let programingLanguageName = [{ Desktop: ['JavaScript'] }]
 */
platformName.forEach(function (data) {
  let option = document.createElement("option");
  option.value = data;
  option.textContent = data;
  platform.appendChild(option);
});

// Varsayılan olarak "Boş" seçili hale getirme
platform.value = "Boş";

platform.addEventListener("change", (e) => {
  // platform seçimi ve dil listesi eşleşmesini bul
  let selectedLanguages = programingLanguageName.find(
    (obj) => obj[e.target.value]
  );

  // Eğer eşleşme varsa, ilgili dil listesini programinglanguage seçim kutusuna ekle
  if (selectedLanguages) {
    programinglanguage.innerHTML = ""; // Seçim kutusunu temizle

    let defaultOption = document.createElement("option");
    defaultOption.value = "Boş";
    defaultOption.textContent = "Seçiniz";
    programinglanguage.appendChild(defaultOption);

    selectedLanguages[e.target.value].forEach((lang) => {
      let option = document.createElement("option");
      option.value = lang;
      option.textContent = lang;
      programinglanguage.appendChild(option);
    });
  } else {
    // Eğer seçili bir platforma karşılık dil listesi yoksa, programinglanguage seçim kutusunu boşalt
    programinglanguage.innerHTML = "";
    let defaultOption = document.createElement("option");
    defaultOption.value = "Boş";
    defaultOption.textContent = "Seçiniz";
    programinglanguage.appendChild(defaultOption);
  }
});

// Varsayılan olarak "Boş" seçili hale getirme
programinglanguage.value = "Boş";

function createproject() {
  let selectedPlatform = platform.value;
  let selectedLanguage = programinglanguage.value;
  let name = projectName.value;

  if (
    name.length > 0 &&
    selectedPlatform !== "Boş" &&
    selectedLanguage !== "Boş"
  ) {
    projectData.push({
      name: name,
      platform: selectedPlatform,
      language: selectedLanguage,
    });

    console.log("Proje verileri:", projectData);
    window.electron.ipcRenderer.send("Project:Data", projectData);
    projectData = [];

    alert("Proje Oluşturuluyor");
    window.electron.ipcRenderer.on("Project:Successful", (err, data) => {
      console.log(data);
      alert(data);
    });

    window.electron.ipcRenderer.on("Project:Unsuccessful", (err, data) => {
      console.log(data);
      alert(data);
    });
  } else {
    alert("Lütfen boş alanları doldurunuz!");
  }
}
