import { Mapper } from "../../../shared/application/IMapper";
import { IRoleDTO } from "../dtos/IRoleDTO";
import { RoleName } from "../../domain/RoleName";
import { RoleView } from "../../domain/RoleView";
import { RoleSlug } from "../../domain/RoleSlug";
import { RoleVID } from "../../domain/RoleVID";

export class RoleViewMap implements Mapper<RoleView> {
  public static toDomain(raw: any): RoleView {
    const valueOrError = RoleView.create({
      roleVID: RoleVID.create({ value: raw.role_id }).getData(),
      roleSlug: RoleSlug.createExisting({ value: raw.role_slug }).getData(),
      roleName: RoleName.create({ value: raw.role_name }).getData(),
      isEnabled: raw.is_enable,
    });
    console.log("valueOrError", valueOrError);
    if (valueOrError.isFailure) {
      console.log(valueOrError.getErr());
    }
    return valueOrError.isSuccess ? valueOrError.getData() : null;
  }
  public static toDTO(roleView: RoleView): IRoleDTO {
    console.log("roleView", roleView);
    return {
      roleVID: roleView.roleVID.value,
      roleSlug: roleView.roleSlug.value,
      roleName: roleView.roleName.value,
      isEnabled: roleView.isEnabled,
    };
  }
}
