"use strict";
const fs = require("fs").promises;
const path = require("path");
const fse = require("fs-extra");

async function createControl(data, mainWindow) {
  try {
    // createProjectFilePath fonksiyonunu çağır
    await createProjectFilePath();

    // copyFile fonksiyonunu çağır
    await copyFile(
      data[0].name,
      data[0].platform,
      data[0].language,
      mainWindow
    );
  } catch (err) {
    console.error("Bir hata oluştu:", err);
  }
}

async function createProjectFilePath() {
  // Proje klasörünün yolu
  const projectFolderPath = path.join(__dirname, "../projects");

  try {
    // Klasörün zaten var olup olmadığını kontrol et
    await fs.access(projectFolderPath);
    console.log("Klasör zaten var.");
  } catch (err) {
    // Klasör yoksa oluştur
    await fs.mkdir(projectFolderPath);
    console.log("Klasör başarıyla oluşturuldu.");
  }
}

async function copyFile(projectName, platform, language, mainWindow) {
  // Boşlukları kaldır
  const sanitizedProjectName = projectName.replace(/\s/g, "");

  // Proje klasörünün yolu
  const projectFolderPath = path.join(
    __dirname,
    `../projects/${sanitizedProjectName}`
  );

  try {
    // Klasörün zaten var olup olmadığını kontrol et
    await fs.access(projectFolderPath);
    console.log("Klasör zaten var.");
    mainWindow.webContents.send(
      "Project:Unsuccessful",
      "Aynı isimde proje mevcuttur, lütfen farklı bir isimle tekrar deneyin"
    );
  } catch (err) {
    // Klasör yoksa oluştur
    await fs.mkdir(projectFolderPath);
    console.log("Klasör başarıyla oluşturuldu.");

    // Kopyalanacak klasörün yolu
    const sourceFolder = path.join(
      __dirname,
      `./projects/${platform}/${language}`
    );

    // Hedef klasörün yolu
    const destinationFolder = path.join(__dirname, "../projects");

    // Hedef klasörde aynı isimde klasör olup olmadığını kontrol et
    const destinationProjectPath = path.join(
      destinationFolder,
      sanitizedProjectName
    );
    if (
      await fs
        .access(destinationProjectPath)
        .then(() => false)
        .catch(() => true)
    ) {
      console.log("Aynı isimde klasör zaten var, kopyalama yapılmayacak.");
    } else {
      // Klasörü kopyala
      await fse.copy(sourceFolder, destinationProjectPath);
      console.log("Klasör başarıyla kopyalandı.");
      mainWindow.webContents.send(
        "Project:Successful",
        "Başarıyla proje dosyası oluşturuldu"
      );
    }
  }
}

module.exports = createControl;
