import { Model, Schema } from "mongoose";

export const WorkspaceSettingSchemaProvider = {
  name: "WorkspaceSetting",
  useFactory: (): Model<any> => {
    const WorkspaceSettingSchema = new Schema({
      name: {
        type: String,
        trim: true,
        minlength: 4,
      },
      configuration: {
        type: Schema.Types.Mixed,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      preferred: {
        type: Boolean,
        default: false,
      },
    });
    return WorkspaceSettingSchema;
  },
};
