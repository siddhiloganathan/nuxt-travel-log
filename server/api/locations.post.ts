import db from "@/lib/db";
import { InsertLocation, location } from "@/lib/db/schema";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }

  // throw new Error("Oh no");
  const result = await readValidatedBody(event, InsertLocation.safeParse);

  if (!result.success) {
    const statusMessage = result.error.issues.map(issue => `${issue.path.join("")}: ${issue.message}`).join("; ");
    const data = result.error.issues.reduce((errors, issue) => {
      errors[issue.path.join("")] = issue.message;
      return errors;
    }, {} as Record<string, string>);

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  try {
    const [created] = await db.insert(location).values({
      ...result.data,
      slug: result.data.name.replaceAll(" ", "-").toLowerCase(),
      userId: event.context.user.id,
    }).returning();
    return created;
  }
  catch (error) {
    console.error(error);
    throw error;
  //   if (e instanceof LibsqlError) {
  //     if (e.code === "SQLITE_CONSTRAINT" && e.message.includes("location.slug")) {
  //       return sendError(event, createError({
  //         statusCode: 409,
  //         statusMessage: "Slug must be unique (the location name is used to generate the slug).",
  //       }));
  //     }
  //   }
  //   throw e;
  }
});
