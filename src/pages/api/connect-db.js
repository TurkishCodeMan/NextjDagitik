import neo4j from "neo4j-driver";

export const driver = neo4j.driver(
  process.env.NEO4J_BOLT_URL,
  neo4j.auth.basic("neo4j", process.env.NEO4J_BOLT_PASSWORD)
);

 export function createSession() {
  const session = driver.session({database:'neo4j'});
  return session;
}


// export const neo4jSession = connectDatabase();
