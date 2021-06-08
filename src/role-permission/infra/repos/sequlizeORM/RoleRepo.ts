import { Op, literal } from "sequelize";
import TextTools from "../../../../shared/application/utils/TextTools";
import { Role } from "../../../domain/Role";
import { RoleID } from "../../../domain/RoleID";
import { RoleView } from "../../../domain/RoleView";
import { RoleName } from "../../../domain/RoleName";
import { RoleViewMap } from "../../../application/mappers/RoleViewMap";
import { RoleMap } from "../../../application/mappers/RoleMap";

export interface IRoleRepo {
  readRolesBulk(offset?: string): Promise<RoleView[]>;
  readRoleViewByRoleName(roleName: RoleName): Promise<RoleView>;
  readRoleViewByRoleVID(roleVID: string): Promise<RoleView>;
  readRoleByRoleVID(roleVID: string): Promise<Role>;
  readRoleByRoleID(roleID: RoleID): Promise<Role>;
  isExistByRoleName(roleName: RoleName): Promise<boolean>;
  isExistByRoleID(roleID: RoleID): Promise<boolean>;
  save(role: Role): Promise<RoleView>;
  // delete()
}

export class RoleRepoSequelize implements IRoleRepo {
  private models: any;
  constructor(models: any) {
    this.models = models;
  }

  // TODO: update this method
  public delete(roleID: RoleID): Promise<void> {
    const RoleModel = this.models.Role;
    return RoleModel.destroy({
      where: {
        role_id: roleID.id.toString(),
      },
    });
  }

  async isExistByRoleID(roleID: RoleID): Promise<boolean> {
    const RoleModel = this.models.Role;
    const role = await RoleModel.findOne({
      where: {
        role_id: roleID.id.toString(),
      },
    });
    return !!role === true;
  }
  async isExistByRoleName(roleName: RoleName): Promise<boolean> {
    const RoleModel = this.models.Role;
    const role = await RoleModel.findOne({
      where: {
        role_name: roleName.value.toString(),
      },
    });
    return !!role === true;
  }
  public async save(role: Role): Promise<RoleView> {
    const RoleModel = this.models.Role;
    const exists = await this.isExistByRoleID(role.roleID);
    const isNewRole = !exists;
    const rawSequelizeRole = RoleMap.toPersistence(role);
    if (isNewRole) {
      try {
        const roleCreateResult = await RoleModel.create(rawSequelizeRole);
        return RoleViewMap.toDomain(roleCreateResult);
      } catch (err) {
        await this.delete(role.roleID);
        throw new Error(err.toString());
      }
    } else {
      const updatedStatusList = await RoleModel.update(rawSequelizeRole, {
        individualHooks: true,
        hooks: true,
        where: { role_id: role.roleID.id.toString() },
      });
      const [updateNumber, updatedResultList] = updatedStatusList;
      // [ 1, [ role {
      //       dataValues: [Object],
      //       _previousDataValues: [Object],
      //       _changed: [Set],
      //       _options: [Object],
      //       isNewRecord: false } ] ]
      if (updateNumber == 1) {
        return RoleViewMap.toDomain(updatedResultList[0]);
      } else {
        // TODO: Add RoleViewMap List
        return;
      }
    }
  }

  async readRoleByRoleID(roleID: RoleID | string): Promise<Role> {
    roleID = roleID instanceof RoleID ? (<RoleID>roleID).id.toString() : roleID;
    const RoleModel = this.models.Role;
    const role = await RoleModel.findOne({
      where: {
        role_id: roleID,
      },
    });
    const found = !!role === true;
    if (!found) throw new Error("Role not found");
    return RoleMap.toDomain(role);
  }

  async readRoleByRoleVID(roleViewID: string): Promise<Role> {
    const RoleModel = this.models.Role;
    const roleIDLike = TextTools.addHyphen2String(roleViewID);
    const role = await RoleModel.findOne({
      where: {
        [Op.and]: [literal(`CAST(role_id AS text) LIKE '${roleIDLike}%'`)],
      },
    });
    return RoleMap.toDomain(role);
  }
  async readRoleViewByRoleVID(roleViewID: string): Promise<RoleView> {
    const RoleModel = this.models.Role;
    const roleIDLike = TextTools.addHyphen2String(roleViewID);
    const role = await RoleModel.findOne({
      where: {
        [Op.and]: [literal(`CAST(role_id AS text) LIKE '${roleIDLike}%'`)],
      },
    });
    return RoleViewMap.toDomain(role);
  }
  async readRoleViewByRoleName(roleName: RoleName): Promise<RoleView> {
    const RoleModel = this.models.Role;
    const role = await RoleModel.findOne({
      where: {
        role_name: roleName.value,
      },
    });
    if (!!role === false) throw new Error("User not found.");
    return RoleViewMap.toDomain(role);
  }

  async readRolesBulk(offset?: string): Promise<RoleView[]> {
    const RoleModel = this.models.Role;
    const roles = await RoleModel.findAll({
      where: {},
      offset: +0,
      limit: 15,
      include: [],
      // raw: true,
      // subQuery: false,
    });
    return roles.map((roleItem) => RoleViewMap.toDomain(roleItem));
  }
}
