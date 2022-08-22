function buildTable(dynContent, np = 0) {

  var fulltable = "";
  ////console.log(dynContent.Sezioni);
  //per ora solo costi base

  dateStampate = false;


  if (np > 0 && dynContent.Sezioni) {
    tmpSezioni = dynContent.Sezioni.filter(v => v.Pagina == np || v.Pagina == 0);
  } else {
    tmpSezioni = dynContent.Sezioni;
  }
  // console.log(`====================Pagina ${np} - ${tmpSezioni.length}====================`);
  // console.log(tmpSezioni);
  let isRiduzioni = tmpSezioni.find(x => x.Nome == 'RiduzioniCamera');
  if (isRiduzioni) {
    asterischi = true;
  } else {
    asterischi = false;
  }

  /* let minimoNotti = Contratto.CostiAllotment.Periodi.find(x => x.NumeroNottiMinimo != '0');
  if (minimoNotti) {
    notti = true;
  } else {
    notti = false;
  } */


  for (var s = 0; s < tmpSezioni.length; s++) {
    var ret = "";
    var printedSomething = false;
    var spd = shouldPrintDates(tmpSezioni[s], s);
    //console.log(spd);

    if (tmpSezioni[s].Nome == "Costi") {
      ret += `<div class="col-auto TabPeriodi">`
      //Inizio Intestazione (MainTitle)

      if (np == 1) {
        ret += ` <div class="row CellaTabellona CellaTabellona-fullRightBorderOnly" style="font-size: 4.99pt !important;">
  <div class="col-12 paddingTabellona">

    <div class="row">
      <div class="col-12 paddingTabellona">{{Prima-Pagina.MainTable.Accomodation}} <span class="bold">[[NomeCamera]]</span></div>
    </div>
  </div>
</div>`;


        ret += `<div class="row">
      <div class="col-12 CellaTabellona-fullRightBorder tabellonaWidth tabellonaHeightSmall">[[trattamentoBase]]</div>`;
        ret += `</div>`
      } else {

        ret += ` <div class="row CellaTabellona CellaTabellona-fullRightBorderOnly">
  <div class="col-12 paddingTabellona">

    <div class="row">
      <div class="col-12 paddingTabellona">&nbsp;</div>
    </div>
  </div>
</div>`;


        ret += `<div class="row">
      <div class="col-12 CellaTabellona-fullRightBorder tabellonaWidth tabellonaHeightSmall">&nbsp;</div>`;
        ret += `</div>`

      }

    } else {
      //Tutti gli altri Costi
      ret += `<div class="col-auto TabPeriodi">`


      ret += ` <div class="row CellaTabellona CellaTabellona-fullRightBorderOnly">
  <div class="col-12 paddingTabellona">
    <div class="row ">
    <div class="col-12 paddingTabellona">${(tmpSezioni[s].Nome == "SupplementiCamera" ? "&nbsp;" : "&nbsp;")}</div>
    </div>

  </div>
</div>`;

      ret += `<div class="row">
  <div class="col-12 CellaTabellona-fullRightBorder bold tabellonaWidth tabellonaHeightSmall bold">${tmpSezioni[s].Titolo}</div>`;
      ret += `</div>`
    }
    var solo = "tabellonaWidth";


    //Riferimenti
    ret += `<div class="row">`;
    if (spd === true) {
      //dateStampate=true;
      ret += `
  <div class="col-auto CellaTabellona-OnlyBottom tabellonaWidth tabellonaHeightSmall">${tmpSezioni[s].Valori.Riferimenti[0]}</div>
  <div class="col-auto CellaTabellona-OnlyBottom CellaTabellona-fullRightBorder tabellonaWidth tabellonaHeightSmall">${tmpSezioni[s].Valori.Riferimenti[1]}</div>

  `;

      if (spd === true && np == 1 && isNotti() && tmpSezioni[s].Nome == "Costi") {
        ret += `<div class="col-auto CellaTabellona-OnlyBottom CellaTabellona-fullRightBorder tabellonaWidth tabellonaHeightSmall">${tmpSezioni[s].Valori.Riferimenti[2]}</div>`;
      }

    }

    for (var n = spd === true && tmpSezioni[s].Nome == "Costi" && isNotti() ? 3 : 2; n < tmpSezioni[s].Valori.Names.length; n++) {

      if ((n + 1) != tmpSezioni[s].Valori.Riferimenti.length) {
        ret += `<div class="col-auto CellaTabellona tabellonaHeightSmall  ${solo}">${tmpSezioni[s].Valori.Riferimenti[n]}</div>`;
      } else {
        if (tmpSezioni[s].Valori.Riferimenti.length > 1) //minchia
          ret += `<div class="col-auto CellaTabellona-fullRightBorder tabellonaHeightSmall  ${solo}">${tmpSezioni[s].Valori.Riferimenti[n]}</div>`
        else
          ret += `<div class="col-12 CellaTabellona-fullRightBorder tabellonaHeightSmall  ${solo}">${tmpSezioni[s].Valori.Riferimenti[n]}</div>`
      }
    }
    ret += `</div>`

    //Nomi
    ret += `<div class="row">`;
    if (spd === true) {
      ret += `
  <div class="col-auto CellaTabellona tabellonaWidth bold tabellonaHeightPlus">${tmpSezioni[s].Valori.Names[0]}</div>
  <div class="col-auto CellaTabellona-fullRightBorder tabellonaWidth bold tabellonaHeightPlus">${tmpSezioni[s].Valori.Names[1]}</div>

  `;

      if (spd === true && np == 1 && isNotti() && tmpSezioni[s].Nome == "Costi") {
        ret += `<div class="col-auto CellaTabellona-fullRightBorder tabellonaWidth bold tabellonaHeightPlus">${tmpSezioni[s].Valori.Names[2]}</div>`;
      }


    }
    for (var n = spd === true && tmpSezioni[s].Nome == "Costi" && isNotti() ? 3 : 2; n < tmpSezioni[s].Valori.Names.length; n++) {
      var piuPiccolo = '';

      if (tmpSezioni[s].Valori.Names[n].length > 10) {
        piuPiccolo = 'resizeFont';
      }

      if ((n + 1) != tmpSezioni[s].Valori.Names.length) {
        ret += `<div class="col-auto CellaTabellona bold tabellonaHeightPlus  ${solo} ${piuPiccolo}">${tmpSezioni[s].Valori.Names[n]}</div>`;
      } else {
        if (tmpSezioni[s].Valori.Names.length > 1) //minchia
          ret += `<div class="col-auto CellaTabellona-fullRightBorder bold tabellonaHeightPlus  ${solo} ${piuPiccolo}">${tmpSezioni[s].Valori.Names[n]}</div>`
        else
          ret += `<div class="col-12 CellaTabellona-fullRightBorder bold tabellonaHeightPlus  ${solo} ${piuPiccolo}">${tmpSezioni[s].Valori.Names[n]}</div>`
      }
    }
    ret += `</div>`


    //Valori

    for (var v = 0; v < tmpSezioni[s].Valori.Values.length; v++) {
      ret += `<div class="row" style="font-size: 6pt !important;">`;
      if (spd === true) {

        ret += `
                  <div class="col-auto CellaTabellona tabellonaWidth  tabellonaHeight">${tmpSezioni[s].Valori.Values[v][0]}</div>
                  <div class="col-auto CellaTabellona-fullRightBorder  tabellonaWidth tabellonaHeight">${tmpSezioni[s].Valori.Values[v][1]}</div>

                  `;
      }

      if (spd === true && np == 1 && isNotti() && tmpSezioni[s].Nome == "Costi") {

        ret += `<div class="col-auto CellaTabellona-fullRightBorder  tabellonaWidth tabellonaHeight">${tmpSezioni[s].Valori.Values[v][2]}</div>`;

      }


      ////console.log(dynContent.Sezioni[s].Valori.Values);

      for (var d = spd === true && tmpSezioni[s].Nome == "Costi" && isNotti() ? 3 : 2; d < tmpSezioni[s].Valori.Values[v].length; d++) {
        printedSomething = true;
        if ((d + 1) != tmpSezioni[s].Valori.Values[v].length) {
          ret += `<div class="col-auto CellaTabellona  tabellonaHeight  cella-align-right  ${solo}">${tmpSezioni[s].Valori.Values[v][d]}</div>`;
        } else {
          if (tmpSezioni[s].Valori.Values[v].length > 1) //minchia
            ret += `<div class="col-auto CellaTabellona-fullRightBorder  tabellonaHeight cella-align-right  ${solo}">${tmpSezioni[s].Valori.Values[v][d]}</div>`
          else
            ret += `<div class="col-12 CellaTabellona-fullRightBorder  tabellonaHeight cella-align-right  ${solo}">${tmpSezioni[s].Valori.Values[v][d]}</div>`

        }
      }
      ret += `</div>`
    }

    //Finito
    ret += `</div>`


    if (ret) {

      if (printedSomething) {
        fulltable += ret;
      }


    }

  }


  ////console.log("Tabellona Fatta");

  fulltable += CurPag == 1 && !firstNoteGrigie ? `<div class="row" style:"display: contents;"></div>` : "";
  /* <div class="col-12">[[Legenda]]</div>    ripristna in caso*/


  if (!dummyPrint) {
    if (fulltable == "") {
      return `No Values for ${dynContent.NomeCamera}`
    }
    return fulltable;
  } else {
    return fulltableDummy;
  }


}
