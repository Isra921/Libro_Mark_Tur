// ==========================================================================
// SIMULADOR UNIDAD 4 · TÁCTICAS Y PLAN DE MEDIOS
// Hotel Boutique (20 Habitaciones) · EST - IPN
// Basado fielmente en el documento oficial de la Unidad 4
// ==========================================================================

const TOTAL_PRESUPUESTO_MXN = 10000;
const u4State = { 1: null, 2: null, 3: null, 4: null };

function actualizarMediosU4() {
    let pSearch = parseInt(document.getElementById('u4SliderSearch')?.value || 40);
    let pSocial = parseInt(document.getElementById('u4SliderSocial')?.value || 20);
    let pEmail = parseInt(document.getElementById('u4SliderEmail')?.value || 5);
    let pLocal = parseInt(document.getElementById('u4SliderLocal')?.value || 10);
    let pWeb = parseInt(document.getElementById('u4SliderWeb')?.value || 25);

    const sum = pSearch + pSocial + pEmail + pLocal + pWeb;

    // Actualizar etiquetas
    const elS = document.getElementById('u4ValSearch');
    if (elS) elS.textContent = `${pSearch}% ($${Math.round(TOTAL_PRESUPUESTO_MXN * (pSearch / 100)).toLocaleString('es-MX')} MXN)`;

    const elSoc = document.getElementById('u4ValSocial');
    if (elSoc) elSoc.textContent = `${pSocial}% ($${Math.round(TOTAL_PRESUPUESTO_MXN * (pSocial / 100)).toLocaleString('es-MX')} MXN)`;

    const elE = document.getElementById('u4ValEmail');
    if (elE) elE.textContent = `${pEmail}% ($${Math.round(TOTAL_PRESUPUESTO_MXN * (pEmail / 100)).toLocaleString('es-MX')} MXN)`;

    const elL = document.getElementById('u4ValLocal');
    if (elL) elL.textContent = `${pLocal}% ($${Math.round(TOTAL_PRESUPUESTO_MXN * (pLocal / 100)).toLocaleString('es-MX')} MXN)`;

    const elW = document.getElementById('u4ValWeb');
    if (elW) elW.textContent = `${pWeb}% ($${Math.round(TOTAL_PRESUPUESTO_MXN * (pWeb / 100)).toLocaleString('es-MX')} MXN)`;

    const mixInfo = document.getElementById('u4ChannelMixInfo');
    if (mixInfo) mixInfo.textContent = `CIM: ${pSearch}% Búsqueda / ${pSocial}% Redes / ${pEmail}% Correo / ${pLocal}% Material / ${pWeb}% Web`;

    const badgeBudget = document.getElementById('u4BadgeBudget');
    if (badgeBudget) {
        if (sum === 100) {
            badgeBudget.innerHTML = '<i class="fas fa-check"></i> Asignación: 100% ($10,000 MXN)';
            badgeBudget.style.borderColor = '#10b981';
            badgeBudget.style.color = '#34d399';
        } else {
            badgeBudget.innerHTML = `<i class="fas fa-triangle-exclamation"></i> Suma: ${sum}% (Ajustar a 100%)`;
            badgeBudget.style.borderColor = '#f59e0b';
            badgeBudget.style.color = '#f59e0b';
        }
    }

    // Rendimiento e indicadores basados en la Tabla de Medios del documento:
    // Búsqueda pagada ($4,000 -> 200 visitas)
    // Redes sociales ($2,000 -> 40 consultas calificadas)
    // Correo ($500 -> 10 consultas calificadas)
    // Material local ($1,000 -> 10 consultas identificadas)
    // Página y medición ($2,500 -> 30 reservas meta)
    const invSearch = TOTAL_PRESUPUESTO_MXN * (pSearch / 100);
    const invSocial = TOTAL_PRESUPUESTO_MXN * (pSocial / 100);
    const invEmail = TOTAL_PRESUPUESTO_MXN * (pEmail / 100);
    const invLocal = TOTAL_PRESUPUESTO_MXN * (pLocal / 100);
    const invWeb = TOTAL_PRESUPUESTO_MXN * (pWeb / 100);

    const visitasSearch = Math.round((invSearch / 4000) * 200);
    const consultasSocial = Math.round((invSocial / 2000) * 40);
    const consultasEmail = Math.round((invEmail / 500) * 10);
    const consultasLocal = Math.round((invLocal / 1000) * 10);
    const totalConsultas = consultasSocial + consultasEmail + consultasLocal;

    // Reservas estimadas orientadas a la meta de 30 reservas directas
    const factorWeb = invWeb / 2500;
    const factorMedios = (visitasSearch / 200) * 0.4 + (totalConsultas / 60) * 0.6;
    let totalReservas = Math.round(30 * factorMedios * Math.min(1.2, factorWeb));
    if (sum !== 100) {
        totalReservas = Math.round(totalReservas * (sum / 100));
    }

    const costoPorReserva = totalReservas > 0 ? (TOTAL_PRESUPUESTO_MXN / totalReservas) : 0;

    // Actualizar tarjetas de métricas
    const elClics = document.getElementById('mU4Clics');
    if (elClics) elClics.textContent = `${visitasSearch} visitas (Búsqueda)`;

    const elConsultas = document.getElementById('mU4Consultas');
    if (elConsultas) elConsultas.textContent = `${totalConsultas} consultas calificadas`;

    const elRes = document.getElementById('mU4Reservas');
    if (elRes) elRes.textContent = `${totalReservas} reservas directas`;

    const elCpa = document.getElementById('mU4Cpa');
    if (elCpa) {
        elCpa.textContent = `$${costoPorReserva.toFixed(2)} MXN`;
        elCpa.style.color = costoPorReserva <= 340 ? '#34d399' : (costoPorReserva <= 450 ? '#fbbf24' : '#f87171');
    }

    const nodeRes = document.getElementById('u4NodeReservas');
    if (nodeRes) nodeRes.textContent = `${totalReservas} Reservas Directas Meta`;

    const badgeCpa = document.getElementById('u4BadgeCpa');
    if (badgeCpa) {
        badgeCpa.innerHTML = `<i class="fas fa-coins"></i> Costo/Reserva: $${costoPorReserva.toFixed(2)} MXN`;
    }
}

function simularPlanMediosU4() {
    const simBtn = document.getElementById('btnSimulate');
    const statusBadge = document.getElementById('workbenchStatusBadge');
    const statusText = document.getElementById('workbenchStatusText');
    const packetEl = document.getElementById('netPacketAnim');

    if (simBtn) simBtn.disabled = true;
    if (statusBadge) statusBadge.classList.add('transmitting');
    if (statusText) statusText.textContent = 'Simulando ejecución del plan de medios...';

    logToConsole('>>> SIMULANDO DESEMPEÑO DEL PLAN DE MEDIOS Y CIM (UNIDAD 4)', 'header');

    setTimeout(() => {
        logToConsole('[SEMANAS 3-8] Activando Búsqueda Pagada para captar intención de reserva de hospedaje...', 'info');
        if (packetEl) {
            packetEl.className = 'channel-packet active-right';
            packetEl.textContent = 'SEARCH';
        }
    }, 400);

    setTimeout(() => {
        logToConsole('[SEMANAS 3-6] Difundiendo fotografías y dos mensajes de prueba en Redes Sociales...', 'info');
        if (packetEl) {
            packetEl.className = 'channel-packet active-left';
            packetEl.textContent = 'REDES';
        }
    }, 900);

    setTimeout(() => {
        logToConsole('[SEMANAS 4 Y 6] Enviando 2 campañas de correo a lista con autorización previa...', 'info');
    }, 1400);

    setTimeout(() => {
        logToConsole('[SEMANAS 3-8] Distribuyendo material local y tarjetas con código con operador de recorridos aliado...', 'warning');
    }, 1800);

    setTimeout(() => {
        const elRes = document.getElementById('mU4Reservas')?.textContent || '30 reservas directas';
        const elCpa = document.getElementById('mU4Cpa')?.textContent || '$333.33 MXN';

        logToConsole(`[RESULTADO FINAL] Meta lograda: ${elRes} de domingo a jueves (+50% vs base de 20).`, 'success');
        logToConsole(`[EVALUACIÓN FINANCIERA] Costo total del plan por reserva: ${elCpa} ($10,000 MXN ÷ 30 reservas).`, 'success');
        logToConsole('[CONVERSIÓN WEB] Proceso móvil en 2 pasos validado sin fricciones de pago.', 'success');
        logToConsole('[CONCLUSIÓN] La coordinación de CIM garantiza que la promesa publicitaria coincida con la disponibilidad real y el descanso recibido.', 'header');

        if (packetEl) {
            packetEl.className = 'channel-packet';
            packetEl.textContent = 'CIM';
        }
        if (statusBadge) statusBadge.classList.remove('transmitting');
        if (statusText) statusText.textContent = 'Listo / Simulación finalizada';
        if (simBtn) simBtn.disabled = false;
    }, 2400);
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
