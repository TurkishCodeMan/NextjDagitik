import { createSession } from "../connect-db";
import nc from "next-connect";

const neo4jSession = createSession();

function createPost(tx, { title, description, password,slug,contents }) {
  tx.run(
    "CREATE (a:Post {title: $title,description:$description,userId:$userId,slug:$slug})",
    {
      title: title,
      description: description,
      userId: password,
      slug:slug
    }
  );
  console.log(password);
//   return tx.run(
//     `MATCH (a:Post),(b:User) WHERE a.userId=${password.toString()} AND b.password=${password.toString()} CREATE (a)-[r:HAS_SENDED]->(b) RETURN a,b`
//   );
}
const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
}).post(async (req, res) => {
  console.log(req.body);
  const result = await neo4jSession.writeTransaction((tx) => {
    createPost(tx, {
      title: req.body.title,
      description: req.body.description,
      slug:req.body.title,
      contents:req.body.contents,
      password: "445544",
    });
  });

  console.log(result);
//   await neo4jSession.close();

  res.json({ status: "success" });

  return res.status(200).json({ message: "success" });
});

export default handler;
