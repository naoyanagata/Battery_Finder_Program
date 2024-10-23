// ここから書いてください。
const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

let selectBrand = document.getElementById("select-brand");
let selectModel = document.getElementById("select-model");
let input = document.querySelector("input");
let result = document.querySelector(".result");
let hashmap = {};

selectBrand.addEventListener('change', (e) => {
  selectModel.innerHTML = "";
  for(let cameraInfo of camera) {
    if(cameraInfo["brand"] === e.target.value) {
      let modelOption = document.createElement("option");
      modelOption.setAttribute("value", cameraInfo["model"]);
      modelOption.innerHTML = cameraInfo["model"];
      selectModel.appendChild(modelOption);
    }
  }
  batteryCalc();
});

selectModel.addEventListener('change', () => {
  batteryCalc();
});

input.addEventListener('input', () => {
  batteryCalc();
});

function createSelectOption() {
  for(let cameraInfo of camera) {
    if(hashmap[cameraInfo["brand"]] === undefined) {
      let brandOption = document.createElement("option");
      brandOption.setAttribute("value", cameraInfo["brand"]);
      brandOption.innerHTML = cameraInfo["brand"];
      selectBrand.appendChild(brandOption);
      hashmap[cameraInfo["brand"]] = "hoge";
    }
    if(cameraInfo["brand"] === "Cakon") {
      let modelOption = document.createElement("option");
      modelOption.setAttribute("value", cameraInfo["model"]);
      modelOption.innerHTML = cameraInfo["model"];
      selectModel.appendChild(modelOption);
    }
  }
}

function getOtherDevicePowerConsumption() {
  if(input.value === "") return 0;
  return parseInt(input.value);
}

function getPowerConsumption() {
  let powerConsumption = 0;
  let cameraModel = selectModel.value;
  for(let cameraInfo of camera) {
    if(cameraInfo["model"] === cameraModel) {
      powerConsumption = cameraInfo["powerConsumptionWh"];
    }
  }
  return powerConsumption;
}

function getMaxDischargePowerAtTerminationVoltage(batteryInfo) {
  return batteryInfo["endVoltage"] * batteryInfo["maxDraw"]
}

function getPowerCapacity(batteryInfo) {
  return batteryInfo["voltage"] * batteryInfo["capacityAh"];
}

function getAvailableTime(powerCapacity, powerConsumption) {
  return Number.parseFloat(powerCapacity / powerConsumption).toFixed(1);
}

function displayAvailableBattery(batteryInfo, totalPowerConsumption) {
  let batteryContainer = document.createElement("div");
  let batteryNameP = document.createElement("p");
  let availableTimeP = document.createElement("p");
  
  batteryContainer.classList.add("batteryContainer");
  batteryNameP.innerHTML = batteryInfo["batteryName"];
  availableTimeP.innerHTML = `約${getAvailableTime(getPowerCapacity(batteryInfo), totalPowerConsumption)}時間使用できます`;

  batteryContainer.append(batteryNameP, availableTimeP);
  result.appendChild(batteryContainer);
}

function batteryCalc() {
  let totalPowerConsumption = getPowerConsumption() + getOtherDevicePowerConsumption();
  result.innerHTML = "";
  for(let batteryInfo of battery) {
    if(getMaxDischargePowerAtTerminationVoltage(batteryInfo) > totalPowerConsumption) {
      displayAvailableBattery(batteryInfo, totalPowerConsumption);
    }
  }
}

function createAvailableBatteryInfo() {
  let totalPowerConsumption = camera[0]["powerConsumptionWh"];
  for(let batteryInfo of battery) {
    if(getMaxDischargePowerAtTerminationVoltage(batteryInfo) > totalPowerConsumption) {
      displayAvailableBattery(batteryInfo, totalPowerConsumption);
    }
  }
}

createSelectOption();
createAvailableBatteryInfo();
