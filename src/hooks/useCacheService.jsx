import { useRef, useEffect } from 'react';

export default function useCache() {
  useEffect(() => {
    return () => {
      registeredServicesRef.current = {};
    };
  }, []);

  const registeredServicesRef = useRef({});

  const registerService = ({ serviceKey, payload, result, expirationDate = new Date().getTime() + 20 * 1000 }) => {
    payload = JSON.stringify(payload ?? '{}');
    registeredServicesRef.current[String(serviceKey) + String(payload)] = { expirationDate, result };
  };

  const checkCache = ({ serviceKey, payload }) => {
    payload = JSON.stringify(payload ?? '{}');

    if (registeredServicesRef.current[String(serviceKey) + String(payload)]?.expirationDate >= new Date().getTime())
      return true;

    return false;
  };

  const getContent = ({ serviceKey, payload }) => {
    payload = JSON.stringify(payload ?? '{}');
    return registeredServicesRef.current[String(serviceKey) + String(payload)].result;
  };

  return { checkCache, registerService, getContent };
}
