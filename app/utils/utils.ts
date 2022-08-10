import toast from "react-hot-toast";

export const requireHttpVerb = (verb: string) => (request: Request) => {
  if (request.method !== verb)
    throw new Response("Method not allowed", { status: 405 });
};

export const requireHttpPost = requireHttpVerb("POST");

export function notifyErrorsInActionData(actionData: any) {
  if (actionData?.errors && Object.keys(actionData?.errors).length > 0) {
    for (let errorType in actionData.errors) {
      toast.error(actionData.errors[errorType]);
    }
  }
}
