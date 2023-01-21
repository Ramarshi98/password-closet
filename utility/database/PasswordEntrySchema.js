
export const PasswordEntrySchema = {
    name: "PasswordEntry",
    properties: {
      _id: "int",
      pageTitle: "string",
      password: "string",
      notes: "string?"
    },
    primaryKey: "_id",
  };