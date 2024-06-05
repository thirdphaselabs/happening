import { WorkOS } from "@workos-inc/node";
import { Router, Request, Response, NextFunction } from "express";
import { environment } from "../../environment";
import { AuthService } from "./auth.service";

const authWebhooks = Router();

const workos = new WorkOS(process.env.WORKOS_API_KEY);

const authService = new AuthService();

authWebhooks.post("/", async (req, res) => {
  const payload = req.body;
  const sigHeader = req.headers["workos-signature"];

  if (!sigHeader || typeof sigHeader !== "string") {
    res.status(400).send("No signature header found");
    return;
  }

  try {
    const webhook = await workos.webhooks.constructEvent({
      payload: payload,
      sigHeader: sigHeader,
      secret: environment.WORKOS_WEBHOOK_SECRET,
    });

    if (webhook.event === "user.created") {
      const user = webhook.data;
      await authService.createProfile(user);
    }

    // Verify the signature and process the event
    return res.status(200).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while processing the webhook");
  }
});

authWebhooks.get("/", async (req, res) => {
  return res.status(200).send("ok");
});

export { authWebhooks };
