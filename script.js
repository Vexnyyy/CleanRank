/* ==========================================================================
   1. MASTER KONFIGURASI BISNIS & KURS POIN (1 POIN = RP 10)
   ========================================================================== */
const POINT_TO_RUPIAH = 10;

const WASTE_CATEGORIES = [
  {
    id: 'botol_pet',
    name: 'Botol Plastik PET Bersih',
    container: 'Isi Tong QR',
    unit: 'kg',
    pointsPerUnit: 180,
    bankSampahPrice: 3200,
    isTongItem: true
  },
  {
    id: 'kardus',
    name: 'Kardus / Karton Kering',
    container: 'Kantong Pendamping',
    unit: 'kg',
    pointsPerUnit: 100,
    bankSampahPrice: 1800,
    isTongItem: false
  },
  {
    id: 'kertas',
    name: 'Kertas HVS / Buku Bekas',
    container: 'Kantong Pendamping',
    unit: 'kg',
    pointsPerUnit: 110,
    bankSampahPrice: 2000,
    isTongItem: false
  },
  {
    id: 'plastik_hdpe',
    name: 'Plastik Keras HDPE',
    container: 'Kantong Pendamping',
    unit: 'kg',
    pointsPerUnit: 140,
    bankSampahPrice: 2500,
    isTongItem: false
  },
  {
    id: 'kaleng',
    name: 'Kaleng Aluminium',
    container: 'Kantong Pendamping',
    unit: 'kg',
    pointsPerUnit: 700,
    bankSampahPrice: 12000,
    isTongItem: false
  },
  {
    id: 'jelantah',
    name: 'Minyak Jelantah',
    container: 'Jerigen Pendamping',
    unit: 'Liter',
    pointsPerUnit: 350,
    bankSampahPrice: 6000,
    isTongItem: false
  }
];

const REWARD_CATALOG = [
  {
    id: 'rew_sabun',
    name: 'Sabun Cuci 700g',
    partner: 'Warung Sembako Bu Tini',
    pointsRequired: 400,
    tag: 'Kebutuhan Rumah',
    emoji: '🧼'
  },
  {
    id: 'rew_gula',
    name: 'Gula Pasir 1 kg',
    partner: 'Warung Sembako Bu Tini',
    pointsRequired: 500,
    tag: 'Sembako Terlaris',
    emoji: '🍚'
  },
  {
    id: 'rew_minyak',
    name: 'Minyak Goreng 1 Liter',
    partner: 'Warung Sembako Bu Tini',
    pointsRequired: 850,
    tag: 'Favorit Warga',
    emoji: '🫗'
  },
  {
    id: 'rew_token',
    name: 'Token Listrik Rp10.000',
    partner: 'Warung Sembako Bu Tini',
    pointsRequired: 1050,
    tag: 'Listrik PLN',
    emoji: '⚡'
  }
];

const REJECTION_REASONS = [
  {
    id: 'basah',
    status: 'belum_terpilah',
    label: 'Belum Terpilah: Tercampur Sisa Makanan / Limbah Basah',
    defaultNote: 'Tong masih tercampur sisa makanan atau kuah. Silakan pisahkan sampah kering untuk minggu depan.'
  },
  {
    id: 'residu',
    status: 'belum_terpilah',
    label: 'Belum Terpilah: Tercampur Popok / Tisu / Residu',
    defaultNote: 'Ditemukan popok/tisu di dalam wadah. Sampah residu diangkut petugas sampah harian.'
  },
  {
    id: 'kosong',
    status: 'tidak_ada_setoran',
    label: 'Tidak Ada Setoran: Tong Kosong / Tidak Dikeluarkan',
    defaultNote: 'Tong sampah kosong atau belum dikeluarkan di depan pagar saat jadwal keliling.'
  }
];

/* ==========================================================================
   2. INITIAL STATE FACTORY (KOMPLEK MELATI — 5 RUMAH)
   ========================================================================== */
function createInitialState() {
  return {
    activeRole: 'warga', // 'warga' | 'petugas' | 'warung'
    // Warga UI State
    selectedHouseId: 'KML-05',
    wargaTab: 'beranda', // 'beranda' | 'leaderboard' | 'tukar' | 'riwayat'
    tukarSubTab: 'katalog', // 'katalog' | 'voucher'
    confirmRewardId: null,
    lastRedeemedCode: null,
    // Petugas UI State
    petugasTab: 'rute', // 'rute' | 'rekap'
    isScannerOpen: false,
    activePickupHouseId: null,
    pickupCondition: 'valid', // 'valid' | 'rejected'
    weightInputs: {
      botol_pet: '',
      kardus: '',
      kertas: '',
      plastik_hdpe: '',
      kaleng: '',
      jelantah: ''
    },
    selectedRejectionId: 'basah',
    customRejectionNote: '',
    // Warung UI State
    voucherCodeInput: '',
    checkedVoucherCode: null,
    // Domain Data (5 Households)
    houses: [
      {
        id: 'KML-01',
        houseNumber: 'No. 01',
        familyName: 'Kel. Pak Andi',
        visitStatus: 'valid',
        leaderboardPoints: 470,
        shoppingBalance: 470,
        totalWeight: 3.5
      },
      {
        id: 'KML-02',
        houseNumber: 'No. 02',
        familyName: 'Kel. Bu Siti',
        visitStatus: 'valid',
        leaderboardPoints: 530,
        shoppingBalance: 530,
        totalWeight: 1.5
      },
      {
        id: 'KML-03',
        houseNumber: 'No. 03',
        familyName: 'Kel. Pak Budi',
        visitStatus: 'pending',
        leaderboardPoints: 0,
        shoppingBalance: 0,
        totalWeight: 0
      },
      {
        id: 'KML-04',
        houseNumber: 'No. 04',
        familyName: 'Kel. Bu Rina',
        visitStatus: 'pending',
        leaderboardPoints: 0,
        shoppingBalance: 0,
        totalWeight: 0
      },
      {
        id: 'KML-05',
        houseNumber: 'No. 05',
        familyName: 'Kel. Pak Hendra',
        visitStatus: 'pending',
        leaderboardPoints: 0,
        shoppingBalance: 0,
        totalWeight: 0
      }
    ],
    pickupLogs: [
      {
        id: 'TX-101',
        houseId: 'KML-01',
        houseNumber: 'No. 01',
        familyName: 'Kel. Pak Andi',
        timestamp: 'Minggu, 22 Nov • 08:05 WIB',
        status: 'valid',
        items: [
          { categoryId: 'botol_pet', name: 'Botol Plastik PET Bersih', weight: 1.5, unit: 'kg', points: 270 },
          { categoryId: 'kardus', name: 'Kardus / Karton Kering', weight: 2.0, unit: 'kg', points: 200 }
        ],
        totalPoints: 470,
        totalWeight: 3.5,
        note: ''
      },
      {
        id: 'TX-102',
        houseId: 'KML-02',
        houseNumber: 'No. 02',
        familyName: 'Kel. Bu Siti',
        timestamp: 'Minggu, 22 Nov • 08:11 WIB',
        status: 'valid',
        items: [
          { categoryId: 'botol_pet', name: 'Botol Plastik PET Bersih', weight: 1.0, unit: 'kg', points: 180 },
          { categoryId: 'kaleng', name: 'Kaleng Aluminium', weight: 0.5, unit: 'kg', points: 350 }
        ],
        totalPoints: 530,
        totalWeight: 1.5,
        note: ''
      }
    ],
    vouchers: []
  };
}

let state = createInitialState();
let toastTimer = null;

/* ==========================================================================
   3. UTILITY & DOMAIN COMPUTATION HELPERS
   ========================================================================== */
function formatRupiah(num) {
  return 'Rp' + Math.round(num).toLocaleString('id-ID');
}

function showToast(message, type = 'success') {
  const root = document.getElementById('toast-root');
  root.innerHTML = `<div class="toast-box ${type}">${message}</div>`;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    root.innerHTML = '';
  }, 3600);
}

function getRankedHouses() {
  return [...state.houses].sort((a, b) => {
    if (b.leaderboardPoints !== a.leaderboardPoints) {
      return b.leaderboardPoints - a.leaderboardPoints;
    }
    if (b.totalWeight !== a.totalWeight) {
      return b.totalWeight - a.totalWeight;
    }
    return a.id.localeCompare(b.id);
  });
}

function getCargoSummary() {
  const map = {};
  WASTE_CATEGORIES.forEach((cat) => {
    map[cat.id] = {
      ...cat,
      totalWeight: 0,
      totalBankSampahRp: 0
    };
  });

  let grandWeight = 0;
  let grandBankSampahRp = 0;

  state.pickupLogs
    .filter((log) => log.status === 'valid')
    .forEach((log) => {
      log.items.forEach((item) => {
        const cat = map[item.categoryId];
        if (cat) {
          cat.totalWeight += item.weight;
          const rp = item.weight * cat.bankSampahPrice;
          cat.totalBankSampahRp += rp;
          grandWeight += item.weight;
          grandBankSampahRp += rp;
        }
      });
    });

  return {
    categories: Object.values(map),
    grandWeight,
    grandBankSampahRp,
    kasRtShare: Math.round(grandBankSampahRp * 0.1)
  };
}

function buildVisualQRSVG(code) {
  return `
    <div class="qr-box">
      <svg width="74" height="74" viewBox="0 0 100 100" aria-label="QR ${code}">
        <rect x="6" y="6" width="26" height="26" fill="none" stroke="#0f172a" stroke-width="6"/>
        <rect x="14" y="14" width="10" height="10" fill="#0f172a"/>
        <rect x="68" y="6" width="26" height="26" fill="none" stroke="#0f172a" stroke-width="6"/>
        <rect x="76" y="14" width="10" height="10" fill="#0f172a"/>
        <rect x="6" y="68" width="26" height="26" fill="none" stroke="#0f172a" stroke-width="6"/>
        <rect x="14" y="76" width="10" height="10" fill="#0f172a"/>
        <rect x="42" y="8" width="8" height="8" fill="#0f172a"/>
        <rect x="54" y="16" width="8" height="14" fill="#0f172a"/>
        <rect x="40" y="28" width="10" height="8" fill="#0f172a"/>
        <rect x="8" y="42" width="14" height="8" fill="#0f172a"/>
        <rect x="28" y="44" width="18" height="12" fill="#0f172a"/>
        <rect x="54" y="42" width="10" height="10" fill="#0f172a"/>
        <rect x="72" y="40" width="20" height="8" fill="#0f172a"/>
        <rect x="44" y="60" width="14" height="10" fill="#0f172a"/>
        <rect x="66" y="58" width="10" height="16" fill="#0f172a"/>
        <rect x="82" y="64" width="12" height="10" fill="#0f172a"/>
        <rect x="42" y="78" width="12" height="16" fill="#0f172a"/>
        <rect x="60" y="82" width="16" height="10" fill="#0f172a"/>
        <rect x="82" y="80" width="12" height="14" fill="#0f172a"/>
      </svg>
      <span class="qr-code-text">${code}</span>
    </div>
  `;
}

/* ==========================================================================
   4. STATE MUTATION HANDLERS
   ========================================================================== */
function setRole(role) {
  state.activeRole = role;
  ['warga', 'petugas', 'warung'].forEach((r) => {
    const btn = document.getElementById(`role-btn-${r}`);
    if (btn) btn.classList.toggle('active', r === role);
  });
  renderApp();
}

function resetSimulation() {
  const currentRole = state.activeRole;
  state = createInitialState();
  state.activeRole = currentRole;
  showToast('Simulasi Komplek Melati (5 Rumah) berhasil dikembalikan ke awal.');
  renderApp();
}

// --- WARGA HANDLERS ---
function selectHouse(houseId) {
  state.selectedHouseId = houseId;
  state.lastRedeemedCode = null;
  renderApp();
}

function setWargaTab(tab) {
  state.wargaTab = tab;
  renderApp();
}

function setTukarSubTab(subTab) {
  state.tukarSubTab = subTab;
  renderApp();
}

function openRedeemModal(rewardId) {
  state.confirmRewardId = rewardId;
  renderModals();
}

function closeRedeemModal() {
  state.confirmRewardId = null;
  renderModals();
}

function confirmRedeem() {
  const reward = REWARD_CATALOG.find((r) => r.id === state.confirmRewardId);
  const house = state.houses.find((h) => h.id === state.selectedHouseId);
  if (!reward || !house) return;

  if (house.shoppingBalance < reward.pointsRequired) {
    showToast('Saldo poin belanja Anda belum mencukupi.', 'error');
    state.confirmRewardId = null;
    renderModals();
    return;
  }

  // ATURAN DUAL-LEDGER: Hanya shoppingBalance berkurang; leaderboardPoints TETAP!
  house.shoppingBalance -= reward.pointsRequired;

  const code = 'CR-' + Math.floor(1000 + Math.random() * 9000);
  const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  state.vouchers.unshift({
    code,
    houseId: house.id,
    houseNumber: house.houseNumber,
    familyName: house.familyName,
    rewardName: reward.name,
    pointsSpent: reward.pointsRequired,
    rupiahValue: reward.pointsRequired * POINT_TO_RUPIAH,
    partner: reward.partner,
    status: 'active',
    createdAt: `Minggu, 22 Nov • ${timeStr} WIB`,
    claimedAt: null
  });

  state.confirmRewardId = null;
  state.lastRedeemedCode = code;
  state.tukarSubTab = 'voucher';
  showToast(`Berhasil menukar ${reward.name}! Kode Voucher: ${code}`);
  renderApp();
}

// --- PETUGAS HANDLERS ---
function setPetugasTab(tab) {
  state.petugasTab = tab;
  renderApp();
}

function openScannerModal() {
  state.isScannerOpen = true;
  renderModals();
}

function closeScannerModal() {
  state.isScannerOpen = false;
  renderModals();
}

function openPickupModal(houseId) {
  state.isScannerOpen = false;
  state.activePickupHouseId = houseId;
  state.pickupCondition = 'valid';
  state.weightInputs = {
    botol_pet: '',
    kardus: '',
    kertas: '',
    plastik_hdpe: '',
    kaleng: '',
    jelantah: ''
  };
  state.selectedRejectionId = 'basah';
  state.customRejectionNote = '';
  renderModals();
}

function closePickupModal() {
  state.activePickupHouseId = null;
  renderModals();
}

function setPickupCondition(cond) {
  state.pickupCondition = cond;
  renderModals();
}

function updateWeightInput(catId, value) {
  state.weightInputs[catId] = value;
  // Perbarui angka kalkulasi poin secara langsung tanpa menghilangkan fokus input
  const previewEl = document.getElementById('pickup-live-points');
  if (previewEl) {
    const totalPts = calculateFormPoints().points;
    previewEl.textContent = `+${totalPts.toLocaleString('id-ID')} Poin`;
  }
}

function setRejectionReason(reasonId) {
  state.selectedRejectionId = reasonId;
  renderModals();
}

function updateRejectionNote(val) {
  state.customRejectionNote = val;
}

function applyDemoPreset(houseId) {
  if (houseId === 'KML-05') {
    state.pickupCondition = 'valid';
    state.weightInputs = {
      botol_pet: '2.0',
      kardus: '',
      kertas: '',
      plastik_hdpe: '',
      kaleng: '',
      jelantah: '1.0'
    };
  } else if (houseId === 'KML-03') {
    state.pickupCondition = 'rejected';
    state.selectedRejectionId = 'basah';
    state.customRejectionNote = 'Masih ada sisa kuah dan nasi di dalam tong botol.';
  } else if (houseId === 'KML-04') {
    state.pickupCondition = 'rejected';
    state.selectedRejectionId = 'kosong';
    state.customRejectionNote = '';
  } else {
    state.pickupCondition = 'valid';
    state.weightInputs = {
      botol_pet: '1.2',
      kardus: '1.5',
      kertas: '',
      plastik_hdpe: '',
      kaleng: '',
      jelantah: ''
    };
  }
  renderModals();
}

function calculateFormPoints() {
  let points = 0;
  let weight = 0;
  const items = [];

  WASTE_CATEGORIES.forEach((cat) => {
    const val = parseFloat(state.weightInputs[cat.id]);
    if (!isNaN(val) && val > 0) {
      const pts = Math.round(val * cat.pointsPerUnit);
      points += pts;
      weight += val;
      items.push({
        categoryId: cat.id,
        name: cat.name,
        weight: val,
        unit: cat.unit,
        points: pts
      });
    }
  });

  return { points, weight: Number(weight.toFixed(2)), items };
}

function savePickupTransaction() {
  const house = state.houses.find((h) => h.id === state.activePickupHouseId);
  if (!house) return;

  const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const timestamp = `Minggu, 22 Nov • ${timeStr} WIB`;

  if (state.pickupCondition === 'valid') {
    const { points, weight, items } = calculateFormPoints();
    if (items.length === 0 || points <= 0) {
      showToast('Masukkan minimal satu berat sampah (> 0 kg/L) terlebih dahulu.', 'error');
      return;
    }

    // ATURAN DUAL-LEDGER: Poin masuk menambah Leaderboard & Saldo Belanja bersamaan
    house.visitStatus = 'valid';
    house.leaderboardPoints += points;
    house.shoppingBalance += points;
    house.totalWeight = Number((house.totalWeight + weight).toFixed(2));

    state.pickupLogs.unshift({
      id: 'TX-' + Math.floor(100 + Math.random() * 900),
      houseId: house.id,
      houseNumber: house.houseNumber,
      familyName: house.familyName,
      timestamp,
      status: 'valid',
      items,
      totalPoints: points,
      totalWeight: weight,
      note: ''
    });

    state.selectedHouseId = house.id;
    state.activePickupHouseId = null;
    showToast(`+${points} Poin terkirim ke ${house.houseNumber} (${house.familyName})!`);
    renderApp();
  } else {
    const reason = REJECTION_REASONS.find((r) => r.id === state.selectedRejectionId) || REJECTION_REASONS[0];
    const finalNote = state.customRejectionNote.trim() || reason.defaultNote;

    house.visitStatus = reason.status;
    state.pickupLogs.unshift({
      id: 'TX-' + Math.floor(100 + Math.random() * 900),
      houseId: house.id,
      houseNumber: house.houseNumber,
      familyName: house.familyName,
      timestamp,
      status: reason.status,
      items: [],
      totalPoints: 0,
      totalWeight: 0,
      note: `${reason.label}. ${finalNote}`
    });

    state.selectedHouseId = house.id;
    state.activePickupHouseId = null;
    showToast(`Status "${reason.status === 'belum_terpilah' ? 'Belum Terpilah' : 'Tidak Ada Setoran'}" dicatat untuk ${house.houseNumber}.`, 'warning');
    renderApp();
  }
}

// --- WARUNG HANDLERS ---
function handleVoucherInputChange(val) {
  state.voucherCodeInput = val.toUpperCase();
}

function checkVoucherCode(presetCode) {
  const code = (presetCode || state.voucherCodeInput).trim().toUpperCase();
  if (!code) {
    showToast('Masukkan kode voucher warga terlebih dahulu.', 'error');
    return;
  }
  state.voucherCodeInput = code;
  state.checkedVoucherCode = code;
  renderApp();
}

function claimVoucher(code) {
  const voucher = state.vouchers.find((v) => v.code === code);
  if (!voucher || voucher.status !== 'active') return;

  const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  voucher.status = 'claimed';
  voucher.claimedAt = `Minggu, 22 Nov • ${timeStr} WIB`;

  showToast(`Voucher ${code} berhasil diklaim! Barang diserahkan ke warga.`);
  renderApp();
}

/* ==========================================================================
   5. RENDER FUNCTIONS (WARGA, PETUGAS, MITRA WARUNG, & MODALS)
   ========================================================================== */
function renderWargaView() {
  const ranked = getRankedHouses();
  const currentHouse = state.houses.find((h) => h.id === state.selectedHouseId) || state.houses[0];
  const currentRank = ranked.findIndex((h) => h.id === currentHouse.id) + 1;
  const myVouchers = state.vouchers.filter((v) => v.houseId === currentHouse.id);
  const myLogs = state.pickupLogs.filter((l) => l.houseId === currentHouse.id);

  let tabContentHTML = '';

  // TAB 1: BERANDA WARGA
  if (state.wargaTab === 'beranda') {
    tabContentHTML = `
      <div class="section-stack">
        <!-- Dual-Ledger Hero Card -->
        <section class="dual-ledger-card" aria-label="Ringkasan Poin Warga">
          <div class="ledger-top">
            <div>
              <p class="ledger-label">Saldo Poin Bisa Ditukar</p>
              <div class="ledger-balance-row">
                <span class="ledger-big-num">${currentHouse.shoppingBalance.toLocaleString('id-ID')}</span>
                <span class="ledger-unit">Poin</span>
              </div>
              <p class="ledger-rupiah">
                Setara <strong>${formatRupiah(currentHouse.shoppingBalance * POINT_TO_RUPIAH)}</strong> belanja di warung mitra
              </p>
            </div>
            <button type="button" class="btn-quick-redeem" onclick="setWargaTab('tukar'); setTukarSubTab('katalog');">
              <span>Tukar</span>
              <span>&rsaquo;</span>
            </button>
          </div>

          <div class="ledger-divider">
            <div>
              <p class="ledger-label">Skor Leaderboard Bulan Ini</p>
              <p class="rank-highlight">
                🏆 ${currentHouse.leaderboardPoints.toLocaleString('id-ID')} Poin (Juara #${currentRank})
              </p>
            </div>
            <button type="button" class="link-underline" onclick="setWargaTab('leaderboard')">
              Lihat Peringkat
            </button>
          </div>

          <p class="ledger-footnote">
            <span>ℹ️</span>
            <span>Skor peringkat tidak turun saat tukar hadiah.</span>
          </p>
        </section>

        <!-- Jadwal Penjemputan -->
        <section class="schedule-banner">
          <div class="schedule-icon" aria-hidden="true">📅</div>
          <div>
            <p class="schedule-title">Jadwal Jemput: Minggu, 08.00 WIB</p>
            <p class="schedule-desc">
              Taruh <strong>Tong QR</strong> (khusus botol) &amp; <strong>kantong pendamping</strong> di depan pagar.
            </p>
          </div>
        </section>

        <!-- Tabel Kurs Poin -->
        <section>
          <div class="section-heading">
            <h2>Kurs Poin Sampah Anorganik</h2>
            <span>1 Poin = Rp10</span>
          </div>
          <div class="rate-list">
            ${WASTE_CATEGORIES.map(
              (cat) => `
              <div class="rate-item">
                <div>
                  <p class="rate-name">${cat.name}</p>
                  <span class="container-tag ${cat.isTongItem ? 'tag-tong' : 'tag-kantong'}">
                    ${cat.container}
                  </span>
                </div>
                <div class="rate-points">
                  <strong>${cat.pointsPerUnit} Poin</strong>
                  <span>/ ${cat.unit}</span>
                </div>
              </div>
            `
            ).join('')}
          </div>
        </section>
      </div>
    `;
  }

  // TAB 2: LEADERBOARD (JUARA 1 SAMPAI TERAKHIR)
  if (state.wargaTab === 'leaderboard') {
    tabContentHTML = `
      <div class="section-stack">
        <div class="section-heading" style="margin-bottom: 0;">
          <div>
            <h2 style="font-size: 0.95rem;">Leaderboard Kebersihan</h2>
            <span style="display: block; margin-top: 2px;">Komplek Melati • Periode November 2026</span>
          </div>
          <span style="background: var(--amber-100); color: var(--amber-800); padding: 4px 9px; border-radius: 999px;">
            Juara 1 – 5
          </span>
        </div>

        ${ranked
          .map((house, idx) => {
            const rank = idx + 1;
            const isMe = house.id === currentHouse.id;
            const hasPoints = house.leaderboardPoints > 0;

            let medalClass = '';
            if (hasPoints && rank === 1) medalClass = 'rank-1';
            else if (hasPoints && rank === 2) medalClass = 'rank-2';
            else if (hasPoints && rank === 3) medalClass = 'rank-3';

            let statusLabel = `${house.totalWeight} kg/L terpilah`;
            if (!hasPoints) {
              statusLabel =
                house.visitStatus === 'belum_terpilah'
                  ? 'Perlu pemilahan ulang'
                  : 'Belum ada setoran';
            }

            return `
              <article class="lb-card ${isMe ? 'is-me' : ''} ${!hasPoints ? 'is-muted' : ''}">
                <div class="lb-left">
                  <div class="rank-medal ${medalClass}">
                    ${hasPoints && rank === 1 ? '🏆' : '#' + rank}
                  </div>
                  <div>
                    <div class="lb-name-row">
                      <span class="lb-house-title">Rumah ${house.houseNumber} — ${house.familyName}</span>
                      ${isMe ? '<span class="badge-me">Anda</span>' : ''}
                    </div>
                    <p class="lb-sub ${!hasPoints ? 'neutral' : ''}">${statusLabel}</p>
                  </div>
                </div>
                <div class="lb-score ${!hasPoints ? 'zero' : ''}">
                  <strong>${house.leaderboardPoints.toLocaleString('id-ID')}</strong>
                  <span>Poin</span>
                </div>
              </article>
            `;
          })
          .join('')}

        <div class="card" style="background: var(--slate-50); font-size: 0.7rem; color: var(--slate-600);">
          <strong>Catatan Sistem Poin Ganda:</strong> Peringkat diurutkan berdasarkan <em>Skor Leaderboard Bulan Ini</em> (tie-breaker: total berat sampah terpilah). Menukar poin di warung tidak menurunkan posisi peringkat Anda.
        </div>
      </div>
    `;
  }

  // TAB 3: TUKAR POIN & VOUCHER SAYA
  if (state.wargaTab === 'tukar') {
    tabContentHTML = `
      <div class="section-stack">
        <div class="card" style="background: var(--emerald-50); border-color: var(--emerald-200); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <p style="font-size: 0.7rem; font-weight: 700; color: var(--emerald-800);">
              Saldo Belanja ${currentHouse.houseNumber}
            </p>
            <p style="font-size: 1.1rem; font-weight: 800; color: var(--emerald-950);">
              ${currentHouse.shoppingBalance.toLocaleString('id-ID')} Poin
              <span style="font-size: 0.72rem; font-weight: 600; color: var(--emerald-700);">
                (${formatRupiah(currentHouse.shoppingBalance * POINT_TO_RUPIAH)})
              </span>
            </p>
          </div>
          <span style="font-size: 1.5rem;">🎟️</span>
        </div>

        <div class="sub-tabs">
          <button type="button" class="sub-tab-btn ${state.tukarSubTab === 'katalog' ? 'active' : ''}" onclick="setTukarSubTab('katalog')">
            Katalog Hadiah
          </button>
          <button type="button" class="sub-tab-btn ${state.tukarSubTab === 'voucher' ? 'active' : ''}" onclick="setTukarSubTab('voucher')">
            Voucher Saya (${myVouchers.length})
          </button>
        </div>

        ${
          state.tukarSubTab === 'katalog'
            ? `
            <p style="font-size: 0.74rem; color: var(--slate-600);">
              🏪 Mitra Penukaran: <strong>Warung Sembako Bu Tini</strong>
            </p>
            <div class="reward-grid">
              ${REWARD_CATALOG.map((item) => {
                const canAfford = currentHouse.shoppingBalance >= item.pointsRequired;
                return `
                  <article class="reward-card">
                    <div>
                      <div class="reward-top">
                        <span class="reward-emoji">${item.emoji}</span>
                        <span class="reward-tag">${item.tag}</span>
                      </div>
                      <h3 class="reward-title">${item.name}</h3>
                      <p class="reward-cost">${item.pointsRequired.toLocaleString('id-ID')} Poin</p>
                    </div>
                    <button
                      type="button"
                      class="btn-redeem"
                      ${canAfford ? `onclick="openRedeemModal('${item.id}')"` : 'disabled'}
                    >
                      ${canAfford ? 'Tukar Poin' : 'Poin Kurang'}
                    </button>
                  </article>
                `;
              }).join('')}
            </div>
          `
            : `
            ${
              state.lastRedeemedCode && myVouchers.some((v) => v.code === state.lastRedeemedCode)
                ? `
                <div style="background: var(--emerald-600); color: #ffffff; padding: 12px 14px; border-radius: var(--radius-lg); font-size: 0.74rem;">
                  <strong>✨ Penukaran Berhasil!</strong> Saldo Belanja Anda berkurang menjadi
                  <strong>${currentHouse.shoppingBalance} Poin</strong>, sementara Skor Leaderboard tetap
                  <strong>${currentHouse.leaderboardPoints} Poin (Juara #${currentRank})</strong>.
                </div>
              `
                : ''
            }
            ${
              myVouchers.length === 0
                ? `
                <div class="empty-state">
                  <p style="font-weight: 700; color: var(--slate-700); margin-bottom: 4px;">Belum ada voucher penukaran</p>
                  <p>Pilih hadiah di tab <strong>Katalog Hadiah</strong> untuk menukar poin belanja Anda.</p>
                </div>
              `
                : myVouchers
                    .map(
                      (v) => `
                    <article class="voucher-card">
                      <div class="voucher-header">
                        <span class="${v.status === 'active' ? 'voucher-badge-active' : 'voucher-badge-claimed'}">
                          ${v.status === 'active' ? 'SIAP DITUKAR' : 'SUDAH DIPAKAI'}
                        </span>
                        <span style="font-size: 0.68rem; color: var(--slate-500);">${v.createdAt}</span>
                      </div>
                      <div class="voucher-body">
                        ${buildVisualQRSVG(v.code)}
                        <div>
                          <p style="font-size: 0.88rem; font-weight: 800; color: var(--slate-900);">${v.rewardName}</p>
                          <p style="font-size: 0.74rem; color: var(--slate-600); margin-top: 2px;">${v.partner}</p>
                          <p style="font-size: 0.74rem; font-weight: 700; color: var(--emerald-700); margin-top: 4px;">
                            Senilai ${v.pointsSpent} Poin (${formatRupiah(v.rupiahValue)})
                          </p>
                          <p style="font-size: 0.68rem; color: var(--slate-500); margin-top: 4px;">
                            Tunjukkan kode <strong>${v.code}</strong> ke kasir warung.
                          </p>
                        </div>
                      </div>
                    </article>
                  `
                    )
                    .join('')
            }
          `
        }
      </div>
    `;
  }

  // TAB 4: RIWAYAT SETORAN
  if (state.wargaTab === 'riwayat') {
    tabContentHTML = `
      <div class="section-stack">
        <div class="section-heading" style="margin-bottom: 0;">
          <div>
            <h2 style="font-size: 0.95rem;">Riwayat Setoran Sampah</h2>
            <span style="display: block; margin-top: 2px;">Catatan penjemputan ${currentHouse.houseNumber}</span>
          </div>
        </div>

        ${
          myLogs.length === 0
            ? `
            <div class="empty-state">
              <p style="font-weight: 700; color: var(--slate-700); margin-bottom: 4px;">Belum ada riwayat penjemputan</p>
              <p>Pindah ke tab <strong>2. Petugas Lapangan</strong> di atas untuk memindai QR Tong ${currentHouse.houseNumber}.</p>
            </div>
          `
            : myLogs
                .map(
                  (log) => `
                <article class="card">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 0.72rem; font-weight: 600; color: var(--slate-500);">${log.timestamp}</span>
                    ${
                      log.status === 'valid'
                        ? `<span style="font-size: 0.72rem; font-weight: 800; background: var(--emerald-100); color: var(--emerald-800); padding: 3px 9px; border-radius: 999px;">+${log.totalPoints} Poin</span>`
                        : `<span style="font-size: 0.72rem; font-weight: 800; background: var(--amber-100); color: var(--amber-800); padding: 3px 9px; border-radius: 999px;">0 Poin</span>`
                    }
                  </div>

                  ${
                    log.status === 'valid'
                      ? `
                      <p style="font-size: 0.75rem; font-weight: 800; color: var(--emerald-700); margin-bottom: 6px;">
                        ✅ TERPILAH VALID
                      </p>
                      <div style="background: var(--slate-50); border-radius: 10px; padding: 8px 10px; font-size: 0.74rem;">
                        ${log.items
                          .map(
                            (it) => `
                            <div style="display: flex; justify-content: space-between; padding: 2px 0;">
                              <span>• ${it.name} (${it.weight} ${it.unit})</span>
                              <strong style="color: var(--emerald-700);">+${it.points}</strong>
                            </div>
                          `
                          )
                          .join('')}
                      </div>
                    `
                      : `
                      <p style="font-size: 0.75rem; font-weight: 800; color: var(--amber-800); margin-bottom: 6px;">
                        ⚠️ ${log.status === 'belum_terpilah' ? 'BELUM TERPILAH' : 'TIDAK ADA SETORAN'}
                      </p>
                      <p style="font-size: 0.73rem; color: var(--slate-700); background: var(--amber-50); border: 1px solid var(--amber-200); padding: 8px 10px; border-radius: 10px;">
                        ${log.note}
                      </p>
                    `
                  }
                </article>
              `
                )
                .join('')
        }
      </div>
    `;
  }

  return `
    <div class="view-content">
      <div class="app-header-emerald">
        <div class="header-top-row">
          <div>
            <p class="header-eyebrow">Komplek Melati • RT 05</p>
            <h1 class="header-title">${currentHouse.familyName} (${currentHouse.houseNumber})</h1>
          </div>
          <span class="status-pill status-pill-green">✓ Langganan Aktif</span>
        </div>

        <div class="house-selector-box">
          <label for="house-select-dropdown" class="house-selector-label">Simulasi Akun:</label>
          <select
            id="house-select-dropdown"
            class="house-select"
            onchange="selectHouse(this.value)"
          >
            ${state.houses
              .map(
                (h) => `
              <option value="${h.id}" ${h.id === currentHouse.id ? 'selected' : ''}>
                Rumah ${h.houseNumber} — ${h.familyName}
              </option>
            `
              )
              .join('')}
          </select>
        </div>
      </div>

      ${tabContentHTML}

      <nav class="bottom-nav cols-4" aria-label="Navigasi Warga">
        <button
          type="button"
          class="nav-tab ${state.wargaTab === 'beranda' ? 'active' : ''}"
          onclick="setWargaTab('beranda')"
        >
          <span style="font-size: 1.05rem;">🏠</span>
          <span>Beranda</span>
        </button>
        <button
          type="button"
          class="nav-tab ${state.wargaTab === 'leaderboard' ? 'active' : ''}"
          onclick="setWargaTab('leaderboard')"
        >
          <span style="font-size: 1.05rem;">🏆</span>
          <span>Leaderboard</span>
        </button>
        <button
          type="button"
          class="nav-tab ${state.wargaTab === 'tukar' ? 'active' : ''}"
          onclick="setWargaTab('tukar')"
        >
          <span style="font-size: 1.05rem;">🎁</span>
          <span>Tukar Poin</span>
        </button>
        <button
          type="button"
          class="nav-tab ${state.wargaTab === 'riwayat' ? 'active' : ''}"
          onclick="setWargaTab('riwayat')"
        >
          <span style="font-size: 1.05rem;">📋</span>
          <span>Riwayat</span>
        </button>
      </nav>
    </div>
  `;
}

function renderPetugasView() {
  const visitedCount = state.houses.filter((h) => h.visitStatus !== 'pending').length;
  const progressPercent = Math.round((visitedCount / state.houses.length) * 100);
  const cargo = getCargoSummary();

  let tabHTML = '';

  if (state.petugasTab === 'rute') {
    tabHTML = `
      <div class="section-stack">
        <button type="button" class="btn-scan-hero" onclick="openScannerModal()">
          <div class="scan-icon-circle" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="5" height="5" x="3" y="3" rx="1"/>
              <rect width="5" height="5" x="16" y="3" rx="1"/>
              <rect width="5" height="5" x="3" y="16" rx="1"/>
              <path d="M21 16h-3a2 2 0 0 0-2 2v3"/>
              <path d="M21 21v.01"/>
              <path d="M12 7v3a2 2 0 0 1-2 2H7"/>
              <path d="M3 12h.01"/>
              <path d="M12 3h.01"/>
              <path d="M12 16v.01"/>
              <path d="M16 12h1"/>
              <path d="M21 12v.01"/>
              <path d="M12 21v-1"/>
            </svg>
          </div>
          <div style="text-align: left;">
            <p style="font-size: 0.88rem; font-weight: 800; letter-spacing: 0.02em;">SCAN QR TONG WARGA</p>
            <p style="font-size: 0.7rem; color: var(--emerald-100);">Pindai stiker QR di tong depan pagar rumah</p>
          </div>
        </button>

        <div>
          <div class="section-heading">
            <h2>Daftar Rumah (Urutan Gang)</h2>
            <span>Ketuk rumah untuk input</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 9px;">
            ${state.houses
              .map((house) => {
                const isPending = house.visitStatus === 'pending';
                let statusIcon = '⏳';
                let statusText = '<span style="color: var(--slate-400);">Belum Dikunjungi</span>';

                if (house.visitStatus === 'valid') {
                  statusIcon = '✅';
                  statusText = `<span style="color: var(--emerald-700); font-weight: 700;">Terpilah Valid (+${house.leaderboardPoints} Poin)</span>`;
                } else if (house.visitStatus === 'belum_terpilah') {
                  statusIcon = '⚠️';
                  statusText = '<span style="color: var(--amber-700); font-weight: 700;">Belum Terpilah (0 Poin • Notifikasi Terkirim)</span>';
                } else if (house.visitStatus === 'tidak_ada_setoran') {
                  statusIcon = '⚪';
                  statusText = '<span style="color: var(--slate-500); font-weight: 600;">Tidak Ada Setoran (Tong Kosong)</span>';
                }

                return `
                  <div
                    class="house-check-card ${isPending ? '' : 'done'}"
                    onclick="openPickupModal('${house.id}')"
                    role="button"
                    tabindex="0"
                    onkeydown="if(event.key==='Enter') openPickupModal('${house.id}')"
                  >
                    <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                      <span style="font-size: 1.1rem; flex-shrink: 0;">${statusIcon}</span>
                      <div style="min-width: 0;">
                        <p style="font-size: 0.8rem; font-weight: 800; color: var(--slate-900);">
                          ${house.houseNumber} — ${house.familyName}
                        </p>
                        <p style="font-size: 0.7rem; margin-top: 2px;">${statusText}</p>
                      </div>
                    </div>
                    <span class="action-chip ${isPending ? '' : 'secondary'}">
                      ${isPending ? 'Proses ›' : '+ Tambah ›'}
                    </span>
                  </div>
                `;
              })
              .join('')}
          </div>
        </div>
      </div>
    `;
  } else {
    const validCount = state.houses.filter((h) => h.visitStatus === 'valid').length;
    const rejectedCount = state.houses.filter((h) => h.visitStatus === 'belum_terpilah').length;
    const emptyCount = state.houses.filter(
      (h) => h.visitStatus === 'tidak_ada_setoran' || h.visitStatus === 'pending'
    ).length;

    tabHTML = `
      <div class="section-stack">
        <div class="card" style="background: var(--slate-50);">
          <h2 style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--slate-500); margin-bottom: 10px;">
            Ringkasan Kunjungan Komplek
          </h2>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; text-align: center;">
            <div class="card" style="padding: 10px 6px;">
              <p style="font-size: 1.15rem; font-weight: 800; color: var(--emerald-600);">${validCount}</p>
              <p style="font-size: 0.65rem; font-weight: 600; color: var(--slate-600);">Terpilah Valid</p>
            </div>
            <div class="card" style="padding: 10px 6px;">
              <p style="font-size: 1.15rem; font-weight: 800; color: var(--amber-600);">${rejectedCount}</p>
              <p style="font-size: 0.65rem; font-weight: 600; color: var(--slate-600);">Belum Terpilah</p>
            </div>
            <div class="card" style="padding: 10px 6px;">
              <p style="font-size: 1.15rem; font-weight: 800; color: var(--slate-600);">${emptyCount}</p>
              <p style="font-size: 0.65rem; font-weight: 600; color: var(--slate-600);">Kosong / Belum</p>
            </div>
          </div>
        </div>

        <div>
          <div class="section-heading">
            <h2>🚚 Total Muatan Armada (Siap Setor)</h2>
            <span>Bank Sampah</span>
          </div>
          <div class="rate-list">
            ${cargo.categories
              .map(
                (cat) => `
              <div class="rate-item">
                <div>
                  <p class="rate-name">${cat.name}</p>
                  <p style="font-size: 0.68rem; color: var(--slate-500);">
                    Harga Bank Sampah: ${formatRupiah(cat.bankSampahPrice)}/${cat.unit}
                  </p>
                </div>
                <div class="rate-points">
                  <strong style="color: var(--slate-900);">${cat.totalWeight.toFixed(1)} ${cat.unit}</strong>
                  <span style="display: block; color: var(--emerald-700); font-weight: 700;">
                    ${formatRupiah(cat.totalBankSampahRp)}
                  </span>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <div class="dual-ledger-card" style="background: linear-gradient(145deg, var(--emerald-900), var(--emerald-950));">
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 6px;">
            <span style="color: var(--emerald-200);">Total Volume Terkumpul</span>
            <strong>${cargo.grandWeight.toFixed(1)} kg/L</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 800; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.18);">
            <span>Estimasi Cair Bank Sampah</span>
            <span style="color: var(--emerald-300);">${formatRupiah(cargo.grandBankSampahRp)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--emerald-200); margin-top: 6px;">
            <span>Alokasi Bagi Hasil Kas RT (10%)</span>
            <strong>${formatRupiah(cargo.kasRtShare)}</strong>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="view-content">
      <div class="app-header-dark">
        <div class="header-top-row">
          <div>
            <p class="header-eyebrow" style="color: var(--emerald-400);">Portal Petugas Lapangan</p>
            <h1 class="header-title">Komplek Melati (5 Rumah)</h1>
          </div>
          <span class="status-pill status-pill-green">
            ${visitedCount} / ${state.houses.length} Selesai
          </span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${progressPercent}%;"></div>
        </div>
      </div>

      ${tabHTML}

      <nav class="bottom-nav cols-2" aria-label="Navigasi Petugas">
        <button
          type="button"
          class="nav-tab ${state.petugasTab === 'rute' ? 'active' : ''}"
          onclick="setPetugasTab('rute')"
        >
          <span style="font-size: 1.05rem;">📷</span>
          <span>Rute Penjemputan</span>
        </button>
        <button
          type="button"
          class="nav-tab ${state.petugasTab === 'rekap' ? 'active' : ''}"
          onclick="setPetugasTab('rekap')"
        >
          <span style="font-size: 1.05rem;">⚖️</span>
          <span>Rekap Muatan</span>
        </button>
      </nav>
    </div>
  `;
}

function renderWarungView() {
  const claimedVouchers = state.vouchers.filter((v) => v.status === 'claimed');
  const activeVouchers = state.vouchers.filter((v) => v.status === 'active');
  const unpaidTotal = claimedVouchers.reduce((sum, v) => sum + v.rupiahValue, 0);
  const foundVoucher = state.checkedVoucherCode
    ? state.vouchers.find((v) => v.code === state.checkedVoucherCode)
    : null;

  return `
    <div class="view-content" style="padding-bottom: 24px;">
      <div class="app-header-amber">
        <div class="header-top-row">
          <div>
            <p class="header-eyebrow">Portal Mitra Merchant</p>
            <h1 class="header-title">Warung Sembako Bu Tini</h1>
          </div>
          <span style="font-size: 1.75rem;">🏪</span>
        </div>

        <div class="merchant-bill-row">
          <div>
            <p style="font-size: 0.7rem; opacity: 0.9;">Tagihan Belum Dilunasi CleanRank</p>
            <p style="font-size: 1.35rem; font-weight: 800;">${formatRupiah(unpaidTotal)}</p>
          </div>
          <span class="status-pill status-pill-green">
            ${claimedVouchers.length} Voucher Diklaim
          </span>
        </div>
      </div>

      <div class="section-stack">
        <section class="card">
          <h2 style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--slate-500);">
            Validasi Kode Voucher Warga
          </h2>
          <div class="input-group-row">
            <input
              type="text"
              class="text-input"
              style="font-family: ui-monospace, monospace; text-transform: uppercase;"
              placeholder="Contoh: CR-4821"
              value="${state.voucherCodeInput}"
              oninput="handleVoucherInputChange(this.value)"
              onkeydown="if(event.key==='Enter') checkVoucherCode()"
            />
            <button type="button" class="btn-dark" onclick="checkVoucherCode()">
              CEK VOUCHER
            </button>
          </div>

          ${
            activeVouchers.length > 0
              ? `
              <div style="margin-top: 10px;">
                <p style="font-size: 0.68rem; color: var(--slate-500); margin-bottom: 6px;">
                  Voucher aktif warga siap ditukar (ketuk untuk cek cepat):
                </p>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                  ${activeVouchers
                    .map(
                      (v) => `
                    <button
                      type="button"
                      onclick="checkVoucherCode('${v.code}')"
                      style="font-family: ui-monospace, monospace; font-size: 0.72rem; font-weight: 800; background: var(--emerald-50); color: var(--emerald-800); border: 1px solid var(--emerald-300); padding: 4px 9px; border-radius: 8px;"
                    >
                      ${v.code} (${v.houseNumber})
                    </button>
                  `
                    )
                    .join('')}
                </div>
              </div>
            `
              : ''
          }

          ${
            state.checkedVoucherCode
              ? foundVoucher
                ? `
                <div style="margin-top: 12px; background: var(--slate-50); border: 1.5px solid var(--slate-200); border-radius: var(--radius-md); padding: 12px;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                    <span style="font-family: ui-monospace, monospace; font-size: 0.9rem; font-weight: 800;">
                      ${foundVoucher.code}
                    </span>
                    <span class="${foundVoucher.status === 'active' ? 'voucher-badge-active' : 'voucher-badge-claimed'}">
                      ${foundVoucher.status === 'active' ? 'VALID — SIAP DITUKAR' : 'SUDAH DIKLAIM'}
                    </span>
                  </div>
                  <div style="font-size: 0.76rem; color: var(--slate-700); display: flex; flex-direction: column; gap: 3px; margin-bottom: 10px;">
                    <p>Warga: <strong>${foundVoucher.familyName} (${foundVoucher.houseNumber})</strong></p>
                    <p>Barang: <strong>${foundVoucher.rewardName}</strong></p>
                    <p>Nilai Tagihan CleanRank: <strong style="color: var(--emerald-700);">${formatRupiah(foundVoucher.rupiahValue)}</strong></p>
                  </div>
                  ${
                    foundVoucher.status === 'active'
                      ? `
                      <button type="button" class="btn-primary-full" onclick="claimVoucher('${foundVoucher.code}')">
                        ✓ SERAHKAN BARANG &amp; KLAIM
                      </button>
                    `
                      : ''
                  }
                </div>
              `
                : `
                <div style="margin-top: 12px; background: var(--rose-50); border: 1px solid var(--rose-200); color: var(--rose-800); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.74rem; font-weight: 600;">
                  Kode voucher <strong>${state.checkedVoucherCode}</strong> tidak ditemukan.
                </div>
              `
              : ''
          }
        </section>

        <section>
          <div class="section-heading">
            <h2>Riwayat Penukaran di Warung</h2>
            <span>${state.vouchers.length} transaksi</span>
          </div>

          ${
            state.vouchers.length === 0
              ? `
              <div class="empty-state">
                <p style="font-weight: 700; color: var(--slate-700); margin-bottom: 4px;">Belum ada voucher warga yang ditukar</p>
                <p>Buka peran <strong>1. Warga (5 Rumah)</strong>, tukar poin di Katalog Hadiah, lalu validasi kodenya di halaman ini.</p>
              </div>
            `
              : `
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${state.vouchers
                  .map(
                    (v) => `
                  <div class="card" style="display: flex; align-items: center; justify-content: space-between; padding: 11px 13px;">
                    <div>
                      <p style="font-size: 0.78rem; font-weight: 800; color: var(--slate-900);">
                        ${v.rewardName} <span style="font-family: ui-monospace, monospace; font-size: 0.7rem; color: var(--slate-500);">(${v.code})</span>
                      </p>
                      <p style="font-size: 0.7rem; color: var(--slate-500); margin-top: 2px;">
                        ${v.familyName} • ${v.houseNumber}
                      </p>
                    </div>
                    <div style="text-align: right;">
                      <p style="font-size: 0.8rem; font-weight: 800; color: var(--slate-900);">${formatRupiah(v.rupiahValue)}</p>
                      <span style="font-size: 0.66rem; font-weight: 700; color: ${v.status === 'claimed' ? 'var(--emerald-700)' : 'var(--amber-600)'};">
                        ${v.status === 'claimed' ? 'Menunggu Pelunasan' : 'Belum Diambil'}
                      </span>
                    </div>
                  </div>
                `
                  )
                  .join('')}
              </div>
            `
          }
        </section>
      </div>
    </div>
  `;
}

function renderModals() {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  // MODAL 1: SIMULASI KAMERA QR SCANNER PETUGAS
  if (state.isScannerOpen) {
    modalRoot.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target===this) closeScannerModal()">
        <div class="modal-sheet modal-sheet-dark">
          <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 10px; border-bottom: 1px solid var(--slate-800);">
            <span style="font-size: 0.78rem; font-weight: 800; color: var(--emerald-400);">
              📷 Simulasi Kamera Pemindai QR Tong
            </span>
            <button type="button" onclick="closeScannerModal()" style="color: var(--slate-300); font-size: 1.1rem; padding: 2px 6px;">✕</button>
          </div>

          <div class="viewfinder-box">
            <div class="scan-laser"></div>
            <p style="font-size: 0.68rem; color: var(--slate-300); margin-top: 12px;">
              Arahkan kamera ke stiker QR pada tong sampah rumah
            </p>
          </div>

          <p style="font-size: 0.74rem; font-weight: 700; color: var(--slate-200); margin-bottom: 8px; text-align: center;">
            Ketuk Stiker QR Tong untuk Simulasi Scan:
          </p>

          <div>
            ${state.houses
              .map(
                (h) => `
              <button type="button" class="qr-target-btn" onclick="openPickupModal('${h.id}')">
                <span>📱 Tong ${h.houseNumber} — ${h.familyName}</span>
                <span style="font-family: ui-monospace, monospace; font-size: 0.68rem; background: rgba(0,0,0,0.4); padding: 2px 7px; border-radius: 6px; color: var(--emerald-300);">
                  ${h.id}
                </span>
              </button>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
    return;
  }

  // MODAL 2: FORM INPUT TIMBANGAN / STATUS PENOLAKAN PETUGAS
  if (state.activePickupHouseId) {
    const house = state.houses.find((h) => h.id === state.activePickupHouseId);
    if (!house) {
      modalRoot.innerHTML = '';
      return;
    }
    const preview = calculateFormPoints();

    modalRoot.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target===this) closePickupModal()">
        <div class="modal-sheet">
          <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 10px; border-bottom: 1px solid var(--slate-200); margin-bottom: 12px;">
            <div>
              <p style="font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--emerald-700);">
                Identitas Terkunci • QR ${house.id}
              </p>
              <h3 style="font-size: 0.98rem; font-weight: 800; color: var(--slate-900);">
                Rumah ${house.houseNumber} — ${house.familyName}
              </h3>
            </div>
            <button type="button" onclick="closePickupModal()" style="background: var(--slate-100); color: var(--slate-700); width: 30px; height: 30px; border-radius: 999px; font-weight: 800;">✕</button>
          </div>

          <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: 10px; padding: 8px 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 12px;">
            <span style="font-size: 0.7rem; color: var(--slate-600);">Isi cepat sesuai skenario demo:</span>
            <button
              type="button"
              onclick="applyDemoPreset('${house.id}')"
              style="background: var(--slate-900); color: #ffffff; font-size: 0.68rem; font-weight: 800; padding: 5px 9px; border-radius: 7px;"
            >
              Isi Preset ${house.houseNumber}
            </button>
          </div>

          <div class="sub-tabs" style="margin-bottom: 12px;">
            <button
              type="button"
              class="sub-tab-btn ${state.pickupCondition === 'valid' ? 'active' : ''}"
              style="${state.pickupCondition === 'valid' ? 'background: var(--emerald-600); color: #ffffff;' : ''}"
              onclick="setPickupCondition('valid')"
            >
              Terpilah Valid
            </button>
            <button
              type="button"
              class="sub-tab-btn ${state.pickupCondition === 'rejected' ? 'active' : ''}"
              style="${state.pickupCondition === 'rejected' ? 'background: var(--amber-500); color: var(--slate-950);' : ''}"
              onclick="setPickupCondition('rejected')"
            >
              Ditolak / Kosong
            </button>
          </div>

          ${
            state.pickupCondition === 'valid'
              ? `
              <div style="background: var(--emerald-50); border: 1px solid var(--emerald-200); border-radius: var(--radius-md); padding: 10px; margin-bottom: 10px;">
                <p style="font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--emerald-800); margin-bottom: 6px;">
                  1. Isi Tong QR (Botol Plastik)
                </p>
                ${WASTE_CATEGORIES.filter((c) => c.isTongItem)
                  .map(
                    (cat) => `
                  <div class="weight-row" style="margin-bottom: 0; border-color: var(--emerald-200);">
                    <div>
                      <p style="font-size: 0.75rem; font-weight: 700; color: var(--slate-800);">${cat.name}</p>
                      <p style="font-size: 0.68rem; color: var(--emerald-700); font-weight: 700;">${cat.pointsPerUnit} Poin / ${cat.unit}</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 5px;">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        placeholder="0.0"
                        class="weight-input"
                        value="${state.weightInputs[cat.id]}"
                        oninput="updateWeightInput('${cat.id}', this.value)"
                      />
                      <span style="font-size: 0.72rem; font-weight: 700; color: var(--slate-500); width: 28px;">${cat.unit}</span>
                    </div>
                  </div>
                `
                  )
                  .join('')}
              </div>

              <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 10px; margin-bottom: 12px;">
                <p style="font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--slate-600); margin-bottom: 6px;">
                  2. Kantong Pendamping (Jenis Lain)
                </p>
                ${WASTE_CATEGORIES.filter((c) => !c.isTongItem)
                  .map(
                    (cat) => `
                  <div class="weight-row">
                    <div>
                      <p style="font-size: 0.75rem; font-weight: 700; color: var(--slate-800);">${cat.name}</p>
                      <p style="font-size: 0.68rem; color: var(--slate-500);">${cat.pointsPerUnit} Poin / ${cat.unit}</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 5px;">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        placeholder="0.0"
                        class="weight-input"
                        value="${state.weightInputs[cat.id]}"
                        oninput="updateWeightInput('${cat.id}', this.value)"
                      />
                      <span style="font-size: 0.72rem; font-weight: 700; color: var(--slate-500); width: 28px;">${cat.unit}</span>
                    </div>
                  </div>
                `
                  )
                  .join('')}
              </div>

              <div style="background: var(--slate-900); color: #ffffff; border-radius: var(--radius-md); padding: 12px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <div>
                  <p style="font-size: 0.68rem; color: var(--slate-300);">Total Poin Masuk (Leaderboard &amp; Saldo)</p>
                  <p id="pickup-live-points" style="font-size: 1.2rem; font-weight: 800; color: var(--emerald-400);">
                    +${preview.points.toLocaleString('id-ID')} Poin
                  </p>
                </div>
                <span style="font-size: 0.65rem; font-weight: 700; background: rgba(255,255,255,0.12); padding: 4px 8px; border-radius: 8px;">
                  Zero-Cash
                </span>
              </div>

              <button type="button" class="btn-primary-full" onclick="savePickupTransaction()">
                SIMPAN &amp; KIRIM POIN KE WARGA
              </button>
            `
              : `
              <div>
                <p style="font-size: 0.74rem; font-weight: 700; color: var(--slate-700); margin-bottom: 8px;">
                  Pilih Status / Alasan Kunjungan (0 Poin):
                </p>
                ${REJECTION_REASONS.map(
                  (r) => `
                  <label class="radio-card ${state.selectedRejectionId === r.id ? 'selected' : ''}">
                    <input
                      type="radio"
                      name="rejectionReason"
                      ${state.selectedRejectionId === r.id ? 'checked' : ''}
                      onchange="setRejectionReason('${r.id}')"
                      style="margin-top: 2px;"
                    />
                    <span>${r.label}</span>
                  </label>
                `
                ).join('')}

                <div style="margin-top: 8px; margin-bottom: 12px;">
                  <label style="display: block; font-size: 0.72rem; font-weight: 700; color: var(--slate-700); margin-bottom: 4px;">
                    Catatan Edukasi Tambahan (Opsional):
                  </label>
                  <input
                    type="text"
                    class="text-input"
                    style="width: 100%; font-size: 0.76rem; font-weight: 500;"
                    placeholder="Contoh: Masih ada sisa kuah di botol..."
                    value="${state.customRejectionNote}"
                    oninput="updateRejectionNote(this.value)"
                  />
                </div>

                <button type="button" class="btn-amber-full" onclick="savePickupTransaction()">
                  SIMPAN STATUS &amp; KIRIM NOTIFIKASI WARGA
                </button>
              </div>
            `
          }
        </div>
      </div>
    `;
    return;
  }

  // MODAL 3: KONFIRMASI PENUKARAN VOUCHER WARGA
  if (state.confirmRewardId) {
    const reward = REWARD_CATALOG.find((r) => r.id === state.confirmRewardId);
    const house = state.houses.find((h) => h.id === state.selectedHouseId);
    const ranked = getRankedHouses();
    const rank = ranked.findIndex((h) => h.id === house.id) + 1;

    if (!reward || !house) {
      modalRoot.innerHTML = '';
      return;
    }

    const remainingBalance = house.shoppingBalance - reward.pointsRequired;

    modalRoot.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target===this) closeRedeemModal()">
        <div class="modal-sheet" style="text-align: center;">
          <span style="font-size: 2.4rem;">${reward.emoji}</span>
          <h3 style="font-size: 1rem; font-weight: 800; color: var(--slate-900); margin-top: 6px;">
            Konfirmasi Penukaran Hadiah
          </h3>
          <p style="font-size: 0.76rem; color: var(--slate-600); margin-top: 6px;">
            Anda akan menukar <strong>${reward.pointsRequired.toLocaleString('id-ID')} Poin</strong> dengan
            <strong>${reward.name}</strong> di ${reward.partner}.
          </p>

          <div style="background: var(--emerald-50); border: 1px solid var(--emerald-200); border-radius: var(--radius-md); padding: 11px; margin: 14px 0; text-align: left; font-size: 0.74rem; display: flex; flex-direction: column; gap: 5px;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--slate-600);">Sisa Saldo Belanja Nanti:</span>
              <strong style="color: var(--slate-900);">${remainingBalance.toLocaleString('id-ID')} Poin</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--slate-600);">Skor Leaderboard Anda:</span>
              <strong style="color: var(--emerald-700);">Tetap ${house.leaderboardPoints.toLocaleString('id-ID')} Poin (#${rank})</strong>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <button
              type="button"
              onclick="closeRedeemModal()"
              style="padding: 10px; border-radius: var(--radius-md); border: 1.5px solid var(--slate-300); font-size: 0.78rem; font-weight: 700; color: var(--slate-700);"
            >
              Batal
            </button>
            <button
              type="button"
              onclick="confirmRedeem()"
              style="padding: 10px; border-radius: var(--radius-md); background: var(--emerald-600); color: #ffffff; font-size: 0.78rem; font-weight: 800;"
            >
              Ya, Tukar Sekarang
            </button>
          </div>
        </div>
      </div>
    `;
    return;
  }

  modalRoot.innerHTML = '';
}

function renderApp() {
  const viewport = document.getElementById('app-viewport');
  if (!viewport) return;

  if (state.activeRole === 'warga') {
    viewport.innerHTML = renderWargaView();
  } else if (state.activeRole === 'petugas') {
    viewport.innerHTML = renderPetugasView();
  } else if (state.activeRole === 'warung') {
    viewport.innerHTML = renderWarungView();
  }

  renderModals();
}

// Inisialisasi aplikasi saat halaman dimuat
renderApp();

