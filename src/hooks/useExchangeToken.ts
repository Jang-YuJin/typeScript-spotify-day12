import { useMutation } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import { ExchangeTokenResponse } from "../models/auth";

const useExchangeToken = () => {
    return useMutation<ExchangeTokenResponse, Error, {code: string, codeVerifier: string}>({
        mutationFn: ({code, codeVerifier}) => exchangeToken(code, codeVerifier),
        onSuccess: (response) => {
            localStorage.setItem('access_token', response.access_token);
        }
    })
};

export default useExchangeToken;