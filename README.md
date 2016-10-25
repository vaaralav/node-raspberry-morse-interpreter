# node-raspberry-morse-interpreter

A simple project to transform text into morse code with LED/buzzer.

## Installation

Start by cloning the repo.

```
git clone https://github.com/vaarala/node-raspberry-morse-interpreter
cd node-raspberry-morse-interpreter
```

### Raspberry Pi Backend

To install and run the Raspberry Pi back end run the following.

```
cd raspi-server
npm install
npm start
```

The backend should now be running on port 3000.

### Client

```
cd ui
npm install
npm start-dev # To start development server
npm start # To start production server
```
