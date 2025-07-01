# GaitRehub Serial Simulator

In order to work in parallel on the adaptation of the control system of rehabilitation video games and the development of the wearable hardware system, we defined a serial communication protocol and developed a set of scripts that simulated the sensor output in the respective tasks.

## Communication protocol

Following the technical specification of the protocol for the serial communication:
- Port: **COM2** 
- Baudrate: **9600 bps**
- Frequency: **1 Hz** 

Further details concerning the message sent from the wearable system and the corrispondent positioning of the sensors are included in the file **Communication protocol.pdf**.

## Installation

To simulate the physical RS-232 port connection we used [**HHD Virtual Serial Port Tools**](https://freevirtualserialports.com/) (local bridge option).

The scripts were created in **Javascript** and require the installation of **node.js** to run. Download node.js from  [this link](https://nodejs.org/en/download).

Once node.js is installed in your computer, download this repository and open a command line terminal in the folder that contains the script.

Start the script with the following command
> node .\name_of_the_script.js

Example:
> node .\serial_simulator_alternate_step.js

## Scripts and tasks

The following table resumes the purpose of each script

|Script | Task | Game |
|----------------|-------------------------------|-------------------------------|
|serial_sender.js|'Hello World'|   |
|serial_simulator_alternate_step.js|Alternate step |Crystal Ball|
|serial_simulator_alternate_step_heels.js|Alternate step on heels|Crystal Ball
|serial_simulator_alternate_step_toes.js|Alternate step on toes| Crystal Ball
|serial_simulator_horizontal_shift.js|Balance and Weight shifting|CatchEveryFruit
|serial_simulator_horizontal_sit_to_stand.js|Sit to stand|Uccellino Flappino
