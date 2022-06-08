import { createSession } from "../connect-db";
import nc from "next-connect";

const neo4jSession = createSession();

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
}).get(async (req, res) => {
  const result = await neo4jSession.readTransaction((tx) => {
    return tx.run(`MATCH (n:Post) RETURN n LIMIT 25`);
  });
//   await neo4jSession.close();

  return res.status(200).json({ posts:result.records.map(rc=>rc._fields[0].properties)} );
});

export default handler;
