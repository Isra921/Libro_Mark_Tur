// ==========================================================================
// SIMULADOR UNIDAD 5 · RUTA CRÍTICA (CPM) Y CONTROL GERENCIAL
// Campaña Ecoturística (Recorridos de Naturaleza) · EST - IPN
// Basado fielmente en el documento oficial de la Unidad 5
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
            <h4 style="margin:0 0 0.75rem; font-size:0.95rem; color:#34d399;"><i class="fas fa-diagram-project"></i> Tabla 2. Red de actividades hipotética (Método CPM)</h4>
            <div style="overflow-x:auto;">
                <table style="width:100%; font-size:0.85rem; border-collapse:collapse; color:#fff;">
                    <thead>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.2); text-align:left;">
                            <th style="padding:0.4rem;">Clave</th>
                            <th style="padding:0.4rem;">Actividad</th>
                            <th style="padding:0.4rem;">Días</th>
                            <th style="padding:0.4rem;">Predecesora</th>
                            <th style="padding:0.4rem;">Holgura total</th>
                            <th style="padding:0.4rem;">Estado CPM</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06); background:rgba(239, 68, 68, 0.1);">
                            <td style="padding:0.4rem; font-weight:700; color:#f87171;">A</td>
                            <td>Estudio breve de visitantes</td>
                            <td>3 días</td>
                            <td>—</td>
                            <td style="color:#f87171; font-weight:700;">0 días</td>
                            <td><span style="color:#f87171; font-size:0.75rem; font-weight:700;">CRÍTICA</span></td>
                        </tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06); background:rgba(239, 68, 68, 0.1);">
                            <td style="padding:0.4rem; font-weight:700; color:#f87171;">B</td>
                            <td>Propuesta de valor y oferta</td>
                            <td>2 días</td>
                            <td>A</td>
                            <td style="color:#f87171; font-weight:700;">0 días</td>
                            <td><span style="color:#f87171; font-size:0.75rem; font-weight:700;">CRÍTICA</span></td>
                        </tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06); background:rgba(239, 68, 68, 0.1);">
                            <td style="padding:0.4rem; font-weight:700; color:#f87171;">C</td>
                            <td>Fotografía y página de reservas</td>
                            <td>4 días</td>
                            <td>B</td>
                            <td style="color:#f87171; font-weight:700;">0 días</td>
                            <td><span style="color:#f87171; font-size:0.75rem; font-weight:700;">CRÍTICA</span></td>
                        </tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                            <td style="padding:0.4rem; font-weight:700;">D</td>
                            <td>Acuerdos con prestadores</td>
                            <td>3 días</td>
                            <td>B</td>
                            <td style="color:#34d399; font-weight:700;">1 día</td>
                            <td><span style="color:#34d399; font-size:0.75rem;">Con holgura (13 días)</span></td>
                        </tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06); background:rgba(239, 68, 68, 0.1);">
                            <td style="padding:0.4rem; font-weight:700; color:#f87171;">E</td>
                            <td>Validación y lanzamiento</td>
                            <td>2 días</td>
                            <td>C y D</td>
                            <td style="color:#f87171; font-weight:700;">0 días</td>
                            <td><span style="color:#f87171; font-size:0.75rem; font-weight:700;">CRÍTICA</span></td>
                        </tr>
                        <tr style="background:rgba(239, 68, 68, 0.1);">
                            <td style="padding:0.4rem; font-weight:700; color:#f87171;">F</td>
                            <td>Monitoreo inicial de campaña</td>
                            <td>3 días</td>
                            <td>E</td>
                            <td style="color:#f87171; font-weight:700;">0 días</td>
                            <td><span style="color:#f87171; font-size:0.75rem; font-weight:700;">CRÍTICA</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p style="margin:0.75rem 0 0; font-size:0.8rem; color:#94a3b8;">
                <i class="fas fa-info-circle"></i> <strong>Ruta Crítica Oficial:</strong> A → B → C → E → F = 3 + 2 + 4 + 2 + 3 = <strong>14 días laborales</strong>. La alternativa A–B–D–E–F suma 13 días (la tarea D cuenta con 1 día de holgura total).
            </p>
        `;
    } else if (mod === 'kpi') {
        btnKpi?.classList.add('active');
        panel.innerHTML = `
            <h4 style="margin:0 0 0.75rem; font-size:0.95rem; color:#38bdf8;"><i class="fas fa-chart-line"></i> Tabla 3. Resultados ficticios al cierre de la campaña</h4>
            <div style="overflow-x:auto;">
                <table style="width:100%; font-size:0.85rem; border-collapse:collapse; color:#fff;">
                    <thead>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.2); text-align:left;">
                            <th style="padding:0.4rem;">Indicador</th>
                            <th style="padding:0.4rem;">Meta hipotética</th>
                            <th style="padding:0.4rem;">Resultado</th>
                            <th style="padding:0.4rem;">Semáforo</th>
                            <th style="padding:0.4rem;">Interpretación oficial</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                            <td style="padding:0.4rem; font-weight:700;">Reservas totales</td>
                            <td>80</td>
                            <td style="font-weight:700; color:#fbbf24;">68</td>
                            <td><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#fbbf24;"></span></td>
                            <td>Se alcanzó 85% de la meta</td>
                        </tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                            <td style="padding:0.4rem; font-weight:700;">Tasa de reserva web</td>
                            <td>4.0%</td>
                            <td style="font-weight:700; color:#fbbf24;">3.2%</td>
                            <td><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#fbbf24;"></span></td>
                            <td>Revisar página y oferta (64 web + 4 teléfono sobre 2,000 sesiones)</td>
                        </tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                            <td style="padding:0.4rem; font-weight:700;">Costo por reserva</td>
                            <td>$470 máximo</td>
                            <td style="font-weight:700; color:#f87171;">$550</td>
                            <td><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#f87171;"></span></td>
                            <td>Supera el límite previsto ($37,400 ÷ 68 = $550 MXN)</td>
                        </tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                            <td style="padding:0.4rem; font-weight:700;">Satisfacción del visitante</td>
                            <td>≥ 4.5/5</td>
                            <td style="font-weight:700; color:#34d399;">4.6/5</td>
                            <td><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#34d399;"></span></td>
                            <td>Experiencia favorable (supera la meta)</td>
                        </tr>
                        <tr>
                            <td style="padding:0.4rem; font-weight:700;">Presupuesto utilizado</td>
                            <td>≤ $37,400</td>
                            <td style="font-weight:700; color:#34d399;">$37,400</td>
                            <td><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#34d399;"></span></td>
                            <td>Gasto dentro del límite aprobado</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    } else if (mod === 'presupuesto') {
        btnPres?.classList.add('active');
        panel.innerHTML = `
            <h4 style="margin:0 0 0.75rem; font-size:0.95rem; color:#fbbf24;"><i class="fas fa-coins"></i> Tabla 1. Presupuesto de marketing hipotético</h4>
            <div style="overflow-x:auto;">
                <table style="width:100%; font-size:0.85rem; border-collapse:collapse; color:#fff;">
                    <thead>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.2); text-align:left;">
                            <th style="padding:0.4rem;">Concepto</th>
                            <th style="padding:0.4rem;">Finalidad</th>
                            <th style="padding:0.4rem; text-align:right;">Importe (MXN)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);"><td>Investigación de mercado</td><td>Definir público y mensajes</td><td style="text-align:right;">$3,000</td></tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);"><td>Fotografía y diseño</td><td>Crear materiales promocionales</td><td style="text-align:right;">$6,000</td></tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);"><td>Página de reservas</td><td>Captar solicitudes y pagos</td><td style="text-align:right;">$4,000</td></tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);"><td>Publicidad en redes</td><td>Promoción segmentada</td><td style="text-align:right;">$12,000</td></tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);"><td>Alianzas y colaboraciones</td><td>Difusión con actores locales</td><td style="text-align:right;">$5,000</td></tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);"><td>Correo y seguimiento</td><td>Atención y recordatorios</td><td style="text-align:right;">$2,000</td></tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.06);"><td>Medición e informes</td><td>Evaluar resultados</td><td style="text-align:right;">$2,000</td></tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.1); font-weight:700;"><td>Subtotal</td><td>Suma de actividades</td><td style="text-align:right;">$34,000</td></tr>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.1); color:#fbbf24;"><td>Contingencia (10%)</td><td>Reserva para ajustes</td><td style="text-align:right;">$3,400</td></tr>
                        <tr style="font-weight:800; color:#34d399; font-size:0.95rem;"><td>TOTAL</td><td>Presupuesto autorizado</td><td style="text-align:right;">$37,400</td></tr>
                    </tbody>
                </table>
            </div>
            <p style="margin:0.75rem 0 0; font-size:0.8rem; color:#94a3b8;">
                <i class="fas fa-calculator"></i> <strong>Comprobación Financiera:</strong> 80 reservas a $1,250 = $100,000 MXN. Costo variable unitario = $650 MXN → Margen de contribución unitario = $600 MXN. Se requieren al menos 63 reservas (37,400 ÷ 600) para costear el presupuesto publicitario.
            </p>
        `;
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

    logToConsole('>>> AUDITORÍA OPERATIVA Y CONTROL DE PROYECTO (UNIDAD 5)', 'header');

    setTimeout(() => {
        logToConsole('[FASE 1] Verificando holguras del método CPM (Pases hacia adelante y hacia atrás)...', 'info');
        if (packetEl) {
            packetEl.className = 'channel-packet active-right';
            packetEl.textContent = 'CPM';
        }
    }, 400);

    setTimeout(() => {
        logToConsole('[FASE 2] Contrastando KPIs del tablero semanal frente a metas autorizadas...', 'warning');
        if (packetEl) {
            packetEl.className = 'channel-packet active-left';
            packetEl.textContent = 'KPI';
        }
    }, 1100);

    setTimeout(() => {
        logToConsole('[DICTAMEN CPM] Ruta crítica A–B–C–E–F = 14 días laborales sin retrasos.', 'success');
        logToConsole('[HOLGURA EVALUADA] Actividad D cuenta con 1 día de holgura total respecto a la red.', 'info');
        logToConsole('[DESVIACIÓN DETECTADA] Cumplimiento de reservas: 85% (68 de 80) elevó el costo por reserva a $550 MXN (meta: $470).', 'warning');
        logToConsole('[CALIDAD PROBADA] Satisfacción del visitante: 4.6/5 puntos (meta: ≥ 4.5). Experiencia favorable.', 'success');
        logToConsole('[RECOMENDACIÓN EJECUTIVA] Mantener atributos de satisfacción del recorrido y revisar usabilidad y proceso digital de reservas antes de incrementar publicidad.', 'header');

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
