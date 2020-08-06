import { useState, useEffect } from "react";
import axios from "axios";
import url from "../api";

const useAsyncRequest = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (err) {
        console.warn("Something went wrong fetching the serveur...", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return [data, loading];
};

export default useAsyncRequest;
