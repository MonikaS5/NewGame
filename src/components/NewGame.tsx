import { useCallback, useEffect, useState } from "react";

interface FormUser {
  symbol: string;
  faction: string;
}

function NewGame() {
  const [token, setToken] = useState<string>("");
  const [resp, setResp] = useState<string>("");
  const [form, setForm] = useState<FormUser>({ symbol: "", faction: "COSMIC" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [symbolError, setSymbolError] = useState<string>("");

  const factions = [
    "COSMIC",
    "VOID",
    "QUANTUM",
    "DOMINION",
    "ASTRO",
    "UNITED",
    "OMEGA",
  ];

  useEffect(()=>{
    const storedToken = localStorage.getItem("token");
    if(storedToken){
        setToken(storedToken);
    }

  },[]);
  const storeToken = (token:string) => {
    localStorage.setItem("token", token)
    setToken(token);
  }



//symbol validation
const validateSymbol = (symbol: string) => {
    const regex = /^[A-Za-z][A-Za-z0-9]{2,14}$/;

    if(!regex.test(symbol)){
        setSymbolError("Symbol must start with a letter, be alphanumeric and 3-14 characters long");

        setTimeout(()=>{
            setSymbolError("");
        }, 8000);
    }else{
        setSymbolError("");
    }


};


  //handleChange
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({ ...prevForm, [name]: value }));

      if(name === "symbol"){
        validateSymbol(value);
      }
    },
    []
  );

  // handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    
    if(symbolError){
        setErrorMessage("Please Enter valid Symbol");
        return;
    }

    try {
      const response = await fetch("https://api.spacetraders.io/v2/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: form.symbol,
          faction: form.faction,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        setToken(json.data.token);
        storeToken(json.data.token);
        setSuccessMessage(`Hello ${form.symbol}, Successfully Registered!`);
      } else {
        setErrorMessage(json.error.message || "Registration Failed");
      }

      setResp(JSON.stringify(json, null, 2));
    } catch (error) {
      setResp(`Error : ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  //handleReset
  const handleReset = () => {
    setForm({ symbol: "", faction: "COSMIC" });
    setToken("");
    setResp("");
    setErrorMessage("");
    setSuccessMessage("");
    setSymbolError("");
    localStorage.removeItem("token");
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5 mb-5">
            <h2 className="text-center text-info">New Game Registration</h2>
          </div>
        </div>
        {/* ----- */}
        <div className="row ">
          <div className="col-sm-12 col-md-4">
            <form className="bg-light p-4" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="symbol"> Symbol: </label>
                <input
                  type="text"
                  className="form-control"
                  id="symbol"
                  name="symbol"
                  value={form.symbol}
                  maxLength={14}
                  minLength={3}
                  onChange={handleChange}
                  placeholder="Enter Your Symbol"
                  autoComplete="off"
                  required
                />
                {symbolError && (
                    <div className="text-danger mt-3">{symbolError}</div>
                )}
              </div>
             
              <div className="mb-3">
                <label htmlFor="faction"> Faction: </label>
                <select
                  name="faction"
                  className="form-control"
                  onChange={handleChange}
                  id="faction"
                  value={form.faction}
                >
                  {factions.map((faction) => (
                    <option key={faction} value={faction}>
                      {faction}
                    </option>
                  ))}
                </select>
              </div>
              {/* ---select-- */}
              <div>
                <button
                  type="submit"
                  className="btn btn-primary me-4"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </form>

            {successMessage && (
              <div className="alert alert-success mt-5" role="alert">
                <h4 className="alert-heading">Well done!</h4>
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger mt-5" role="alert">
                {errorMessage}
              </div>
            )}
          </div>

          <div className="col-sm-12 col-md-8 mt-5">
            <div >
                <pre>API token: {token ? token: "Token is not available"}</pre>
                </div>
                <div className="oveflow-auto">
            <pre>Response: {resp}</pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewGame;
