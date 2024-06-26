import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "../../lib/mongoose";
import Event, { IEvent } from "@/lib/models/event.model";

type Data = {
  success: boolean;
  data?: IEvent[] | IEvent;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  await connectToDB();

  switch (method) {
    case "GET":
      try {
        const events = await Event.find({});
        res.status(200).json({ success: true, data: events });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const event = await Event.create(req.body);
        res.status(201).json({ success: true, data: event });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
