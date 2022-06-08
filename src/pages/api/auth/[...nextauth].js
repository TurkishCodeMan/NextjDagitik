import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { Neo4jAdapter } from "@next-auth/neo4j-adapter";
import { createSession } from "../connect-db";

const neo4jSession = createSession();

function addUser(tx, { username, password }) {
  return tx.run("CREATE (a:User {name: $name,password:$password})", {
    name: username,
    password: password,
  });
}

function createPost(tx, { title, description, userId,slug,contents,password }) {
  tx.run(
    "CREATE (a:Post {title: $title,description:$description,userId:$userId,slug:$slug})",
    {
      title: title,
      description: description,
      userId: userId,
      slug,
      contents,
      password
    }
  );
  return tx.run(
    `MATCH (a:Post),(b:User) WHERE a.userId=${String(
      userId
    )} AND b.password=${String(
      userId
    )} CREATE (a)-[r:HAS_SENDED]->(b) RETURN a,b`
  );
}

function createComment(tx, { comment, userId }) {
  tx.run("CREATE (a:Comment {comment:$comment,userId:$userId})", {
    comment: comment,
    userId: userId,
  });
  return tx.run(
    `MATCH (a:Post),(b:Comment) WHERE a.userId=${String(
      userId
    )} AND b.userId=${String(
      userId
    )} CREATE (a)-[r:HAS_COMMENT]->(b) RETURN a,b`
  );
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        var user = await neo4jSession.readTransaction((tx) =>
          tx.run("MATCH (a:User {name: $name}) RETURN a", {
            name: credentials.username,
          })
        );
        const singleRecord = user?.records?.[0];
        const node = singleRecord?.get(0);
        console.log(user);

        if (!user || !user.records || user.records.length === 0) {
          await neo4jSession.writeTransaction((tx) => {
            addUser(tx, {
              username: credentials.username,
              password: credentials.password,
            });
            createPost(tx, {
              userId: credentials.password,
              title: "aaaa",
              description: "saaaaa",
              slug: "aaa",
              contents: "",
              password: "445544",
            });
            createComment(tx, {
              comment: "test comment",
              userId: credentials.password,
            });
          });
          let newUser = await neo4jSession.readTransaction((tx) =>
            tx.run("MATCH (a:User {name: $name}) RETURN a", {
              name: credentials.username,
            })
          );

          console.log("2321321321");

          const singleRecord = newUser?.records[0];
          const node = singleRecord.get(0);
          console.log(node);

          return node.properties;
        }

        console.log(node);

        return node.properties;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: Neo4jAdapter(neo4jSession),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (typeof user !== typeof undefined) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) session.user = token.user;
      return session;
    },
  },
});
