async function StampaToPDF() {

  for (var i = 0; i < arrayPagine.length; i++) {
    let win = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
      webSecurity: false,
      webPreferences: {webSecurity: false, nodeIntegration: true, contextIsolation: false}
    })
    win.on('closed', () => {

      win = null
    })

    win.loadURL(url.format({
      pathname: path.join(currentDir, arrayPagine[i].pagina, arrayPagine[i].id + '.html'),
      protocol: 'file',
      slashes: true
    }))


    const result = await pEvent(win.webContents, 'did-finish-load');

    // win.webContents.on('did-finish-load', async function () {
    // Use default printing options
    var data = await win.webContents.printToPDF({pageSize: "A4", landscape: true, printBackground: true});
    try {
      fs.writeFileSync(path.join(archiveDir, arrayPagine[i].id + ".pdf"), data);
      paginaCompleted(arrayPagine[i].id, true, "OK");
      win.close();
    } catch (error) {

      paginaCompleted(arrayPagine[i].id, false, error);
      win.close();
    }

    // })
  }


  try {
    var merger = new PDFMerger();

    toMerge().forEach((f) => {

      merger.add(f);
    });

    await merger.save(path.join(archiveDir, printId + '.pdf'));


    //cleanupPrint();
    showPDF();
  } catch (err) {

    tmpWin.webContents.send('ContrattoStampato');

    return ////console.log(err)
  }

  /*

    merge(toMerge(), path.join(archiveDir, printId + '.pdf'), function (err) {
      if (err) {
        tmpWin.webContents.send('ContrattoStampato');
        ////console.log(err)
        return ////console.log(err)
      }
      ////console.log('Successfully merged!')
      //cleanupPrint();
      showPDF();
    });
  */

}
