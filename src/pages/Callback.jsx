import { useEffect } from "react";

export function Callback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authCode = params.get("code");

    if (authCode) {
      getToken(authCode);
    }
  }, []);

  async function getToken(authCode) {

    const tenantId = import.meta.env.VITE_TENANTID;    
    const clientId = import.meta.env.VITE_CLIENTID;
    const redirectUri = import.meta.env.VITE_REDIRECTURI;
    const baseUrl = import.meta.env.VITE_URLBASE
    //const codeVerifier = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
    const codeVerifier = localStorage.getItem("codeVerifierGWM") ?? 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk'

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", authCode);
    params.append("redirect_uri", redirectUri);
    params.append("code_verifier", codeVerifier);

    try {
      const response = await fetch(`${baseUrl}/${tenantId}/oauth2/v2.0/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
      });  
      const data = await response.json();
      const {access_token:tokenGWM, refresh_token:refreshGWM} = data
      localStorage.setItem("tokenGWM",tokenGWM)
      localStorage.setItem("refreshGWM",refreshGWM)                
      
    } catch (error) {
      console.error(error);      
    }    
  }

  return (<>    
  </>);
}