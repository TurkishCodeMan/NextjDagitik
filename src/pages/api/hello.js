// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDatabase } from "./connect-db";

export default async function handler(req, res) {
  // const session = connectDatabase();
  // const allData = await session.run(
  //   "MATCH (n) RETURN LABELS(n) AS labels,COUNT(n) AS count"
  // );
  // const records = allData.records.map((record) => ({
  //   labels: record.get("labels"),
  //   count: record.get("count").toNumber(),
  // }));
  res.status(200).json({ data: "asdasd" });
}
