//note: complex aggreagation queries required for video watvh history :: use package mongoose-aggregate-paginate-v2 :: read mongo aggregation pipeline

import mongoose, {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema (
    {
        videoFile: {
            type: String, // cloudinary url
            required: true
        },
        thumbnail: {
            type: String, // cloudinary url
            required: true
        },
        title: {
            type: String,
            required : true
        },
        description: {
            type: String,
            required: true
        },
        duration: { //* user wont give the video duration: need to extract it from video :: given by cloudinary 
            type: Number // cloudinary
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: { // video creator
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true // for createdAt, updatedAt
    }
)

//todo: read mongoose middlewares
videoSchema.plugin(mongooseAggregatePaginate) // added as plugin
export const Video = mongoose.model("Video", videoSchema)