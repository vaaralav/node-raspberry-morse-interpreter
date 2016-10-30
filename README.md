# node-raspberry-morse-interpreter

A simple project to transform text into morse code with LED/buzzer.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [YARN](https://yarnpkg.com/) (optional)

Start by cloning the repo.

```bash
git clone https://github.com/vaarala/node-raspberry-morse-interpreter
cd node-raspberry-morse-interpreter
```

### Raspberry Pi Backend

To install and run the Raspberry Pi back end run the following on your Raspberry Pi.

```bash
cd raspi-server
npm install # This one migth take some time
sudo env "PATH=$PATH" bash # GPIO usage requires sudo
npm start
```

The backend should now be running on port 3000.

### Morse Service

This one can be run on any machine. You'll need `npm`
(, `yarn`) and `node`.

```bash
cd morse-server
yarn # or npm install
cp config.json.example config.json # + make your configurations
npm start-dev # To start development server
npm start # To start production server
```
