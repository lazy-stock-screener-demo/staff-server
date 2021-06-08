import { Mapper } from "../../../shared/application/IMapper";
import { UniqueEntityID } from "../../../shared/domain/id/UniqueEntityID";
import { Role } from "../../domain/Role";

export class RoleMap implements Mapper<Role> {
  public static toDomain(raw: any): Role {
    const roleOrError = Role.create(
      {
        roleName: raw.role_name,
        roleSlug: raw.role_slug,
        isEnable: raw.is_enable,
      },
      new UniqueEntityID(raw.role_id)
    );
    if (roleOrError.isFailure) {
      console.log(roleOrError.getErr());
    }
    return roleOrError.getData();
  }
  public static toPersistence(role: Role): any {
    return {
      role_id: role.roleID.id.toString(),
      role_slug: role.roleSlug.value,
      role_name: role.roleName.value,
      is_enable: role.isEnable,
    };
  }
}
