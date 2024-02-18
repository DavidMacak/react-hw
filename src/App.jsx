import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from "react";

// komponenty
import Button from "./components/Button";
import TextBox from "./components/TextBox";
import TextArea from "./components/TextArea";
import NumImp from "./components/NumImp";
import RbGroup from "./components/RbGroup";
import ChbGroup from "./components/ChbGroup";
import SelectBox from "./components/Select";
import Range from "./components/Range";
import Clock from "./components/Clock";
import ProgressBar from "./components/ProgressBar";
import File from "./components/File";
// funkce
//import validatePositiveInt from "./functions/validatePositiveInt";
import validateFloat from "./functions/validateFloat";
import saveText from "./functions/saveText";

function App() {
  // ==================================== CONSTANTS ====================================

  // ------------ SUM ------------

  const [firstNum, setFirstNum] = useState("");
  const [secondNum, setSecondNum] = useState("");
  const [sum, setSum] = useState(
    "Zadejte validní sčítance a zmáčkněte tlačítko pro výpočet."
  );

  // ------------ ICE CREAM ------------
  const iceCreamFlavors = [
    { label: "Vanilková", value: "Vanilková" },
    { label: "Kaktusová", value: "Kaktusová" },
    { label: "Míchaná", value: "Míchaná" },
  ];
  const [selFlavor, setSelFlavor] = useState("Vanilková");
  const iceCreamExtras = [
    { label: "kousky oříšků", value: "s kousky oříšků " },
    { label: "čoko hoblinky", value: "s čokoládovými hoblinkami " },
    { label: "karamelové křupínky", value: "s karamelovými křupínky " },
  ];
  const [selExtras, setSelExtras] = useState("");
  const [scoops, setScoops] = useState(1);
  const [scoopsWord, setScoopsWord] = useState("kopeček");
  const iceCreamTypes = ["smetanová", "jogurtová", "nízkotučná"];
  const [selType, setSelType] = useState("smetanová");

  // ------------ DISK SPACE ------------
  const [diskSpace, setDiskSpace] = useState(25);

  // ------------ PROGRESSBAR ------------
  const [initialCountdown, setInitialCountdown] = useState(10);
  const [countdown, setCountdown] = useState(initialCountdown);
  const progress =
    countdown > 0
      ? ((initialCountdown - countdown) / initialCountdown) * 100
      : 100;

  // ------------ TEXT AREA ------------
  const [text, setText] = useState("");

  // ==================================== LOGIC ====================================

  // Pozor na strict mode v index.jsx. Nesmi tam byt, jinak dialog bude vyskakovat 2x a zabijes minimalne hodinu casu hledanim chyby....
  useEffect(() => {
    let temp = prompt("Zadej první číslo ke sčítaní:", 5);
    while (!validateFloat(temp)) {
      temp = prompt("Zadej první číslo ke sčítaní:", 5);
    }
    setFirstNum(parseFloat(temp));
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
        // console.log(countdown);
      };
    }
  }, [countdown]);

  const handleData = (data, source) => {
    // console.log(data);
    switch (source) {
      case "numInput1":
        setFirstNum(data);
        break;
      case "numInput2":
        setSecondNum(data);
        break;
      case "ice-cream-flavor":
        setSelFlavor(data);
        break;
      case "ice-cream-extras":
        setSelExtras(data);
        break;
      case "ice-cream-scoops":
        if (data >= 1 && data <= 4) {
          if (data == 1) {
            setScoopsWord("kopeček");
          } else {
            setScoopsWord("kopečky");
          }
          setScoops(data);
        }
        break;
      case "ice-cream-type":
        setSelType(data);
        break;
      case "disk-space":
        setDiskSpace(data);
        break;
      case "text-area":
        setText(data);
        break;
      case "file-upload":
        setText(data);
        break;
      default:
        break;
    }
  };

  const handleEvent = (source) => {
    switch (source) {
      case "btn-soucet":
        if (validateFloat(firstNum) && validateFloat(secondNum)) {
          setSum(parseFloat(firstNum) + parseFloat(secondNum));
        } else {
          setSum("Špatně zadané čísla!");
        }
        break;
      case "btn-file":
        saveText(text);
        break;

      default:
        break;
    }
  };

  // ==================================== RETURN ====================================

  return (
    <div className="container bg-warning-subtle">
      <div className="row pt-4">
        <div className="col-6">
          {/* -------------------------------------- ICE CREAM -------------------------------------- */}
          <p>
            {selFlavor} {scoops} {scoopsWord} {selType} {selExtras}
          </p>
          <RbGroup
            id="ice-cream-flavor"
            label="Jakou příchuť?"
            dataIn={iceCreamFlavors}
            handleData={handleData}
            selectedValue={selFlavor}
          />
          <br />
          <ChbGroup
            id="ice-cream-extras"
            label="Něco na vrch?"
            dataIn={iceCreamExtras}
            handleData={handleData}
            selectedValue={selExtras}
          />
          <br />
          <NumImp
            id="ice-cream-scoops"
            label="Kolik kopečků dáme?"
            dataIn={scoops}
            handleData={handleData}
          />
          <br />
          <SelectBox
            id="ice-cream-type"
            label="Jaký druh zmrzliny?"
            dataIn={iceCreamTypes}
            handleData={handleData}
            selectedValue={selType}
          />
          <br />
          {/* -------------------------------------- DISK SPACE -------------------------------------- */}

          <Range
            id="disk-space"
            label="Místo na disku"
            dataIn={diskSpace}
            handleData={handleData}
          />
          <p>
            <Clock />, zbývá {diskSpace}% místa na disku.
          </p>
          {/* vypis akt. casu a % mista na disu */}
        </div>
        <div className="col-6">
          {/* -------------------------------------- PROGRESS BAR -------------------------------------- */}

          <ProgressBar id="progress-bar" dataIn={progress} />
          <p>Instalace probíhá, počkejte {countdown} sekund</p>
          {/* -------------------------------------- SUM -------------------------------------- */}
          <div className="row mb-4 mt-5">
            <div className="col-6">
              <TextBox
                id="numInput1"
                label="Sčítanec 1"
                dataIn={firstNum}
                handleData={handleData}
              />
            </div>
            <div className="col-6">
              <TextBox
                id="numInput2"
                label="Sčítanec 2"
                dataIn={secondNum}
                handleData={handleData}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <Button
                id="btn-soucet"
                label="Vypočítej"
                handleEvent={handleEvent}
              />
            </div>
            <div className="col-6">
              {/* nefunguje mi boostrap font-weight-bold */}
              <p className="bold">{sum}</p>
            </div>
          </div>
          {/* -------------------------------------- TEXT -------------------------------------- */}
          <TextArea
            id="text-area"
            label="Operace s textem"
            dataIn={text}
            handleData={handleData}
          />
          <div className="row mt-4">
            <div className="col-6">
              <File
                id="file-upload"
                label="Načti text ze souboru"
                handleData={handleData}
              />
            </div>
            <div className="col-6">
              <Button
                id="btn-file"
                label="Stáhni soubor s textem"
                handleEvent={handleEvent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
