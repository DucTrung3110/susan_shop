import API_CONFIG from './config.js';
import { mockAPI } from './mock-data.js';

class API {
    async get(endpoint, id = '') {
        try {
            if (API_CONFIG.USE_MOCK_API) {
                return await mockAPI.get(endpoint, id);
            }
            
            const url = `${API_CONFIG.BASE_URL}${endpoint}${id ? '/' + id : ''}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('GET Error:', error);
            throw error;
        }
    }

    async post(endpoint, data) {
        try {
            if (API_CONFIG.USE_MOCK_API) {
                return await mockAPI.post(endpoint, data);
            }
            
            const url = `${API_CONFIG.BASE_URL}${endpoint}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('POST Error:', error);
            throw error;
        }
    }

    async put(endpoint, id, data) {
        try {
            if (API_CONFIG.USE_MOCK_API) {
                return await mockAPI.put(endpoint, id, data);
            }
            
            const url = `${API_CONFIG.BASE_URL}${endpoint}/${id}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('PUT Error:', error);
            throw error;
        }
    }

    async delete(endpoint, id) {
        try {
            if (API_CONFIG.USE_MOCK_API) {
                return await mockAPI.delete(endpoint, id);
            }
            
            const url = `${API_CONFIG.BASE_URL}${endpoint}/${id}`;
            const response = await fetch(url, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('DELETE Error:', error);
            throw error;
        }
    }
}

export default new API();
