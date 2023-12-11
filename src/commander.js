import { program } from "commander";

program
.option("-m, --mode <mode>", "ambiente a ejecutar", "dev")
.option("-p, --port <port>", "puerto a utilizar", 8080)
.option("-d, --debug", "vaiable para activar modo debug", false)
.parse();

console.log("options", program.opts());

export default program;