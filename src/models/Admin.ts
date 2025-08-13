import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface AdminDocument extends mongoose.Document {
  username: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}

const adminSchema = new mongoose.Schema<AdminDocument>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

const Admin = mongoose.model<AdminDocument>("Admin", adminSchema);

export default Admin;
