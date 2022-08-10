export const requireHttpVerb = (verb: string) => (request: Request) => {
  if (request.method !== verb)
    throw new Response("Method not allowed", { status: 405 });
};

export const requireHttpPost = requireHttpVerb("POST");
