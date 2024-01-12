import { FirebaseUserDTO } from "@/src/infrastructure/dto/firebaseUser.dto";
import { User } from "@/src/domain/entities/user.entity";

export class FirebaseUserMapper {
  static toDomain(dto: FirebaseUserDTO): User {
    return new User({
      id: dto.uid,
      name: dto.name,
      email: dto.email,
      picture: dto.picture || null,
    });
  }

  static fromDomain(user: User): FirebaseUserDTO {
    return {
      uid: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture || null,
    };
  }
}