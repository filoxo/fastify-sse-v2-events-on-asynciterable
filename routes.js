"use strict";

const fs = require("fs").promises;
const { EventEmitter, on } = require("events");

module.exports = async function (fastify, opts) {
  const indexHtml = await fs.readFile(__dirname + "/index.html");
  const ee = new EventEmitter();

  fastify.get("/", async (request, reply) => {
    reply.type("text/html").send(indexHtml);
  });

  fastify.get("/data", (request, reply) => {
    // Attempt 1
    // reply.sse(on(ee, "update"));

    // Attempt 2
    reply.sse(
      (async function* () {
        for await (const event of on(ee, "update")) {
          console.log("event", event);
          yield {
            type: "ping",
            data: JSON.stringify(event),
          };
        }
      })()
    );
  });

  fastify.post("/report", async (request, reply) => {
    try {
      const source = request.body;
      ee.emit("update", source.name);
      reply.status(200).send();
    } catch (e) {
      console.error("/report error:", e);
      reply.status(500).send(e);
    }
  });
};
