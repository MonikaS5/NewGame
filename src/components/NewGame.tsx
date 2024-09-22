import { useCallback, useState } from "react";

interface FormUser {
  symbol: string;
  faction: string;
}

function NewGame() {
  const [token, setToken] = useState<string>("");
  const [resp, setResp] = useState<string>("");
  const [form, setForm] = useState<FormUser>({ symbol: "", faction: "COSMIC" });

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
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">New Game Registration</h2>
          </div>
        </div>
        {/* ----- */}
        <div className="row">
          <div className="col-6">
            <form className="bg-light" onSubmit={handleSubmit}>
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
              </div>{" "}
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
              </div>{" "}
              {/* ---select-- */}
              <div>
                <button type="submit">Submit</button>
                <button type="button">Reset</button>
              </div>
            </form>
          </div>{" "}
          {/* ---col-1-- */}
          <div className="col-6">
            <pre>API token: {token}</pre>
            <pre>Response: {resp}</pre>
          </div>{" "}
          {/* ---col2-- */}
        </div>{" "}
        {/* ---row 2-- */}
      </div>{" "}
      {/* ---end of container-- */}
    </>
  );
}

export default NewGame;
