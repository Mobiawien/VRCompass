document.addEventListener('DOMContentLoaded', () => {
    // --- Elementi DOM ---
    // Navigazione
    const mainNavButtons = document.querySelectorAll('nav > .nav-button'); // Seleziona solo i .nav-button diretti figli di nav
    const viewSections = document.querySelectorAll('.view-section');

    // Dashboard
    const dashboardView = document.getElementById('dashboard-view');
    const nomeBarcaInput = document.getElementById('nome-barca');
    const classificaVsrAttualeInput = document.getElementById('classifica-vsr-attuale');

    // Gestione Crediti (ex Calcolatrice Gara)
    const gestioneCreditiView = document.getElementById('gestione-crediti-view'); // Rinominato da calcolatriceView
    const tabella1 = document.getElementById('tabella1');
    const tabella3Body = document.getElementById('tabella3').querySelector('tbody');
    // Elementi statici Tabella 2
    const outputCatEcon = document.getElementById('output-cat-econ');
    const inputBonusTotale = document.getElementById('input-bonus-totale');
    const outputSpesa = document.getElementById('output-spesa');
    const outputSpesaEffettiva = document.getElementById('output-spesa-effettiva');
    const outputPosRecupero = document.getElementById('output-pos-recupero');

    // Gestione Classifica VSR
    const classificaVsrView = document.getElementById('classifica-vsr-view');
    const formAggiungiGara = document.getElementById('form-aggiungi-gara');
    const dataGaraInput = document.getElementById('data-gara');
    const livelloGaraVsrStoricoSelect = document.getElementById('livello-gara-vsr-storico');
    const nomeRegataInput = document.getElementById('nome-regata');
    const classificaFinaleStoricoInput = document.getElementById('classifica-finale-storico');
    const puntiVsrCalcolatiInput = document.getElementById('punti-vsr-calcolati');
    const classificaVsrtbody = document.getElementById('classifica-vsr-tbody');
    const tabellaClassificaVsr = document.getElementById('tabella-classifica-vsr'); // Mantieni questo se usato altrove
    const nomeBarcaDisplay = document.getElementById('nome-barca-display');
    const classificaVsrAttualeDisplay = document.getElementById('classifica-vsr-attuale-display');

    // Pulsanti Filtro Storico Gare
    const btnMostraTutteGare = document.getElementById('btn-mostra-tutte-gare');
    const btnMostraGareValide = document.getElementById('btn-mostra-gare-valide');
    // Titoli dinamici
    const titoloFormGara = document.getElementById('titolo-form-gara');

    // Dashboard - Gestione Dati
    const btnEsportaDati = document.getElementById('btn-esporta-dati');
    const fileImportaDatiInput = document.getElementById('file-importa-dati');

    // Analisi
    const analisiView = document.getElementById('analisi-view');
    // Elementi DOM per Panoramica Slot VSR
    const hcOccupati = document.getElementById('hc-occupati');
    const hcPuntiCategoria = document.getElementById('hc-punti-categoria'); // Nuovo
    const hcPuntiAttuali = document.getElementById('hc-punti-attuali');
    const hcGareSlot = document.getElementById('hc-gare-slot');
    const hcProgressBar = document.getElementById('hc-progress-bar');

    const liv1Occupati = document.getElementById('liv1-occupati');
    const liv1PuntiCategoria = document.getElementById('liv1-punti-categoria'); // Nuovo
    const liv1MinPunti = document.getElementById('liv1-min-punti');
    const liv1GareSlot = document.getElementById('liv1-gare-slot');
    const liv1ProgressBar = document.getElementById('liv1-progress-bar');

    const liv2Occupati = document.getElementById('liv2-occupati');
    const liv2PuntiCategoria = document.getElementById('liv2-punti-categoria'); // Nuovo
    const liv2MinPunti = document.getElementById('liv2-min-punti');
    const liv2GareSlot = document.getElementById('liv2-gare-slot');
    const liv2ProgressBar = document.getElementById('liv2-progress-bar');

    const liv3Occupati = document.getElementById('liv3-occupati');
    const liv3PuntiCategoria = document.getElementById('liv3-punti-categoria'); // Nuovo
    const liv3MinPunti = document.getElementById('liv3-min-punti');
    const liv3GareSlot = document.getElementById('liv3-gare-slot');
    const liv3ProgressBar = document.getElementById('liv3-progress-bar');

    const listaSuggerimentiSlot = document.getElementById('lista-suggerimenti-slot');
    // Elementi DOM per Monitoraggio Scadenze (ora gestiti dalla sezione Strategia ma gli ID sono gli stessi)
    const listaGareDimezzamento = document.getElementById('lista-gare-dimezzamento');
    const listaGareScadenza = document.getElementById('lista-gare-scadenza');

    // Strategia
    const strategiaView = document.getElementById('strategia-view');
    const listaSuggerimentiStrategiciSlot = document.getElementById('lista-suggerimenti-strategici-slot');

    // Grafico Radar Dashboard
    const canvasGraficoRadar = document.getElementById('graficoRadarSaluteSlot');
    let graficoRadarIstanza = null; // Per tenere traccia dell'istanza del grafico

    // Grafico Torta Strategia (Spostato)
    const canvasGraficoTorta = document.getElementById('graficoTortaComposizioneVSR'); // L'ID del canvas rimane lo stesso
    let graficoTortaIstanza = null; // Per tenere traccia dell'istanza del grafico a torta

    // --- Dati Premi (sostituisce la tabella HTML nascosta) ---
    const tabellaPremiData = {
        "cat1": { "1": 8600, "2": 6518, "3": 5542, "4": 4711, "5": 4146, "6": 3731, "7": 3411, "8": 3159, "9": 2952, "10": 2778, "11": 2629, "12": 2500, "13": 2387, "14": 2287, "15": 2197, "16": 2116, "17": 2042, "18": 1975, "19": 1913, "20": 1856, "21": 1803, "22": 1754, "23": 1707, "24": 1664, "25": 1623 },
        "cat2": { "1": 7150, "2": 5419, "3": 4607, "4": 3916, "5": 3446, "6": 3099, "7": 2834, "8": 2624, "9": 2452, "10": 2308, "11": 2184, "12": 2077, "13": 1983, "14": 1900, "15": 1825, "16": 1758, "17": 1696, "18": 1641, "19": 1590, "20": 1542, "21": 1498, "22": 1457, "23": 1418, "24": 1382, "25": 1348 },
        "cat3": { "1": 5700, "2": 4320, "3": 3673, "4": 3122, "5": 2747, "6": 2472, "7": 2260, "8": 2092, "9": 1955, "10": 1840, "11": 1741, "12": 1656, "13": 1581, "14": 1515, "15": 1455, "16": 1401, "17": 1352, "18": 1308, "19": 1267, "20": 1229, "21": 1194, "22": 1161, "23": 1130, "24": 1101, "25": 1074 },
        "cat4": { "1": 4300, "2": 3259, "3": 2771, "4": 2355, "5": 2073, "6": 1865, "7": 1705, "8": 1579, "9": 1474, "10": 1387, "11": 1312, "12": 1249, "13": 1192, "14": 1143, "15": 1098, "16": 1057, "17": 1019, "18": 985, "19": 954, "20": 926, "21": 900, "22": 875, "23": 851, "24": 829, "25": 809 },
        "cat5": { "1": 2850, "2": 2160, "3": 1837, "4": 1561, "5": 1373, "6": 1235, "7": 1130, "8": 1046, "9": 977, "10": 919, "11": 869, "12": 827, "13": 789, "14": 757, "15": 727, "16": 699, "17": 675, "18": 652, "19": 632, "20": 613, "21": 596, "22": 580, "23": 564, "24": 549, "25": 536 },
        "cat6": { "1": 1425, "2": 1080, "3": 918, "4": 781, "5": 686, "6": 618, "7": 565, "8": 523, "9": 488, "10": 460, "11": 435, "12": 414, "13": 395, "14": 379, "15": 364, "16": 350, "17": 338, "18": 326, "19": 316, "20": 307, "21": 298, "22": 290, "23": 282, "24": 275, "25": 268 }
    };

    // --- Stato Applicazione ---
    let categoriaSelezionata = null;
    let attrezzatureSelezionate = {};
    let bonusBase = 0;
    let spesaAttrezzature = 0;
    let bonusExtra = 0;
    let livelloGara = null; // Manterrà il valore numerico del livello gara (es. 15000, 10000) o null
    let classificaFinale = 0; // Stato per la classifica finale inserita o calcolata
    let classificaFinaleModificataManualmente = false;
    let vistaStoricoAttuale = 'valide';
    let idGaraInModifica = null; // Per tracciare la gara in modifica

    // Mappa per i livelli VSR della sezione Storico
    const livelliVsrStoricoMap = {
        "0": { testo: "Seleziona Livello VSR", valoreNumerico: null, tipo: "N/D" },
        "VGLOBE": { testo: "Vendée Globe FC", valoreNumerico: 15000, tipo: "VGLOBE" },
        "HC": { testo: "Fuori Categoria", valoreNumerico: 15000, tipo: "HC" },
        "LIV1": { testo: "Livello 1", valoreNumerico: 10000, tipo: "LIV1" },
        "LIV2": { testo: "Livello 2", valoreNumerico: 5000, tipo: "LIV2" },
        "LIV3": { testo: "Livello 3", valoreNumerico: 3000, tipo: "LIV3" }
    };

    // Costante per i limiti delle gare per categoria VSR
    // I 'key' qui ora corrispondono ai 'tipo' in livelliVsrStoricoMap
    const LIMITI_GARE_PER_CATEGORIA = {
        "VGLOBE": 1, // Solo la Vendée Globe può occupare lo slot HC valido
        "HC": 0,     // Le HC Generiche non contribuiscono al punteggio VSR (limite 0)
        "LIV1": 3,
        "LIV2": 6,
        "LIV3": 10
    };

    // Variabili per il Grafico a Torta accessibili dalla callback del tooltip
    let potenzialePuntiPerGraficoTorta = {};
    let totalePotenzialePuntiPerGraficoTorta = 1; // Default a 1 per evitare div by zero

    // Mappa per tradurre il testo della label del grafico al tipoGara (usato nel tooltip)
    const mappaTestoLabelGraficoATipoGara = {};
    for (const key in livelliVsrStoricoMap) {
        if (livelliVsrStoricoMap[key].testo && livelliVsrStoricoMap[key].tipo && livelliVsrStoricoMap[key].valoreNumerico !== null) {
            // Usiamo il testo che viene effettivamente usato nelle label del grafico a torta
            mappaTestoLabelGraficoATipoGara[livelliVsrStoricoMap[key].testo] = livelliVsrStoricoMap[key].tipo;
        }
    }


    // Soglie per considerare uno slot "debole" (percentuale del punteggio massimo della categoria)
    // Spostata qui per essere accessibile da più funzioni
    const SOGLIA_DEBOLEZZA = {
        "15000": 0.50, // HC debole se < 50% del max (es. < 7500 pts)
        "10000": 0.40, // Liv1 debole se < 40% del max (es. < 4000 pts)
        "5000": 0.30,  // Liv2 debole se < 30% del max (es. < 1500 pts)
        "3000": 0.25   // Liv3 debole se < 25% del max (es. < 750 pts)
    };

    // Riferimenti agli elementi della Tabella 3 per aggiornamenti dinamici
    let inputClassificaTab3Ref = null;
    let cellaCreditiTab3Ref = null;
    let cellaNettoTab3Ref = null;
    let cellaPuntiTab3Ref = null;

    // --- Funzioni Helper Globali per Calcoli VSR ---
    // Spostate qui per essere accessibili da più funzioni
    function calcolaPuntiPerClassifica(livelloValoreNumerico, classifica) {
        if (!livelloValoreNumerico || classifica <= 0) {
            return 0;
        }
        return Math.round(livelloValoreNumerico / Math.pow(classifica, 0.125));
    }

    function calcolaClassificaPerPuntiTarget(livelloValoreNumerico, puntiVsrTarget) {
        if (!livelloValoreNumerico || puntiVsrTarget <= 0) {
            return null;
        }
        if (puntiVsrTarget >= livelloValoreNumerico) {
            return 1;
        }
        const rapporto = livelloValoreNumerico / puntiVsrTarget;
        const classificaCalcolata = Math.pow(rapporto, 8);
        return Math.max(1, Math.floor(classificaCalcolata));
    }




    // --- Funzioni Helper ---
    function formatNumber(num, decimalPlaces = 0) {
        if (num === null || num === undefined || isNaN(num)) {
            return 'N/A';
        }
        if (decimalPlaces === 0) {
            // Formattazione manuale per numeri interi per usare il punto come separatore delle migliaia
            const numStr = Math.round(num).toString();
            const parts = [];
            let i = numStr.length;
            while (i > 0) {
                parts.unshift(numStr.substring(Math.max(0, i - 3), i));
                i -= 3;
            }
            return parts.join('.');
        } else {
            // Per i numeri con decimali, continuiamo a usare toLocaleString.
            // Puoi scegliere 'it-IT' o 'de-DE' o un altro locale che preferisci per i decimali.
            // Nota: questo potrebbe ancora dare un separatore migliaia diverso dal punto per i decimali.
            return num.toLocaleString('it-IT', { // o 'de-DE'
                minimumFractionDigits: decimalPlaces,
                maximumFractionDigits: decimalPlaces
            });
        }
    }

    function calcolaMesiTrascorsi(dataGaraString) {
        const dataGara = new Date(dataGaraString);
        const oggi = new Date();
        dataGara.setHours(0, 0, 0, 0);
        oggi.setHours(0, 0, 0, 0);
        let mesi;
        mesi = (oggi.getFullYear() - dataGara.getFullYear()) * 12;
        mesi -= dataGara.getMonth();
        mesi += oggi.getMonth();
        if (oggi.getDate() < dataGara.getDate()) {
            mesi--;
        }
        return mesi < 0 ? 0 : mesi;
    }

    function calcolaGiorniTraDate(data1, data2) {
        const unGiorno = 24 * 60 * 60 * 1000; // Millisecondi in un giorno
        const primaData = new Date(data1);
        const secondaData = new Date(data2);
        primaData.setHours(0,0,0,0); // Normalizza per evitare problemi con orari
        secondaData.setHours(0,0,0,0); // Normalizza
        return Math.round((secondaData - primaData) / unGiorno); // Modificato per dare giorni rimanenti (può essere negativo)
    }
    // --- Funzioni di Navigazione e Inizializzazione ---
    function handleNavClick(event) {
        if (!event.currentTarget || !event.currentTarget.id) {
             console.error("handleNavClick: currentTarget o il suo ID non sono validi!", event.currentTarget);
             return;
        }
        const targetId = event.currentTarget.id.replace('btn-show-', '') + '-view';
        viewSections.forEach(section => section.style.display = 'none');

        // Rimuovi 'active' solo dai pulsanti di navigazione principale
        mainNavButtons.forEach(button => {
                button.classList.remove('active');
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
            // Se la sezione attivata è la classifica VSR, reimposta la vista a 'valide'
            if (targetId === 'classifica-vsr-view') {
                vistaStoricoAttuale = 'valide';
                if (btnMostraGareValide) btnMostraGareValide.classList.add('active');
                if (btnMostraTutteGare) btnMostraTutteGare.classList.remove('active');
                if (tabellaClassificaVsr) tabellaClassificaVsr.classList.remove('vista-tutte-attiva');
                // Nascondi il form di aggiunta gara quando si è in vista 'valide'
                if (formAggiungiGara) {
                    formAggiungiGara.style.display = 'none';
                }
                // Aggiorna i titoli per la vista 'valide'
                if (titoloFormGara) titoloFormGara.style.display = 'none'; // Nascondi titolo form
                const headerAzioni = document.getElementById('header-colonna-azioni');
                if (headerAzioni) {
                    headerAzioni.style.display = 'none';
                }
                aggiornaTabellaGare(); // Assicura che la tabella si aggiorni con la vista 'valide'
            } else if (targetId === 'analisi-view') {
                aggiornaSezioneAnalisi(); // Aggiorna i dati della sezione analisi quando viene visualizzata
            } else if (targetId === 'strategia-view') {
                aggiornaSezioneStrategia(); // Aggiorna i dati della sezione strategia quando viene visualizzata
                // Aggiorna il grafico a torta quando si passa alla sezione Strategia
                aggiornaGraficoTortaStatoStrategia();
            } else if (targetId === 'gestione-crediti-view') {
                // Se ci fossero azioni specifiche da fare quando si entra in gestione-crediti-view
            }
        }
        event.currentTarget.classList.add('active');
    }

    function init() {
        const initialButton = document.getElementById('btn-show-dashboard');
        if (initialButton) {
            handleNavClick({ target: initialButton, currentTarget: initialButton });
        }
        caricaDatiDashboard();
        aggiornaPunteggioVsrTotale();
        aggiornaInfoClassificaView();
        aggiornaTabella2();
        aggiornaTabella3();
        setupCalcolatriceListeners();
        if (btnMostraTutteGare && btnMostraGareValide) {
            setupFiltriStoricoListeners();
        }
        setupClassificaListeners();
        setupDashboardListeners();
        if (btnEsportaDati) btnEsportaDati.addEventListener('click', esportaDati);
        if (fileImportaDatiInput) fileImportaDatiInput.addEventListener('change', importaDati);
        aggiornaSezioneAnalisi(); // Chiamata iniziale per popolare i dati di analisi
        aggiornaSezioneStrategia(); // Chiamata iniziale per popolare i dati di strategia
        aggiornaGraficoRadarSaluteSlot(); // Chiamata iniziale per il grafico radar
    }

    // --- Funzioni Dashboard ---
    function setupDashboardListeners() {
        if (nomeBarcaInput) nomeBarcaInput.addEventListener('input', () => { salvaDatiDashboard(); aggiornaInfoClassificaView(); });
    }

    function caricaDatiDashboard() {
        if (nomeBarcaInput) nomeBarcaInput.value = localStorage.getItem('nomeBarca') || '';
        // La riga per nettoCreditiAttualeInput è stata rimossa
    }

    function salvaDatiDashboard() {
        if (nomeBarcaInput) localStorage.setItem('nomeBarca', nomeBarcaInput.value);
        // Il salvataggio di nettoCreditiAttuale è gestito dagli event listener su nettoCreditiAttualeInput
    }

    function aggiornaInfoClassificaView() {
        const nomeBarca = localStorage.getItem('nomeBarca') || 'N/D';
        const classificaVsrRaw = localStorage.getItem('classificaVsrAttuale') || '0';
        const classificaVsrNum = parseFloat(classificaVsrRaw) || 0;

        if (nomeBarcaDisplay && classificaVsrAttualeDisplay) {
            nomeBarcaDisplay.textContent = nomeBarca;
            classificaVsrAttualeDisplay.textContent = formatNumber(classificaVsrNum, 0);
        }
        // Aggiorna anche lo span nella dashboard per il VSR
        if (classificaVsrAttualeInput) classificaVsrAttualeInput.textContent = formatNumber(classificaVsrNum, 0);
    }

    // --- Funzioni Calcolatrice Gara ---
    function setupCalcolatriceListeners() {
        tabella1.querySelectorAll('th.categoria-cell').forEach(th => {
            th.addEventListener('click', () => selezionaCategoria(th.dataset.categoria));
        });
        tabella1.querySelectorAll('td.attrezzatura-cell').forEach(td => {
            td.addEventListener('click', () => toggleAttrezzatura(td));
        });
        if (inputBonusTotale) {
            inputBonusTotale.addEventListener('input', handleBonusInputChange);
        }
    }

    function selezionaCategoria(cat) {
        categoriaSelezionata = cat;
        attrezzatureSelezionate = {};
        spesaAttrezzature = 0;
        classificaFinaleModificataManualmente = false;
        classificaFinale = 0;
        livelloGara = null;
        tabella1.querySelectorAll('td.attrezzatura-cell.selected').forEach(td => td.classList.remove('selected'));
        tabella1.querySelectorAll('td.selected-name').forEach(td => td.classList.remove('selected-name'));
        bonusExtra = 0;
        tabella1.querySelectorAll('th.categoria-cell').forEach(th => th.classList.remove('selected-category'));
        const headerCliccato = tabella1.querySelector(`th.categoria-cell[data-categoria="${cat}"]`);
        if (headerCliccato) headerCliccato.classList.add('selected-category');
        const bonusCell = tabella1.querySelector(`.bonus-row td[data-categoria="${cat}"]`);
        bonusBase = bonusCell ? parseInt(bonusCell.textContent) : 0;
        if (inputBonusTotale) {
            inputBonusTotale.value = bonusBase;
            inputBonusTotale.title = `Bonus base: ${bonusBase}`;
        }
        ricalcolaSpesaAttrezzature();
        aggiornaTabella2();
        aggiornaTabella3();
    }

    function toggleAttrezzatura(cell) {
        if (!categoriaSelezionata) {
            alert("Seleziona prima una categoria economica!");
            return;
        }
        const nomeAttrezzatura = cell.parentNode.cells[0].textContent;
        const costo = parseInt(cell.textContent);
        const catCorrente = cell.dataset.categoria;

        classificaFinaleModificataManualmente = false;
        if (catCorrente !== categoriaSelezionata) return;
        attrezzatureSelezionate[categoriaSelezionata] = attrezzatureSelezionate[categoriaSelezionata] || {};
        attrezzatureSelezionate[categoriaSelezionata].items = attrezzatureSelezionate[categoriaSelezionata].items || {};
        if (attrezzatureSelezionate[categoriaSelezionata].items[nomeAttrezzatura]) {
            delete attrezzatureSelezionate[categoriaSelezionata].items[nomeAttrezzatura];
            cell.classList.remove('selected');
            cell.parentNode.cells[0].classList.remove('selected-name');
        } else {
            attrezzatureSelezionate[categoriaSelezionata].items[nomeAttrezzatura] = costo;
            cell.classList.add('selected');
            cell.parentNode.cells[0].classList.add('selected-name');
        }
        ricalcolaSpesaAttrezzature();
        aggiornaTabella2();
        aggiornaTabella3();
    }

    function ricalcolaSpesaAttrezzature() {
        spesaAttrezzature = 0;
        if (categoriaSelezionata && attrezzatureSelezionate[categoriaSelezionata]?.items) {
            for (const nome in attrezzatureSelezionate[categoriaSelezionata].items) {
                spesaAttrezzature += attrezzatureSelezionate[categoriaSelezionata].items[nome];
            }
        }
        if (categoriaSelezionata) {
             attrezzatureSelezionate[categoriaSelezionata] = attrezzatureSelezionate[categoriaSelezionata] || {};
             attrezzatureSelezionate[categoriaSelezionata].costoTotale = spesaAttrezzature;
        }
    }

    function handleBonusInputChange(e) {
        const nuovoBonusTotale = parseInt(e.target.value) || 0;
        bonusExtra = Math.max(0, nuovoBonusTotale - bonusBase);
        aggiornaTabella2();
        aggiornaTabella3();
    }

    function aggiornaTabella2() {
        if (!categoriaSelezionata) {
            if(outputCatEcon) outputCatEcon.textContent = 'N/D';
            if(inputBonusTotale) inputBonusTotale.value = 0;
            if(outputSpesa) outputSpesa.textContent = 'N/D';
            if(outputSpesaEffettiva) outputSpesaEffettiva.textContent = 'N/D';
            if(outputPosRecupero) outputPosRecupero.textContent = 'N/D';
            bonusExtra = 0;
            return;
        }
        const bonusTotaleCorrente = bonusBase + bonusExtra;
        const spesaEffettiva = Math.max(0, spesaAttrezzature - bonusTotaleCorrente);
        const posRecuperoNumerica = calcolaPosizioneRecupero(spesaEffettiva);

        if(outputCatEcon) outputCatEcon.textContent = categoriaSelezionata;
        if(inputBonusTotale) {
             inputBonusTotale.title = `Bonus base: ${bonusBase}`;
        }
        if(outputSpesa) outputSpesa.textContent = formatNumber(spesaAttrezzature, 0);
        if(outputSpesaEffettiva) outputSpesaEffettiva.textContent = formatNumber(spesaEffettiva, 0);

        if(outputPosRecupero) {
            if (spesaEffettiva <= 0 && posRecuperoNumerica !== null) {
                outputPosRecupero.textContent = formatNumber(posRecuperoNumerica, 0);
                 outputPosRecupero.classList.remove('important-result');
                 outputPosRecupero.classList.add('profit-result');
            } else {
                outputPosRecupero.textContent = posRecuperoNumerica !== null && posRecuperoNumerica > 0 ? formatNumber(posRecuperoNumerica, 0) : (posRecuperoNumerica === 0 ? "0" : "N/D");
                outputPosRecupero.classList.remove('profit-result');
                if (posRecuperoNumerica !== null && posRecuperoNumerica > 0) {
                    outputPosRecupero.classList.add('important-result');
                } else {
                    outputPosRecupero.classList.remove('important-result');
                }
            }
        }
        if (!classificaFinaleModificataManualmente) {
            classificaFinale = (posRecuperoNumerica !== null && posRecuperoNumerica > 0) ? posRecuperoNumerica : 0;
        }
    }

    function ricalcolaRisultatiTabella3() {
        if (!categoriaSelezionata || !cellaCreditiTab3Ref || !cellaNettoTab3Ref || !cellaPuntiTab3Ref) {
            if (cellaCreditiTab3Ref) cellaCreditiTab3Ref.textContent = 'N/A';
            if (cellaNettoTab3Ref) cellaNettoTab3Ref.textContent = 'N/A';
            if (cellaPuntiTab3Ref) cellaPuntiTab3Ref.textContent = 'N/A';
            return;
        }

        const spesaEffettiva = Math.max(0, spesaAttrezzature - (bonusBase + bonusExtra));

        let creditiVintiCalc = null;
        const premiCatData = tabellaPremiData[categoriaSelezionata];
        if (premiCatData && typeof premiCatData["1"] !== 'undefined' && classificaFinale > 0) {
            const premMax = premiCatData["1"];
            creditiVintiCalc = premMax / Math.pow(classificaFinale, 0.4);
        }

        const nettoCreditiCalc = creditiVintiCalc !== null ? creditiVintiCalc - spesaEffettiva : null;

        let puntiVSRCalc = null;
        if (livelloGara !== null && livelloGara > 0 && classificaFinale > 0) {
            puntiVSRCalc = livelloGara / Math.pow(classificaFinale, 0.125);
        }

        cellaCreditiTab3Ref.textContent = formatNumber(creditiVintiCalc, 0);
        cellaNettoTab3Ref.textContent = formatNumber(nettoCreditiCalc, 0);
        cellaPuntiTab3Ref.textContent = formatNumber(puntiVSRCalc, 0);
    }

    function aggiornaTabella3() {
        tabella3Body.innerHTML = '';
        inputClassificaTab3Ref = null; cellaCreditiTab3Ref = null; cellaNettoTab3Ref = null; cellaPuntiTab3Ref = null;

        if (!categoriaSelezionata) return;

        const row = tabella3Body.insertRow();
        const cellaLivello = row.insertCell(0);
        const selectLivello = document.createElement('select');
        const opzioniLivelloGara = [
            { testo: "Seleziona", valore: "" }, // Modificato
            // Usiamo i valori stringa come nell'HTML per coerenza
            { testo: "Vendée Globe FC", valore: "VGLOBE" },
            { testo: "Fuori Categoria", valore: "HC" },
            { testo: "Livello 1", valore: "LIV1" },
            { testo: "Livello 2", valore: "LIV2" },
            { testo: "Livello 3", valore: "LIV3" }
        ];

        opzioniLivelloGara.forEach(opzione => {
            const option = document.createElement('option');
            option.value = opzione.valore;
            option.textContent = opzione.testo;
            if (opzione.valore === "") {
                option.disabled = true;
                option.selected = livelloGara === null;
            } else if (livelliVsrStoricoMap[opzione.valore]) { // Verifica se il valore esiste nella mappa
                option.selected = livelloGara === livelliVsrStoricoMap[opzione.valore].valoreNumerico;
            } else {
                // Fallback se il valore non è nella mappa (non dovrebbe succedere con la nuova struttura)
                option.selected = false;
            }
            selectLivello.appendChild(option);
        });

        selectLivello.addEventListener('change', (e) => {
            const selectedKey = e.target.value;
            // Ottieni il valore numerico dalla mappa
            livelloGara = (selectedKey && livelliVsrStoricoMap[selectedKey]) ? livelliVsrStoricoMap[selectedKey].valoreNumerico : null;
            ricalcolaRisultatiTabella3();
        });
        cellaLivello.appendChild(selectLivello);

        const cellaClassifica = row.insertCell(1);
        inputClassificaTab3Ref = document.createElement('input');
        inputClassificaTab3Ref.type = 'number';
        inputClassificaTab3Ref.value = classificaFinale > 0 ? classificaFinale : '';
        inputClassificaTab3Ref.min = 1;
        inputClassificaTab3Ref.placeholder = "Pos.";
        inputClassificaTab3Ref.addEventListener('input', (e) => {
            classificaFinaleModificataManualmente = true;
            classificaFinale = parseInt(e.target.value) || 0;
            ricalcolaRisultatiTabella3();
        });
        cellaClassifica.appendChild(inputClassificaTab3Ref);

        cellaCreditiTab3Ref = row.insertCell(2);
        cellaCreditiTab3Ref.classList.add('calculated-result-cell');

        cellaNettoTab3Ref = row.insertCell(3);
        cellaNettoTab3Ref.classList.add('calculated-result-cell');

        cellaPuntiTab3Ref = row.insertCell(4);
        cellaPuntiTab3Ref.classList.add('calculated-result-cell');

        ricalcolaRisultatiTabella3();
    }

    function calcolaPosizioneRecupero(spesaEffettiva) {
        if (!categoriaSelezionata) return null;
        const premiCat = tabellaPremiData[categoriaSelezionata];
        if (!premiCat || typeof premiCat["1"] === 'undefined') {
            console.error(`Dati premi per il 1° posto non trovati per la categoria: ${categoriaSelezionata}`);
            return null;
        }
        const premMax = premiCat["1"];
        let posRec = 1000000;
        while (posRec > 0) {
            const creditiVintiStimati = premMax / Math.pow(posRec, 0.4);
            const nettoCreditiStimato = creditiVintiStimati - spesaEffettiva;
            if (Math.round(nettoCreditiStimato) >= 0) {
                return posRec;
            }
            posRec--;
        }
        return 0;
    }

    // --- Funzioni Gestione Classifica VSR ---
    function setupClassificaListeners() {
        formAggiungiGara.addEventListener('submit', handleSubmitGara); // Modificato per gestire aggiunta/modifica
        if (puntiVsrCalcolatiInput) puntiVsrCalcolatiInput.readOnly = true;
        livelloGaraVsrStoricoSelect.addEventListener('change', calcolaEPopolaPuntiVSRStorico);
        classificaFinaleStoricoInput.addEventListener('input', calcolaEPopolaPuntiVSRStorico);
        classificaVsrtbody.addEventListener('click', (event) => {
            if (event.target.classList.contains('elimina-gara-btn')) {
                const idGara = parseInt(event.target.dataset.id);
                if (!isNaN(idGara)) {
                    eliminaGara(idGara);
                }
            } else if (event.target.classList.contains('modifica-gara-btn')) {
                const idGara = parseInt(event.target.dataset.id);
                if (!isNaN(idGara)) {
                    popolaFormPerModifica(idGara);
                }
            }
        });
        const formInputs = [dataGaraInput, livelloGaraVsrStoricoSelect, nomeRegataInput, classificaFinaleStoricoInput];
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (vistaStoricoAttuale === 'valide' && btnMostraTutteGare) {
                    if (formAggiungiGara) { // Assicurati che il form sia visibile prima di cliccare
                        formAggiungiGara.style.display = 'block'; // o il suo display di default
                    }
                    btnMostraTutteGare.click();
                }
            });
        });
    }

    function rimuoviEvidenziazioneTutteLeRighe() {
        const righeEvidenziate = classificaVsrtbody.querySelectorAll('tr.riga-in-modifica');
        righeEvidenziate.forEach(riga => riga.classList.remove('riga-in-modifica'));
    }

    function setupFiltriStoricoListeners() {
        btnMostraTutteGare.addEventListener('click', () => {
            vistaStoricoAttuale = 'tutte';
            btnMostraTutteGare.classList.add('active');
            btnMostraGareValide.classList.remove('active');
            if (formAggiungiGara) { // Mostra il form
                formAggiungiGara.style.display = 'block'; // o il suo display di default
            }
            // Resetta il form e il titolo del pulsante submit
            if (formAggiungiGara) formAggiungiGara.reset();
            if (puntiVsrCalcolatiInput) puntiVsrCalcolatiInput.value = '';
            idGaraInModifica = null;
            rimuoviEvidenziazioneTutteLeRighe(); // Rimuovi evidenziazione
            const submitButton = formAggiungiGara.querySelector('button[type="submit"]');
            if (submitButton) submitButton.textContent = 'Aggiungi Gara';

            if (titoloFormGara) {
                titoloFormGara.style.display = 'block'; // Mostra titolo form
                // Se non siamo in modalità modifica, il titolo deve essere quello di aggiunta
                if (idGaraInModifica === null) {
                    titoloFormGara.textContent = 'Aggiungi Risultato Regata';
                }
            }
            const headerAzioni = document.getElementById('header-colonna-azioni');
            if (headerAzioni) headerAzioni.style.display = ''; // Mostra colonna azioni (ripristina display default)

            if (tabellaClassificaVsr) tabellaClassificaVsr.classList.add('vista-tutte-attiva');
            aggiornaTabellaGare(); // Riattivato
        });

        btnMostraGareValide.addEventListener('click', () => {
            vistaStoricoAttuale = 'valide';
            btnMostraGareValide.classList.add('active');
            btnMostraTutteGare.classList.remove('active');
            rimuoviEvidenziazioneTutteLeRighe(); // Rimuovi evidenziazione anche qui per sicurezza
            if (formAggiungiGara) { // Nascondi il form
                formAggiungiGara.style.display = 'none';
            }
            if (titoloFormGara) titoloFormGara.style.display = 'none'; // Nascondi titolo form
            const headerAzioni = document.getElementById('header-colonna-azioni');
            if (headerAzioni) headerAzioni.style.display = 'none'; // Nascondi colonna azioni

            if (tabellaClassificaVsr) tabellaClassificaVsr.classList.remove('vista-tutte-attiva');
            aggiornaTabellaGare(); // Riattivato
        });
    }

    function calcolaEPopolaPuntiVSRStorico() {
        const livelloSelezionatoValue = livelloGaraVsrStoricoSelect.value;
        const classifica = parseInt(classificaFinaleStoricoInput.value);
        if (livelloSelezionatoValue && livelloSelezionatoValue !== "0" && !isNaN(classifica) && classifica > 0) {
            const categoriaInfo = livelliVsrStoricoMap[livelloSelezionatoValue];
            if (categoriaInfo && categoriaInfo.valoreNumerico !== null) {
                const puntiVSRCalc = categoriaInfo.valoreNumerico / Math.pow(classifica, 0.125);
                puntiVsrCalcolatiInput.value = Math.round(puntiVSRCalc);
            } else {
                puntiVsrCalcolatiInput.value = '';
            }
        } else {
            puntiVsrCalcolatiInput.value = '';
        }
    }

    function popolaFormPerModifica(idGara) {
        const gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        const garaDaModificare = gareSalvate.find(g => g.id === idGara);

        if (garaDaModificare) {
            // Se la vista non è 'tutte', cambiala programmaticamente
            // senza innescare il reset completo di idGaraInModifica fatto dal click handler.
            if (vistaStoricoAttuale !== 'tutte') {
                vistaStoricoAttuale = 'tutte';
                btnMostraTutteGare.classList.add('active');
                btnMostraGareValide.classList.remove('active');

                if (formAggiungiGara) formAggiungiGara.style.display = 'block';
                if (titoloFormGara) {
                    titoloFormGara.style.display = 'block';
                    // Il titolo verrà impostato a "Modifica Regata Esistente" più avanti
                }
                const headerAzioni = document.getElementById('header-colonna-azioni');
                if (headerAzioni) headerAzioni.style.display = '';
                if (tabellaClassificaVsr) tabellaClassificaVsr.classList.add('vista-tutte-attiva');
                // Non chiamare aggiornaTabellaGare() qui per evitare sfarfallio,
                // l'evidenziazione verrà applicata sulla tabella esistente.
                // Se la riga non fosse visibile (improbabile), si potrebbe riconsiderare.
            }

            idGaraInModifica = idGara; // Imposta l'ID della gara in modifica

            rimuoviEvidenziazioneTutteLeRighe(); // Rimuovi evidenziazione da altre righe
            // Trova e evidenzia la riga corrente
            const rigaDaEvidenziare = classificaVsrtbody.querySelector(`button.modifica-gara-btn[data-id="${idGara}"]`)?.closest('tr');
            if (rigaDaEvidenziare) {
                rigaDaEvidenziare.classList.add('riga-in-modifica');
            }

            dataGaraInput.value = garaDaModificare.data;
            livelloGaraVsrStoricoSelect.value = garaDaModificare.livello;
            nomeRegataInput.value = garaDaModificare.nome;
            classificaFinaleStoricoInput.value = garaDaModificare.classificaFinale;
            calcolaEPopolaPuntiVSRStorico();

            const submitButton = formAggiungiGara.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = 'Salva Modifiche';
                if (titoloFormGara) titoloFormGara.textContent = 'Modifica Regata Esistente'; // Testo modificato
            }

            // Scrolla la vista al form usando un timeout per dare tempo al DOM di stabilizzarsi
            setTimeout(() => {
                if(formAggiungiGara) formAggiungiGara.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150); // Ritardo leggermente aumentato, da testare

        } else {
            console.error("Gara non trovata per la modifica:", idGara);
            alert("Errore: gara non trovata per la modifica.");
        }
    }

    function handleSubmitGara(event) { // Rinominata da aggiungiGara
        event.preventDefault();
        const dataGara = dataGaraInput.value;
        const livelloGaraStoricoVal = livelloGaraVsrStoricoSelect.value;
        const nomeRegata = nomeRegataInput.value.trim();
        const classificaFinaleStorico = parseInt(classificaFinaleStoricoInput.value);
        const puntiVSR = parseFloat(puntiVsrCalcolatiInput.value);

        if (!dataGara || livelloGaraStoricoVal === "0" || !nomeRegata || isNaN(classificaFinaleStorico) || classificaFinaleStorico <= 0 || isNaN(puntiVSR)) {
            alert('Per favore, compila correttamente tutti i campi:\n- Data\n- Livello VSR\n- Nome Regata\n- Classifica Finale (>0)\nI Punti VSR verranno calcolati automaticamente.');
            return;
        }

        let gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];

        if (idGaraInModifica !== null) {
            // Modalità Modifica
            const index = gareSalvate.findIndex(g => g.id === idGaraInModifica);
            if (index !== -1) {
                gareSalvate[index] = {
                    ...gareSalvate[index], // Mantiene l'ID originale
                    data: dataGara,
                    livello: livelloGaraStoricoVal,
                    nome: nomeRegata,
                    classificaFinale: classificaFinaleStorico,
                    puntiVSR: puntiVSR
                };
            }
            idGaraInModifica = null; // Resetta l'ID dopo la modifica
            const submitButton = formAggiungiGara.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = 'Aggiungi Gara';
                if (titoloFormGara) titoloFormGara.textContent = 'Aggiungi Risultato Regata';
            }
        } else {
            // Modalità Aggiunta
            const nuovaGara = {
                id: Date.now(),
                data: dataGara,
                livello: livelloGaraStoricoVal,
                nome: nomeRegata,
                classificaFinale: classificaFinaleStorico,
                puntiVSR: puntiVSR
            };
            gareSalvate.push(nuovaGara);
        }

        localStorage.setItem('gareSalvate', JSON.stringify(gareSalvate));
        aggiornaTabellaGare();
        rimuoviEvidenziazioneTutteLeRighe(); // Rimuovi evidenziazione dopo salvataggio/aggiunta
        aggiornaSezioneAnalisi(); // Aggiorna analisi dopo modifica/aggiunta
        aggiornaSezioneStrategia(); // Aggiorna la sezione Strategia (incluso Monitoraggio Scadenze)
        aggiornaGraficoTortaStatoStrategia(); // Aggiorna il grafico a torta
        aggiornaGraficoRadarSaluteSlot(); // Aggiorna il grafico radar
        aggiornaPunteggioVsrTotale();
        formAggiungiGara.reset();
        puntiVsrCalcolatiInput.value = '';
        // Assicura che il titolo torni corretto se la vista è 'Mostra Tutte' e non si sta modificando
        if (vistaStoricoAttuale === 'tutte' && idGaraInModifica === null && titoloFormGara) {
            titoloFormGara.textContent = 'Aggiungi Risultato Regata';
        }
    }

    // Funzione helper centralizzata per selezionare le gare contributive
    function selezionaGareContributivePerClassifica(gareSalvateRaw) {
        const gareValideConPuntiEffettivi = [];
        gareSalvateRaw.forEach(gara => {
            const mesiTrascorsi = calcolaMesiTrascorsi(gara.data);
            let fattoreDecadimento = 0;
            if (mesiTrascorsi < 12) fattoreDecadimento = 1.0;
            else if (mesiTrascorsi < 24) fattoreDecadimento = 0.5;

            // gara.livello è la chiave stringa (es. "VGLOBE", "LIV1")
            const infoLivello = livelliVsrStoricoMap[gara.livello];

            if (fattoreDecadimento > 0 && gara.puntiVSR > 0 && infoLivello) { // Assicurati che infoLivello esista
                gareValideConPuntiEffettivi.push({
                    ...gara,
                    puntiEffettivi: Math.round(gara.puntiVSR * fattoreDecadimento),
                    fattoreDecadimento: fattoreDecadimento,
                    mesiTrascorsi: mesiTrascorsi,
                    tipoGara: infoLivello.tipo // Usa il tipo dalla mappa
                });
            }
        });

        // Le chiavi qui DEVONO corrispondere ai 'tipo' definiti in livelliVsrStoricoMap
        const gareRaggruppatePerTipo = { "VGLOBE": [], "HC": [], "LIV1": [], "LIV2": [], "LIV3": [] };

        // Raggruppa per tipoGara
        gareValideConPuntiEffettivi.forEach(gara => {
            if (gareRaggruppatePerTipo.hasOwnProperty(gara.tipoGara)) {
                gareRaggruppatePerTipo[gara.tipoGara].push(gara);
            } else {
                // Questo non dovrebbe succedere se i tipi sono ben definiti
                console.warn("Tipo gara non riconosciuto durante il raggruppamento:", gara.tipoGara, gara);
            }
        });

        const gareContributiveFinali = {}; // Inizializza come oggetto vuoto

        // Ordina e applica i limiti
        for (const tipo in gareRaggruppatePerTipo) {
            if (gareRaggruppatePerTipo.hasOwnProperty(tipo)) {
                gareRaggruppatePerTipo[tipo].sort((a, b) => b.puntiEffettivi - a.puntiEffettivi);
                const limite = LIMITI_GARE_PER_CATEGORIA[tipo]; // Usa il 'tipo' come chiave
                gareContributiveFinali[tipo] = gareRaggruppatePerTipo[tipo].slice(0, limite);
            }
        }
        // Le gare HC generiche (tipo "HC") avranno limite 0 e quindi non contribuiranno.
        return gareContributiveFinali;
    }

    function getContributingGareIds() {
        const gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        if (gareSalvate.length === 0) {
            return new Set();
        }

        const gareContributive = selezionaGareContributivePerClassifica(gareSalvate);
        const contributingIds = new Set();
        for (const tipoGara in gareContributive) {
            if (gareContributive.hasOwnProperty(tipoGara)) {
                gareContributive[tipoGara].forEach(gara => contributingIds.add(gara.id));
            }
        }
        return contributingIds;
    }

    function aggiornaTabellaGare() {
        let gareDaMostrare = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        classificaVsrtbody.innerHTML = '';
        let livelloPrecedentePerSeparatore = null;

        const headerAzioni = document.getElementById('header-colonna-azioni');

        if (tabellaClassificaVsr) {
            if (vistaStoricoAttuale === 'tutte') {
                tabellaClassificaVsr.classList.add('vista-tutte-attiva');
                if (headerAzioni) headerAzioni.style.display = ''; // Mostra
            }
            else tabellaClassificaVsr.classList.remove('vista-tutte-attiva');
            if (headerAzioni && vistaStoricoAttuale === 'valide') headerAzioni.style.display = 'none'; // Nascondi

        }

        let contributingGareIds = new Set();

        if (vistaStoricoAttuale === 'valide') {
            const gareContributivePerClassifica = selezionaGareContributivePerClassifica(gareDaMostrare);
            let gareFiltrateEOrdinate = [];
            // Ordine di visualizzazione desiderato per le categorie
            const ordineVisualizzazioneTipi = ["VGLOBE", "HC", "LIV1", "LIV2", "LIV3"];

            ordineVisualizzazioneTipi.forEach(tipoGara => {
                if (gareContributivePerClassifica.hasOwnProperty(tipoGara)) {
                    // Le gare sono già ordinate per puntiEffettivi e limitate dalla funzione helper
                    // Tuttavia, le HC generiche (tipo "HC") avranno limite 0, quindi non dovrebbero apparire qui
                    // a meno che non si voglia mostrarle esplicitamente anche se non contribuiscono.
                    // Per ora, se il limite è 0, non verranno mostrate.
                    gareFiltrateEOrdinate = gareFiltrateEOrdinate.concat(
                        gareContributivePerClassifica[tipoGara]
                    );
                }
            });
            gareDaMostrare = gareFiltrateEOrdinate;
        } else {
            gareDaMostrare.sort((a, b) => new Date(b.data) - new Date(a.data));
            contributingGareIds = getContributingGareIds();
        }

        gareDaMostrare.forEach(gara => {
            const row = classificaVsrtbody.insertRow();

            // gara.livello è la chiave per livelliVsrStoricoMap (es. "VGLOBE", "LIV1")
            const infoLivelloGara = livelliVsrStoricoMap[gara.livello];
            const tipoGaraCorrente = infoLivelloGara ? infoLivelloGara.tipo : 'N/D';

            if (vistaStoricoAttuale === 'valide' && tipoGaraCorrente !== livelloPrecedentePerSeparatore) {
                if (livelloPrecedentePerSeparatore !== null) {
                    row.classList.add('nuovo-gruppo-livello');
                }
                livelloPrecedentePerSeparatore = tipoGaraCorrente;
            }

            const mesiTrascorsi = calcolaMesiTrascorsi(gara.data);
            let statoPunti = "";
            let classeStato = "";
            let inPreavvisoTesto = "";

            if (mesiTrascorsi < 12) {
                statoPunti = "100%";
                classeStato = "stato-100";
                if (mesiTrascorsi >= 9) {
                    row.classList.add('in-preavviso');
                    inPreavvisoTesto = " (Preavviso)";
                }
            } else if (mesiTrascorsi < 24) {
                statoPunti = "50%";
                classeStato = "stato-50";
                if (mesiTrascorsi >= 21) {
                    row.classList.add('in-preavviso');
                    inPreavvisoTesto = " (Preavviso)";
                }
            } else {
                statoPunti = "Scaduta";
                classeStato = "stato-scaduta";
            }

            // Se la gara è HC generica, e siamo in vista 'tutte', la marchiamo come "scaduta" ai fini della classifica
            // perché non contribuisce mai.
            if (vistaStoricoAttuale === 'tutte' && tipoGaraCorrente === 'HC' && classeStato !== "stato-scaduta") {
                 // Non la marchiamo scaduta, ma la logica successiva per il colore e lo stato gestirà la sua non contribuzione
            } else if (vistaStoricoAttuale === 'tutte' && classeStato !== "stato-scaduta" && contributingGareIds && !contributingGareIds.has(gara.id)) {
                classeStato = "stato-scaduta"; // Se non contribuisce ed è in vista 'tutte', la consideriamo "scaduta" ai fini visivi
                row.classList.remove('in-preavviso');
                inPreavvisoTesto = "";
            }
            row.classList.add(classeStato);

            const [year, month, day] = gara.data.split('-');
            const dataFormattata = `${day}/${month}/${year}`;
            row.insertCell(0).textContent = dataFormattata;

            row.insertCell(1).textContent = gara.nome;

            let testoLivello = infoLivelloGara ? infoLivelloGara.testo : gara.livello; // Usa il testo dalla mappa
            // Aggiungi nota per HC generiche che non contribuiscono
            if (tipoGaraCorrente === 'HC' && (vistaStoricoAttuale === 'valide' || (vistaStoricoAttuale === 'tutte' && !contributingGareIds.has(gara.id)))) {
                // Non aggiungiamo "(Non contrib.)" qui, lo stato lo indicherà
            }
            row.insertCell(2).textContent = testoLivello;
            row.insertCell(3).textContent = gara.classificaFinale;

            let puntiDaMostrare;
            let colorePunti = '';

            if (vistaStoricoAttuale === 'valide') {
                puntiDaMostrare = gara.puntiEffettivi;
                // Le HC generiche non appaiono in 'valide' a causa del limite 0, quindi non serve controllo specifico qui
                if (gara.fattoreDecadimento === 0.5 || puntiDaMostrare < 0) {
                     colorePunti = 'red';
                } else if (puntiDaMostrare >= 0) {
                     colorePunti = 'green';
                }
            } else { // vistaStoricoAttuale === 'tutte'
                puntiDaMostrare = gara.puntiVSR;
                if (tipoGaraCorrente === 'HC') { // Le HC generiche non contribuiscono mai
                    colorePunti = ''; // Nessun colore specifico per i punti base delle HC generiche
                } else if (classeStato !== "stato-scaduta" && puntiDaMostrare >= 0) {
                    colorePunti = 'green';
                } else if (puntiDaMostrare < 0 && classeStato !== "stato-scaduta") { // Evita rosso se già "scaduta" visivamente
                    colorePunti = 'red';
                }
                // Se è 'stato-scaduta', non applichiamo colore verde/rosso ai punti base
            }

            const puntiFormatted = puntiDaMostrare >= 0 ? `+${formatNumber(Math.round(puntiDaMostrare), 0)}` : formatNumber(Math.round(puntiDaMostrare), 0);
            const cellPunti = row.insertCell(4);
            cellPunti.textContent = puntiFormatted;
            if (colorePunti) cellPunti.style.color = colorePunti;

            const cellaStatoPunti = row.insertCell(5);
            let testoStato = (vistaStoricoAttuale === 'valide' ? statoPunti : '') + inPreavvisoTesto.trim();
            // Se è una HC generica e siamo in vista 'tutte', e non contribuisce (lo stato 'scaduta' già lo copre se non contribuisce)
            // O se è HC generica e siamo in vista 'valide' (non dovrebbe succedere per il limite 0)
            if (tipoGaraCorrente === 'HC' && (vistaStoricoAttuale === 'valide' || (vistaStoricoAttuale === 'tutte' && classeStato !== 'stato-scaduta'))) {
                testoStato = "Non Contribuisce";
            }
            cellaStatoPunti.textContent = testoStato;

            const cellaAzioni = row.insertCell(6);
            if (vistaStoricoAttuale === 'tutte') {
                cellaAzioni.style.display = ''; // Assicura che la cella sia visibile
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Elimina';
                deleteButton.classList.add('elimina-gara-btn');
                deleteButton.dataset.id = gara.id;
                cellaAzioni.appendChild(deleteButton);

                const editButton = document.createElement('button');
                editButton.textContent = 'Modifica';
                editButton.classList.add('modifica-gara-btn', 'ml-5'); // ml-5 per un po' di margine
                editButton.dataset.id = gara.id;
                cellaAzioni.appendChild(editButton);
            } else {
                cellaAzioni.style.display = 'none'; // Nascondi la cella azioni in vista 'valide'
            }
        });
    }

    function eliminaGara(idGara) {
        if (!confirm("Sei sicuro di voler eliminare questa gara?")) return;
        let gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        gareSalvate = gareSalvate.filter(g => g.id !== idGara);
        localStorage.setItem('gareSalvate', JSON.stringify(gareSalvate));
        aggiornaTabellaGare();
        aggiornaPunteggioVsrTotale();
        aggiornaGraficoTortaStatoStrategia(); // Aggiorna il grafico a torta
        aggiornaGraficoRadarSaluteSlot(); // Aggiorna il grafico radar
        aggiornaSezioneAnalisi(); // Aggiorna analisi dopo eliminazione
    }

    function aggiornaPunteggioVsrTotale() {
        const gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        if (gareSalvate.length === 0) {
            if (classificaVsrAttualeInput) { // Ora è uno span
                classificaVsrAttualeInput.textContent = formatNumber(0, 0);
            }
            localStorage.setItem('classificaVsrAttuale', '0');
            aggiornaInfoClassificaView();
            aggiornaGraficoTortaStatoStrategia(); // Aggiorna il grafico a torta anche se non ci sono gare
            aggiornaGraficoRadarSaluteSlot(); // Aggiorna il grafico radar anche se non ci sono gare
            return;
        }

        const gareContributive = selezionaGareContributivePerClassifica(gareSalvate);
        let punteggioFinaleTotale = 0;

        for (const tipoGara in gareContributive) {
            if (gareContributive.hasOwnProperty(tipoGara)) {
                // La funzione selezionaGareContributivePerClassifica ha già:
                // 1. Filtrato per validità e calcolato puntiEffettivi (arrotondati)
                // 2. Per VGLOBE, selezionato la migliore (se esiste)
                // 3. Per HC generica, applicato limite 0 (non contribuisce)
                // 4. Per gli altri livelli, ordinato e preso il numero corretto di gare
                // Quindi possiamo semplicemente sommare i puntiEffettivi delle gare restituite.
                gareContributive[tipoGara].forEach(gara => {
                    punteggioFinaleTotale += gara.puntiEffettivi;
                });
            }
        }
        const totaleArrotondato = Math.round(punteggioFinaleTotale);
        if (classificaVsrAttualeInput) { // Ora è uno span
            classificaVsrAttualeInput.textContent = formatNumber(totaleArrotondato, 0);
        }
        localStorage.setItem('classificaVsrAttuale', totaleArrotondato.toString());
        aggiornaInfoClassificaView();
    }

    // --- Funzioni Esportazione/Importazione Dati ---
    function esportaDati() {
        const datiDaEsportare = {
            nomeBarca: localStorage.getItem('nomeBarca') || '',
            classificaVsrAttuale: localStorage.getItem('classificaVsrAttuale') || '0', // Default a '0'
            gareSalvate: JSON.parse(localStorage.getItem('gareSalvate')) || []
        };

        const datiJson = JSON.stringify(datiDaEsportare, null, 2); // null, 2 per una formattazione leggibile
        const blob = new Blob([datiJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'VRCompass_backup.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('Il file VRCompass_backup.json è pronto per essere scaricato. Segui le istruzioni del browser per salvarlo.'); // Messaggio modificato per chiarezza
    }

    function importaDati(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const datiImportati = JSON.parse(e.target.result);

                // Validazione semplice della struttura dei dati importati
                if (typeof datiImportati.nomeBarca !== 'undefined' &&
                    typeof datiImportati.classificaVsrAttuale !== 'undefined' &&
                    Array.isArray(datiImportati.gareSalvate)) {

                    localStorage.setItem('nomeBarca', datiImportati.nomeBarca);
                    localStorage.setItem('classificaVsrAttuale', datiImportati.classificaVsrAttuale);
                    localStorage.setItem('gareSalvate', JSON.stringify(datiImportati.gareSalvate));

                    // Ricarica i dati nella UI e aggiorna le viste
                    caricaDatiDashboard();
                    aggiornaInfoClassificaView();
                    aggiornaTabellaGare();
                    aggiornaPunteggioVsrTotale();
                    aggiornaSezioneStrategia(); // Aggiorna anche la strategia dopo importazione
                    aggiornaSezioneAnalisi(); // Aggiorna analisi dopo importazione
                    aggiornaGraficoTortaStatoStrategia(); // Aggiorna il grafico a torta
                    aggiornaGraficoRadarSaluteSlot(); // Aggiorna il grafico radar
                    // Potrebbe essere necessario aggiornare anche la calcolatrice se i dati importati la influenzano
                    // o semplicemente resettarla
                    if (categoriaSelezionata) selezionaCategoria(categoriaSelezionata); // Resetta la calcolatrice

                    alert('Dati importati con successo!');
                } else {
                    alert('Errore: Il file selezionato non sembra essere un backup valido di VR Compass.'); // Messaggio aggiornato
                }
            } catch (error) {
                console.error("Errore durante l'importazione dei dati:", error);
                alert('Errore durante la lettura del file. Assicurati che sia un file JSON valido.');
            } finally {
                fileImportaDatiInput.value = ''; // Resetta l'input file per permettere di riselezionare lo stesso file
            }
        };
        reader.readAsText(file);
    }

    // --- Funzioni Sezione Analisi ---
    function aggiornaSezioneAnalisi() {
        aggiornaPanoramicaSlotVSR();
    }

    function getGareContributiveConDettagli() {
        const gareSalvateRaw = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        // Restituisce un oggetto con chiavi VGLOBE, HC, LIV1, LIV2, LIV3
        return selezionaGareContributivePerClassifica(gareSalvateRaw);
    }

    function aggiornaPanoramicaSlotVSR() {
        const gareContributive = getGareContributiveConDettagli();
        const suggerimenti = [];

        // SOGLIA_DEBOLEZZA è ora definita a livello di script e accessibile qui
        // Le funzioni calcolaPuntiPerClassifica e calcolaClassificaPerPuntiTarget
        // sono ora definite a livello di script e accessibili qui.

        // tipoGara qui sarà il 'tipo' della gara (VGLOBE, HC, LIV1, etc.)
        function popolaCategoriaSlot(tipoGara, gareCat, maxSlot, elOccupati, elMinPunti, elGareSlot, elProgressBar, nomeCatBreve, elPuntiCategoria) {
            elOccupati.textContent = gareCat.length; // Questa riga imposta il numero di slot occupati
            // Verifica che elGareSlot esista prima di tentare di modificarne l'innerHTML
            if (elGareSlot) {
                elGareSlot.innerHTML = ''; // Pulisci
            } else {
                // Se l'elemento non viene trovato, logga un avviso. Questo è il punto dell'errore.
                console.warn(`[VRCompass] Elemento DOM elGareSlot (es. hc-gare-slot, liv1-gare-slot, ecc.) non trovato per la categoria '${nomeCatBreve}'. Controlla l'ID corrispondente nel tuo file HTML (VRCompass.html).`);
            }
            let idContainerBase;
            if (tipoGara === 'VGLOBE') idContainerBase = 'hc'; // VGLOBE usa il container 'hc'
            else if (tipoGara === 'LIV1') idContainerBase = 'liv1';
            else if (tipoGara === 'LIV2') idContainerBase = 'liv2';
            else if (tipoGara === 'LIV3') idContainerBase = 'liv3';
            else {
                // console.warn("Tipo gara non gestito per idContainerBase:", tipoGara);
                return; // Non popolare slot per tipi non riconosciuti (es. HC generica)
            }
            const slotCategoriaContainer = document.getElementById(`slot-${idContainerBase}-container`);

            if (slotCategoriaContainer) {
                slotCategoriaContainer.classList.remove('slot-debole'); // Rimuovi eventuale classe precedente
                slotCategoriaContainer.classList.remove('slot-con-opportunita'); // Rimuovi eventuale classe precedente
            }

            // Trova la chiave corrispondente al tipoGara per accedere a valoreNumerico
            // È importante che livelloValoreNumerico sia definito PRIMA di usarlo per calcolare la qualità della barra.
            let chiaveMappaPerValoreNumerico = null;
            for (const key in livelliVsrStoricoMap) {
                if (livelliVsrStoricoMap[key].tipo === tipoGara) chiaveMappaPerValoreNumerico = key;
            }
            const infoLivelloDaMappa = chiaveMappaPerValoreNumerico ? livelliVsrStoricoMap[chiaveMappaPerValoreNumerico] : null;
            const livelloValoreNumerico = infoLivelloDaMappa ? infoLivelloDaMappa.valoreNumerico : null;

            // Calcola e mostra il totale dei punti per la categoria
            let totalePuntiCategoria = 0;
            gareCat.forEach(g => {
                totalePuntiCategoria += g.puntiEffettivi;
            });
            if (elPuntiCategoria) {
                elPuntiCategoria.textContent = formatNumber(totalePuntiCategoria, 0);
            }


            // Aggiorna la barra di progresso e il suo colore in base alla qualità
            const percentualeRiempimento = maxSlot > 0 ? (gareCat.length / maxSlot) * 100 : 0;
            if (elProgressBar) {
                elProgressBar.style.width = `${percentualeRiempimento}%`;
                // Resetta classi di qualità precedenti
                elProgressBar.classList.remove('progress-bar-good', 'progress-bar-medium', 'progress-bar-low', 'progress-bar-empty');

                let tooltipText = `Slot ${nomeCatBreve}: ${gareCat.length}/${maxSlot} gare. `;

                if (gareCat.length > 0 && livelloValoreNumerico && livelloValoreNumerico > 0) {
                    let sommaQualitaPercentuale = 0;
                    gareCat.forEach(g => {
                        sommaQualitaPercentuale += (g.puntiEffettivi / livelloValoreNumerico) * 100;
                    });
                    const qualitaMediaPercentuale = sommaQualitaPercentuale / gareCat.length;
                    // tooltipText += `Qualità media: ${qualitaMediaPercentuale.toFixed(1)}%. `; // Rimosso per semplificare

                    if (qualitaMediaPercentuale >= 75) {
                        elProgressBar.classList.add('progress-bar-good');
                        tooltipText += "Stato: Buona.";
                    } else if (qualitaMediaPercentuale >= 40) { // Soglia per media qualità (es. 40% per LIV1, 30% per LIV2 etc. potrebbe essere SOGLIA_DEBOLEZZA)
                        elProgressBar.classList.add('progress-bar-medium');
                        tooltipText += "Stato: Media.";
                    } else {
                        elProgressBar.classList.add('progress-bar-low');
                        tooltipText += "Stato: Bassa.";
                    }
                } else {
                    elProgressBar.classList.add('progress-bar-empty'); // Se non ci sono gare o non è applicabile
                    tooltipText += "Slot vuoto o qualità non applicabile.";
                }
                elProgressBar.setAttribute('title', tooltipText.trim());
            }
            let slotConsideratoDebole = false;

            if (gareCat.length > 0) {
                if (elMinPunti) { // Solo per Liv1, Liv2, Liv3
                    elMinPunti.textContent = formatNumber(gareCat[gareCat.length - 1].puntiEffettivi, 0);
                } else if (tipoGara === "VGLOBE" && hcPuntiAttuali) { // Specifico per VGLOBE (che occupa lo slot HC)
                    hcPuntiAttuali.textContent = formatNumber(gareCat[0].puntiEffettivi, 0); // La Vendée Globe è unica
                }

                gareCat.forEach(g => {
                    if (elGareSlot) { // Controlla di nuovo prima di usare appendChild
                        const p = document.createElement('p');
                        p.classList.add('gara-dettaglio');
                        p.textContent = `${g.nome}: ${formatNumber(g.puntiEffettivi, 0)} pts (Data: ${new Date(g.data).toLocaleDateString('it-IT')})`;
                        elGareSlot.appendChild(p);
                    }
                });

                if (gareCat.length < maxSlot) {
                    const slotLiberi = maxSlot - gareCat.length;
                    let suggerimentoSlotLiberi = "";
                    if (slotCategoriaContainer && slotLiberi > 0) { // Evidenzia se ci sono slot liberi
                        slotCategoriaContainer.classList.add('slot-con-opportunita');
                        suggerimentoSlotLiberi = `<span class="warning-triangle">⚠️</span> <strong>Opportunità!</strong> Hai ${slotLiberi} slot liber${slotLiberi > 1 ? 'i' : 'o'} in ${nomeCatBreve}. `;
                    }
                    // La parte "Ad esempio, un 10° posto..." non viene aggiunta per la sezione Analisi.
                    if (suggerimentoSlotLiberi) suggerimenti.push(suggerimentoSlotLiberi.trim());
                } else {
                    // Slot pieno, valutiamo la situazione
                    const puntiDaBattere = (tipoGara === "VGLOBE" && gareCat.length > 0) ? gareCat[0].puntiEffettivi : gareCat[gareCat.length - 1].puntiEffettivi;
                    let suggerimentoTestoCompleto = ""; // Questo conterrà il testo del suggerimento per la lista
                    const classificaTarget = livelloValoreNumerico ? calcolaClassificaPerPuntiTarget(livelloValoreNumerico, puntiDaBattere + 1) : null;

                    const isDeboleSecondoSoglia = livelloValoreNumerico && SOGLIA_DEBOLEZZA[livelloValoreNumerico.toString()] && puntiDaBattere < (livelloValoreNumerico * SOGLIA_DEBOLEZZA[livelloValoreNumerico.toString()]);

                    if (isDeboleSecondoSoglia) {
                        if (slotCategoriaContainer) slotCategoriaContainer.classList.add('slot-debole');
                        let testoBaseDebole = "";

                        if (tipoGara === "VGLOBE") {
                            const garaSpecifica = gareCat[0];
                            const mesiTrascorsi = calcolaMesiTrascorsi(garaSpecifica.data);
                            let eventoTesto = null;
                            let dataEventoStr = null;
                            let perditaPuntiStimata = 0;
                            const dataGaraDate = new Date(garaSpecifica.data);

                            if (mesiTrascorsi >= 9 && mesiTrascorsi < 12) { // Preavviso dimezzamento
                                eventoTesto = "dimezzamento";
                                const dataDimezzamento = new Date(dataGaraDate); dataDimezzamento.setMonth(dataGaraDate.getMonth() + 12);
                                dataEventoStr = dataDimezzamento.toLocaleDateString('it-IT');
                                perditaPuntiStimata = Math.round(garaSpecifica.puntiVSR * 0.5);
                            } else if (mesiTrascorsi >= 21 && mesiTrascorsi < 24) { // Preavviso scadenza
                                eventoTesto = "azzeramento per scadenza";
                                const dataScadenza = new Date(dataGaraDate); dataScadenza.setMonth(dataGaraDate.getMonth() + 24);
                                dataEventoStr = dataScadenza.toLocaleDateString('it-IT');
                                perditaPuntiStimata = Math.round(puntiDaBattere); // I puntiEffettivi attuali (puntiDaBattere) sono già al 50% dei puntiVSR, quindi si perdono tutti quelli.
                            }

                            if (eventoTesto) {
                                testoBaseDebole = `<strong>Attenzione ${nomeCatBreve}!</strong> Il tuo risultato di ${formatNumber(puntiDaBattere, 0)} punti (già considerato migliorabile per questa categoria) sta anche per subire un ${eventoTesto} il ${dataEventoStr}, con una perdita stimata di ${formatNumber(perditaPuntiStimata, 0)} punti.`;
                                if (classificaTarget) testoBaseDebole += ` Per migliorare, punta a un piazzamento di ${classificaTarget}° o migliore.`;
                            } else {
                                testoBaseDebole = `<strong>${nomeCatBreve} Migliorabile:</strong> Il tuo risultato di ${formatNumber(puntiDaBattere, 0)} punti è sotto la soglia ottimale per questa categoria.`;
                                if (classificaTarget) testoBaseDebole += ` Punta a un piazzamento di ${classificaTarget}° o migliore.`;
                            }
                        } else { // Altre categorie deboli
                            testoBaseDebole = `<strong>Slot Debole!</strong> In ${nomeCatBreve}, la gara meno performante ha ${formatNumber(puntiDaBattere, 0)} punti.`;
                            if (classificaTarget) testoBaseDebole += ` Punta a un piazzamento di ${classificaTarget}° o migliore.`;
                        }
                        suggerimentoTestoCompleto = `<span class="warning-triangle">⚠️</span> ${testoBaseDebole}`;
                        // La parte "Punta a un piazzamento..." è ora inclusa se classificaTarget è disponibile.
                    } else { // Slot pieno MA NON debole secondo la soglia
                        let testoBaseNonDebole = "";
                        let icona = ""; // Nessuna icona di default se non c'è preavviso

                        if (tipoGara === "VGLOBE") {
                            const garaSpecifica = gareCat[0];
                            const mesiTrascorsi = calcolaMesiTrascorsi(garaSpecifica.data);
                            let eventoTesto = null;
                            let dataEventoStr = null;
                            const dataGaraDate = new Date(garaSpecifica.data);

                            if (mesiTrascorsi >= 9 && mesiTrascorsi < 12) {
                                eventoTesto = "dimezzamento";
                                const dataDimezzamento = new Date(dataGaraDate); dataDimezzamento.setMonth(dataGaraDate.getMonth() + 12);
                                dataEventoStr = dataDimezzamento.toLocaleDateString('it-IT');
                            } else if (mesiTrascorsi >= 21 && mesiTrascorsi < 24) {
                                eventoTesto = "azzeramento per scadenza";
                                const dataScadenza = new Date(dataGaraDate); dataScadenza.setMonth(dataGaraDate.getMonth() + 24);
                                dataEventoStr = dataScadenza.toLocaleDateString('it-IT');
                            }

                            if (eventoTesto) {
                                icona = `<span class="info-icon">ℹ️</span> `; // Icona informativa per preavviso
                                testoBaseNonDebole = `<strong>${nomeCatBreve} - Preavviso:</strong> Il tuo risultato di ${formatNumber(puntiDaBattere, 0)} punti è valido, ma subirà un ${eventoTesto} il ${dataEventoStr}.`;
                                if (slotCategoriaContainer) slotCategoriaContainer.classList.add('slot-con-preavviso'); // Per styling opzionale
                            } else {
                                testoBaseNonDebole = `Lo slot ${nomeCatBreve} è in buono stato.`;
                                if (classificaTarget) testoBaseNonDebole += ` Per migliorarlo ulteriormente, punta a un piazzamento di ${classificaTarget}° o migliore.`;
                            }
                        } else { // Altre categorie piene e non deboli
                            testoBaseNonDebole = `Lo slot ${nomeCatBreve} è in buono stato.`;
                            if (classificaTarget) testoBaseNonDebole += ` Per migliorarlo ulteriormente, punta a un piazzamento di ${classificaTarget}° o migliore.`;
                        }
                        suggerimentoTestoCompleto = `${icona}${testoBaseNonDebole}`;
                        // La parte "Punta a un piazzamento..." è ora inclusa se classificaTarget è disponibile
                        // e non si tratta solo di un preavviso VGLOBE senza menzione di miglioramento.
                    }
                    if (suggerimentoTestoCompleto) suggerimenti.push(suggerimentoTestoCompleto.trim());
                }
            } else {
                if (elMinPunti) {
                    elMinPunti.textContent = 'N/A';
                } else if (tipoGara === "VGLOBE" && hcPuntiAttuali) { // Specifico per VGLOBE
                    hcPuntiAttuali.textContent = 'N/A';
                }
                if (elGareSlot) { // Controlla di nuovo prima di impostare innerHTML
                    elGareSlot.innerHTML = '<p class="no-data">Nessuna gara valida in questo slot.</p>';
                }
                let suggerimentoSlotVuoti = "";
                if (slotCategoriaContainer && maxSlot > 0) { // Evidenzia se la categoria è completamente vuota ma ha slot
                    slotCategoriaContainer.classList.add('slot-con-opportunita');
                    suggerimentoSlotVuoti = `<span class="warning-triangle">⚠️</span> <strong>Opportunità!</strong> Hai ${maxSlot} slot liber${maxSlot > 1 ? 'i' : 'o'} in ${nomeCatBreve}. `;
                }
                // Per slot vuoti, potremmo indicare una classifica target per ottenere un punteggio "base"
                if (livelloValoreNumerico) {
                    const classificaPerPunteggioMinimoDecente = calcolaClassificaPerPuntiTarget(livelloValoreNumerico, livelloValoreNumerico * 0.25); // Esempio: target per il 25% dei punti max
                    if (classificaPerPunteggioMinimoDecente && classificaPerPunteggioMinimoDecente <= 25) { // Mostra solo se è una classifica "ragionevole"
                        suggerimentoSlotVuoti += `Un piazzamento intorno al ${classificaPerPunteggioMinimoDecente}° posto sarebbe un buon inizio.`;
                    } else if (classificaPerPunteggioMinimoDecente) { // Se la classifica è alta, diciamo almeno top 25
                        suggerimentoSlotVuoti += `Punta almeno a un piazzamento nei primi 25 per iniziare a contribuire significativamente.`;
                    }
                }
                if (suggerimentoSlotVuoti) suggerimenti.push(suggerimentoSlotVuoti.trim());
            }
        }

        // Popola le categorie
        popolaCategoriaSlot("VGLOBE", gareContributive["VGLOBE"] || [], LIMITI_GARE_PER_CATEGORIA["VGLOBE"], hcOccupati, null, hcGareSlot, hcProgressBar, "Vendée Globe FC", hcPuntiCategoria);
        popolaCategoriaSlot("LIV1", gareContributive["LIV1"] || [], LIMITI_GARE_PER_CATEGORIA["LIV1"], liv1Occupati, liv1MinPunti, liv1GareSlot, liv1ProgressBar, "Livello 1", liv1PuntiCategoria);
        popolaCategoriaSlot("LIV2", gareContributive["LIV2"] || [], LIMITI_GARE_PER_CATEGORIA["LIV2"], liv2Occupati, liv2MinPunti, liv2GareSlot, liv2ProgressBar, "Livello 2", liv2PuntiCategoria);
        popolaCategoriaSlot("LIV3", gareContributive["LIV3"] || [], LIMITI_GARE_PER_CATEGORIA["LIV3"], liv3Occupati, liv3MinPunti, liv3GareSlot, liv3ProgressBar, "Livello 3", liv3PuntiCategoria);
        
        // Popola suggerimenti, solo se l'elemento listaSuggerimentiSlot esiste
        if (listaSuggerimentiSlot) {
            listaSuggerimentiSlot.innerHTML = ''; 
            if (suggerimenti.length > 0) {
                suggerimenti.forEach(sugg => {
                    const li = document.createElement('li');
                    li.innerHTML = sugg; // innerHTML per interpretare <strong>, <span> etc.
                    if (sugg.trim() !== "") listaSuggerimentiSlot.appendChild(li); 
                });
            } else {
                listaSuggerimentiSlot.innerHTML = '<li class="no-data">Analisi in corso o nessuna gara presente.</li>'; 
            }
        } else {
            // Se l'elemento non esiste, logga un avviso (opzionale, ma utile per il debug)
            // Questo console.warn è utile se ti aspetti che l'elemento esista ma non viene trovato.
            // console.warn("[VRCompass] Elemento DOM #lista-suggerimenti-slot non trovato. Impossibile popolare i suggerimenti per l'analisi.");
        }
    }

    function aggiornaMonitoraggioScadenze() {
        const gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        const gareInDimezzamento = [];
        const gareInScadenza = [];
        const oggi = new Date();
        oggi.setHours(0,0,0,0);

        gareSalvate.forEach(gara => {
            const mesiTrascorsi = calcolaMesiTrascorsi(gara.data);
            const dataGaraDate = new Date(gara.data); // Rinominato per chiarezza
            let isUrgente = false;
            let tipoEventoPerLista = null; // Per distinguere il tipo di evento nella lista

            // Controllo Dimezzamento (tra 9 e <12 mesi)
            if (mesiTrascorsi >= 9 && mesiTrascorsi < 12) {
                const tipoGaraCorrente = livelliVsrStoricoMap[gara.livello] ? livelliVsrStoricoMap[gara.livello].tipo : null;
                if (tipoGaraCorrente === 'HC') { // Le HC generiche non si dimezzano ai fini del punteggio
                    return;
                }
                const dataDimezzamento = new Date(dataGaraDate);
                dataDimezzamento.setMonth(dataGaraDate.getMonth() + 12);
                const impatto = Math.round(gara.puntiVSR * 0.5);
                isUrgente = (mesiTrascorsi === 11);
                tipoEventoPerLista = "Dimezzamento";
                gareInDimezzamento.push({ ...gara, dataEvento: dataDimezzamento.toLocaleDateString('it-IT'), impattoPunti: impatto, isUrgente, tipoEvento: tipoEventoPerLista });
            }

            // Controllo Scadenza (tra 21 e <24 mesi)
            const tipoGaraCorrente = livelliVsrStoricoMap[gara.livello] ? livelliVsrStoricoMap[gara.livello].tipo : null;
            if (tipoGaraCorrente === 'HC') { // Le HC generiche non scadono ai fini del punteggio
                 return;
            }

            if (mesiTrascorsi >= 21 && mesiTrascorsi < 24) {
                const dataScadenza = new Date(dataGaraDate);
                dataScadenza.setMonth(dataGaraDate.getMonth() + 24);
                // L'impatto è sui punti che la gara sta attualmente fornendo (che sono già al 50% o 100%)
                const impatto = Math.round(gara.puntiVSR * (mesiTrascorsi < 12 ? 1.0 : 0.5)); // Corretto impatto per scadenza
                isUrgente = (mesiTrascorsi === 23);
                tipoEventoPerLista = "Scadenza";
                gareInScadenza.push({ ...gara, dataEvento: dataScadenza.toLocaleDateString('it-IT'), impattoPunti: impatto, isUrgente, tipoEvento: tipoEventoPerLista });
            }
        });

        function popolaListaScadenze(listaElement, gare, tipoEvento) {
            listaElement.innerHTML = '';
            if (gare.length > 0) {
                gare.sort((a,b) => new Date(a.dataEvento.split('/').reverse().join('-')) - new Date(b.dataEvento.split('/').reverse().join('-'))); // Ordina per data evento
                gare.forEach(g => {
                    const li = document.createElement('li');
                    const livelloTesto = livelliVsrStoricoMap[g.livello] ? livelliVsrStoricoMap[g.livello].testo : g.livello;
                    let testoMessaggio = `${g.nome} (${livelloTesto}) - ${g.tipoEvento} il ${g.dataEvento}. Impatto: -${formatNumber(g.impattoPunti,0)} pts.`;
                    if (g.isUrgente) {
                        li.classList.add('scadenza-urgente');
                        // Calcola i giorni rimanenti
                        const [day, month, year] = g.dataEvento.split('/');
                        const dataEventoDate = new Date(`${year}-${month}-${day}`);
                        const giorniRimanenti = calcolaGiorniTraDate(new Date(), dataEventoDate);
                        const pluraleGiorni = Math.abs(giorniRimanenti) === 1 ? "giorno" : "giorni"; // Usa Math.abs per il plurale
                        testoMessaggio = `❗URGENTE: Mancan${Math.abs(giorniRimanenti) === 1 ? 'o' : 'o'} ${giorniRimanenti} ${pluraleGiorni} alla ${g.tipoEvento.toLowerCase()} (${g.dataEvento}) per ${g.nome} (${livelloTesto}). Impatto: -${formatNumber(g.impattoPunti,0)} pts.`;
                    } else {
                        li.classList.add('scadenza-in-preavviso-non-urgente');
                    }
                    li.innerHTML = testoMessaggio;
                    listaElement.appendChild(li);
                });
            } else {
                listaElement.innerHTML = `<li class="no-data">Nessuna gara in ${tipoEvento.toLowerCase()} imminente.</li>`;
            }
        }

        popolaListaScadenze(listaGareDimezzamento, gareInDimezzamento, "Dimezzamento");
        popolaListaScadenze(listaGareScadenza, gareInScadenza, "Scadenza");
    }

    // --- Funzioni Sezione Strategia ---
    function aggiornaSezioneStrategia() {
        aggiornaMonitoraggioScadenze();
        aggiornaValutazioneStrategicaSlot();
    }

    // Funzione helper per generare l'HTML dell'avviso di scadenza
    function generaAvvisoScadenzaHTML(garaSpecifica, idsGareConScadenze, gareConScadenze) {
        let avvisoScadenza = '';
        if (garaSpecifica && idsGareConScadenze.has(garaSpecifica.id)) {
            const garaInScadenza = gareConScadenze.find(g => g.id === garaSpecifica.id);
            if (garaInScadenza) {
                avvisoScadenza = ` <strong class="text-danger">Importante: questa gara è in ${garaInScadenza.tipoEvento} il ${garaInScadenza.dataEvento}!</strong>`;
                if (garaInScadenza.isUrgente) {
                    const [day, month, year] = garaInScadenza.dataEvento.split('/');
                    const dataEventoDate = new Date(`${year}-${month}-${day}`);
                    const giorniRimanenti = calcolaGiorniTraDate(new Date(), dataEventoDate);
                    const pluraleGiorni = Math.abs(giorniRimanenti) === 1 ? "giorno" : "giorni";
                    avvisoScadenza = ` <strong class="text-danger">❗URGENTE: Mancan${Math.abs(giorniRimanenti) === 1 ? 'o' : 'o'} ${giorniRimanenti} ${pluraleGiorni} alla ${garaInScadenza.tipoEvento.toLowerCase()} di questa gara (${garaInScadenza.dataEvento})!</strong>`;
                }
            }
        }
        return avvisoScadenza;
    }
    // Funzione helper per ottenere le gare in scadenza o dimezzamento con dettagli utili
    function getGareConScadenzeImminenti() {
        const gareSalvate = JSON.parse(localStorage.getItem('gareSalvate')) || [];
        const oggi = new Date();
        oggi.setHours(0,0,0,0);
        const scadenze = [];

        gareSalvate.forEach(gara => {
            const mesiTrascorsi = calcolaMesiTrascorsi(gara.data);
            const dataGaraDate = new Date(gara.data);
            let tipoEvento = null;
            let dataEventoObj = null; // Oggetto Date per dataEvento
            let isUrgente = false;
            let impattoPuntiStimato = 0;

            if (mesiTrascorsi >= 9 && mesiTrascorsi < 12) { // Dimezzamento imminente
                const tipoGaraCorrente = livelliVsrStoricoMap[gara.livello] ? livelliVsrStoricoMap[gara.livello].tipo : null;
                if (tipoGaraCorrente === 'HC') { // Le HC generiche non si dimezzano ai fini del punteggio
                    return;
                }

                tipoEvento = "Dimezzamento";
                dataEventoObj = new Date(dataGaraDate); dataEventoObj.setMonth(dataGaraDate.getMonth() + 12);
                isUrgente = (mesiTrascorsi === 11);
                impattoPuntiStimato = Math.round(gara.puntiVSR * 0.5);
            } else if (mesiTrascorsi >= 21 && mesiTrascorsi < 24) { // Scadenza imminente
                const tipoGaraCorrente = livelliVsrStoricoMap[gara.livello] ? livelliVsrStoricoMap[gara.livello].tipo : null; // Aggiunto per coerenza
                if (tipoGaraCorrente === 'HC') { // Le HC generiche non scadono ai fini del punteggio
                    return;
                }
                tipoEvento = "Scadenza";
                dataEventoObj = new Date(dataGaraDate); dataEventoObj.setMonth(dataGaraDate.getMonth() + 24);
                isUrgente = (mesiTrascorsi === 23);
                impattoPuntiStimato = Math.round(gara.puntiVSR * (mesiTrascorsi < 12 ? 1.0 : 0.5)); // Punti che verranno persi
            }
            if (tipoEvento && dataEventoObj) {
                scadenze.push({ ...gara, tipoEvento, dataEvento: dataEventoObj.toLocaleDateString('it-IT'), isUrgente, impattoPunti: impattoPuntiStimato });
            }
        });
        return scadenze;
    }

    function aggiornaValutazioneStrategicaSlot() {
        if (!listaSuggerimentiStrategiciSlot) return;

        const gareContributive = getGareContributiveConDettagli();
        const suggerimentiStrategici = [];
        const gareConScadenze = getGareConScadenzeImminenti(); // Ottieni gare con scadenze
        const idsGareConScadenze = new Set(gareConScadenze.map(g => g.id));

        // Definizioni strategiche per categoria
        const strategiePerCategoria = {
            "VGLOBE": { // Vendée Globe
                nomeBreve: "Vendée Globe FC",
                iconaAzione: "🎯",
                testoSlotLibero: "<strong>Opportunità a Lungo Termine Vendée Globe FC:</strong> Lo slot è libero. La Vendée Globe è un evento quadriennale cruciale. Quando la prossima edizione sarà annunciata, la partecipazione sarà fondamentale per un VSR competitivo. <em>Nel frattempo, ottimizza al massimo gli slot di Livello 1, 2 e 3.</em>",
                testoSlotDebole: (punti, classificaTarget, garaSpecifica) => { // classificaTarget può essere meno rilevante nel testo finale
                    const puntiAttualiFormattati = formatNumber(punti, 0);
                    let messaggioStrategico = "";

                    if (garaSpecifica && idsGareConScadenze.has(garaSpecifica.id)) {
                        const garaInScadenza = gareConScadenze.find(g => g.id === garaSpecifica.id);
                        if (garaInScadenza && garaInScadenza.isUrgente) { // Caso URGENTE e DEBOLE
                            const evento = garaInScadenza.tipoEvento.toLowerCase();
                            const dataEvento = garaInScadenza.dataEvento;
                            const [day, month, year] = dataEvento.split('/');
                            const dataEventoDate = new Date(`${year}-${month}-${day}`);
                            const giorniRimanenti = calcolaGiorniTraDate(new Date(), dataEventoDate);
                            const pluraleGiorni = Math.abs(giorniRimanenti) === 1 ? "giorno" : "giorni";
                            const testoGiorni = `tra ${giorniRimanenti} ${pluraleGiorni} (${dataEvento})`;

                            if (evento === "scadenza") {
                                messaggioStrategico = `<strong>Azione Urgentissima Vendée Globe FC:</strong> Il tuo risultato attuale di ${puntiAttualiFormattati} punti scadrà ${testoGiorni}. Questo slot si azzererà a breve.`;
                            } else { // Dimezzamento
                                const puntiPersiFormattati = formatNumber(garaInScadenza.impattoPunti, 0);
                                messaggioStrategico = `<strong>Azione Urgentissima Vendée Globe FC:</strong> Il tuo risultato attuale di ${puntiAttualiFormattati} punti si dimezzerà ${testoGiorni}. Questo slot perderà ${puntiPersiFormattati} punti a breve.`;
                            }
                        } else { // Caso DEBOLE ma NON URGENTE (o senza preavviso specifico)
                            messaggioStrategico = `<strong>Azione Critica Vendée Globe FC:</strong> Il tuo risultato attuale di ${puntiAttualiFormattati} punti è sotto la soglia ottimale.`;
                        }
                    } else { // Caso DEBOLE ma senza preavviso di scadenza/dimezzamento imminente
                        messaggioStrategico = `<strong>Azione Critica Vendée Globe FC:</strong> Il tuo risultato attuale di ${puntiAttualiFormattati} punti è sotto la soglia ottimale.`;
                    }
                    return `${messaggioStrategico} Data la natura quadriennale della Vendée Globe, è improbabile poter migliorare questo slot a breve. <strong>Strategia consigliata:</strong> Concentrati sul massimizzare i tuoi punteggi negli slot di Livello 1, 2 e 3 per compensare questa situazione e migliorare il tuo VSR complessivo.`;
                },
                testoSlotPienoOK: (punti) => `✅ <strong>Stato Vendée Globe FC Ottimale:</strong> Slot coperto con ${formatNumber(punti, 0)} punti. <em>Ottimo lavoro! Monitora eventuali preavvisi di dimezzamento/scadenza futuri.</em>`
            },
            "LIV1": { // Livello 1
                nomeBreve: "Livello 1",
                iconaAzione: "🎯",
                testoSlotLibero: (slotLiberi, puntiEsempio) => `<strong>Azione Livello 1:</strong> Hai ${slotLiberi} slot liber${slotLiberi > 1 ? 'i' : 'o'}. ${puntiEsempio ? `Un 10° posto potrebbe dare circa ${formatNumber(puntiEsempio,0)} pts.` : ''} <em>Questa categoria offre un buon bilanciamento punti/accessibilità. Riempi questi slot con risultati solidi.</em>`,
                testoSlotDebole: (punti, classificaTarget, garaSpecifica) => {
                    const avvisoScadenza = generaAvvisoScadenzaHTML(garaSpecifica, idsGareConScadenze, gareConScadenze);
                    return `<strong>Azione Livello 1:</strong> Migliora il tuo risultato meno performante (${formatNumber(punti, 0)} punti, obiettivo: ${classificaTarget}° posto). <em>Sostituire gare deboli qui è efficace per il VSR, data la frequenza degli eventi.</em>${avvisoScadenza}`;
                }
            },
            "LIV2": { // Livello 2
                nomeBreve: "Livello 2",
                iconaAzione: "🎯",
                testoSlotLibero: (slotLiberi, puntiEsempio) => `<strong>Azione Livello 2:</strong> Hai ${slotLiberi} slot liber${slotLiberi > 1 ? 'i' : 'o'}. ${puntiEsempio ? `Un 10° posto potrebbe dare circa ${formatNumber(puntiEsempio,0)} pts.` : ''} <em>Utili per completare la classifica e fare "volume". Non trascurarle.</em>`,
                testoSlotDebole: (punti, classificaTarget, garaSpecifica) => {
                    const avvisoScadenza = generaAvvisoScadenzaHTML(garaSpecifica, idsGareConScadenze, gareConScadenze);
                    return `<strong>Azione Livello 2:</strong> Migliora il tuo risultato meno performante (${formatNumber(punti, 0)} punti, obiettivo: ${classificaTarget}° posto). <em>Data l'alta frequenza, ottimizza costantemente questa categoria.</em>${avvisoScadenza}`;
                }
            },
            "LIV3": { // Livello 3
                nomeBreve: "Livello 3",
                iconaAzione: "🎯",
                testoSlotLibero: (slotLiberi, puntiEsempio) => `<strong>Azione Livello 3:</strong> Hai ${slotLiberi} slot liber${slotLiberi > 1 ? 'i' : 'o'}. ${puntiEsempio ? `Un 10° posto potrebbe dare circa ${formatNumber(puntiEsempio,0)} pts.` : ''} <em>L'obiettivo primario è riempire tutti i 10 slot. Anche punteggi modesti contribuiscono.</em>`,
                testoSlotDebole: (punti, classificaTarget, garaSpecifica) => {
                    const avvisoScadenza = generaAvvisoScadenzaHTML(garaSpecifica, idsGareConScadenze, gareConScadenze);
                    return `<strong>Azione Livello 3:</strong> Migliora il tuo risultato meno performante (${formatNumber(punti, 0)} punti, obiettivo: ${classificaTarget}° posto). <em>Data l'abbondanza di gare, "pulire" i punteggi bassi qui è semplice.</em>${avvisoScadenza}`;
                }
            }
        };

        const ordineTipiPerStrategia = ["VGLOBE", "LIV1", "LIV2", "LIV3"]; // HC generiche non hanno strategia attiva

        ordineTipiPerStrategia.forEach(tipoGara => {
            const gareCat = gareContributive[tipoGara] || [];
            const maxSlot = LIMITI_GARE_PER_CATEGORIA[tipoGara];
            // Trova la chiave corrispondente al tipoGara per accedere a valoreNumerico
            let chiaveMappaPerValoreNumerico = null;
            for (const key in livelliVsrStoricoMap) {
                if (livelliVsrStoricoMap[key].tipo === tipoGara) chiaveMappaPerValoreNumerico = key;
            }
            const infoLivelloDaMappa = chiaveMappaPerValoreNumerico ? livelliVsrStoricoMap[chiaveMappaPerValoreNumerico] : null;
            const livelloValoreNumerico = infoLivelloDaMappa ? infoLivelloDaMappa.valoreNumerico : null;

            const infoStrategia = strategiePerCategoria[tipoGara];

            if (!infoStrategia || !livelloValoreNumerico) { // Aggiunto controllo per livelloValoreNumerico
                // console.warn("Info strategia o valore numerico livello non trovati per tipoGara:", tipoGara);
                return;
            }

            let icona = infoStrategia.iconaAzione ? `<span class="warning-triangle">${infoStrategia.iconaAzione}</span>` : `<span class="warning-triangle">⚠️</span>`;

            if (gareCat.length < maxSlot) { // Ci sono slot liberi
                const slotLiberi = maxSlot - gareCat.length;
                let puntiEsempio = null;
                if (livelloValoreNumerico) {
                    puntiEsempio = calcolaPuntiPerClassifica(livelloValoreNumerico, 10);
                }
                let testoSuggerimento = "";
                if (tipoGara === "VGLOBE") {
                    testoSuggerimento = infoStrategia.testoSlotLibero;
                } else {
                    testoSuggerimento = infoStrategia.testoSlotLibero(slotLiberi, puntiEsempio);
                }
                suggerimentiStrategici.push(`${icona} ${testoSuggerimento}`);

            } else { // Tutti gli slot sono pieni, controlliamo se sono deboli
                const puntiDaBattere = (tipoGara === "VGLOBE" && gareCat.length > 0) ? gareCat[0].puntiEffettivi : gareCat[gareCat.length - 1].puntiEffettivi;
                const isDebole = livelloValoreNumerico && SOGLIA_DEBOLEZZA[livelloValoreNumerico.toString()] && puntiDaBattere < (livelloValoreNumerico * SOGLIA_DEBOLEZZA[livelloValoreNumerico.toString()]);

                if (isDebole) {
                    // Slot debole
                    const classificaTarget = calcolaClassificaPerPuntiTarget(livelloValoreNumerico, puntiDaBattere + 1);
                    const garaDebole = (tipoGara === "VGLOBE" && gareCat.length > 0) ? gareCat[0] : gareCat[gareCat.length - 1];
                    suggerimentiStrategici.push(`${icona} ${infoStrategia.testoSlotDebole(puntiDaBattere, classificaTarget, garaDebole)}`);
                } else { // Slot pieno E NON debole
                    if (tipoGara === "VGLOBE") {
                        const garaSpecifica = gareCat[0]; // C'è solo una gara VGLOBE
                        const puntiAttualiFormattati = formatNumber(garaSpecifica.puntiEffettivi, 0);
                        let messaggioStrategicoVGlobeNonDebole = "";
                        let preavvisoAttivo = false;

                        if (idsGareConScadenze.has(garaSpecifica.id)) {
                            const garaInScadenza = gareConScadenze.find(g => g.id === garaSpecifica.id);
                            if (garaInScadenza) {
                                const evento = garaInScadenza.tipoEvento.toLowerCase();
                                const dataEvento = garaInScadenza.dataEvento;

                                if (garaInScadenza.isUrgente) {
                                    preavvisoAttivo = true; // Solo se urgente mostriamo il messaggio specifico
                                    const [day, month, year] = dataEvento.split('/');
                                    const dataEventoDate = new Date(`${year}-${month}-${day}`);
                                    const giorniRimanenti = calcolaGiorniTraDate(new Date(), dataEventoDate);
                                    const pluraleGiorni = Math.abs(giorniRimanenti) === 1 ? "giorno" : "giorni";
                                    const testoGiorni = `tra ${giorniRimanenti} ${pluraleGiorni} (${dataEvento})`;

                                    if (evento === "scadenza") {
                                        messaggioStrategicoVGlobeNonDebole = `<span class="info-icon">ℹ️</span> <strong class="text-danger">❗URGENTE:</strong> Il tuo risultato Vendée Globe FC di ${puntiAttualiFormattati} punti scadrà ${testoGiorni}. Questo slot si azzererà a breve.`;
                                    } else { // Dimezzamento
                                        const puntiPersiFormattati = formatNumber(garaInScadenza.impattoPunti, 0);
                                        messaggioStrategicoVGlobeNonDebole = `<span class="info-icon">ℹ️</span> <strong class="text-danger">❗URGENTE:</strong> Il tuo risultato Vendée Globe FC di ${puntiAttualiFormattati} punti si dimezzerà ${testoGiorni}, perdendo ${puntiPersiFormattati} punti.`;
                                    }
                                    messaggioStrategicoVGlobeNonDebole += ` Poiché la prossima Vendée Globe non è imminente, è saggio rafforzare il VSR attraverso gli slot di Livello 1, 2 e 3.`;
                                } else { // Preavviso NON urgente
                                    preavvisoAttivo = true;
                                    messaggioStrategicoVGlobeNonDebole = `<span class="info-icon">ℹ️</span> <strong>Preavviso Vendée Globe FC:</strong> Il tuo risultato di ${puntiAttualiFormattati} punti subirà un ${evento} il ${dataEvento}. Poiché la prossima Vendée Globe non è imminente, è saggio rafforzare il VSR attraverso gli slot di Livello 1, 2 e 3.`;
                                }
                            }
                        }

                        if (preavvisoAttivo) {
                            suggerimentiStrategici.push(messaggioStrategicoVGlobeNonDebole);
                        } else if (infoStrategia.testoSlotPienoOK) { // Non debole, non in preavviso -> OK
                            suggerimentiStrategici.push(infoStrategia.testoSlotPienoOK(puntiAttualiFormattati));
                        }
                    } else {
                        // Per LIV1, LIV2, LIV3 pieni e non deboli, attualmente non viene dato un suggerimento specifico.
                        // Potremmo aggiungere un messaggio "Slot [NomeLivello] in buono stato. Mantieni così!" o simile se necessario.
                    }
                }
            }
        });

        // Aggiungi un suggerimento generale se ci sono scadenze importanti
        if (gareConScadenze.length > 0) {
            let testoScadenzeImportanti = "Ricorda di monitorare le tue gare in scadenza/dimezzamento. Sostituirle tempestivamente è cruciale, specialmente se contribuiscono significativamente al tuo VSR.";
            const gareHCoL1InScadenza = gareConScadenze.filter(g => {
                const tipoGara = livelliVsrStoricoMap[g.livello] ? livelliVsrStoricoMap[g.livello].tipo : null;
                return tipoGara === "VGLOBE" || tipoGara === "LIV1";
            });

            if (gareHCoL1InScadenza.length > 0) {
                testoScadenzeImportanti = `<strong>Priorità Scadenze:</strong> Hai gare importanti (HC/Liv.1) in ${gareHCoL1InScadenza[0].tipoEvento} il ${gareHCoL1InScadenza[0].dataEvento}. La loro sostituzione dovrebbe essere una priorità alta per non perdere punti preziosi! Controlla il "Monitoraggio Scadenze" per i dettagli.`;
            }
            suggerimentiStrategici.unshift(`<span class="warning-triangle calendar-icon">🗓️</span> ${testoScadenzeImportanti}`);
        }

        listaSuggerimentiStrategiciSlot.innerHTML = '';
        if (suggerimentiStrategici.length > 0) {
            suggerimentiStrategici.forEach(sugg => {
                const li = document.createElement('li');
                li.innerHTML = sugg;
                listaSuggerimentiStrategiciSlot.appendChild(li);
            });
        } else {
            // Se non ci sono suggerimenti specifici (es. tutti gli slot sono pieni e forti, tranne HC)
            // Potremmo mettere un messaggio generico o lasciare vuoto.
            // Per ora, se non ci sono debolezze o opportunità chiare, non mostriamo nulla di specifico.
            // Un caso potrebbe essere se tutti gli slot sono pieni e con punteggi "buoni".
            // In alternativa, un messaggio di "Situazione VSR stabile."
             listaSuggerimentiStrategiciSlot.innerHTML = '<li class="no-data">Nessuna azione strategica prioritaria identificata per gli slot. Controlla le scadenze.</li>';
        }
    }

    // --- Event Listener Generali ---
    mainNavButtons.forEach(button => button.addEventListener('click', handleNavClick));

    // --- Inizializzazione ---
    init();

    // --- Funzioni Grafico Torta Strategia ---
    function aggiornaGraficoTortaStatoStrategia() {
        if (!canvasGraficoTorta) return;

        const gareContributive = getGareContributiveConDettagli();

        // Calcola i punti VSR attuali per ogni categoria per il tooltip
        const puntiAttualiPerCategoriaGrafico = {};
        const categorieOrdineTooltip = ["VGLOBE", "LIV1", "LIV2", "LIV3"]; // Stesso ordine del grafico
        categorieOrdineTooltip.forEach(tipoGara => {
            const gareCat = gareContributive[tipoGara] || [];
            let sommaPunti = 0;
            gareCat.forEach(g => sommaPunti += g.puntiEffettivi);
            puntiAttualiPerCategoriaGrafico[tipoGara] = sommaPunti;
        });
        // Calcola il potenziale massimo di punti per ogni categoria e il totale
        const potenzialePuntiCategoria = {
            "VGLOBE": (livelliVsrStoricoMap["VGLOBE"]?.valoreNumerico || 0) * LIMITI_GARE_PER_CATEGORIA["VGLOBE"],
            "LIV1": (livelliVsrStoricoMap["LIV1"]?.valoreNumerico || 0) * LIMITI_GARE_PER_CATEGORIA["LIV1"],
            "LIV2": (livelliVsrStoricoMap["LIV2"]?.valoreNumerico || 0) * LIMITI_GARE_PER_CATEGORIA["LIV2"],
            "LIV3": (livelliVsrStoricoMap["LIV3"]?.valoreNumerico || 0) * LIMITI_GARE_PER_CATEGORIA["LIV3"]
        };

        let totalPotentialPoints = 0;
        for (const tipo in potenzialePuntiCategoria) {
            totalPotentialPoints += potenzialePuntiCategoria[tipo];
        }
        // Rendi disponibili queste variabili per la callback del tooltip
        potenzialePuntiPerGraficoTorta = potenzialePuntiCategoria;
        totalePotenzialePuntiPerGraficoTorta = totalPotentialPoints > 0 ? totalPotentialPoints : 1;

        if (totalPotentialPoints === 0) totalPotentialPoints = 1; // Evita divisione per zero se tutti i potenziali sono 0

        const labels = [];
        const dataValues = [];
        const backgroundColors = [];
        const borderColors = []; // Array per i colori dei bordi
        const borderWidths = []; // Array per gli spessori dei bordi

        // Definisci l'ordine e i colori per le categorie
        const categorieOrdine = ["VGLOBE", "LIV1", "LIV2", "LIV3"];
        const colori = {
            "VGLOBE": { good: 'rgba(220, 53, 69, 0.8)', needsImprovement: 'rgba(220, 53, 69, 0.3)' },   // Rosso Bootstrap (danger)
            "LIV1": { good: 'rgba(25, 135, 84, 0.8)', needsImprovement: 'rgba(25, 135, 84, 0.3)' },    // Verde Bootstrap (success)
            "LIV2": { good: 'rgba(255, 193, 7, 0.8)', needsImprovement: 'rgba(255, 193, 7, 0.3)' },   // Giallo Bootstrap (warning)
            "LIV3": { good: 'rgba(13, 110, 253, 0.8)', needsImprovement: 'rgba(13, 110, 253, 0.3)' }   // Blu Bootstrap (primary)
        };

        categorieOrdine.forEach(tipoGara => {
            const gareCat = gareContributive[tipoGara] || [];
            const maxSlot = LIMITI_GARE_PER_CATEGORIA[tipoGara];

            // Trova il valore numerico del livello dalla mappa
            let chiaveMappaPerValoreNumerico = null;
            for (const key in livelliVsrStoricoMap) {
                if (livelliVsrStoricoMap[key].tipo === tipoGara) chiaveMappaPerValoreNumerico = key;
            }
            const infoLivelloDaMappa = chiaveMappaPerValoreNumerico ? livelliVsrStoricoMap[chiaveMappaPerValoreNumerico] : null;
            const livelloValoreNumerico = infoLivelloDaMappa ? infoLivelloDaMappa.valoreNumerico : null;
            const nomeCatBreve = infoLivelloDaMappa ? infoLivelloDaMappa.testo : tipoGara;

            if (maxSlot === 0 || !livelloValoreNumerico) {
                 // Non includere categorie senza slot o senza valore numerico (es. HC generica)
                 return;
            }

            const punteggioSalute = calcolaPunteggioSaluteCategoria(gareCat, maxSlot, livelloValoreNumerico); // 0-100

            // Calcola la dimensione delle fette in base al POTENZIALE DI PUNTEGGIO della categoria e al punteggio di salute
            const pesoPuntiCategoria = potenzialePuntiCategoria[tipoGara] / totalPotentialPoints; // Peso della categoria sul totale dei punti potenziali (0-1)

            const dimensioneBuona = pesoPuntiCategoria * (punteggioSalute / 100);
            const dimensioneMigliorabile = pesoPuntiCategoria * (1 - (punteggioSalute / 100));

            // Aggiungi i dati per la fetta "Buona"
            if (dimensioneBuona > 0.001) { // Aggiungi solo se la dimensione è > 0 per evitare fette invisibili e problemi di rendering
                labels.push(`${nomeCatBreve} (Ottimizzato)`);
                dataValues.push(dimensioneBuona);
                backgroundColors.push(colori[tipoGara].good);
                borderColors.push('#444'); // Bordo scuro per l'inizio di una nuova categoria
                borderWidths.push(0);     // Nessun bordo
            }

            // Aggiungi i dati per la fetta "Migliorabile"
            if (dimensioneMigliorabile > 0.001) { // Aggiungi solo se la dimensione è > 0
                 labels.push(`${nomeCatBreve} (Migliorabile)`);
                 dataValues.push(dimensioneMigliorabile);
                 backgroundColors.push(colori[tipoGara].needsImprovement);
                 borderColors.push('#fff'); // Bordo bianco standard per la parte migliorabile
                 borderWidths.push(0);     // Nessun bordo per la parte migliorabile
            }
        });

        // Se non ci sono dati (es. nessuna gara salvata), mostra un grafico vuoto o un messaggio
        if (dataValues.length === 0) {
             // Potremmo mostrare un grafico vuoto o nascondere il canvas e mostrare un messaggio
             // Per ora, creiamo un grafico con dati 0 che risulterà vuoto
             labels.push("Nessun dato disponibile");
             dataValues.push(1); // Una singola fetta che occupa tutto lo spazio
             backgroundColors.push('#e9ecef'); // Grigio chiaro
             borderColors.push('#ccc'); // Irrilevante con spessore 0
             borderWidths.push(0);      // Nessun bordo
        }


        const data = {
            labels: labels,
            datasets: [{
                label: 'Stato Ottimizzazione Slot',
                data: dataValues,
                backgroundColor: backgroundColors,
                borderColor: borderColors, // Usa l'array dei colori dei bordi
                borderWidth: borderWidths  // Usa l'array degli spessori dei bordi
            }]
        };

        if (graficoTortaIstanza) {
            graficoTortaIstanza.data = data;
            graficoTortaIstanza.update();
        } else {
            graficoTortaIstanza = new Chart(canvasGraficoTorta, {
                type: 'pie',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Permette al CSS di controllare l'altezza
                    plugins: {
                        legend: {
                            position: 'right', // Legenda a destra
                            labels: { boxWidth: 20, padding: 15 }
                        },
                        title: { display: false }, // Titolo già presente nell'HTML
                        tooltip: { // Configurazione Tooltip
                            callbacks: {
                                label: function(tooltipItem) { // Rinominato context in tooltipItem per chiarezza
                                    const labelOriginal = tooltipItem.label || ''; // e.g., "Livello 1 (Ottimizzato)"
                                    const rawValue = tooltipItem.parsed || 0; // Proporzione della fetta sul totale potenziale VSR

                                    if (labelOriginal === "Nessun dato disponibile") {
                                        return labelOriginal;
                                    }

                                    // Estrai nome base categoria (es. "Livello 1") e stato fetta (es. "Ottimizzato")
                                    const match = labelOriginal.match(/^(.+?)\s*\((.+?)\)$/);
                                    const nomeCatBase = match ? match[1].trim() : labelOriginal;
                                    const statoFetta = match ? match[2].trim().toLowerCase() : '';

                                    const tipoGara = mappaTestoLabelGraficoATipoGara[nomeCatBase];
                                    if (!tipoGara) return labelOriginal; // Fallback

                                    const potenzialeMaxCategoria = potenzialePuntiPerGraficoTorta[tipoGara] || 0;
                                    const puntiAttualiDellaCategoria = puntiAttualiPerCategoriaGrafico[tipoGara] || 0;

                                    let percentualePuntiVSRPerCategoria = 0;
                                    if (potenzialeMaxCategoria > 0) {
                                        percentualePuntiVSRPerCategoria = (puntiAttualiDellaCategoria / potenzialeMaxCategoria) * 100;
                                    }

                                    // Calcola la percentuale di "salute" o "miglioramento" per la fetta specifica
                                    let percentualeFettaSpecifics = 0;
                                    const proporzioneCatSulTotale = (potenzialeMaxCategoria / totalePotenzialePuntiPerGraficoTorta);
                                    if (proporzioneCatSulTotale > 0) {
                                        percentualeFettaSpecifics = (rawValue / proporzioneCatSulTotale) * 100;
                                        percentualeFettaSpecifics = Math.min(100, Math.max(0, percentualeFettaSpecifics)); // Clamp 0-100
                                    }

                                    const tooltipLines = [];
                                    tooltipLines.push(`${nomeCatBase} (${statoFetta.charAt(0).toUpperCase() + statoFetta.slice(1)})`); // Es. Livello 1 (Ottimizzato)

                                    if (statoFetta === 'ottimizzato') {
                                        tooltipLines.push(`  Salute slot: ${percentualeFettaSpecifics.toFixed(2)}%`);
                                    } else if (statoFetta === 'migliorabile') {
                                        tooltipLines.push(`  Miglioramento potenziale: ${percentualeFettaSpecifics.toFixed(2)}%`);
                                    } else {
                                        // Caso in cui lo statoFetta non è né ottimizzato né migliorabile (improbabile)
                                        tooltipLines.push(`  Valore fetta: ${percentualeFettaSpecifics.toFixed(2)}%`);
                                    }
                                    tooltipLines.push(`  Punti VSR: ${formatNumber(puntiAttualiDellaCategoria,0)} / ${formatNumber(potenzialeMaxCategoria,0)}`);
                                    tooltipLines.push(`  (${percentualePuntiVSRPerCategoria.toFixed(2)}% del potenziale cat.)`);

                                    return tooltipLines;
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    // --- Funzioni Grafico Radar Dashboard ---
    function calcolaPunteggioSaluteCategoria(gareCat, maxSlot, valoreMaxPuntiGara) {
        if (maxSlot === 0) return 0; // Categorie come HC generiche non contribuiscono

        const percentualeRiempimento = (gareCat.length / maxSlot); // Valore da 0 a 1

        let qualitaMediaPunti = 0; // Valore da 0 a 1
        if (gareCat.length > 0 && valoreMaxPuntiGara > 0) {
            let sommaQualitaPercentuale = 0;
            gareCat.forEach(g => {
                sommaQualitaPercentuale += (g.puntiEffettivi / valoreMaxPuntiGara); // Rapporto da 0 a 1
            });
            qualitaMediaPunti = sommaQualitaPercentuale / gareCat.length;
        }

        // Pesi: diamo più importanza al riempimento per slot con molte gare (LIV3),
        // e più alla qualità per slot con poche gare (VGLOBE/LIV1).
        // Questo è un esempio, puoi aggiustare i pesi.
        let pesoRiempimento = 0.5;
        let pesoQualita = 0.5;

        if (maxSlot === 1) { // VGLOBE
            pesoRiempimento = 0.4;
            pesoQualita = 0.6;
        } else if (maxSlot === 3) { // LIV1
            pesoRiempimento = 0.45;
            pesoQualita = 0.55;
        } else if (maxSlot === 10) { // LIV3
            pesoRiempimento = 0.6;
            pesoQualita = 0.4;
        }
        // LIV2 usa i pesi di default 0.5/0.5

        // Se lo slot è vuoto, la qualità è 0, ma il riempimento è anche 0.
        // Se lo slot è pieno ma la qualità è 0 (improbabile con puntiEffettivi > 0), il punteggio sarà basso.
        const punteggioSalute = (percentualeRiempimento * pesoRiempimento) + (qualitaMediaPunti * pesoQualita);
        return Math.min(1, Math.max(0, punteggioSalute)) * 100; // Risultato da 0 a 100
    }

    function aggiornaGraficoRadarSaluteSlot() {
        // console.log("aggiornaGraficoRadarSaluteSlot CHIAMATA"); // Log chiamata funzione
        if (!canvasGraficoRadar) {
            console.error("ERRORE: canvasGraficoRadar non trovato!");
            return; // Se il canvas non esiste, esci
        }

        const gareContributive = getGareContributiveConDettagli(); // Include VGLOBE, HC, LIV1, LIV2, LIV3

        // Calcola la percentuale del potenziale VSR raggiunto per ciascuna categoria
        const datiPercentualePotenziale = [];
        const categorieRadar = ["VGLOBE", "LIV1", "LIV2", "LIV3"]; // Ordine per gli assi del radar

        categorieRadar.forEach(tipoGara => {
            const gareCat = gareContributive[tipoGara] || [];
            const maxSlot = LIMITI_GARE_PER_CATEGORIA[tipoGara];

            // Trova il valore numerico del livello dalla mappa
            let chiaveMappaPerValoreNumerico = null;
            for (const key in livelliVsrStoricoMap) {
                if (livelliVsrStoricoMap[key].tipo === tipoGara) chiaveMappaPerValoreNumerico = key;
            }
            const infoLivelloDaMappa = chiaveMappaPerValoreNumerico ? livelliVsrStoricoMap[chiaveMappaPerValoreNumerico] : null;
            const livelloValoreNumerico = infoLivelloDaMappa ? infoLivelloDaMappa.valoreNumerico : null;

            if (maxSlot === 0 || !livelloValoreNumerico) {
                // Categorie senza slot o senza valore numerico (es. HC generica) non contribuiscono a questo radar
                datiPercentualePotenziale.push(0); // Mostra 0% per queste categorie nel radar
                return; // Passa alla prossima categoria
            }

            let puntiAttuali = 0;
            gareCat.forEach(g => {
                puntiAttuali += g.puntiEffettivi;
            });

            const potenzialeMaxCategoria = maxSlot * livelloValoreNumerico;
            let percentualeRaggiunta = (potenzialeMaxCategoria > 0) ? (puntiAttuali / potenzialeMaxCategoria) * 100 : 0;

            datiPercentualePotenziale.push(Math.min(100, Math.max(0, percentualeRaggiunta))); // Clampa tra 0 e 100
        });

        // console.log("Dati per grafico radar (% Potenziale Raggiunto):", datiPercentualePotenziale); // Log dati calcolati

        const data = {
            labels: ['V. Globe FC', 'Livello 1', 'Livello 2', 'Livello 3'],
            datasets: [{
                label: '% Potenziale Raggiunto', // Etichetta aggiornata
                data: datiPercentualePotenziale, // Usa i nuovi dati
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)', // Blu chiaro
                borderColor: 'rgb(54, 162, 235)',         // Blu
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            }]
        };
        if (graficoRadarIstanza) {
            graficoRadarIstanza.data = data;
            graficoRadarIstanza.update();
            // console.log("Grafico radar AGGIORNATO");
            // console.log("Grafico radar AGGIORNATO con dati:", datiPercentualePotenziale);
        } else {
            graficoRadarIstanza = new Chart(canvasGraficoRadar, {
                type: 'radar',
                data: data,
                options: {
                    scales: {
                        r: {
                            angleLines: { display: true },
                            suggestedMin: 0,
                            suggestedMax: 100,
                            pointLabels: { font: { size: 13 } },
                            ticks: {
                                callback: function(value) {
                                    return value + "%"; // Aggiunge il simbolo % agli assi
                                }
                            }
                        }
                    },
                    elements: {
                        line: { borderWidth: 2 }
                    },
                    plugins: { // Aggiunto per nascondere la legenda
                        legend: {
                            display: false // Nasconde la legenda (rettangolino colorato ed etichetta)
                        }
                    }
                }
            });
            // console.log("Grafico radar CREATO", graficoRadarIstanza);
        }
    }
});
