import mongoose from "mongoose";
import { Password } from "../services/password";

interface userAttrs  {
  email: string;
  password: string;
}

//Interface that describes the properties 
//that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
 build(attrs: userAttrs): UserDoc
}

//Interface that describes the properties 
//that a user Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
    
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(done) {
    if(this.isModified('password')) {
        try {
            const hashed = await Password.toHash(this.get('password'))
             this.set('password', hashed)
        } catch(err) {
            console.log(err.message)
        }
    }
    done();
})

userSchema.statics.build = (attrs: userAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
