import { Staff } from "../../../domain/Staff";
import { StaffEmail } from "../../../domain/StaffEmail";
import { StaffName } from "../../../domain/StaffName";
import { StaffMap } from "../../../application/mappers/StaffMap";

export interface IStaffRepo {
  exists(staffEmail: StaffEmail): Promise<boolean>;
  getUserByUserID(staffID: string): Promise<Staff>;
  getUserByUserName(staffName: StaffName | string): Promise<Staff>;
  save(user: Staff): Promise<void>;
}

export class StaffRepoSequelize implements IStaffRepo {
  private models: any;
  constructor(models: any) {
    this.models = models;
  }
  /**
   * @method exists
   * @public @async
   * @desc
   */

  public async exists(staffEmail: StaffEmail): Promise<boolean> {
    const BaseStaffModel = this.models.BaseStaff;
    const baseStaff = await BaseStaffModel.findOne({
      where: {
        staff_email: staffEmail.value,
      },
    });
    return !!baseStaff === true;
  }
  /**
   * @method getUserByUserID
   * @public @async
   * @desc
   */

  public async getUserByUserID(staffID: string): Promise<Staff> {
    const BaseStaffModel = this.models.BaseStaff;
    const baseStaff = await BaseStaffModel.findOne({
      where: {
        base_user_id: staffID,
      },
    });
    if (!!baseStaff === false) throw new Error("User not found.");
    return StaffMap.toDomain(baseStaff);
  }
  /**
   * @method getUserByUserName
   * @public
   * @desc
   */

  public async getUserByUserName(
    staffName: StaffName | string
  ): Promise<Staff> {
    const BaseStaffModel = this.models.BaseStaff;
    const baseStaff = await BaseStaffModel.findOne({
      where: {
        username:
          staffName instanceof StaffName
            ? (<StaffName>staffName).value
            : staffName,
      },
    });
    if (!!baseStaff === false) throw new Error("User not found.");
    return StaffMap.toDomain(baseStaff);
  }
  /**
   * @method save
   * @public @async
   * @desc
   */

  public async save(staff: Staff): Promise<void> {
    const StaffModel = this.models.BaseStaff;
    const exists = await this.exists(staff.email);

    if (!exists) {
      const rawSequelizeUser = await StaffMap.toPersistence(staff);
      await StaffModel.create(rawSequelizeUser);
    }

    return;
  }
}
