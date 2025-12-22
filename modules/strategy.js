import { formatNumber, calcolaGiorniTraDate } from "./utils.js";

// Riferimenti agli elementi DOM e alle funzioni di callback globali
let dom = {};
let callbacks = {};
let graficoTortaIstanza = null;
const mappaTestoLabelGraficoATipoGara = {};

// Funzione wrapper per accedere a i18n in modo sicuro.
// Verrà popolata da initStrategyUI, rompendo la dipendenza circolare.
const getTranslation = (...args) => {
  if (callbacks.getTranslation) {
    return callbacks.getTranslation(...args);
  }
  console.warn(
    "getTranslation called before initialization in strategy module."
  );
  return args[0]; // Fallback to the key
};

// --- LOGICA DI INTERFACCIA (UI) ---

function aggiornaMonitoraggioScadenze() {
  const gareConScadenze = callbacks.getGareConScadenzeImminenti();
  const gareInDimezzamento = gareConScadenze.filter(
    (g) => g.tipoEvento === dom.EVENT_TYPES.HALVING
  );
  const gareInScadenza = gareConScadenze.filter(
    (g) => g.tipoEvento === dom.EVENT_TYPES.EXPIRY
  );

  function popolaListaScadenze(listaElement, gare, tipoEvento) {
    listaElement.innerHTML = "";
    if (gare.length > 0) {
      gare.sort((a, b) => new Date(a.dataEvento) - new Date(b.dataEvento));
      gare.forEach((g) => {
        const li = document.createElement("li");
        const livelloTesto = getTranslation(
          dom.livelliVsrStoricoMap[g.livello]?.chiaveTraduzione || g.livello
        );

        const simulazione = g.simulazioneRisultato;
        const impattoNettoStimatoVal = simulazione.impattoNettoEffettivo;
        const gareBeneficiarieSim = simulazione.gareBeneficiarie || [];
        const garaContribuisceDopo =
          simulazione.laGaraSimulataContribuisceAncora;
        const garaEsceDalRanking = g.isContributing && !garaContribuisceDopo;

        const currentLanguage = document.documentElement.lang || "it";
        const dateLocale =
          { it: "it-IT", fr: "fr-FR", en: "en-GB" }[currentLanguage] || "it-IT";
        const dataEventoString = new Date(g.dataEvento).toLocaleDateString(
          dateLocale
        );

        const impattoDirettoGaraVal = g.isContributing
          ? g.tipoEvento === dom.EVENT_TYPES.HALVING
            ? Math.floor(g.puntiRaw) - Math.floor(g.puntiRaw * 0.5)
            : Math.floor(g.puntiRaw)
          : 0;

        let params = {
          raceName: g.nome,
          raceLevel: livelloTesto,
          eventType: getTranslation(g.tipoEvento).toLowerCase(),
          eventDate: dataEventoString,
          directImpactPoints: formatNumber(Math.abs(impattoDirettoGaraVal), 0),
          netImpactPoints: formatNumber(impattoNettoStimatoVal, 0),
        };

        let testoAvvisoKey = "";
        let mostraInfoRibilanciamento = false;

        if (
          impattoNettoStimatoVal > -Math.abs(impattoDirettoGaraVal) &&
          gareBeneficiarieSim.length > 0
        ) {
          const primaGaraBeneficiariaNonSimulata = gareBeneficiarieSim.find(
            (b) => b.id !== g.id
          );
          if (primaGaraBeneficiariaNonSimulata) {
            mostraInfoRibilanciamento = true;
            params.beneficiaryRaceName = primaGaraBeneficiariaNonSimulata.nome;
            params.beneficiaryRaceLevel = getTranslation(
              dom.livelliVsrStoricoMap[primaGaraBeneficiariaNonSimulata.livello]
                ?.chiaveTraduzione || primaGaraBeneficiariaNonSimulata.livello
            );
          }
        }

        let laGaraStessaEntraDaNonContribuente = false;
        if (!g.isContributing && impattoNettoStimatoVal > 0) {
          laGaraStessaEntraDaNonContribuente = true;
          params.netImpactPoints = formatNumber(
            Math.abs(impattoNettoStimatoVal),
            0
          );
          if (g.tipoEvento === dom.EVENT_TYPES.EXPIRY)
            laGaraStessaEntraDaNonContribuente = false;
        }

        const differenzaImpattoTrascurabile =
          Math.abs(impattoNettoStimatoVal - -Math.abs(impattoDirettoGaraVal)) <
          10;

        if (g.isUrgente) {
          params.remainingDays = calcolaGiorniTraDate(new Date(), g.dataEvento);
          params.daysText =
            Math.abs(params.remainingDays) === 1
              ? getTranslation("STRATEGY_SUGGESTION_DAY_SINGLE")
              : getTranslation("STRATEGY_SUGGESTION_DAYS_PLURAL");
          if (currentLanguage === "it") {
            params.verboMancareIt =
              Math.abs(params.remainingDays) === 1 ? "Manca" : "Mancano";
          }
          li.classList.add("scadenza-urgente");

          if (garaEsceDalRanking) {
            testoAvvisoKey =
              g.tipoEvento === dom.EVENT_TYPES.HALVING
                ? "STRATEGY_DEADLINE_ITEM_URGENT_HALVING_EXITS_TEMPORARILY_RANKING"
                : "STRATEGY_DEADLINE_ITEM_URGENT_EXITS_RANKING";
            params.netImpactPoints = formatNumber(
              Math.abs(impattoNettoStimatoVal),
              0
            );
          } else if (
            !g.isContributing &&
            g.tipoEvento === dom.EVENT_TYPES.HALVING &&
            impattoNettoStimatoVal > 0
          ) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_URGENT_ENTERS_ON_EVENT";
            params.netImpactPoints = formatNumber(
              Math.abs(impattoNettoStimatoVal),
              0
            );
          } else if (mostraInfoRibilanciamento) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_URGENT_REBALANCE_POSITIVE";
          } else if (laGaraStessaEntraDaNonContribuente) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_URGENT_ENTERS_ON_EVENT";
          } else if (differenzaImpattoTrascurabile) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_URGENT_SIMPLE_NO_NET";
          } else if (impattoNettoStimatoVal === 0 && !g.isContributing) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_URGENT_SIMPLE_NO_NET";
          } else {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_URGENT_SIMPLE";
          }
        } else {
          li.classList.add("scadenza-in-preavviso-non-urgente");
          if (garaEsceDalRanking) {
            testoAvvisoKey =
              g.tipoEvento === dom.EVENT_TYPES.HALVING
                ? "STRATEGY_DEADLINE_ITEM_NORMAL_HALVING_EXITS_TEMPORARILY_RANKING"
                : "STRATEGY_DEADLINE_ITEM_NORMAL_EXITS_RANKING";
            params.netImpactPoints = formatNumber(
              Math.abs(impattoNettoStimatoVal),
              0
            );
          } else if (
            !g.isContributing &&
            g.tipoEvento === dom.EVENT_TYPES.HALVING &&
            impattoNettoStimatoVal > 0
          ) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_NORMAL_ENTERS_ON_EVENT";
            params.netImpactPoints = formatNumber(
              Math.abs(impattoNettoStimatoVal),
              0
            );
          } else if (mostraInfoRibilanciamento) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_NORMAL_REBALANCE_POSITIVE";
          } else if (laGaraStessaEntraDaNonContribuente) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_NORMAL_ENTERS_ON_EVENT";
          } else if (differenzaImpattoTrascurabile) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_NORMAL_SIMPLE_NO_NET";
          } else if (impattoNettoStimatoVal === 0 && !g.isContributing) {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_NORMAL_SIMPLE_NO_NET";
          } else {
            testoAvvisoKey = "STRATEGY_DEADLINE_ITEM_NORMAL_SIMPLE";
          }
        }
        li.innerHTML = getTranslation(testoAvvisoKey, params);

        if (
          !g.isContributing &&
          testoAvvisoKey.indexOf("_ENTERS_ON_EVENT") === -1
        ) {
          if (!garaEsceDalRanking) {
            li.innerHTML += ` <span class="non-contributing-suffix">${getTranslation(
              "STRATEGY_DEADLINE_ITEM_NOT_CONTRIBUTING_SUFFIX"
            )}</span>`;
          }
        }
        listaElement.appendChild(li);
      });
    } else {
      listaElement.innerHTML = `<li class="no-data">${getTranslation(
        "TEXT_NO_IMMINENT_EVENT_RACES",
        {
          eventType: getTranslation(
            tipoEvento === dom.EVENT_TYPES.HALVING
              ? "EVENT_TYPE_HALVING"
              : "EVENT_TYPE_EXPIRY"
          ).toLowerCase(),
        }
      )}</li>`;
    }
  }

  popolaListaScadenze(
    dom.listaGareDimezzamento,
    gareInDimezzamento,
    dom.EVENT_TYPES.HALVING
  );
  popolaListaScadenze(
    dom.listaGareScadenza,
    gareInScadenza,
    dom.EVENT_TYPES.EXPIRY
  );
}

function aggiornaValutazioneStrategicaSlot() {
  if (!dom.listaSuggerimentiStrategiciSlot) return;
  try {
    const gareContributive = callbacks.getGareContributiveConDettagli();
    const suggerimentiStrategici = [];
    const gareConScadenze = callbacks.getGareConScadenzeImminenti();
    const idsGareConScadenze = new Set(gareConScadenze.map((g) => g.id));
    const ordineTipiPerStrategia = [
      dom.RACE_TYPES.HC,
      dom.RACE_TYPES.L1,
      dom.RACE_TYPES.L2,
      dom.RACE_TYPES.L3,
    ];

    ordineTipiPerStrategia.forEach((tipoGara) => {
      const gareCat = gareContributive[tipoGara] || [];
      const chiaveMappaPerValoreNumerico = Object.keys(
        dom.livelliVsrStoricoMap
      ).find((key) => dom.livelliVsrStoricoMap[key].tipo === tipoGara);
      const infoLivelloDaMappa = chiaveMappaPerValoreNumerico
        ? dom.livelliVsrStoricoMap[chiaveMappaPerValoreNumerico]
        : null;
      const livelloValoreNumerico = infoLivelloDaMappa
        ? infoLivelloDaMappa.valoreNumerico
        : null;
      const nomeCategoriaTradotto = infoLivelloDaMappa
        ? getTranslation(infoLivelloDaMappa.chiaveTraduzione)
        : tipoGara;

      if (!livelloValoreNumerico) return;

      const icona = getTranslation(`STRATEGY_SUGGESTION_${tipoGara}_ICON`);
      let suggerimentoTestoCompleto = "";
      const limitePerFascia = dom.LIMITI_GARE_PER_CATEGORIA[tipoGara];

      const gare100Attuali = gareCat.filter(
        (g) => g.fattoreDecadimento === 1.0
      );
      const numGare100Attuali = gare100Attuali.length;
      const gare100InDimezzamentoImminenteObj = gare100Attuali.filter((g) => {
        const oggi = new Date();
        oggi.setHours(0, 0, 0, 0);
        const dataGaraDate = new Date(g.data);
        dataGaraDate.setHours(0, 0, 0, 0);
        const dataDimezzamento = new Date(dataGaraDate);
        dataDimezzamento.setFullYear(dataDimezzamento.getFullYear() + 1);
        const warningDimezzamento = new Date(dataDimezzamento);
        warningDimezzamento.setMonth(warningDimezzamento.getMonth() - 3);
        return oggi >= warningDimezzamento && oggi < dataDimezzamento;
      });
      const numGare100InDimezzamentoImminente =
        gare100InDimezzamentoImminenteObj.length;
      const slotAttualmenteVuoti100 = limitePerFascia - numGare100Attuali;

      let numSlotVuoti100ConsideratiPerSuggerimento = slotAttualmenteVuoti100;
      let gare100ConsideratePerAnalisiDebolezza = [...gare100Attuali];
      let dimezzamentiSonoStatiCompensati = false;

      if (numGare100InDimezzamentoImminente > 0) {
        const gareSalvate =
          JSON.parse(localStorage.getItem("gareSalvate")) || [];

        const gareSimulate = JSON.parse(JSON.stringify(gareSalvate));
        gare100InDimezzamentoImminenteObj.forEach((garaDaDimezzare) => {
          const garaInArraySimulato = gareSimulate.find(
            (g) => g.id === garaDaDimezzare.id
          );
          if (garaInArraySimulato) {
            const dataSimulata = new Date(garaInArraySimulato.data);
            dataSimulata.setFullYear(dataSimulata.getFullYear() - 1);
            garaInArraySimulato.data = dataSimulata.toISOString().split("T")[0];
          }
        });

        const gareContributiveDopoSimulazioneObj =
          callbacks.getGareContributiveConDettagli(gareSimulate);

        const gare100PostSimulazionePerQuestoTipo = (
          gareContributiveDopoSimulazioneObj[tipoGara] || []
        )
          .filter((g) => g.fattoreDecadimento === 1.0)
          .sort((a, b) => b.puntiEffettivi - a.puntiEffettivi)
          .slice(0, limitePerFascia);

        numSlotVuoti100ConsideratiPerSuggerimento =
          limitePerFascia - gare100PostSimulazionePerQuestoTipo.length;
        gare100ConsideratePerAnalisiDebolezza =
          gare100PostSimulazionePerQuestoTipo;

        if (
          slotAttualmenteVuoti100 <= 0 &&
          numSlotVuoti100ConsideratiPerSuggerimento <= 0
        ) {
          dimezzamentiSonoStatiCompensati = true;
        }
      }

      let params = {
        categoryName: nomeCategoriaTradotto,
        totalSlots: limitePerFascia * 2,
      };

      if (dimezzamentiSonoStatiCompensati && slotAttualmenteVuoti100 <= 0) {
        suggerimentoTestoCompleto = `${icona} ${getTranslation(
          `STRATEGY_SUGGESTION_${tipoGara}_OPTIMAL_REBALANCED`,
          params
        )}`;
      } else if (numSlotVuoti100ConsideratiPerSuggerimento > 0) {
        const puntiEsempio = callbacks.calcolaPuntiPerClassifica(
          livelloValoreNumerico,
          50
        );
        params.numRacesToAdd = numSlotVuoti100ConsideratiPerSuggerimento;
        params.raceWord =
          numSlotVuoti100ConsideratiPerSuggerimento > 1
            ? getTranslation("STRATEGY_SUGGESTION_RACES_PLURAL")
            : getTranslation("STRATEGY_SUGGESTION_RACE_SINGLE");
        params.examplePointsText = puntiEsempio
          ? getTranslation("STRATEGY_SUGGESTION_EXAMPLE_POINTS_TEXT", {
              targetRank: 50,
              points: formatNumber(puntiEsempio, 0),
            })
          : "";
        params.noteHalvingText = "";
        if (
          numGare100InDimezzamentoImminente > 0 &&
          !dimezzamentiSonoStatiCompensati
        ) {
          const keyHalving =
            numGare100InDimezzamentoImminente > 1
              ? "STRATEGY_SUGGESTION_NOTE_HALVING_TEXT_PLURAL"
              : "STRATEGY_SUGGESTION_NOTE_HALVING_TEXT_SINGLE";
          params.noteHalvingText = getTranslation(keyHalving, {
            numRaces: numGare100InDimezzamentoImminente,
          });
        }
        suggerimentoTestoCompleto = `${icona} ${getTranslation(
          `STRATEGY_SUGGESTION_${tipoGara}_EMPTY_SLOT`,
          params
        )}`;
      } else if (gare100ConsideratePerAnalisiDebolezza.length > 0) {
        const gare100Ordinate = [...gare100ConsideratePerAnalisiDebolezza].sort(
          (a, b) => a.puntiEffettivi - b.puntiEffettivi
        );
        const garaMenoPerformante100 = gare100Ordinate[0];
        const puntiMenoPerformanti100 = garaMenoPerformante100.puntiEffettivi;
        params.points = formatNumber(puntiMenoPerformanti100, 0);
        const sogliaDebolezzaPunti =
          livelloValoreNumerico *
          dom.SOGLIA_DEBOLEZZA[livelloValoreNumerico.toString()];
        const isMenoPerformante100Debole =
          puntiMenoPerformanti100 < sogliaDebolezzaPunti;

        if (isMenoPerformante100Debole) {
          params.targetRank = callbacks.calcolaClassificaPerPuntiTarget(
            livelloValoreNumerico,
            sogliaDebolezzaPunti + 1
          );
          suggerimentoTestoCompleto = `${icona} ${getTranslation(
            `STRATEGY_SUGGESTION_${tipoGara}_WEAK_SLOT_BASE`,
            params
          )}`;
          suggerimentoTestoCompleto += ` ${getTranslation(
            `STRATEGY_SUGGESTION_${tipoGara}_IMPROVEMENT_ACTION`,
            params
          )}`;
        } else {
          suggerimentoTestoCompleto = `${icona} ${getTranslation(
            `STRATEGY_SUGGESTION_${tipoGara}_OK_SLOT_BASE`,
            params
          )}`;
          const garaMenoPerformanteComplessiva =
            gareCat.length > 0 ? gareCat[gareCat.length - 1] : null;
          if (
            tipoGara !== dom.RACE_TYPES.HC &&
            garaMenoPerformanteComplessiva &&
            !idsGareConScadenze.has(garaMenoPerformanteComplessiva.id)
          ) {
            suggerimentoTestoCompleto += ` ${getTranslation(
              "STRATEGY_SUGGESTION_MONITOR_DEADLINES_TEXT"
            )}`;
          }
        }
      }

      if (gareCat.length > 0) {
        const garaMenoPerformante = gareCat[gareCat.length - 1];
        if (
          garaMenoPerformante &&
          idsGareConScadenze.has(garaMenoPerformante.id)
        ) {
          const garaInScadenza = gareConScadenze.find(
            (g) => g.id === garaMenoPerformante.id
          );
          if (garaInScadenza) {
            const { tipoEvento, dataEvento, isUrgente } = garaInScadenza;
            const dataEventoDate = new Date(dataEvento);
            const giorniRimanentiEffettivi = calcolaGiorniTraDate(
              new Date(),
              dataEventoDate
            );

            let warningParams = {
              eventType: tipoEvento.toLowerCase(),
              eventDate: new Date(dataEvento).toLocaleDateString(
                document.documentElement.lang || "it"
              ),
              impactPoints: formatNumber(
                garaInScadenza.simulazioneRisultato.impattoNettoEffettivo,
                0
              ),
              remainingDays: giorniRimanentiEffettivi,
              daysText: "",
            };
            warningParams.daysText =
              Math.abs(warningParams.remainingDays) === 1
                ? getTranslation("STRATEGY_SUGGESTION_DAY_SINGLE")
                : getTranslation("STRATEGY_SUGGESTION_DAYS_PLURAL");

            let verboMancareItWarning = "";
            const currentLanguage = document.documentElement.lang || "it";
            if (currentLanguage === "it") {
              verboMancareItWarning =
                Math.abs(warningParams.remainingDays) === 1
                  ? "Manca"
                  : "Mancano";
            }

            let warningKey = "";
            const translatedEventTypeForWarning =
              tipoEvento === dom.EVENT_TYPES.HALVING
                ? getTranslation("EVENT_TYPE_HALVING")
                : getTranslation("EVENT_TYPE_EXPIRY");
            if (isUrgente)
              warningKey =
                tipoEvento === dom.EVENT_TYPES.HALVING
                  ? `STRATEGY_SUGGESTION_${tipoGara}_URGENT_HALVING_WARNING`
                  : `STRATEGY_SUGGESTION_${tipoGara}_URGENT_EXPIRY_WARNING`;
            else warningKey = `STRATEGY_SUGGESTION_${tipoGara}_PRE_WARNING`;

            let finalWarningParams = {
              ...warningParams,
              eventType: translatedEventTypeForWarning.toLowerCase(),
            };
            if (currentLanguage === "it") {
              finalWarningParams.verboMancareIt = verboMancareItWarning;
            }
            if (warningKey)
              suggerimentoTestoCompleto += ` ${getTranslation(
                warningKey,
                finalWarningParams
              )}`;
          }
        }
      }
      if (suggerimentoTestoCompleto)
        suggerimentiStrategici.push(suggerimentoTestoCompleto);
    });

    if (gareConScadenze.length > 0) {
      let testoScadenzeImportanti = getTranslation(
        "STRATEGY_SUGGESTION_IMPORTANT_DEADLINES_BASE"
      );
      const gareHCoL1InScadenza = gareConScadenze.filter((g) => {
        const tipoGara = dom.livelliVsrStoricoMap[g.livello]?.tipo;
        return tipoGara === dom.RACE_TYPES.HC || tipoGara === dom.RACE_TYPES.L1;
      });
      if (gareHCoL1InScadenza.length > 0) {
        gareHCoL1InScadenza.sort(
          (a, b) => new Date(a.dataEvento) - new Date(b.dataEvento)
        );
        const scadenzaPiuImminente = gareHCoL1InScadenza[0];
        const dataEventoDate = new Date(scadenzaPiuImminente.dataEvento);
        const giorniRimanenti = calcolaGiorniTraDate(
          new Date(),
          dataEventoDate
        );
        const daysText =
          Math.abs(giorniRimanenti) === 1
            ? getTranslation("STRATEGY_SUGGESTION_DAY_SINGLE")
            : getTranslation("STRATEGY_SUGGESTION_DAYS_PLURAL");
        const remainingTimeText = getTranslation(
          "STRATEGY_SUGGESTION_REMAINING_TIME_TEXT_FORMAT",
          {
            remainingDays: giorniRimanenti,
            daysText: daysText,
            eventDate: dataEventoDate.toLocaleDateString(
              document.documentElement.lang || "it"
            ),
          }
        );
        const translatedDeadlineEventType =
          scadenzaPiuImminente.tipoEvento === dom.EVENT_TYPES.HALVING
            ? getTranslation("EVENT_TYPE_HALVING")
            : getTranslation("EVENT_TYPE_EXPIRY");
        testoScadenzeImportanti = getTranslation(
          "STRATEGY_SUGGESTION_IMPORTANT_DEADLINES_PRIORITY",
          {
            eventType: translatedDeadlineEventType.toLowerCase(),
            remainingTimeText: remainingTimeText,
          }
        );
      }
      suggerimentiStrategici.unshift(
        `<span class="warning-triangle calendar-icon">🗓️</span> ${testoScadenzeImportanti}`
      );
    }

    dom.listaSuggerimentiStrategiciSlot.innerHTML = "";
    if (suggerimentiStrategici.length > 0) {
      suggerimentiStrategici.forEach((sugg) => {
        const li = document.createElement("li");
        li.innerHTML = sugg;
        dom.listaSuggerimentiStrategiciSlot.appendChild(li);
      });
    } else
      dom.listaSuggerimentiStrategiciSlot.innerHTML = `<li class="no-data">${getTranslation(
        "TEXT_NO_PRIORITY_STRATEGIC_ACTION"
      )}</li>`;
  } catch (error) {
    console.error("Errore in aggiornaValutazioneStrategicaSlot:", error);
    if (dom.listaSuggerimentiStrategiciSlot)
      dom.listaSuggerimentiStrategiciSlot.innerHTML = `<li class="no-data text-danger">${getTranslation(
        "TEXT_ERROR_GENERATING_SUGGESTIONS"
      )}</li>`;
  }
}

export function aggiornaGraficoTortaStatoStrategia() {
  if (!dom.canvasGraficoTorta) return;
  try {
    // La mappa deve essere ricostruita ad ogni aggiornamento per riflettere i cambi di lingua,
    // altrimenti i tooltip non funzioneranno dopo il cambio.
    for (const key in mappaTestoLabelGraficoATipoGara) {
      delete mappaTestoLabelGraficoATipoGara[key];
    }
    Object.values(dom.livelliVsrStoricoMap).forEach((level) => {
      if (level.chiaveTraduzione && level.tipo !== "N/D") {
        const translatedLabel = getTranslation(level.chiaveTraduzione);
        mappaTestoLabelGraficoATipoGara[translatedLabel] = level.tipo;
      }
    });

    const saluteCategoriePerTooltip = {};
    const gareContributive = callbacks.getGareContributiveConDettagli();
    const puntiAttualiPerCategoriaGrafico = {};
    const categorieOrdineTooltip = [
      dom.RACE_TYPES.HC,
      dom.RACE_TYPES.L1,
      dom.RACE_TYPES.L2,
      dom.RACE_TYPES.L3,
    ];
    categorieOrdineTooltip.forEach((tipoGara) => {
      const gareCat = gareContributive[tipoGara] || [];
      puntiAttualiPerCategoriaGrafico[tipoGara] = gareCat.reduce(
        (sum, g) => sum + (g.puntiRaw || g.puntiEffettivi),
        0
      );
    });

    const potenzialePuntiPerGraficoTorta = {
      [dom.RACE_TYPES.HC]:
        (dom.livelliVsrStoricoMap[dom.RACE_TYPES.HC]?.valoreNumerico || 0) *
        dom.LIMITI_GARE_PER_CATEGORIA[dom.RACE_TYPES.HC] *
        1.5,
      [dom.RACE_TYPES.L1]:
        (dom.livelliVsrStoricoMap[dom.RACE_TYPES.L1]?.valoreNumerico || 0) *
        dom.LIMITI_GARE_PER_CATEGORIA[dom.RACE_TYPES.L1] *
        1.5,
      [dom.RACE_TYPES.L2]:
        (dom.livelliVsrStoricoMap[dom.RACE_TYPES.L2]?.valoreNumerico || 0) *
        dom.LIMITI_GARE_PER_CATEGORIA[dom.RACE_TYPES.L2] *
        1.5,
      [dom.RACE_TYPES.L3]:
        (dom.livelliVsrStoricoMap[dom.RACE_TYPES.L3]?.valoreNumerico || 0) *
        dom.LIMITI_GARE_PER_CATEGORIA[dom.RACE_TYPES.L3] *
        1.5,
    };
    const totalePotenzialePuntiPerGraficoTorta =
      Object.values(potenzialePuntiPerGraficoTorta).reduce(
        (sum, val) => sum + val,
        0
      ) || 1;

    const labels = [];
    const dataValues = [];
    const backgroundColors = [];
    const colori = {
      [dom.RACE_TYPES.HC]: {
        good: "rgba(220, 53, 69, 0.8)",
        needsImprovement: "rgba(220, 53, 69, 0.3)",
      },
      [dom.RACE_TYPES.L1]: {
        good: "rgba(25, 135, 84, 0.8)",
        needsImprovement: "rgba(25, 135, 84, 0.3)",
      },
      [dom.RACE_TYPES.L2]: {
        good: "rgba(255, 193, 7, 0.8)",
        needsImprovement: "rgba(255, 193, 7, 0.3)",
      },
      [dom.RACE_TYPES.L3]: {
        good: "rgba(13, 110, 253, 0.8)",
        needsImprovement: "rgba(13, 110, 253, 0.3)",
      },
    };

    categorieOrdineTooltip.forEach((tipoGara) => {
      const gareCat = gareContributive[tipoGara] || [];
      const maxSlotPerFascia = dom.LIMITI_GARE_PER_CATEGORIA[tipoGara];
      const totaleSlotCategoria = maxSlotPerFascia * 2;
      const infoLivelloDaMappa = Object.values(dom.livelliVsrStoricoMap).find(
        (l) => l.tipo === tipoGara
      );
      const livelloValoreNumerico = infoLivelloDaMappa?.valoreNumerico;
      const nomeCatBreve = infoLivelloDaMappa
        ? getTranslation(infoLivelloDaMappa.chiaveTraduzione)
        : tipoGara;

      if (totaleSlotCategoria === 0 || !livelloValoreNumerico) return;
      const percentualeRiempimento = gareCat.length / totaleSlotCategoria;
      let qualitaMediaPunti = 0;
      if (gareCat.length > 0 && livelloValoreNumerico > 0) {
        const sommaQualitaPercentuale = gareCat.reduce((sum, g) => {
          const potenzialeMaxSlotSpecifico =
            livelloValoreNumerico * g.fattoreDecadimento;
          return (
            sum +
            (potenzialeMaxSlotSpecifico > 0
              ? g.puntiEffettivi / potenzialeMaxSlotSpecifico
              : 0)
          );
        }, 0);
        qualitaMediaPunti = sommaQualitaPercentuale / gareCat.length;
      }
      let pesoRiempimento = 0.5,
        pesoQualita = 0.5;
      if (maxSlotPerFascia === 1) {
        pesoRiempimento = 0.4;
        pesoQualita = 0.6;
      } else if (maxSlotPerFascia === 3) {
        pesoRiempimento = 0.45;
        pesoQualita = 0.55;
      } else if (maxSlotPerFascia === 10) {
        pesoRiempimento = 0.6;
        pesoQualita = 0.4;
      }
      const punteggioSalutePercent =
        Math.min(
          1,
          Math.max(
            0,
            percentualeRiempimento * pesoRiempimento +
              qualitaMediaPunti * pesoQualita
          )
        ) * 100;
      saluteCategoriePerTooltip[tipoGara] = punteggioSalutePercent;
      const pesoPuntiCategoria =
        potenzialePuntiPerGraficoTorta[tipoGara] /
        totalePotenzialePuntiPerGraficoTorta;
      const dimensioneBuona =
        pesoPuntiCategoria * (punteggioSalutePercent / 100);
      const dimensioneMigliorabile =
        pesoPuntiCategoria * (1 - punteggioSalutePercent / 100);
      if (dimensioneBuona > 0.001) {
        labels.push(
          `${nomeCatBreve} (${getTranslation(
            "STRATEGY_PIE_CHART_LABEL_OPTIMIZED"
          )})`
        );
        dataValues.push(dimensioneBuona);
        backgroundColors.push(colori[tipoGara].good);
      }
      if (dimensioneMigliorabile > 0.001) {
        labels.push(
          `${nomeCatBreve} (${getTranslation(
            "STRATEGY_PIE_CHART_LABEL_IMPROVABLE"
          )})`
        );
        dataValues.push(dimensioneMigliorabile);
        backgroundColors.push(colori[tipoGara].needsImprovement);
      }
    });

    if (dataValues.length === 0) {
      labels.push(getTranslation("TEXT_NO_DATA_AVAILABLE"));
      dataValues.push(1);
      backgroundColors.push("#e9ecef");
    }
    const data = {
      labels: labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: backgroundColors,
          borderWidth: 0,
        },
      ],
    };

    if (graficoTortaIstanza) {
      graficoTortaIstanza.destroy();
      graficoTortaIstanza = null; // Ensure it's null so a new instance is created
    }

    try {
      graficoTortaIstanza = new Chart(dom.canvasGraficoTorta, {
        type: "pie",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: { boxWidth: 20, padding: 15 },
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const labelOriginal = tooltipItem.label || "";
                  if (
                    labelOriginal === getTranslation("TEXT_NO_DATA_AVAILABLE")
                  )
                    return labelOriginal;
                  const match = labelOriginal.match(/^(.+?)\s*\((.+?)\)$/);
                  const nomeCatBase = match ? match[1].trim() : labelOriginal;
                  const statoFetta = match ? match[2].trim().toLowerCase() : "";
                  const tipoGaraPerTooltip =
                    mappaTestoLabelGraficoATipoGara[nomeCatBase];
                  if (!tipoGaraPerTooltip) return labelOriginal;
                  const tooltipLines = [
                    `${nomeCatBase} (${
                      statoFetta.charAt(0).toUpperCase() + statoFetta.slice(1)
                    })`,
                  ];
                  const salutePercentualeCategoria =
                    saluteCategoriePerTooltip[tipoGaraPerTooltip] || 0;
                  tooltipLines.push(
                    `${getTranslation(
                      "STRATEGY_PIE_CHART_TOOLTIP_SLOT_HEALTH"
                    )} ${salutePercentualeCategoria.toFixed(1)}%`
                  );
                  tooltipLines.push(
                    `${getTranslation(
                      "STRATEGY_PIE_CHART_TOOLTIP_POTENTIAL_IMPROVEMENT"
                    )} ${(100 - salutePercentualeCategoria).toFixed(1)}%`
                  );
                  const potenzialeMaxCategoria =
                    potenzialePuntiPerGraficoTorta[tipoGaraPerTooltip] || 0;
                  const puntiAttualiDellaCategoria =
                    puntiAttualiPerCategoriaGrafico[tipoGaraPerTooltip] || 0;
                  const percentualePuntiVSRPerCategoria =
                    potenzialeMaxCategoria > 0
                      ? (puntiAttualiDellaCategoria / potenzialeMaxCategoria) *
                        100
                      : 0;
                  tooltipLines.push(
                    `${getTranslation(
                      "STRATEGY_PIE_CHART_TOOLTIP_VSR_POINTS"
                    )} ${formatNumber(
                      puntiAttualiDellaCategoria,
                      0
                    )} / ${formatNumber(potenzialeMaxCategoria, 0)}`
                  );
                  tooltipLines.push(
                    `${percentualePuntiVSRPerCategoria.toFixed(
                      1
                    )}% ${getTranslation(
                      "STRATEGY_PIE_CHART_TOOLTIP_PERCENT_CATEGORY_POTENTIAL"
                    )}`
                  );
                  if (tipoGaraPerTooltip !== "Generale") {
                    let punti100 = 0,
                      punti50 = 0;
                    (gareContributive[tipoGaraPerTooltip] || []).forEach(
                      (g) => {
                        const punti = g.puntiRaw || g.puntiEffettivi;
                        if (g.fattoreDecadimento === 1.0) punti100 += punti;
                        else if (g.fattoreDecadimento === 0.5) punti50 += punti;
                      }
                    );
                    if (
                      punti100 > 0 ||
                      punti50 > 0 ||
                      potenzialeMaxCategoria > 0
                    ) {
                      tooltipLines.push(
                        `  ${getTranslation(
                          "STRATEGY_PIE_CHART_TOOLTIP_FROM_100_PERCENT_BAND"
                        )} ${formatNumber(punti100, 0)}`
                      );
                      tooltipLines.push(
                        `  ${getTranslation(
                          "STRATEGY_PIE_CHART_TOOLTIP_FROM_50_PERCENT_BAND"
                        )} ${formatNumber(punti50, 0)}`
                      );
                    }
                  }
                  let suggerimentoBreveTooltip = "";
                  const limitePerFasciaTooltip =
                    dom.LIMITI_GARE_PER_CATEGORIA[tipoGaraPerTooltip];
                  const gare100AttualiTooltip = (
                    gareContributive[tipoGaraPerTooltip] || []
                  ).filter((g) => g.fattoreDecadimento === 1.0);
                  const numGare100AttualiTooltip = gare100AttualiTooltip.length;
                  const gare100InDimezzamentoTooltip =
                    gare100AttualiTooltip.filter(
                      (g) => g.mesiTrascorsi >= 9 && g.mesiTrascorsi < 12
                    ).length;
                  const slotVuoti100Tooltip =
                    limitePerFasciaTooltip - numGare100AttualiTooltip;
                  const numGareNecessarie100Tooltip =
                    slotVuoti100Tooltip + gare100InDimezzamentoTooltip;
                  if (numGareNecessarie100Tooltip > 0)
                    suggerimentoBreveTooltip = getTranslation(
                      "STRATEGY_PIE_CHART_TOOLTIP_BAND_100_STATUS_COMPLETE_STABILIZE"
                    );
                  else if (gare100AttualiTooltip.length > 0) {
                    const gare100OrdinateTooltip = [
                      ...gare100AttualiTooltip,
                    ].sort((a, b) => a.puntiEffettivi - b.puntiEffettivi);
                    const garaMenoPerformante100Tooltip =
                      gare100OrdinateTooltip[0];
                    const valoreNumericoTooltip =
                      dom.livelliVsrStoricoMap[
                        garaMenoPerformante100Tooltip.livello
                      ]?.valoreNumerico || 0;
                    const sogliaDebolezzaPuntiTooltip =
                      valoreNumericoTooltip *
                      dom.SOGLIA_DEBOLEZZA[valoreNumericoTooltip.toString()];
                    if (
                      garaMenoPerformante100Tooltip.puntiEffettivi <
                      sogliaDebolezzaPuntiTooltip
                    )
                      suggerimentoBreveTooltip = getTranslation(
                        "STRATEGY_PIE_CHART_TOOLTIP_BAND_100_STATUS_IMPROVE_WEAK"
                      );
                    else
                      suggerimentoBreveTooltip = getTranslation(
                        "STRATEGY_PIE_CHART_TOOLTIP_BAND_100_STATUS_OK"
                      );
                  } else
                    suggerimentoBreveTooltip = getTranslation(
                      "STRATEGY_PIE_CHART_TOOLTIP_BAND_100_STATUS_OK_NA"
                    );
                  if (suggerimentoBreveTooltip)
                    tooltipLines.push(suggerimentoBreveTooltip);
                  return tooltipLines;
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error("Errore in aggiornaGraficoTortaStatoStrategia:", error);
      if (graficoTortaIstanza) {
        graficoTortaIstanza.destroy();
        graficoTortaIstanza = null;
      }
      const ctx = dom.canvasGraficoTorta.getContext("2d");
      ctx.clearRect(
        0,
        0,
        dom.canvasGraficoTorta.width,
        dom.canvasGraficoTorta.height
      );
      ctx.textAlign = "center";
      ctx.fillText(
        getTranslation("TEXT_ERROR_LOADING_CHART"),
        dom.canvasGraficoTorta.width / 2,
        dom.canvasGraficoTorta.height / 2
      );
    } // This is the catch for the inner try.
  } catch (error) {
    // This is the new catch for the outer try at line 554
    console.error(
      "Errore generale in aggiornaGraficoTortaStatoStrategia:",
      error
    );
    if (graficoTortaIstanza) {
      graficoTortaIstanza.destroy();
      graficoTortaIstanza = null;
    }
    const ctx = dom.canvasGraficoTorta.getContext("2d");
    ctx.clearRect(
      0,
      0,
      dom.canvasGraficoTorta.width,
      dom.canvasGraficoTorta.height
    );
    ctx.textAlign = "center";
    ctx.fillText(
      getTranslation("TEXT_ERROR_LOADING_CHART"),
      dom.canvasGraficoTorta.width / 2,
      dom.canvasGraficoTorta.height / 2
    );
  }
}

export function aggiornaSezioneStrategia() {
  aggiornaMonitoraggioScadenze();
  aggiornaValutazioneStrategicaSlot();
}

export function initStrategyUI(domElements, globalCallbacks) {
  dom = domElements;
  callbacks = globalCallbacks;
}
