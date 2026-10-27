// ==========================================================================
// SIMULADOR UNIDAD 4 · TÁCTICAS Y PLAN DE MEDIOS
// Hotel Boutique Villa del Marqués · EST - IPN
// ==========================================================================

const TOTAL_PRESUPUESTO_USD = 10000;
const COMISION_OTA_ESTANCIA = 60; // $60 USD de comisión promedio por estancia
const u4State = { 1: null, 2: null, 3: null, 4: null };

function actualizarMediosU4() {
    let pGoogle = parseInt(document.getElementById('u4SliderGoogle')?.value || 40);
    let pMeta = parseInt(document.getElementById('u4SliderMeta')?.value || 30);
    let pSimb = parseInt(document.getElementById('u4SliderSimb')?.value || 20);
    let pEmail = parseInt(document.getElementById('u4SliderEmail')?.value || 10);

    const sum = pGoogle + pMeta + pSimb + pEmail;

    // Actualizar labels
    const elG = document.getElementById('u4ValGoogle');
    if (elG) elG.textContent = `${pGoogle}% ($${Math.round(TOTAL_PRESUPUESTO_USD * (pGoogle / 100)).toLocaleString('en-US')})`;

    const elM = document.getElementById('u4ValMeta');
    if (elM) elM.textContent = `${pMeta}% ($${Math.round(TOTAL_PRESUPUESTO_USD * (pMeta / 100)).toLocaleString('en-US')})`;

    const elS = document.getElementById('u4ValSimb');
    if (elS) elS.textContent = `${pSimb}% ($${Math.round(TOTAL_PRESUPUESTO_USD * (pSimb / 100)).toLocaleString('en-US')})`;

    const elE = document.getElementById('u4ValEmail');
    if (elE) elE.textContent = `${pEmail}% ($${Math.round(TOTAL_PRESUPUESTO_USD * (pEmail / 100)).toLocaleString('en-US')})`;

    const mixInfo = document.getElementById('u4ChannelMixInfo');
    if (mixInfo) mixInfo.textContent = `CIM: ${pGoogle}% Search / ${pMeta}% Meta / ${pSimb}% Simb / ${pEmail}% Email`;

    const badgeBudget = document.getElementById('u4BadgeBudget');
    if (badgeBudget) {
        if (sum === 100) {
            badgeBudget.innerHTML = '<i class="fas fa-check"></i> Asignación: 100% ($10,000)';
            badgeBudget.style.borderColor = '#10b981';
            badgeBudget.style.color = '#34d399';
        } else {
            badgeBudget.innerHTML = `<i class="fas fa-triangle-exclamation"></i> Suma: ${sum}% (Ajustar)`;
            badgeBudget.style.borderColor = '#f59e0b';
            badgeBudget.style.color = '#f59e0b';
        }
    }

    // Cálculos de rendimiento publicitario
    // Google: CPC $1.20, Conv 4.2% (Search intención directa)
    // Meta: CPC $0.60, Conv 1.8% (Branding visual)
    // Simb: Clics $0.80, Conv 5.5% (Tráfico caliente de restaurantes/viñedos)
    // Email: Clics $0.20, Conv 8.0% (Base propia fidelizada)
    const invGoogle = TOTAL_PRESUPUESTO_USD * (pGoogle / 100);
    const invMeta = TOTAL_PRESUPUESTO_USD * (pMeta / 100);
    const invSimb = TOTAL_PRESUPUESTO_USD * (pSimb / 100);
    const invEmail = TOTAL_PRESUPUESTO_USD * (pEmail / 100);

    const clicsGoogle = Math.round(invGoogle / 1.20);
    const clicsMeta = Math.round(invMeta / 0.60);
    const clicsSimb = Math.round(invSimb / 0.80);
    const clicsEmail = Math.round(invEmail / 0.20);
    const totalClics = clicsGoogle + clicsMeta + clicsSimb + clicsEmail;

    const resGoogle = Math.round(clicsGoogle * 0.042);
    const resMeta = Math.round(clicsMeta * 0.018);
    const resSimb = Math.round(clicsSimb * 0.055);
    const resEmail = Math.round(clicsEmail * 0.080);
    const totalReservas = resGoogle + resMeta + resSimb + resEmail;

    const cpa = totalReservas > 0 ? (TOTAL_PRESUPUESTO_USD / totalReservas) : 0;
    const costoOtAs = totalReservas * COMISION_OTA_ESTANCIA;
    const ahorroNeto = costoOtAs - TOTAL_PRESUPUESTO_USD;

    // Actualizar métricas
    const elClics = document.getElementById('mU4Clics');
    if (elClics) elClics.textContent = `${totalClics.toLocaleString('en-US')} visitas`;

    const elRes = document.getElementById('mU4Reservas');
    if (elRes) elRes.textContent = `${totalReservas} reservas`;

    const elCpa = document.getElementById('mU4Cpa');
    if (elCpa) {
        elCpa.textContent = `$${cpa.toFixed(2)} USD`;
        elCpa.style.color = cpa <= 35 ? '#34d399' : (cpa <= 45 ? '#fbbf24' : '#f87171');
    }

    const elAhorro = document.getElementById('mU4Ahorro');
    if (elAhorro) {
        elAhorro.textContent = ahorroNeto > 0 ? `$${ahorroNeto.toLocaleString('en-US')} USD netos` : 'Déficit promocional';
        elAhorro.style.color = ahorroNeto > 0 ? '#a78bfa' : '#f87171';
    }

    const nodeRes = document.getElementById('u4NodeReservas');
    if (nodeRes) nodeRes.textContent = `${totalReservas} Reservas Estimadas`;

    const badgeCpa = document.getElementById('u4BadgeCpa');
    if (badgeCpa) {
        badgeCpa.innerHTML = `<i class="fas fa-piggy-bank"></i> CPA: $${cpa.toFixed(2)} USD`;
    }
}

function simularPlanMediosU4() {
    const simBtn = document.getElementById('btnSimulate');
    const statusBadge = document.getElementById('workbenchStatusBadge');
    const statusText = document.getElementById('workbenchStatusText');
    const packetEl = document.getElementById('netPacketAnim');

    if (simBtn) simBtn.disabled = true;
    if (statusBadge) statusBadge.classList.add('transmitting');
    if (statusText) statusText.textContent = 'Simulando impacto de medios y conversiones...';

    logToConsole('
>>> SIMULANDO DESEMPEÑO DEL PLAN DE MEDIOS Y CIM', 'header');

    setTimeout(() => {
        logToConsole('[PASO 1] Pautando campañas de intención directa en Google Search y retargeting en Meta...', 'info');
        if (packetEl) {
            packetEl.className = 'channel-packet active-right';
            packetEl.textContent = 'ADS';
        }
    }, 400);

    setTimeout(() => {
        logToConsole('[PASO 2] Activando acuerdos de marketing simbiótico con restaurantes y viñedos patrimoniales...', 'warning');
        if (packetEl) {
            packetEl.className = 'channel-packet active-left';
            packetEl.textContent = 'SIMB';
        }
    }, 1200);

    setTimeout(() => {
        const elRes = document.getElementById('mU4Reservas')?.textContent || '300 reservas';
        const elCpa = document.getElementById('mU4Cpa')?.textContent || '$33.33 USD';
        const elAhorro = document.getElementById('mU4Ahorro')?.textContent || '$8,001 USD netos';

        logToConsole(`[RESULTADO COMERCIAL] Se alcanzaron exitosamente ${elRes} de venta directa.`, 'success');
        logToConsole(`[COSTO DE ADQUISICIÓN] CPA promedio logrado: ${elCpa} (Muy por debajo de los $60 USD de comisiones OTAs).`, 'success');
        logToConsole(`[AHORRO FINANCIERO] Ahorro neto en intermediación hotelera: ${elAhorro}.`, 'success');
        logToConsole('[CONCLUSIÓN] La combinación de Search + Marketing Simbiótico maximiza la rentabilidad sin depender de tarifas de remate.', 'info');

        if (packetEl) {
            packetEl.className = 'channel-packet';
            packetEl.textContent = 'CIM';
        }
        if (statusBadge) statusBadge.classList.remove('transmitting');
        if (statusText) statusText.textContent = 'Listo / Simulación finalizada';
        if (simBtn) simBtn.disabled = false;
    }, 2200);
}

function responderRetoU4(btn, id, esCorrecta, feedback) {
    const parent = btn.closest('.challenge-item');
    if (!parent) return;

    u4State[id] = esCorrecta;

    parent.querySelectorAll('.option-btn').forEach(b => b.classList.remove('correct', 'incorrect'));
    if (esCorrecta) btn.classList.add('correct');
    else btn.classList.add('incorrect');

    const fb = parent.querySelector('.feedback-banner');
    if (fb) {
        fb.hidden = false;
        fb.className = `feedback-banner ${esCorrecta ? 'feedback-correct' : 'feedback-incorrect'}`;
        const icon = fb.querySelector('.feedback-icon');
        if (icon) icon.innerHTML = esCorrecta ? '<i class="fas fa-circle-check"></i>' : '<i class="fas fa-triangle-exclamation"></i>';
        const txt = fb.querySelector('.feedback-text');
        if (txt) txt.innerHTML = `<strong>${esCorrecta ? '¡Decisión acertada!' : 'Decisión incorrecta:'}</strong> ${feedback}`;
    }

    actualizarResumenU4();
}

function actualizarResumenU4() {
    let respondidos = 0;
    let correctos = 0;
    Object.keys(u4State).forEach(k => {
        if (u4State[k] !== null) {
            respondidos++;
            if (u4State[k] === true) correctos++;
        }
    });

    const elRetos = document.getElementById('u4RetosCompletados');
    if (elRetos) elRetos.textContent = `${respondidos} / 4`;

    const elPuntaje = document.getElementById('u4PuntajeFinal');
    if (elPuntaje) {
        const calif = Math.round((correctos / 4) * 100);
        elPuntaje.textContent = `${calif}%`;
        elPuntaje.style.color = calif >= 75 ? '#34d399' : (calif >= 50 ? '#fbbf24' : '#f87171');
    }
}

function logToConsole(text, type = 'normal') {
    const consoleBody = document.getElementById('netConsoleBody');
    if (!consoleBody) return;
    const time = new Date().toLocaleTimeString('es-MX', { hour12: false });
    const line = document.createElement('div');
    let colorClass = '';
    if (type === 'info') colorClass = 'log-info';
    else if (type === 'success') colorClass = 'log-success';
    else if (type === 'warning') colorClass = 'log-warning';
    else if (type === 'header') colorClass = 'log-header';
    line.innerHTML = `<span style="color:#64748b;">[${time}]</span> <span class="${colorClass}">${text}</span>`;
    consoleBody.appendChild(line);
    consoleBody.scrollTop = consoleBody.scrollHeight;
}

function clearConsoleU4() {
    const consoleBody = document.getElementById('netConsoleBody');
    if (consoleBody) {
        consoleBody.innerHTML = '<div><span class="log-info">[INIT]</span> Consola limpia. Calibra los canales del plan de medios y pulsa "Simular Desempeño".</div>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarMediosU4();
});
