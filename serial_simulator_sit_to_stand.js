const { SerialPort } = require('serialport');

const portName = 'COM2';
const baudRate = 9600;
const intervalMs = 1000; // invio ogni 1 secondo
const periodSec = 8;      // ciclo completo: 4s a 300 + 4s a 800

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

    // Calcola il valore corrente basato su blocchi di 4 secondi
    const phase = Math.floor((elapsedSec % periodSec) / 4);
    const sensorValue = (phase === 0) ? 300 : 800;

    // Crea array di 8 sensori tutti con lo stesso valore
    const sensors = Array(8).fill(sensorValue);

    // Componi e invia il messaggio
    const message = `${timestamp};${sensors.join(',')}\n`;
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
