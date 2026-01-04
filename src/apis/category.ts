import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { GetSeveralBrowseCategoriesRequest, GetSeveralBrowseCategoriesResponse } from "../models/category";

export const getSeveralBrowseCategories = async(token: string, params: GetSeveralBrowseCategoriesRequest): Promise<GetSeveralBrowseCategoriesResponse> => {
    try {
        const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            params
        });

        return response.data;
    } catch (error) {
        throw new Error('Fail to fetch categories!');
    }
};