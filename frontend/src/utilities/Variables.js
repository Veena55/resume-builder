const Variable = () => {
    return { 
        GOOGLE_CLIENT_ID: "745276498734-9aod2ug3nq6d6261uh1j64cba6cv1ogl.apps.googleusercontent.com",
        API_URL: import.meta.env.PROD ? "https://resume-builder.webpronest.com/api" : "http://localhost:8080"
    };
}

export default Variable;