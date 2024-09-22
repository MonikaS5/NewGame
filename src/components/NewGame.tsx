import { useState } from "react"

interface FormUser{
    symbol: string;
    faction: string;
}

function NewGame() {
  const [token, setToken] = useState<string>("");
  const [resp, setResp] = useState<string>("");
  const [form, setForm] = useState<FormUser>({ symbol: "", faction: "COSMIC" });






  return (
  <>





  
    <h1>New Game</h1>
    <input name="symbol" value={form.symbol} onChange={(e) => setForm({ ...form, symbol: e.currentTarget.value })} />
    <input name="faction" value={form.faction} onChange={(e) => setForm({ ...form, faction: e.currentTarget.value })} />
    <input type="submit" onClick={async () => {
      const resp = await fetch("https://api.spacetraders.io/v2/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: form.symbol,
          faction: form.faction,
        }),
      });

      const json = await resp.json();

      if (resp.ok) {
        setToken(json.data.token)
      }

      setResp(JSON.stringify(json, null, 2))
    }} />
    <pre>API token: {token}</pre>
    <pre>Response: {resp}</pre>
  </>)
}

export default NewGame