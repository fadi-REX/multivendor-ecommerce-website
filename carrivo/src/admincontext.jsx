import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Admincontext = createContext({});

// eslint-disable-next-line react/prop-types
export function AdmincontextProvide({ children }) {
  const [admin, setadmin] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!admin) {
      axios.get("/adminprofile").then(({ data }) => {
        setadmin(data);
        setReady(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Admincontext.Provider value={{ admin, setadmin, ready }}>
      {children}
    </Admincontext.Provider>
  );
}
