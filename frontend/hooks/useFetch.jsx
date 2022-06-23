import {useState, useCallback} from "react";
import axios from "axios";
const _baseUrl = 'http://localhost:3001'

export const useFetch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(
        async (
            method = 'GET',
            body = null,
            endpoint,
        ) => {
            setLoading(true);
            let response
            try {
                if (method === 'post') {
                     response = await axios.post(`${_baseUrl}/${endpoint}`, {data: body})
                } else {
                     response = await axios.post(`${_baseUrl}/${endpoint}`, {data: body})
                }
                setLoading(false);
                return response;
            } catch (e) {
                setLoading(false);
                setError(e.message);
                throw e;
            }
        },
        []
    );
    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
};

