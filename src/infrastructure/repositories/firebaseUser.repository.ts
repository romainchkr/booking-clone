import { FIREBASE_FUNCTION, FIRESTORE_DB } from "@/firebaseConfig";
import { USER_COLLECTION } from "@/src/constants/firebase.constant";
import { User } from "@/src/domain/entities/user.entity";
import { IUserRepository } from "@/src/domain/repositories/IUser.repository";
import { getDoc, doc } from "firebase/firestore";
import { FirebaseUserDTO } from "../dto/firebaseUser.dto";
import { FirebaseUserMapper } from "../mappers/firebaseUser.mapper";
import { httpsCallable } from "firebase/functions";

export class FirebaseUserRepository implements IUserRepository {
  async getUserDetails(userId: string): Promise<User> {
    try {
      const userDoc = await getDoc(doc(FIRESTORE_DB, USER_COLLECTION, userId));
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }

      // Convert the Firestore data to a DTO
      const userDTO: FirebaseUserDTO = {
        uid: userDoc.data().uid,
        name: userDoc.data().name,
        email: userDoc.data().email,
        picture: userDoc.data().photo,
      };

      // Map the DTO to the domain User object using the mapper
      const user: User = FirebaseUserMapper.toDomain(userDTO);
      return user;
    } catch(error) {
      console.log("error :", error);
      throw error;
    }
  }

  async isEmailAlreadyUse(email: string): Promise<boolean> {
    const cf = httpsCallable<Req, Res>(FIREBASE_FUNCTION, "checkEmailUniqueness");
    try {
      // const result = await cf({ email });
      // return result.data.isUnique;

      // Simulate cloud function
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });

      return true;
    } catch (error) {
      throw new Error('Error checking email uniqueness');
    }
  }
}

interface Req {
  email: string;
}

interface Res {
  isUnique: boolean;
}