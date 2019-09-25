import mongoose, { Schema } from 'mongoose'

const noteSchema = new Schema(
  {
    title: {
      type: String
    },
    body: {
      type: String
    },
    tags: { type: [String], required: false, default: [] },
    owner: { type: Schema.Types.ObjectId }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id
      }
    }
  }
)

noteSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      body: this.body,
      tags: this.tags,
      owner: this.owner,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full
      ? {
        ...view
        // add properties for a full view
      }
      : view
  }
}

const model = mongoose.model('Note', noteSchema)

export const schema = model.schema
export default model
