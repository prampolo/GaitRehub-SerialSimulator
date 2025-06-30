const { SerialPort } = require('serialport');

const portName = 'COM2';
const baudRate = 9600;
const freq = 0.2; // 0.2 Hz
const K = 11000; // puoi modificare questo valore per variare l'ampiezza
const intervalMs = 1000; // invio ogni 1 secondo

const distribution = [0.1, 0.2, 0.3, 0.4, 0.1, 0.2, 0.3, 0.4].map(w => 0.25 * w * K);

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
let t = 0;

const sendInterval = setInterval(() => {
    if (port.writable) {
        const shift = Math.sin(2 * Math.PI * freq * t);
        const dx = 0.5 * (1 + shift);
        const sx = 0.5 * (1 - shift);

        const sensorsSX = distribution.slice(0, 4).map(d => Math.round(sx * d));
        const sensorsDX = distribution.slice(4).map(d => Math.round(dx * d));

        const message = `${timestamp};${sensorsSX.join(',')};${sensorsDX.join(',')}\n`;

        port.write(message, (err) => {
            if (err) {
                return console.log('Errore durante invio:', err.message);
            }
            console.log('Messaggio inviato:', message.trim());
        });

        timestamp++;
        t += intervalMs / 1000;
    }
}, intervalMs);

process.on('SIGINT', () => {
    clearInterval(sendInterval);
    port.close(() => {
        console.log('Porta seriale chiusa');
        process.exit();
    });
});
