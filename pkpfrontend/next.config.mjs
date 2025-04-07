/** @type {import('next').NextConfig} */
const nextConfig = {
    headers() {

        return [
    
          {
    
            source: "/api/:path*", // Match all API routes
    
            headers: [
    
              {
    
                key: "Access-Control-Allow-Origin", 
    
                value: "*"
    
              },
    
              {
    
                key: "Access-Control-Allow-Methods", 
    
                value: "GET, POST, PUT, DELETE, OPTIONS"
    
              },
    
              {
    
                key: "Access-Control-Allow-Headers", 
    
                value: "Content-Type, Authorization"
    
              }
    
            ]
    
          }
    
        ]
    
      }    
}

export default nextConfig;
