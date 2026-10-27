// ==========================================================================
// SIMULADOR UNIDAD 5 · RUTA CRÍTICA Y CONTROL GERENCIAL
// Senda Los Pinos · EST - IPN
// ==========================================================================

let u5Module = 'cpm';
const u5State = { 1: null, 2: null, 3: null, 4: null };

function setU5Module(mod) {
    u5Module = mod;
    const btnCpm = document.getElementById('btnU5Cpm');
    const btnKpi = document.getElementById('btnU5Kpi');
    const btnPres = document.getElementById('btnU5Presupuesto');

    [btnCpm, btnKpi, btnPres].forEach(b => b?.classList.remove('active'));

    const panel = document.getElementById('u5ModulePanel');
    if (!panel) return;

    if (mod === 'cpm') {
        btnCpm?.classList.add('active');
        panel.innerHTML = `
            <h4 style="margin:0 0 0.75rem; font-size:0.95rem; color:#34d399;"><i class="fas fa-diagram-project"></i> Red de Actividades del Método CPM</h4>
            <div style="overflow-x:auto;">
                <table style="width:100%; font-size:0.85rem; border-collapse:collapse; color:#fff;">
                    <thead>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.2); text-align:left;">
                            <th style="padding:0.4rem;">Actividad</th>
                            <th style="padding:0.4rem;">Descripción</th>
                            <th style="padding:0.4rem;">Precedencia</th>
                            <th style="padding:0.4rem;">Duración</th>
                            <th style="padding:0.4rem;">Holgura</th>
                            <th style="padding:0.4rem;">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06); background:rgba(239, 68, 68, 0.1);">
                            <td style="padding:0.4rem; font-weight:700; color:#f87171;">A</td>
                            <td>Permisos y plan de capacidad de carga</td>
                            <td>-</td>
                            <td>4 semanas</td>
                            <td style="color:#f87171; font-weight:700;">0 sem</td>
                            <td><span style="color:#f87171; font-size:0.75rem; font-weight:700;">CRÍTICA</span></td>
                        </tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                            <td style="padding:0.4rem; font-weight:700;">B</td>
                            <td>Diseño de experiencias con comunidades</td>
                            <td>A</td>
                            <td>3 semanas</td>
                            <td style="color:#34d399; font-weight:700;">2 sem</td>
                            <td><span style="color:#34d399; font-size:0.75rem;">Flexible</span></td>
                        </tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06); background:rgba(239, 68, 68, 0.1);">
                            <td style="padding:0.4rem; font-weight:700; color:#f87171;">C</td>
                            <td>Adecuación física de senderos y señalética</td>
                            <td>A</td>
                            <td>5 semanas</td>
                            <td style="color:#f87171; font-weight:700;">0 sem</td>
                            <td><span style="color:#f87171; font-size:0.75rem; font-weight:700;">CRÍTICA</span></td>
                        </tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                            <td style="padding:0.4rem; font-weight:700;">D</td>
                            <td>Desarrollo web y motor de reservas</td>
                            <td>B</td>
                            <td>4 semanas</td>
                            <td style="color:#34d399; font-weight:700;">2 sem</td>
                            <td><span style="color:#34d399; font-size:0.75rem;">Flexible</span></td>
                        </tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06); background:rgba(239, 68, 68, 0.1);">
                            <td style="padding:0.4rem; font-weight:700; color:#f87171;">E</td>
                            <td>Campaña de prelanzamiento en medios</td>
                            <td>C, D</td>
                            <td>3 semanas</td>
                            <td style="color:#f87171; font-weight:700;">0 sem</td>
                            <td><span style="color:#f87171; font-size:0.75rem; font-weight:700;">CRÍTICA</span></td>
                        </tr>
                        <tr style="background:rgba(239, 68, 68, 0.1);">
                            <td style="padding:0.4rem; font-weight:700; color:#f87171;">F</td>
                            <td>Capacitación y simulacro operativo</td>
                            <td>E</td>
                            <td>2 semanas</td>
                            <td style="color:#f87171; font-weight:700;">0 sem</td>
                            <td><span style="color:#f87171; font-size:0.75rem; font-weight:700;">CRÍTICA</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p style="margin:0.75rem 0 0; font-size:0.8rem; color:var(--text-muted);">
                * Duración total del proyecto: <strong>14 semanas inamovibles</strong> (Ruta Crítica: A [4] + C [5] + E [3] + F [2]). Cualquier retraso en A, C, E o F posterga la inauguración.
            </p>
        `;
        logToConsole('[VISTA] Red CPM cargada. Ruta crítica identificada con holgura cero en 4 actividades.', 'info');
    } else if (mod === 'kpi') {
        btnKpi?.classList.add('active');
        panel.innerHTML = `
            <h4 style="margin:0 0 0.75rem; font-size:0.95rem; color:#38bdf8;"><i class="fas fa-chart-line"></i> Tablero de Control de KPIs · Monitoreo Mensual</h4>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:1rem;">
                <div style="background:rgba(255,255,255,0.03); padding:0.75rem; border-radius:8px; border-left:4px solid #f59e0b;">
                    <span style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Ocupación Temporada Alta</span>
                    <p style="margin:0.25rem 0 0; font-size:1.1rem; font-weight:800; color:#fff;">Real: 62% <small style="color:var(--text-muted);">(Meta: 75%)</small></p>
                    <span style="display:inline-block; margin-top:0.35rem; font-size:0.75rem; font-weight:700; color:#f59e0b;"><i class="fas fa-circle-exclamation"></i> Ámbar (-13%) · Lanzar 3x2 entre semana</span>
                </div>

                <div style="background:rgba(255,255,255,0.03); padding:0.75rem; border-radius:8px; border-left:4px solid #ef4444;">
                    <span style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Costo Adquisición (CAC)</span>
                    <p style="margin:0.25rem 0 0; font-size:1.1rem; font-weight:800; color:#fff;">Real: $490 <small style="color:var(--text-muted);">(Meta: $350 MXN)</small></p>
                    <span style="display:inline-block; margin-top:0.35rem; font-size:0.75rem; font-weight:700; color:#ef4444;"><i class="fas fa-circle-xmark"></i> Rojo (+40%) · Pausar keywords caras</span>
                </div>

                <div style="background:rgba(255,255,255,0.03); padding:0.75rem; border-radius:8px; border-left:4px solid #10b981;">
                    <span style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Satisfacción Visitante (CSAT)</span>
                    <p style="margin:0.25rem 0 0; font-size:1.1rem; font-weight:800; color:#fff;">Real: 94% <small style="color:var(--text-muted);">(Meta: 90%)</small></p>
                    <span style="display:inline-block; margin-top:0.35rem; font-size:0.75rem; font-weight:700; color:#10b981;"><i class="fas fa-circle-check"></i> Verde (+4%) · Servicio consolidado</span>
                </div>
            </div>
        `;
        logToConsole('[VISTA] Tablero de Control de KPIs activo. 1 semáforo verde, 1 ámbar y 1 alerta roja en CAC.', 'warning');
    } else {
        btnPres?.classList.add('active');
        panel.innerHTML = `
            <h4 style="margin:0 0 0.75rem; font-size:0.95rem; color:#f59e0b;"><i class="fas fa-coins"></i> Presupuesto por Objetivos y Tareas ($215,000 MXN)</h4>
            <ul style="margin:0; padding-left:1.2rem; font-size:0.85rem; color:var(--text-muted); line-height:1.7;">
                <li><strong>Estudio de capacidad y permisos ambientales:</strong> $35,000 MXN (16.3%)</li>
                <li><strong>Adecuación física de senderos y señalética ecológica:</strong> $65,000 MXN (30.2%)</li>
                <li><strong>Desarrollo del motor de reserva web y pagos en línea:</strong> $40,000 MXN (18.6%)</li>
                <li><strong>Campaña digital de prelanzamiento y relaciones públicas:</strong> $55,000 MXN (25.6%)</li>
                <li><strong>Fondo de Contingencia Gerencial (10% de salvaguarda):</strong> $20,000 MXN (9.3%)</li>
            </ul>
            <p style="margin:0.75rem 0 0; font-size:0.85rem; font-weight:700; color:#34d399;">
                Inversión Total Justificada: $215,000 MXN con retorno esperado de 3.2x sobre ingresos brutos de temporada.
            </p>
        `;
        logToConsole('[VISTA] Desglose presupuestal cargado. Fondo de contingencia del 10% asignado correctamente.', 'info');
    }
}

function simularAuditoriaU5() {
    const simBtn = document.getElementById('btnSimulate');
    const statusBadge = document.getElementById('workbenchStatusBadge');
    const statusText = document.getElementById('workbenchStatusText');
    const packetEl = document.getElementById('netPacketAnim');

    if (simBtn) simBtn.disabled = true;
    if (statusBadge) statusBadge.classList.add('transmitting');
    if (statusText) statusText.textContent = 'Ejecutando auditoría y cálculo de ruta crítica...';

    logToConsole('
>>> AUDITORÍA OPERATIVA Y CONTROL DE PROYECTO', 'header');

    setTimeout(() => {
        logToConsole('[FASE 1] Verificando holguras del método CPM (Pases hacia adelante y hacia atrás)...', 'info');
        if (packetEl) {
            packetEl.className = 'channel-packet active-right';
            packetEl.textContent = 'CPM';
        }
    }, 400);

    setTimeout(() => {
        logToConsole('[FASE 2] Evaluando variaciones de KPIs del tablero de mando frente a metas financieras...', 'warning');
        if (packetEl) {
            packetEl.className = 'channel-packet active-left';
            packetEl.textContent = 'KPI';
        }
    }, 1200);

    setTimeout(() => {
        logToConsole('[DICTAMEN CPM] Rama crítica A-C-E-F avanza dentro de los plazos sin desviaciones.', 'success');
        logToConsole('[GESTIÓN DE HOLGURAS] La rama B-D absorbió con éxito la demora bancaria sin mover la inauguración.', 'success');
        logToConsole('[ACCIÓN CORRECTIVA ACTIVADA] Campaña digital reestructurada: CAC desciende de $490 a $335 retornando a semáforo verde.', 'success');
        logToConsole('[REPORTE FINAL] Dictamen gerencial aprobado para presentación al Consejo Directivo.
', 'header');

        if (packetEl) {
            packetEl.className = 'channel-packet';
            packetEl.textContent = 'OK';
        }
        if (statusBadge) statusBadge.classList.remove('transmitting');
        if (statusText) statusText.textContent = 'Listo / Dictamen operativo generado';
        if (simBtn) simBtn.disabled = false;
    }, 2200);
}

function responderRetoU5(btn, id, esCorrecta, feedback) {
    const parent = btn.closest('.challenge-item');
    if (!parent) return;

    u5State[id] = esCorrecta;

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

    actualizarResumenU5();
}

function actualizarResumenU5() {
    let respondidos = 0;
    let correctos = 0;
    Object.keys(u5State).forEach(k => {
        if (u5State[k] !== null) {
            respondidos++;
            if (u5State[k] === true) correctos++;
        }
    });

    const elRetos = document.getElementById('u5RetosCompletados');
    if (elRetos) elRetos.textContent = `${respondidos} / 4`;

    const elPuntaje = document.getElementById('u5PuntajeFinal');
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

function clearConsoleU5() {
    const consoleBody = document.getElementById('netConsoleBody');
    if (consoleBody) {
        consoleBody.innerHTML = '<div><span class="log-info">[INIT]</span> Consola limpia. Selecciona un módulo gerencial y ejecuta la auditoría operativa.</div>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setU5Module('cpm');
});
