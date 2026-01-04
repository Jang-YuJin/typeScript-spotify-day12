import { useQuery } from "@tanstack/react-query";
import { getSeveralBrowseCategories } from "../apis/category";
import { GetSeveralBrowseCategoriesRequest } from "../models/category";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetSeveralBrowseCategories = (params: GetSeveralBrowseCategoriesRequest) => {
    const clientCredentialToken = useClientCredentialToken();

    return useQuery({
        queryKey: ['get-categories'],
        queryFn: () => {
            if(!clientCredentialToken){
                throw new Error('No token available');
            }

            return getSeveralBrowseCategories(clientCredentialToken, params);
        }
    });
};

export default useGetSeveralBrowseCategories;