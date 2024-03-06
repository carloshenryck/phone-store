import { toast } from "sonner";

type request = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'

export const fetchApi = async (route: string, requestType?: request, body?: object ) => {
  const baseUrl = import.meta.env.VITE_BASE_URL 
  const routeUrl = `${baseUrl}${route}`
  try {
    const response = await fetch(routeUrl, {
      method: requestType,
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
    }); 

    const jsonResponse = await response.json()
    if (!response.ok) {
      toast(jsonResponse.message ?? 'Erro inesperado! Tente novamente mais tarde', {
        style: {
          background: '#ef4444',
          color: 'white',
          border: 'none'
        },
      })
      return
    }

    return { data: jsonResponse.data, message: jsonResponse.message }
  } catch (error) {
    toast("Erro inesperado! Tente novamente mais tarde", {
      style: {
        background: '#ef4444',
        color: 'white',
        border: 'none'
      },
    })
  }
}