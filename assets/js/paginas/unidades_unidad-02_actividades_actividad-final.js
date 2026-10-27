// ==========================================================================
// SIMULADOR UNIDAD 2 · PRECIOS, MEZCLA Y PUNTO DE EQUILIBRIO
// Rutas del Centro · EST - IPN
// ==========================================================================

const COSTOS_FIJOS_MENSUALES = 95000;
const CAPACIDAD_MAXIMA_PAX = 280;
let u2Segmento = 'cultural';
const u2State = { 1: null, 2: null, 3: null, 4: null };

function setU2Segmento(seg) {
    u2Segmento = seg;
    const btnCult = document.getElementById('btnU2SegCult');
    const btnFam = document.getElementById('btnU2SegFam');
    const btnEsc = document.getElementById('btnU2SegEsc');
    const nodeSeg = document.getElementById('u2NodeSegment');
    const nodeSegSub = document.getElementById('u2NodeSegmentSub');

    [btnCult, btnFam, btnEsc].forEach(b => b?.classList.remove('active'));

    if (seg === 'cultural') {
        btnCult?.classList.add('active');
        if (nodeSeg) nodeSeg.textContent = 'Viajero Cultural';
        if (nodeSegSub) nodeSegSub.textContent = 'Profesionales 28-45 años';
        document.getElementById('u2PrecioSlider').value = 1650;
        document.getElementById('u2CostoVarSlider').value = 580;
        logToConsole('[SEGMENTO] Activado Viajero Cultural: Sensibilidad moderada al precio, valora guías certificados y maridaje.', 'info');
    } else if (seg === 'familiar') {
        btnFam?.classList.add('active');
        if (nodeSeg) nodeSeg.textContent = 'Turismo Familiar';
        if (nodeSegSub) nodeSegSub.textContent = 'Familias 4-6 miembros';
        document.getElementById('u2PrecioSlider').value = 1350;
        document.getElementById('u2CostoVarSlider').value = 520;
        logToConsole('[SEGMENTO] Activado Turismo Familiar: Mayor sensibilidad al precio por boleto, demanda actividades multigeneracionales.', 'info');
    } else {
        btnEsc?.classList.add('active');
        if (nodeSeg) nodeSeg.textContent = 'Turismo Senior / Grupos';
        if (nodeSegSub) nodeSegSub.textContent = 'Jubilados & Colectivos';
        document.getElementById('u2PrecioSlider').value = 1150;
        document.getElementById('u2CostoVarSlider').value = 460;
        logToConsole('[SEGMENTO] Activado Turismo Senior: Grupos numerosos entre semana, menor margen pero alta utilización de flota.', 'info');
    }
    actualizarSimulacionU2();
}

function actualizarSimulacionU2() {
    const precio = parseFloat(document.getElementById('u2PrecioSlider')?.value || 1450);
    const costoVar = parseFloat(document.getElementById('u2CostoVarSlider')?.value || 550);
    const pctDirecto = parseFloat(document.getElementById('u2CanalSlider')?.value || 70) / 100;
    const pctOta = 1 - pctDirecto;
    const comisionOtaPct = 0.18; // 18% comisión agencias/OTAs

    // Labels
    const precioLabel = document.getElementById('u2PrecioVal');
    if (precioLabel) precioLabel.textContent = `$${precio.toLocaleString('es-MX')} MXN`;

    const costoVarLabel = document.getElementById('u2CostoVarVal');
    if (costoVarLabel) costoVarLabel.textContent = `$${costoVar.toLocaleString('es-MX')} MXN`;

    const canalLabel = document.getElementById('u2CanalVal');
    if (canalLabel) canalLabel.textContent = `${Math.round(pctDirecto * 100)}% Directo / ${Math.round(pctOta * 100)}% OTAs (18% com.)`;

    // Cálculos
    const ingresoNetoPonderado = (precio * pctDirecto) + (precio * (1 - comisionOtaPct) * pctOta);
    const margenContribucionUnit = ingresoNetoPonderado - costoVar;
    const margenPct = ingresoNetoPonderado > 0 ? (margenContribucionUnit / ingresoNetoPonderado) * 100 : 0;

    let puntoEquilibrioPax = 0;
    let tasaOcupacion = 0;

    if (margenContribucionUnit > 0) {
        puntoEquilibrioPax = Math.ceil(COSTOS_FIJOS_MENSUALES / margenContribucionUnit);
        tasaOcupacion = (puntoEquilibrioPax / CAPACIDAD_MAXIMA_PAX) * 100;
    } else {
        puntoEquilibrioPax = 9999;
        tasaOcupacion = 999;
    }

    // Actualizar tarjetas de métricas
    const elIngreso = document.getElementById('mU2IngresoNeto');
    if (elIngreso) elIngreso.textContent = `$${ingresoNetoPonderado.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const elMargen = document.getElementById('mU2MargenUnit');
    if (elMargen) {
        elMargen.textContent = `$${margenContribucionUnit.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${margenPct.toFixed(1)}%)`;
        elMargen.style.color = margenContribucionUnit > 400 ? '#34d399' : (margenContribucionUnit > 0 ? '#fbbf24' : '#f87171');
    }

    const elPunto = document.getElementById('mU2PuntoEq');
    if (elPunto) {
        elPunto.textContent = puntoEquilibrioPax > 2000 ? 'Inviable (Déficit)' : `${puntoEquilibrioPax} pasajeros`;
        elPunto.style.color = puntoEquilibrioPax <= CAPACIDAD_MAXIMA_PAX ? '#38bdf8' : '#f87171';
    }

    const elOcupacion = document.getElementById('mU2Ocupacion');
    if (elOcupacion) {
        elOcupacion.textContent = tasaOcupacion > 100 ? `${tasaOcupacion.toFixed(1)}% (Sobrecapacidad)` : `${tasaOcupacion.toFixed(1)}% de flota`;
        elOcupacion.style.color = tasaOcupacion <= 80 ? '#a78bfa' : (tasaOcupacion <= 100 ? '#fbbf24' : '#f87171');
    }

    // Topología Badge
    const elBadge = document.getElementById('u2NodeBadge');
    const elPaxNode = document.getElementById('u2NodePax');
    if (elBadge && elPaxNode) {
        if (puntoEquilibrioPax <= CAPACIDAD_MAXIMA_PAX && margenContribucionUnit > 0) {
            elBadge.className = 'node-badge';
            elBadge.style.background = 'color-mix(in srgb, #10b981 20%, transparent)';
            elBadge.style.borderColor = '#10b981';
            elBadge.style.color = '#34d399';
            elBadge.innerHTML = '<i class="fas fa-circle-check"></i> Viable Operativamente';
            elPaxNode.textContent = `${puntoEquilibrioPax} pax / mes necesarios`;
        } else {
            elBadge.className = 'node-badge';
            elBadge.style.background = 'color-mix(in srgb, #ef4444 20%, transparent)';
            elBadge.style.borderColor = '#ef4444';
            elBadge.style.color = '#f87171';
            elBadge.innerHTML = '<i class="fas fa-triangle-exclamation"></i> Inviable / Pérdidas';
            elPaxNode.textContent = 'Excede la capacidad de flota (280 pax)';
        }
    }
}

function proyectarEscenarioU2() {
    const simBtn = document.getElementById('btnSimulate');
    const statusBadge = document.getElementById('workbenchStatusBadge');
    const statusText = document.getElementById('workbenchStatusText');
    const packetEl = document.getElementById('netPacketAnim');

    if (simBtn) simBtn.disabled = true;
    if (statusBadge) statusBadge.classList.add('transmitting');
    if (statusText) statusText.textContent = 'Calculando equilibrio y rentabilidad...';

    logToConsole('
>>> SIMULANDO ESCENARIO COMERCIAL: RUTAS DEL CENTRO', 'header');

    setTimeout(() => {
        logToConsole('[PASO 1] Ponderando ingresos brutos según canal directo vs comisión OTA...', 'info');
        if (packetEl) {
            packetEl.className = 'channel-packet active-right';
            packetEl.textContent = 'COM';
        }
    }, 400);

    setTimeout(() => {
        logToConsole('[PASO 2] Deduciendo costos variables de operación y absorción de costos fijos ($95,000)...', 'warning');
        if (packetEl) {
            packetEl.className = 'channel-packet active-left';
            packetEl.textContent = 'CF';
        }
    }, 1200);

    setTimeout(() => {
        const precio = parseFloat(document.getElementById('u2PrecioSlider')?.value || 1450);
        const costoVar = parseFloat(document.getElementById('u2CostoVarSlider')?.value || 550);
        const pctDirecto = parseFloat(document.getElementById('u2CanalSlider')?.value || 70) / 100;
        const comisionOtaPct = 0.18;
        const ingresoNeto = (precio * pctDirecto) + (precio * (1 - comisionOtaPct) * (1 - pctDirecto));
        const margen = ingresoNeto - costoVar;
        const pe = Math.ceil(COSTOS_FIJOS_MENSUALES / margen);

        if (margen <= 0) {
            logToConsole('[CRÍTICO] Margen de contribución negativo. Cada pasajero atendido genera pérdidas.', 'warning');
        } else if (pe > CAPACIDAD_MAXIMA_PAX) {
            logToConsole(`[ALERTA DE CAPACIDAD] Se requieren ${pe} pax/mes para cubrir costos fijos, pero la capacidad es de solo 280 pax. El modelo genera pérdida operativa.`, 'warning');
        } else {
            const ocupPct = ((pe / CAPACIDAD_MAXIMA_PAX) * 100).toFixed(1);
            const utilidadPlena = Math.round((CAPACIDAD_MAXIMA_PAX * margen) - COSTOS_FIJOS_MENSUALES);
            logToConsole(`[ÉXITO FINANCIERO] Punto de equilibrio alcanzado con ${pe} pasajeros (${ocupPct}% de ocupación de flota).`, 'success');
            logToConsole(`[PROYECCIÓN A PLENA CAPACIDAD] Utilidad neta mensual estimada al 100%: $${utilidadPlena.toLocaleString('es-MX')} MXN.`, 'success');
            logToConsole(`[RECOMENDACIÓN] Mantener reservas directas por encima del 65% para blindar el margen de contribución.`, 'info');
        }

        if (packetEl) {
            packetEl.className = 'channel-packet';
            packetEl.textContent = 'MIX';
        }
        if (statusBadge) statusBadge.classList.remove('transmitting');
        if (statusText) statusText.textContent = 'Listo / Simulación finalizada';
        if (simBtn) simBtn.disabled = false;
    }, 2200);
}

function responderRetoU2(btn, id, esCorrecta, feedback) {
    const parent = btn.closest('.challenge-item');
    if (!parent) return;

    u2State[id] = esCorrecta;

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

    actualizarResumenU2();
}

function actualizarResumenU2() {
    let respondidos = 0;
    let correctos = 0;
    Object.keys(u2State).forEach(k => {
        if (u2State[k] !== null) {
            respondidos++;
            if (u2State[k] === true) correctos++;
        }
    });

    const elRetos = document.getElementById('u2RetosCompletados');
    if (elRetos) elRetos.textContent = `${respondidos} / 4`;

    const elPuntaje = document.getElementById('u2PuntajeFinal');
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

function clearConsoleU2() {
    const consoleBody = document.getElementById('netConsoleBody');
    if (consoleBody) {
        consoleBody.innerHTML = '<div><span class="log-info">[INIT]</span> Consola limpia. Calibra los parámetros y haz clic en "Proyectar Escenario".</div>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarSimulacionU2();
});
