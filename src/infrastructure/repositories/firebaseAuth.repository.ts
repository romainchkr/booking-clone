import { FIREBASE_AUTH, FIRESTORE_DB } from "@/firebaseConfig";
import { USER_COLLECTION } from "@/src/constants/firebase.constant";
import { User as User} from "@/src/domain/entities/user.entity";
import { IAuthRepository } from "@/src/domain/repositories/IAuth.repository";
import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseUserDTO } from "../dto/firebaseUser.dto";
import { FirebaseUserMapper } from "../mappers/firebaseUser.mapper";

// FirebaseAuthRepository is a singleton because its easier to manage to the auth state change that way using firebase
export class FirebaseAuthRepository implements IAuthRepository {
  private static instance: FirebaseAuthRepository;
  private isSignInOrSignUpInProgress = false;

  private constructor() {}

  public static getInstance(): FirebaseAuthRepository {
    if (!FirebaseAuthRepository.instance) {
      FirebaseAuthRepository.instance = new FirebaseAuthRepository();
    }
    return FirebaseAuthRepository.instance;
  }

  onAuthStateChanged(callback: (userId: string | null) => void): () => void {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      console.log(
        "onAuthStateChanged, is signing process ?",
        FirebaseAuthRepository.getInstance().isSignInOrSignUpInProgress
      );
      if (!FirebaseAuthRepository.getInstance().isSignInOrSignUpInProgress) {
        callback(user ? user.uid : null);
      }
    });
    return unsubscribe;
  }

  async signUp(email: string, password: string): Promise<User> {
    try {
      this.isSignInOrSignUpInProgress = true;
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = this._createUserAfterSignUp(userCredential);
      return user;
    } catch (error) {
      console.error("error");
      throw error;
    } finally {
      this.isSignInOrSignUpInProgress = false;
    }
  }

  async signIn(email: string, password: string): Promise<string> {
    try {
      this.isSignInOrSignUpInProgress = true;
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      return userCredential.user?.uid || "";
    } catch (error) {
      console.error("error");
      throw error;
    } finally {
      this.isSignInOrSignUpInProgress = false;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(FIREBASE_AUTH);
    } catch (error) {
      console.error("error");
      throw error;
    }
  }

  async _createUserAfterSignUp(userCredential: UserCredential): Promise<User> {
    const email = userCredential.user?.email!;

    const userDTO: FirebaseUserDTO = {
      uid: userCredential.user!.uid,
      name:
        userCredential.user?.displayName || (email ? email.split("@")[0] : ""),
      email: email,
      picture: userCredential.user?.photoURL || null,
    };

    // Add user in firestore
    await setDoc(doc(FIRESTORE_DB, USER_COLLECTION, userDTO.uid), userDTO);

    // Map the DTO to the domain User object using the mapper
    const user: User = FirebaseUserMapper.toDomain(userDTO);
    return user;
  }
}