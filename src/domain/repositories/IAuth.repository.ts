import { User } from "../entities/user.entity";

export interface IAuthRepository {
  onAuthStateChanged(callback: (userId: string | null) => void): () => void; // Returns a function to unsubscribe
  signUp(email: string, password: string): Promise<User>;
  signIn(email: string, password: string): Promise<string>;
  signOut(): Promise<void>;
}