/********************************************************************************
 *   Ledger Node JS Tests
 *   (c) 2018 ZondaX GmbH
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ********************************************************************************/
let assert = require('assert');
let expect = require('chai').expect;
let Q = require('q');

const TIMEOUT = 10000;

browser = true;
comm = ledger.comm_u2f;

function runExample() {
    let start = new Date().getTime();
    console.log("Start");
    return comm.create_async(TIMEOUT, true).then(
        function (comm) {
            try {
                let dev = new ledger.App(comm);

                let path = [44, 118, 0, 0, 0];           // Derivation path. First 3 items are automatically hardened!
                let message = `{"account_number":"2","chain_id":"local-testnet","fee":{"amount":[],"gas":"500000"},"memo":"","msgs":[{"description":"test","initial_deposit":[{"amount":"1","denom":"stake"}],"proposal_type":"Text","proposer":"cosmos13xzqf9re68eeqfjaxhqh6g5rqfvhzpfkm8tuhh","title":"test"}],"sequence":"0"}`;

                return dev.sign(path, message).then(function (result) {
                    console.log(new Date().getTime() - start);
                    console.log(result);
                })
            }
            catch (e) {
                console.log(e);
                console.log(new Date().getTime() - start);
            }
        });
}

module.exports = runExample;
