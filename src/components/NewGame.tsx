import { useCallback, useState } from "react";

interface FormUser {
  symbol: string;
  faction: string;
}

function NewGame() {
  const [token, setToken] = useState<string>("");
  const [resp, setResp] = useState<string>("");
  const [form, setForm] = useState<FormUser>({ symbol: "", faction: "COSMIC" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const factions = [
    "COSMIC",
    "VOID",
    "QUANTUM",
    "DOMINION",
    "ASTRO",
    "UNITED",
    "OMEGA",
  ];

  //handleChange
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    },
    []
  );

  // handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);


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
      }

      setResp(JSON.stringify(json, null, 2));
    } catch (error) {
      setResp(`Error : ${error}`);
    }finally{
        setIsLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ symbol: "", faction: "COSMIC" });
    setToken("");
    setResp("");
  }


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">New Game Registration</h2>
          </div>
        </div>
        {/* ----- */}
        <div className="row border">
          <div className="col-sm-12 col-md-4">
            <form className="bg-light p-4" onSubmit={handleSubmit}>
              <div>
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
                />
              </div>
              {/* ---input-- */}
              <div>
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
                <button type="submit"
                className="btn btn-primary me-4"
                 disabled={isLoading}>
                    {isLoading ? "Submitting...": "Submit"}
                </button>
                <button type="button"
                className="btn btn-secondary"
                onClick={handleReset}>Reset</button>
              </div>
            </form>
          </div>
          
          <div className="col-sm-12 col-md-8">
            <pre>API token: {token}</pre>
            <pre>Response: {resp}</pre>
          </div>
          
        </div>
        
      </div>
      
    </>
  );
}

export default NewGame;
