"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const nameToGreet = core.getInput('who-to-greet');
            if (nameToGreet == 'Octocat') {
                // the Octocat doesn't want to be greeted here!
                throw new Error("No Octocat greetings, please.");
            }
            else {
                console.log(`Hello ${nameToGreet}!`);
                const time = (new Date()).toTimeString();
                core.setOutput("time", time);
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
