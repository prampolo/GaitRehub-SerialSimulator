const { SerialPort } = require('serialport');

const portName = 'COM2';
const baudRate = 9600;
const intervalMs = 1000; // invio ogni 1 secondo
const periodSec = 4;      // ciclo completo: 2s dx + 2s sx

const port = new SerialPort({
    path: portName,
    baudRate: baudRate,
}, (err) => {
    if (err) {
        return console.log('Errore apertura porta:', err.message);
    }
    console.log('Porta seriale aperta:', portName);
});

let timestamp = 0;
let elapsedSec = 0;

const sendInterval = setInterval(() => {
    if (!port.writable) return;

    // Calcola la fase: 0 = destro carico, 1 = sinistro carico
    const phase = Math.floor((elapsedSec % periodSec) / 2);

    let rightFoot, leftFoot;

    if (phase === 0) {
        // Piede destro carico
        rightFoot = Array(4).fill(800);
        leftFoot = Array(4).fill(300);
    } else {
        // Piede sinistro carico
        rightFoot = Array(4).fill(300);
        leftFoot = Array(4).fill(800);
    }

    const sensors = [...rightFoot, ...leftFoot];
    const message = `${timestamp};${rightFoot};${leftFoot}\n`;

    port.write(message, (err) => {
        if (err) {
            return console.log('Errore durante invio:', err.message);
        }
        console.log('Messaggio inviato:', message.trim());
    });

    timestamp++;
    elapsedSec += intervalMs / 1000;
}, intervalMs);

process.on('SIGINT', () => {
    clearInterval(sendInterval);
    port.close(() => {
        console.log('Porta seriale chiusa');
        process.exit();
    });
});
