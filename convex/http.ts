import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { api } from './_generated/api';
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async (ctx, req) => {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
        if (!webhookSecret) {
            throw new Error("Missing CLERK_WEBHOOK_SECRET");
        }

        const svixId = req.headers.get("svix-id");
        const svixSignature = req.headers.get("svix-signature");
        const svixTimestamp = req.headers.get("svix-timestamp");

        if (!svixId || !svixSignature || !svixTimestamp) {
            return new Response("Missing svix headers", { status: 400 });
        }

        const payload = await req.json();
        const body = JSON.stringify(payload);

        const wh = new Webhook(webhookSecret);
        let evt;

        try {
            evt = wh.verify(body, {
                "svix-id": svixId,
                "svix-timestamp": svixTimestamp,
                "svix-signature": svixSignature
            }) as any;
        } catch (err) {
            console.error("Error verifying webhook:", err);
            return new Response("Error verifying webhook", { status: 400 });
        }

        if (evt.type === "user.created") {
            const { id, email_addresses, first_name, last_name, image_url } = evt.data;
            const email = email_addresses[0].email_address;
            const fullname = `${first_name} ${last_name}`.trim();

            try {
                await ctx.runMutation(api.users.createUser, {
                    email,
                    fullname,
                    image: image_url,
                    clerkId: id,
                    username: email.split("@")[0],
                })
            } catch (error) {
                console.log('Error: creating user', error);
                return new Response("Error creating user", { status: 500 });
            }
        }

        return new Response("Webhook processed", { status: 200 });

    })
})

export default http;