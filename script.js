/* =====================================================
   PEQUEÑOS CORAZONES · Tigalma
   Lógica principal de la aplicación
   ===================================================== */


/* ─────────────────────────────────────────────────────
   DATOS DE CADA EMOCIÓN
   Aquí puedes editar textos, imágenes y enlaces.
   ───────────────────────────────────────────────────── */

const EMOCIONES = [
    {
        id: 'alegre',
        nombre: 'Alegre',
        frase: 'Hoy el mundo brilla',
        emoji: '😊',
        imagen: 'assets/img/emociones/alegria.jpeg',
        colorTarjeta: '#FFF5D7',
        colorPagina: '#FFFBEE',

        mensaje: 'Tu corazón brilla hoy.',
        cuento: 'El día que la alegría llenó la casa',
        actividad: 'Dibuja tres cosas que te han hecho sonreír.',
        pregunta: '¿Con quién quieres compartir tu alegría?',
        consejo: 'La alegría también se acompaña. Celebrad juntos ese momento.',

        youtube: 'AQUI-VA-EL-ENLACE-CUENTO-YOUTUBE-ALEGRIA',
        actividadUrl: '#actividades'
    },
    {
        id: 'triste',
        nombre: 'Triste',
        frase: 'Aquí estoy contigo',
        emoji: '😢',
        imagen: 'assets/img/emociones/triste.jpeg',
        colorTarjeta: '#E8F4FA',
        colorPagina: '#EFF6FB',

        mensaje: 'Tu corazón necesita un abrazo.',
        cuento: 'La nube que aprendió a llorar',
        actividad: 'Dibuja una nube y colorea dentro lo que sientes.',
        pregunta: '¿Qué te ayudaría a sentirte un poquito mejor?',
        consejo: 'No intentes quitar la tristeza rápido. Primero acompaña.',

        youtube: 'AQUI-VA-EL-ENLACE-CUENTO-YOUTUBE-TRISTEZA',
        actividadUrl: '#actividades'
    },
    {
        id: 'enfado',
        nombre: 'Con enfado',
        frase: 'Tu emoción importa',
        emoji: '😡',
        imagen: 'assets/img/emociones/enfado.jpeg',
        colorTarjeta: '#FDEEE6',
        colorPagina: '#FFF3EE',

        mensaje: 'Tu corazón está muy fuerte ahora.',
        cuento: 'El volcán que aprendió a respirar',
        actividad: 'Haz tres respiraciones de dragón.',
        pregunta: '¿Qué te ha molestado?',
        consejo: 'Pon límite con calma, pero reconoce primero la emoción.',

        youtube: 'AQUI-VA-EL-ENLACE-CUENTO-YOUTUBE-ENFADO',
        actividadUrl: '#actividades'
    },
    {
        id: 'miedo',
        nombre: 'Con miedo',
        frase: 'Estás a salvo',
        emoji: '😨',
        imagen: 'assets/img/emociones/miedo.jpeg',
        colorTarjeta: '#F0EAFE',
        colorPagina: '#F5F0FE',

        mensaje: 'Tu corazón busca seguridad.',
        cuento: 'La pequeña luz en la habitación',
        actividad: 'Dibuja una luz mágica que te acompaña.',
        pregunta: '¿Qué necesitarías para sentirte más seguro?',
        consejo: 'El miedo no se ridiculiza. Se acompaña con ternura.',

        youtube: 'AQUI-VA-EL-ENLACE-CUENTO-YOUTUBE-MIEDO',
        actividadUrl: '#actividades'
    },
    {
        id: 'sueno',
        nombre: 'Con sueño',
        frase: 'Descansa un poquito',
        emoji: '😴',
        imagen: 'assets/img/emociones/cansado.jpeg',
        colorTarjeta: '#E5F7EE',
        colorPagina: '#EEF9F4',

        mensaje: 'Tu corazón pide descanso.',
        cuento: 'El osito que bajó el ritmo',
        actividad: 'Respira como una ola en un rincón tranquilo.',
        pregunta: '¿Qué parte de tu cuerpo necesita descansar?',
        consejo: 'A veces detrás de una rabieta solo hay cansancio.',

        youtube: 'AQUI-VA-EL-ENLACE-CUENTO-YOUTUBE-CANSANCIO',
        actividadUrl: '#actividades'
    },
    {
        id: 'carino',
        nombre: 'Necesito cariño',
        frase: 'Hay abrazos esperando',
        emoji: '🤗',
        imagen: 'assets/img/emociones/necesito-carino.jpeg',
        colorTarjeta: '#FDEEF3',
        colorPagina: '#FEF0F4',

        mensaje: 'Tu corazón quiere sentirse cerca.',
        cuento: 'El abrazo invisible',
        actividad: 'Inventad un abrazo especial de familia.',
        pregunta: '¿Cómo te gusta que te cuiden?',
        consejo: 'La conexión emocional suele venir antes que la corrección.',

        youtube: 'AQUI-VA-EL-ENLACE-CUENTO-YOUTUBE-CARINO',
        actividadUrl: '#actividades'
    }
];


/* ─────────────────────────────────────────────────────
   CREAR LAS TARJETAS EN EL HTML
   ───────────────────────────────────────────────────── */

const grid = document.getElementById('tarjetasGrid');

EMOCIONES.forEach(function(em) {

    const tarjeta = document.createElement('button');

    tarjeta.className = 'tarjeta';
    tarjeta.setAttribute('aria-label', 'Me siento ' + em.nombre);

    tarjeta.innerHTML =
        '<div class="tarjeta-img-wrap">' +
            '<img' +
                ' class="tarjeta-img"' +
                ' src="' + encodeURI(em.imagen) + '"' +
                ' alt="Ilustración: ' + em.nombre + '"' +
                ' loading="lazy"' +
            '>' +
        '</div>' +
        '<div class="tarjeta-pie" style="background:' + em.colorTarjeta + '">' +
            '<span class="tarjeta-emoji">' + em.emoji + '</span>' +
            '<span class="tarjeta-nombre">' + em.nombre + '</span>' +
            '<span class="tarjeta-frase">' + em.frase + '</span>' +
        '</div>';

    tarjeta.addEventListener('click', function() {
        abrirDetalle(em);
    });

    grid.appendChild(tarjeta);
});


/* ─────────────────────────────────────────────────────
   ELEMENTOS DEL PANEL DE DETALLE
   ───────────────────────────────────────────────────── */

const panelDetalle = document.getElementById('detalle');
const btnVolver = document.getElementById('btnVolver');

const detalleImg = document.getElementById('detalleImg');
const detalleNombre = document.getElementById('detalleNombre');
const detalleMensaje = document.getElementById('detalleMensaje');

const bloqueCuento = document.getElementById('bloqueCuento');
const bloqueActividad = document.getElementById('bloqueActividad');
const bloquePregunta = document.getElementById('bloquePregunta');
const bloqueConsejo = document.getElementById('bloqueConsejo');

const btnCuento = document.getElementById('btnCuento');
const btnActividad = document.getElementById('btnActividad');


/* ─────────────────────────────────────────────────────
   ABRIR EL PANEL DE DETALLE
   ───────────────────────────────────────────────────── */

function abrirDetalle(em) {

    detalleImg.src = encodeURI(em.imagen);
    detalleImg.alt = 'Ilustración: ' + em.nombre;

    detalleNombre.textContent = em.nombre;
    detalleMensaje.textContent = em.mensaje;

    bloqueCuento.textContent = em.cuento;
    bloqueActividad.textContent = em.actividad;
    bloquePregunta.textContent = em.pregunta;
    bloqueConsejo.textContent = em.consejo;

    btnCuento.href = em.youtube || '#cuentos';
    btnActividad.href = em.actividadUrl || '#actividades';

    document.body.style.backgroundColor = em.colorPagina;
    panelDetalle.style.backgroundColor = em.colorPagina;

    panelDetalle.hidden = false;

    requestAnimationFrame(function() {
        panelDetalle.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}


/* ─────────────────────────────────────────────────────
   CERRAR EL PANEL DE DETALLE
   ───────────────────────────────────────────────────── */

function cerrarDetalle() {

    panelDetalle.hidden = true;

    document.body.style.backgroundColor = '';

    requestAnimationFrame(function() {
        document.getElementById('tarjetasSeccion').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

btnVolver.addEventListener('click', cerrarDetalle);