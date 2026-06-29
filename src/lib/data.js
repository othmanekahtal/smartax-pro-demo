export const FORMES_JURIDIQUES = ['SARL', 'SARL AU', 'SA', 'SAS', 'SNC', 'SCS', 'Auto-entrepreneur'];

export const STATUT_CFG = {
  'Actif':    { dot: 'bg-emerald-500', cls: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60' },
  'En cours': { dot: 'bg-amber-500',   cls: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/60' },
  'Inactif':  { dot: 'bg-rose-500',    cls: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200/60' },
};
export const FORME_V   = { SARL: 'default', 'SARL AU': 'indigo', SA: 'purple', SAS: 'success', SNC: 'warning', SCS: 'secondary', 'Auto-entrepreneur': 'rose' };
export const PERIODE_V = { Mensuelle: 'indigo', Trimestrielle: 'warning' };

export const MOCK_COMPANIES = [
  {
    id: '1', name: 'Atlas Tech Solutions', gerant: 'Karim Benali',
    formeJuridique: 'SARL', capital: 100000,
    dateCreation: '15/03/2022', adresse: '45 Boulevard Zerktouni, Casablanca 20100',
    typeAdresse: 'Domiciliation', activitePrincipale: 'Services informatiques & développement logiciel',
    periodesFiscale: 'Mensuelle', statut: 'Actif',
    ice: '002345678901234', identifiantFiscal: '12345678', rc: 'CS-2022-1234', cnss: '9876543', patente: '22345678',
    duree: '99 ans',
    associes: [{ nom: 'Karim Benali', pourcentage: 70, montant: 70000 }, { nom: 'Sara Alami', pourcentage: 30, montant: 30000 }],
    addedThisMonth: false,
  },
  {
    id: '2', name: 'Horizon Import Export', gerant: 'Fatima Zahra Idrissi',
    formeJuridique: 'SA', capital: 500000,
    dateCreation: '08/07/2019', adresse: '12 Avenue Hassan II, Rabat 10000',
    typeAdresse: 'CB', activitePrincipale: 'Commerce international et négoce',
    periodesFiscale: 'Trimestrielle', statut: 'Actif',
    ice: '003456789012345', identifiantFiscal: '23456789', rc: 'RB-2019-5678', cnss: '8765432', patente: '33456789',
    duree: '99 ans',
    associes: [{ nom: 'Fatima Zahra Idrissi', pourcentage: 51, montant: 255000 }, { nom: 'Omar Idrissi', pourcentage: 49, montant: 245000 }],
    addedThisMonth: false,
  },
  {
    id: '3', name: 'Green Maroc Agriculture', gerant: 'Youssef El Mansouri',
    formeJuridique: 'SARL AU', capital: 30000,
    dateCreation: '22/11/2023', adresse: '78 Route de Fès, Marrakech 40000',
    typeAdresse: 'Domiciliation', activitePrincipale: 'Agriculture biologique et exportation',
    periodesFiscale: 'Mensuelle', statut: 'En cours',
    ice: '004567890123456', identifiantFiscal: '34567890', rc: 'MK-2023-9012', cnss: '', patente: '',
    duree: '99 ans',
    associes: [{ nom: 'Youssef El Mansouri', pourcentage: 100, montant: 30000 }],
    addedThisMonth: false,
  },
  {
    id: '4', name: 'BuildPro Construction', gerant: 'Rachid Ouazzani',
    formeJuridique: 'SARL', capital: 250000,
    dateCreation: '01/01/2020', adresse: '23 Rue Ibn Battouta, Casablanca 20300',
    typeAdresse: 'CB', activitePrincipale: 'BTP et promotion immobilière',
    periodesFiscale: 'Trimestrielle', statut: 'Actif',
    ice: '005678901234567', identifiantFiscal: '45678901', rc: 'CS-2020-2345', cnss: '7654321', patente: '44567890',
    duree: '99 ans',
    associes: [{ nom: 'Rachid Ouazzani', pourcentage: 60, montant: 150000 }, { nom: 'Hicham Ouazzani', pourcentage: 40, montant: 100000 }],
    addedThisMonth: false,
  },
  {
    id: '5', name: 'MediCare Pharma', gerant: 'Nadia Cherkaoui',
    formeJuridique: 'SAS', capital: 1000000,
    dateCreation: '14/06/2018', adresse: '56 Avenue Moulay Youssef, Casablanca 20000',
    typeAdresse: 'CB', activitePrincipale: 'Distribution pharmaceutique',
    periodesFiscale: 'Mensuelle', statut: 'Actif',
    ice: '006789012345678', identifiantFiscal: '56789012', rc: 'CS-2018-3456', cnss: '6543210', patente: '55678901',
    duree: '99 ans',
    associes: [
      { nom: 'Nadia Cherkaoui', pourcentage: 55, montant: 550000 },
      { nom: 'Mehdi Cherkaoui', pourcentage: 25, montant: 250000 },
      { nom: 'Leila Benjelloun', pourcentage: 20, montant: 200000 },
    ],
    addedThisMonth: false,
  },
  {
    id: '6', name: 'TechnoMaroc Innovations', gerant: 'Amine Tahiri',
    formeJuridique: 'SARL', capital: 150000,
    dateCreation: '30/09/2021', adresse: '7 Rue Al Moukaouama, Rabat 10100',
    typeAdresse: 'Domiciliation', activitePrincipale: 'Conseil en transformation numérique',
    periodesFiscale: 'Mensuelle', statut: 'Actif',
    ice: '007890123456789', identifiantFiscal: '67890123', rc: 'RB-2021-4567', cnss: '5432109', patente: '66789012',
    duree: '99 ans',
    associes: [{ nom: 'Amine Tahiri', pourcentage: 80, montant: 120000 }, { nom: 'Rim Tahiri', pourcentage: 20, montant: 30000 }],
    addedThisMonth: false,
  },
  {
    id: '7', name: 'Sahara Trading Group', gerant: 'Mohammed Lahlou',
    formeJuridique: 'SA', capital: 750000,
    dateCreation: '05/02/2017', adresse: '34 Boulevard Hassan Ier, Agadir 80000',
    typeAdresse: 'CB', activitePrincipale: 'Commerce de gros et distribution régionale',
    periodesFiscale: 'Trimestrielle', statut: 'Actif',
    ice: '008901234567890', identifiantFiscal: '78901234', rc: 'AG-2017-5678', cnss: '4321098', patente: '77890123',
    duree: '99 ans',
    associes: [
      { nom: 'Mohammed Lahlou', pourcentage: 45, montant: 337500 },
      { nom: 'Khadija Lahlou', pourcentage: 35, montant: 262500 },
      { nom: 'Hassan Lahlou', pourcentage: 20, montant: 150000 },
    ],
    addedThisMonth: false,
  },
  {
    id: '8', name: 'Innovate Digital Agency', gerant: 'Salma Bensouda',
    formeJuridique: 'SARL AU', capital: 50000,
    dateCreation: '18/04/2026', adresse: '89 Rue Mohammed V, Casablanca 20200',
    typeAdresse: 'Domiciliation', activitePrincipale: 'Marketing digital et création de contenu',
    periodesFiscale: 'Mensuelle', statut: 'En cours',
    ice: '009012345678901', identifiantFiscal: '89012345', rc: 'CS-2026-6789', cnss: '', patente: '',
    duree: '99 ans',
    associes: [{ nom: 'Salma Bensouda', pourcentage: 100, montant: 50000 }],
    addedThisMonth: true,
  },
  {
    id: '9', name: 'Maroc Conseil & Audit', gerant: 'Driss El Fassi',
    formeJuridique: 'SNC', capital: 200000,
    dateCreation: '10/10/2016', adresse: '15 Avenue de France, Rabat 10000',
    typeAdresse: 'CB', activitePrincipale: 'Audit, conseil financier et gestion',
    periodesFiscale: 'Trimestrielle', statut: 'Actif',
    ice: '001234567890123', identifiantFiscal: '90123456', rc: 'RB-2016-7890', cnss: '3210987', patente: '88901234',
    duree: '99 ans',
    associes: [{ nom: 'Driss El Fassi', pourcentage: 50, montant: 100000 }, { nom: 'Leila El Fassi', pourcentage: 50, montant: 100000 }],
    addedThisMonth: false,
  },
  {
    id: '10', name: 'Ocean Seafood Export', gerant: 'Badr Eddine Amrani',
    formeJuridique: 'SARL', capital: 300000,
    dateCreation: '25/07/2020', adresse: '67 Port de Commerce, Agadir 80100',
    typeAdresse: 'CB', activitePrincipale: 'Pêche, transformation et export de produits marins',
    periodesFiscale: 'Trimestrielle', statut: 'Actif',
    ice: '001123456789012', identifiantFiscal: '01234567', rc: 'AG-2020-8901', cnss: '2109876', patente: '99012345',
    duree: '99 ans',
    associes: [{ nom: 'Badr Eddine Amrani', pourcentage: 65, montant: 195000 }, { nom: 'Yasmine Amrani', pourcentage: 35, montant: 105000 }],
    addedThisMonth: false,
  },
];

// Statuts for declarations
export const DECL_STATUT_CFG = {
  'À faire':   { cls: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200/60',   dot: 'bg-slate-400' },
  'En cours':  { cls: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200/60',       dot: 'bg-blue-500' },
  'Soumis':    { cls: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60', dot: 'bg-emerald-500' },
  'En retard': { cls: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200/60',       dot: 'bg-rose-500' },
};

export const MOCK_DECLARATIONS = [
  { id: 'd1',  societe: 'Atlas Tech Solutions',    type: 'TVA',              periode: 'Mai 2026',   dateLimite: '20/06/2026', statut: 'À faire',  periodeType: 'Mensuelle' },
  { id: 'd2',  societe: 'MediCare Pharma',         type: 'TVA',              periode: 'Mai 2026',   dateLimite: '20/06/2026', statut: 'En cours', periodeType: 'Mensuelle' },
  { id: 'd3',  societe: 'TechnoMaroc Innovations', type: 'TVA',              periode: 'Mai 2026',   dateLimite: '20/06/2026', statut: 'À faire',  periodeType: 'Mensuelle' },
  { id: 'd4',  societe: 'Green Maroc Agriculture', type: 'TVA',              periode: 'Mai 2026',   dateLimite: '20/06/2026', statut: 'En retard', periodeType: 'Mensuelle' },
  { id: 'd5',  societe: 'Innovate Digital Agency', type: 'TVA',              periode: 'Mai 2026',   dateLimite: '20/06/2026', statut: 'À faire',  periodeType: 'Mensuelle' },
  { id: 'd6',  societe: 'Horizon Import Export',   type: 'TVA',              periode: 'T2 2026',    dateLimite: '20/07/2026', statut: 'À faire',  periodeType: 'Trimestrielle' },
  { id: 'd7',  societe: 'BuildPro Construction',   type: 'TVA',              periode: 'T2 2026',    dateLimite: '20/07/2026', statut: 'À faire',  periodeType: 'Trimestrielle' },
  { id: 'd8',  societe: 'Sahara Trading Group',    type: 'TVA',              periode: 'T2 2026',    dateLimite: '20/07/2026', statut: 'À faire',  periodeType: 'Trimestrielle' },
  { id: 'd9',  societe: 'Atlas Tech Solutions',    type: 'Acompte IS',       periode: 'T2 2026',    dateLimite: '30/06/2026', statut: 'À faire',  periodeType: 'Mensuelle' },
  { id: 'd10', societe: 'MediCare Pharma',         type: 'Acompte IS',       periode: 'T2 2026',    dateLimite: '30/06/2026', statut: 'En cours', periodeType: 'Mensuelle' },
  { id: 'd11', societe: 'Horizon Import Export',   type: 'Acompte IS',       periode: 'T2 2026',    dateLimite: '30/06/2026', statut: 'Soumis',   periodeType: 'Trimestrielle' },
  { id: 'd12', societe: 'BuildPro Construction',   type: 'Acompte IS',       periode: 'T2 2026',    dateLimite: '30/06/2026', statut: 'Soumis',   periodeType: 'Trimestrielle' },
  { id: 'd13', societe: 'Atlas Tech Solutions',    type: 'CNSS',             periode: 'Mai 2026',   dateLimite: '10/06/2026', statut: 'Soumis',   periodeType: 'Mensuelle' },
  { id: 'd14', societe: 'MediCare Pharma',         type: 'CNSS',             periode: 'Mai 2026',   dateLimite: '10/06/2026', statut: 'Soumis',   periodeType: 'Mensuelle' },
  { id: 'd15', societe: 'TechnoMaroc Innovations', type: 'CNSS',             periode: 'Mai 2026',   dateLimite: '10/06/2026', statut: 'En retard', periodeType: 'Mensuelle' },
  { id: 'd16', societe: 'Maroc Conseil & Audit',   type: 'Taxe Prof.',       periode: '2026',       dateLimite: '31/01/2026', statut: 'Soumis',   periodeType: 'Trimestrielle' },
  { id: 'd17', societe: 'Ocean Seafood Export',    type: 'Taxe Prof.',       periode: '2026',       dateLimite: '31/01/2026', statut: 'Soumis',   periodeType: 'Trimestrielle' },
  { id: 'd18', societe: 'Atlas Tech Solutions',    type: 'IR Salaires',      periode: 'Mai 2026',   dateLimite: '20/06/2026', statut: 'À faire',  periodeType: 'Mensuelle' },
  { id: 'd19', societe: 'MediCare Pharma',         type: 'IR Salaires',      periode: 'Mai 2026',   dateLimite: '20/06/2026', statut: 'En cours', periodeType: 'Mensuelle' },
  { id: 'd20', societe: 'Sahara Trading Group',    type: 'IS Annuel',        periode: '2025',       dateLimite: '31/03/2026', statut: 'Soumis',   periodeType: 'Trimestrielle' },
];

export const MOCK_DOCUMENTS = [
  { id: 'doc1',  societe: 'Atlas Tech Solutions',    type: 'Statuts',          nom: 'Statuts_ATS_2022.pdf',        taille: '245 Ko', date: '15/03/2022', statut: 'Validé' },
  { id: 'doc2',  societe: 'Atlas Tech Solutions',    type: 'RC',               nom: 'RC_ATS_CS-2022-1234.pdf',     taille: '180 Ko', date: '20/03/2022', statut: 'Validé' },
  { id: 'doc3',  societe: 'Horizon Import Export',   type: 'Statuts',          nom: 'Statuts_HIE_2019.pdf',        taille: '312 Ko', date: '08/07/2019', statut: 'Validé' },
  { id: 'doc4',  societe: 'Horizon Import Export',   type: 'PV d\'AG',         nom: 'PV_AG_HIE_2025.pdf',          taille: '98 Ko',  date: '15/04/2026', statut: 'Validé' },
  { id: 'doc5',  societe: 'Green Maroc Agriculture', type: 'Statuts',          nom: 'Statuts_GMA_2023.pdf',        taille: '198 Ko', date: '22/11/2023', statut: 'En attente' },
  { id: 'doc6',  societe: 'BuildPro Construction',   type: 'Statuts',          nom: 'Statuts_BPC_2020.pdf',        taille: '267 Ko', date: '01/01/2020', statut: 'Validé' },
  { id: 'doc7',  societe: 'BuildPro Construction',   type: 'Contrat de bail',  nom: 'Bail_BPC_Casablanca.pdf',     taille: '154 Ko', date: '05/01/2020', statut: 'Validé' },
  { id: 'doc8',  societe: 'MediCare Pharma',         type: 'Statuts',          nom: 'Statuts_MCP_2018.pdf',        taille: '389 Ko', date: '14/06/2018', statut: 'Validé' },
  { id: 'doc9',  societe: 'MediCare Pharma',         type: 'Autorisation',     nom: 'Autorisation_pharma_2026.pdf', taille: '221 Ko', date: '01/01/2026', statut: 'Validé' },
  { id: 'doc10', societe: 'TechnoMaroc Innovations', type: 'Statuts',          nom: 'Statuts_TMI_2021.pdf',        taille: '178 Ko', date: '30/09/2021', statut: 'Validé' },
  { id: 'doc11', societe: 'Sahara Trading Group',    type: 'Statuts',          nom: 'Statuts_STG_2017.pdf',        taille: '302 Ko', date: '05/02/2017', statut: 'Validé' },
  { id: 'doc12', societe: 'Innovate Digital Agency', type: 'Statuts',          nom: 'Statuts_IDA_2026.pdf',        taille: '156 Ko', date: '18/04/2026', statut: 'En attente' },
  { id: 'doc13', societe: 'Maroc Conseil & Audit',   type: 'Statuts',          nom: 'Statuts_MCA_2016.pdf',        taille: '234 Ko', date: '10/10/2016', statut: 'Validé' },
  { id: 'doc14', societe: 'Ocean Seafood Export',    type: 'Statuts',          nom: 'Statuts_OSE_2020.pdf',        taille: '289 Ko', date: '25/07/2020', statut: 'Validé' },
  { id: 'doc15', societe: 'Ocean Seafood Export',    type: 'Licence export',   nom: 'Licence_export_OSE_2026.pdf', taille: '143 Ko', date: '10/01/2026', statut: 'Validé' },
];

// ── Depenses ───────────────────────────────────────────────────────────────────
export const EXPENSE_CATEGORIES = [
  'Matières premières', 'Fournitures de bureau', 'Services',
  'Transport & Logistique', 'Loyer', 'Salaires & Charges',
  'Marketing & Communication', 'Informatique & Télécom',
  'Maintenance', 'Autre',
];

export const EXPENSE_STATUT_CFG = {
  'Payée':      { dot: 'bg-emerald-500', cls: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60' },
  'En attente': { dot: 'bg-amber-500',   cls: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/60' },
  'En retard':  { dot: 'bg-rose-500',    cls: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200/60' },
  'Annulée':    { dot: 'bg-slate-400',   cls: 'bg-slate-100 text-slate-500 ring-1 ring-slate-200/60' },
};

export const PAYMENT_METHODS = [
  'Virement bancaire', 'Chèque', 'Espèces', 'Carte bancaire', 'Prélèvement automatique',
];

export const MOCK_EXPENSES = [
  {
    id: 'exp1', title: "Achat de matières premières", amount: 45000,
    date: '2026-06-05', vendor: 'Métal Pro SARL',
    category: 'Matières premières', description: 'Commande mensuelle de matières premières pour la production',
    status: 'Payée', paymentMethod: 'Virement bancaire',
    receiptName: 'facture_metalpro_juin2026.pdf', notes: '',
    tags: ['production', 'mensuel'], addedThisMonth: true,
  },
  {
    id: 'exp2', title: 'Loyer bureau Casablanca', amount: 18000,
    date: '2026-06-01', vendor: 'Immobilier Al Massira',
    category: 'Loyer', description: 'Loyer mensuel du siège social',
    status: 'Payée', paymentMethod: 'Chèque',
    receiptName: '', notes: '',
    tags: ['fixe', 'mensuel'], addedThisMonth: true,
  },
  {
    id: 'exp3', title: 'Abonnement logiciels comptabilité', amount: 3500,
    date: '2026-06-03', vendor: 'SoftCom Maroc',
    category: 'Informatique & Télécom', description: 'Licence annuelle pour les outils comptables',
    status: 'Payée', paymentMethod: 'Carte bancaire',
    receiptName: 'invoice_softcom_2026.pdf', notes: 'Renouvellement annuel',
    tags: ['logiciel', 'annuel'], addedThisMonth: true,
  },
  {
    id: 'exp4', title: 'Transport marchandises Tanger–Casa', amount: 8500,
    date: '2026-06-08', vendor: 'Transit Express SA',
    category: 'Transport & Logistique', description: "Transport de la commande N°TNG-2026-089",
    status: 'En attente', paymentMethod: 'Virement bancaire',
    receiptName: '', notes: 'En attente de confirmation de livraison',
    tags: ['transport', 'import'], addedThisMonth: true,
  },
  {
    id: 'exp5', title: 'Fournitures de bureau', amount: 1200,
    date: '2026-05-28', vendor: 'Papeterie Centrale',
    category: 'Fournitures de bureau', description: 'Papier, stylos, classeurs pour le bureau',
    status: 'Payée', paymentMethod: 'Espèces',
    receiptName: 'ticket_papeterie_mai26.jpg', notes: '',
    tags: [], addedThisMonth: false,
  },
  {
    id: 'exp6', title: 'Campagne publicitaire réseaux sociaux', amount: 12000,
    date: '2026-05-15', vendor: 'Digital Wave Agency',
    category: 'Marketing & Communication', description: 'Campagne Meta Ads + LinkedIn pour Q2 2026',
    status: 'Payée', paymentMethod: 'Virement bancaire',
    receiptName: 'facture_digitalwave_mai26.pdf', notes: 'ROI à évaluer fin juin',
    tags: ['marketing', 'q2-2026'], addedThisMonth: false,
  },
  {
    id: 'exp7', title: 'Réparation climatiseur bureau', amount: 2800,
    date: '2026-05-20', vendor: 'TechnoFroid SARL',
    category: 'Maintenance', description: 'Entretien et remplacement du compresseur',
    status: 'Payée', paymentMethod: 'Chèque',
    receiptName: '', notes: '',
    tags: ['entretien'], addedThisMonth: false,
  },
  {
    id: 'exp8', title: 'Formation comptabilité équipe', amount: 7500,
    date: '2026-06-10', vendor: 'Centre Formation CPA',
    category: 'Services', description: 'Formation 2 jours pour 3 collaborateurs',
    status: 'En attente', paymentMethod: 'Virement bancaire',
    receiptName: 'devis_cpa_formation.pdf', notes: 'Formation prévue le 15/06/2026',
    tags: ['formation', 'rh'], addedThisMonth: true,
  },
  {
    id: 'exp9', title: 'Facture électricité Mai 2026', amount: 3200,
    date: '2026-05-31', vendor: 'ONEE',
    category: 'Services', description: 'Consommation électrique du siège – mai 2026',
    status: 'En retard', paymentMethod: 'Prélèvement automatique',
    receiptName: 'onee_mai2026.pdf', notes: 'Paiement en retard – à régulariser',
    tags: ['facture', 'mensuel'], addedThisMonth: false,
  },
  {
    id: 'exp10', title: 'Achat mobilier bureau direction', amount: 25000,
    date: '2026-04-20', vendor: 'Mobilier Pro Casa',
    category: 'Autre', description: 'Bureau, chaises et rangements pour la direction',
    status: 'Annulée', paymentMethod: 'Virement bancaire',
    receiptName: '', notes: 'Commande annulée – fournisseur hors délai',
    tags: ['mobilier'], addedThisMonth: false,
  },
];

// ── Revenus ────────────────────────────────────────────────────────────────────
export const REVENUE_SOURCES = [
  'Vente de produits', 'Prestation de services', 'Abonnement',
  'Commission', 'Location', 'Autre',
];

export const REVENUE_STATUT_CFG = {
  'Reçu':     { dot: 'bg-emerald-500', cls: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60' },
  'Attendu':  { dot: 'bg-amber-500',   cls: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/60' },
  'Facturé':  { dot: 'bg-blue-500',    cls: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200/60' },
};

export const REVENUE_CUSTOMERS = [
  'Atlas Tech Solutions', 'Horizon Import Export', 'MediCare Pharma',
  'TechnoMaroc Innovations', 'BuildPro Construction', 'Green Maroc Agriculture',
];

export const PAYMENT_TERMS = [
  'Net 15', 'Net 30', 'Net 45', 'Net 60', 'À réception',
];

export const MOCK_REVENUES = [
  {
    id: 'rev1', uuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', amount: 85000, date: '2026-06-12',
    customer: 'Atlas Tech Solutions', source: 'Prestation de services',
    description: 'Développement module comptabilité — phase 2',
    paymentMethod: 'Virement bancaire', status: 'Reçu', referenceNumber: 'PO-ATS-2026-042',
    tags: ['projet', 'recurrent'], createInvoice: true, invoiceNumber: 'FAC-2026-0142',
    dueDate: '2026-07-12', paymentTerms: 'Net 30', notesToCustomer: '',
    sendInvoiceImmediately: false, applyTax: true, addedThisMonth: true,
  },
  {
    id: 'rev2', uuid: 'b2c3d4e5-f6a7-8901-bcde-f12345678901', amount: 42000, date: '2026-06-08',
    customer: 'MediCare Pharma', source: 'Vente de produits',
    description: 'Fourniture équipements de bureau — lot Q2',
    paymentMethod: 'Chèque', status: 'Facturé', referenceNumber: 'BC-MCP-0891',
    tags: ['equipement'], createInvoice: true, invoiceNumber: 'FAC-2026-0138',
    dueDate: '2026-07-08', paymentTerms: 'Net 30', notesToCustomer: 'Merci pour votre confiance.',
    sendInvoiceImmediately: true, applyTax: true, addedThisMonth: true,
  },
  {
    id: 'rev-demo', uuid: '658b137e-df74-4cb3-9baf-01c866946c80', amount: 1000, date: '2026-06-23',
    customer: 'test customer', source: 'sool',
    description: 'This is test description',
    paymentMethod: 'Chèque', status: 'Reçu', referenceNumber: '1-000-1-000',
    tags: ['hello world'], createInvoice: true, invoiceNumber: 'INV-0005',
    dueDate: '2026-06-01', paymentTerms: 'Net 30', notesToCustomer: 'NOTE FOR CUSTOMER',
    sendInvoiceImmediately: false, applyTax: true, addedThisMonth: true,
  },
  {
    id: 'rev3', amount: 125000, date: '2026-06-15',
    customer: 'Horizon Import Export', source: 'Commission',
    description: 'Commission sur ventes export T2 2026',
    paymentMethod: 'Virement bancaire', status: 'Attendu', referenceNumber: 'CTR-HIE-2026-T2',
    tags: ['export', 'trimestriel'], createInvoice: true, invoiceNumber: 'FAC-2026-0145',
    dueDate: '2026-07-15', paymentTerms: 'Net 45', notesToCustomer: '',
    sendInvoiceImmediately: false, applyTax: false, addedThisMonth: true,
  },
  {
    id: 'rev4', amount: 18000, date: '2026-05-28',
    customer: 'TechnoMaroc Innovations', source: 'Abonnement',
    description: 'Abonnement mensuel support technique',
    paymentMethod: 'Prélèvement automatique', status: 'Reçu', referenceNumber: '',
    tags: ['abonnement', 'mensuel'], createInvoice: false, invoiceNumber: '',
    dueDate: '', paymentTerms: 'Net 15', notesToCustomer: '',
    sendInvoiceImmediately: false, applyTax: true, addedThisMonth: false,
  },
  {
    id: 'rev5', amount: 95000, date: '2026-05-20',
    customer: 'BuildPro Construction', source: 'Prestation de services',
    description: 'Audit comptable annuel 2025',
    paymentMethod: 'Virement bancaire', status: 'Reçu', referenceNumber: 'AUD-BPC-2025',
    tags: ['audit', 'annuel'], createInvoice: true, invoiceNumber: 'FAC-2026-0129',
    dueDate: '2026-06-20', paymentTerms: 'Net 30', notesToCustomer: 'Paiement reçu — merci.',
    sendInvoiceImmediately: true, applyTax: true, addedThisMonth: false,
  },
  {
    id: 'rev6', amount: 6500, date: '2026-06-18',
    customer: 'Green Maroc Agriculture', source: 'Location',
    description: 'Location espace de stockage — juin 2026',
    paymentMethod: 'Espèces', status: 'Attendu', referenceNumber: '',
    tags: ['location'], createInvoice: false, invoiceNumber: '',
    dueDate: '', paymentTerms: 'À réception', notesToCustomer: '',
    sendInvoiceImmediately: false, applyTax: false, addedThisMonth: true,
  },
];

// ── Factures ───────────────────────────────────────────────────────────────────
export const INVOICE_STATUT_CFG = {
  'Brouillon':  { dot: 'bg-slate-400',   cls: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200/60' },
  'Envoyée':    { dot: 'bg-blue-500',    cls: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200/60' },
  'Payée':      { dot: 'bg-emerald-500', cls: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60' },
  'En retard':  { dot: 'bg-rose-500',    cls: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200/60' },
};

export const MOCK_INVOICES = [
  {
    id: 'inv-demo', uuid: '15dfd6a5-b60e-4e79-ad5f-9a7775988786',
    invoiceNumber: 'INV-0005', invoiceDate: '2026-06-23', dueDate: '2026-06-01',
    paymentTerms: 'Net 30', customer: 'test customer', referenceNumber: '1-000-1-000',
    status: 'En retard', applyTax: true, sendInvoiceImmediately: false,
    notesToCustomer: 'NOTE FOR CUSTOMER',
    internalNotes: 'Generated from Revenue entry: This is test description',
    lineItems: [
      { id: 'l-demo', description: 'This is test description', quantity: 1, unitPrice: 1000 },
    ],
    addedThisMonth: true,
  },
  {
    id: 'inv1', uuid: 'a15dfd6a5-b60e-4e79-ad5f-9a7775988786',
    invoiceNumber: 'FAC-2026-0142', invoiceDate: '2026-06-12', dueDate: '2026-07-12',
    paymentTerms: 'Net 30', customer: 'Atlas Tech Solutions', referenceNumber: 'PO-ATS-2026-042',
    status: 'Envoyée', applyTax: true, sendInvoiceImmediately: true,
    notesToCustomer: 'Paiement par virement sous 30 jours.',
    internalNotes: 'Relancer si non payé avant le 10/07.',
    lineItems: [
      { id: 'l1', description: 'Développement module comptabilité', quantity: 1, unitPrice: 70833.33 },
    ],
    addedThisMonth: true,
  },
  {
    id: 'inv2', invoiceNumber: 'FAC-2026-0138', invoiceDate: '2026-06-08', dueDate: '2026-07-08',
    paymentTerms: 'Net 30', customer: 'MediCare Pharma', referenceNumber: 'BC-MCP-0891',
    status: 'Payée', applyTax: true, sendInvoiceImmediately: true,
    notesToCustomer: 'Merci pour votre confiance.',
    internalNotes: '',
    lineItems: [
      { id: 'l1', description: 'Équipements de bureau — lot Q2', quantity: 12, unitPrice: 3500 },
    ],
    addedThisMonth: true,
  },
  {
    id: 'inv3', invoiceNumber: 'FAC-2026-0145', invoiceDate: '2026-06-15', dueDate: '2026-07-30',
    paymentTerms: 'Net 45', customer: 'Horizon Import Export', referenceNumber: 'CTR-HIE-2026-T2',
    status: 'Envoyée', applyTax: false, sendInvoiceImmediately: false,
    notesToCustomer: '', internalNotes: 'Commission T2 — en attente validation.',
    lineItems: [
      { id: 'l1', description: 'Commission export T2 2026', quantity: 1, unitPrice: 125000 },
    ],
    addedThisMonth: true,
  },
  {
    id: 'inv4', invoiceNumber: 'FAC-2026-0129', invoiceDate: '2026-05-20', dueDate: '2026-06-20',
    paymentTerms: 'Net 30', customer: 'BuildPro Construction', referenceNumber: 'AUD-BPC-2025',
    status: 'Payée', applyTax: true, sendInvoiceImmediately: true,
    notesToCustomer: 'Audit comptable annuel 2025.',
    internalNotes: 'Paiement reçu le 18/06.',
    lineItems: [
      { id: 'l1', description: 'Audit comptable annuel', quantity: 1, unitPrice: 79166.67 },
    ],
    addedThisMonth: false,
  },
  {
    id: 'inv5', invoiceNumber: 'FAC-2026-0150', invoiceDate: '2026-06-18', dueDate: '2026-06-25',
    paymentTerms: 'Net 15', customer: 'TechnoMaroc Innovations', referenceNumber: '',
    status: 'En retard', applyTax: true, sendInvoiceImmediately: true,
    notesToCustomer: '', internalNotes: 'Relance envoyée le 24/06.',
    lineItems: [
      { id: 'l1', description: 'Support technique — juin 2026', quantity: 1, unitPrice: 15000 },
    ],
    addedThisMonth: true,
  },
];

// ── Clients ────────────────────────────────────────────────────────────────────
export const CUSTOMER_TYPES = ['Entreprise', 'Individuel'];

export const CUSTOMER_STATUS_CFG = {
  'Actif':   { dot: 'bg-emerald-500', cls: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60' },
  'Inactif': { dot: 'bg-slate-400',   cls: 'bg-slate-100 text-slate-500 ring-1 ring-slate-200/60' },
};

export const COUNTRIES = [
  'Maroc', 'France', 'Espagne', 'Italie', 'Allemagne', 'Belgique',
  'Pays-Bas', 'Suisse', 'Portugal', 'Royaume-Uni', 'États-Unis',
  'Canada', 'Tunisie', 'Algérie', 'Sénégal', 'Côte d\'Ivoire',
  'Égypte', 'Turquie', 'Émirats arabes unis', 'Arabie saoudite',
];

export const MOCK_CUSTOMERS = [
  {
    id: 'cust1', name: 'Atlas Tech Solutions', type: 'Entreprise', status: 'Actif',
    tags: ['tech', 'recurrent'],
    firstName: 'Karim', lastName: 'Benali', email: 'k.benali@atlastech.ma',
    website: 'https://atlastech.ma', phone: '+212600123456',
    notes: 'Client principal — développement logiciel',
    billingAddress: '45 Boulevard Zerktouni, Casablanca 20100', country: 'Maroc',
    taxId: 'IF-12345678', paymentMethod: 'Virement bancaire', addedThisMonth: false,
  },
  {
    id: 'cust2', name: 'Horizon Import Export', type: 'Entreprise', status: 'Actif',
    tags: ['export', 'trimestriel'],
    firstName: 'Fatima Zahra', lastName: 'Idrissi', email: 'fz.idrissi@horizon-ie.ma',
    website: 'https://horizon-ie.ma', phone: '+212661987654',
    notes: '',
    billingAddress: '12 Avenue Hassan II, Rabat 10000', country: 'Maroc',
    taxId: 'IF-23456789', paymentMethod: 'Chèque', addedThisMonth: false,
  },
  {
    id: 'cust3', name: 'MediCare Pharma', type: 'Entreprise', status: 'Actif',
    tags: ['pharma'],
    firstName: 'Nadia', lastName: 'Cherkaoui', email: 'n.cherkaoui@medicare.ma',
    website: '', phone: '+212522456789',
    notes: 'Commandes trimestrielles régulières',
    billingAddress: '56 Avenue Moulay Youssef, Casablanca 20000', country: 'Maroc',
    taxId: 'IF-56789012', paymentMethod: 'Virement bancaire', addedThisMonth: false,
  },
  {
    id: 'cust4', name: 'TechnoMaroc Innovations', type: 'Entreprise', status: 'Actif',
    tags: ['conseil', 'mensuel'],
    firstName: 'Amine', lastName: 'Tahiri', email: 'a.tahiri@technomaroc.ma',
    website: 'https://technomaroc.ma', phone: '+212537654321',
    notes: 'Abonnement mensuel support technique',
    billingAddress: '7 Rue Al Moukaouama, Rabat 10100', country: 'Maroc',
    taxId: 'IF-67890123', paymentMethod: 'Prélèvement automatique', addedThisMonth: false,
  },
  {
    id: 'cust5', name: 'BuildPro Construction', type: 'Entreprise', status: 'Actif',
    tags: ['btp', 'annuel'],
    firstName: 'Rachid', lastName: 'Ouazzani', email: 'r.ouazzani@buildpro.ma',
    website: '', phone: '+212522789012',
    notes: 'Audit comptable annuel',
    billingAddress: '23 Rue Ibn Battouta, Casablanca 20300', country: 'Maroc',
    taxId: 'IF-45678901', paymentMethod: 'Virement bancaire', addedThisMonth: false,
  },
  {
    id: 'cust6', name: 'Sophie Martin', type: 'Individuel', status: 'Actif',
    tags: ['freelance'],
    firstName: 'Sophie', lastName: 'Martin', email: 'sophie.martin@gmail.com',
    website: '', phone: '+33612345678',
    notes: 'Consultante indépendante',
    billingAddress: '12 Rue de la Paix, Paris 75002', country: 'France',
    taxId: '', paymentMethod: 'Carte bancaire', addedThisMonth: false,
  },
  {
    id: 'cust7', name: 'Green Maroc Agriculture', type: 'Entreprise', status: 'Actif',
    tags: ['agriculture', 'location'],
    firstName: 'Youssef', lastName: 'El Mansouri', email: 'y.elmansouri@greenmaroc.ma',
    website: '', phone: '+212661234567',
    notes: 'Location espace de stockage mensuel',
    billingAddress: '78 Route de Fès, Marrakech 40000', country: 'Maroc',
    taxId: 'IF-34567890', paymentMethod: 'Espèces', addedThisMonth: true,
  },
  {
    id: 'cust8', name: 'Omar Radi', type: 'Individuel', status: 'Inactif',
    tags: [],
    firstName: 'Omar', lastName: 'Radi', email: 'o.radi@email.com',
    website: '', phone: '+212600777888',
    notes: 'Compte inactif depuis T1 2026',
    billingAddress: '5 Rue Patrice Lumumba, Tanger 90000', country: 'Maroc',
    taxId: '', paymentMethod: 'Espèces', addedThisMonth: false,
  },
];

// Calendar events for June 2026
export const CALENDAR_EVENTS = [
  { date: 10, label: 'CNSS — Mai 2026',        societes: ['Atlas Tech Solutions', 'MediCare Pharma'], type: 'cnss',    statut: 'Soumis' },
  { date: 20, label: 'TVA mensuelle — Mai 2026', societes: ['Atlas Tech Solutions', 'MediCare Pharma', 'TechnoMaroc Innovations', 'Innovate Digital Agency'], type: 'tva', statut: 'À faire' },
  { date: 20, label: 'IR Salaires — Mai 2026',  societes: ['Atlas Tech Solutions', 'MediCare Pharma'], type: 'ir',     statut: 'À faire' },
  { date: 30, label: 'Acompte IS — T2 2026',   societes: ['Atlas Tech Solutions', 'MediCare Pharma', 'TechnoMaroc Innovations'], type: 'is', statut: 'En cours' },
];
