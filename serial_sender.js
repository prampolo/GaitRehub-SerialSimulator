
const { SerialPort } = require('serialport');

// ⚠️ Sostituisci con il nome della tua porta, es. COM3 su Windows o /dev/ttyUSB0 su Linux
const portName = 'COM2';
const baudRate = 9600;

const port = new SerialPort({
  path: portName,
  baudRate: baudRate,
}, (err) => {
  if (err) {
    return console.log('Errore apertura porta:', err.message);
  }
  console.log('Porta seriale aperta:', portName);
});

// Invia un messaggio ogni secondo
const sendInterval = setInterval(() => {
  if (port.writable) {
    const message = 'Hello Unity\n';
    port.write(message, (err) => {
      if (err) {
        return console.log('Errore durante invio:', err.message);
      }
      console.log('Messaggio inviato:', message.trim());
    });
  }
}, 1000);

// Chiude la porta quando si preme Ctrl+C
process.on('SIGINT', () => {
  clearInterval(sendInterval);
  port.close(() => {
    console.log('Porta seriale chiusa');
    process.exit();
  });
});
