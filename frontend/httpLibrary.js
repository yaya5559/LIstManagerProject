

class httpLibrary {
    constructor(baseUrl){
        this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0,-1) : baseUrl;
        
    }

    _buildUrl(route, params){
        const url = new URL(this.baseUrl + route)
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return url;
    }

    async post(route, data = {}, params = {}){
        try{
            let response = await fetch(this._buildUrl(route, params), {
                method:"POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if(!response.ok){
                throw new Error(`Error ${response.ok}`)
            }
            return await response.json()
        }catch(error){
            throw new Error(`Error ${error}`)
        }
            
    }


    async get(route, params = {}){
        try{
            let response = await fetch(this._buildUrl(route, params));
            if(!response.ok){
                throw new Error(`Error: ${response.status}`)
            }
            return await response.json()
        }catch(error){
            throw new Error(`Error: ${error}`)
        }
    }


    async put(route, data = {}, params = {}){
        try{
            let response = await fetch(this._buildUrl(route, params), {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })

            if(!response.ok){
                throw new Error(`error ${response.status}`)

            }
            return await response.json();

        }catch(error){
            throw new Error(`Error: ${error}`);
        }

    } 

    async delete(route, params){
        
        try{
            let response = await fetch(this._buildUrl(route, params), {
                method : 'DELETE'

            })
            if(!response.ok){
                throw new Error(`Error: ${response.status}`)

            }
            return await response.json()
        }catch(error){
            throw new Error(`Error: ${error}`)
        }

    }
}
export default httpLibrary;