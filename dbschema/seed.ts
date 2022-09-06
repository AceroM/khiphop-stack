import invariant from "tiny-invariant";
import { db } from "~/db";
import e from "~/db/edgeql";

async function seed() {
  const testId = process.env.TEST_CLERK_ID;
  invariant(testId, "Please include a test clerk_id");
  await e
    .delete(e.Note, (note) => ({
      filter: e.op(note.author.clerk_id, "=", testId),
    }))
    .run(db);

  // console.log("Deleting User..");
  // await e
  //   .delete(e.User, (user) => ({
  //     filter: e.op(user.clerk_id, "=", testId),
  //   }))
  //   .run(db);

  // console.log("Inserting test user..");
  // const user = await e
  //   .select(
  //     e.insert(e.User, {
  //       clerk_id: testId,
  //       alias: "bob",
  //     })
  //   )
  //   .run(db);

  // console.log("Inserting notes for test user..");
  // await e
  //   .params({ notes: e.json }, (params) => {
  //     console.log(`params :>> `, params);
  //     return e.for(e.json_array_unpack(params.notes), (note) => {
  //       console.log(`note.name :>> `, note.name);
  //       console.log(`e.cast(e.str, note.name) :>> `, e.cast(e.str, note.name));
  //       return e.insert(e.Note, {
  //         name: e.cast(e.str, note.name),
  //         description: note.description
  //           ? e.cast(e.str, note.description)
  //           : null,
  //         author: e.select(e.User, (user) => ({
  //           filter: e.op(user.clerk_id, "=", e.cast(e.str, note.authorId)),
  //         })),
  //       });
  //     });
  //   })
  //   .run(db, {
  //     notes: [
  //       {
  //         name: "test name 1",
  //         description: "test description two",
  //         authorId: testId,
  //       },
  //     ],
  //   });

  console.log("Finished Seeding! 🌻");
}

seed();
