import { serveDir, serveFile } from "jsr:@std/http/file-server";

export function serverRequests(request: Request){
    const pathname = new URL(request.url).pathname;

    if(pathname === "/"){
        return serveFile(request, Deno.cwd() + "/public/index.html");
    }

    return serveDir(request, {
        fsRoot: "public",
        urlRoot: ""
    });

}

Deno.serve(serverRequests);