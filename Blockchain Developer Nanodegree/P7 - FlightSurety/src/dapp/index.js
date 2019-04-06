
import DOM from './dom';
import Contract from './contract';
import './flightsurety.css';


(async() => {

    let result = null;

    let contract = new Contract('localhost', () => {

        // Read transaction
        contract.isOperational((error, result) => {
            console.log(error, result);
            let selectFlight = DOM.elid('selectFlight');
            contract.flights.forEach(flight => {
                addFlightOption(flight, selectFlight);
            });
            display('Operational Status', 'Check if contract is operational', [ { label: 'Operational Status', error: error, value: result} ]);
        });

        contract.flightSuretyData.events.airlineFunded({
            fromBlock: "latest"
        }, function (error, result) {
            if (error) {
                console.log(error)
            } else {
                display('Airline Funded', 'Airline funded by the Airline', [ { label: 'Airline Funded', error: error, value: `Airline ${result.returnValues.airlineAddress} got funded`} ]);
                // alert();
            }
        });

        contract.flightSuretyData.events.insuranceClaimed({
            fromBlock: "latest"
        }, function (error, result) {
            if (error) {
                console.log(error)
            } else {
                display('Claim Insurance', 'Insurance claimed by passenger', [ { label: 'Insurance Claimed', error: error, value: `Insurance claimed by ${result.returnValues.passenger}. An amount of ${result.returnValues.amountCreditedToPassenger} WEI has been added to his wallet for ${result.returnValues.flight} at ${new Date(result.returnValues.timestamp * 1000)}`} ]);
            }
        });

        contract.flightSuretyData.events.amountWithdrawn({
            fromBlock: "latest"
        }, function (error, result) {
            if (error) {
                console.log(error)
            } else {
                display('Withdraw Amount', 'Withdraw amount to wallet', [ { label: 'Amount withdrawn', error: error, value: `Amount ${result.returnValues.amount} withdrawn to ${result.returnValues.senderAddress} at ${new Date()}`} ]);
            }
        });

        // User-submitted transaction
        DOM.elid('submit-oracle').addEventListener('click', () => {
            let flight = DOM.elid('flight-number').value;
            DOM.elid('flight-number').value = "";
            // Write transaction
            contract.fetchFlightStatus(flight, (error, result) => {
                let selectFlight = DOM.elid('selectFlight');
                addFlightOption(result, selectFlight);
                display('Oracles', 'Trigger oracles', [ { label: 'Fetch Flight Status', error: error, value: `Flight ${result.flight} scheduled at ${new Date(result.timestamp * 1000)}`} ]);
            });
        });

        DOM.elid('buyInsurance').addEventListener('click', () => {
            let selectedFlightElement = document.getElementById("selectFlight");
            let selectedFlightValue = selectedFlightElement.options[selectedFlightElement.selectedIndex].value;
            let insuranceAmount = DOM.elid('insuranceAmount').value;
            if(selectedFlightValue === "Select") {
                alert("Please select the flight and departure time");
            } else {
                DOM.elid('insuranceAmount').value = "";
                selectedFlightValue = JSON.parse(selectedFlightValue);
                contract.buyInsurance(selectedFlightValue, insuranceAmount, (error, result) => {
                    if(error) {
                        alert(error);
                    }
                    display('Buy Insurance', 'Insurance purchased by the passenger', [ { label: 'Insurance Purchased', error: error, value: `Insurance purchased by ${result.passenger} at ${result.insuranceAmount} ETH for flight ${result.flight} of airline ${result.airline} scheduled at ${new Date(result.timestamp * 1000)}`} ]);
                });
            }
        });

        DOM.elid('withdrawFund').addEventListener('click', () => {
            let walletAddress = DOM.elid('withdrawalAddress').value;
            // Write transaction
            contract.withdrawAmount(walletAddress, (error, result) => {
                if(error) {
                    alert(error);
                }
            });
        });

    });


})();

function addFlightOption(flight, selectComponent) {
    let option = document.createElement("option");
    option.text =  `Flight ${flight.flight} scheduled at ${new Date(flight.timestamp)}`;
    option.value = JSON.stringify(flight);
    selectComponent.add(option);
}

function display(title, description, results) {
    let displayDiv = DOM.elid("display-wrapper");
    let section = DOM.section();
    section.appendChild(DOM.h2(title));
    section.appendChild(DOM.h5(description));
    results.map((result) => {
        let row = section.appendChild(DOM.div({className:'row'}));
        row.appendChild(DOM.div({className: 'col-sm-4 field'}, result.label));
        row.appendChild(DOM.div({className: 'col-sm-8 field-value'}, result.error ? String(result.error) : String(result.value)));
        section.appendChild(row);
    })
    displayDiv.append(section);

}







