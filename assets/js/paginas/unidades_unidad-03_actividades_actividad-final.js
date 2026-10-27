// ==========================================================================
// SIMULADOR UNIDAD 3 · MATRICES ESTRATÉGICAS Y COMPETITIVIDAD
// Rutas del Centro · EST - IPN
// ==========================================================================

let u3ActiveTool = 'mefe_mefi';
const u3State = { 1: null, 2: null, 3: null, 4: null };

function setU3Tool(tool) {
    u3ActiveTool = tool;
    const btnMefe = document.getElementById('btnU3Mefe');
    const btnBcg = document.getElementById('btnU3Bcg');
    const btnMpc = document.getElementById('btnU3Mpc');

    [btnMefe, btnBcg, btnMpc].forEach(b => b?.classList.remove('active'));

    const panel = document.getElementById('u3ToolPanel');
    if (!panel) return;

    if (tool === 'mefe_mefi') {
        btnMefe?.classList.add('active');
        panel.innerHTML = `
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
                <div style="background:rgba(255,255,255,0.03); padding:1rem; border-radius:8px; border-left:3px solid #34d399;">
                    <h4 style="margin:0 0 0.5rem; font-size:0.95rem; color:#34d399;"><i class="fas fa-table-cells"></i> Factores Internos (MEFI)</h4>
                    <ul style="margin:0; padding-left:1.2rem; font-size:0.85rem; color:var(--text-muted); line-height:1.6;">
                        <li><strong>F1:</strong> Flota moderna y guías acreditados (Peso: 0.20 | Calif: 4 -> 0.80)</li>
                        <li><strong>F2:</strong> Alianzas con hoteles del centro histórico (Peso: 0.15 | Calif: 3 -> 0.45)</li>
                        <li><strong>D1:</strong> Plataforma digital en desarrollo (Peso: 0.20 | Calif: 2 -> 0.40)</li>
                        <li><strong>D2:</strong> Dependencia de fines de semana (Peso: 0.15 | Calif: 2 -> 0.30)</li>
                    </ul>
                    <p style="margin:0.75rem 0 0; font-size:0.9rem; font-weight:700; color:#fff;">Puntaje Ponderado MEFI: <span style="color:#34d399;">2.85 / 4.00</span></p>
                </div>

                <div style="background:rgba(255,255,255,0.03); padding:1rem; border-radius:8px; border-left:3px solid #38bdf8;">
                    <h4 style="margin:0 0 0.5rem; font-size:0.95rem; color:#38bdf8;"><i class="fas fa-table-cells"></i> Factores Externos (MEFE)</h4>
                    <ul style="margin:0; padding-left:1.2rem; font-size:0.85rem; color:var(--text-muted); line-height:1.6;">
                        <li><strong>O1:</strong> Crecimiento del enoturismo regional (+34%) (Peso: 0.25 | Calif: 3 -> 0.75)</li>
                        <li><strong>O2:</strong> Incentivos estatales a movilidad verde (Peso: 0.15 | Calif: 3 -> 0.45)</li>
                        <li><strong>A1:</strong> Volatilidad de precio de combustibles (Peso: 0.20 | Calif: 2 -> 0.40)</li>
                        <li><strong>A2:</strong> Entrada de transportes informales no regulados (Peso: 0.20 | Calif: 2 -> 0.40)</li>
                    </ul>
                    <p style="margin:0.75rem 0 0; font-size:0.9rem; font-weight:700; color:#fff;">Puntaje Ponderado MEFE: <span style="color:#38bdf8;">2.75 / 4.00</span></p>
                </div>
            </div>
        `;
        logToConsole('[VISTA] Diagnóstico MEFE/MEFI cargado. Ambos puntajes ponderados superan el promedio de 2.50.', 'info');
    } else if (tool === 'bcg') {
        btnBcg?.classList.add('active');
        panel.innerHTML = `
            <h4 style="margin:0 0 0.75rem; font-size:0.95rem; color:#f59e0b;"><i class="fas fa-chart-pie"></i> Cartera de Productos · Matriz BCG</h4>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.75rem; text-align:center;">
                <div style="background:rgba(245, 158, 11, 0.1); border:1px solid #f59e0b; padding:0.75rem; border-radius:8px;">
                    <span style="font-size:0.8rem; font-weight:700; color:#f59e0b;">⭐ ESTRELLA (Alto Crecimiento / Alta Cuota)</span>
                    <p style="margin:0.25rem 0 0; font-size:0.85rem; color:#fff;"><strong>Ruta del Vino & Queserías</strong><br><small style="color:var(--text-muted);">Autofinancia su expansión y crece al 28%</small></p>
                </div>
                <div style="background:rgba(56, 189, 248, 0.1); border:1px solid #38bdf8; padding:0.75rem; border-radius:8px;">
                    <span style="font-size:0.8rem; font-weight:700; color:#38bdf8;">❓ INTERROGANTE (Alto Crec. / Baja Cuota)</span>
                    <p style="margin:0.25rem 0 0; font-size:0.85rem; color:#fff;"><strong>Tour de Ciclismo y Ecoturismo</strong><br><small style="color:var(--text-muted);">Requiere inversión de la Vaca para despegar</small></p>
                </div>
                <div style="background:rgba(16, 185, 129, 0.1); border:1px solid #10b981; padding:0.75rem; border-radius:8px;">
                    <span style="font-size:0.8rem; font-weight:700; color:#10b981;">🐄 VACA LECHERA (Bajo Crec. / Alta Cuota)</span>
                    <p style="margin:0.25rem 0 0; font-size:0.85rem; color:#fff;"><strong>Tour Colonial Tradicional</strong><br><small style="color:var(--text-muted);">Genera $450,000 anuales de liquidez neta</small></p>
                </div>
                <div style="background:rgba(239, 68, 68, 0.1); border:1px solid #ef4444; padding:0.75rem; border-radius:8px;">
                    <span style="font-size:0.8rem; font-weight:700; color:#ef4444;">🐕 PERRO (Bajo Crec. / Baja Cuota)</span>
                    <p style="margin:0.25rem 0 0; font-size:0.85rem; color:#fff;"><strong>City Tour Nocturno</strong><br><small style="color:var(--text-muted);">Opera a pérdida; candidato a eliminación</small></p>
                </div>
            </div>
        `;
        logToConsole('[VISTA] Matriz BCG cargada. La Vaca Lechera subsidia al Interrogante; el Perro debe cosecharse.', 'info');
    } else {
        btnMpc?.classList.add('active');
        panel.innerHTML = `
            <h4 style="margin:0 0 0.75rem; font-size:0.95rem; color:#a78bfa;"><i class="fas fa-trophy"></i> Matriz del Perfil Competitivo (MPC)</h4>
            <div style="overflow-x:auto;">
                <table style="width:100%; font-size:0.85rem; border-collapse:collapse; color:#fff;">
                    <thead>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.2); text-align:left;">
                            <th style="padding:0.5rem;">Factor Crítico de Éxito</th>
                            <th style="padding:0.5rem;">Peso</th>
                            <th style="padding:0.5rem; color:#34d399;">Rutas del Centro</th>
                            <th style="padding:0.5rem; color:#38bdf8;">Bajío Express</th>
                            <th style="padding:0.5rem; color:#f59e0b;">ViajaFácil App</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                            <td style="padding:0.5rem;">Calidad de flota y seguridad</td>
                            <td>0.25</td>
                            <td style="color:#34d399;">4 (1.00)</td>
                            <td>3 (0.75)</td>
                            <td>2 (0.50)</td>
                        </tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                            <td style="padding:0.5rem;">Reserva web inmediata 24/7</td>
                            <td>0.25</td>
                            <td style="color:#34d399;" id="mpcRutasWeb">2 (0.50)</td>
                            <td>3 (0.75)</td>
                            <td>4 (1.00)</td>
                        </tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                            <td style="padding:0.5rem;">Guías acreditados y servicio</td>
                            <td>0.25</td>
                            <td style="color:#34d399;">4 (1.00)</td>
                            <td>3 (0.75)</td>
                            <td>2 (0.50)</td>
                        </tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                            <td style="padding:0.5rem;">Competitividad de precios</td>
                            <td>0.25</td>
                            <td style="color:#34d399;">3 (0.75)</td>
                            <td>3 (0.75)</td>
                            <td>4 (1.00)</td>
                        </tr>
                        <tr style="font-weight:700;">
                            <td style="padding:0.5rem;">Puntaje Ponderado Total</td>
                            <td>1.00</td>
                            <td style="color:#34d399; font-size:1rem;" id="mpcRutasTotal">3.25</td>
                            <td style="color:#38bdf8; font-size:1rem;">3.00</td>
                            <td style="color:#f59e0b; font-size:1rem;">3.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p style="margin:0.75rem 0 0; font-size:0.8rem; color:var(--text-muted);">
                * Nota: Si se implementa el motor de reservas web con confirmación inmediata, la calificación de Rutas pasa de 2 a 4 (+0.50 ponderado), elevando el score total a <strong>3.75</strong> consolidando el liderazgo indiscutible.
            </p>
        `;
        logToConsole('[VISTA] Matriz del Perfil Competitivo (MPC) activa. Brecha crítica identificada en la digitalización de la reserva.', 'info');
    }
}

function simularEstrategiaU3() {
    const simBtn = document.getElementById('btnSimulate');
    const statusBadge = document.getElementById('workbenchStatusBadge');
    const statusText = document.getElementById('workbenchStatusText');
    const packetEl = document.getElementById('netPacketAnim');

    if (simBtn) simBtn.disabled = true;
    if (statusBadge) statusBadge.classList.add('transmitting');
    if (statusText) statusText.textContent = 'Simulando cruce matricial...';

    logToConsole('
>>> EJECUTANDO FORMULACIÓN MATRICIAL Y SIMULACIÓN', 'header');

    setTimeout(() => {
        logToConsole('[FASE 1] Cruzando fortalezas internas con oportunidades de mercado (Estrategia FO)...', 'info');
        if (packetEl) {
            packetEl.className = 'channel-packet active-right';
            packetEl.textContent = 'FO';
        }
    }, 400);

    setTimeout(() => {
        logToConsole('[FASE 2] Transfiriendo excedentes de la Vaca Lechera al Interrogante (Ciclo BCG)...', 'warning');
        if (packetEl) {
            packetEl.className = 'channel-packet active-left';
            packetEl.textContent = 'BCG';
        }
    }, 1200);

    setTimeout(() => {
        logToConsole('[RESULTADO TOWS] Lanzamiento de la "Ruta Enológica VIP" proyecta captar +35% de cuota de mercado en 90 días.', 'success');
        logToConsole('[RESULTADO BCG] El tour de aventura alcanza su punto de equilibrio gracias a la inversión de $220,000 transferida de la Vaca.', 'success');
        logToConsole('[RESULTADO MPC] Con la digitalización web, el score competitivo de Rutas del Centro asciende a 3.75 superando a Bajío Express (3.00) y ViajaFácil (3.00).', 'success');

        const mpcWeb = document.getElementById('mpcRutasWeb');
        const mpcTot = document.getElementById('mpcRutasTotal');
        if (mpcWeb) mpcWeb.innerHTML = '<strong style="color:#34d399;">4 (1.00) 🚀</strong>';
        if (mpcTot) mpcTot.innerHTML = '<strong style="color:#34d399; font-size:1.1rem;">3.75 (Líder Absoluto)</strong>';

        const u3MpcScore = document.getElementById('u3MpcScore');
        if (u3MpcScore) u3MpcScore.textContent = 'Rutas: 3.75 vs Rival: 3.00';

        if (packetEl) {
            packetEl.className = 'channel-packet';
            packetEl.textContent = 'TOWS';
        }
        if (statusBadge) statusBadge.classList.remove('transmitting');
        if (statusText) statusText.textContent = 'Listo / Auditoría y cruces finalizados';
        if (simBtn) simBtn.disabled = false;
    }, 2200);
}

function responderRetoU3(btn, id, esCorrecta, feedback) {
    const parent = btn.closest('.challenge-item');
    if (!parent) return;

    u3State[id] = esCorrecta;

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

    actualizarResumenU3();
}

function actualizarResumenU3() {
    let respondidos = 0;
    let correctos = 0;
    Object.keys(u3State).forEach(k => {
        if (u3State[k] !== null) {
            respondidos++;
            if (u3State[k] === true) correctos++;
        }
    });

    const elRetos = document.getElementById('u3RetosCompletados');
    if (elRetos) elRetos.textContent = `${respondidos} / 4`;

    const elPuntaje = document.getElementById('u3PuntajeFinal');
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

function clearConsoleU3() {
    const consoleBody = document.getElementById('netConsoleBody');
    if (consoleBody) {
        consoleBody.innerHTML = '<div><span class="log-info">[INIT]</span> Consola limpia. Selecciona una herramienta matricial y ejecuta la simulación.</div>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setU3Tool('mefe_mefi');
});
